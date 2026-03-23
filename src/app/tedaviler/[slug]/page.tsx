import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, HelpCircle, Scissors, ChevronRight, ChevronDown } from 'lucide-react';
import { getTreatmentBySlug } from '@/sanity/queries';
import { TREATMENTS_DATA } from '@/lib/treatments';

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
        stats: local.stats,
        description: local.desc,
        symptoms: local.symptoms,
        treatments: local.treatment,
        faq: local.faq,
      };
      isLocal = true;
    }
  }

  if (!treatment) notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <Link
          href="/tedaviler"
          className="mb-8 inline-flex items-center rounded-lg border border-transparent px-4 py-2 font-semibold text-blue-600 transition-colors hover:border-blue-100 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Tüm Tedavilere Dön
        </Link>

        {!isLocal && (
          <div className="mb-4 text-right">
            <Link
              href="/studio"
              className="rounded bg-slate-200 px-3 py-1 text-xs italic text-slate-600 transition-colors hover:bg-blue-100"
            >
              Studio'da Düzenle
            </Link>
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="relative h-56 w-full sm:h-72">
            {treatment.coverImage ? (
              <img src={treatment.coverImage} alt={treatment.title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-7 text-white">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-70">Prof. Dr. M. Nurullah Ermiş</p>
              <h1 className="text-2xl font-extrabold md:text-3xl">{treatment.title}</h1>
            </div>
          </div>

          {treatment.stats?.length > 0 && (
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/60">
              {treatment.stats.map((s: any, i: number) => (
                <div key={i} className="px-2 py-4 text-center">
                  <div className="text-lg font-extrabold text-blue-600">{s.val}</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-12 p-8 md:p-12">
            {treatment.description?.length > 0 && (
              <section>
                <h2 className="mb-6 border-b-2 border-blue-50 pb-2 text-2xl font-bold text-slate-900">
                  {treatment.title} Nedir?
                </h2>
                <div className="space-y-4">
                  {treatment.description.map((p: string, i: number) => (
                    <p key={i} className="text-[1.05rem] leading-relaxed text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            )}

            {treatment.symptoms?.length > 0 && (
              <section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 md:p-8">
                <h3 className="mb-5 flex items-center gap-2.5 text-xl font-bold text-slate-900">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                  Belirtiler - Ne Zaman Doktora Gitmelisiniz?
                </h3>
                <ul className="space-y-3">
                  {treatment.symptoms.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {treatment.treatments?.length > 0 && (
              <section>
                <h2 className="mb-6 border-b-2 border-blue-50 pb-2 text-2xl font-bold text-slate-900">Tedavi Yöntemleri</h2>
                <div className="space-y-4">
                  {treatment.treatments.map((t: any, i: number) => (
                    <div key={i} className="rounded-xl border border-blue-100 bg-blue-50/60 p-5 transition-colors hover:border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-white">
                          <Scissors className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="mb-2 font-bold text-slate-900">{t.baslik}</p>
                          <p className="text-sm leading-relaxed text-slate-600">{t.icerik}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {treatment.faq?.length > 0 && (
              <section>
                <h2 className="mb-6 border-b-2 border-blue-50 pb-2 text-2xl font-bold text-slate-900">Sıkça Sorulan Sorular</h2>
                <div className="space-y-3">
                  {treatment.faq.map((item: any, i: number) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center gap-3 bg-slate-50/80 px-5 py-4">
                          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                          <p className="text-sm font-bold leading-snug text-slate-900">{item.s}</p>
                          <ChevronDown className="ml-auto h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="border-t border-slate-50 px-5 py-4 pl-12">
                          <p className="text-sm leading-relaxed text-slate-600">{item.c}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div
              className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-2xl shadow-sky-950/20 md:flex-row md:p-10 hero-bg"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-cyan-300/15 blur-2xl" />
              <div className="relative z-10 text-center md:text-left">
                <p className="mb-2 text-xl font-bold text-white">{treatment.title} için randevu alın</p>
                <p className="text-sm text-sky-100">Prof. Dr. Ermiş ile uzman değerlendirmesi için hemen iletişime geçin.</p>
              </div>
              <Link
                href="/iletisim"
                className="relative z-10 shrink-0 whitespace-nowrap rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-sky-900 shadow-lg transition-all hover:scale-[1.02] hover:bg-sky-50"
              >
                Hemen Randevu Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}