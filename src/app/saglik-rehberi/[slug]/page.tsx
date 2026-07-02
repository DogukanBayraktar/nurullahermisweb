// src/app/saglik-rehberi/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getTranslatedLocalArticle, getAllTranslatedLocalArticles, type LocalArticleShape } from '@/lib/healthGuideTranslations';
import { canonicalArticleSlug } from '@/lib/routes';
import HealthGuideDetailClient from '@/components/blog/HealthGuideDetailClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const revalidate = 86400;
export const dynamicParams = true;

// Hafif allow-list sorgusu: sadece slug kolonu (24 saat cache).
// Bot/scraper rastgele slug denediğinde ağır findFirst/findMany sorgularını
// tetiklemeden notFound()'a/local fallback'e düşmeyi sağlar.
const getAllArticleSlugs = unstable_cache(
  async () => {
    const rows = await prisma.healthArticle.findMany({ select: { slug: true } });
    return new Set(rows.map((r) => r.slug));
  },
  ['health-article-slug-allowlist'],
  { revalidate: 86400 }
);

// Build zamanında bilinen tüm makale slug'larını statik üretir (DB'ye prod trafiğinde gidilmez).
export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return Array.from(slugs).map((slug) => ({ slug: slug.replace(/_tr$/, '').replace(/_en$/, '') }));
  } catch {
    return [];
  }
}

type RelatedArticle = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  coverImage?: string;
};

type LocalArticle = LocalArticleShape;

type ArticleDetail = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: string | number;
  publishedAt: string;
  coverImage?: string;
  _localContent?: LocalArticle;
};

const getHealthArticleBundle = unstable_cache(
  async (slug: string, rawSlug: string, forceLang: 'tr' | 'en' | undefined) => {
    const targetSuffix = forceLang === 'en' ? '_en' : '_tr';

    const dbArticle = await prisma.healthArticle.findFirst({
      where: {
        OR: [
          { slug: `${slug}${targetSuffix}`, published: true },
          { slug: `${rawSlug}${targetSuffix}`, published: true },
          { slug: rawSlug, lang: forceLang || 'tr', published: true },
        ],
      },
    });

    if (!dbArticle) {
      return { dbArticle: null, pairArticle: null, related: [] };
    }

    const otherLang = forceLang === 'en' ? 'tr' : 'en';
    const otherSuffix = otherLang === 'en' ? '_en' : '_tr';

    const [pairArticle, related] = await Promise.all([
      prisma.healthArticle.findFirst({
        where: {
          OR: [
            { slug: `${slug}${otherSuffix}`, published: true },
            { slug: slug, lang: otherLang, published: true },
          ],
        },
        select: { slug: true },
      }),
      prisma.healthArticle.findMany({
        where: { published: true, lang: forceLang || 'tr', NOT: { id: dbArticle.id } },
        take: 4,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { dbArticle, pairArticle, related };
  },
  ['health-article-detail-bundle'],
  { revalidate: 86400 }
);

export async function renderHealthGuideDetailPage({
  params,
  forceLang,
}: {
  params: Promise<{ slug: string }>;
  forceLang?: 'tr' | 'en';
}) {
  const { slug: rawSlug } = await params;
  const slug = canonicalArticleSlug(rawSlug);

  let article: ArticleDetail | null = null;
  let otherArticles: RelatedArticle[] = [];
  let alternateSlug: string | null = null;

  // DB'den dene
  try {
    if (hasDatabaseUrl) {
      const knownSlugs = await getAllArticleSlugs();
      const possiblyInDb =
        knownSlugs.has(`${slug}_tr`) ||
        knownSlugs.has(`${slug}_en`) ||
        knownSlugs.has(`${rawSlug}_tr`) ||
        knownSlugs.has(`${rawSlug}_en`) ||
        knownSlugs.has(rawSlug);

      if (possiblyInDb) {
        const { dbArticle, pairArticle, related } = await getHealthArticleBundle(slug, rawSlug, forceLang);

      if (dbArticle) {
        const localContent: LocalArticle = {
          slug: slug,
          title: dbArticle.title,
          img: dbArticle.img,
          date: dbArticle.date,
          readTime: dbArticle.readTime,
          category: dbArticle.category,
          desc: dbArticle.desc,
          intro: dbArticle.intro,
          sections: dbArticle.sections as { h2: string; content: string }[],
          tags: dbArticle.tags,
        };

        article = {
          title: dbArticle.title,
          slug,
          category: dbArticle.category,
          summary: dbArticle.desc,
          _localContent: localContent,
          readTime: dbArticle.readTime,
          publishedAt: dbArticle.date,
          coverImage: dbArticle.img,
        };

        if (pairArticle) {
          alternateSlug = pairArticle.slug.replace(/_tr$/, '').replace(/_en$/, '');
        }

        otherArticles = related.map((r) => ({
          title: r.title,
          slug: r.slug.replace(/_tr$/, '').replace(/_en$/, ''),
          category: r.category,
          publishedAt: r.date,
          coverImage: r.img,
        }));
      }
      }
    }
  } catch (error) {
    console.error('DB fetch error in HealthGuideDetailPage:', error);
  }

  // DB'de yoksa .ts fallback
  if (!article) {
    const langToUse = forceLang || 'tr';
    const local = getTranslatedLocalArticle(slug, langToUse);

    if (!local) notFound();

    article = {
      title: local.title,
      slug: local.slug,
      category: local.category,
      summary: local.desc,
      _localContent: local,
      readTime: local.readTime,
      publishedAt: local.date,
      coverImage: local.img,
    };

    const localArticles = getAllTranslatedLocalArticles(langToUse);
    otherArticles = localArticles
      .filter((item) => item.slug !== slug)
      .slice(0, 4)
      .map((item) => ({
        title: item.title,
        slug: item.slug,
        category: item.category,
        publishedAt: item.date,
        coverImage: item.img,
      }));
  }

  const isLocal = !hasDatabaseUrl || article._localContent?.intro === undefined;

  return (
    <HealthGuideDetailClient
      article={article}
      isLocal={isLocal}
      otherArticles={otherArticles}
      alternateSlug={alternateSlug}
    />
  );
}

export default async function HealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return renderHealthGuideDetailPage({ params, forceLang: undefined });
}