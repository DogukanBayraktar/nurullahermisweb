import { prisma } from './prisma';

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
