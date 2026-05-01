// src/app/api/public/sunumlar/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export async function GET() {
  try {
    const items = await prisma.presentation.findMany({
      orderBy: { year: 'desc' },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
