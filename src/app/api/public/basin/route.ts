// src/app/api/public/basin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';
    const items = await prisma.pressItem.findMany({
      where: { lang, published: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 }); // fallback empty
  }
}
