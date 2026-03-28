import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kongre Sunumları | Prof. Dr. Nurullah Ermiş',
  description: 'Prof. Dr. Nurullah Ermiş\'in ulusal ve uluslararası ortopedi kongrelerindeki sunumları.',
  alternates: {
    canonical: 'https://www.nurullahermis.com/sunumlar',
  },
  openGraph: {
    title: 'Kongre Sunumları | Prof. Dr. Nurullah Ermiş',
    description: 'Ulusal ve uluslararası kongre sunumları.',
    url: 'https://www.nurullahermis.com/sunumlar',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function SunumlarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
