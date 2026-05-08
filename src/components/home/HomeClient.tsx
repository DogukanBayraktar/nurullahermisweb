'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Star, Quote, Play, Newspaper, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLocalizedPath } from '@/lib/routes';


const YOUTUBE_VIDEOS = [

  { id: "who-is-nurullah-ermis", order: 1, titleKey: "home.videos.whoIsNurullahErmis", videoId: "4kZKY8hnwDo", isShort: false, thumb: "https://img.youtube.com/vi/4kZKY8hnwDo/maxresdefault.jpg" },
  { id: "knee-surgery", order: 2, titleKey: "home.videos.kneeSurgery", videoId: "gryuYiNd6WI", isShort: false, thumb: "https://img.youtube.com/vi/gryuYiNd6WI/maxresdefault.jpg" },
  { id: "scoliosis-surgery", order: 3, titleKey: "home.videos.scoliosisSurgery", videoId: "MOw6U2iJQew", isShort: false, thumb: "https://img.youtube.com/vi/MOw6U2iJQew/maxresdefault.jpg" },
].sort((a, b) => a.order - b.order);

function ResultsSlider({ items }: { items: Array<{ img: string; label: string; desc: string }> }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  const visibleItems = [0, 1].map(offset => items[(current + offset) % total]);

  return (
    <div className="relative w-full">
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

function PatientStoriesSlider({ items }: { items: Array<{ name: string; age?: number; tag?: string; tagColor?: string; summary: string; story: string; result: string; image: string; date?: string; imagePosition?: string }> }) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 15000);
    return () => clearInterval(interval);
  }, [total]);

  const story = items[current];

  return (
    <div className="relative">
      <div className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <div className="flex flex-col lg:flex-row min-h-[520px]">
          <div className="w-full lg:w-2/5 relative min-h-[280px] lg:min-h-full">
            <img
              src={story.image}

              alt={story.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: story.imagePosition ?? "center center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              {story.tag && (
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full mb-3 ${story.tagColor || 'bg-blue-600'}`}>
                  {story.tag}
                </span>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-extrabold text-white text-sm">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-base">{story.name}</p>
                  <p className="text-white/70 text-sm">
                    {story.age && <>{story.age} {t("home.patientStories.yearsOld")} {story.date && ' · '}</>}
                    {story.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{t("home.patientStories.storyLabel")}</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-5 leading-snug">&ldquo;{story.summary}&rdquo;</h3>
            <p className="text-slate-500 leading-relaxed mb-8 text-base md:text-lg">{story.story}</p>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm px-4 py-2 rounded-xl whitespace-nowrap">
                <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                {story.result}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <button onClick={prev} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-10 bg-blue-600" : "w-2 bg-blue-100 hover:bg-blue-200"}`} />
                ))}
              </div>
              <button onClick={next} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({ homepageData, initialResults }: { homepageData: any, initialResults: any[] }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n?.resolvedLanguage || i18n?.language || 'tr';
  const isEn = currentLang.startsWith('en');
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState(YOUTUBE_VIDEOS[0].id);
  const [videoListStart, setVideoListStart] = useState(0);
  const visibleVideoCount = 3;
  
  const content = homepageData[currentLang] || homepageData['tr'];
  const testimonials = (content.testimonials?.items || []) as Array<{ text: string; author: string; detail: string }>;


  const beforeAfter = (initialResults || []).map((item) => ({
    img: item.img,
    label: isEn ? (item.label_en || item.label_tr) : item.label_tr,
    desc: isEn ? (item.desc_en || item.desc_tr) : item.desc_tr,
  }));

  const patientStories = (content.patientStories?.items || []) as Array<{ id: string; name: string; summary: string; story: string; result: string; image: string }>;


  const mediaHighlights = currentLang.startsWith('en')
    ? [
      { outlet: 'NTV Health', title: 'Early scoliosis awareness and follow-up', date: 'March 2025', image: '/images/skolyoz-kifoz.avif' },
      { outlet: 'Medical Update', title: 'A current perspective on robotic joint surgery', date: 'November 2024', image: '/images/diz-kalca-protezi.avif' },
      { outlet: 'CNN Türk', title: 'When should neck pain and arm numbness be evaluated?', date: 'February 2024', image: '/images/boyun-fitigi.avif' },
    ]
    : [
      { outlet: 'NTV Sağlık', title: 'Skolyozda erken tanı ve doğru takip', date: 'Mart 2025', image: '/images/skolyoz-kifoz.avif' },
      { outlet: 'Medical Update', title: 'Robotik eklem cerrahisine güncel bakış', date: 'Kasım 2024', image: '/images/diz-kalca-protezi.avif' },
      { outlet: 'CNN Türk', title: 'Boyun ağrısı ve kola vuran uyuşma ne zaman ciddiye alınmalı?', date: 'Şubat 2024', image: '/images/boyun-fitigi.avif' },
    ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const selectedVideo = YOUTUBE_VIDEOS.find((v) => v.id === selectedVideoId) || YOUTUBE_VIDEOS[0];
  const visibleVideos = YOUTUBE_VIDEOS.slice(videoListStart, videoListStart + visibleVideoCount);
  const canScrollVideosUp = videoListStart > 0;
  const canScrollVideosDown = videoListStart + visibleVideoCount < YOUTUBE_VIDEOS.length;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_16%,#f8fbff_46%,#ffffff_72%,#f8fafc_100%)]">
      {/* Background Blobs - EXACTLY as original */}
      <div className="pointer-events-none absolute right-[-14rem] top-[30rem] h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-3xl" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 68%)' }} />
      <div className="pointer-events-none absolute left-[-16rem] top-[76rem] h-[38rem] w-[38rem] rounded-full opacity-[0.14] blur-3xl" style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 68%)' }} />
      <div className="pointer-events-none absolute right-[-12rem] top-[132rem] h-[32rem] w-[32rem] rounded-full opacity-[0.14] blur-3xl" style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute left-[-14rem] bottom-[22rem] h-[34rem] w-[34rem] rounded-full opacity-[0.14] blur-3xl" style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }} />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 35%, #0e7490 65%, #0891b2 100%)' }}>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 65%)' }} />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 min-h-[600px] lg:min-h-[680px]">
            <div className="w-full lg:w-1/2 py-20 lg:py-28 lg:pr-16">
              <FadeIn delay={0.1} direction="down">
                <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-semibold text-sky-200 mb-7 gap-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  {content.hero.badge}
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-3 leading-[1.08]">
                  {content.hero.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.3} direction="up">
                <p className="text-base md:text-lg text-sky-100/80 mb-10 max-w-xl leading-relaxed">
                  {content.hero.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-3">
                <Link href={getLocalizedPath('contact', currentLang)}>
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto shadow-xl hover:scale-[1.02] transition-all duration-200 rounded-xl">
                    {content.hero.cta}
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
                  {content.stats.map((s: any, i: number) => (
                    <div key={i} className={`text-center py-5 px-3 hover:bg-white/10 transition-colors ${i === 1 ? 'border-x border-white/15' : ''}`}>
                      <div className="text-2xl font-extrabold text-white mb-1">{s.value}</div>
                      <div className="text-[11px] text-sky-200/70 font-medium tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="w-full lg:w-1/2 relative pb-12 sm:pb-16 lg:pb-0 -mx-4 sm:mx-0">
              <FadeIn delay={0.35} direction="left" className="w-full lg:flex lg:justify-end">
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <div className="absolute -inset-4 rounded-[3rem] opacity-30 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)' }} />
                  <img src={content.hero.image || "/nurullah-hoca3.avif"} alt="Prof. Dr. Nurullah Ermiş" className="relative rounded-3xl shadow-2xl shadow-black/30 object-cover w-full sm:w-full sm:max-w-sm lg:max-w-md aspect-[3/4] object-top border-2 border-white/20" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
        <div className="hero-section-blend absolute bottom-[-8rem] left-1/2 h-52 w-[145%] -translate-x-1/2 sm:bottom-[-9rem] sm:h-60 lg:bottom-[-10rem] lg:h-72 pointer-events-none" />
      </section>

      <div className="relative overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-15rem] top-0 h-[36rem] w-[36rem] rounded-full bg-sky-200/42 blur-[145px]" />
          <div className="absolute right-[-15rem] top-[18rem] h-[36rem] w-[36rem] rounded-full bg-cyan-200/40 blur-[145px]" />
          <div className="absolute left-[2%] top-[44rem] h-[34rem] w-[34rem] rounded-full bg-blue-100/50 blur-[150px]" />
          <div className="absolute right-[2%] top-[74rem] h-[34rem] w-[34rem] rounded-full bg-teal-100/46 blur-[150px]" />
          <div className="absolute left-[-12rem] top-[110rem] h-[34rem] w-[34rem] rounded-full bg-cyan-100/46 blur-[150px]" />
          <div className="absolute right-[-12rem] top-[144rem] h-[34rem] w-[34rem] rounded-full bg-sky-100/48 blur-[155px]" />
          <div className="absolute left-[3%] top-[180rem] h-[34rem] w-[34rem] rounded-full bg-teal-100/42 blur-[150px]" />
          <div className="absolute right-[1%] top-[212rem] h-[34rem] w-[34rem] rounded-full bg-blue-100/50 blur-[155px]" />
        </div>

        {/* Treatments Bento */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <FadeIn delay={0.1} direction="up" className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{content.treatments.badge}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{content.treatments.title}</h2>
              <p className="text-slate-500 text-lg">{content.treatments.subtitle}</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[220px]">
              <FadeIn delay={0.05} direction="up" className="md:col-span-5 md:row-span-2">
                <Link href={getLocalizedPath('treatments', currentLang, 'skolyoz-kifoz-cerrahisi', 'treatment')} className="group block h-full">
                  <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                    <img src="/images/skolyoz-kifoz.avif" alt="Skolyoz" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-extrabold text-white mb-2">{t("home.treatments.cards.scoliosis.title")}</h3>
                      <p className="text-sm text-white/65 leading-relaxed">{t("home.treatments.cards.scoliosis.desc")}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
              <FadeIn delay={0.1} direction="up" className="md:col-span-4">
                <Link href={getLocalizedPath('treatments', currentLang, 'boyun-fitigi-cerrahisi', 'treatment')} className="group block h-full">
                  <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                    <img src="/images/boyun-fitigi.avif" alt="Bel Fıtığı" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                    <img src="/images/diz-kalca-protezi.avif" alt="Diz Kalça Protezi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                    <img src="/images/cocuk-ortopedisi.avif" alt="Çocuk Ortopedisi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
                    <img src="/images/artroskopik-cerrahi.avif" alt="Artroskopik Cerrahi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="section-ghost relative py-20 overflow-hidden">
            <div className="section-grid absolute inset-0 opacity-30 pointer-events-none" />
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
              <FadeIn direction="up" className="text-center mb-14">
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{content.testimonials?.badge}</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{content.testimonials?.title}</h2>
              </FadeIn>
              <div className="section-panel relative rounded-[2.5rem] border border-white/80 p-8 md:p-14">
                <Quote className="w-14 h-14 text-blue-50 absolute top-7 left-7 opacity-20" />
                <div className="min-h-[200px] flex flex-col justify-center items-center text-center relative z-10">
                  <div className="flex mb-6 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 italic px-4">&ldquo;{testimonials[currentTestimonial]?.text}&rdquo;</p>
                  <div>
                    <p className="font-extrabold text-slate-900 text-lg">{testimonials[currentTestimonial]?.author}</p>
                    <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">{testimonials[currentTestimonial]?.detail}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <button onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"><ChevronLeft className="w-6 h-6" /></button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setCurrentTestimonial(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-10 bg-blue-600' : 'w-2 bg-blue-100 hover:bg-blue-200'}`} />
                    ))}
                  </div>
                  <button onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm"><ChevronRight className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* Results */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{content.results?.badge}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{content.results?.title}</h2>
              <p className="text-slate-500 text-lg">{content.results?.subtitle}</p>
            </FadeIn>
            <ResultsSlider items={beforeAfter} />
          </div>
        </section>


        {/* Patient Stories */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">{content.patientStories?.badge}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{content.patientStories?.title}</h2>
              <p className="text-slate-500 text-lg">{content.patientStories?.subtitle}</p>
            </FadeIn>
            <PatientStoriesSlider items={patientStories} />
          </div>
        </section>


        {/* Center Intro Bento */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <div className="section-panel grid grid-cols-1 gap-6 rounded-[2.75rem] border border-slate-100/80 p-6 md:p-8 lg:grid-cols-2 lg:p-10 items-center">
              <FadeIn direction="right" delay={0.1} className="flex flex-col justify-center py-8 lg:py-0 lg:pr-8">
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{content.center.badge}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">{content.center.titlePrefix}<br /><span className="text-blue-600">{content.center.titleAccent}</span></h2>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">{content.center.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href={getLocalizedPath('treatments', currentLang)}><span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]">{content.center.primaryCta}</span></Link>
                  <Link href={getLocalizedPath('contact', currentLang)}><span className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 font-bold text-sm px-7 py-3.5 rounded-xl transition-all">{content.center.secondaryCta}</span></Link>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm shadow-slate-200/80">
                  {content.center.stats.map((s: any, i: number) => (
                    <div key={i} className={`bg-white/60 px-2 py-4 text-center sm:px-3 sm:py-5 ${i === 1 ? 'border-x border-slate-200' : ''}`}>
                      <div className="mb-1 text-xl font-extrabold text-blue-600 sm:text-2xl">{s.value}</div>
                      <div className="text-[10px] font-semibold leading-tight text-slate-500 sm:text-[11px]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn direction="left" delay={0.15}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-[170px_170px_170px]">
                  <div className="relative min-h-[220px] overflow-hidden rounded-3xl md:row-span-2 md:min-h-0"><img src="/images/skolyoz-kifoz.avif" alt="Merkez" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" /></div>
                  <div className="flex min-h-[150px] flex-col items-center justify-center rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 text-center shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)] md:min-h-0 md:p-5">
                    <span className="flex items-center text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-none text-blue-600">5000<span className="text-base sm:text-lg lg:text-xl ml-1">+</span></span>
                    <span className="mt-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-[11px] font-extrabold tracking-[0.04em] text-transparent sm:text-xs lg:text-sm">Sağlıklı, Mutlu Hasta</span>
                  </div>
                  <div className="relative min-h-[170px] overflow-hidden rounded-3xl md:row-span-2 md:min-h-0"><img src="/images/saglik/on-capraz.avif" alt="Teknoloji" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" /></div>
                  <div className="relative min-h-[170px] overflow-hidden rounded-3xl md:min-h-0"><img src="/images/boyun-fitigi.avif" alt="Hastane" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" /></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        {/* ═══════════════ 5. HAKKINDA (Trust) ═══════════════ */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
              <FadeIn direction="right" delay={0.2} className="w-full lg:w-5/12 relative">
                <img
                  src={content.about.image || "/nurullah-hoca1.avif"}
                  alt="Prof. Dr. Nurullah Ermiş"
                  className="rounded-3xl shadow-2xl shadow-slate-200/80 object-cover w-full aspect-[4/5] z-10 relative object-top"
                  style={{ objectPosition: "center 70%" }}
                />
              </FadeIn>
              <div className="w-full lg:w-7/12">
                <FadeIn delay={0.1} direction="up">
                  <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{content.about.badge}</p>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
                    {content.about.title}
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full" />
                  <p className="text-lg text-slate-600 leading-relaxed mb-5 font-medium">
                    {content.about.subtitle}
                  </p>
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-6">
                    {content.about.description}
                  </p>
                </FadeIn>
                <FadeIn delay={0.3} direction="up">
                  <Link href={getLocalizedPath('about', currentLang)}>
                    <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 hover:bg-white font-semibold px-8 py-5 h-auto transition-all duration-200 rounded-xl text-sm">
                      {content.about.viewCareer}
                    </Button>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-ghost relative py-20 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 max-w-5xl">
            <FadeIn direction="up" className="text-center mb-16">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">{content.process.badge}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{content.process.title}</h2>
            </FadeIn>
            <div className="section-panel relative grid grid-cols-1 gap-6 rounded-[2.5rem] border border-white/80 p-6 md:grid-cols-4 md:gap-4 md:p-10">
              <div className="hidden md:block absolute top-[5.25rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              {content.process.steps.map((item: any, i: number) => (
                <FadeIn key={i} delay={0.1 + i * 0.12} direction="up">
                  <div className="text-center relative z-10 flex flex-col items-center group">
                    <div className="w-[5.5rem] h-[5.5rem] rounded-2xl bg-white border border-blue-100 shadow-md flex items-center justify-center mb-6 group-hover:border-blue-200 transition-all duration-300">
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
      </div>

      {/* CTA Section - EXACTLY as original */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up">
            <div className="rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-sky-300 font-bold uppercase tracking-[0.18em] text-xs mb-6">{content.cta.badge}</p>
                <h2 className="text-3xl md:text-[3.5rem] font-extrabold text-white mb-7 leading-tight whitespace-pre-line">{content.cta.title}</h2>
                <p className="text-base md:text-lg text-sky-200/80 mb-12 leading-relaxed">{content.cta.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={getLocalizedPath('contact', currentLang)}><Button size="lg" className="bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-200">{content.cta.appointmentBtn}</Button></Link>
                  <a href="tel:+905322051637"><button className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold text-sm py-4 px-8 h-auto rounded-xl backdrop-blur-md transition-all duration-200">{content.cta.callBtn}</button></a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
