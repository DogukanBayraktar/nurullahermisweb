import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const resultsData = [
  {
    img: "/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif",
    label_tr: "Skolyoz Tedavisi",
    label_en: "Scoliosis Treatment",
    desc_tr: "Ameliyat sonrası 1. yıl kontrolü. Tam düzelme sağlandı.",
    desc_en: "1st year post-op follow-up. Full correction achieved.",
    order: 1
  },
  {
    img: "/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif",
    label_tr: "Skolyoz Cerrahisi",
    label_en: "Scoliosis Surgery",
    desc_tr: "Eğrilik açısında 45 derecelik iyileşme.",
    desc_en: "45 degree improvement in curvature angle.",
    order: 2
  },
  {
    img: "/images/69b80d3d2324c321ba53cae5_Kyphosis-before-after-1.jpg.avif",
    label_tr: "Kifoz Düzeltme",
    label_en: "Kyphosis Correction",
    desc_tr: "Kamburluk şikayeti ile başvuran hastamızın ameliyat sonucu.",
    desc_en: "Surgical result of our patient who applied with a hunchback complaint.",
    order: 3
  },
  {
    img: "/images/69b803d47b548c348c11664f_diz-protezi-before-after-1.jpg.avif",
    label_tr: "Diz Protezi",
    label_en: "Knee Prosthesis",
    desc_tr: "Diz kireçlenmesi sonrası robotik cerrahi ile tam hareket kabiliyeti.",
    desc_en: "Full mobility with robotic surgery after knee calcification.",
    order: 4
  },
  {
    img: "/images/69b8010e9d8850fbd786d629_kyphoscoliosis-2.jpg.avif",
    label_tr: "Kifoskolyoz Cerrahisi",
    label_en: "Kyphoscoliosis Surgery",
    desc_tr: "İleri derece eğriliklerde kompleks düzeltme operasyonu.",
    desc_en: "Complex correction operation for advanced curvatures.",
    order: 5
  }
];

async function main() {
  console.log('Clearing existing home results...');
  await prisma.homeResult.deleteMany();
  
  console.log('Seeding home results...');
  for (const item of resultsData) {
    await prisma.homeResult.create({
      data: item
    });
  }
  console.log('Home results seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
