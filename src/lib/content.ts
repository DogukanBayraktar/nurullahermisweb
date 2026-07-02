import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

const getCachedSiteContent = unstable_cache(
  async (filename: string) => {
    const record = await prisma.siteContent.findUnique({
      where: { filename },
    });
    return record?.content ?? null;
  },
  ['site-content-by-filename'],
  { revalidate: 86400, tags: ['site-content'] }
);

export async function getStaticContent(filename: string) {
  try {
    // 1. Paylaşımlı Next.js data cache + DB (24 saat revalidate)
    const dbContent = await getCachedSiteContent(filename);
    if (dbContent) {
      return dbContent;
    }

    // 2. Fallback: dosya sisteminden oku (ilk migration / DB henüz boşsa)
    const filePath = path.join(CONTENT_PATH, filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const content = JSON.parse(fileContent);

      // DB'ye sadece kayıt yoksa bir kere yazılır; sonraki tüm istekler
      // yukarıdaki cache'li sorgudan karşılanır.
      try {
        await prisma.siteContent.upsert({
          where: { filename },
          update: { content },
          create: { filename, content },
        });
      } catch (dbError) {
        console.error(`Error migrating ${filename} to DB:`, dbError);
      }

      return content;
    }

    return null;
  } catch (error) {
    console.error(`Error reading content ${filename}:`, error);
    return null;
  }
}

export async function updateStaticContent(filename: string, content: any) {
  try {
    await prisma.siteContent.upsert({
      where: { filename },
      update: { content },
      create: { filename, content },
    });

    // Admin değişiklik yapınca paylaşımlı cache'i temizle (sadece bu filename için,
    // tüm site içeriğini değil) — böylece bir sonraki istek güncel veriyi DB'den
    // çekip yeniden cache'ler, diğer cache'li içerikler etkilenmez.
    revalidateContentTag();

    return { success: true };
  } catch (error) {
    console.error(`Error updating content ${filename}:`, error);
    return { success: false, error: 'Database update failed' };
  }
}

function revalidateContentTag() {
  // Dinamik import: bu dosya hem server hem (teorik olarak) başka context'lerde
  // kullanılabileceğinden revalidateTag'i sadece ihtiyaç anında çağırıyoruz.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { revalidateTag } = require('next/cache');
  revalidateTag('site-content');
}
