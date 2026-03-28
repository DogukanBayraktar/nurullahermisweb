import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim & Randevu | Prof. Dr. Nurullah Ermiş',
  description: 'Prof. Dr. Nurullah Ermiş ile iletişime geçin. Ataşehir, Kozyatağı ve Etiler lokasyonlarında randevu alın.',
  keywords: ['nurullah ermiş randevu', 'ortopedi randevu istanbul', 'central hospital ataşehir randevu'],
  alternates: {
    canonical: 'https://www.nurullahermis.com/iletisim',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/iletisim', 'en-US': 'https://www.nurullahermis.com/contact' },
  },
  openGraph: {
    title: 'İletişim & Randevu | Prof. Dr. Nurullah Ermiş',
    description: 'Ataşehir, Kozyatağı ve Etiler lokasyonlarında randevu.',
    url: 'https://www.nurullahermis.com/iletisim',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
