// src/app/api/admin/tedaviler/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

export async function GET() {
  try {
    await requireAdmin();
    const treatments = await prisma.treatment.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(treatments);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const treatment = await prisma.treatment.create({ data: body });

    // Yeni tedavi eklenince allow-list ve ilgili liste sayfalarının cache'i
    // temizlenmeli, aksi halde yeni slug 24 saat boyunca 404 dönebilir.
    revalidateTag('treatment-slug-allowlist');
    revalidatePath('/tedaviler');
    revalidatePath('/treatments');

    return NextResponse.json(treatment, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
