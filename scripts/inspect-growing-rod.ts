// scripts/inspect-growing-rod.ts
// Sadece OKUMA yapar, HİÇBİR ŞEYİ DEĞİŞTİRMEZ.
// Skolyoz/Kifoz (TR ve EN) kayıtlarının tam "treatment" JSON yapısını
// ekrana basar, böylece Growing Rod / patients verisinin DB'de tam olarak
// nasıl durduğunu (boş mu, hangi alan adlarıyla mı) görebiliyoruz.
//
// Kullanım:
//   npx tsx scripts/inspect-growing-rod.ts

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
  const records = await prisma.treatment.findMany({
    where: { slug: { in: ['skolyoz-kifoz-cerrahisi', 'skolyoz-kifoz-cerrahisi_en'] } },
    orderBy: { id: 'asc' },
  });

  if (records.length === 0) {
    console.log('❌ Skolyoz/Kifoz kaydı bulunamadı (slug eşleşmedi). Tüm kayıtları listeliyorum:');
    const all = await prisma.treatment.findMany({ select: { id: true, slug: true, lang: true, title: true } });
    console.table(all);
    await prisma.$disconnect();
    return;
  }

  for (const r of records) {
    console.log('════════════════════════════════════════════════════════════════');
    console.log(`[ID: ${r.id}] [${r.lang}] "${r.title}" (slug: ${r.slug})`);
    console.log(`img: ${r.img || '(boş)'}`);
    console.log(`images (galeri) adedi: ${Array.isArray(r.images) ? r.images.length : 0}`);
    console.log('════════════════════════════════════════════════════════════════');
    console.log(JSON.stringify(r.treatment, null, 2));
    console.log('\n');
  }

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('❌ HATA:', err);
  await prisma.$disconnect();
  process.exit(1);
});