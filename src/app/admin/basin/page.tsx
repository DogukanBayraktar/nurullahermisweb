// src/app/admin/basin/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function BasinAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const items = await prisma.pressItem.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Basın & Medya</h1>
            <p className="text-slate-500 mt-1 text-sm">{items.length} haber / röportaj</p>
          </div>
          <Link
            href="/admin/basin/yeni"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Haber
          </Link>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Henüz haber yok.{' '}
              <Link href="/admin/basin/yeni" className="text-blue-600 hover:underline">Ekle →</Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Başlık</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kaynak</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Format</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dil</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.date}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{item.outlet}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">{item.format}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">{item.lang}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/basin/${item.id}`} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteButton id={item.id} endpoint="/api/admin/basin" />
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
