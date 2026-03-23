'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Star, ArrowRight, Quote, Play } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const TESTIMONIALS = [
  { text: "Skolyoz ameliyatı sonrası çocuğumuz ilk kez dik bir şekilde yürüdü. Profesörümüze minnettarız.", author: "Mehmet A.", detail: "Skolyoz Hastası Velisi" },
  { text: "Yıllardır çektiğim bel fıtığı ağrısı ameliyattan bir gün sonra tamamen geçti. Aynı gün ayağa kalktım!", author: "Ayşe K.", detail: "Bel Fıtığı Hastası, 52 Yaşında" },
  { text: "Diz protezi sonrası merdivenlerden rahatça inip çıkabiliyordum. Hayatım değişti.", author: "Hüseyin T.", detail: "Diz Protezi Hastası, 68 Yaşında" },
  { text: "Çocuğumuzun kalça çıkığı sorunu erken yaşta tespit edildi ve tedavi sürecini çok profesyonelce yönettiler.", author: "Fatma S.", detail: "Çocuk Ortopedisi Velisi" },
];

const BEFORE_AFTER = [
  { img: "/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif", label: "Skolyoz Düzeltme", desc: "Skolyoz cerrahisi sonrası omurga diziliminde belirgin düzelme." },
  { img: "/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif", label: "Skolyoz Sonucu", desc: "Cerrahi sonrası daha dengeli omurga hattı ve radyolojik iyileşme." },
  { img: "/images/69b80d3d2324c321ba53cae5_Kyphosis-before-after-1.jpg.avif", label: "Kifoz Sonucu", desc: "Kifoz tedavisi sonrası duruş ve açılanmada görünür toparlanma." },
  { img: "/images/69b803d47b548c348c11664f_diz-protezi-before-after-1.jpg.avif", label: "Diz Protezi", desc: "Diz protezi sonrası eklem hizalanması ve hareket açıklığında iyileşme." },
  { img: "/images/69b8010e9d8850fbd786d629_kyphoscoliosis-2.jpg.avif", label: "Kifoskolyoz", desc: "Kifoskolyoz vakasında ameliyat sonrası daha dengeli omurga yapısı." },
];

const PATIENT_STORIES = [
  {
    name: "Mehmet Yılmaz",
    age: 14,
    tag: "Skolyoz Cerrahisi",
    tagColor: "bg-blue-600",
    summary: "Oğlumuzun omurgası 58 derece eğriydi",
    story: "Oğlumuz Kerem, 12 yaşında okul taramasında skolyoz teşhisi aldı. Başka iki hastanede 'bekleyelim' dediler; ama eğrilik hızla ilerliyordu. Prof. Dr. Ermiş bizi ilk muayenede detaylıca dinledi, MR görüntülerini tek tek anlattı. Ameliyattan 2 gün sonra Kerem kendi ayakları üstünde yürüdü. Şimdi 16 yaşında, basketbol oynuyor.",
    result: "58° → 9° düzelme",
    img: "/images/skolyoz-kifoz.png",
    date: "Mart 2024",
  },
  {
    name: "Ayşe Kılıç",
    age: 52,
    tag: "Bel Fıtığı",
    tagColor: "bg-teal-600",
    summary: "3 yıl boyunca sağ bacağıma yayılan ağrıyla yaşadım",
    story: "Üç yıl boyunca sağ bacağıma vuran ağrıyla uyuyamaz oldum. Ağrı kesiciler işe yaramıyordu, işe gidemez hale geldim. Prof. Dr. Ermiş ameliyat öncesi her adımı anlattı, sorularımı hiç atlamamıştı. Ameliyat sonrası ertesi sabah ağrı sıfırdı — o anı tarif edemem. Aynı gün koridorda yürüdüm.",
    result: "Ameliyat sonrası ertesi gün taburcu",
    img: "/images/bel-fitigi.png",
    date: "Ocak 2024",
  },
  {
    name: "Hüseyin Toprak",
    age: 68,
    tag: "Diz Protezi",
    tagColor: "bg-indigo-600",
    summary: "Yıllardır merdivenden çıkmaktan korkuyordum",
    story: "Sağ dizim yıllardır beni zorladı; artık merdivenden bile çıkamaz olmuştum. Robotik navigasyonlu diz protezi hakkında araştırırken Prof. Dr. Ermiş'e ulaştım. Ameliyat sonrası fizyoterapi süreci çok düzenliydi, her kontrolde ilerlememizi gördük. 3 ay sonra eşimle yürüyüşe çıktım.",
    result: "6 haftada tam yük bindirme",
    img: "/images/diz-kalca-protezi.png",
    date: "Kasım 2023",
  },
];

const GOOGLE_REVIEWS = [
  { name: "Selin A.", stars: 5, time: "2 ay önce", text: "Prof. Dr. Ermiş gerçekten hasta odaklı bir hekim. Her sorumuzu sabırla yanıtladı, hiç acele ettirmedi. Ameliyat sonrası takip süreci de çok düzenliydi." },
  { name: "Tarık B.", stars: 5, time: "3 ay önce", text: "Bel fıtığı ameliyatından sonra aynı gün ayağa kalktım. Yıllarca çektiğim ağrı bir günde bitti. Herkese tavsiye ederim." },
  { name: "Nermin K.", stars: 5, time: "1 ay önce", text: "Çocuğumun skolyoz tedavisinde en doğru adresi bulduk. Ameliyat öncesi ve sonrası iletişim mükemmeldi, hiçbir zaman yalnız hissetmedik." },
  { name: "Osman D.", stars: 5, time: "4 ay önce", text: "Diz protezi sonrası 3 ayda yürüyüşe çıktım. Ekip çok profesyonel, hastane süreci son derece düzenliydi." },
  { name: "Elif M.", stars: 5, time: "2 hafta önce", text: "Boyun fıtığı için geldim, mikrocerrahi ile ameliyat oldum. Sabah ameliyat, öğlen yürüyordum. Hayat kurtaran bir operasyon." },
  { name: "Cengiz Y.", stars: 5, time: "5 ay önce", text: "Yıllarca ortopedi korkusu yaşadım ama Prof. Ermiş'in yaklaşımı beni rahatlattı. Sonuçlar inanılmazdı, teşekkürler." },
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
                  Skolyoz, bel-boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanlarında 20 yılı aşkın cerrahi tecrübe.
                </p>
              </FadeIn>

              <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-3">
                <Link href="/iletisim">
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto shadow-xl hover:scale-[1.02] transition-all duration-200 rounded-xl">
                    Randevu Al
                  </Button>
                </Link>
                <Link href="/tedaviler">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/25 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:text-white font-semibold text-sm py-4 px-8 h-auto backdrop-blur-sm rounded-xl transition-all duration-200">
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
      </section>

      {/* ═══════════════ 2. TEDAVİ ALANLARI — BENTO (Services) ═══════════════ */}
      <section className="py-20 bg-slate-50 overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn delay={0.1} direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Tedavi Alanları</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Uzmanlık Alanlarımız</h2>
            <p className="text-slate-500 text-lg">Ortopedi, omurga cerrahisi ve çocuk ortopedisi alanlarında kapsamlı cerrahi çözümler.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[220px]">
            <FadeIn delay={0.05} direction="up" className="md:col-span-5 md:row-span-2">
              <Link href="/tedaviler/skolyoz-kifoz-cerrahisi" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/skolyoz-kifoz.png" alt="Skolyoz" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-extrabold text-white mb-2">Skolyoz & Kifoz</h3>
                    <p className="text-sm text-white/65 leading-relaxed">VBT dahil en güncel omurga eğriliği düzeltme cerrahileri.</p>
                
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1} direction="up" className="md:col-span-4">
              <Link href="/tedaviler/bel-fitigi-tedavisi" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/bel-fitigi.png" alt="Bel Fıtığı" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Bel & Boyun Fıtığı</h3>
                    <p className="text-xs text-white/60">Mikrocerrahi, aynı gün mobilizasyon.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.12} direction="up" className="md:col-span-3">
              <Link href="/tedaviler/diz-kalca-protezi" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/diz-kalca-protezi.png" alt="Diz Kalça Protezi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Diz & Kalça Protezi</h3>
                    <p className="text-xs text-white/60">Robotik navigasyon destekli.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.15} direction="up" className="md:col-span-4">
              <Link href="/tedaviler/cocuk-ortopedisi" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/cocuk-ortopedisi.png" alt="Çocuk Ortopedisi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Çocuk Ortopedisi</h3>
                    <p className="text-xs text-white/60">Kalça çıkığı, çarpık ayak, deformite.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn delay={0.18} direction="up" className="md:col-span-3">
              <Link href="/tedaviler/artroskopik-cerrahi" className="group block h-full">
                <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
                  <img src="/images/artroskopik-cerrahi.png" alt="Artroskopik Cerrahi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-45% to-slate-950/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-extrabold text-white mb-1">Artroskopik Cerrahi</h3>
                    <p className="text-xs text-white/60">Menisküs, ACL, kapalı cerrahi.</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>



      {/* ═══════════════ 3. HASTA YORUMLARI (Social Proof) ═══════════════ */}
      <section className="py-20 bg-slate-50 overflow-hidden relative border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Hasta Yorumları</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Hastalarımız Ne Diyor?</h2>
          </FadeIn>

          <div className="relative bg-white rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-100/30 p-8 md:p-14">
            <Quote className="w-14 h-14 text-blue-50 absolute top-7 left-7 opacity-20" />
            <div className="min-h-[200px] flex flex-col justify-center items-center text-center relative z-10">
              <div className="flex mb-6 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8 italic px-4">
                &ldquo;{TESTIMONIALS[currentTestimonial].text}&rdquo;
              </p>
              <div>
                <p className="font-extrabold text-slate-900 text-lg">{TESTIMONIALS[currentTestimonial].author}</p>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">{TESTIMONIALS[currentTestimonial].detail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all duration-300 text-blue-600 shadow-sm">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
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

          {/* Google Yorumları Grid */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
              <span className="font-extrabold text-slate-900 text-lg">4.9</span>
              <span className="text-slate-400 text-sm font-medium">· Google Yorumları</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GOOGLE_REVIEWS.map((review, i) => (
                <FadeIn key={i} delay={0.05 + i * 0.07} direction="up">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-extrabold text-blue-600 text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                          <p className="text-slate-400 text-xs">{review.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ 4. SONUÇLAR (Results/Proof) ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Sonuçlar</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tedavi Sonuçları</h2>
            <p className="text-slate-500 text-lg">Hastalarımızın tedavi süreçlerinden gerçek radyolojik ve klinik sonuçlar.</p>
          </FadeIn>
          <ResultsSlider items={BEFORE_AFTER} />
        </div>
      </section>


      {/* ═══════════════ 4b. HASTA HİKAYELERİ ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up" className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Hasta Hikayeleri</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Gerçek Hikayeler, Gerçek Sonuçlar</h2>
            <p className="text-slate-500 text-lg">Hastalarımızın kendi sözleriyle tedavi yolculukları.</p>
          </FadeIn>

          <div className="flex flex-col gap-8">
            {PATIENT_STORIES.map((story, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-[2rem] overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-400 bg-white`}>
                  {/* Görsel */}
                  <div className="w-full lg:w-2/5 relative min-h-[260px]">
                    <img src={story.img} alt={story.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full mb-2 ${story.tagColor}`}>{story.tag}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-extrabold text-white text-xs">
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{story.name}</p>
                          <p className="text-white/60 text-xs">{story.age} Yaşında · {story.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Metin */}
                  <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 leading-snug">
                      &ldquo;{story.summary}&rdquo;
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6 text-base">{story.story}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm px-4 py-2 rounded-xl">
                        <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                        {story.result}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. MERKEZ TANITIM (Bento) ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

            {/* SOL — Metin */}
            <FadeIn direction="right" delay={0.1} className="flex flex-col justify-center py-8 lg:py-0 lg:pr-8">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4">Omurga Sağlığı Merkezi</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                Omurga Sağlığı İçin<br />
                <span className="text-blue-600">Güvenilir Adres</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Birçok branşın entegre çalıştığı merkezimizde, omurga sağlığınız için kanıta dayalı klinik uygulamalarla en uygun tedavi programlarını sunuyoruz. Uzman ekibimiz size özel çözümler üretiyor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/tedaviler">
                  <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02]">
                    Tedavileri İncele
                  </span>
                </Link>
                <Link href="/iletisim">
                  <span className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 font-bold text-sm px-7 py-3.5 rounded-xl transition-all">
                    Randevu Al
                  </span>
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-0 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
                {[
                  { val: "5000+", label: "Başarılı Operasyon" },
                  { val: "20+", label: "Yıl Deneyim" },
                  { val: "3", label: "Hastane Kampüsü" },
                ].map((s, i) => (
                  <div key={i} className={`text-center py-5 px-3 ${i === 1 ? 'border-x border-slate-100' : ''}`}>
                    <div className="text-2xl font-extrabold text-blue-600 mb-1">{s.val}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* SAĞ — Bento Grid */}
            <FadeIn direction="left" delay={0.15}>
              <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: '160px 160px 160px' }}>

                {/* Büyük görsel — üst sol, 2 satır */}
                <div className="row-span-2 rounded-3xl overflow-hidden relative">
                  <img src="/images/skolyoz-kifoz.png" alt="Merkez" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-1">Cerrahi Merkez</span>
                    <span className="text-sm font-extrabold text-white">Omurga Cerrahisi</span>
                  </div>
                </div>

                {/* Stat kartı — üst sağ */}
                <div className="rounded-3xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center p-5">
                  <span className="text-4xl font-extrabold text-blue-600 leading-none">5000<span className="text-2xl">+</span></span>
                  <span className="text-xs font-bold text-blue-500/70 mt-2 text-center">Sağlıklı, Mutlu Hasta</span>
                </div>

                {/* Küçük görsel — orta sağ */}
                <div className="rounded-3xl overflow-hidden relative">
                  <img src="/images/diz-kalca-protezi.png" alt="Teknoloji" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-extrabold text-white block">Teknolojik</span>
                    <span className="text-[10px] text-white/60">Tıbbi Cihazlar</span>
                  </div>
                </div>

                {/* Alt sol */}
                <div className="rounded-3xl overflow-hidden relative">
                  <img src="/images/bel-fitigi.png" alt="Hastane" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                </div>

                {/* Online Randevu kartı — alt sağ */}
                <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0e7490 100%)' }}>
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                  <div className="relative z-10 h-full flex flex-col justify-between p-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 block mb-1">Hızlı Erişim</span>
                      <span className="text-sm font-extrabold text-white leading-tight block">Online<br />Randevu</span>
                    </div>
                    <Link href="/iletisim">
                      <span className="inline-block bg-white text-sky-900 text-[11px] font-extrabold px-4 py-2 rounded-xl hover:bg-sky-50 transition-colors">
                        Randevu Al
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
      <section className="py-20 bg-slate-50 overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
            <FadeIn direction="right" delay={0.2} className="w-full lg:w-5/12 relative">
              <div className="absolute -inset-3 bg-white rounded-[2.5rem] -z-10 rotate-2 opacity-60 scale-[1.03] shadow-xl shadow-slate-200/50" />
              <img
                src="/nurullah-hoca1.avif"
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
                <p className="text-lg text-slate-600 leading-relaxed mb-5 font-medium">
                  Uluslararası standartlarda cerrahi tecrübe.
                </p>
                <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-6">
                  Hacettepe Üniversitesi'nden mezun olup ABD (UCSF) ve Belçika'da ileri cerrahi eğitimler alan Prof. Dr. Ermiş, 20 yılı aşkın tecrübesiyle binlerce başarılı operasyona imza atmıştır.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} direction="up">
                <Link href="/hakkimda">
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-400 hover:bg-white font-semibold px-8 py-5 h-auto transition-all duration-200 rounded-xl text-sm">
                    Kariyerini ve Akademik Geçmişini İncele
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ 7. YOUTUBE VİDEOLAR (Content) ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
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


      {/* ═══════════════ 8. TEDAVİ SÜRECİ (How it works) ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden">
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


      {/* ═══════════════ 9. CTA (Contact) ═══════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
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
                    <Button size="lg" className="bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 h-auto rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-200">
                      Muayene Randevusu Al
                    </Button>
                  </Link>
                  <a href="tel:+905322051637">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold text-sm py-4 px-8 h-auto rounded-xl backdrop-blur-md transition-all duration-200">
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
  )
}