import { getAllArticles } from '@/sanity/queries';
import { articles as localArticles } from '@/lib/articles';
import HealthGuidePageClient from '@/components/blog/HealthGuidePageClient';

export const revalidate = 60;

type SanityArticle = {
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
  const sanityArticles = (await getAllArticles()) as SanityArticle[];
  const combined: SanityArticle[] = [...sanityArticles];

  localArticles.forEach((local) => {
    const exists = sanityArticles.find((article) => article.slug === local.slug);
    if (!exists) {
      combined.push({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc ?? "", 
        readTime: parseInt(local.readTime, 10),
        publishedAt: new Date().toISOString(),
        coverImage: local.img,
      });
    }
  });

  return <HealthGuidePageClient initialArticles={combined} />;
}
