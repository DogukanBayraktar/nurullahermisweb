import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';
import HealthGuidePageClient from '@/components/blog/HealthGuidePageClient';

export const revalidate = 60;

type LocalArticle = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: number | string;
  publishedAt: string;
  coverImage?: string;
};

export default async function HealthGuidePage() {
  const localArticles = getDefaultLocalArticles();
  const combined: LocalArticle[] = localArticles.map((local) => ({
    _id: `local-${local.slug}`,
    title: local.title,
    slug: local.slug,
    category: local.category,
    summary: local.desc,
    readTime: local.readTime,
    publishedAt: local.date,
    coverImage: local.img,
  }));

  return <HealthGuidePageClient initialArticles={combined} />;
}
