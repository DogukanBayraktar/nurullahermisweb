import AdminShell from '@/components/admin/AdminShell';
import ContactForm from '@/components/admin/ContactForm';

export default function AdminContactPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl px-4 py-6 md:p-8 space-y-12 pb-12">
        <section>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">İletişim Yönetimi</h1>
            <p className="mt-1 text-sm text-slate-500">
              Sitenin iletişim sayfasındaki tüm metinleri, hastane lokasyonlarını ve harita bilgilerini buradan düzenleyebilirsiniz.
            </p>
          </div>

          <ContactForm />
        </section>
      </div>
    </AdminShell>
  );
}
