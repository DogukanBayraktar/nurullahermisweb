import { getAllTreatments } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedavilerList from '@/components/tedaviler/TedavilerList';
import { FadeIn } from "@/components/ui/fade-in";

export const revalidate = 60;

export default async function TedavilerPage() {
  // Hem Sanity'den hem de yerel dosyadan verileri al
  const sanityTreatments = await getAllTreatments();
  
  // Sanity verilerini yerel verilerle birleştir (Slug çakışması varsa Sanity'yi tercih et)
  const combinedTreatments = [...sanityTreatments];
  
  TREATMENTS_DATA.forEach(local => {
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

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        <FadeIn direction="up">
          <div className="mb-14 text-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Tedavi Alanları</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Uzmanlık Alanları & Tedaviler
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Prof. Dr. M. Nurullah Ermiş'in <strong className="text-slate-900">ortopedi, omurga cerrahisi ve çocuk ortopedisi</strong> alanlarındaki tedavi yöntemleri hakkında kapsamlı bilgi edinin.
            </p>
          </div>
        </FadeIn>

        {/* Client component for filtering and bento grid display */}
        <TedavilerList initialTreatments={combinedTreatments} />

      </div>
    </div>
  );
}