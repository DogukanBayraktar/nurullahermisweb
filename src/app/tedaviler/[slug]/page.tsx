// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const revalidate = 86400;
export const dynamicParams = true; 


const getAllTreatmentSlugs = unstable_cache(
  async () => {
    const rows = await prisma.treatment.findMany({ select: { slug: true } });
    return new Set(rows.map((r) => r.slug));
  },
  ['treatment-slug-allowlist'],
  { revalidate: 86400 }
);

export async function generateStaticParams() {
  try {
    const slugs = await getAllTreatmentSlugs();
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

const getTreatmentEn = unstable_cache(
  async (slug: string, normalizedOriginal: string | undefined) => {
    const candidateSlugs = [`${slug}_en`];
    if (normalizedOriginal && normalizedOriginal !== slug) {
      candidateSlugs.push(`${normalizedOriginal}_en`);
    }

    const found = await prisma.treatment.findFirst({
      where: {
        OR: candidateSlugs.map((candidate) => ({ slug: candidate })),
      },
    });

    if (found) return found;

    return await prisma.treatment.findUnique({ where: { slug } });
  },
  ['treatment-detail-en'],
  { revalidate: 86400 }
);

const getTreatmentTr = unstable_cache(
  async (slug: string) => {
    return await prisma.treatment.findUnique({ where: { slug } });
  },
  ['treatment-detail-tr'],
  { revalidate: 86400 }
);

export default async function TedaviDetayPage({
  params,
  language = 'tr',
}: {
  params: Promise<{ slug: string; originalSlug?: string }>;
  language?: 'tr' | 'en';
}) {
  const { slug, originalSlug } = await params;
  let dbTreatment = null;

  try {
    if (hasDatabaseUrl) {
     
      const knownSlugs = await getAllTreatmentSlugs();
      const normalizedOriginal = originalSlug?.replace(/_tr$/, '').replace(/_en$/, '');
      const possiblyInDb =
        knownSlugs.has(slug) ||
        knownSlugs.has(`${slug}_en`) ||
        (normalizedOriginal ? knownSlugs.has(`${normalizedOriginal}_en`) : false);

      if (possiblyInDb) {
        if (language === 'en') {
          dbTreatment = await getTreatmentEn(slug, normalizedOriginal);
        } else {
          dbTreatment = await getTreatmentTr(slug);
        }
      }
    }
  } catch {
   
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
      treatments: dbTreatment.treatment as { baslik: string; icerik: string }[],
      faq: dbTreatment.faq as { s: string; c: string }[],
    };
    
    return <TedaviDetayClient treatment={treatment as any} isLocal={false} />;
  }

  const local = TREATMENTS_DATA.find((t) => t.slug === slug);
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
  return <TedaviDetayClient treatment={treatment as any} isLocal={true} />;
}
