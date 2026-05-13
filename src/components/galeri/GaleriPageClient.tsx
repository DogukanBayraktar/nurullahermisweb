'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Images, X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { FadeIn } from '@/components/ui/fade-in';
import { getLocalizedGalleryCategories, type GalleryCategory } from '@/lib/gallery';
import { getLocalizedPath } from '@/lib/routes';

export default function GaleriPageClient({ 
  initialCategories,
  language 
}: { 
  initialCategories: any[];
  language?: string;
}) {
  const { t, i18n } = useTranslation();
  
  const categories = useMemo(() => {
    const isEn = i18n.language.startsWith('en');
    return initialCategories.map(cat => ({
      slug: cat.slug,
      title: isEn ? (cat.title_en || cat.title_tr) : cat.title_tr,
      category: isEn ? (cat.category_en || cat.category_tr) : cat.category_tr,
      images: cat.images
    }));
  }, [initialCategories, i18n.language]);

  const [activeImage, setActiveImage] = useState<{ categorySlug: string; imageIndex: number } | null>(null);

  const activeCategory = useMemo(
    () => categories.find((item) => item.slug === activeImage?.categorySlug) ?? null,
    [categories, activeImage]
  );

  const activeImageSrc = activeCategory && activeImage ? activeCategory.images[activeImage.imageIndex] : null;

  useEffect(() => {
    if (!activeCategory || !activeImage) {
      document.body.style.overflow = 'unset';
      return;
    }

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveImage((current) => {
          if (!current || current.categorySlug !== activeCategory.slug) return current;
          return {
            ...current,
            imageIndex: (current.imageIndex + 1) % activeCategory.images.length,
          };
        });
      }

      if (event.key === 'ArrowLeft') {
        setActiveImage((current) => {
          if (!current || current.categorySlug !== activeCategory.slug) return current;
          return {
            ...current,
            imageIndex: (current.imageIndex - 1 + activeCategory.images.length) % activeCategory.images.length,
          };
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCategory, activeImage]);

  function openLightbox(categorySlug: string, imageIndex: number) {
    setActiveImage({ categorySlug, imageIndex });
  }

  function stepImage(direction: 'next' | 'prev') {
    if (!activeCategory) return;

    setActiveImage((current) => {
      if (!current || current.categorySlug !== activeCategory.slug) return current;

      const nextIndex =
        direction === 'next'
          ? (current.imageIndex + 1) % activeCategory.images.length
          : (current.imageIndex - 1 + activeCategory.images.length) % activeCategory.images.length;

      return {
        ...current,
        imageIndex: nextIndex,
      };
    });
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_18%,#f8fafc_55%,#ffffff_100%)] py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{t('galleryPage.badge')}</p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              {t('galleryPage.title')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {t('galleryPage.subtitle')}
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.08}>
          <div className="mb-14 rounded-[2rem] border border-sky-100 bg-white/80 p-5 shadow-[0_20px_60px_-35px_rgba(14,116,144,0.35)] backdrop-blur-sm md:p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Images className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{t('galleryPage.quickJump')}</p>
                <p className="text-sm text-slate-500">{t('galleryPage.quickJumpSubtitle')}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="space-y-12">
          {categories.map((item, index) => (
            <FadeIn key={item.slug} direction="up" delay={0.06 * index} id={item.slug}>
              <section className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.25)]">
                <div className="border-b border-slate-100 bg-[linear-gradient(135deg,#eff6ff_0%,#f8fafc_48%,#ecfeff_100%)] p-6 md:p-8">
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">{item.category}</p>
                      <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">{item.title}</h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                        {t('galleryPage.imageCount', { count: item.images.length })}
                      </span>
                      <Link
                        href={getLocalizedPath('treatments', i18n.language, item.slug, 'treatment')}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700"
                      >
                        {t('galleryPage.viewTreatment')}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-5 xl:grid-cols-3">
                  {item.images.map((image: string, imageIndex: number) => (
                    <button
                      type="button"
                      key={`${item.slug}-${image}-${imageIndex}`}
                      onClick={() => openLightbox(item.slug, imageIndex)}
                      className="group relative overflow-hidden rounded-[1.5rem] bg-slate-100 text-left"
                    >
                      <Image
                        src={image}
                        alt={`${item.title} ${imageIndex + 1}`}
                        width={1200}
                        height={900}
                        className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-transparent" />
                      <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white/25">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">
                          {t('galleryPage.beforeAfterLabel')}
                        </p>
                        <p className="mt-2 text-lg font-extrabold text-white">{item.title}</p>
                        <p className="mt-2 text-sm text-white/75">{t('galleryPage.openLightbox')}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>

      {activeCategory && activeImage && activeImageSrc ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/92 p-4 backdrop-blur-md md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a_0%,rgba(2,6,23,0.1)_40%,rgba(2,6,23,0)_70%)]" />

          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 z-[122] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 md:right-8 md:top-8"
            aria-label={t('galleryPage.closeLightbox')}
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              stepImage('prev');
            }}
            className="absolute left-3 top-1/2 z-[122] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 md:left-8"
            aria-label={t('galleryPage.previousImage')}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              stepImage('next');
            }}
            className="absolute right-3 top-1/2 z-[122] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 md:right-8"
            aria-label={t('galleryPage.nextImage')}
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div
            className="relative z-[121] mx-auto flex w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-1 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">{activeCategory.category}</p>
                <h3 className="mt-2 text-xl font-extrabold md:text-2xl">{activeCategory.title}</h3>
              </div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                {activeImage.imageIndex + 1} / {activeCategory.images.length}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src={activeImageSrc}
                alt={`${activeCategory.title} ${activeImage.imageIndex + 1}`}
                width={1600}
                height={1200}
                priority
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-3 overflow-x-auto pb-1">
              {activeCategory.images.map((image: string, thumbIndex: number) => {
                const isActive = thumbIndex === activeImage.imageIndex;

                return (
                  <button
                    key={`${activeCategory.slug}-thumb-${thumbIndex}`}
                    type="button"
                    onClick={() => setActiveImage({ categorySlug: activeCategory.slug, imageIndex: thumbIndex })}
                    className={`relative overflow-hidden rounded-2xl border transition-all ${
                      isActive
                        ? 'border-sky-300 shadow-[0_15px_40px_-20px_rgba(56,189,248,0.8)]'
                        : 'border-white/10 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${activeCategory.title} küçük görsel ${thumbIndex + 1}`}
                      width={160}
                      height={120}
                      className="h-20 w-28 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
