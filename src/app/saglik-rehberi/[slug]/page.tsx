// src/app/saglik-rehberi/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getDefaultLocalArticles, type LocalArticleShape } from '@/lib/healthGuideTranslations';
import { canonicalArticleSlug } from '@/lib/routes';
import HealthGuideDetailClient from '@/components/blog/HealthGuideDetailClient';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

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

export default async function HealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = canonicalArticleSlug(rawSlug);

  let article: ArticleDetail | null = null;
  let otherArticles: RelatedArticle[] = [];

  // DB'den dene
  try {
    const dbArticle = await prisma.healthArticle.findFirst({
      where: {
        OR: [
          { slug: `${slug}_tr` },
          { slug: `${slug}_en` },
          { slug },
        ],
        published: true,
      },
    });

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

      // Related articles from DB
      const related = await prisma.healthArticle.findMany({
        where: { published: true, NOT: { id: dbArticle.id } },
        take: 4,
        orderBy: { createdAt: 'desc' },
      });
      otherArticles = related.map((r) => ({
        title: r.title,
        slug: r.slug.replace(/_tr$/, '').replace(/_en$/, ''),
        category: r.category,
        publishedAt: r.date,
        coverImage: r.img,
      }));
    }
  } catch {
    // DB hatası — fallback
  }

  // DB'de yoksa .ts fallback
  if (!article) {
    const localArticles = getDefaultLocalArticles();
    const local = localArticles.find((item) => item.slug === slug);
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

  return (
    <HealthGuideDetailClient
      article={article}
      isLocal={true}
      otherArticles={otherArticles}
    />
  );
}
