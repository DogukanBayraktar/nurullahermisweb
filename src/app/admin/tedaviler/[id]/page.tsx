// src/app/admin/tedaviler/[id]/page.tsx
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/admin/AdminShell';
import TreatmentForm from '@/components/admin/TreatmentForm';
import { findTreatmentPair, getTreatmentLanguage } from '@/lib/updateTreatmentSlugMap';
import { loadTreatmentSlugMapFromDb } from '@/lib/routes';

export default async function EditTreatmentPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!idStr || Number.isNaN(id)) notFound();

  const t = await prisma.treatment.findUnique({ where: { id } });
  if (!t) notFound();

  // Slug haritasını yükle ve karşı dil kaydını merkezi fonksiyonla bul
  await loadTreatmentSlugMapFromDb().catch(() => {});
  const pair = await findTreatmentPair(t).catch(() => null);

  const tLang = getTreatmentLanguage(t);
  const isEn = tLang === 'en';

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
            // Kapak görseli: bu kayıtta yoksa karşı dildeki eşten al
            img: t.img || pair?.img || '',
            // Galeri görselleri: bu kayıtta yoksa karşı dildeki eşten al
            images: (t.images && (t.images as string[]).length > 0) ? t.images as string[] : (pair?.images as string[] ?? []),
            category: t.category,
            stats: t.stats as { label: string; val: string }[],
            desc: t.desc as string[],
            symptoms: t.symptoms,
            treatment: t.treatment as any,
            faq: t.faq as { s: string; c: string }[],
            published: t.published,
            lang: isEn ? 'en' : 'tr',
            // Karşı dil
            pairId: pair?.id,
            pairSlug: pair?.slug,
            pairTitle: pair?.title ?? '',
            pairCategory: pair?.category ?? '',
            pairDesc: (pair?.desc as string[]) ?? [],
            pairSymptoms: pair?.symptoms ?? [],
            pairStats: (pair?.stats as { label: string; val: string }[]) ?? [],
            pairTreatment: (pair?.treatment as any) ?? [],
            pairFaq: (pair?.faq as { s: string; c: string }[]) ?? [],
            pairImages: (pair?.images as string[] ?? []),
          }}
        />
      </div>
    </AdminShell>
  );
}
