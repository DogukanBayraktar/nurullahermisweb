// src/app/admin/tedaviler/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function TedavilerAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const treatments = await prisma.treatment.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tedaviler</h1>
            <p className="text-slate-500 mt-1 text-sm">{treatments.length} tedavi sayfası</p>
          </div>
          <Link
            href="/admin/tedaviler/yeni"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Tedavi
          </Link>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          {treatments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Henüz tedavi yok.{' '}
              <Link href="/admin/tedaviler/yeni" className="text-blue-600 hover:underline">Ekle →</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Başlık</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Durum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((t) => (
                  <tr key={t.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{t.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{t.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{t.category}</td>
                    <td className="px-4 py-4">
                      {t.published ? (
                        <span className="inline-flex text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Yayında</span>
                      ) : (
                        <span className="inline-flex text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Taslak</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/tedaviler/${t.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={t.id} endpoint="/api/admin/tedaviler" />
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
