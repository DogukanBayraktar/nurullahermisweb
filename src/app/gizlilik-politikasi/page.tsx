'use client';

import React from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { Shield, Lock, Eye, Database, Bell, UserCheck, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'toplanan-bilgiler',
    icon: <Database className="w-5 h-5" />,
    title: 'Toplanan Bilgiler',
    content: [
      {
        subtitle: 'Doğrudan Sağladığınız Bilgiler',
        text: 'İletişim formlarımızı doldurduğunuzda, online randevu talebinde bulunduğunuzda veya bizimle doğrudan iletişime geçtiğinizde ad, soyad, telefon numarası, e-posta adresi ve mesaj içeriğiniz gibi kişisel bilgilerinizi toplarız.',
      },
      {
        subtitle: 'Otomatik Olarak Toplanan Bilgiler',
        text: 'Web sitemizi ziyaret ettiğinizde IP adresiniz, tarayıcı türünüz, ziyaret ettiğiniz sayfalar, sayfada geçirilen süre ve referans URL gibi teknik bilgiler otomatik olarak kaydedilebilir. Bu bilgiler çerezler ve benzeri teknolojiler aracılığıyla toplanır.',
      },
    ],
  },
  {
    id: 'bilgilerin-kullanimi',
    icon: <Eye className="w-5 h-5" />,
    title: 'Bilgilerin Kullanımı',
    content: [
      {
        subtitle: 'Hizmet Sunumu',
        text: 'Toplanan kişisel bilgiler; randevu oluşturma, talep ve sorularınıza yanıt verme, bilgilendirme ve hatırlatma bildirimleri gönderme amacıyla kullanılmaktadır.',
      },
      {
        subtitle: 'Web Sitesi İyileştirme',
        text: 'Anonim ve toplu kullanıcı davranış verileri, web sitemizi ve içeriklerimizi geliştirmek, kullanıcı deneyimini iyileştirmek amacıyla analiz edilmektedir.',
      },
      {
        subtitle: 'Yasal Yükümlülükler',
        text: 'Yürürlükteki mevzuat kapsamındaki yasal yükümlülüklerimizi yerine getirmek amacıyla gerektiğinde bilgilerinizi işleyebiliriz.',
      },
    ],
  },
  {
    id: 'bilgi-paylasimi',
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Bilgi Paylaşımı',
    content: [
      {
        subtitle: 'Üçüncü Taraflarla Paylaşım',
        text: 'Kişisel bilgileriniz; açık onayınız olmaksızın ticari amaçlarla üçüncü taraflarla paylaşılmaz. Yalnızca zorunlu hizmet sunumu için (barındırma, analitik vb.) güvenilir iş ortaklarıyla sınırlı kapsamda paylaşılabilir.',
      },
      {
        subtitle: 'Yasal Zorunluluk',
        text: 'Mahkeme kararı veya yasal bir zorunluluk söz konusu olduğunda, yetkili kurum ve kuruluşlarla bilgi paylaşımı yapılabilir.',
      },
    ],
  },
  {
    id: 'cerezler',
    icon: <Lock className="w-5 h-5" />,
    title: 'Çerezler (Cookies)',
    content: [
      {
        subtitle: 'Zorunlu Çerezler',
        text: 'Web sitemizin temel işlevlerini yerine getirebilmesi için zorunlu olan çerezler kullanılmaktadır. Bu çerezler oturum yönetimi ve güvenlik amaçlıdır; tarayıcı ayarlarınızdan devre dışı bırakılmaları halinde bazı özellikler çalışmayabilir.',
      },
      {
        subtitle: 'Analitik Çerezler',
        text: 'Kullanıcı davranışlarını anlamak ve web sitemizi geliştirmek amacıyla Google Analytics gibi üçüncü taraf analitik araçlar kullanılmaktadır. Bu çerezler anonimleştirilmiş veriler toplar ve tarayıcı ayarlarınızdan devre dışı bırakılabilir.',
      },
    ],
  },
  {
    id: 'haklariniz',
    icon: <Shield className="w-5 h-5" />,
    title: 'Haklarınız (KVKK)',
    content: [
      {
        subtitle: '6698 Sayılı KVKK Kapsamındaki Haklarınız',
        text: 'Kişisel Verilerin Korunması Kanunu çerçevesinde; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlendiyse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme ve itiraz etme haklarına sahipsiniz.',
      },
    ],
  },
  {
    id: 'veri-guvenligi',
    icon: <Bell className="w-5 h-5" />,
    title: 'Veri Güvenliği',
    content: [
      {
        subtitle: 'Güvenlik Önlemleri',
        text: 'Kişisel verilerinizi yetkisiz erişim, değişiklik, ifşa veya yok edilmeye karşı korumak amacıyla SSL şifreleme, güvenli sunucular ve erişim kontrolü gibi teknik ve idari güvenlik önlemleri uygulanmaktadır.',
      },
      {
        subtitle: 'Veri Saklama Süresi',
        text: 'Kişisel verileriniz, hizmetin sunulması için gerekli olan süre boyunca ve yasal yükümlülüklerimiz kapsamında saklanmakta; bu sürelerin dolmasının ardından güvenli biçimde silinmekte veya anonim hale getirilmektedir.',
      },
    ],
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden py-20 border-b border-slate-100 bg-slate-50"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="container relative z-10 mx-auto max-w-4xl px-4">
          <FadeIn delay={0.1} direction="up">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6">
              <Shield className="w-3.5 h-3.5" />
              Kişisel Verilerin Korunması
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              Gizlilik Politikası
            </h1>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed mb-6">
              Prof. Dr. Nurullah Ermiş resmi web sitesini ziyaret ettiğinizde kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinmek için lütfen bu politikayı dikkatlice okuyunuz.
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white flex-shrink-0">
                      {section.icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{section.title}</h2>
                  </div>

                  {/* Alt Bölümler */}
                  <div className="space-y-5 pl-0 md:pl-13">
                    {section.content.map((item, i) => (
                      <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 md:p-6">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">{item.subtitle}</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* İletişim Kutusu */}
          <FadeIn direction="up" delay={0.1}>
            <div className="mt-16 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">Sorularınız mı var?</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Gizlilik politikamız veya kişisel verilerinizin işlenmesi hakkında sorularınız için bizimle iletişime geçebilirsiniz.
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