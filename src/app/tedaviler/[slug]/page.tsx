// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { loadTreatmentSlugMapFromDb } from '@/lib/routes';
import { findTreatmentPair, stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';
import { mergePatientImages } from '@/lib/mergePatientImages';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;
const isDev = process.env.NODE_ENV === 'development';

// development'da DB değişiklikleri anında görünsün diye önbellek atlanır.
function maybeCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  key: string[],
  opts: { revalidate: number; tags: string[] }
): (...args: T) => Promise<R> {
  if (isDev) return fn;
  return unstable_cache(fn, key, opts);
}

// treatments/[slug]/page.tsx (EN mirror) generateStaticParams'ta da
// kullanabilsin diye export ediliyor.
export const getAllTreatmentSlugs = maybeCache(
  async () => {
    const rows = await prisma.treatment.findMany({ select: { slug: true } });
    return new Set(rows.map((r) => r.slug));
  },
  ['treatment-slug-allowlist'],
  { revalidate: 86400, tags: ['treatment-slug-allowlist'] }
);

export async function generateStaticParams() {
  try {
    const slugs = await getAllTreatmentSlugs();
    // DB'deki slug'lar '_tr' / '_en' son ekiyle tutuluyor (örn. 'xxx_tr').
    // Gerçek TR URL'i son eksiz olduğu için temizliyoruz.
    const canonicalSlugs = new Set(
      Array.from(slugs).map((slug) => stripSlugSuffix(slug))
    );
    return Array.from(canonicalSlugs).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

const getTreatmentEn = maybeCache(
  async (slug: string, normalizedOriginal: string | undefined) => {
    const cleanSlug = stripSlugSuffix(slug);
    const cleanOriginal = normalizedOriginal ? stripSlugSuffix(normalizedOriginal) : undefined;

    const candidateSlugs = [
      `${cleanSlug}_en`,
      cleanSlug,
    ];
    if (cleanOriginal && cleanOriginal !== cleanSlug) {
      candidateSlugs.push(`${cleanOriginal}_en`, cleanOriginal);
    }

    // İngilizce tedavi ararken: slug adaylarından biri ve (lang: 'en' veya _en ile biten)
    const found = await prisma.treatment.findFirst({
      where: {
        slug: { in: candidateSlugs },
        OR: [
          { lang: 'en' },
          { slug: { endsWith: '_en' } },
        ],
      },
    });

    return found;
  },
  ['treatment-detail-en'],
  { revalidate: 86400, tags: ['treatment-detail'] }
);

const getTreatmentTr = maybeCache(
  async (slug: string) => {
    const cleanSlug = stripSlugSuffix(slug);
    const candidateSlugs = [slug, cleanSlug, `${cleanSlug}_tr`];

    // Türkçe tedavi ararken: EN kaydı olmayanları ara
    const found = await prisma.treatment.findFirst({
      where: {
        slug: { in: candidateSlugs },
        NOT: { slug: { endsWith: '_en' } },
      },
    });

    return found;
  },
  ['treatment-detail-tr'],
  { revalidate: 86400, tags: ['treatment-detail'] }
);

export default async function TedaviDetayPage({
  params,
  language = 'tr',
}: {
  params: Promise<{ slug: string; originalSlug?: string }>;
  language?: 'tr' | 'en';
}) {
  // Slug haritasını DB'den yükle ki TR<->EN çevirisi doğru yapılsın
  await loadTreatmentSlugMapFromDb().catch(() => {});

  const { slug, originalSlug } = await params;
  let dbTreatment = null;
  let alternateSlug: string | null = null;
  let trPairTreatment: unknown = null;

  try {
    if (hasDatabaseUrl) {
      const knownSlugs = await getAllTreatmentSlugs();
      const normalizedOriginal = originalSlug ? stripSlugSuffix(originalSlug) : undefined;
      const cleanSlug = stripSlugSuffix(slug);

      const possiblyInDb =
        knownSlugs.has(slug) ||
        knownSlugs.has(cleanSlug) ||
        knownSlugs.has(`${cleanSlug}_tr`) ||
        knownSlugs.has(`${cleanSlug}_en`) ||
        (normalizedOriginal ? knownSlugs.has(`${normalizedOriginal}_en`) || knownSlugs.has(normalizedOriginal) : false);

      if (possiblyInDb) {
        if (language === 'en') {
          dbTreatment = await getTreatmentEn(slug, normalizedOriginal);
        } else {
          dbTreatment = await getTreatmentTr(slug);
        }

        // Karşı dildeki eşi bul (alternateSlug için)
        if (dbTreatment) {
          const pair = await findTreatmentPair(dbTreatment).catch(() => null);
          if (pair) {
            alternateSlug = stripSlugSuffix(pair.slug);
            if (language === 'en') trPairTreatment = pair.treatment;
          }
        }
      }
    }
  } catch {
    // DB hatası durumunda yerel veriye fallback
  }

  if (dbTreatment) {
    const treatment = {
      title: dbTreatment.title,
      slug: dbTreatment.slug,
      coverImage: dbTreatment.img,
      images: dbTreatment.images,
      stats: dbTreatment.stats as { label: string; val: string }[],
      description: dbTreatment.desc,
      symptoms: dbTreatment.symptoms,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // EN kaydında eksik hasta/röntgen görsellerini TR eşinden tamamla (DB'ye yazmaz)
      treatments: (language === 'en' && Array.isArray(trPairTreatment)
        ? mergePatientImages(dbTreatment.treatment as any[], trPairTreatment as any[])
        : dbTreatment.treatment) as { baslik: string; icerik: string }[],
      faq: dbTreatment.faq as { s: string; c: string }[],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <TedaviDetayClient treatment={treatment as any} isLocal={false} alternateSlug={alternateSlug} />;
  }

  const cleanSlug = stripSlugSuffix(slug);
  const local = TREATMENTS_DATA.find((t) => stripSlugSuffix(t.slug) === cleanSlug);
  if (!local) notFound();

  const treatment = {
    title: local.title,
    slug: local.slug,
    coverImage: local.img,
    images: local.images,
    stats: local.stats,
    description: local.desc,
    symptoms: local.symptoms,
    treatments: local.treatment,
    faq: local.faq,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TedaviDetayClient treatment={treatment as any} isLocal={true} alternateSlug={null} />;
}