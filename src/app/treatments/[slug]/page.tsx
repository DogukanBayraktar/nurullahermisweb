import Page, { getAllTreatmentSlugs } from '../../tedaviler/[slug]/page';
import { canonicalTreatmentSlug, localizeTreatmentSlug } from '@/lib/routes';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllTreatmentSlugs();
    const canonicalSlugs = new Set(
      Array.from(slugs).map((slug) => slug.replace(/_tr$/, '').replace(/_en$/, ''))
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
