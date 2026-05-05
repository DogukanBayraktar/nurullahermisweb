// src/app/admin/saglik-rehberi/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import ArticleForm from '@/components/admin/ArticleForm';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!idStr || Number.isNaN(id)) notFound();

  const article = await prisma.healthArticle.findUnique({ where: { id } });
  if (!article) notFound();

  // Karşı dil kaydını bul
  // slug'dan canonical kısım: bel-fitigi-ameliyati_tr → bel-fitigi-ameliyati
  const canonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
  const pairLang = article.lang === 'tr' ? 'en' : 'tr';

  // Olası pair slug'lar (EN makalede artık İngilizce slug olabilir)
  const pairArticle = await prisma.healthArticle.findFirst({
    where: {
      lang: pairLang,
      OR: [
        { slug: `${canonicalSlug}_${pairLang}` },
        // EN makalelerde slug değişmiş olabilir, img aynıysa bul
        { img: article.img ?? '', lang: pairLang },
      ],
    },
  });

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Makale Düzenle</h1>
          <p className="text-slate-500 mt-1 text-sm">{article.title}</p>
        </div>
        <ArticleForm
          defaultValues={{
            id: article.id,
            slug: article.slug.replace(/_tr$/, '').replace(/_en$/, ''),
            title: article.title,
            img: article.img,
            date: article.date,
            readTime: article.readTime,
            category: article.category,
            desc: article.desc ?? '',
            intro: article.intro ?? '',
            sections: Array.isArray(article.sections)
              ? (article.sections as { h2: string; content: string }[])
              : [],
            tags: article.tags,
            lang: article.lang,
            published: article.published,
            // Karşı dil verisi
            pairId: pairArticle?.id,
            pairSlug: pairArticle?.slug.replace(/_tr$/, '').replace(/_en$/, ''),
            pairTitle: pairArticle?.title ?? '',
            pairDesc: pairArticle?.desc ?? '',
            pairIntro: pairArticle?.intro ?? '',
            pairCategory: pairArticle?.category ?? '',
            pairDate: pairArticle?.date ?? '',
            pairReadTime: pairArticle?.readTime ?? '',
            pairTags: pairArticle?.tags ?? [],
            pairSections: Array.isArray(pairArticle?.sections)
              ? (pairArticle.sections as { h2: string; content: string }[])
              : [],
          }}
        />
      </div>
    </AdminShell>
  );
}