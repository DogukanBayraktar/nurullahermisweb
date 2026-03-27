import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/sanity/queries';
import { getDefaultLocalArticles, type LocalArticleShape } from '@/lib/healthGuideTranslations';
import { canonicalArticleSlug, getSanityArticleSlug } from '@/lib/routes';
import HealthGuideDetailClient from '@/components/blog/HealthGuideDetailClient';

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
  content: unknown;
  readTime: string | number;
  publishedAt: string;
  coverImage?: string;
  _localContent?: LocalArticle;
};

export default async function HealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  const slug = canonicalArticleSlug(rawSlug);
  const localArticles = getDefaultLocalArticles();
  const local = localArticles.find((item) => item.slug === slug);

  let article = (await getArticleBySlug(getSanityArticleSlug(slug))) as ArticleDetail | null;
  let isLocal = false;

  if (article && local) {
    article = {
      ...article,
      slug: local.slug,
      title: local.title,
      category: local.category,
      summary: local.desc,
      readTime: local.readTime,
      coverImage: local.img,
      _localContent: local,
    };
  }

  if (!article && local) {
    article = {
      title: local.title,
      slug: local.slug,
      category: local.category,
      summary: local.desc, 
      content: null,
      _localContent: local,
      readTime: local.readTime,
      publishedAt: local.date,
      coverImage: local.img,
    };
    isLocal = true;
  }

  if (!article) notFound();

  const sanityArticles = ((await getAllArticles()) ?? []) as RelatedArticle[];
  const localRelated: RelatedArticle[] = localArticles
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      category: item.category,
      publishedAt: item.date,
      coverImage: item.img,
    }));

  const sanityRelated: RelatedArticle[] = sanityArticles
    .filter((item) => canonicalArticleSlug(item.slug) !== slug)
    .map((item) => ({
      title: localArticles.find((localItem) => localItem.slug === canonicalArticleSlug(item.slug))?.title ?? item.title,
      slug: localArticles.find((localItem) => localItem.slug === canonicalArticleSlug(item.slug))?.slug ?? canonicalArticleSlug(item.slug),
      category: localArticles.find((localItem) => localItem.slug === canonicalArticleSlug(item.slug))?.category ?? item.category,
      publishedAt: item.publishedAt,
      coverImage: localArticles.find((localItem) => localItem.slug === canonicalArticleSlug(item.slug))?.img ?? item.coverImage,
    }));

  const otherArticles = [...sanityRelated, ...localRelated]
    .filter((item, index, self) => self.findIndex((entry) => entry.slug === item.slug) === index)
    .slice(0, 4);

  return (
    <HealthGuideDetailClient
      article={article}
      isLocal={isLocal}
      otherArticles={otherArticles}
      showStudioLink={!isLocal}
    />
  );
}
