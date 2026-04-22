import { notFound } from 'next/navigation';
import { getTreatmentBySlug } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';

export const revalidate = 60;

export default async function TedaviDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let treatment = await getTreatmentBySlug(slug);
  const local = TREATMENTS_DATA.find((t) => t.slug === slug);
  let isLocal = Boolean(local);

  if (treatment && local) {
    treatment = {
      ...treatment,
      title: local.title,
      slug: local.slug,
      category: local.category,
      coverImage: local.img,
      images: local.images,
      stats: local.stats,
      description: local.desc,
      symptoms: local.symptoms,
      treatments: local.treatment,
      faq: local.faq,
    };
  }

  if (!treatment) {
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
    }
  }

  if (!treatment) {
    notFound();
  }

  return <TedaviDetayClient treatment={treatment as any} isLocal={isLocal} />;
}
