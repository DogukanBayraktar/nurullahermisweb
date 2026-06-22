import GaleriPageClient from '@/components/galeri/GaleriPageClient';
import { prisma } from '@/lib/prisma';

export const revalidate = 86400; 

export default async function GaleriPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  // Group by category to maintain the "topic-based" structure
  const categoriesMap: Record<string, any> = {};

  items.forEach(item => {
    const slug = item.category_tr.toLowerCase()
      .replace(/&/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    if (!categoriesMap[slug]) {
      categoriesMap[slug] = {
        slug: slug,
        title_tr: item.category_tr,
        title_en: item.category_en,
        category_tr: item.category_tr,
        category_en: item.category_en,
        images: []
      };
    }
    categoriesMap[slug].images.push(item.img);
  });

  const categories = Object.values(categoriesMap);

  return <GaleriPageClient initialCategories={categories as any} />;
}
