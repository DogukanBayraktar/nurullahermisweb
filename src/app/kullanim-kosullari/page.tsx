'use client';

import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { FileText, AlertCircle, CheckCircle2, Scale, Globe, Link2, RefreshCcw, Mail, Phone, Calendar, Ban, BookOpen } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'genel-bilgi',
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Genel Bilgi',
    content: [
      {
        subtitle: 'Web Sitesinin Amacı',
        text: 'Bu web sitesi, Prof. Dr. Nurullah Ermiş\'in akademik ve mesleki faaliyetleri hakkında bilgi sunmak, tedavi alanları hakkında genel bilgilendirme yapmak ve randevu ile iletişim taleplerini karşılamak amacıyla yayınlanmaktadır.',
      },
      {
        subtitle: 'Kullanım Kabulü',
        text: 'Bu web sitesini ziyaret etmek ve/veya kullanmak, aşağıdaki kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi göstermektedir. Koşulları kabul etmiyorsanız siteyi kullanmayı bırakmanızı öneririz.',
      },
    ],
  },
  {
    id: 'tibbi-uyari',
    icon: <AlertCircle className="w-5 h-5" />,
    title: 'Tıbbi İçerik Uyarısı',
    content: [
      {
        subtitle: 'Bilgilendirme Amaçlıdır',
        text: 'Bu web sitesindeki tüm içerikler yalnızca genel bilgilendirme amacıyla sunulmaktadır. Web sitemizdeki hiçbir içerik tıbbi tanı, tedavi veya profesyonel tıbbi tavsiye niteliği taşımamaktadır. Her hastanın durumu bireysel değerlendirme gerektirir.',
      },
      {
        subtitle: 'Uzman Görüşü Alın',
        text: 'Herhangi bir sağlık problemi için lütfen nitelikli bir sağlık profesyoneline danışın. Bu sitedeki bilgilere dayanarak kendi kendinize tanı koymamanızı veya tedavi başlatmamanızı önemle tavsiye ederiz. Acil durumlarda derhal 112\'yi arayın.',
      },
    ],
    highlight: true,
  },
  {
    id: 'fikri-mulkiyet',
    icon: <Scale className="w-5 h-5" />,
    title: 'Fikri Mülkiyet Hakları',
    content: [
      {
        subtitle: 'Telif Hakkı',
        text: 'Bu web sitesindeki tüm içerikler (metin, fotoğraf, grafik, logo, video, tasarım vb.) Prof. Dr. Nurullah Ermiş\'e veya ilgili içerik sahiplerine ait olup Türk Fikir ve Sanat Eserleri Kanunu ve uluslararası telif hakkı yasaları kapsamında koruma altındadır.',
      },
      {
        subtitle: 'İzinsiz Kullanım Yasağı',
        text: 'Web sitesindeki içeriklerin tamamı veya bir kısmı, yazılı izin alınmaksızın kopyalanamaz, çoğaltılamaz, yayınlanamaz, dağıtılamaz veya ticari amaçlarla kullanılamaz. Kişisel ve ticari olmayan kullanım için alıntı yapılabilir; ancak kaynak gösterme zorunludur.',
      },
    ],
  },
  {
    id: 'sorumluluk-reddi',
    icon: <Ban className="w-5 h-5" />,
    title: 'Sorumluluk Reddi',
    content: [
      {
        subtitle: 'İçerik Doğruluğu',
        text: 'Web sitesindeki bilgilerin doğru, güncel ve eksiksiz olması için makul çaba gösterilmektedir. Ancak bu bilgilerin eksiksiz veya hatasız olduğu garanti edilmemektedir. İçerik önceden haber verilmeksizin güncellenebilir veya değiştirilebilir.',
      },
      {
        subtitle: 'Hizmet Kesintisi',
        text: 'Web sitesinin kesintisiz ve hatasız çalışacağı garanti edilmemektedir. Teknik sorunlar, bakım çalışmaları veya harici faktörler nedeniyle hizmet geçici olarak kesintiye uğrayabilir. Bu gibi durumlarda sorumluluk kabul edilmemektedir.',
      },
    ],
  },
  {
    id: 'dis-baglantilar',
    icon: <Link2 className="w-5 h-5" />,
    title: 'Dış Bağlantılar',
    content: [
      {
        subtitle: 'Üçüncü Taraf Siteler',
        text: 'Web sitemiz, bilgilendirme amaçlı üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içerikleri, gizlilik politikaları veya uygulamaları üzerinde kontrolümüz bulunmamaktadır ve bu sitelerden kaynaklanan zarar veya kayıplardan sorumlu değiliz.',
      },
      {
        subtitle: 'Dış Kaynak Kullanımı',
        text: 'Dış bağlantıları kendi takdirinizle kullanmanızı ve bu sitelerin kullanım koşullarını ve gizlilik politikalarını incelemenizi tavsiye ederiz.',
      },
    ],
  },
  {
    id: 'degisiklikler',
    icon: <RefreshCcw className="w-5 h-5" />,
    title: 'Değişiklikler',
    content: [
      {
        subtitle: 'Koşulların Güncellenmesi',
        text: 'Bu kullanım koşulları zaman zaman güncellenebilir. Değişiklikler, yayınlanma tarihinden itibaren geçerli olacaktır. Web sitemizi düzenli olarak kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.',
      },
      {
        subtitle: 'Bildirim',
        text: 'Önemli değişiklikler için web sitesi ana sayfasında duyuru yapılabilir. Ancak bildirim yapılmaması halinde de güncel koşulların geçerli olduğu kabul edilir.',
      },
    ],
  },
  {
    id: 'uygulanacak-hukuk',
    icon: <Globe className="w-5 h-5" />,
    title: 'Uygulanacak Hukuk',
    content: [
      {
        subtitle: 'Türk Hukuku',
        text: 'Bu kullanım koşulları Türk hukukuna göre yorumlanır ve uygulanır. Bu koşullardan kaynaklanan veya bunlarla ilgili tüm anlaşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.',
      },
    ],
  },
];

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden py-20 border-b border-slate-100 bg-slate-50">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container relative z-10 mx-auto max-w-4xl px-4">
          <FadeIn delay={0.1} direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6">
              <FileText className="w-3.5 h-3.5" />
              Yasal Bilgiler
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              Kullanım Koşulları
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mb-6">
              Prof. Dr. Nurullah Ermiş resmi web sitesini kullanmadan önce lütfen aşağıdaki kullanım koşullarını dikkatlice okuyunuz.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Son güncellenme: Mart 2025</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ İÇERİK ═══════════════ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">

          {/* Hızlı Navigasyon */}
          <FadeIn direction="up" delay={0.05}>
            <div className="mb-14 rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">İçindekiler</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SECTIONS.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors py-1"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Bölümler */}
          <div className="space-y-12">
            {SECTIONS.map((section, si) => (
              <FadeIn key={section.id} delay={0.05 * si} direction="up">
                <div id={section.id} className="scroll-mt-32">
                  {/* Başlık */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-white flex-shrink-0 ${section.highlight ? 'bg-amber-500' : 'bg-blue-600'}`}>
                      {section.icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{section.title}</h2>
                  </div>

                  {/* Tıbbi Uyarı Banner */}
                  {section.highlight && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-amber-700">
                        Bu bölüm önemli tıbbi sorumluluk reddi bilgisi içermektedir. Lütfen dikkatlice okuyunuz.
                      </p>
                    </div>
                  )}

                  {/* Alt Bölümler */}
                  <div className="space-y-5">
                    {section.content.map((item, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl border p-5 md:p-6 ${section.highlight
                          ? 'border-amber-100 bg-amber-50/40'
                          : 'border-slate-100 bg-slate-50/60'
                          }`}
                      >
                        <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${section.highlight ? 'text-amber-600' : 'text-blue-600'}`}>
                          {item.subtitle}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Kabul Bildirimi */}
          <FadeIn direction="up" delay={0.1}>
            <div className="mt-16 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-teal-50 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Koşulları Kabul Ediyorum</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Bu web sitesini kullanmaya devam ederek yukarıdaki kullanım koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi onaylıyorsunuz.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all"
                    >
                      Ana Sayfaya Dön
                    </Link>
                    <Link
                      href="/gizlilik-politikasi"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
                    >
                      Gizlilik Politikası
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* İletişim Kutusu */}
          <FadeIn direction="up" delay={0.15}>
            <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Sorularınız mı var?</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
                    >
                      <Mail className="w-4 h-4" /> İletişim Formu
                    </Link>
                    <a
                      href="tel:+905322051637"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
                    >
                      <Phone className="w-4 h-4" /> Telefon
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}