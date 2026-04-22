import { notFound } from 'next/navigation';
import { getDefaultLocalArticles, type LocalArticleShape } from '@/lib/healthGuideTranslations';
import { canonicalArticleSlug } from '@/lib/routes';
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
  const isLocal = Boolean(local);
  const article = local
    ? {
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc,
        _localContent: local,
        readTime: local.readTime,
        publishedAt: local.date,
        coverImage: local.img,
      }
    : null;

  if (!article) notFound();

  const localRelated: RelatedArticle[] = localArticles
    .filter((item) => item.slug !== slug)
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      category: item.category,
      publishedAt: item.date,
      coverImage: item.img,
    }));
  const otherArticles = localRelated.slice(0, 4);

  return (
    <HealthGuideDetailClient
      article={article}
      isLocal={isLocal}
      otherArticles={otherArticles}
    />
  );
}
