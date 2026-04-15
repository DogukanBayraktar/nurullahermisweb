import { TREATMENTS_DATA, getLocalizedTreatmentCard } from '@/lib/treatments';

export interface GalleryCategory {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  images: string[];
}

export const GALLERY_CATEGORIES: GalleryCategory[] = TREATMENTS_DATA.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  coverImage: item.img,
  images: [...new Set([...(item.images ?? []), item.img].filter(Boolean))],
}));

export function getLocalizedGalleryCategories(language?: string): GalleryCategory[] {
  return GALLERY_CATEGORIES.map((item) => {
    const localized = getLocalizedTreatmentCard(
      {
        slug: item.slug,
        title: item.title,
        category: item.category,
      },
      language
    );

    return {
      ...item,
      title: localized.title,
      category: localized.category ?? item.category,
    };
  });
}
