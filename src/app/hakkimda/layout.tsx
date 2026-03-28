import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımda | Prof. Dr. Nurullah Ermiş',
  description: 'Prof. Dr. M. Nurullah Ermiş\'in özgeçmişi, eğitimi, uzmanlık alanları, akademik yayınları ve kongre sunumları.',
  keywords: ['Nurullah Ermiş kimdir', 'ortopedi cerrahı özgeçmiş', 'omurga cerrahı istanbul'],
  alternates: {
    canonical: 'https://www.nurullahermis.com/hakkimda',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/hakkimda', 'en-US': 'https://www.nurullahermis.com/about' },
  },
  openGraph: {
    title: 'Hakkımda | Prof. Dr. Nurullah Ermiş',
    description: 'Özgeçmiş, uzmanlık alanları ve akademik çalışmalar.',
    url: 'https://www.nurullahermis.com/hakkimda',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'profile',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function HakkimdaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
