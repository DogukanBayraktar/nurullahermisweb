// src/app/api/admin/tedaviler/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { syncTreatmentPairSlugMap } from '@/lib/updateTreatmentSlugMap';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

type IdContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const item = await prisma.treatment.findUnique({ where: { id: Number(id) } });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const item = await prisma.treatment.update({ where: { id: Number(id) }, data: body });

    // Slug eşleşmesini ve DB haritasını güncelle
    const pair = await syncTreatmentPairSlugMap(item);

    const ownCanonical = item.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const trSlug = item.lang === 'tr' ? ownCanonical : pair?.slug.replace(/_tr$/, '');
    const enSlug = item.lang === 'en' ? ownCanonical : pair?.slug.replace(/_en$/, '');

    // ÖNEMLİ: Önceden burada hiç revalidate çağrısı yoktu — bir tedavi
    // güncellendiğinde detay sayfası unstable_cache'in 24 saatlik
    // revalidate süresi dolana kadar eski içeriği göstermeye devam
    // ediyordu. Şimdi hem data cache (tag) hem route cache (path)
    // temizleniyor.
    revalidateTag('treatment-detail', { expire: 0 });
    revalidateTag('treatment-slug-allowlist', { expire: 0 });
    
    if (trSlug) revalidatePath(`/tedaviler/${trSlug}`);
    revalidatePath('/tedaviler');
    if (enSlug) revalidatePath(`/treatments/${enSlug}`);
    revalidatePath('/treatments');

    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.treatment.delete({ where: { id: Number(id) } });

    revalidateTag('treatment-detail', { expire: 0 });
    revalidateTag('treatment-slug-allowlist', { expire: 0 });
    revalidatePath('/tedaviler');
    revalidatePath('/treatments');

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
