'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, UserRound, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getCurrentLanguage, getTranslatedLocalArticle, healthGuideUi } from '@/lib/healthGuideTranslations';
import { getLocalizedPath } from '@/lib/routes';

type RelatedArticle = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  coverImage?: string;
};

type LocalSection = {
  h2: string;
  content: string;
};

type ArticleDetail = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: string | number;
  publishedAt: string;
  coverImage?: string;
  _localContent?: {
    sections: LocalSection[];
    intro?: string;
  } | null;
};

export default function HealthGuideDetailClient({
  article,
  isLocal,
  otherArticles,
}: {
  article: ArticleDetail;
  isLocal: boolean;
  otherArticles: RelatedArticle[];
}) {
  const { i18n } = useTranslation();
  const lang = getCurrentLanguage(i18n.language);
  const ui = healthGuideUi[lang];

  const translatedLocal = getTranslatedLocalArticle(article.slug, lang);

  const displayArticle = useMemo(() => {
    if (!isLocal || !translatedLocal) return article;
    return {
      ...article,
      title: translatedLocal.title,
      category: translatedLocal.category,
      summary: translatedLocal.desc,
      readTime: translatedLocal.readTime,
      publishedAt: translatedLocal.date,
      coverImage: translatedLocal.img,
      _localContent: {
        intro: translatedLocal.intro,
        sections: translatedLocal.sections,
      },
    };
  }, [article, isLocal, translatedLocal]);

  const displayOtherArticles = useMemo(
    () =>
      otherArticles.map((related) => {
        const translated = getTranslatedLocalArticle(related.slug, lang);
        if (!translated) return related;
        return {
          ...related,
          title: translated.title,
          category: translated.category,
          publishedAt: translated.date,
          coverImage: translated.img,
        };
      }),
    [otherArticles, lang]
  );

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <Link
          href={getLocalizedPath('healthGuide', i18n.language)}
          className="mb-8 inline-flex items-center rounded-lg border border-transparent px-4 py-2 font-semibold text-blue-600 transition-colors hover:border-blue-100 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {ui.backToAll}
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="relative h-[280px] w-full bg-slate-100 md:h-[420px]">
                {displayArticle.coverImage ? (
                  <img src={displayArticle.coverImage} className="absolute inset-0 h-full w-full object-cover" alt={displayArticle.title} />
                ) : (
                  <div className="absolute inset-0 bg-blue-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 text-white">
                  <span className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                    {displayArticle.category}
                  </span>
                  <h1 className="text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">{displayArticle.title}</h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 border-b border-slate-100 bg-slate-50/30 px-8 py-5 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-blue-600" /> {displayArticle.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-600" /> {displayArticle.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <UserRound className="h-4 w-4 text-blue-600" /> {ui.author}
                </span>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-10 border-b border-slate-100 pb-8 text-lg font-medium italic leading-relaxed text-slate-700 md:text-xl">
                  {displayArticle.summary}
                </div>

                {isLocal && displayArticle._localContent ? (
                  <div className="space-y-10">
                    {displayArticle._localContent.intro ? (
                      <section>
                        <div className="whitespace-pre-line space-y-3 text-[1.05rem] leading-relaxed text-slate-600">
                          {displayArticle._localContent.intro.split('\n\n').map((para: string, j: number) => (
                            <p key={j}>{para}</p>
                          ))}
                        </div>
                      </section>
                    ) : null}
                    {displayArticle._localContent.sections.map((section: LocalSection, i: number) => (
                      <section key={i}>
                        <h2 className="mb-4 border-b-2 border-blue-50 pb-2 text-xl font-bold text-slate-900 md:text-2xl">
                          {section.h2}
                        </h2>
                        <div className="whitespace-pre-line space-y-3 text-[1.05rem] leading-relaxed text-slate-600">
                          {section.content.split('\n\n').map((para: string, j: number) => (
                            <p key={j}>{para}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : null}

                <div className="mt-16 flex items-center gap-5 rounded-3xl border border-slate-100 bg-slate-50 p-8">
                  <img
                    src="/nurullah-hoca1.avif"
                    alt={ui.author}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top shadow-md"
                  />
                  <div>
                    <p className="text-lg font-extrabold text-slate-900">{ui.author}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{ui.authorTitle}</p>
                    <Link
                      href={getLocalizedPath('about', i18n.language)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-blue-600 transition-all hover:gap-2"
                    >
                      {ui.bioLink} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-40 space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 p-7 text-center text-white shadow-2xl shadow-sky-950/20 hero-bg">
                <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-cyan-300/15 blur-2xl" />
                <div className="relative">
                  <h4 className="mb-2 text-lg font-bold">{ui.appointmentTitle}</h4>
                  <p className="mb-6 text-sm leading-relaxed text-sky-100">{ui.appointmentText}</p>
                  <Link
                    href={getLocalizedPath('contact', i18n.language)}
                    className="block rounded-xl bg-white px-4 py-3.5 text-sm font-extrabold text-sky-900 shadow-md transition-colors hover:bg-sky-50"
                  >
                    {ui.appointmentCta}
                  </Link>
                </div>
              </div>

              {displayOtherArticles.length > 0 && (
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h4 className="mb-4 text-lg font-extrabold text-slate-900">{ui.otherArticles}</h4>
                  <div className="space-y-3">
                    {displayOtherArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={getLocalizedPath('healthGuide', i18n.language, related.slug, 'article')}
                        className="group flex items-stretch gap-3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-blue-200 hover:bg-blue-50/70"
                      >
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                          {related.coverImage ? (
                            <img
                              src={related.coverImage}
                              alt={related.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-sky-100 to-cyan-100" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
                        </div>
                        <div className="min-w-0 flex-1 py-1">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">{related.category}</p>
                          <p className="line-clamp-3 text-sm font-bold leading-relaxed text-slate-900 group-hover:text-blue-700">
                            {related.title}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">{related.publishedAt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
