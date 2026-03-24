'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLocalizedTreatmentCard } from '@/lib/treatments';
import { getLocalizedPath } from '@/lib/routes';

interface Treatment {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  description?: string[];
}

function getBentoClass(slug: string) {
  const bentoClasses: Record<string, string> = {
    'skolyoz-kifoz-cerrahisi': 'md:col-span-7 md:row-span-2 md:col-start-1 md:row-start-1',
    'bel-fitigi-tedavisi': 'md:col-span-5 md:col-start-8 md:row-start-1',
    'boyun-fitigi-cerrahisi': 'md:col-span-5 md:col-start-8 md:row-start-2',
    'cocuk-ortopedisi': 'md:col-span-5 md:col-start-1 md:row-start-3',
    'artroskopik-cerrahi': 'md:col-span-5 md:col-start-1 md:row-start-4',
    'diz-kalca-protezi': 'md:col-span-7 md:row-span-2 md:col-start-6 md:row-start-3',
  };

  return bentoClasses[slug] ?? 'md:col-span-4 md:row-span-1';
}

export default function TedavilerList({ initialTreatments }: { initialTreatments: Treatment[] }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      {initialTreatments.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg font-medium">{t('treatmentsPage.empty')}</p>
        </div>
      ) : (
        <div className="grid auto-rows-[220px] grid-cols-1 gap-6 md:auto-rows-[250px] md:grid-cols-12">
          {initialTreatments.map((item, i) => {
            const gridClass = getBentoClass(item.slug);
            const localizedItem = getLocalizedTreatmentCard(item, i18n.language);

            return (
              <FadeIn key={item._id} delay={0.05 + i * 0.08} direction="up" className={gridClass}>
                <Link href={getLocalizedPath('treatments', i18n.language, item.slug, 'treatment')} className="group block h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
                    {localizedItem.coverImage ? (
                      <img
                        src={localizedItem.coverImage}
                        alt={localizedItem.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3
                        className={`mb-2 font-extrabold leading-tight text-white ${
                          gridClass.includes('col-span-7') ? 'text-2xl md:text-3xl' : 'text-xl'
                        }`}
                      >
                        {localizedItem.title}
                      </h3>
                      {localizedItem.description?.[0] ? (
                        <p className="mb-4 max-w-md line-clamp-2 text-sm leading-relaxed text-white/80">
                          {localizedItem.description[0]}
                        </p>
                      ) : null}
                      <span className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-blue-300 transition-all group-hover:gap-3">
                        {t('treatmentsPage.detailInfo')} <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </>
  );
}
