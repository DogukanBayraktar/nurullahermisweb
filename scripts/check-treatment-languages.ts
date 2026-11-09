// scripts/check-treatment-languages.ts
// Güvenli veritabanı dil ve veri kontrol scripti.
// Mevcut verileri SİLMEZ ve içerik metinlerini ÜZERİNE YAZMAZ.
//
// Kullanım (Sadece Kontrol / Dry-run):
//   npx tsx scripts/check-treatment-languages.ts
//
// Kullanım (Sadece yanlış 'lang' etiketini güvenle düzeltmek için):
//   npx tsx scripts/check-treatment-languages.ts --fix-lang-only

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

async function main() {
  const args = process.argv.slice(2);
  const fixLangOnly = args.includes('--fix-lang-only');

  console.log('🔍 Tedavi veritabanı kayıtları inceleniyor...\n');

  const treatments = await prisma.treatment.findMany({
    orderBy: { id: 'asc' },
  });

  console.log(`📊 Toplam Bulunan Tedavi Kaydı: ${treatments.length}\n`);

  const mismatchedLang: typeof treatments = [];
  const emptyGallery: typeof treatments = [];
  const missingPairs: { id: number; title: string; slug: string; lang: string }[] = [];
  const missingXrayReference: { id: number; title: string; missingImg: string }[] = [];

  for (const t of treatments) {
    const slugEndsWithEn = t.slug.endsWith('_en');
    const slugEndsWithTr = t.slug.endsWith('_tr');

    // 1. Dil uyuşmazlığı kontrolü
    if (slugEndsWithEn && t.lang !== 'en') {
      mismatchedLang.push(t);
    } else if (slugEndsWithTr && t.lang !== 'tr') {
      mismatchedLang.push(t);
    }

    // 2. Galeri görselleri kontrolü
    if (!t.images || t.images.length === 0) {
      emptyGallery.push(t);
    }

    // 3. Eş kontrolü
    const cleanSlug = t.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const isEn = t.lang === 'en' || slugEndsWithEn;
    const targetPairSlug = isEn ? cleanSlug : `${cleanSlug}_en`;
    const pair = treatments.find((other) => other.id !== t.id && (other.slug === targetPairSlug || other.slug === `${cleanSlug}_tr`));
    if (!pair) {
      missingPairs.push({ id: t.id, title: t.title, slug: t.slug, lang: t.lang });
    }

    // 4. Growing Rod 404 röntgen görseli kontrolü
    const treatmentJsonStr = JSON.stringify(t.treatment);
    if (treatmentJsonStr.includes('/images/rontgen/burak-ipekci-2020-preop.jpg')) {
      missingXrayReference.push({
        id: t.id,
        title: t.title,
        missingImg: '/images/rontgen/burak-ipekci-2020-preop.jpg',
      });
    }
  }

  // RAPORLAMA
  console.log('════════════════════════════════════════════════════════════════');
  console.log('1. DİL UYUŞMAZLIĞI (Slug vs Lang)');
  console.log('════════════════════════════════════════════════════════════════');
  if (mismatchedLang.length === 0) {
    console.log('✅ Hiçbir dilde slug/lang uyuşmazlığı tespit edilmedi.\n');
  } else {
    console.warn(`⚠️  ${mismatchedLang.length} adet kayıtta dil alanı yanlış etiketlenmiş:`);
    for (const item of mismatchedLang) {
      const expected = item.slug.endsWith('_en') ? 'en' : 'tr';
      console.warn(`   • [ID: ${item.id}] "${item.title}" | Slug: "${item.slug}" | Mevcut lang: "${item.lang}" -> Olması gereken: "${expected}"`);
    }
    console.log('');
  }

  console.log('════════════════════════════════════════════════════════════════');
  console.log('2. GALERİ GÖRSELLERİ DURUMU (images array)');
  console.log('════════════════════════════════════════════════════════════════');
  console.log(`ℹ️  Galeri görseli boş olan tedavi sayısı: ${emptyGallery.length}/${treatments.length}`);
  if (emptyGallery.length > 0) {
    for (const item of emptyGallery) {
      console.log(`   • [ID: ${item.id}] [${item.lang}] "${item.title}" (${item.slug})`);
    }
  }
  console.log('');

  console.log('════════════════════════════════════════════════════════════════');
  console.log('3. KARŞI DİL EŞİ BULUNAMAYAN KAYITLAR');
  console.log('════════════════════════════════════════════════════════════════');
  if (missingPairs.length === 0) {
    console.log('✅ Tüm tedavilerin karşı dilde bir eşi mevcut.\n');
  } else {
    console.log(`ℹ️  ${missingPairs.length} adet kaydın doğrudan slug bazlı eşi bulunamadı:`);
    for (const item of missingPairs) {
      console.log(`   • [ID: ${item.id}] [${item.lang}] "${item.title}" (Slug: ${item.slug})`);
    }
    console.log('');
  }

  console.log('════════════════════════════════════════════════════════════════');
  console.log('4. EKSİK DOSYA REFERANSLARI (burak-ipekci-2020-preop.jpg)');
  console.log('════════════════════════════════════════════════════════════════');
  if (missingXrayReference.length === 0) {
    console.log('✅ Veritabanında eksik Growing Rod dosyasını referans alan tedavi bulunmadı.\n');
  } else {
    console.warn(`⚠️  ${missingXrayReference.length} adet tedavide eksik dosya yolu referans ediliyor:`);
    for (const item of missingXrayReference) {
      console.warn(`   • [ID: ${item.id}] "${item.title}" -> ${item.missingImg}`);
    }
    console.log('');
  }

  // FIX İŞLEMİ (SADECE --fix-lang-only BAYRAĞI VARSA)
  if (fixLangOnly) {
    if (mismatchedLang.length === 0) {
      console.log('ℹ️  Düzeltilecek dil kaydı bulunamadı.');
    } else {
      console.log('🚀 Güvenli dil alanı düzeltmesi başlatılıyor...');
      for (const item of mismatchedLang) {
        const targetLang = item.slug.endsWith('_en') ? 'en' : 'tr';
        await prisma.treatment.update({
          where: { id: item.id },
          data: { lang: targetLang },
        });
        console.log(`   ✓ [ID: ${item.id}] lang alanı "${targetLang}" olarak güncellendi.`);
      }
      console.log('✅ Güvenli güncelleme tamamlandı. İçerik ve görsellere dokunulmadı.\n');
    }
  } else {
    if (mismatchedLang.length > 0) {
      console.log('💡 İPUCU: Dil uyuşmazlıklarını sadece lang sütununu güncelleyerek (içeriklere dokunmadan) düzeltmek için:');
      console.log('   npx tsx scripts/check-treatment-languages.ts --fix-lang-only\n');
    }
  }
}

main()
  .catch((e) => {
    console.error('Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

