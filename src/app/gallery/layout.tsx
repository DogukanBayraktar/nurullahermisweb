import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Prof. Dr. Nurullah Ermiş',
  description: 'A treatment gallery organized by specialty headings and visual case outcomes.',
  alternates: {
    canonical: 'https://www.nurullahermis.com/gallery',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/galeri', 'en-US': 'https://www.nurullahermis.com/gallery' },
  },
  openGraph: {
    title: 'Gallery | Prof. Dr. Nurullah Ermiş',
    description: 'A specialty-based gallery of clinical and surgical visual outcomes.',
    url: 'https://www.nurullahermis.com/gallery',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'en_US',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
