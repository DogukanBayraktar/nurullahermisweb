'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import '@/lib/i18n';
import { getCurrentLanguage, healthGuideUi } from '@/lib/healthGuideTranslations';
import { getLocalizedPath } from '@/lib/routes';

interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: number | string;
  publishedAt: string;
  coverImage?: string;
}

export default function BlogList({ initialArticles }: { initialArticles: Article[] }) {
  const { i18n } = useTranslation();
  const lang = getCurrentLanguage(i18n.language);
  const ui = healthGuideUi[lang];
  const [activeCategory, setActiveCategory] = useState<string>(ui.all);
  const [visibleCount, setVisibleCount] = useState(7);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => [ui.all, ...Array.from(new Set(initialArticles.map((a) => a.category).filter(Boolean)))], [initialArticles, ui.all]);

  useEffect(() => {
    setActiveCategory(ui.all);
    setVisibleCount(7);
  }, [ui.all]);

  const filtered =
    activeCategory === ui.all
      ? initialArticles
      : initialArticles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1, Math.max(visibleCount, 1));
  const hasMore = filtered.length > visibleCount;

  const scrollFilters = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(7);
  };

  const formatReadTime = (value: number | string | undefined) => {
    if (typeof value === 'number') return `${value} ${ui.minutesSuffix}`;
    const match = String(value ?? 5).match(/\d+/);
    return `${match?.[0] ?? 5} ${ui.minutesSuffix}`;
  };

  return (
    <>
      <FadeIn direction="up" delay={0.1}>
        <div className="relative mb-12">
          <button
            type="button"
            onClick={() => scrollFilters('left')}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 md:flex"
            aria-label={ui.scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-visible px-4 py-2.5 touch-pan-x md:px-14 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max min-w-full flex-nowrap gap-2.5 md:min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {cat}
                  {cat !== ui.all && (
                    <span
                      className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {initialArticles.filter((a) => a.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollFilters('right')}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 md:flex"
            aria-label={ui.scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg font-medium">{ui.noArticles}</p>
        </div>
      ) : (
        <>
          {featured && (
            <FadeIn direction="up" delay={0.15}>
              <Link href={getLocalizedPath('healthGuide', i18n.language, featured.slug, 'article')} className="group mb-8 block">
                <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-400 hover:shadow-2xl hover:shadow-slate-200/60 md:flex-row">
                  <div className="relative h-64 overflow-hidden bg-slate-100 md:h-auto md:w-1/2">
                    {featured.coverImage ? (
                      <img
                        src={featured.coverImage}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-200">✎</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      {featured.category && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                          {featured.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" /> {formatReadTime(featured.readTime)}
                      </span>
                    </div>
                    <h2 className="mb-4 text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-blue-700 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">{featured.summary}</p>
                    <span className="flex items-center gap-2 text-sm font-bold text-blue-600 transition-all group-hover:gap-3">
                      {ui.readMore} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}

          {rest.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((a, i) => (
                  <FadeIn key={a._id} delay={0.05 + i * 0.07} direction="up">
                    <Link href={getLocalizedPath('healthGuide', i18n.language, a.slug, 'article')} className="group block h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-400 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60">
                        <div className="relative h-48 overflow-hidden bg-slate-100">
                          {a.coverImage ? (
                            <img
                              src={a.coverImage}
                              alt={a.title}
                              className="h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-200">✎</div>
                          )}
                          <div className="absolute left-3 top-3">
                            {a.category && (
                              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 shadow-sm backdrop-blur-sm">
                                {a.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex items-center gap-3 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {formatReadTime(a.readTime)}
                            </span>
                          </div>
                          <h3 className="mb-3 flex-1 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                            {a.title}
                          </h3>
                          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-500">{a.summary}</p>
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2.5">
                            {ui.readMore} <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              {hasMore && (
                <FadeIn direction="up" delay={0.12}>
                  <div className="mt-20 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + 6)}
                      className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {ui.showMore}
                    </button>
                  </div>
                </FadeIn>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}