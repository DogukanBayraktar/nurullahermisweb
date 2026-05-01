// src/app/admin/tedaviler/yeni/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import TreatmentForm from '@/components/admin/TreatmentForm';

export default async function YeniTedaviPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Yeni Tedavi</h1>
          <p className="text-slate-500 mt-1 text-sm">Yeni tedavi sayfası oluştur</p>
        </div>
        <TreatmentForm />
      </div>
    </AdminShell>
  );
}
