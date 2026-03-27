'use client';

import React, { useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { ChevronRight, ExternalLink, Download, PlayCircle, BookOpen, Globe, Award, FileText, Calendar, Search, Filter, X } from 'lucide-react';
import Link from 'next/link';

type Presentation = {
  id: number;
  year: string;
  title: string;
  congress: string;
  location: string;
  type: 'konferans' | 'sempozyum' | 'workshop' | 'webinar';
  language: 'TR' | 'EN';
  hasSlides?: boolean;
  hasVideo?: boolean;
  topic: string;
};

const PRESENTATIONS: Presentation[] = [
  {
    id: 1,
    year: '2024',
    title: 'Adolesan İdiyopatik Skolyozda Minimal İnvazif Teknikler',
    congress: '38. Türk Ortopedi ve Travmatoloji Kongresi',
    location: 'İstanbul, Türkiye',
    type: 'konferans',
    language: 'TR',
    hasSlides: true,
    hasVideo: false,
    topic: 'Skolyoz',
  },
  {
    id: 2,
    year: '2024',
    title: 'Navigated Spinal Surgery: Current Indications and Outcomes',
    congress: 'SICOT World Congress 2024',
    location: 'Paris, Fransa',
    type: 'konferans',
    language: 'EN',
    hasSlides: true,
    hasVideo: true,
    topic: 'Omurga Cerrahisi',
  },
  {
    id: 3,
    year: '2023',
    title: 'Kifoskolyozda Cerrahi Planlama ve Komplikasyon Yönetimi',
    congress: '11. Omurga Cerrahisi Sempozyumu',
    location: 'Ankara, Türkiye',
    type: 'sempozyum',
    language: 'TR',
    hasSlides: true,
    hasVideo: false,
    topic: 'Skolyoz',
  },
  {
    id: 4,
    year: '2023',
    title: 'Pediatric Flatfoot: When to Operate?',
    congress: 'EPOS Annual Meeting 2023',
    location: 'Barselona, İspanya',
    type: 'konferans',
    language: 'EN',
    hasSlides: false,
    hasVideo: true,
    topic: 'Çocuk Ortopedisi',
  },
  {
    id: 5,
    year: '2023',
    title: 'Diz Protezinde Robotik Destekli Cerrahi: 500 Vakalık Deneyim',
    congress: 'Türk Ortopedi Derneği Güz Toplantısı',
    location: 'Antalya, Türkiye',
    type: 'sempozyum',
    language: 'TR',
    hasSlides: true,
    hasVideo: false,
    topic: 'Diz & Kalça Protezi',
  },
  {
    id: 6,
    year: '2022',
    title: 'Lumbar Disc Herniation: Microsurgical vs. Endoscopic Approaches',
    congress: 'AOSpine Global Meeting',
    location: 'Viyana, Avusturya',
    type: 'konferans',
    language: 'EN',
    hasSlides: true,
    hasVideo: true,
    topic: 'Omurga Cerrahisi',
  },
  {
    id: 7,
    year: '2022',
    title: 'Erken Başlangıçlı Skolyozda Büyüyen Çubuk Sistemleri',
    congress: 'Pediatrik Ortopedi Günleri',
    location: 'İzmir, Türkiye',
    type: 'workshop',
    language: 'TR',
    hasSlides: true,
    hasVideo: false,
    topic: 'Çocuk Ortopedisi',
  },
  {
    id: 8,
    year: '2022',
    title: 'Artroskopik Diz Cerrahisinde Güncel Yaklaşımlar',
    congress: 'Türk Spor Hekimliği Kongresi',
    location: 'İstanbul, Türkiye',
    type: 'konferans',
    language: 'TR',
    hasSlides: false,
    hasVideo: false,
    topic: 'Artroskopik Cerrahi',
  },
  {
    id: 9,
    year: '2021',
    title: 'Spinal Deformity Correction in Adults: Risk Stratification',
    congress: 'SRS Annual Meeting 2021',
    location: 'Chicago, ABD',
    type: 'konferans',
    language: 'EN',
    hasSlides: true,
    hasVideo: true,
    topic: 'Omurga Cerrahisi',
  },
  {
    id: 10,
    year: '2021',
    title: 'COVID Sonrası Ortopedi Pratiğinde Değişimler',
    congress: 'Türk Tıp Dünyası Webinar Serisi',
    location: 'Online',
    type: 'webinar',
    language: 'TR',
    hasSlides: true,
    hasVideo: true,
    topic: 'Genel Ortopedi',
  },
  {
    id: 11,
    year: '2020',
    title: 'Childhood Scoliosis: Bracing vs. Surgery Decision Making',
    congress: 'POSNA Annual Meeting',
    location: 'Online',
    type: 'webinar',
    language: 'EN',
    hasSlides: true,
    hasVideo: false,
    topic: 'Çocuk Ortopedisi',
  },
  {
    id: 12,
    year: '2019',
    title: 'Kalça Protezinde Anterolateral Yaklaşım: Avantaj ve Dezavantajlar',
    congress: '33. Türk Ortopedi ve Travmatoloji Kongresi',
    location: 'Bursa, Türkiye',
    type: 'konferans',
    language: 'TR',
    hasSlides: false,
    hasVideo: false,
    topic: 'Diz & Kalça Protezi',
  },
];

const TYPE_COLORS: Record<Presentation['type'], string> = {
  konferans: 'bg-blue-600',
  sempozyum: 'bg-teal-600',
  workshop: 'bg-indigo-600',
  webinar: 'bg-sky-500',
};

const TYPE_LABELS: Record<Presentation['type'], string> = {
  konferans: 'Konferans',
  sempozyum: 'Sempozyum',
  workshop: 'Workshop',
  webinar: 'Webinar',
};

const ALL_TOPICS = ['Tümü', ...Array.from(new Set(PRESENTATIONS.map(p => p.topic)))];
const ALL_TYPES: Array<'Tümü' | Presentation['type']> = ['Tümü', 'konferans', 'sempozyum', 'workshop', 'webinar'];

export default function SunumlarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Tümü');
  const [selectedType, setSelectedType] = useState<'Tümü' | Presentation['type']>('Tümü');
  const [selectedYear, setSelectedYear] = useState('Tümü');

  const years = ['Tümü', ...Array.from(new Set(PRESENTATIONS.map(p => p.year))).sort((a, b) => Number(b) - Number(a))];

  const filtered = PRESENTATIONS.filter(p => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.congress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'Tümü' || p.topic === selectedTopic;
    const matchesType = selectedType === 'Tümü' || p.type === selectedType;
    const matchesYear = selectedYear === 'Tümü' || p.year === selectedYear;
    return matchesSearch && matchesTopic && matchesType && matchesYear;
  });

  const grouped = filtered.reduce<Record<string, Presentation[]>>((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('Tümü');
    setSelectedType('Tümü');
    setSelectedYear('Tümü');
  };

  const hasFilters = searchQuery !== '' || selectedTopic !== 'Tümü' || selectedType !== 'Tümü' || selectedYear !== 'Tümü';

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 35%, #0e7490 65%, #0891b2 100%)' }}
      >
        {/* Glow efektleri */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 65%)' }} />

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <FadeIn delay={0.1} direction="up" className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-semibold text-sky-200 mb-7">
              <Award className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              Akademik Sunumlar
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-white tracking-tight mb-5 leading-tight">
              Bilimsel Sunumlar &<br />
              <span className="text-sky-300">Kongre Katılımları</span>
            </h1>
            <p className="text-base md:text-lg text-sky-100/80 max-w-2xl leading-relaxed">
              Prof. Dr. Nurullah Ermiş'in yurt içi ve yurt dışı kongrelerde gerçekleştirdiği bilimsel sunumlar, workshop ve sempozyum katılımları.
            </p>
          </FadeIn>

          {/* İstatistikler */}
          <FadeIn delay={0.3} direction="up">
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl">
              {[
                { val: `${PRESENTATIONS.length}+`, label: 'Toplam Sunum' },
                { val: `${Array.from(new Set(PRESENTATIONS.map(p => p.congress))).length}+`, label: 'Kongre & Sempozyum' },
                { val: `${PRESENTATIONS.filter(p => p.language === 'EN').length}`, label: 'Uluslararası Sunum' },
                { val: `${Array.from(new Set(PRESENTATIONS.map(p => p.year))).length}+`, label: 'Yıl' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-4 text-center hover:bg-white/15 transition-colors">
                  <div className="text-2xl font-extrabold text-white mb-1">{s.val}</div>
                  <div className="text-[11px] text-sky-200/70 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Blend geçiş */}
        <div className="absolute bottom-[-4rem] left-1/2 h-40 w-[145%] -translate-x-1/2 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.1) 60%, transparent 80%)',
            filter: 'blur(20px)',
          }} />
      </section>

      {/* ═══════════════ FİLTRELER ═══════════════ */}
      <section className="sticky top-[5rem] md:top-[8rem] z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

            {/* Arama */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Sunum veya kongre ara..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>

            {/* Konu */}
            <select
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-400 text-slate-700 font-medium cursor-pointer"
            >
              {ALL_TOPICS.map(t => <option key={t} value={t}>{t === 'Tümü' ? 'Tüm Konular' : t}</option>)}
            </select>

            {/* Tür */}
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value as typeof selectedType)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-400 text-slate-700 font-medium cursor-pointer"
            >
              {ALL_TYPES.map(t => <option key={t} value={t}>{t === 'Tümü' ? 'Tüm Türler' : TYPE_LABELS[t as Presentation['type']]}</option>)}
            </select>

            {/* Yıl */}
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-400 text-slate-700 font-medium cursor-pointer"
            >
              {years.map(y => <option key={y} value={y}>{y === 'Tümü' ? 'Tüm Yıllar' : y}</option>)}
            </select>

            {/* Temizle */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Temizle
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ SUNUM LİSTESİ ═══════════════ */}
      <section className="py-16 md:py-20"
        style={{
          background: 'radial-gradient(circle at 10% 12%, rgba(186, 230, 253, 0.3), transparent 24%), radial-gradient(circle at 86% 28%, rgba(125, 211, 252, 0.2), transparent 26%), linear-gradient(180deg, #f7fbff 0%, #ffffff 20%, #f5faff 48%, #ffffff 72%, #f6fafe 100%)',
        }}
      >
        <div className="container mx-auto max-w-6xl px-4">

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-900 mb-2">Sonuç bulunamadı</p>
              <p className="text-slate-500 text-sm">Filtrelerinizi değiştirerek tekrar deneyin.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {sortedYears.map((year, yi) => (
                <FadeIn key={year} delay={0.05 * yi} direction="up">
                  <div>
                    {/* Yıl başlığı */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl text-white font-extrabold text-base shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)' }}>
                        {year}
                      </div>
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">{year}</h2>
                        <p className="text-sm text-slate-400 font-medium">{grouped[year].length} sunum</p>
                      </div>
                      <div className="flex-1 h-px bg-slate-200 ml-2" />
                    </div>

                    {/* Sunum kartları */}
                    <div className="space-y-4">
                      {grouped[year].map((pres, i) => (
                        <div
                          key={pres.id}
                          className="group relative flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 hover:-translate-y-0.5 md:flex-row md:items-center md:gap-6"
                        >
                          {/* Sol — Tür badge */}
                          <div className="flex-shrink-0 flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:w-24 md:text-center">
                            <span className={`inline-block rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${TYPE_COLORS[pres.type]}`}>
                              {TYPE_LABELS[pres.type]}
                            </span>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border ${pres.language === 'EN' ? 'border-indigo-200 text-indigo-600 bg-indigo-50' : 'border-teal-200 text-teal-600 bg-teal-50'}`}>
                              <Globe className="w-2.5 h-2.5" />
                              {pres.language}
                            </span>
                          </div>

                          {/* Orta — İçerik */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap mb-1">
                              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{pres.topic}</span>
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                              {pres.title}
                            </h3>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <span className="font-medium text-slate-700">{pres.congress}</span>
                              </div>
                              <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
                              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{pres.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Sağ — Aksiyonlar */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {pres.hasSlides && (
                              <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all">
                                <FileText className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Slaytlar</span>
                              </button>
                            )}
                            {pres.hasVideo && (
                              <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all">
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Video</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <FadeIn direction="up">
            <div
              className="rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }} />
              <div className="relative z-10 max-w-2xl mx-auto">
                <p className="text-sky-300 font-bold uppercase tracking-[0.18em] text-xs mb-6">İLETİŞİM</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Bilimsel İşbirliği mi<br />Düşünüyorsunuz?
                </h2>
                <p className="text-base md:text-lg text-sky-200/80 mb-10 leading-relaxed">
                  Kongre davetleri, ortak yayın projeleri veya akademik danışmanlık için iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/iletisim"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-sky-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-sky-50"
                  >
                    İletişime Geçin <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}