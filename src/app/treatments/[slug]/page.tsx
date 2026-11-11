import Page, { getAllTreatmentSlugs } from '../../tedaviler/[slug]/page';
import { canonicalTreatmentSlug, localizeTreatmentSlug, loadTreatmentSlugMapFromDb } from '@/lib/routes';
import { stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';

// src/app/tedaviler/[slug]/page.tsx içindeki açıklamayla aynı sebepten 3600 yapıldı.
export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    await loadTreatmentSlugMapFromDb();
    const slugs = await getAllTreatmentSlugs();
    const canonicalSlugs = new Set(
      Array.from(slugs).map((slug) => stripSlugSuffix(slug))
    );
    return Array.from(canonicalSlugs).map((slug) => ({
      slug: localizeTreatmentSlug(slug, 'en'),
    }));
  } catch {
    return [];
  }
}

export default async function EnglishTreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return Page({
    params: Promise.resolve({
      slug: canonicalTreatmentSlug(resolved.slug),
      originalSlug: resolved.slug,
    }),
    language: 'en',
  });
}
