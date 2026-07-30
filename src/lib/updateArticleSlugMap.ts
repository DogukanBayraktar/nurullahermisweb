import { prisma } from './prisma';

type HealthArticleLite = {
  id: number;
  slug: string;
  lang: string;
  img: string | null;
};

/**
 * Bir makalenin karşı dildeki (TR<->EN) eşini bulur.
 *
 * ÖNEMLİ: Slug'ların "aynı kelimeler + _tr/_en suffix" olduğunu VARSAYMAZ.
 * EN slug, TR slug'dan tamamen farklı (gerçek İngilizce) bir metin olabilir
 * (örn. TR: bel-fitigi-ameliyati, EN: lumbar-disc-surgery). Bu yüzden önce
 * "canonicalSlug + suffix" ile dener, olmazsa aynı kapak görseline (img)
 * sahip karşı dildeki kaydı bulur. Bu, admin panelindeki eşleştirme
 * mantığıyla (admin/saglik-rehberi/[id]/page.tsx) aynıdır ve orada
 * çalıştığı için burada da güvenilir kabul edilir.
 */
export async function findArticlePair(article: HealthArticleLite) {
  const canonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
  const pairLang = article.lang === 'tr' ? 'en' : 'tr';

  return prisma.healthArticle.findFirst({
    where: {
      lang: pairLang,
      NOT: { id: article.id },
      OR: [
        { slug: `${canonicalSlug}_${pairLang}` },
        { slug: canonicalSlug },
        ...(article.img ? [{ img: article.img }] : []),
      ],
    },
  });
}

/**
 * Bir makale + karşı dildeki eşini bulup articleSlugMap'i (TR->EN) günceller.
 * Slug metinleri farklılaşmış olsa bile (EN çevrilmiş) doğru eşleşmeyi bulur.
 */
export async function syncArticlePairSlugMap(article: HealthArticleLite) {
  const pair = await findArticlePair(article);
  if (!pair) return null;

  const trArticle = article.lang === 'tr' ? article : pair;
  const enArticle = article.lang === 'en' ? article : pair;
  await updateArticleSlugMapDb(trArticle.slug, enArticle.slug);
  return pair;
}

/**
 * Admin'de yeni makale eklenince slug map'i DB'deki SiteContent tablosunda güncelle.
 * TR slug (bel-fitigi_tr) ve EN slug (lumbar-disc_en) alıp mapa ekle.
 * Vercel (serverless) ortamında fs.writeFile çalışmadığı için DB kullanıyoruz.
 */
export async function updateArticleSlugMapDb(trSlug: string, enSlug: string) {
  // "_tr", "_en" suffix'lerini kaldır
  const trClean = trSlug.replace(/_tr$/, '');
  const enClean = enSlug.replace(/_en$/, '');
  
  if (!trClean || !enClean) {
    console.warn('[updateArticleSlugMap] Geçersiz slug pair:', { trSlug, enSlug });
    return;
  }
  
  try {
    // DB'den mevcut map'i al
    const record = await prisma.siteContent.findUnique({
      where: { filename: 'articleSlugMap' }
    });
    
    let map = (record?.content as Record<string, string>) || {};
    
    // Eğer TR slug mapa yoksa veya EN slug'u farklıysa güncelle
    if (!map[trClean] || map[trClean] !== enClean) {
      map[trClean] = enClean;
      
      await prisma.siteContent.upsert({
        where: { filename: 'articleSlugMap' },
        update: { content: map },
        create: { 
          filename: 'articleSlugMap',
          content: map 
        }
      });
      
      console.log(`[updateArticleSlugMap] DB Güncellendi: ${trClean} → ${enClean}`);
    }
  } catch (error) {
    console.error('[updateArticleSlugMap] DB güncellemesi başarısız:', error);
  }
}