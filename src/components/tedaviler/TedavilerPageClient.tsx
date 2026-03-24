'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import TedavilerList from '@/components/tedaviler/TedavilerList';
import { FadeIn } from '@/components/ui/fade-in';

interface Treatment {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  description?: string[];
}

export default function TedavilerPageClient({ initialTreatments }: { initialTreatments: Treatment[] }) {
  const { t } = useTranslation();

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up">
          <div className="mb-14 text-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t('treatmentsPage.badge')}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {t('treatmentsPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('treatmentsPage.subtitle')}
            </p>
          </div>
        </FadeIn>

        <TedavilerList initialTreatments={initialTreatments} />
      </div>
    </div>
  );
}
