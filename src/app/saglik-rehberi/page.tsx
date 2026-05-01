// src/app/saglik-rehberi/page.tsx
import { prisma } from '@/lib/prisma';
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
  // DB'den önce dene, hata varsa fallback
  let dbArticles: LocalArticle[] = [];
  try {
    const rows = await prisma.healthArticle.findMany({
      where: { lang: 'tr', published: true },
      orderBy: { createdAt: 'desc' },
    });
    if (rows.length > 0) {
      dbArticles = rows.map((a) => ({
        _id: `db-${a.id}`,
        title: a.title,
        // slug'dan _tr suffix'ini temizle
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
  const combined: LocalArticle[] = dbArticles.length > 0
    ? dbArticles
    : getDefaultLocalArticles().map((local) => ({
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
