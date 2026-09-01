import type { Metadata } from 'next';
import { getDefaultLocalArticles } from '@/lib/healthGuideTranslations';

const BASE_URL = 'https://www.nurullahermis.com';

import articleSlugMapEN from '@/lib/articleSlugMap.json';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let article: { title: string; desc?: string; category: string; img?: string } | undefined;
  
  try {
    const { hasDatabaseUrl, prisma } = await import('@/lib/prisma');
    if (hasDatabaseUrl) {
      const dbArticle = await prisma.healthArticle.findFirst({
        where: { OR: [{ slug: `${slug}_tr` }, { slug }] }
      });
      if (dbArticle) {
        article = {
          title: dbArticle.title,
          desc: dbArticle.desc,
          category: dbArticle.category,
          img: dbArticle.img,
        };
      }
    }
  } catch (e) {
    console.error('Error fetching layout metadata from DB', e);
  }

  if (!article) {
    const articles = getDefaultLocalArticles();
    article = articles.find((a) => a.slug === slug);
  }

  if (!article) return { title: 'Makale | Prof. Dr. Nurullah Ermiş' };

  const enSlug = (articleSlugMapEN as Record<string, string>)[slug] ?? slug;

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