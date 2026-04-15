import GaleriPageClient from '@/components/galeri/GaleriPageClient';
import { GALLERY_CATEGORIES } from '@/lib/gallery';

export const revalidate = 3600;

export default function GalleryPage() {
  return <GaleriPageClient initialCategories={GALLERY_CATEGORIES} />;
}
