// src/app/saglik-rehberi/page.tsx
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { getDefaultLocalArticles, getAllTranslatedLocalArticles } from '@/lib/healthGuideTranslations';
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

export default async function HealthGuidePage({ lang: forceLang }: { lang?: 'tr' | 'en' }) {
  const lang = forceLang ?? 'tr';

  let dbArticles: LocalArticle[] = [];
  try {
    const rows = hasDatabaseUrl
      ? await prisma.healthArticle.findMany({
          where: { lang, published: true },
          orderBy: { createdAt: 'desc' },
        })
      : [];
    if (rows.length > 0) {
      dbArticles = rows.map((a) => ({
        _id: `db-${a.id}`,
        title: a.title,
        slug: a.slug.replace(/_tr$/, '').replace(/_en$/, ''),
        category: a.category,
        summary: a.desc,
        readTime: a.readTime,
        publishedAt: a.date,
        coverImage: a.img,
      }));
    }
  } catch {
    // DB henüz hazır değilse static fallback
  }

  // Eğer DB boşsa .ts fallback
  const fallbackArticles = lang === 'en'
    ? getAllTranslatedLocalArticles('en')
    : getDefaultLocalArticles();

  const combined: LocalArticle[] = dbArticles.length > 0
    ? dbArticles
    : fallbackArticles.map((local) => ({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc,
        readTime: local.readTime,
        publishedAt: local.date,
        coverImage: local.img,
      }));

  return <HealthGuidePageClient initialArticles={combined} forceLang={lang} />;
}