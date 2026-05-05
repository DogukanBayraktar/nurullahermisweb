import { promises as fs } from 'fs';
import path from 'path';

/**
 * Admin'de yeni makale eklenince articleSlugMap.json'u otomatik güncelle
 * TR slug (bel-fitigi_tr) ve EN slug (lumbar-disc_en) alıp mapa ekle
 */
export async function updateArticleSlugMapJson(trSlug: string, enSlug: string) {
  const mapPath = path.join(process.cwd(), 'src', 'lib', 'articleSlugMap.json');
  
  // "_tr", "_en" suffix'lerini kaldır
  const trClean = trSlug.replace(/_tr$/, '');
  const enClean = enSlug.replace(/_en$/, '');
  
  if (!trClean || !enClean) {
    console.warn('[updateArticleSlugMap] Geçersiz slug pair:', { trSlug, enSlug });
    return;
  }
  
  try {
    const content = await fs.readFile(mapPath, 'utf-8');
    const map = JSON.parse(content) as Record<string, string>;
    
    // Eğer TR slug mapa yoksa ve EN slug'u farklıysa ekle
    if (!map[trClean] || map[trClean] !== enClean) {
      map[trClean] = enClean;
      await fs.writeFile(mapPath, JSON.stringify(map, null, 2));
      console.log(`[updateArticleSlugMap] Eklendi: ${trClean} → ${enClean}`);
    }
  } catch (error) {
    console.error('[updateArticleSlugMap] JSON güncellemesi başarısız:', error);
  }
}
