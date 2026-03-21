'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Star, ArrowRight, Quote, Play } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const TESTIMONIALS = [
  { text: "Skolyoz ameliyatı sonrası çocuğumuz ilk kez dik bir şekilde yürüdü. Profesörümüze minnettarız.", author: "Mehmet A.", detail: "Skolyoz Hastası Velisi" },
  { text: "Yıllardır çektiğim bel fıtığı ağrısı ameliyattan bir gün sonra tamamen geçti. Aynı gün ayağa kalktım!", author: "Ayşe K.", detail: "Bel Fıtığı Hastası, 52 Yaşında" },
  { text: "Diz protezi sonrası merdivenlerden rahatça inip çıkabiliyorum. Hayatım değişti.", author: "Hüseyin T.", detail: "Diz Protezi Hastası, 68 Yaşında" },
  { text: "Çocuğumuzun kalça çıkığı sorunu erken yaşta tespit edildi ve tedavi sürecini çok profesyonelce yönettiler.", author: "Fatma S.", detail: "Çocuk Ortopedisi Velisi" },
];

const BEFORE_AFTER = [
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600", label: "Skolyoz Düzeltme", desc: "14 yaşında hasta, ameliyat sonrası tam düzeltme sağlandı." },
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600", label: "Diz Protezi", desc: "68 yaşında hasta, protez sonrası tam hareket açıklığı." },
  { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600", label: "Bel Fıtığı", desc: "45 yaşında hasta, mikrocerrahi sonrası tam iyileşme." },
];

const YOUTUBE_VIDEOS = [
  { title: "Skolyoz Cerrahisi", videoId: "gryuYiNd6WI", isShort: false, thumb: "https://img.youtube.com/vi/gryuYiNd6WI/maxresdefault.jpg" },
  { title: "Bel Fıtığı Ameliyatı", videoId: "MOw6U2iJQew", isShort: false, thumb: "https://img.youtube.com/vi/MOw6U2iJQew/maxresdefault.jpg" },
  { title: "Diz Protezi Cerrahisi", videoId: "4kZKY8hnwDo", isShort: false, thumb: "https://img.youtube.com/vi/4kZKY8hnwDo/maxresdefault.jpg" },
];

function ResultsSlider({ items }: { items: typeof BEFORE_AFTER }) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  // 3 kart göster, current indeksten başlayarak
  const visibleItems = [0, 1, 2].map(offset => items[(current + offset) % total]);

  return (
    <div className="relative max-w-5xl mx-auto px-2">
      {/* Kart sırası */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleItems.map((item, i) => (
          <div key={`${current}-${i}`} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="h-60 relative overflow-hidden">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {item.label}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 text-base mb-1.5">{item.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
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

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openVideo, setOpenVideo] = useState<{ id: string; isShort: boolean } | null>(null);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
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
    <div className="flex flex-col min-h-screen">

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 35%, #0e7490 65%, #0891b2 100%)' }}>

        {/* Soft radial glows */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 65%)' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 min-h-[600px] lg:min-h-[680px]">

            {/* Sol — metin */}
            <div className="w-full lg:w-1/2 py-20 lg:py-28 lg:pr-16">
              <FadeIn delay={0.1} direction="down">
                <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-semibold text-sky-200 mb-7 gap-2">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  Ortopedi ve Travmatoloji Profesörü
                </div>
              </FadeIn>

              <FadeIn delay={0.2} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight mb-3 leading-[1.08]">
                  Prof. Dr. M. Nurullah Ermiş
                </h1>
                <p className="text-xl md:text-2xl text-sky-200 font-semibold mb-7">Ortopedi ve Omurga Cerrahisi Uzmanı</p>
              </FadeIn>

              <FadeIn delay={0.3} direction="up">
                <p className="text-base md:text-lg text-sky-100/80 mb-10 max-w-xl leading-relaxed">
                  Skolyoz, bel-boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanlarında 20 yılı aşkın cerrahi tecrübe. Central Hospital, Ataşehir / Etiler / Kozyatağı.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-3">
                <Link href="/iletisim">
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-sky-50 text-sky-900 font-bold text-base py-6 px-10 h-auto shadow-xl hover:scale-[1.03] transition-all duration-200 rounded-xl">
                    Randevu Al
                  </Button>
                </Link>
                <Link href="/tedaviler">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:text-white font-semibold text-base py-6 px-10 h-auto backdrop-blur-sm rounded-xl transition-all duration-200">
                    Tedavileri İncele
                  </Button>
                </Link>
              </FadeIn>

              <FadeIn delay={0.55} direction="none">
                <div className="mt-12 grid grid-cols-3 gap-0 max-w-sm border border-white/15 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
                  {[
                    { val: "20+", label: "Yıl Deneyim" },
                    { val: "Prof.", label: "Akademik Unvan" },
                    { val: "UCSF", label: "ABD Eğitimi" },
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
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
              <FadeIn delay={0.35} direction="left">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[3rem] opacity-30 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)' }} />
                  <img
                    src="http://www.nurullahermis.com/assets/uploads/hakk%C4%B1mda/5f50b2218201e.jpg"
                    alt="Prof. Dr. M. Nurullah Ermiş"
                    className="relative rounded-3xl shadow-2xl shadow-black/30 object-cover w-full max-w-md lg:max-w-lg aspect-[3/4] object-top border-2 border-white/20"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. HAKKINDA ═══════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
            <FadeIn direction="right" delay={0.2} className="w-full lg:w-5/12 relative">
              <div className="absolute -inset-3 bg-blue-50 rounded-[2.5rem] -z-10 rotate-2 opacity-60 scale-[1.03]" />
              <img
                src="http://www.nurullahermis.com/assets/uploads/hakk%C4%B1mda/5f50b33b8cc6f.jpg"
                alt="Prof. Dr. Nurullah Ermiş"
                className="rounded-3xl shadow-2xl shadow-slate-200/80 object-cover w-full aspect-[4/5] z-10 relative object-top"
              />
            </FadeIn>
            <div className="w-full lg:w-7/12">
              <FadeIn delay={0.1} direction="up">
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">Hakkında</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
                  Ortopedi ve Omurga Cerrahisinde Güvenilir İsim
                </h2>
                <div className="w-16 h-1 bg-blue-600 mb-8 rounded-full" />
                <p className="text-lg text-slate-600 leading-relaxed mb-5">
                  Hacettepe Üniversitesi mezunu olan Prof. Dr. Ermiş, Baltalimanı Kemik Hastalıkları Hastanesi'nde uzmanlığını tamamlayarak ABD (UCSF) ve Belçika'da omurga cerrahisi üzerine ileri eğitimler almıştır.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  2021 yılında Profesör unvanını kazanmış olup skolyoz, bel-boyun fıtığı, eklem protezi ve çocuk ortopedisi alanlarında en güncel tedavi yöntemlerini sunmaktadır.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} direction="up">
                <Link href="/hakkimda">
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 hover:bg-blue-50 font-semibold px-8 py-6 h-auto transition-all duration-200 rounded-xl">
                    Kariyerini İncele
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. TEDAVİLER — BENTO ═══════════════ */}
      <section className="py-28 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.1} direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Tedavi Alanları</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Uzmanlık Alanlarımız</h2>
            <p className="text-slate-500 text-lg">Ortopedi, omurga cerrahisi ve çocuk ortopedisi alanlarında kapsamlı cerrahi çözümler.</p>
          </FadeIn>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[220px]">

            {/* 1 — Büyük kart (sol, 2 satır) */}
            <FadeIn delay={0.05} direction="up" className="md:col-span-5 md:row-span-2">
              <Link href="/tedaviler?id=1" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=1200" alt="Skolyoz" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-blue-500/30 border border-blue-400/30 text-blue-200 rounded-full uppercase tracking-widest mb-3 backdrop-blur-sm">Omurga</span>
                    <h3 className="text-2xl font-extrabold text-white mb-2">Skolyoz & Kifoz</h3>
                    <p className="text-sm text-white/65 leading-relaxed mb-4">VBT dahil en güncel omurga eğriliği düzeltme cerrahileri.</p>
                    <span className="text-blue-300 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all">Detaylı Bilgi <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* 2 — Orta üst */}
            <FadeIn delay={0.1} direction="up" className="md:col-span-4">
              <Link href="/tedaviler?id=2" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200" alt="Bel Fıtığı" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Bel & Boyun Fıtığı</h3>
                    <p className="text-xs text-white/60">Mikrocerrahi, aynı gün mobilizasyon.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* 3 — Sağ üst — diz kalça protezi foto */}
            <FadeIn delay={0.12} direction="up" className="md:col-span-3">
              <Link href="/tedaviler?id=4" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1200" alt="Diz Kalça Protezi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-white/20 text-white rounded-full uppercase tracking-widest mb-3 backdrop-blur-sm">Protez</span>
                    <h3 className="text-lg font-extrabold text-white mb-1">Diz & Kalça Protezi</h3>
                    <p className="text-xs text-white/60">Robotik navigasyon destekli.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* 4 — Orta alt */}
            <FadeIn delay={0.15} direction="up" className="md:col-span-4">
              <Link href="/tedaviler?id=5" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200" alt="Çocuk Ortopedisi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Çocuk Ortopedisi</h3>
                    <p className="text-xs text-white/60">Kalça çıkığı, çarpık ayak, deformite.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* 5 — Sağ alt — artroskopi foto */}
            <FadeIn delay={0.18} direction="up" className="md:col-span-3">
              <Link href="/tedaviler?id=1" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=1200" alt="Artroskopik Cerrahi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-white/20 text-white rounded-full uppercase tracking-widest mb-3 backdrop-blur-sm">Artroskopi</span>
                    <h3 className="text-lg font-extrabold text-white mb-1">Artroskopik Cerrahi</h3>
                    <p className="text-xs text-white/60">Menisküs, ACL, kapalı cerrahi.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ═══════════════ 4. ÖNCESİ – SONRASI (slider) ═══════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Sonuçlar</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tedavi Sonuçları</h2>
            <p className="text-slate-500 text-lg">Hastalarımızın tedavi süreçlerinden gerçek sonuçlar.</p>
          </FadeIn>
          <ResultsSlider items={BEFORE_AFTER} />
        </div>
      </section>

      {/* ═══════════════ 5. TEDAVİ SÜRECİ ═══════════════ */}
      <section className="py-28 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">Tedavi Süreci</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">İlk Muayeneden Taburculuğa</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {[
              { step: "01", title: "Muayene", desc: "Fizik muayene ve görüntüleme ile tanı." },
              { step: "02", title: "Plan", desc: "Kişiye özel tedavi yolu belirlenir." },
              { step: "03", title: "Tedavi", desc: "Minimal invaziv cerrahi uygulanır." },
              { step: "04", title: "İyileşme", desc: "Fizyoterapi ve düzenli kontroller." },
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

      {/* ═══════════════ 6. YOUTUBE VİDEOLAR ═══════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Video İçerikler</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">YouTube Kanalımız</h2>
            <p className="text-slate-500 text-lg">Tedavi yöntemleri ve hasta bilgilendirme videoları.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {YOUTUBE_VIDEOS.map((video, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.12} direction="up">
                <div className="group cursor-pointer" onClick={() => setOpenVideo({ id: video.videoId, isShort: video.isShort })}>
                  <div className={`relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-400 ${video.isShort ? 'aspect-[9/16] max-w-[220px] mx-auto' : 'aspect-video'}`}>
                    <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-600" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-900/30 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <Play className="w-7 h-7 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">{video.title}</h3>
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
              Kapat ✕
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

      {/* ═══════════════ 7. HASTA YORUMLARI ═══════════════ */}
      <section className="py-28 bg-sky-50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="text-sky-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Hasta Yorumları</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hastalarımız Ne Diyor?</h2>
          </FadeIn>

          <div className="relative bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50 p-8 md:p-14">
            <Quote className="w-14 h-14 text-sky-200 absolute top-7 left-7" />
            <div className="min-h-[180px] flex flex-col justify-center items-center text-center relative z-10">
              <div className="flex mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 italic">
                &ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-slate-900 text-lg">{TESTIMONIALS[currentTestimonial].author}</p>
                <p className="text-slate-500 text-sm mt-0.5">{TESTIMONIALS[currentTestimonial].detail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button onClick={prevTestimonial} className="w-11 h-11 rounded-xl bg-sky-100 hover:bg-sky-200 border border-sky-200 flex items-center justify-center transition-all duration-200 text-sky-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-sky-500' : 'w-2 bg-sky-200 hover:bg-sky-300'}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="w-11 h-11 rounded-xl bg-sky-100 hover:bg-sky-200 border border-sky-200 flex items-center justify-center transition-all duration-200 text-sky-700">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. CTA ═══════════════ */}
      <section className="py-8 pb-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0e7490 100%)' }}>

              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="text-sky-300 font-bold uppercase tracking-[0.18em] text-xs mb-6">İletişime Geçin</p>
                <h2 className="text-3xl md:text-[3.5rem] font-extrabold text-white mb-7 leading-tight">
                  Sağlığınız İçin<br />Profesyonel Adım Atın
                </h2>
                <p className="text-base md:text-lg text-sky-200/80 mb-12 leading-relaxed">
                  MR ve röntgen sonuçlarınızın değerlendirilmesi için Prof. Dr. Nurullah Ermiş'e hemen ulaşabilir, online randevunuzu kolayca oluşturabilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/iletisim">
                    <Button size="lg" className="bg-white hover:bg-sky-50 text-sky-900 font-bold text-lg py-7 px-12 h-auto rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-200">
                      Muayene Randevusu Al
                    </Button>
                  </Link>
                  <a href="tel:+905322051637">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold text-lg py-7 px-12 h-auto rounded-2xl backdrop-blur-md transition-all duration-200">
                      Hemen Arayın
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}