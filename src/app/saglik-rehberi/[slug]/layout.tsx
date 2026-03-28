import type { Metadata } from 'next';
import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';

const BASE_URL = 'https://www.nurullahermis.com';

const articleSlugMapEN: Record<string, string> = {
  'bel-fitigi-ameliyati': 'lumbar-disc-surgery',
  'skolyoz-belirtileri-tedavisi': 'scoliosis-symptoms-treatment',
  'diz-protezi-ameliyati': 'knee-replacement-surgery',
  'boyun-fitiginiz-mi-var': 'do-you-have-a-cervical-disc-herniation',
  'cocuklarda-kalca-cikigini-nasil-anlariz': 'how-can-we-recognize-hip-dislocation-in-children',
  'acl-cop-bag-ameliyati': 'acl-surgery',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const articles = getDefaultLocalArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return { title: 'Makale | Prof. Dr. Nurullah Ermiş' };

  const enSlug = articleSlugMapEN[slug] ?? slug;

  return {
    title: `${article.title} | Prof. Dr. Nurullah Ermiş`,
    description: article.desc?.slice(0, 160) ?? '',
    keywords: [article.title, article.category, 'ortopedi bilgi', 'Nurullah Ermiş'],
    alternates: {
      canonical: `${BASE_URL}/saglik-rehberi/${slug}`,
      languages: { 'tr-TR': `${BASE_URL}/saglik-rehberi/${slug}`, 'en-US': `${BASE_URL}/health-guide/${enSlug}` },
    },
    openGraph: {
      title: `${article.title} | Prof. Dr. Nurullah Ermiş`,
      description: article.desc?.slice(0, 160) ?? '',
      url: `${BASE_URL}/saglik-rehberi/${slug}`,
      siteName: 'Prof. Dr. Nurullah Ermiş',
      locale: 'tr_TR',
      type: 'article',
      images: [{ url: article.img?.startsWith('http') ? article.img : `${BASE_URL}${article.img ?? '/og-image.jpg'}`, width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default function SaglikRehberiDetayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
