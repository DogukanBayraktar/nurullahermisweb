// src/app/admin/saglik-rehberi/yeni/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import ArticleForm from '@/components/admin/ArticleForm';

export default async function YeniMakalePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Yeni Makale</h1>
          <p className="text-slate-500 mt-1 text-sm">Sağlık rehberine yeni makale ekle</p>
        </div>
        <ArticleForm />
      </div>
    </AdminShell>
  );
}
