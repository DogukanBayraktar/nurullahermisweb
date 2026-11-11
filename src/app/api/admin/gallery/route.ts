import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({ 
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ] 
    });
    return NextResponse.json(items);
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
    const item = await prisma.galleryItem.create({ data: body });
    revalidatePath('/galeri');
    revalidatePath('/gallery');
    // `unstable_cache` veri cache'i revalidatePath ile temizlenmez;
    // yeni kayıt 24 saate kadar eski haliyle görünmesin diye tag'leri de at.
    revalidateTag('gallery-items-tr', { expire: 0 });
    revalidateTag('gallery-items-en', { expire: 0 });
    return NextResponse.json(item, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
