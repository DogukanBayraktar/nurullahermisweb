import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  loadEnvConfig('C:/Users/dogukan.bayraktar/nurullahermisweb');

  const cs = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL;
  if (!cs) {
    console.log('NO DB URL');
    process.exit(0);
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: cs }) });
  const t = await prisma.treatment.findUnique({ where: { slug: 'skolyoz-kifoz-cerrahisi' } });
  const arr = t?.treatment as any[];
  console.log('treatment count:', arr?.length ?? 0);
  console.log('has konjenital:', arr?.some((x) => x.baslik?.includes('Konjenital') || x.baslik?.includes('Congenital')));
  const k = arr?.find((x) => x.baslik?.includes('Konjenital') || x.baslik?.includes('Congenital'));
  if (k) {
    for (const s of k.submethods ?? []) {
      console.log('sub:', s.baslik, 'galleryLen:', s.gallery?.length ?? 0);
    }
  } else {
    console.log('listed titles:', arr?.map((x) => x.baslik).join(' | '));
  }
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });