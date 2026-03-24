'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();

  const pages = [
    { href: '/hakkimda', label: t('nav.about') },
    { href: '/tedaviler', label: t('footer.treatments') },
    { href: '/saglik-rehberi', label: t('footer.healthGuide') },
    { href: '/iletisim', label: t('footer.contact') },
  ];

  const treatments = [
    { href: '/tedaviler/skolyoz-kifoz-cerrahisi', label: 'Skolyoz & Kifoz' },
    { href: '/tedaviler/bel-fitigi-tedavisi', label: t('home.patientStories.herniation') },
    { href: '/tedaviler/boyun-fitigi-cerrahisi', label: 'Boyun Fıtığı' },
    { href: '/tedaviler/diz-kalca-protezi', label: t('home.patientStories.kneeProsthesis') },
    { href: '/tedaviler/cocuk-ortopedisi', label: 'Çocuk Ortopedisi' },
  ];
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/logo.svg" alt="Prof. Dr. Nurullah Ermiş" className="h-17 w-auto brightness-0 invert" />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              {t('footer.aboutText')}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/prof.dr.nurullah.ermis/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram'da Prof. Dr. Nurullah Ermiş'i takip edin"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/ortopediveomurga"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook'ta takip edin"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@centralhospitaltr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube kanalımızı ziyaret edin"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {pages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white">
                    <ChevronRight className="mr-2 h-3 w-3 text-slate-600 transition-colors group-hover:text-blue-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t('footer.treatments')}</h3>
            <ul className="space-y-3">
              {treatments.map((treatment) => (
                <li key={treatment.href}>
                  <Link
                    href={treatment.href}
                    className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-slate-600 transition-colors group-hover:text-blue-500" />
                    {treatment.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t('footer.contactInfo')}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Central Hospital Etiler</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Nispetiye Cad., Aydın Sok. No:1
                    <br />
                    34470 Beşiktaş / İstanbul
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <a href="tel:+905322051637" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                    0532 205 16 37
                  </a>
                  <p className="mt-0.5 text-xs text-slate-500">{t('topline.mondayFriday')}: 08:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <a
                  href="mailto:nurullahermis@central.com.tr"
                  className="mt-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  nurullahermis@central.com.tr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col items-center justify-between py-6 text-xs text-slate-600 md:flex-row">
          <p>{t('footer.rights')}</p>
          <div className="mt-3 flex space-x-6 md:mt-0">
            <Link href="/privacy" className="transition-colors hover:text-slate-400">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="transition-colors hover:text-slate-400">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}