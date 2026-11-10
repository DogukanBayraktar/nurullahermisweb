// scripts/sync-patient-images.ts
// TR tedavi kayıtlarındaki hasta görsellerini (patients[].img / gallery) EN kayıtlarına yazar.
// Sadece hasta görsellerine dokunur; EN metinlerini DEĞİŞTİRMEZ.
//
// Dry-run (hiçbir şey değiştirmez):  npx tsx scripts/sync-patient-images.ts
// Gerçekten uygula:                  npx tsx scripts/sync-patient-images.ts --apply

import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { syncPatientImages } from '../src/lib/mergePatientImages';

loadEnvConfig(process.cwd());

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ DATABASE_URL veya POSTGRES_PRISMA_URL bulunamadı.');
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

function strip(slug: string) {
  return slug.replace(/_tr$/, '').replace(/_en$/, '');
}

function countPatients(treatment: any): number {
  let n = 0;
  if (!Array.isArray(treatment)) return 0;
  for (const m of treatment) {
    for (const s of Array.isArray(m?.submethods) ? m.submethods : []) {
      n += Array.isArray(s?.patients) ? s.patients.length : 0;
    }
  }
  return n;
}

async function main() {
  const apply = process.argv.includes('--apply');
  const all = await prisma.treatment.findMany({ orderBy: { id: 'asc' } });
  const enRecords = all.filter((t) => t.lang === 'en' || t.slug.endsWith('_en'));

  let changedCount = 0;

  for (const en of enRecords) {
    const base = strip(en.slug);
    const tr = all.find((t) => t.id !== en.id && !t.slug.endsWith('_en') && strip(t.slug) === base);
    if (!tr) {
      console.log(`- [EN ${en.id}] ${en.slug}: TR eşi bulunamadı, atlandı.`);
      continue;
    }

    const before = en.treatment as any[];
    const after = syncPatientImages(before, tr.treatment as any[]);
    const changed = JSON.stringify(before) !== JSON.stringify(after);

    console.log(
      `${changed ? '⚠️ ' : '✅'} [EN ${en.id}] ${en.slug}  hasta: ${countPatients(before)} → ${countPatients(after)}  (TR: ${countPatients(tr.treatment)})`
    );

    if (changed) {
      changedCount++;
      if (apply) {
        await prisma.treatment.update({ where: { id: en.id }, data: { treatment: after } });
        console.log('   ✅ güncellendi');
      }
    }
  }

  if (!apply) {
    console.log(changedCount ? '\nℹ️  Dry-run: hiçbir şey değişmedi. Uygulamak için --apply ekle.' : '\n✅ Yapılacak bir şey yok.');
  }
}

main()
  .catch((e) => {
    console.error('❌ HATA:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
