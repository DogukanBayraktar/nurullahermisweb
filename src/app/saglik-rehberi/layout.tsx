import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sağlık Rehberi | Prof. Dr. Nurullah Ermiş',
  description: 'Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. Nurullah Ermiş tarafından hazırlanan bilgilendirici makaleler.',
  keywords: ['omurga sağlığı', 'ortopedi makaleleri', 'skolyoz belirtileri', 'bel fıtığı bilgi'],
  alternates: {
    canonical: 'https://www.nurullahermis.com/saglik-rehberi',
    languages: { 'tr-TR': 'https://www.nurullahermis.com/saglik-rehberi', 'en-US': 'https://www.nurullahermis.com/health-guide' },
  },
  openGraph: {
    title: 'Sağlık Rehberi | Prof. Dr. Nurullah Ermiş',
    description: 'Omurga sağlığı ve ortopedi hakkında bilgilendirici makaleler.',
    url: 'https://www.nurullahermis.com/saglik-rehberi',
    siteName: 'Prof. Dr. Nurullah Ermiş',
    locale: 'tr_TR',
    type: 'website',
    images: [{ url: 'https://www.nurullahermis.com/og-image.jpg', width: 1200, height: 630, alt: 'Prof. Dr. Nurullah Ermiş' }],
  },
};

export default function SaglikRehberiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
