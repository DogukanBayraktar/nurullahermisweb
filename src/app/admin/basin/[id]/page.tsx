// src/app/admin/basin/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import PressForm from '@/components/admin/PressForm';

export default async function EditPressPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!idStr || Number.isNaN(id)) notFound();

  const item = await prisma.pressItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <AdminShell>
      <div className="p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Haber Düzenle</h1>
        </div>
        <PressForm defaultValues={{ ...item }} />
      </div>
    </AdminShell>
  );
}
