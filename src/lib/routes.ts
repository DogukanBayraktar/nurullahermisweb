import articleSlugMapData from './articleSlugMap.json';

export type SiteLang = 'tr' | 'en';

export function getSiteLang(language?: string): SiteLang {
  return language?.startsWith('en') ? 'en' : 'tr';
}

const routeSegments = {
  tr: {
    about: 'hakkimda',
    treatments: 'tedaviler',
    gallery: 'galeri',
    healthGuide: 'saglik-rehberi',
    contact: 'iletisim',
    media: 'basinda-biz',
  },
  en: {
    about: 'about',
    treatments: 'treatments',
    gallery: 'gallery',
    healthGuide: 'health-guide',
    contact: 'contact',
    media: 'in-the-media',
  },
} as const;

const treatmentSlugMap: Record<string, string> = {
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

let articleSlugMap: Record<string, string> = { ...articleSlugMapData };

// Dinamik slug çözümü: DB'den gelen EN makalelerin slug'larını da işle
// EN slug → TR canonical: "lumbar-disc-surgery" → "bel-fitigi-ameliyati"
// Bu fonksiyon hem statik map'i hem de runtime'da gelen slugları destekler
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

const legacyArticleSlugMap: Record<string, string> = {
  'boyun-fitigi-belirtileri': 'boyun-fitiginiz-mi-var',
  'cocuk-ortopedisi-kalca-cikigi': 'cocuklarda-kalca-cikigini-nasil-anlariz',
  'cervical-disc-symptoms': 'boyun-fitiginiz-mi-var',
  'pediatric-orthopedics-hip-dislocation': 'cocuklarda-kalca-cikigini-nasil-anlariz',
};

function invertMap(map: Record<string, string>) {
  return Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));
}

const reverseTreatmentSlugMap = invertMap(treatmentSlugMap);
const reverseArticleSlugMap = invertMap(articleSlugMap);

function normalizeArticleSlug(slug: string) {
  return reverseArticleSlugMap[slug] ?? legacyArticleSlugMap[slug] ?? slug;
}

export function localizeTreatmentSlug(slug: string, language?: string) {
  const normalizedSlug = normalizeTreatmentSlug(slug);
  const lang = getSiteLang(language);
  if (lang === 'en') return treatmentSlugMap[normalizedSlug] ?? normalizedSlug;
  return reverseTreatmentSlugMap[normalizedSlug] ?? normalizedSlug;
}

export function canonicalTreatmentSlug(slug: string) {
  const normalizedSlug = normalizeTreatmentSlug(slug);
  return reverseTreatmentSlugMap[normalizedSlug] ?? normalizedSlug;
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
  const fromEn = reverseArticleSlugMap[slug];
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
    // localized slug map'te varsa onu kullan, yoksa canonical (aynı) slug ile devam et
    return getLocalizedPath('healthGuide', targetLang, canonical, 'article');
  }

  return targetLang === 'en' ? cleanPath : cleanPath;
}