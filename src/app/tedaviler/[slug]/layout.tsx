import type { Metadata } from 'next';
import { TREATMENTS_DATA } from '@/lib/treatments';

const BASE_URL = 'https://www.nurullahermis.com';

const treatmentSlugMapEN: Record<string, string> = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS_DATA.find((t) => t.slug === slug);

  if (!treatment) return { title: 'Tedavi | Prof. Dr. Nurullah Ermiş' };

  const enSlug = treatmentSlugMapEN[slug] ?? slug;
  const descText = Array.isArray(treatment.desc)
    ? String(treatment.desc[0]).replace(/\n/g, ' ').slice(0, 160)
    : String(treatment.desc).slice(0, 160);

  return {
    title: `${treatment.title} | Prof. Dr. Nurullah Ermiş`,
    description: descText,
    keywords: [treatment.title, treatment.category, 'ortopedi istanbul', 'Nurullah Ermiş'],
    alternates: {
      canonical: `${BASE_URL}/tedaviler/${slug}`,
      languages: { 'tr-TR': `${BASE_URL}/tedaviler/${slug}`, 'en-US': `${BASE_URL}/treatments/${enSlug}` },
    },
    openGraph: {
      title: `${treatment.title} | Prof. Dr. Nurullah Ermiş`,
      description: descText,
      url: `${BASE_URL}/tedaviler/${slug}`,
      siteName: 'Prof. Dr. Nurullah Ermiş',
      locale: 'tr_TR',
      type: 'article',
      images: [{ url: treatment.img?.startsWith('http') ? treatment.img : `${BASE_URL}${treatment.img ?? '/og-image.jpg'}`, width: 1200, height: 630, alt: treatment.title }],
    },
  };
}

export default function TedaviDetayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
