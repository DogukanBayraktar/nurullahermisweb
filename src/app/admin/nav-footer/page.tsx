export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import NavFooterForm from '@/components/admin/NavFooterForm';
import { getStaticContent } from '@/lib/content';

export default async function NavFooterAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const content = await getStaticContent('nav-footer.json');

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl px-4 py-6 md:p-8 space-y-12 pb-12">
        <section>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Menü ve İletişim Yönetimi</h1>
            <p className="mt-1 text-sm text-slate-500">Sitenin üst menüsü (Navbar), alt menüsü (Footer) ve iletişim bilgilerini buradan düzenleyebilirsiniz.</p>
          </div>

          {content ? (
            <NavFooterForm initialData={content} />
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500">nav-footer.json dosyası bulunamadı.</p>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
