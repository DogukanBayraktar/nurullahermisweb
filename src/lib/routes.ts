import articleSlugMapData from './articleSlugMap.json';

export type SiteLang = 'tr' | 'en';

export function getSiteLang(language?: string): SiteLang {
  return language?.startsWith('en') ? 'en' : 'tr';
}

const routeSegments = {
  tr: {
    home: '',
    about: 'hakkimda',
    treatments: 'tedaviler',
    gallery: 'galeri',
    healthGuide: 'saglik-rehberi',
    contact: 'iletisim',
    media: 'basinda-biz',
  },
  en: {
    home: 'en',
    about: 'about',
    treatments: 'treatments',
    gallery: 'gallery',
    healthGuide: 'health-guide',
    contact: 'contact',
    media: 'in-the-media',
  },
} as const;

// --- Treatment slug map (statik + DB merge) ---

let treatmentSlugMap: Record<string, string> = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

function normalizeTreatmentSlug(slug: string) {
  return slug.replace(/_tr$/, '').replace(/_en$/, '');
}

function getReverseTreatmentSlugMap() {
  return invertMap(treatmentSlugMap);
}

/**
 * DB'de treatmentSlugMap içinde ekstra/güncel kayıt varsa
 * statik map'in ÜZERİNE merge eder. Server-side'da sayfa
 * render edilmeden önce çağrılmalı.
 */
export async function loadTreatmentSlugMapFromDb() {
  if (typeof window !== 'undefined') return treatmentSlugMap;

  try {
    const { prisma } = await import('./prisma');
    const record = await prisma.siteContent.findUnique({
      where: { filename: 'treatmentSlugMap' },
    });

    if (record && record.content) {
      treatmentSlugMap = {
        ...treatmentSlugMap,
        ...(record.content as Record<string, string>),
      };
    } else if (!record) {
      await prisma.siteContent.create({
        data: {
          filename: 'treatmentSlugMap',
          content: treatmentSlugMap,
        },
      });
    }
  } catch (error) {
    console.error('[routes] Treatment slug map yüklenemedi:', error);
  }
  return treatmentSlugMap;
}

// --- Article slug map (statik JSON + DB merge) ---

let articleSlugMap: Record<string, string> = { ...articleSlugMapData };

const legacyArticleSlugMap: Record<string, string> = {
  'boyun-fitigi-belirtileri': 'boyun-fitiginiz-mi-var',
  'cocuk-ortopedisi-kalca-cikigi': 'cocuklarda-kalca-cikigini-nasil-anlariz',
  'cervical-disc-symptoms': 'boyun-fitiginiz-mi-var',
  'pediatric-orthopedics-hip-dislocation': 'cocuklarda-kalca-cikigini-nasil-anlariz',
};

function invertMap(map: Record<string, string>) {
  return Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));
}

// ÖNEMLİ: reverse map artık HER ÇAĞRIDA yeniden hesaplanıyor.
// Böylece DB'den sonradan merge edilen kayıtlar da reverse lookup'ta görünür.
function getReverseArticleSlugMap() {
  return invertMap(articleSlugMap);
}

function normalizeArticleSlug(slug: string) {
  const reverseMap = getReverseArticleSlugMap();
  return reverseMap[slug] ?? legacyArticleSlugMap[slug] ?? slug;
}

/**
 * DB'de articleSlugMap içinde ekstra/güncel kayıt varsa
 * statik JSON'un ÜZERİNE merge eder (JSON'daki değerleri override edebilir).
 * Server-side'da sayfa render edilmeden önce çağrılmalı.
 */
export async function loadArticleSlugMapFromDb() {
  if (typeof window !== 'undefined') return articleSlugMap;

  try {
    const { prisma } = await import('./prisma');
    const record = await prisma.siteContent.findUnique({
      where: { filename: 'articleSlugMap' },
    });

    if (record && record.content) {
      articleSlugMap = {
        ...articleSlugMap,
        ...(record.content as Record<string, string>),
      };
    }
  } catch (error) {
    console.error('[routes] Slug map yüklenemedi:', error);
  }
  return articleSlugMap;
}

/**
 * Runtime'da elde edilen (tr, en) slug çiftlerini map'e ekler.
 * Zaten kayıtlı olan TR slug'lar override edilmez.
 */
export function buildArticleSlugMapFromPairs(
  pairs: { trSlug: string; enSlug: string }[]
) {
  pairs.forEach(({ trSlug, enSlug }) => {
    const tr = trSlug.replace(/_tr$/, '');
    const en = enSlug.replace(/_en$/, '');
    if (tr && en && !articleSlugMap[tr]) {
      articleSlugMap[tr] = en;
    }
  });
}

export function localizeTreatmentSlug(slug: string, language?: string) {
  const normalizedSlug = normalizeTreatmentSlug(slug);
  const lang = getSiteLang(language);
  if (lang === 'en') return treatmentSlugMap[normalizedSlug] ?? normalizedSlug;
  const reverseMap = getReverseTreatmentSlugMap();
  return reverseMap[normalizedSlug] ?? normalizedSlug;
}

export function canonicalTreatmentSlug(slug: string) {
  const normalizedSlug = normalizeTreatmentSlug(slug);
  const reverseMap = getReverseTreatmentSlugMap();
  return reverseMap[normalizedSlug] ?? normalizedSlug;
}

export function localizeArticleSlug(slug: string, language?: string) {
  const lang = getSiteLang(language);
  const canonicalSlug = normalizeArticleSlug(slug);
  if (lang === 'en') return articleSlugMap[canonicalSlug] ?? canonicalSlug;
  return canonicalSlug;
}

export function canonicalArticleSlug(slug: string) {
  // Önce legacy map'e bak
  const legacy = legacyArticleSlugMap[slug];
  if (legacy) return legacy;
  // EN slug → TR canonical (ters map)
  const reverseMap = getReverseArticleSlugMap();
  const fromEn = reverseMap[slug];
  if (fromEn) return fromEn;
  // Zaten TR canonical
  return slug;
}

// EN sayfalarında DB araması için: EN slug'ı olduğu gibi döndür
export function rawArticleSlug(slug: string) {
  return slug;
}

export function getLangFromPathname(pathname: string): SiteLang {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (cleanPath === '/') return 'tr';

  const segments = cleanPath.split('/').filter(Boolean);
  const first = segments[0];

  if (
    first === routeSegments.en.about ||
    first === routeSegments.en.treatments ||
    first === routeSegments.en.gallery ||
    first === routeSegments.en.healthGuide ||
    first === routeSegments.en.contact ||
    first === routeSegments.en.media ||
    first === 'en'
  ) {
    return 'en';
  }

  return 'tr';
}

export function resolveRouteKey(path: string): keyof typeof routeSegments.tr {
  const cleanPath = path.replace(/^\/(tr|en)/, '').replace(/^\//, '') || 'home';

  if (cleanPath === 'home') return 'home';

  const entry =
    Object.entries(routeSegments.tr).find(([, value]) => value === cleanPath) ||
    Object.entries(routeSegments.en).find(([, value]) => value === cleanPath);

  if (entry) return entry[0] as keyof typeof routeSegments.tr;

  // Fallback: treatments/health guide slug'lı sayfalar
  if (cleanPath.startsWith('tedaviler') || cleanPath.startsWith('treatments')) return 'treatments';
  if (cleanPath.startsWith('saglik-rehberi') || cleanPath.startsWith('health-guide')) return 'healthGuide';

  return 'home';
}

export function getLocalizedPath(
  key: keyof typeof routeSegments.tr,
  language?: string,
  slug?: string,
  type?: 'treatment' | 'article'
) {
  const lang = getSiteLang(language);
  const segment = routeSegments[lang][key];

  if (!slug) return `/${segment}`;

  const localizedSlug =
    type === 'treatment'
      ? localizeTreatmentSlug(slug, lang)
      : type === 'article'
        ? localizeArticleSlug(slug, lang)
        : slug;

  return `/${segment}/${localizedSlug}`;
}

export function getAlternateLocalizedPath(pathname: string, targetLanguage: string) {
  const targetLang = getSiteLang(targetLanguage);
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (cleanPath === '/') return targetLang === 'en' ? '/en' : '/';
  if (cleanPath === '/en') return targetLang === 'en' ? '/en' : '/';

  const segments = cleanPath.split('/').filter(Boolean);
  const [first, second] = segments;

  const isTrTreatments = first === routeSegments.tr.treatments;
  const isEnTreatments = first === routeSegments.en.treatments;
  const isTrHealthGuide = first === routeSegments.tr.healthGuide;
  const isEnHealthGuide = first === routeSegments.en.healthGuide;

  if (first === 'en') {
    return targetLang === 'en' ? '/en' : '/';
  }

  if (first === routeSegments.tr.about || first === routeSegments.en.about) {
    return getLocalizedPath('about', targetLang);
  }

  if (first === routeSegments.tr.gallery || first === routeSegments.en.gallery) {
    return getLocalizedPath('gallery', targetLang);
  }

  if (first === routeSegments.tr.contact || first === routeSegments.en.contact) {
    return getLocalizedPath('contact', targetLang);
  }

  if (first === routeSegments.tr.media || first === routeSegments.en.media) {
    return getLocalizedPath('media', targetLang);
  }

  if (isTrTreatments || isEnTreatments) {
    if (!second) return getLocalizedPath('treatments', targetLang);
    return getLocalizedPath('treatments', targetLang, canonicalTreatmentSlug(second), 'treatment');
  }

  if (isTrHealthGuide || isEnHealthGuide) {
    if (!second) return getLocalizedPath('healthGuide', targetLang);
    const canonical = canonicalArticleSlug(second);
    return getLocalizedPath('healthGuide', targetLang, canonical, 'article');
  }

  return targetLang === 'en' ? cleanPath : cleanPath;
}