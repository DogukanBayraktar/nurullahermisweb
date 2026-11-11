import GaleriPageClient from '@/components/galeri/GaleriPageClient';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { galleryCategorySlug, isGalleryVideoUrl, type GalleryCategoryGroup } from '@/lib/gallery';
import { getTreatmentLanguage, stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';

export const revalidate = 86400;

const getGalleryItems = unstable_cache(
  async () => {
    return await prisma.galleryItem.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
  },
  ['gallery-items-tr'],
  { revalidate: 86400, tags: ['gallery-items-tr'] }
);

/**
 * "Tedaviyi görüntüle" butonunun 404 vermemesi için, galeri kategorisinin
 * gerçekten yayında olan bir TR tedavisi karşılığı olup olmadığını bilmemiz
 * gerekiyor (ör. Hallux Valgus galeride var ama tedavi kaydı yok).
 * `treatments-list` tag'i sayesinde admin'den tedavi eklenince burası da tazelenir.
 */
const getPublishedTreatmentRows = unstable_cache(
  async () => {
    return await prisma.treatment.findMany({
      where: { published: true },
      select: { slug: true, lang: true },
    });
  },
  ['gallery-treatment-slugs'],
  { revalidate: 86400, tags: ['treatments-list'] }
);

export default async function GaleriPage() {
  const [items, treatmentRows] = await Promise.all([
    getGalleryItems(),
    getPublishedTreatmentRows(),
  ]);

  const trTreatmentSlugs = new Set(
    treatmentRows
      .filter((row) => getTreatmentLanguage(row) === 'tr')
      .map((row) => stripSlugSuffix(row.slug))
  );

  // Group by category to maintain the "topic-based" structure
  const categoriesMap: Record<string, GalleryCategoryGroup> = {};

  items.forEach(item => {
    const slug = galleryCategorySlug(item.category_tr);
    if (!slug) return;

    if (!categoriesMap[slug]) {
      categoriesMap[slug] = {
        slug: slug,
        title_tr: item.category_tr,
        title_en: item.category_en,
        category_tr: item.category_tr,
        category_en: item.category_en,
        images: [],
        treatment_slug: trTreatmentSlugs.has(slug) ? slug : null,
      };
    }
    // Video dosyaları `next/image` ile sunulamaz (optimizer 400 döner);
    // bu yüzden türü uzantıdan belirliyoruz.
    categoriesMap[slug].images.push({
      url: item.img,
      type: isGalleryVideoUrl(item.img) ? 'video' : 'image',
    });
  });

  const categories: GalleryCategoryGroup[] = Object.values(categoriesMap);

  return <GaleriPageClient initialCategories={categories} />;
}
