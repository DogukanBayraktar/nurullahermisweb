// src/app/admin/saglik-rehberi/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

export default async function SaglikRehberiAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const articles = await prisma.healthArticle.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sağlık Rehberi</h1>
            <p className="text-slate-500 mt-1 text-sm">{articles.length} makale</p>
          </div>
          <Link
            href="/admin/saglik-rehberi/yeni"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Makale
          </Link>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          {articles.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-sm">Henüz makale yok.</p>
              <Link href="/admin/saglik-rehberi/yeni" className="mt-3 inline-block text-blue-600 text-sm hover:underline">
                İlk makaleyi ekle →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Başlık</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dil</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Durum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 line-clamp-1">{article.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{article.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{article.category}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 uppercase">
                        {article.lang}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {article.published ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <Eye className="w-3 h-3" /> Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" /> Taslak
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/saglik-rehberi/${article.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

// Client-side delete button (inline for simplicity)
import DeleteArticleButton from '@/components/admin/DeleteButton';

function DeleteButton({ id }: { id: number }) {
  return <DeleteArticleButton id={id} endpoint="/api/admin/saglik-rehberi" />;
}
