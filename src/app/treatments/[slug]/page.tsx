import Page from '../../tedaviler/[slug]/page';
import { canonicalTreatmentSlug } from '@/lib/routes';

export const revalidate = 86400;

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
