import { renderHealthGuideDetailPage, getAllArticleSlugs } from '../../saglik-rehberi/[slug]/page';
import { loadArticleSlugMapFromDb, localizeArticleSlug } from '@/lib/routes';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    const canonicalSlugs = new Set(
      Array.from(slugs).map((slug) => slug.replace(/_tr$/, '').replace(/_en$/, ''))
    );
    // EN slug map'i (bel-fitigi-ameliyati -> lumbar-disc-surgery gibi)
    // DB'den önden yüklenmezse localizeArticleSlug fallback olarak
    // canonical (TR) slug'ı döner; bu da yine geçerli, sadece SEO-dostu
    // EN slug yerine TR slug ile static path üretilmiş olur.
    await loadArticleSlugMapFromDb();
    return Array.from(canonicalSlugs).map((slug) => ({
      slug: localizeArticleSlug(slug, 'en'),
    }));
  } catch {
    return [];
  }
}

export default async function EnglishHealthGuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return renderHealthGuideDetailPage({
    params: Promise.resolve({ slug: resolved.slug }),
    forceLang: 'en',
  });
}
