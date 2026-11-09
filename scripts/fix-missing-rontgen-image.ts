// scripts/fix-missing-rontgen-image.ts
// Veritabanındaki treatment JSON içinde gömülü olan, projede fiziksel olarak
// VAR OLMAYAN "/images/rontgen/burak-ipekci-2020-preop.jpg" referansını temizler.
// Sadece bu kırık img alanını kaldırır; başka hiçbir veriye (başlık, metin,
// diğer hastalar, diğer görseller) dokunmaz.
//
// Kullanım (Sadece Kontrol / Dry-run — HİÇBİR ŞEY DEĞİŞTİRMEZ):
//   npx tsx scripts/fix-missing-rontgen-image.ts
//
// Kullanım (Gerçekten düzeltmek için):
//   npx tsx scripts/fix-missing-rontgen-image.ts --apply

import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

loadEnvConfig(process.cwd());

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ HATA: DATABASE_URL veya POSTGRES_PRISMA_URL ortam değişkeni bulunamadı.');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const BROKEN_IMG = '/images/rontgen/burak-ipekci-2020-preop.jpg';

// Belirli bir sabit yapı (method -> submethod -> patient) VARSAYMADAN,
// treatment JSON'ının her yerini (hangi şekilde iç içe geçmiş olursa olsun)
// gezer. Herhangi bir nesnede değeri tam olarak kırık yola eşit olan bir
// alan bulursa (img, src, url, cover, photo, gallery içindeki img, vb. fark
// etmeksizin HER alan adını kontrol eder) sadece o alanı siler; nesnenin
// geri kalanına ve dizideki diğer öğelere dokunmaz.
function stripBrokenImgDeep(value: any): { result: any; changed: boolean } {
  let changed = false;

  if (Array.isArray(value)) {
    const result = value.map((item) => {
      const r = stripBrokenImgDeep(item);
      if (r.changed) changed = true;
      return r.result;
    });
    return { result, changed };
  }

  if (value && typeof value === 'object') {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      if (val === BROKEN_IMG) {
        changed = true;
        continue; // bu alanı tamamen çıkar (silme davranışı)
      }
      const r = stripBrokenImgDeep(val);
      if (r.changed) changed = true;
      result[key] = r.result;
    }
    return { result, changed };
  }

  return { result: value, changed };
}

function stripBrokenImg(treatment: any): { result: any; changed: boolean } {
  return stripBrokenImgDeep(treatment);
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');

  console.log(`🔍 "${BROKEN_IMG}" referansı için tedavi kayıtları taranıyor...\n`);

  const treatments = await prisma.treatment.findMany({ orderBy: { id: 'asc' } });

  const toFix: { id: number; title: string; lang: string; newTreatment: any }[] = [];

  for (const t of treatments) {
    const { result, changed } = stripBrokenImg(t.treatment as any);
    if (changed) {
      toFix.push({ id: t.id, title: t.title, lang: t.lang, newTreatment: result });
    }
  }

  if (toFix.length === 0) {
    console.log('✅ Kırık görsel referansı taşıyan kayıt bulunamadı. Yapılacak bir şey yok.');
    await prisma.$disconnect();
    return;
  }

  console.log(`⚠️  ${toFix.length} kayıtta kırık görsel referansı bulundu:`);
  for (const item of toFix) {
    console.log(`   • [ID: ${item.id}] [${item.lang}] "${item.title}"`);
  }
  console.log('');

  if (!apply) {
    console.log('ℹ️  Bu bir dry-run. Hiçbir şey değiştirilmedi.');
    console.log('ℹ️  Gerçekten düzeltmek için: npx tsx scripts/fix-missing-rontgen-image.ts --apply');
    await prisma.$disconnect();
    return;
  }

  console.log('🚀 Kırık görsel referansları temizleniyor (sadece img alanı siliniyor)...');
  for (const item of toFix) {
    await prisma.treatment.update({
      where: { id: item.id },
      data: { treatment: item.newTreatment },
    });
    console.log(`   ✅ [ID: ${item.id}] düzeltildi.`);
  }

  console.log('\n✅ Tamamlandı. Gerçek röntgen fotoğrafını admin panelinden yükleyip kaydettiğinde bu hasta için görsel tekrar görünecek.');

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('❌ HATA:', err);
  await prisma.$disconnect();
  process.exit(1);
});