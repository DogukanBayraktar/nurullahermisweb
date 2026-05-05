// src/app/admin/tedaviler/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import TreatmentForm from '@/components/admin/TreatmentForm';

export default async function EditTreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!idStr || Number.isNaN(id)) notFound();

  const t = await prisma.treatment.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Tedavi Düzenle</h1>
          <p className="text-slate-500 mt-1 text-sm">{t.title}</p>
        </div>
        <TreatmentForm
          defaultValues={{
            id: t.id,
            slug: t.slug,
            title: t.title,
            img: t.img,
            category: t.category,
            stats: t.stats as { label: string; val: string }[],
            symptoms: t.symptoms,
            treatment: t.treatment as { baslik: string; icerik: string }[],
            faq: t.faq as { s: string; c: string }[],
            published: t.published,
          }}
        />
      </div>
    </AdminShell>
  );
}
