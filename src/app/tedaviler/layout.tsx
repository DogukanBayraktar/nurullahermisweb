import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tedaviler | Prof. Dr. Nurullah Ermiş',
  description: 'Skolyoz, bel fıtığı, boyun fıtığı, diz-kalça protezi, çocuk ortopedisi ve artroskopik cerrahi tedavi seçenekleri.',
  keywords: ['ortopedi tedavileri', 'omurga cerrahisi istanbul', 'skolyoz ameliyatı', 'bel fıtığı tedavisi', 'diz protezi istanbul'],
  alternates: {
    canonical: 'https://www.nurullahermis.com/tedaviler',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/tedaviler', 'en-US': 'https://www.nurullahermis.com/treatments' },
  },
  openGraph: {
    title: 'Tedaviler | Prof. Dr. Nurullah Ermiş',
    description: 'Ortopedi ve omurga cerrahisi tedavi seçenekleri.',
    url: 'https://www.nurullahermis.com/tedaviler',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function TedavilerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
