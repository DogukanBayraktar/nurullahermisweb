import { canonicalArticleSlug } from '@/lib/routes';
import { renderHealthGuideDetailPage } from '../../saglik-rehberi/[slug]/page';

export const revalidate = 60;

export default async function EnglishHealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return renderHealthGuideDetailPage({
    params: Promise.resolve({ slug: canonicalArticleSlug(resolved.slug) }),
    forceLang: 'en',
  });
}