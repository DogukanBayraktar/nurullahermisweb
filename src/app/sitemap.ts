// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllBlogSlugs, getAllTreatmentSlugs } from '@/sanity/queries';
import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';
import { TREATMENTS_DATA } from '@/lib/treatments';
import { canonicalArticleSlug } from '@/lib/routes';

const BASE_URL = 'https://www.nurullahermis.com';

// TR → EN slug eşleşmeleri (sadece bilinen statik olanlar için fallback)
const treatmentSlugMapEN: Record<string, string> = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

const articleSlugMapEN: Record<string, string> = {
  'bel-fitigi-ameliyati': 'lumbar-disc-surgery',
  'skolyoz-belirtileri-tedavisi': 'scoliosis-symptoms-treatment',
  'diz-protezi-ameliyati': 'knee-replacement-surgery',
  'boyun-fitiginiz-mi-var': 'do-you-have-a-cervical-disc-herniation',
  'cocuklarda-kalca-cikigini-nasil-anlariz': 'how-can-we-recognize-hip-dislocation-in-children',
  'acl-cop-bag-ameliyati': 'acl-surgery',
  'skolyoz-egzersizleri': 'scoliosis-exercises',
};

export const revalidate = 3600; // Saatte bir yeniden oluştur

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Sanity'den canlı slug'lar ──
  const [sanityTreatments, sanityArticles] = await Promise.all([
    getAllTreatmentSlugs(),   // { slug: string }[]
    getAllBlogSlugs(),        // { slug: string }[]
  ]);

  // ── Local (hardcode) slug'lar (Sanity'de olmayan statik içerik) ──
  const localArticleSlugs = getDefaultLocalArticles().map((a) => a.slug);
  const localTreatmentSlugs = TREATMENTS_DATA.map((t) => t.slug);

  // Sanity + local birleştir, tekrar edenleri at
  const allTreatmentSlugs = [
    ...new Set([
      ...sanityTreatments.map((t: { slug: string }) => t.slug),
      ...localTreatmentSlugs,
    ]),
  ];

  const allArticleSlugs = [
    ...new Set([
      ...sanityArticles.map((a: { slug: string }) => canonicalArticleSlug(a.slug)),
      ...localArticleSlugs,
    ]),
  ];

  // ── Statik sayfalar ──
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

  // ── Tedavi sayfaları ──
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

  // ── Makale sayfaları ──
  const articlePages: MetadataRoute.Sitemap = allArticleSlugs.map((slug) => ({
    url: `${BASE_URL}/saglik-rehberi/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    alternates: {
      languages: {
        tr: `${BASE_URL}/saglik-rehberi/${slug}`,
        en: `${BASE_URL}/health-guide/${articleSlugMapEN[slug] ?? slug}`,
      },
    },
  }));

  return [...staticPages, ...treatmentPages, ...articlePages];
}