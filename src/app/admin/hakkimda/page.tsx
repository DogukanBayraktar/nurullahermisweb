import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import AboutForm from '@/components/admin/AboutForm';
import { getStaticContent } from '@/lib/content';

export default async function HakkimdaAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const content = await getStaticContent('about.json');

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl px-4 py-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Hakkımda Yönetimi</h1>
          <p className="mt-1 text-sm text-slate-500">Biyografi, eğitim ve deneyim bilgilerini buradan güncelleyebilirsiniz.</p>
        </div>

        {content ? (
          <AboutForm initialData={content} />
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500">about.json dosyası bulunamadı.</p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
