import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.nurullahermis.com';

const treatmentSlugs = [
  'skolyoz-kifoz-cerrahisi',
  'bel-fitigi-tedavisi',
  'boyun-fitigi-cerrahisi',
  'diz-kalca-protezi',
  'cocuk-ortopedisi',
  'artroskopik-cerrahi',
];

const treatmentSlugMapEN: Record<string, string> = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

const articleSlugs = [
  'bel-fitigi-ameliyati',
  'skolyoz-belirtileri-tedavisi',
  'diz-protezi-ameliyati',
  'boyun-fitiginiz-mi-var',
  'cocuklarda-kalca-cikigini-nasil-anlariz',
  'acl-cop-bag-ameliyati',
  'skolyoz-egzersizleri',
];

const articleSlugMapEN: Record<string, string> = {
  'bel-fitigi-ameliyati': 'lumbar-disc-surgery',
  'skolyoz-belirtileri-tedavisi': 'scoliosis-symptoms-treatment',
  'diz-protezi-ameliyati': 'knee-replacement-surgery',
  'boyun-fitiginiz-mi-var': 'do-you-have-a-cervical-disc-herniation',
  'cocuklarda-kalca-cikigini-nasil-anlariz': 'how-can-we-recognize-hip-dislocation-in-children',
  'acl-cop-bag-ameliyati': 'acl-surgery',
  'skolyoz-egzersizleri': 'scoliosis-exercises',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

  const treatmentPages: MetadataRoute.Sitemap = treatmentSlugs.map((slug) => ({
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

  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
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
