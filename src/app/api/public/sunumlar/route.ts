// src/app/api/public/sunumlar/route.ts
import { NextResponse } from 'next/server';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';

export const revalidate = 86400;

export async function GET() {
  try {
    if (!hasDatabaseUrl) {
      return NextResponse.json([]);
    }

    const items = await prisma.presentation.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
