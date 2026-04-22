import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';

export const revalidate = 60;

export default async function TedaviDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const local = TREATMENTS_DATA.find((t) => t.slug === slug);
  const isLocal = Boolean(local);
  const treatment = local
    ? {
        title: local.title,
        slug: local.slug,
        coverImage: local.img,
        images: local.images,
        stats: local.stats,
        description: local.desc,
        symptoms: local.symptoms,
        treatments: local.treatment,
        faq: local.faq,
      }
    : null;

  if (!treatment) {
    notFound();
  }

  return <TedaviDetayClient treatment={treatment as any} isLocal={isLocal} />;
}
