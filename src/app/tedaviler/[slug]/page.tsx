// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function TedaviDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let dbTreatment = null;

  try {
    if (hasDatabaseUrl) {
      dbTreatment = await prisma.treatment.findUnique({
        where: { slug },
      });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <TedaviDetayClient treatment={treatment as any} isLocal={true} />;
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
