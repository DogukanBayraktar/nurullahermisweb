// src/app/api/public/basin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const revalidate = 86400;

const getPressItems = unstable_cache(
  async (lang: string) => {
    return await prisma.pressItem.findMany({
      where: { lang, published: true },
      orderBy: { createdAt: 'desc' },
    });
  },
  ['press-items-public'],
  { revalidate: 86400 }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';
    const items = await getPressItems(lang);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 }); // fallback empty
  }
}
