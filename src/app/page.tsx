'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Star, Quote, Play } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLocalizedPath } from '@/lib/routes';

const TESTIMONIALS = [
  { author: "Mehmet A." },
  { author: "Ayşe K." },
  { author: "Hüseyin T." },
  { author: "Fatma S." },
];

const BEFORE_AFTER = [
  { img: "/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif" },
  { img: "/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif" },
  { img: "/images/69b80d3d2324c321ba53cae5_Kyphosis-before-after-1.jpg.avif" },
  { img: "/images/69b803d47b548c348c11664f_diz-protezi-before-after-1.jpg.avif" },
  { img: "/images/69b8010e9d8850fbd786d629_kyphoscoliosis-2.jpg.avif" },
];

const PATIENT_STORIES = [
  { age: 14, tagColor: "bg-blue-600", img: "/images/mehmet.png" },
  { age: 52, tagColor: "bg-teal-600", img: "/images/ayse.png", imagePosition: "70% center" },
  { age: 68, tagColor: "bg-indigo-600", img: "/images/huseyin-toprak.png", imagePosition: "74% center" },
];


const YOUTUBE_VIDEOS = [
  { titleKey: "home.videos.scoliosisSurgery", videoId: "gryuYiNd6WI", isShort: false, thumb: "https://img.youtube.com/vi/gryuYiNd6WI/maxresdefault.jpg" },
  { titleKey: "home.videos.herniationSurgery", videoId: "MOw6U2iJQew", isShort: false, thumb: "https://img.youtube.com/vi/MOw6U2iJQew/maxresdefault.jpg" },
  { titleKey: "home.videos.kneeSurgery", videoId: "4kZKY8hnwDo", isShort: false, thumb: "https://img.youtube.com/vi/4kZKY8hnwDo/maxresdefault.jpg" },
];

function ResultsSlider({ items }: { items: Array<{ img: string; label: string; desc: string }> }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  // 3 kart göster, current indeksten başlayarak
  const visibleItems = [0, 1].map(offset => items[(current + offset) % total]);

  return (
    <div className="relative w-full">
      {/* Kart sırası */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {visibleItems.map((item, i) => (
          <div
            key={`${current}-${i}`}
            className={`overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i > 0 ? 'hidden md:block' : ''}`}
          >
            <div className="relative h-80 overflow-hidden lg:h-[23rem]">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                {item.label}
              </div>
            </div>
            <div className="p-6 lg:p-7">
              <h3 className="mb-2 text-lg font-bold text-slate-900 lg:text-xl">{item.label}</h3>
              <p className="text-sm leading-relaxed text-slate-500 lg:text-[15px]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigasyon */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="cursor-pointer w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
            />
          ))}
        </div>
        <button onClick={next} className="cursor-pointer w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center transition-all shadow-sm">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
}


function PatientStoriesSlider({ items }: { items: Array<{ name: string; age: number; tag: string; tagColor: string; summary: string; story: string; result: string; img: string; date: string; imagePosition?: string }> }) {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [total]);

  const story = items[current];

  return (
    <div className="relative">
      <div className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <div className="flex flex-col lg:flex-row min-h-[520px]">
          <div className="w-full lg:w-2/5 relative min-h-[280px] lg:min-h-full">
            <img
              src={story.img}
              alt={story.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: story.imagePosition ?? "center center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full mb-3 ${story.tagColor}`}>
                {story.tag}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-extrabold text-white text-sm">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-base">{story.name}</p>
                  <p className="text-white/70 text-sm">{story.age} {t("home.patientStories.yearsOld")} · {story.date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">
              {t("home.patientStories.storyLabel")}
            </p>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5 leading-snug">
              &ldquo;{story.summary}&rdquo;
            </h3>

            <p className="text-slate-500 leading-relaxed mb-8 text-base md:text-lg">
              {story.story}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm px-4 py-2 rounded-xl whitespace-nowrap">
                <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                {story.result}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-10 bg-blue-600" : "w-2 bg-blue-100 hover:bg-blue-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n?.resolvedLanguage || i18n?.language || 'tr';
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openVideo, setOpenVideo] = useState<{ id: string; isShort: boolean } | null>(null);

  const testimonials = t('testimonialsData', { returnObjects: true }) as Array<{ text: string; author: string; detail: string }>;

  const beforeAfter = BEFORE_AFTER.map((item, index) => ({
    ...item,
    label: t(`home.results.items.${index}.label`),
    desc: t(`home.results.items.${index}.desc`),
  }));

  const patientStories = PATIENT_STORIES.map((item, index) => ({
    ...item,
    name: t(`patientStoriesData.${['mehmet', 'ayse', 'huseyin'][index]}.name`),
    tag: t([
      'home.patientStories.scoliosisSurgery',
      'home.patientStories.herniation',
      'home.patientStories.kneeProsthesis',
    ][index]),
    summary: t(`patientStoriesData.${['mehmet', 'ayse', 'huseyin'][index]}.summary`),
    story: t(`patientStoriesData.${['mehmet', 'ayse', 'huseyin'][index]}.story`),
    result: t(`patientStoriesData.${['mehmet', 'ayse', 'huseyin'][index]}.result`),
    date: t(`patientStoriesData.${['mehmet', 'ayse', 'huseyin'][index]}.date`),
  }));

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  // ESC ile video kapat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenVideo(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_16%,#f8fbff_46%,#ffffff_72%,#f8fafc_100%)]">

      {/* ═══════════════ 1. HERO (Value Prop) ═══════════════ */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 35%, #0e7490 65%, #0891b2 100%)' }}>

        {/* Soft radial glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 65%)' }} />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 min-h-[600px] lg:min-h-[680px]">

            {/* Sol — metin */}
            <div className="w-full lg:w-1/2 py-20 lg:py-28 lg:pr-16">
              <FadeIn delay={0.1} direction="down">
                <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-semibold text-sky-200 mb-7 gap-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  {t('home.hero.badge')}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-3 leading-[1.08]">
                  Prof. Dr. M. Nurullah Ermiş
                </h1>
                <p className="text-xl md:text-2xl text-sky-200 font-semibold mb-7">{t('home.hero.title')}</p>
              </FadeIn>

              <FadeIn delay={0.3} direction="up">
                <p className="text-base md:text-lg text-sky-100/80 mb-10 max-w-xl leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
              </FadeIn>

              <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-3">
                <Link href={getLocalizedPath('contact', currentLang)}>
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto shadow-xl hover:scale-[1.02] transition-all duration-200 rounded-xl">
                    {t('home.hero.cta')}
                  </Button>
                </Link>
                <Link href={getLocalizedPath('treatments', currentLang)}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:text-white font-semibold text-sm py-4 px-8 h-auto backdrop-blur-sm rounded-xl transition-all duration-200">
                    {t('nav.treatments')}
                  </Button>
                </Link>
              </FadeIn>

              <FadeIn delay={0.55} direction="none">
                <div className="mt-12 grid grid-cols-3 gap-0 max-w-sm border border-white/15 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
                  {[
                    { val: "20+", label: t('home.stats.years') },
                    { val: "Prof.", label: "Prof. Dr." },
                    { val: "UCSF", label: t("home.stats.usTraining") },
                  ].map((s, i) => (
                    <div key={i} className={`text-center py-5 px-3 hover:bg-white/10 transition-colors ${i === 1 ? 'border-x border-white/15' : ''}`}>
                      <div className="text-2xl font-extrabold text-white mb-1">{s.val}</div>
                      <div className="text-[11px] text-sky-200/70 font-medium tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Sağ — fotoğraf */}
            <div className="w-full lg:w-1/2 relative pb-12 sm:pb-16 lg:pb-0 -mx-4 sm:mx-0">
              <FadeIn delay={0.35} direction="left" className="w-full lg:flex lg:justify-end">
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <div className="absolute -inset-4 rounded-[3rem] opacity-30 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)' }} />
                  <img
                    src="/nurullah-hoca3.avif"
                    alt="Prof. Dr. M. Nurullah Ermiş"
                    className="relative rounded-3xl shadow-2xl shadow-black/30 object-cover w-full sm:w-full sm:max-w-sm lg:max-w-md aspect-[3/4] object-top border-2 border-white/20"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        <div className="hero-section-blend absolute bottom-[-8rem] left-1/2 h-52 w-[145%] -translate-x-1/2 sm:bottom-[-9rem] sm:h-60 lg:bottom-[-10rem] lg:h-72 pointer-events-none" />

      </section>

      {/* ═══════════════ 2. TEDAVİ ALANLARI — BENTO (Services) ═══════════════ */}
      <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15rem] top-0 h-[36rem] w-[36rem] rounded-full bg-sky-200/42 blur-[145px]" />
        <div className="absolute right-[-15rem] top-[18rem] h-[36rem] w-[36rem] rounded-full bg-cyan-200/40 blur-[145px]" />
        <div className="absolute left-[2%] top-[44rem] h-[34rem] w-[34rem] rounded-full bg-blue-100/50 blur-[150px]" />
        <div className="absolute right-[2%] top-[74rem] h-[34rem] w-[34rem] rounded-full bg-teal-100/46 blur-[150px]" />
        <div className="absolute left-[-12rem] top-[110rem] h-[34rem] w-[34rem] rounded-full bg-cyan-100/46 blur-[150px]" />
        <div className="absolute right-[-12rem] top-[144rem] h-[34rem] w-[34rem] rounded-full bg-sky-100/48 blur-[155px]" />
        <div className="absolute left-[3%] top-[180rem] h-[34rem] w-[34rem] rounded-full bg-teal-100/42 blur-[150px]" />
        <div className="absolute right-[1%] top-[212rem] h-[34rem] w-[34rem] rounded-full bg-blue-100/50 blur-[155px]" />
        <div className="absolute left-[-12rem] top-[248rem] h-[34rem] w-[34rem] rounded-full bg-sky-100/44 blur-[150px]" />
        <div className="absolute right-[-12rem] top-[280rem] h-[34rem] w-[34rem] rounded-full bg-cyan-100/44 blur-[150px]" />
      </div>
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <FadeIn delay={0.1} direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t("home.treatments.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t("home.treatments.title")}</h2>
            <p className="text-slate-500 text-lg">{t("home.treatments.subtitle")}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[220px]">
            <FadeIn delay={0.05} direction="up" className="md:col-span-5 md:row-span-2">
              <Link href={getLocalizedPath('treatments', currentLang, 'skolyoz-kifoz-cerrahisi', 'treatment')} className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/skolyoz-kifoz.png" alt="Skolyoz" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-extrabold text-white mb-2">{t("home.treatments.cards.scoliosis.title")}</h3>
                    <p className="text-sm text-white/65 leading-relaxed">{t("home.treatments.cards.scoliosis.desc")}</p>
                
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1} direction="up" className="md:col-span-4">
              <Link href={getLocalizedPath('treatments', currentLang, 'bel-fitigi-tedavisi', 'treatment')} className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/bel-fitigi.png" alt="Bel Fıtığı" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">{t("home.treatments.cards.herniation.title")}</h3>
                    <p className="text-xs text-white/60">{t("home.treatments.cards.herniation.desc")}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.12} direction="up" className="md:col-span-3">
              <Link href={getLocalizedPath('treatments', currentLang, 'diz-kalca-protezi', 'treatment')} className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/diz-kalca-protezi.png" alt="Diz Kalça Protezi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">{t("home.treatments.cards.kneeHip.title")}</h3>
                    <p className="text-xs text-white/60">{t("home.treatments.cards.kneeHip.desc")}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.15} direction="up" className="md:col-span-4">
              <Link href={getLocalizedPath('treatments', currentLang, 'cocuk-ortopedisi', 'treatment')} className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/cocuk-ortopedisi.png" alt="Çocuk Ortopedisi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">{t("home.treatments.cards.pediatric.title")}</h3>
                    <p className="text-xs text-white/60">{t("home.treatments.cards.pediatric.desc")}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.18} direction="up" className="md:col-span-3">
              <Link href={getLocalizedPath('treatments', currentLang, 'artroskopik-cerrahi', 'treatment')} className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/artroskopik-cerrahi.png" alt="Artroskopik Cerrahi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">{t("home.treatments.cards.arthroscopy.title")}</h3>
                    <p className="text-xs text-white/60">{t("home.treatments.cards.arthroscopy.desc")}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>



      {/* ═══════════════ 3. HASTA YORUMLARI (Social Proof) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="section-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t("home.testimonials.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{t("home.testimonials.title")}</h2>
          </FadeIn>

          <div className="section-panel relative rounded-[2.5rem] border border-white/80 p-8 md:p-14">
            <Quote className="w-14 h-14 text-blue-50 absolute top-7 left-7 opacity-20" />
            <div className="min-h-[200px] flex flex-col justify-center items-center text-center relative z-10">
              <div className="flex mb-6 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 italic px-4">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <div>
                <p className="font-extrabold text-slate-900 text-lg">{testimonials[currentTestimonial].author}</p>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">{testimonials[currentTestimonial].detail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-10 bg-blue-600' : 'w-2 bg-blue-100 hover:bg-blue-200'}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ 4. SONUÇLAR (Results/Proof) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t("home.results.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t("home.results.title")}</h2>
            <p className="text-slate-500 text-lg">{t("home.results.subtitle")}</p>
          </FadeIn>
          <ResultsSlider items={beforeAfter} />
        </div>
      </section>


      {/* ═══════════════ 4b. HASTA HİKAYELERİ ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t("home.patientStories.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t("home.patientStories.title")}</h2>
            <p className="text-slate-500 text-lg">{t("home.patientStories.subtitle")}</p>
          </FadeIn>

          <PatientStoriesSlider items={patientStories} />
        </div>
      </section>

      {/* ═══════════════ 5. MERKEZ TANITIM (Bento) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="section-panel grid grid-cols-1 gap-6 rounded-[2.75rem] border border-slate-100/80 p-6 md:p-8 lg:grid-cols-2 lg:p-10 items-center">

            {/* SOL — Metin */}
            <FadeIn direction="right" delay={0.1} className="flex flex-col justify-center py-8 lg:py-0 lg:pr-8">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{t("home.center.badge")}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                {t("home.center.titlePrefix")}<br />
                <span className="text-blue-600">{t("home.center.titleAccent")}</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                {t("home.center.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={getLocalizedPath('treatments', currentLang)}>
                  <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02]">
                    {t("home.center.primaryCta")}
                  </span>
                </Link>
                <Link href={getLocalizedPath('contact', currentLang)}>
                  <span className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 font-bold text-sm px-7 py-3.5 rounded-xl transition-all">
                    {t("home.center.secondaryCta")}
                  </span>
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm shadow-slate-200/80">
                {[
                  { val: "5000+", label: t("home.center.stats.operations") },
                  { val: "20+", label: t("home.center.stats.years") },
                  { val: "3", label: t("home.center.stats.campuses") },
                ].map((s, i) => (
                  <div key={i} className={`bg-white/60 px-2 py-4 text-center sm:px-3 sm:py-5 ${i === 1 ? 'border-x border-slate-200' : ''}`}>
                    <div className="mb-1 text-xl font-extrabold text-blue-600 sm:text-2xl">{s.val}</div>
                    <div className="text-[10px] font-semibold leading-tight text-slate-500 sm:text-[11px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* SAĞ — Bento Grid */}
            <FadeIn direction="left" delay={0.15}>
              <div className="grid grid-cols-1 auto-rows-[minmax(150px,auto)] gap-3 sm:grid-cols-2 sm:auto-rows-auto sm:grid-rows-[160px_160px_160px]">

                {/* Büyük görsel — üst sol, 2 satır */}
                <div className="relative min-h-[220px] overflow-hidden rounded-3xl sm:row-span-2">
                  <img src="/images/skolyoz-kifoz.png" alt="Merkez" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-1">{t("home.center.grid.surgicalCenterBadge")}</span>
                    <span className="text-sm font-extrabold text-white">{t("home.center.grid.surgicalCenterTitle")}</span>
                  </div>
                </div>

                {/* Stat kartı — üst sağ */}
                <div className="flex min-h-[170px] flex-col items-center justify-center rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 text-center shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)] sm:min-h-0 sm:p-7">
                  <span className="text-4xl font-extrabold leading-none text-blue-600 sm:text-5xl">
                    5000<span className="text-2xl sm:text-3xl">+</span>
                  </span>
                  <span className="mt-3 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-xs font-extrabold tracking-[0.08em] text-transparent sm:text-sm">
                    {t("home.center.grid.happyPatients")}
                  </span>
                </div>

                {/* Küçük görsel — orta sağ */}
                <div className="relative min-h-[170px] overflow-hidden rounded-3xl">
                  <img src="/images/diz-kalca-protezi.png" alt="Teknoloji" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-extrabold text-white block">{t("home.center.grid.technologyTitle")}</span>
                    <span className="text-[10px] text-white/60">{t("home.center.grid.technologySubtitle")}</span>
                  </div>
                </div>

                {/* Alt sol */}
                <div className="relative min-h-[170px] overflow-hidden rounded-3xl">
                  <img src="/images/bel-fitigi.png" alt="Hastane" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Online Randevu kartı — alt sağ */}
                <div className="relative min-h-[170px] overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 100%)' }}>
                  <div className="relative z-10 h-full flex flex-col justify-between p-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 block mb-1">{t("home.center.grid.quickAccessBadge")}</span>
                      <span className="text-sm font-extrabold text-white leading-tight block">{t("home.center.grid.onlineAppointmentTitleLine1")}<br />{t("home.center.grid.onlineAppointmentTitleLine2")}</span>
                    </div>
                    <Link href={getLocalizedPath('contact', currentLang)}>
                      <span className="inline-block bg-white text-sky-900 text-[11px] font-extrabold px-4 py-2 rounded-xl hover:bg-sky-50 transition-colors">
                        {t("home.center.secondaryCta")}
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>
      </section>


      {/* ═══════════════ 6. HAKKINDA (Trust) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
            <FadeIn direction="right" delay={0.2} className="w-full lg:w-5/12 relative">
              <img
                src="/nurullah-hoca1.avif"
                alt="Prof. Dr. Nurullah Ermiş"
                className="rounded-3xl shadow-2xl shadow-slate-200/80 object-cover w-full aspect-[4/5] z-10 relative object-top"
                style={{ objectPosition: "center 70%" }}
              />
            </FadeIn>
            <div className="w-full lg:w-7/12">
              <FadeIn delay={0.1} direction="up">
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{t("home.about.badge")}</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
                  {t("home.about.title")}
                </h2>
                <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full" />
                <p className="text-lg text-slate-600 leading-relaxed mb-5 font-medium">
                  {t("home.about.subtitle")}
                </p>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-6">
                  {t("home.about.description")}
                </p>
              </FadeIn>
              <FadeIn delay={0.3} direction="up">
                <Link href={getLocalizedPath('about', currentLang)}>
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 hover:bg-white font-semibold px-8 py-5 h-auto transition-all duration-200 rounded-xl text-sm">
                    {t("home.about.viewCareer")}
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ 7. YOUTUBE VİDEOLAR (Content) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{t("home.videos.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t("home.videos.title")}</h2>
            <p className="text-slate-500 text-lg">{t("home.videos.subtitle")}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {YOUTUBE_VIDEOS.map((video, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.12} direction="up">
                <div className="group cursor-pointer" onClick={() => setOpenVideo({ id: video.videoId, isShort: video.isShort })}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-400 ${video.isShort ? 'aspect-[9/16] max-w-[220px] mx-auto' : 'aspect-video'}`}>
                    <img src={video.thumb} alt={t(video.titleKey)} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-600" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-900/30 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <Play className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">{t(video.titleKey)}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {openVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setOpenVideo(null)}>
          <div className={`relative mx-4 ${openVideo.isShort ? 'w-full max-w-sm' : 'w-full max-w-4xl'}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpenVideo(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm font-semibold">
              {t("home.videos.close")} ✕
            </button>
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${openVideo.isShort ? 'aspect-[9/16]' : 'aspect-video'}`}>
              <iframe
                src={`https://www.youtube.com/embed/${openVideo.id}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}


      {/* ═══════════════ 8. TEDAVİ SÜRECİ (How it works) ═══════════════ */}
      <section className="section-ghost relative py-20 overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 max-w-5xl">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{t("home.process.badge")}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{t("home.process.title")}</h2>
          </FadeIn>
          <div className="section-panel relative grid grid-cols-1 gap-6 rounded-[2.5rem] border border-white/80 p-6 md:grid-cols-4 md:gap-4 md:p-10">
            <div className="hidden md:block absolute top-[5.25rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {[
              { step: "01", title: t("home.process.examination"), desc: t("home.process.examinationDesc") },
              { step: "02", title: t("home.process.plan"), desc: t("home.process.planDesc") },
              { step: "03", title: t("home.process.treatment"), desc: t("home.process.treatmentDesc") },
              { step: "04", title: t("home.process.recovery"), desc: t("home.process.recoveryDesc") },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.12} direction="up">
                <div className="text-center relative z-10 flex flex-col items-center group">
                  <div className="w-[5.5rem] h-[5.5rem] rounded-2xl bg-white border border-blue-100 shadow-md shadow-blue-100/50 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-200/60 group-hover:border-blue-200 transition-all duration-300">
                    <span className="text-2xl font-extrabold text-blue-600">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════ 9. CTA (Contact) ═══════════════ */}
      </div>
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up">
            <div className="rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }}>

              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-sky-300 font-bold uppercase tracking-[0.18em] text-xs mb-6">{t("home.cta.badge")}</p>
                <h2 className="text-3xl md:text-[3.5rem] font-extrabold text-white mb-7 leading-tight whitespace-pre-line">
                  {t("home.cta.title")}
                </h2>
                <p className="text-base md:text-lg text-sky-200/80 mb-12 leading-relaxed">
                  {t("home.cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={getLocalizedPath('contact', currentLang)}>
                    <Button size="lg" className="bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-200">
                      {t("home.cta.appointmentBtn")}
                    </Button>
                  </Link>
                  <a href="tel:+905322051637">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold text-sm py-4 px-8 h-auto rounded-xl backdrop-blur-md transition-all duration-200">
                      {t("home.cta.callBtn")}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
