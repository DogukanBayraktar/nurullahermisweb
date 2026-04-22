import { getAllTreatments } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedavilerPageClient from '@/components/tedaviler/TedavilerPageClient';

export const revalidate = 60;

export default async function TedavilerPage() {
  const sanityTreatments = await getAllTreatments();
  const combinedTreatments = sanityTreatments.map((treatment: any) => {
    const local = TREATMENTS_DATA.find((item) => item.slug === treatment.slug);

    if (!local) return treatment;

    return {
      ...treatment,
      title: local.title,
      slug: local.slug,
      category: local.category,
      coverImage: local.img,
      description: local.desc,
    };
  });

  TREATMENTS_DATA.forEach((local) => {
    const exists = sanityTreatments.find((s: any) => s.slug === local.slug);

    if (!exists) {
      combinedTreatments.push({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        coverImage: local.img,
        description: local.desc,
      } as any);
    }
  });

  return <TedavilerPageClient initialTreatments={combinedTreatments} />;
}
