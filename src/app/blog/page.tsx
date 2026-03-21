import { getAllArticles } from '@/sanity/queries';
import { articles as localArticles } from '@/lib/articles';
import BlogList from '@/components/blog/BlogList';
import { FadeIn } from "@/components/ui/fade-in";

export const revalidate = 60;

export default async function BlogPage() {
  const sanityArticles = await getAllArticles();
  
  // Merge: Sanity prioritized, Local as fallback/base
  const combined = [...sanityArticles];
  
  localArticles.forEach(local => {
    const exists = sanityArticles.find((s: any) => s.slug === local.slug);
    if (!exists) {
      combined.push({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc,
        readTime: parseInt(local.readTime),
        publishedAt: new Date().toISOString(), // Default
        coverImage: local.img,
      } as any);
    }
  });

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Sağlık Rehberi</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Makaleler ve Güncel Bilgiler</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. M. Nurullah Ermiş'in kaleme aldığı kapsamlı bilgilendirme yazıları.
            </p>
          </div>
        </FadeIn>

        <BlogList initialArticles={combined} />

      </div>
    </div>
  );
}