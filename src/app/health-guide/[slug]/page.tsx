import Page from '../../saglik-rehberi/[slug]/page';
import { canonicalArticleSlug } from '@/lib/routes';

export const revalidate = 60;

export default async function EnglishHealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return Page({ params: Promise.resolve({ slug: canonicalArticleSlug(resolved.slug) }) });
}
