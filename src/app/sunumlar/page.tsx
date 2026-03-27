'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ChevronRight, Search, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

type Presentation = {
  id: number;
  year: string;
  title: string;
  congress: string;
  location: string;
  type: 'konferans' | 'sempozyum' | 'workshop' | 'webinar';
  language: 'TR' | 'EN';
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
    topic: 'Diz ve Kalça Protezi',
  },
  {
    id: 6,
    year: '2022',
    title: 'Lumbar Disc Herniation: Microsurgical vs. Endoscopic Approaches',
    congress: 'AOSpine Global Meeting',
    location: 'Viyana, Avusturya',
    type: 'konferans',
    language: 'EN',
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
    topic: 'Diz ve Kalça Protezi',
  },
];

const TYPE_LABELS: Record<Presentation['type'], string> = {
  konferans: 'Konferans',
  sempozyum: 'Sempozyum',
  workshop: 'Workshop',
  webinar: 'Webinar',
};

export default function SunumlarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Tümü');

  const years = ['Tümü', ...Array.from(new Set(PRESENTATIONS.map((p) => p.year))).sort((a, b) => Number(b) - Number(a))];

  const filtered = PRESENTATIONS.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(q) ||
      p.congress.toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q);
    const matchesYear = selectedYear === 'Tümü' || p.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const grouped = filtered.reduce<Record<string, Presentation[]>>((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('Tümü');
  };

  const hasFilters = searchQuery !== '' || selectedYear !== 'Tümü';

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20 md:py-24">
        <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 8% 20%, rgba(186,230,253,0.75), transparent 24%), radial-gradient(circle at 92% 18%, rgba(125,211,252,0.55), transparent 22%), radial-gradient(circle at 22% 92%, rgba(207,250,254,0.72), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 100%)',
          }}
        />
        <div className="section-grid absolute inset-0 pointer-events-none opacity-[0.22]" />
        <div className="absolute right-[-7rem] top-[-5rem] h-64 w-64 rounded-full bg-blue-100/75 blur-3xl" />
        <div className="absolute left-[-5rem] bottom-[-4rem] h-52 w-52 rounded-full bg-teal-100/75 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <FadeIn direction="up" delay={0.08}>
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Akademik Sunumlar
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Bilimsel sunumlar ve kongre katılımları
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-500">
                Prof. Dr. Nurullah Ermiş&apos;in yurt içi ve yurt dışı kongrelerde gerçekleştirdiği bilimsel
                sunumlar, workshop ve sempozyum katılımları.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative z-20 -mt-8 pb-4 md:-mt-10 md:pb-6">
        <div className="container mx-auto max-w-6xl px-4">
          <FadeIn direction="up" delay={0.1}>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white py-2 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.25)]">
              <div className={`grid md:divide-x md:divide-slate-200 ${hasFilters ? 'md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)_auto]' : 'md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.85fr)]'}`}>
                <div className="relative px-4 md:px-5">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-5" />
                  <input
                    type="text"
                    placeholder="Sunum veya kongre ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 w-full bg-transparent pl-8 pr-0 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="px-4 md:px-5">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="h-14 w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === 'Tümü' ? 'Tüm Yıllar' : year}
                      </option>
                    ))}
                  </select>
                </div>

                {hasFilters && (
                  <div className="px-3 md:px-4">
                    <button
                      onClick={clearFilters}
                      className="flex h-14 w-full items-center justify-center gap-1.5 bg-transparent px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      <X className="h-3.5 w-3.5" /> Temizle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        className="pt-6 pb-16 md:pt-8 md:pb-20"
        style={{
          background:
            'radial-gradient(circle at 10% 12%, rgba(186,230,253,0.3), transparent 24%), radial-gradient(circle at 86% 28%, rgba(125,211,252,0.2), transparent 26%), linear-gradient(180deg, #f7fbff 0%, #ffffff 20%, #f5faff 48%, #ffffff 72%, #f6fafe 100%)',
        }}
      >
        <div className="container mx-auto max-w-6xl px-4">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <p className="mb-2 text-lg font-bold text-slate-900">Sonuç bulunamadı</p>
              <p className="text-sm text-slate-500">Filtreleri değiştirerek tekrar deneyin.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {sortedYears.map((year, yearIndex) => (
                <FadeIn key={year} delay={0.05 * yearIndex} direction="up">
                  <div>
                    <div className="mb-8 flex items-center gap-4">
                      <div className="flex min-h-[96px] min-w-[96px] flex-col items-center justify-center rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-5 py-2.5 text-center shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)]">
                        <span className="text-3xl font-extrabold leading-none text-blue-600">{year}</span>
                        <span className="mt-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-[10px] font-extrabold uppercase tracking-[0.22em] text-transparent">
                          Arşiv
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-400">{grouped[year].length} sunum</p>
                      </div>
                      <div className="ml-2 h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="space-y-4">
                      {grouped[year].map((presentation) => (
                        <div
                          key={presentation.id}
                          className="group relative flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 md:flex-row md:items-center md:gap-6 md:p-6"
                        >
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 md:text-lg">
                              {presentation.title}
                            </h3>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                <BookOpen className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                                <span className="font-medium text-slate-700">{presentation.congress}</span>
                              </div>
                            </div>
                          </div>

                          <Link
                            href="#"
                            className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                          >
                            Detaya Git <ChevronRight className="h-4 w-4" />
                          </Link>
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

      <section className="py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <FadeIn direction="up">
            <div
              className="relative overflow-hidden rounded-[2.5rem] p-12 text-center md:p-20"
              style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div
                className="pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }}
              />
              <div className="relative z-10 mx-auto max-w-2xl">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">İLETİŞİM</p>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                  Bilimsel işbirliği mi
                  <br />
                  düşünüyorsunuz?
                </h2>
                <p className="mb-10 text-base leading-relaxed text-sky-200/80 md:text-lg">
                  Kongre davetleri, ortak yayın projeleri veya akademik danışmanlık için iletişime geçin.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/iletisim"
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
