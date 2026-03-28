import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Basında Biz | Prof. Dr. Nurullah Ermiş',
  description: 'Prof. Dr. Nurullah Ermiş hakkında medya haberleri, röportajlar ve basın bültenleri.',
  alternates: {
    canonical: 'https://www.nurullahermis.com/basinda-biz',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/basinda-biz', 'en-US': 'https://www.nurullahermis.com/in-the-media' },
  },
  openGraph: {
    title: 'Basında Biz | Prof. Dr. Nurullah Ermiş',
    description: 'Medya haberleri ve röportajlar.',
    url: 'https://www.nurullahermis.com/basinda-biz',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function BasindaBizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
