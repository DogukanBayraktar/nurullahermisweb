// src/app/admin/saglik-rehberi/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import ArticleForm from '@/components/admin/ArticleForm';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const article = await prisma.healthArticle.findUnique({ where: { id: Number(params.id) } });
  if (!article) notFound();

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
            slug: article.slug,
            title: article.title,
            img: article.img,
            date: article.date,
            readTime: article.readTime,
            category: article.category,
            desc: article.desc,
            intro: article.intro,
            sections: article.sections as { h2: string; content: string }[],
            tags: article.tags,
            lang: article.lang,
            published: article.published,
          }}
        />
      </div>
    </AdminShell>
  );
}
