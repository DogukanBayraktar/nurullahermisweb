import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, HelpCircle, Scissors, ChevronRight } from 'lucide-react';
import { getTreatmentBySlug, getAllTreatments } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';

export const revalidate = 60;

export default async function TedaviDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Önce Sanity'den ara
  let treatment = await getTreatmentBySlug(slug);
  let isLocal = false;

  // Eğer Sanity'de yoksa yerel veriden al
  if (!treatment) {
    const local = TREATMENTS_DATA.find((t) => t.slug === slug);
    if (local) {
      treatment = {
        title: local.title,
        slug: local.slug,
        coverImage: local.img,
        stats: local.stats,
        description: local.desc,
        symptoms: local.symptoms,
        treatments: local.treatment, // yerel dosyada adı "treatment"
        faq: local.faq,
      };
      isLocal = true;
    }
  }

  if (!treatment) notFound();

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        <Link href="/tedaviler" 
          className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 text-sm">
          <ArrowLeft className="w-4 h-4" /> Tüm Tedaviler
        </Link>
        
        {/* Opsiyonel: Admin/Edit butonu sadece sanity de varsa */}
        {!isLocal && (
           <div className="mb-4 text-right">
             <Link href="/studio" className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded hover:bg-blue-100 italic transition-colors">
               Studio'da Düzenle
             </Link>
           </div>
        )}

        <div className="overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl bg-white">
          
          {/* Header/Hero Section */}
          <div className="h-56 sm:h-72 w-full relative">
            {treatment.coverImage ? (
               <img src={treatment.coverImage} alt={treatment.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
               <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-7 text-white">
              <p className="opacity-70 text-xs font-semibold uppercase tracking-widest mb-1">
                Prof. Dr. M. Nurullah Ermiş
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold">{treatment.title}</h1>
            </div>
          </div>

          {/* Quick Stats */}
          {treatment.stats?.length > 0 && (
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/60">
              {treatment.stats.map((s: any, i: number) => (
                <div key={i} className="text-center py-4 px-2">
                  <div className="text-lg font-extrabold text-blue-600">{s.val}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="p-8 md:p-12 space-y-12">
            
            {/* Açıklama */}
            {treatment.description?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  {treatment.title} Nedir?
                </h2>
                <div className="space-y-4">
                  {treatment.description.map((p: string, i: number) => (
                    <p key={i} className="text-slate-600 text-[1.05rem] leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Belirtiler */}
            {treatment.symptoms?.length > 0 && (
              <section className="bg-amber-50/60 border border-amber-100 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  Belirtiler — Ne Zaman Doktora Gitmelisiniz?
                </h3>
                <ul className="space-y-3">
                  {treatment.symptoms.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tedavi Yöntemleri */}
            {treatment.treatments?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  Tedavi Yöntemleri
                </h2>
                <div className="space-y-4">
                  {treatment.treatments.map((t: any, i: number) => (
                    <div key={i} className="p-5 bg-blue-50/60 border border-blue-100 rounded-xl hover:border-blue-200 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 bg-white rounded-lg border border-blue-100 flex items-center justify-center shrink-0">
                          <Scissors className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 mb-2">{t.baslik}</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{t.icerik}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SSS */}
            {treatment.faq?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                  Sıkça Sorulan Sorular
                </h2>
                <div className="space-y-3">
                  {treatment.faq.map((item: any, i: number) => (
                    <div key={i} className="border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <details className="group">
                        <summary className="flex items-center gap-3 px-5 py-4 bg-slate-50/80 cursor-pointer list-none">
                          <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <p className="font-bold text-slate-900 text-sm leading-snug">{item.s}</p>
                          <span className="ml-auto transform group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-5 py-4 pl-12 border-t border-slate-50">
                          <p className="text-slate-600 text-sm leading-relaxed">{item.c}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 text-center md:text-left">
                <p className="text-white font-bold text-xl mb-2">{treatment.title} için randevu alın</p>
                <p className="text-slate-400 text-sm">Prof. Dr. Ermiş ile uzman değerlendirmesi için hemen iletişime geçin.</p>
              </div>
              <Link href="/iletisim" 
                className="shrink-0 relative z-10 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 whitespace-nowrap">
                Hemen Randevu Al
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
