import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri | Prof. Dr. Nurullah Ermiş',
  description: 'Tedavi başlıklarına göre düzenlenmiş ameliyat ve klinik sonuç galerisi.',
  keywords: ['galeri', 'tedavi sonuçları', 'skolyoz ameliyatı', 'diz protezi', 'ortopedi galeri'],
  alternates: {
    canonical: 'https://www.nurullahermis.com/galeri',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/galeri', 'en-US': 'https://www.nurullahermis.com/gallery' },
  },
  openGraph: {
    title: 'Galeri | Prof. Dr. Nurullah Ermiş',
    description: 'Tedavi alanlarına göre düzenlenmiş vaka ve sonuç galerisi.',
    url: 'https://www.nurullahermis.com/galeri',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
