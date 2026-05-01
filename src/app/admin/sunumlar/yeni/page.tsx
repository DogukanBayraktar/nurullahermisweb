// src/app/admin/sunumlar/yeni/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import PresentationForm from '@/components/admin/PresentationForm';

export default async function YeniSunumPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div className="p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Yeni Sunum</h1>
          <p className="text-slate-500 mt-1 text-sm">Kongre veya sunum ekle</p>
        </div>
        <PresentationForm />
      </div>
    </AdminShell>
  );
}
