import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/sanity/queries';
import { articles as localArticles } from '@/lib/articles';
import HealthGuideDetailClient from '@/components/blog/HealthGuideDetailClient';

export const revalidate = 60;

type RelatedArticle = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  coverImage?: string;
};

type LocalArticle = (typeof localArticles)[number];

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
  const { slug } = await params;

  let article = (await getArticleBySlug(slug)) as ArticleDetail | null;
  let isLocal = false;

  if (!article) {
    const local = localArticles.find((item) => item.slug === slug);

    if (local) {
      article = {
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc ?? "", 
        content: null,
        _localContent: local,
        readTime: local.readTime,
        publishedAt: local.date,
        coverImage: local.img,
      };
      isLocal = true;
    }
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
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      category: item.category,
      publishedAt: item.publishedAt,
      coverImage: item.coverImage,
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
