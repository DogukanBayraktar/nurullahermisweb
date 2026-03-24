'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLangFromPathname } from '@/lib/routes';

export default function I18nRouteSync() {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = getLangFromPathname(pathname || '/');

    document.documentElement.lang = lang;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', lang);
    }

    if (i18n.resolvedLanguage !== lang && i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [pathname, i18n]);

  return null;
}
