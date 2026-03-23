'use client';
import React from 'react';
import { Award, BookOpen, GraduationCap, Building, Star, ChevronRight, Phone, CheckCircle2, FileText, Globe, Users } from 'lucide-react';
import { FadeIn } from "@/components/ui/fade-in";
import Link from 'next/link';

const EDUCATION = [
  { year: "2002", title: "Hacettepe Üniversitesi Tıp Fakültesi", subtitle: "Tıp Eğitimi — Ankara", type: "edu" },
  { year: "2005", title: "Gent Üniversitesi", subtitle: "Yurtdışı Eğitim — Belçika", type: "int" },
  { year: "2008", title: "Baltalimanı Ortopedi Hastanesi", subtitle: "Uzmanlık Eğitimi — İstanbul", type: "edu" },
  { year: "2012", title: "California Üniversitesi (UCSF)", subtitle: "Yurtdışı Eğitim — San Francisco, ABD", type: "int" },
];

const EXPERIENCE = [
  { period: "2019 – Halen", title: "Central Hospital, İstanbul", subtitle: "Kurucu Hekim — Ortopedi ve Travmatoloji" },
  { period: "2015 – 2018", title: "Maltepe Üniversitesi Hastanesi", subtitle: "İstanbul" },
  { period: "2013 – 2015", title: "Acıbadem Üniversitesi Hastanesi", subtitle: "İstanbul" },
  { period: "2011 – 2013", title: "Maltepe Üniversitesi Hastanesi", subtitle: "İstanbul" },
  { period: "2008 – 2011", title: "Haydarpaşa Numune EAH", subtitle: "İstanbul" },
  { period: "2008", title: "Metin Sabancı Baltalimanı Ortopedi Hastanesi", subtitle: "İstanbul" },
];

const PUBLICATIONS = [
  { year: "2024", title: "Short-term results of hip prosthesis with shortening osteotomy in patients with Crowe Type IV dysplastic coxarthrosis", journal: "Medicine Science, Cilt 13, Sayı 4, ss. 873–878", authors: "Polat Ö., Sanel S., Ermiş M.N., Solakoğlu C." },
  { year: "2018", title: "Combination of lumbar erector spinae plane block and transmuscular quadratus lumborum block for surgical anaesthesia in hemiarthroplasty", journal: "Indian Journal of Anaesthesia, Cilt 62, Sayı 10", authors: "Tulgar S., Ermiş M.N., Özer Z." },
  { year: "2018", title: "Comparison of ultrasound-guided lumbar erector spinae plane block and transmuscular quadratus lumborum block for postoperative analgesia", journal: "Anesthesia: Essays and Researches", authors: "Tulgar S., Köse H.C., Selvi O., Şentürk Ö., Thomas D.T., Ermiş M.N. ve ark." },
  { year: "2017", title: "Spine Research and Case Analysis", journal: "Journal of Turkish Spinal Surgery, Cilt 28, Sayı 4, ss. 283–288", authors: "Ermiş N., Erler K., Benli İ.T." },
  { year: "2012", title: "Konjenital kalp hastalığı nedeniyle sternotomi veya torakotomi yapılmış hastalarda skolyoz ve kifoz gelişimi", journal: "Journal of Turkish Spinal Surgery", authors: "Ermiş M.N., Solakoğlu C., Coşar Y. ve ark." },
  { year: "2011", title: "Irreducible open posterolateral knee dislocation due to medial meniscus interposition", journal: "Acta Orthopaedica et Traumatologica Turcica", authors: "Durakbaşa M.O., Ülkü K., Ermiş M.N." },
  { year: "2010", title: "Irreducible fracture dislocation of the ankle caused by tibialis posterior tendon interposition", journal: "Journal of Foot and Ankle Surgery", authors: "Ermiş M.N. ve ark." },
];

const CERTIFICATES = [
  { year: "2010", title: "Ekstremite Rekonstrüksiyon Yöntemleri" },
  { year: "2008", title: "Mikrocerrahi Temel Kursu" },
  { year: "2007", title: "Ayak ve Ayak Bileği Cerrahisi" },
  { year: "2006", title: "Kalça Displazisi Tedavisinde Güncel Yaklaşımlar" },
  { year: "2003", title: "Eklem İçi Enjeksiyon Eğitimi" },
];

const CONGRESSES = [
  { year: "2011", title: "Türk Omurga Kongresi", topic: "Skolyoz, kifoz, osteotomi cerrahisi" },
  { year: "2008", title: "SICOT — Hong Kong", topic: "Skolyoz, epifiz kayması, vertebra tüberkülozu" },
  { year: "2007", title: "SICOT (Fas) / POSNA (ABD) / EFORT (İtalya)", topic: "Kalça displazisi, bağ yaralanmaları" },
];

const MEMBERSHIPS = [
  "Türk Omurga Derneği",
  "Türk Kemik ve Eklem Cerrahisi Derneği",
  "Türk Kemik ve Eklem Eğitim Derneği",
  "Türk Pediatrik Ortopedi Derneği",
];

export default function HakkimdaPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="relative bg-slate-50 py-20 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-[0.03] dotted-bg" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            <FadeIn direction="right" delay={0.1} className="w-full lg:w-5/12">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-teal-50/50 rounded-[3rem] rotate-3 scale-105 -z-10 blur-sm" />
                <img
                  src="/nurullah-hoca3.avif"
                  alt="Prof. Dr. M. Nurullah Ermiş"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5] object-top border-4 border-white"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-3xl px-7 py-5 shadow-2xl shadow-blue-600/30 hidden md:flex flex-col items-center z-20">
                  <span className="text-3xl font-extrabold">20+</span>
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Yıl Deneyim</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="w-full lg:w-7/12">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-4 block">Hakkında</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">Prof. Dr. M. Nurullah Ermiş</h1>
              <p className="text-xl text-slate-500 font-medium mb-8">Ortopedi ve Omurga Cerrahisi Uzmanı — Central Hospital, İstanbul</p>
              <div className="text-[1.05rem] text-slate-600 leading-relaxed mb-8 space-y-4">
                <p>Prof. Dr. M. Nurullah Ermiş, 2002 yılında <strong className="text-slate-900">Hacettepe Üniversitesi Tıp Fakültesi</strong>'nden mezun olmuş; uzmanlık eğitimini 2008'de <strong className="text-slate-900">Baltalimanı Metin Sabancı Kemik Hastalıkları Hastanesi</strong>'nde tamamlamıştır.</p>
                <p>Uzmanlık sonrasında <strong className="text-slate-900">Belçika Gent Üniversitesi</strong> ve <strong className="text-slate-900">ABD California Üniversitesi (UCSF)</strong>'nde omurga cerrahisi alanında uluslararası ileri eğitimler almıştır. 2019 yılından itibaren <strong className="text-slate-900">Central Hospital İstanbul</strong>'da kurucu hekim olarak görev yapmaktadır.</p>
                <p>Skolyoz (VBT dahil), bel-boyun fıtığı, diz-kalça protezi, artroskopik cerrahi, çocuk ortopedisi ve boy uzatma cerrahisi başlıca uzmanlık alanlarıdır.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />, label: "Profesör (2021)" },
                  { icon: <Globe className="w-4 h-4 text-blue-600" />, label: "UCSF & Gent Üniversitesi" },
                  { icon: <Building className="w-4 h-4 text-blue-600" />, label: "Central Hospital Kurucu Hekim" },
                  { icon: <FileText className="w-4 h-4 text-blue-600" />, label: "7+ Uluslararası Yayın" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm text-sm font-semibold text-slate-700">
                    {badge.icon} {badge.label}
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* EĞİTİM & KARİYER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Biyografi</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Eğitim & Kariyer Geçmişi</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Education */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Eğitim ve Uzmanlık
              </h3>
              <div className="space-y-0">
                {EDUCATION.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i} direction="up">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 shrink-0 mt-1" />
                        {i < EDUCATION.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 mt-1 mb-1" />}
                      </div>
                      <div className="pb-6">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[11px] font-bold rounded-full mb-2 shadow-md shadow-blue-600/20">{item.year}</span>
                        <h4 className="text-base font-bold text-slate-900 mb-0.5">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <Building className="w-5 h-5 text-blue-600" /> Mesleki Deneyim
              </h3>
              <div className="space-y-0">
                {EXPERIENCE.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i} direction="up">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1 ${i === 0 ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`} />
                        {i < EXPERIENCE.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 mt-1 mb-1" />}
                      </div>
                      <div className="pb-5">
                        <span className="inline-block text-[11px] font-bold text-blue-600 mb-1">{item.period}</span>
                        <h4 className="text-base font-bold text-slate-900 mb-0.5">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>

          {/* Certificates */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-blue-600" /> Kurs ve Sertifikalar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTIFICATES.map((cert, i) => (
                <FadeIn key={i} delay={0.05 * i} direction="up">
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-bold text-blue-600 mb-0.5">{cert.year}</p>
                      <p className="text-sm font-semibold text-slate-800">{cert.title}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* UZMANLIK ALANLARI */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Uzmanlık</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tıbbi İlgi Alanları</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Ortopedi ve travmatoloji alanının tüm alt dallarında kapsamlı cerrahi deneyim.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, title: "Omurga Cerrahisi", desc: "Skolyoz, Kifoz, VBT, Bel Fıtığı, Boyun Fıtığı, Omurga Kırıkları, Spinal Stenoz" },
              { icon: <Award className="w-6 h-6" />, title: "Eklem Cerrahisi", desc: "Diz & Kalça Protezi (robotik), Artroskopik Cerrahi, Menisküs, Ön Çapraz Bağ (ACL)" },
              { icon: <Users className="w-6 h-6" />, title: "Çocuk Ortopedisi", desc: "Gelişimsel Kalça Displazisi, Çarpık Ayak (Ponseti), Doğumsal Deformiteler, Büyüme Bozuklukları" },
              { icon: <BookOpen className="w-6 h-6" />, title: "Deformite & Boy Uzatma", desc: "Kemik Deformitesi Düzeltme, İlizarov, Taylor Spatial Frame, PRECICE Çivi ile Boy Uzatma" },
            ].map((card, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AKADEMİK YAYINLAR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Bilimsel Çalışmalar</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Uluslararası Akademik Yayınlar</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">PubMed, Scopus ve hakemli dergilerde yayımlanmış bilimsel makaleler.</p>
          </div>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub, i) => (
              <FadeIn key={i} delay={0.04 * i} direction="up">
                <div className="flex gap-5 p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/20 transition-all group">
                  <div className="shrink-0">
                    <span className="inline-block w-12 px-2 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg text-center shadow-md shadow-blue-600/20">{pub.year}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors">{pub.title}</h4>
                    <p className="text-xs text-blue-600 font-semibold mb-1 italic">{pub.journal}</p>
                    <p className="text-xs text-slate-500">{pub.authors}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Kitaplar */}
          <div className="mt-12 pt-10 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-blue-600" /> Kitap Bölümleri
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: "Anterolateral Yaklaşım", book: "Kalça Cerrahisi" },
                { title: "Konik Stem", book: "Kalça Cerrahisi" },
                { title: "GKD'de Modüler Stem", book: "Kalça Cerrahisi" },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-5">
                  <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-0.5">{b.title}</p>
                    <p className="text-xs text-slate-500">{b.book} — Nobel Tıp Yayınları, 2009</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* KONGRE & ÜYELİKLER */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Congresses */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2.5">
                <Globe className="w-6 h-6 text-blue-600" /> Uluslararası Kongre Sunumları
              </h2>
              <div className="space-y-5">
                {CONGRESSES.map((c, i) => (
                  <FadeIn key={i} delay={0.1 * i} direction="up">
                    <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 hover:shadow-md transition-all">
                      <span className="shrink-0 inline-block px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg self-start shadow-md shadow-blue-600/20">{c.year}</span>
                      <div>
                        <p className="font-bold text-slate-900 text-sm mb-1">{c.title}</p>
                        <p className="text-xs text-slate-500">{c.topic}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-2.5">
                <Users className="w-5 h-5 text-blue-600" /> Mesleki Üyelikler
              </h2>
              <div className="space-y-3">
                {MEMBERSHIPS.map((m, i) => (
                  <FadeIn key={i} delay={0.1 * i} direction="up">
                    <div className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <p className="font-semibold text-slate-800 text-sm">{m}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn direction="up">
            <div className="rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden cta-bg">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none hero-glow-1" />
              <div className="relative z-10">
                <p className="text-sky-300 font-bold uppercase tracking-[0.18em] text-xs mb-6">İletişime Geçin</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Muayene Randevusu Alın</h2>
                <p className="text-sky-200/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                  Prof. Dr. M. Nurullah Ermiş ile Ataşehir, Etiler veya Kozyatağı'nda muayene randevusu almak için bize ulaşın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/iletisim"
                    className="inline-flex items-center justify-center bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm py-4 px-8 rounded-2xl shadow-xl hover:scale-[1.02] transition-all gap-2">
                    Muayene Randevusu Al <ChevronRight className="w-5 h-5" />
                  </Link>
                  <a href="tel:+905322051637"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-bold text-sm py-4 px-8 rounded-2xl transition-all gap-2">
                    <Phone className="w-5 h-5 text-sky-300" /> 0532 205 16 37
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