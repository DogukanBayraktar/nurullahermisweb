import { notFound } from 'next/navigation';
import { getTreatmentBySlug } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';

export const revalidate = 60;

export default async function TedaviDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let treatment = await getTreatmentBySlug(slug);
  let isLocal = false;

  if (!treatment) {
    const local = TREATMENTS_DATA.find((t) => t.slug === slug);

    if (local) {
      treatment = {
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
      isLocal = true;
    }
  }

  if (!treatment) {
    notFound();
  }

  return <TedaviDetayClient treatment={treatment as any} isLocal={isLocal} />;
}
