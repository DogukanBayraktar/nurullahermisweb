import { prisma } from './prisma';
import { getTreatmentSlugMap, getReverseTreatmentSlugMap } from './routes';

export type TreatmentLite = {
  id: number;
  slug: string;
  lang?: string | null;
  img?: string | null;
};

/**
 * Slug sonundaki '_tr' veya '_en' uzantısını güvenli ve tutarlı biçimde temizler.
 */
export function stripSlugSuffix(slug: string): string {
  if (!slug) return '';
  return slug.replace(/_tr$/, '').replace(/_en$/, '');
}

/**
 * Tedavinin dilini öncelikle veritabanındaki `lang` alanına,
 * geriye dönük uyumluluk için ise slug uzantısına göre belirler.
 */
export function getTreatmentLanguage(t: { lang?: string | null; slug?: string | null }): 'tr' | 'en' {
  if (t.slug?.endsWith('_en')) return 'en';
  if (t.slug?.endsWith('_tr')) return 'tr';
  if (t.lang === 'en') return 'en';
  return 'tr';
}

/**
 * Bir tedavinin karşı dildeki (TR<->EN) eşini bulur.
 * Eşleştirme için:
 * 1. Temiz slug, dil son ekleri ve treatmentSlugMap çeviri karşılıkları ile arama yapılır.
 * 2. Bulunamazsa aynı kapak görseline (img) sahip karşı dildeki kayıt taranır.
 */
export async function findTreatmentPair(treatment: TreatmentLite) {
  const currentLang = getTreatmentLanguage(treatment);
  const targetLang = currentLang === 'tr' ? 'en' : 'tr';
  const baseSlug = stripSlugSuffix(treatment.slug);

  const candidateSlugs = new Set<string>();

  if (targetLang === 'en') {
    candidateSlugs.add(`${baseSlug}_en`);
    candidateSlugs.add(baseSlug);
    const slugMap = getTreatmentSlugMap();
    const mapped = slugMap[baseSlug];
    if (mapped) {
      candidateSlugs.add(`${mapped}_en`);
      candidateSlugs.add(mapped);
    }
  } else {
    candidateSlugs.add(baseSlug);
    candidateSlugs.add(`${baseSlug}_tr`);
    const reverseMap = getReverseTreatmentSlugMap();
    const mapped = reverseMap[baseSlug];
    if (mapped) {
      candidateSlugs.add(mapped);
      candidateSlugs.add(`${mapped}_tr`);
    }
  }

  // 1. Slug ile ara (kendi id'si hariç)
  const bySlug = await prisma.treatment.findFirst({
    where: {
      NOT: { id: treatment.id },
      slug: { in: Array.from(candidateSlugs) },
    },
  });

  if (bySlug) return bySlug;

  // 2. Slug ile bulunamazsa, aynı kapak görseline (img) sahip karşı dildeki kaydı ara
  if (treatment.img) {
    const byImg = await prisma.treatment.findFirst({
      where: {
        NOT: { id: treatment.id },
        img: treatment.img,
        OR: [
          { lang: targetLang },
          ...(targetLang === 'en' ? [{ slug: { endsWith: '_en' } }] : [{ NOT: { slug: { endsWith: '_en' } } }]),
        ],
      },
    });

    if (byImg) return byImg;
  }

  return null;
}

/**
 * Bir tedavi + karşı dildeki eşini bulup treatmentSlugMap'i (TR->EN) günceller.
 */
export async function syncTreatmentPairSlugMap(treatment: TreatmentLite) {
  const pair = await findTreatmentPair(treatment);
  if (!pair) return null;

  const currentLang = getTreatmentLanguage(treatment);
  const trTreatment = currentLang === 'tr' ? treatment : pair;
  const enTreatment = currentLang === 'en' ? treatment : pair;

  const trClean = stripSlugSuffix(trTreatment.slug);
  const enClean = stripSlugSuffix(enTreatment.slug);

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
      where: { filename: 'treatmentSlugMap' },
    });

    let map = (record?.content as Record<string, string>) || {};

    if (!map[trSlug] || map[trSlug] !== enSlug) {
      map[trSlug] = enSlug;

      await prisma.siteContent.upsert({
        where: { filename: 'treatmentSlugMap' },
        update: { content: map },
        create: {
          filename: 'treatmentSlugMap',
          content: map,
        },
      });

      console.log(`[updateTreatmentSlugMap] DB Güncellendi: ${trSlug} → ${enSlug}`);
    }
  } catch (error) {
    console.error('[updateTreatmentSlugMap] DB güncellemesi başarısız:', error);
  }
}
