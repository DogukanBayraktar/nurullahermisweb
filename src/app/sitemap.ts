import { MetadataRoute } from 'next';
import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';
import { TREATMENTS_DATA } from '@/lib/treatments';
import { localizeArticleSlug, localizeTreatmentSlug, loadArticleSlugMapFromDb } from '@/lib/routes';

const BASE_URL = 'https://www.nurullahermis.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // DB'den güncel slug map'i yükle (Server-side)
  await loadArticleSlugMapFromDb();
  
  const now = new Date();
  const allTreatmentSlugs = [...new Set(TREATMENTS_DATA.map((t) => t.slug))];
  const allArticleSlugs = [...new Set(getDefaultLocalArticles().map((a) => a.slug))];

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
        en: `${BASE_URL}/treatments/${localizeTreatmentSlug(slug, 'en')}`,
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
        en: `${BASE_URL}/health-guide/${localizeArticleSlug(slug, 'en')}`,
      },
    },
  }));

  return [...staticPages, ...treatmentPages, ...articlePages];
}
