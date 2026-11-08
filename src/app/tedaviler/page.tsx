// src/app/tedaviler/page.tsx
import { TREATMENTS_DATA, TREATMENTS_TRANSLATIONS } from '@/lib/treatments';
import TedavilerPageClient from '@/components/tedaviler/TedavilerPageClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { getTreatmentLanguage, stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';

export const revalidate = 86400;

const getPublishedTreatments = unstable_cache(
  async () => {
    return await prisma.treatment.findMany({
      where: { published: true },
      orderBy: { createdAt: 'asc' },
    });
  },
  ['treatments-published'],
  { revalidate: 86400 }
);

export default async function TedavilerPage({ language = 'tr' }: { language?: 'tr' | 'en' }) {
  let combinedTreatments: {
    _id: string;
    title: string;
    slug: string;
    category: string;
    coverImage: string;
    description: string[] | undefined;
  }[] = [];

  try {
    const dbRows = hasDatabaseUrl ? await getPublishedTreatments() : [];

    // Merkezi dil tespit fonksiyonu ile doğru dili filtrele
    const filteredRows = dbRows.filter((t) => getTreatmentLanguage(t) === language);

    if (filteredRows.length > 0) {
      combinedTreatments = filteredRows.map((t) => ({
        _id: `db-${t.id}`,
        title: t.title,
        slug: t.slug,
        category: t.category,
        coverImage: t.img,
        description: Array.isArray(t.desc) ? (t.desc as string[]) : undefined,
      }));
    }
  } catch {
    // DB hazır değil — fallback
  }

  // Fallback (DB boşsa veya erişilemezse)
  if (combinedTreatments.length === 0) {
    if (language === 'en') {
      const enMap = TREATMENTS_TRANSLATIONS.en;
      combinedTreatments = TREATMENTS_DATA.map((local) => {
        const clean = stripSlugSuffix(local.slug);
        const trans = enMap[clean] || enMap[local.slug];
        return {
          _id: `local-${local.slug}-en`,
          title: trans?.title || local.title,
          slug: `${clean}_en`,
          category: trans?.category || local.category,
          coverImage: local.img,
          description: trans?.desc || local.desc,
        };
      });
    } else {
      combinedTreatments = TREATMENTS_DATA.map((local) => ({
        _id: `local-${local.slug}`,
        title: local.title,
        slug: local.slug,
        category: local.category,
        coverImage: local.img,
        description: local.desc,
      }));
    }
  }

  return <TedavilerPageClient initialTreatments={combinedTreatments} />;
}
