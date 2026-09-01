import { MetadataRoute } from 'next';
import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';
import { TREATMENTS_DATA } from '@/lib/treatments';

const BASE_URL = 'https://www.nurullahermis.com';

const treatmentSlugMapEN: Record<string, string> = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

import articleSlugMapEN from '@/lib/articleSlugMap.json';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  
  // 1. Get treatment slugs
  let allTreatmentSlugs = [...new Set(TREATMENTS_DATA.map((t) => t.slug))];
  
  // 2. Get article slugs from local + DB
  let allArticleSlugs = [...new Set(getDefaultLocalArticles().map((a) => a.slug))];
  
  try {
    // We import this dynamically or assume it is available if prisma is imported
    const { hasDatabaseUrl, prisma } = await import('@/lib/prisma');
    if (hasDatabaseUrl) {
      const dbArticles = await prisma.healthArticle.findMany({
        where: { published: true, lang: 'tr' }, // Sadece TR olanları alıp, onların ana slug'ını çıkaralım
        select: { slug: true }
      });
      const dbSlugs = dbArticles.map(a => a.slug.replace(/_tr$/, ''));
      allArticleSlugs = [...new Set([...allArticleSlugs, ...dbSlugs])];
    }
  } catch (e) {
    console.error('Error fetching articles for sitemap', e);
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: { tr: BASE_URL, en: `${BASE_URL}/en` } },
    },
    {
      url: `${BASE_URL}/hakkimda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { tr: `${BASE_URL}/hakkimda`, en: `${BASE_URL}/about` } },
    },
    {
      url: `${BASE_URL}/tedaviler`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { tr: `${BASE_URL}/tedaviler`, en: `${BASE_URL}/treatments` } },
    },
    {
      url: `${BASE_URL}/galeri`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { tr: `${BASE_URL}/galeri`, en: `${BASE_URL}/gallery` } },
    },
    {
      url: `${BASE_URL}/saglik-rehberi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { tr: `${BASE_URL}/saglik-rehberi`, en: `${BASE_URL}/health-guide` } },
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { tr: `${BASE_URL}/iletisim`, en: `${BASE_URL}/contact` } },
    },
    {
      url: `${BASE_URL}/basinda-biz`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { tr: `${BASE_URL}/basinda-biz`, en: `${BASE_URL}/in-the-media` } },
    },
    {
      url: `${BASE_URL}/sunumlar`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gizlilik-politikasi`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kullanim-kosullari`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const treatmentPages: MetadataRoute.Sitemap = allTreatmentSlugs.map((slug) => ({
    url: `${BASE_URL}/tedaviler/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    alternates: {
      languages: {
        tr: `${BASE_URL}/tedaviler/${slug}`,
        en: `${BASE_URL}/treatments/${treatmentSlugMapEN[slug] ?? slug}`,
      },
    },
  }));

  const articlePages: MetadataRoute.Sitemap = allArticleSlugs.map((slug) => ({
    url: `${BASE_URL}/saglik-rehberi/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    alternates: {
      languages: {
        tr: `${BASE_URL}/saglik-rehberi/${slug}`,
        en: `${BASE_URL}/health-guide/${(articleSlugMapEN as Record<string, string>)[slug] ?? slug}`,
      },
    },
  }));

  return [...staticPages, ...treatmentPages, ...articlePages];
}