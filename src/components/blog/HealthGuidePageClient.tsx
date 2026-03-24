'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import BlogList from '@/components/blog/BlogList';
import { FadeIn } from '@/components/ui/fade-in';
import { getCurrentLanguage, getTranslatedLocalArticle, healthGuideUi } from '@/lib/healthGuideTranslations';

type Article = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: number | string;
  publishedAt: string;
  coverImage?: string;
};

export default function HealthGuidePageClient({ initialArticles }: { initialArticles: Article[] }) {
  const { i18n } = useTranslation();
  const lang = getCurrentLanguage(i18n.language);
  const ui = healthGuideUi[lang];

  const translatedArticles = useMemo(
    () =>
      initialArticles.map((article) => {
        const localArticle = getTranslatedLocalArticle(article.slug, lang);
        if (!localArticle || !article._id.startsWith('local-')) return article;
        return {
          ...article,
          title: localArticle.title,
          category: localArticle.category,
          summary: localArticle.desc,
          readTime: localArticle.readTime,
          publishedAt: localArticle.date,
          coverImage: localArticle.img,
        };
      }),
    [initialArticles, lang]
  );

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{ui.badge}</p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{ui.title}</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">{ui.description}</p>
          </div>
        </FadeIn>

        <BlogList initialArticles={translatedArticles} />
      </div>
    </div>
  );
}
