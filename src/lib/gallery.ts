import { TREATMENTS_DATA, getLocalizedTreatmentCard } from '@/lib/treatments';

export interface GalleryCategory {
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  images: string[];
}

/** Galeri ızgarasında gösterilen tek bir medya kaydı (görsel veya video). */
export type GalleryMedia = {
  url: string;
  type: 'image' | 'video';
};

/** Sunucuda kategoriye göre gruplanmış galeri verisi. */
export interface GalleryCategoryGroup {
  slug: string;
  title_tr: string;
  title_en: string | null;
  category_tr: string;
  category_en: string | null;
  images: GalleryMedia[];
  /**
   * Bu kategoriye karşılık gelen TR tedavisinin kanonik slug'ı.
   * Eşleşen tedavi yoksa (ör. Hallux Valgus) `null` olur ve
   * "Tedaviyi görüntüle" butonu gösterilmez.
   */
  treatment_slug: string | null;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = TREATMENTS_DATA.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  coverImage: item.img,
    images: [...new Set((item.images ?? []).filter(Boolean))],
}));

/**
 * Türkçe karakterleri ASCII karşılıklarına çevirir.
 * `Çocuk Ortopedisi` gibi kategori adları `çocuk-ortopedisi` olarak
 * slug'lanırsa slug haritasındaki (`cocuk-ortopedisi`) kayıtla eşleşmez ve
 * "Tedaviyi görüntüle" linkleri 404 döner.
 */
const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ı: 'i',
  İ: 'i',
  ö: 'o',
  Ö: 'o',
  ş: 's',
  Ş: 's',
  ü: 'u',
  Ü: 'u',
  â: 'a',
  Â: 'a',
  î: 'i',
  Î: 'i',
  û: 'u',
  Û: 'u',
};

export function galleryCategorySlug(value: string | null | undefined): string {
  const source = String(value ?? '');
  if (!source) return '';

  return source
    .replace(/[çÇğĞıİöÖşŞüÜâÂîÎûÛ]/g, (char) => TURKISH_CHAR_MAP[char] ?? char)
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const VIDEO_URL_RE = /\.(mp4|webm|mov|m4v|ogv)(?:$|[?#])/i;

/**
 * Galeri kaydının video mu yoksa görsel mi olduğunu uzantıdan anlar.
 * Video dosyaları `next/image` üzerinden sunulamaz (optimizer 400 döner),
 * bu yüzden bu ayrım kritik.
 */
export function isGalleryVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return VIDEO_URL_RE.test(url);
}

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
