export type SiteLang = 'tr' | 'en';

export function getSiteLang(language?: string): SiteLang {
  return language?.startsWith('en') ? 'en' : 'tr';
}

const routeSegments = {
  tr: {
    about: 'hakkimda',
    treatments: 'tedaviler',
    healthGuide: 'saglik-rehberi',
    contact: 'iletisim',
  },
  en: {
    about: 'about',
    treatments: 'treatments',
    healthGuide: 'health-guide',
    contact: 'contact',
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

const articleSlugMap: Record<string, string> = {
  'bel-fitigi-ameliyati': 'lumbar-disc-surgery',
  'skolyoz-belirtileri-tedavisi': 'scoliosis-symptoms-treatment',
  'diz-protezi-ameliyati': 'knee-replacement-surgery',
  'boyun-fitigi-belirtileri': 'cervical-disc-symptoms',
  'cocuk-ortopedisi-kalca-cikigi': 'pediatric-orthopedics-hip-dislocation',
  'acl-cop-bag-ameliyati': 'acl-surgery',
};

function invertMap(map: Record<string, string>) {
  return Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));
}

const reverseTreatmentSlugMap = invertMap(treatmentSlugMap);
const reverseArticleSlugMap = invertMap(articleSlugMap);

export function localizeTreatmentSlug(slug: string, language?: string) {
  const lang = getSiteLang(language);
  if (lang === 'en') return treatmentSlugMap[slug] ?? slug;
  return reverseTreatmentSlugMap[slug] ?? slug;
}

export function canonicalTreatmentSlug(slug: string) {
  return reverseTreatmentSlugMap[slug] ?? slug;
}

export function localizeArticleSlug(slug: string, language?: string) {
  const lang = getSiteLang(language);
  if (lang === 'en') return articleSlugMap[slug] ?? slug;
  return reverseArticleSlugMap[slug] ?? slug;
}

export function canonicalArticleSlug(slug: string) {
  return reverseArticleSlugMap[slug] ?? slug;
}

export function getLangFromPathname(pathname: string): SiteLang {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  if (cleanPath === '/') return 'tr';

  const segments = cleanPath.split('/').filter(Boolean);
  const first = segments[0];

  if (first === routeSegments.en.about || first === routeSegments.en.treatments || first === routeSegments.en.healthGuide || first === routeSegments.en.contact || first === 'en') {
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

  if (first === routeSegments.tr.contact || first === routeSegments.en.contact) {
    return getLocalizedPath('contact', targetLang);
  }

  if (isTrTreatments || isEnTreatments) {
    if (!second) return getLocalizedPath('treatments', targetLang);
    return getLocalizedPath('treatments', targetLang, canonicalTreatmentSlug(second), 'treatment');
  }

  if (isTrHealthGuide || isEnHealthGuide) {
    if (!second) return getLocalizedPath('healthGuide', targetLang);
    return getLocalizedPath('healthGuide', targetLang, canonicalArticleSlug(second), 'article');
  }

  return targetLang === 'en' ? cleanPath : cleanPath;
}
