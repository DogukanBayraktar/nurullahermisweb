// src/app/api/public/sunumlar/route.ts
import { NextResponse } from 'next/server';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const revalidate = 86400;

const getPresentations = unstable_cache(
  async () => {
    return await prisma.presentation.findMany({
      orderBy: { year: 'desc' },
    });
  },
  ['presentations-public'],
  { revalidate: 86400 }
);

export async function GET() {
  try {
    if (!hasDatabaseUrl) {
      return NextResponse.json([]);
    }

    const items = await getPresentations();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
