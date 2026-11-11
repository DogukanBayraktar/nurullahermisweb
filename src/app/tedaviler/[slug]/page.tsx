// src/app/tedaviler/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { TREATMENTS_DATA } from '@/lib/treatments';
import TedaviDetayClient from '@/components/tedaviler/TedaviDetayClient';
import { hasDatabaseUrl, prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { loadTreatmentSlugMapFromDb } from '@/lib/routes';
import { findTreatmentPair, stripSlugSuffix } from '@/lib/updateTreatmentSlugMap';
import { syncPatientImages } from '@/lib/mergePatientImages';

// ÖNEMLİ: Bu değer önceden 86400 (24 saat) idi. Sayfa "force-static" olduğu için
// DB okuması bir hiçbir hatasızca başarısız olduğunda (ör. Neon'un boşta kalınca
// uyuyan veritabanı bağlantısının ilk isteklerde zaman aşımına uğraması gibi geçici
// bir ağ/DB sorunu) aşağıdaki catch bloğu sessizce yerel örnek veriye düşüyor ve bu
// YANLIŞ içerik, ISR tarafından koca bir gün boyunca statik sayfa olarak
// dondurulup sunucuda saklanıyordu. "Dün admin panelinden güncelledim, veriler
// göründü; ertesi gün baktım gitmiş; tekrar güncelleyince geri geldi" şikayeti tam
// olarak bu örüntüye uyuyor: gerçek veri kaybı değil, bir günlüğüne donan bozuk
// önbellek. 86400 yerine 3600 (1 saat) kullanmak, böyle bir hiccup'ın etkisini
// en kötü ihtimalle 1 saate indirir (bkz. aşağıdaki retry + hataları yutmama
// değişiklikleriyle birlikte bu senaryonun hiç yaşanmaması hedeflenir).
export const revalidate = 3600;
export const dynamic = 'force-static';
export const dynamicParams = true;
const isDev = process.env.NODE_ENV === 'development';

// development'da DB değişiklikleri anında görünsün diye önbellek atlanır.
function maybeCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  key: string[],
  opts: { revalidate: number; tags: string[] }
): (...args: T) => Promise<R> {
  if (isDev) return fn;
  return unstable_cache(fn, key, opts);
}

// Neon gibi "idle'da uyuyan" serverless Postgres'lerde, uzun süre istek
// gelmeyince veritabanı bağlantısı ilk sorguda birkaç saniye gecikebilir veya
// tek seferlik geçici bir hata fırlatabilir. Bu durumda hemen pes edip yanlış
// bir fallback göstermek yerine kısa bir bekleme ile 1-2 kez daha deniyoruz.
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

// treatments/[slug]/page.tsx (EN mirror) generateStaticParams'ta da
// kullanabilsin diye export ediliyor.
export const getAllTreatmentSlugs = maybeCache(
  async () => {
    const rows = await withRetry(() => prisma.treatment.findMany({ select: { slug: true } }));
    return new Set(rows.map((r) => r.slug));
  },
  ['treatment-slug-allowlist'],
  { revalidate: 3600, tags: ['treatment-slug-allowlist'] }
);

export async function generateStaticParams() {
  try {
    const slugs = await getAllTreatmentSlugs();
    // DB'deki slug'lar '_tr' / '_en' son ekiyle tutuluyor (örn. 'xxx_tr').
    // Gerçek TR URL'i son eksiz olduğu için temizliyoruz.
    const canonicalSlugs = new Set(
      Array.from(slugs).map((slug) => stripSlugSuffix(slug))
    );
    return Array.from(canonicalSlugs).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

const getTreatmentEn = maybeCache(
  async (slug: string, normalizedOriginal: string | undefined) => {
    const cleanSlug = stripSlugSuffix(slug);
    const cleanOriginal = normalizedOriginal ? stripSlugSuffix(normalizedOriginal) : undefined;

    const candidateSlugs = [
      `${cleanSlug}_en`,
      cleanSlug,
    ];
    if (cleanOriginal && cleanOriginal !== cleanSlug) {
      candidateSlugs.push(`${cleanOriginal}_en`, cleanOriginal);
    }

    // İngilizce tedavi ararken: slug adaylarından biri ve (lang: 'en' veya _en ile biten)
    const found = await withRetry(() =>
      prisma.treatment.findFirst({
        where: {
          slug: { in: candidateSlugs },
          OR: [
            { lang: 'en' },
            { slug: { endsWith: '_en' } },
          ],
        },
      })
    );

    return found;
  },
  ['treatment-detail-en'],
  { revalidate: 3600, tags: ['treatment-detail'] }
);

const getTreatmentTr = maybeCache(
  async (slug: string) => {
    const cleanSlug = stripSlugSuffix(slug);
    const candidateSlugs = [slug, cleanSlug, `${cleanSlug}_tr`];

    // Türkçe tedavi ararken: EN kaydı olmayanları ara
    const found = await withRetry(() =>
      prisma.treatment.findFirst({
        where: {
          slug: { in: candidateSlugs },
          NOT: { slug: { endsWith: '_en' } },
        },
      })
    );

    return found;
  },
  ['treatment-detail-tr'],
  { revalidate: 3600, tags: ['treatment-detail'] }
);

export default async function TedaviDetayPage({
  params,
  language = 'tr',
}: {
  params: Promise<{ slug: string; originalSlug?: string }>;
  language?: 'tr' | 'en';
}) {
  // Slug haritasını DB'den yükle ki TR<->EN çevirisi doğru yapılsın
  await loadTreatmentSlugMapFromDb().catch(() => {});

  const { slug, originalSlug } = await params;
  let dbTreatment = null;
  let alternateSlug: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let trPair: any = null;

  // "Slug zaten bilinen DB kayıtları listesinde var mı" (possiblyInDb) bilgisini
  // try/catch dışında da kullanabilmek için burada tutuyoruz.
  let possiblyInDb = false;

  try {
    if (hasDatabaseUrl) {
      const knownSlugs = await getAllTreatmentSlugs();
      const normalizedOriginal = originalSlug ? stripSlugSuffix(originalSlug) : undefined;
      const cleanSlug = stripSlugSuffix(slug);

      possiblyInDb =
        knownSlugs.has(slug) ||
        knownSlugs.has(cleanSlug) ||
        knownSlugs.has(`${cleanSlug}_tr`) ||
        knownSlugs.has(`${cleanSlug}_en`) ||
        (normalizedOriginal ? knownSlugs.has(`${normalizedOriginal}_en`) || knownSlugs.has(normalizedOriginal) : false);

      if (possiblyInDb) {
        if (language === 'en') {
          dbTreatment = await getTreatmentEn(slug, normalizedOriginal);
        } else {
          dbTreatment = await getTreatmentTr(slug);
        }

        // Karşı dildeki eşi bul (alternateSlug için)
        if (dbTreatment) {
          const pair = await findTreatmentPair(dbTreatment).catch(() => null);
          if (pair) {
            alternateSlug = stripSlugSuffix(pair.slug);
            if (language === 'en') trPair = pair;
          }
        }
      }
    }
  } catch (err) {
    // ÖNEMLİ DÜZELTME: Bu kayıt zaten bilinen slug listesinde (possiblyInDb) ise,
    // yani veritabanında olması gerektiğini biliyorsak, geçici bir bağlantı
    // hatası (ör. Neon'un uyuyan veritabanının uyanırken zaman aşımına uğraması)
    // yüzünden boş/yerel içeriğe DÜŞMÜYORUZ. Eskiden burada hata sessizce
    // yutuluyor ve sayfa yerel örnek veriyle (ya da hiç yoksa 404 ile) yeniden
    // oluşturulup ISR tarafından 24 saatliğine önbelleğe yazılıyordu — yani DB'de
    // veri dururken sitede "kaybolmuş" gibi görünüyordu. Hatayı burada tekrar
    // fırlatmak, Next.js'in bu statik sayfayı YENİDEN OLUŞTURMAMASINA ve bir
    // önceki (doğru) önbelleğe alınmış sürümü göstermeye devam etmesine sebep
    // olur; bir sonraki istekte veya kısa süre sonra tekrar denenir.
    if (possiblyInDb) {
      console.error(`[TedaviDetayPage] DB okuma hatası (slug: ${slug}):`, err);
      throw err;
    }
    // possiblyInDb false ise (slug gerçekten DB'de yok) normal şekilde devam
    // edip aşağıdaki yerel veri / notFound() akışına düşülür.
  }

  if (dbTreatment) {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treatments: (language === 'en' && trPair && Array.isArray(trPair.treatment)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? syncPatientImages(dbTreatment.treatment as any[], trPair.treatment as any[])
        : dbTreatment.treatment) as { baslik: string; icerik: string }[],
      faq: dbTreatment.faq as { s: string; c: string }[],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <TedaviDetayClient treatment={treatment as any} isLocal={false} alternateSlug={alternateSlug} />;
  }

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