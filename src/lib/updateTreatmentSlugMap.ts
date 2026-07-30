import { prisma } from './prisma';

type TreatmentLite = {
  id: number;
  slug: string;
  lang: string;
  img: string | null;
};

/**
 * Bir tedavinin karşı dildeki (TR<->EN) eşini bulur.
 * Eşleştirme için önce slug son ekini temizleyip kontrol ederiz,
 * bulamazsak aynı kapak görseline (img) sahip karşı dildeki kaydı ararız.
 */
export async function findTreatmentPair(treatment: TreatmentLite) {
  const canonicalSlug = treatment.slug.replace(/_tr$/, '').replace(/_en$/, '');
  const pairLang = treatment.lang === 'tr' ? 'en' : 'tr';

  return prisma.treatment.findFirst({
    where: {
      lang: pairLang,
      NOT: { id: treatment.id },
      OR: [
        { slug: pairLang === 'en' ? `${canonicalSlug}_en` : canonicalSlug },
        ...(treatment.img ? [{ img: treatment.img }] : []),
      ],
    },
  });
}

/**
 * Bir tedavi + karşı dildeki eşini bulup treatmentSlugMap'i (TR->EN) günceller.
 */
export async function syncTreatmentPairSlugMap(treatment: TreatmentLite) {
  const pair = await findTreatmentPair(treatment);
  if (!pair) return null;

  const trTreatment = treatment.lang === 'tr' ? treatment : pair;
  const enTreatment = treatment.lang === 'en' ? treatment : pair;

  const trClean = trTreatment.slug.replace(/_tr$/, '').replace(/_en$/, '');
  const enClean = enTreatment.slug.replace(/_tr$/, '').replace(/_en$/, '');

  await updateTreatmentSlugMapDb(trClean, enClean);
  return pair;
}

/**
 * Tedavi slug eşleşmesini SiteContent tablosunda günceller.
 */
export async function updateTreatmentSlugMapDb(trSlug: string, enSlug: string) {
  if (!trSlug || !enSlug) {
    console.warn('[updateTreatmentSlugMap] Geçersiz slug pair:', { trSlug, enSlug });
    return;
  }

  try {
    const record = await prisma.siteContent.findUnique({
      where: { filename: 'treatmentSlugMap' }
    });

    let map = (record?.content as Record<string, string>) || {};

    if (!map[trSlug] || map[trSlug] !== enSlug) {
      map[trSlug] = enSlug;

      await prisma.siteContent.upsert({
        where: { filename: 'treatmentSlugMap' },
        update: { content: map },
        create: {
          filename: 'treatmentSlugMap',
          content: map
        }
      });

      console.log(`[updateTreatmentSlugMap] DB Güncellendi: ${trSlug} → ${enSlug}`);
    }
  } catch (error) {
    console.error('[updateTreatmentSlugMap] DB güncellemesi başarısız:', error);
  }
}
