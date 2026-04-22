import { TREATMENTS_DATA } from '@/lib/treatments';
import TedavilerPageClient from '@/components/tedaviler/TedavilerPageClient';

export const revalidate = 60;

export default async function TedavilerPage() {
  const combinedTreatments = TREATMENTS_DATA.map((local) => ({
    _id: `local-${local.slug}`,
    title: local.title,
    slug: local.slug,
    category: local.category,
    coverImage: local.img,
    description: local.desc,
  }));

  return <TedavilerPageClient initialTreatments={combinedTreatments} />;
}
