'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLocalizedPath } from '@/lib/routes';

export default function Footer({ initialData }: { initialData?: any }) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const pages: { href: string; label: string }[] = initialData?.footer?.quickLinks?.map((link: any) => ({
    href: link.href.startsWith('http') ? link.href : getLocalizedPath(link.href.replace(/^\/(tr|en)/, '').replace(/^\//, '') || 'home', i18n.language),
    label: isEn ? (link.label_en || link.label_tr) : link.label_tr
  })) || [
    { href: getLocalizedPath('about', i18n.language), label: t('nav.about') },
    { href: getLocalizedPath('treatments', i18n.language), label: t('footer.treatments') },
    { href: getLocalizedPath('gallery', i18n.language), label: t('footer.gallery') },
    { href: getLocalizedPath('healthGuide', i18n.language), label: t('footer.healthGuide') },
    { href: getLocalizedPath('contact', i18n.language), label: t('footer.contact') },
  ];

  const treatments: { href: string; label: string }[] = initialData?.footer?.treatments?.map((link: any) => ({
    href: link.href.startsWith('http') ? link.href : getLocalizedPath(link.href.replace(/^\/(tr|en)/, '').replace(/^\//, '') || 'home', i18n.language),
    label: isEn ? (link.label_en || link.label_tr) : link.label_tr
  })) || [
    { href: getLocalizedPath('treatments', i18n.language, 'skolyoz-kifoz-cerrahisi', 'treatment'), label: t('home.treatments.cards.scoliosis.title') },
    { href: getLocalizedPath('treatments', i18n.language, 'boyun-fitigi-cerrahisi', 'treatment'), label: t('home.treatments.cards.herniation.title') },
    { href: getLocalizedPath('treatments', i18n.language, 'artroskopik-cerrahi', 'treatment'), label: t('home.treatments.cards.arthroscopy.title') },
    { href: getLocalizedPath('treatments', i18n.language, 'diz-kalca-protezi', 'treatment'), label: t('home.treatments.cards.kneeHip.title') },
    { href: getLocalizedPath('treatments', i18n.language, 'cocuk-ortopedisi', 'treatment'), label: t('home.treatments.cards.pediatric.title') },
  ];

  const contact = initialData?.footer?.contact || {
    hospitalName: "Central Hospital Etiler",
    address: "Nispetiye Cad., Aydın Sok. No:1, 34470 Beşiktaş / İstanbul",
    phone: "0532 205 16 37",
    workingHours: isEn ? "Mon - Fri: 08:00 - 20:00" : "Pzt - Cum: 08:00 - 20:00",
    email: "nurullahermis@central.com.tr"
  };

  const social = initialData?.footer?.social || {
    instagram: "https://www.instagram.com/prof.dr.nurullah.ermis/",
    facebook: "https://facebook.com/ortopediveomurga",
    youtube: "https://www.youtube.com/@centralhospitaltr"
  };
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
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.instagramAria')}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.facebookAria')}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.youtubeAria')}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {pages.map((link: any, i: number) => (
                <li key={i}>
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
              {treatments.map((treatment: any, i: number) => (
                <li key={i}>
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
                  <p className="text-sm font-medium text-slate-300">{contact.hospitalName}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {contact.address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <a href={`tel:${contact.phone?.replace(/\s/g, '')}`} className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                    {contact.phone}
                  </a>
                  <p className="mt-0.5 text-xs text-slate-500">{isEn ? (contact.workingHours_en || contact.workingHours) : (contact.workingHours_tr || contact.workingHours)}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {contact.email}
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
            <Link href="/gizlilik-politikasi" className="transition-colors hover:text-slate-400">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="/kullanim-kosullari" className="transition-colors hover:text-slate-400">
              {t('footer.termsOfUse')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
