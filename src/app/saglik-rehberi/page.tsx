import { getAllArticles } from '@/sanity/queries';
import { articles as localArticles } from '@/lib/articles';
import BlogList from '@/components/blog/BlogList';
import { FadeIn } from '@/components/ui/fade-in';

export const revalidate = 60;

type SanityArticle = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  readTime: number | string;
  publishedAt: string;
  coverImage?: string;
};

export default async function HealthGuidePage() {
  const sanityArticles = (await getAllArticles()) as SanityArticle[];
  const combined: SanityArticle[] = [...sanityArticles];

  localArticles.forEach((local) => {
    const exists = sanityArticles.find((article) => article.slug === local.slug);
    if (!exists) {
      combined.push({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc,
        readTime: parseInt(local.readTime, 10),
        publishedAt: new Date().toISOString(),
        coverImage: local.img,
      });
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">Sağlık Rehberi</p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Tedavi ve Sağlık Rehberi</h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. M. Nurullah Ermiş&apos;in hazırladığı
              bilgilendirici içerikleri inceleyin.
            </p>
          </div>
        </FadeIn>

        <BlogList initialArticles={combined} />
      </div>
    </div>
  );
}
