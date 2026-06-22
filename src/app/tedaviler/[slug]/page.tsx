// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';

export const revalidate = 86400;

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
      if (language === 'en') {
        const candidateSlugs = [`${slug}_en`];
        const normalizedOriginal = originalSlug?.replace(/_tr$/, '').replace(/_en$/, '');
        if (normalizedOriginal && normalizedOriginal !== slug) {
          candidateSlugs.push(`${normalizedOriginal}_en`);
        }

        dbTreatment = await prisma.treatment.findFirst({
          where: {
            OR: candidateSlugs.map((candidate) => ({ slug: candidate })),
          },
        });

        if (!dbTreatment) {
          dbTreatment = await prisma.treatment.findUnique({
            where: { slug },
          });
        }
      } else {
        dbTreatment = await prisma.treatment.findUnique({
          where: { slug },
        });
      }
    }
  } catch {
    // DB hazir degilse statik veriye dus.
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
    // DB content should be rendered as-is; static translation fallback is only for local data.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
