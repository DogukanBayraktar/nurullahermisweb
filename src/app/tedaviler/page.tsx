// src/app/tedaviler/page.tsx
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedavilerPageClient from '@/components/tedaviler/TedavilerPageClient';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function TedavilerPage() {
  let combinedTreatments: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    coverImage: string;
    description: unknown;
  }[] = [];

  try {
    const dbRows = await prisma.treatment.findMany({
      where: { published: true },
      orderBy: { createdAt: 'asc' },
    });

    if (dbRows.length > 0) {
      combinedTreatments = dbRows.map((t) => ({
        _id: `db-${t.id}`,
        title: t.title,
        slug: t.slug,
        category: t.category,
        coverImage: t.img,
        description: t.desc,
      }));
    }
  } catch {
    // DB hazır değil — fallback
  }

  // Fallback
  if (combinedTreatments.length === 0) {
    combinedTreatments = TREATMENTS_DATA.map((local) => ({
      _id: `local-${local.slug}`,
      title: local.title,
      slug: local.slug,
      category: local.category,
      coverImage: local.img,
      description: local.desc,
    }));
  }

  return <TedavilerPageClient initialTreatments={combinedTreatments} />;
}
