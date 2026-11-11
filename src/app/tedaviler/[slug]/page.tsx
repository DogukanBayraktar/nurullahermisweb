// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { loadTreatmentSlugMapFromDb } from '@/lib/routes';
import { findTreatmentPair, stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';
import { syncPatientImages } from '@/lib/mergePatientImages';

// ─── NEDEN force-dynamic? ────────────────────────────────────────────────────
// Bu sayfa daha önce `force-static` + ISR (1 saat) + `unstable_cache` ile
// çalışıyordu. Bu kombinasyonun iki ciddi sonucu vardı:
//
// 1) Admin panelinden yapılan bir kayıt, sayfa yeniden üretilene kadar (en fazla
//    1 saat) eski haliyle görünüyordu.
// 2) Daha kötüsü: DB okuması geçici bir sebeple (Neon'un boşta uyuması, soğuk
//    başlangıç, ağ hatası) başarısız olduğunda kod sessizce `src/lib/treatments.ts`
//    içindeki STATİK yedek veriye düşüyordu. Bu yanlış içerik statik sayfa olarak
//    önbelleğe yazılıyor ve "admin'den girdiğim veriler ertesi gün kayboldu"
//    şikayetine yol açıyordu. Gerçek veri kaybı yoktu; sadece yanlış içerik
//    önbelleğe donuyordu.
//
// Site trafiği düşük olduğu için her istekte DB'den okumak maliyet açısından
// sorun değil. Karşılığında içerik her zaman güncel ve doğru oluyor.
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Neon gibi "idle'da uyuyan" serverless Postgres'lerde ilk sorgu birkaç saniye
// gecikebilir veya tek seferlik geçici bir hata fırlatabilir. Hemen pes etmek
// yerine kısa bir bekleme ile 1-2 kez daha deniyoruz.
async function withRetry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 400): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }
  throw lastError;
}

async function getTreatmentEn(slug: string, normalizedOriginal: string | undefined) {
  const cleanSlug = stripSlugSuffix(slug);
  const cleanOriginal = normalizedOriginal ? stripSlugSuffix(normalizedOriginal) : undefined;

  const candidateSlugs = [`${cleanSlug}_en`, cleanSlug];
  if (cleanOriginal && cleanOriginal !== cleanSlug) {
    candidateSlugs.push(`${cleanOriginal}_en`, cleanOriginal);
  }

  // İngilizce tedavi ararken: slug adaylarından biri ve (lang: 'en' veya _en ile biten)
  return withRetry(() =>
    prisma.treatment.findFirst({
      where: {
        slug: { in: candidateSlugs },
        OR: [{ lang: 'en' }, { slug: { endsWith: '_en' } }],
      },
    })
  );
}

async function getTreatmentTr(slug: string) {
  const cleanSlug = stripSlugSuffix(slug);
  const candidateSlugs = [slug, cleanSlug, `${cleanSlug}_tr`];

  // Türkçe tedavi ararken: EN kaydı olmayanları ara
  return withRetry(() =>
    prisma.treatment.findFirst({
      where: {
        slug: { in: candidateSlugs },
        NOT: { slug: { endsWith: '_en' } },
      },
    })
  );
}

export default async function TedaviDetayPage({
  params,
  language = 'tr',
}: {
  params: Promise<{ slug: string; originalSlug?: string }>;
  language?: 'tr' | 'en';
}) {
  // Slug haritasını DB'den yükle ki TR<->EN çevirisi doğru yapılsın.
  // Bu sadece alternateSlug/karşı dil bilgisi içindir; başarısız olursa
  // sayfanın kendisi yine de DB'den okunur.
  await loadTreatmentSlugMapFromDb().catch((err) => {
    console.error('[TedaviDetayPage] Slug haritası yüklenemedi:', err);
  });

  const { slug, originalSlug } = await params;

  // DB yapılandırılmamışsa (ör. DB'siz local geliştirme) statik veriye düşebiliriz.
  if (!hasDatabaseUrl) {
    return renderLocal(slug);
  }

  const normalizedOriginal = originalSlug ? stripSlugSuffix(originalSlug) : undefined;

  // ÖNEMLİ: Burada DB hatalarını ASLA sessizce yutup statik veriye düşmüyoruz.
  // Aksi halde geçici bir DB hatası yanlış içeriğin gösterilmesine yol açar.
  // Hata olursa yukarı fırlatıyoruz; Next.js sayfayı bozuk içerikle üretmez.
  const dbTreatment =
    language === 'en'
      ? await getTreatmentEn(slug, normalizedOriginal)
      : await getTreatmentTr(slug);

  if (!dbTreatment) {
    // DB yapılandırılmış ve kayıt yoksa gerçekten 404.
    notFound();
  }

  let alternateSlug: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let trPair: any = null;

  const pair = await findTreatmentPair(dbTreatment).catch((err) => {
    console.error('[TedaviDetayPage] Karşı dil kaydı bulunamadı:', err);
    return null;
  });
  if (pair) {
    alternateSlug = stripSlugSuffix(pair.slug);
    if (language === 'en') trPair = pair;
  }

  const treatment = {
    title: dbTreatment.title,
    slug: dbTreatment.slug,
    coverImage: (language === 'en' && trPair?.img) || dbTreatment.img,
    images: language === 'en' && trPair?.images?.length ? trPair.images : dbTreatment.images,
    stats: dbTreatment.stats as { label: string; val: string }[],
    description: dbTreatment.desc,
    symptoms: dbTreatment.symptoms,
    // EN sayfada hasta röntgen görselleri her zaman TR kaydından gelir (TR esas alınır).
    // Metinler EN'de kalır; DB'ye yazılmaz.
    treatments: (language === 'en' && trPair && Array.isArray(trPair.treatment)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? syncPatientImages(dbTreatment.treatment as any[], trPair.treatment as any[])
      : dbTreatment.treatment) as { baslik: string; icerik: string }[],
    faq: dbTreatment.faq as { s: string; c: string }[],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TedaviDetayClient treatment={treatment as any} isLocal={false} alternateSlug={alternateSlug} />;
}

/**
 * Sadece DB bağlantısı hiç yapılandırılmamışsa kullanılan yerel/statik yedek.
 * Production'da bu yol KULLANILMAZ.
 */
function renderLocal(slug: string) {
  const cleanSlug = stripSlugSuffix(slug);
  const local = TREATMENTS_DATA.find((t) => stripSlugSuffix(t.slug) === cleanSlug);
  if (!local) notFound();

  const treatment = {
    title: local.title,
    slug: local.slug,
    coverImage: local.img,
    images: local.images,
    stats: local.stats,
    description: local.desc,
    symptoms: local.symptoms,
    treatments: local.treatment,
    faq: local.faq,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TedaviDetayClient treatment={treatment as any} isLocal={true} alternateSlug={null} />;
}
