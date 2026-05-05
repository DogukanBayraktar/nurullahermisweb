import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import AdminNotice from '@/components/admin/AdminNotice';

export default async function AnasayfaAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Ana Sayfa</h1>
          <p className="mt-1 text-sm text-slate-500">Hero metni, istatistikler ve video alanları.</p>
        </div>

        <AdminNotice
          title="Faz 2 için hazır bekliyor"
          message="Bu bölüm statik içerik yönetimine geçince content/homepage.json üzerinden düzenlenebilir hale getirilecek."
        />
      </div>
    </AdminShell>
  );
}
