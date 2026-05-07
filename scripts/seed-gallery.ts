import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const galleryData = [
  {
    category_tr: "Skolyoz & Kifoz Cerrahisi",
    category_en: "Scoliosis & Kyphosis Surgery",
    images: [
      { tr: "Skolyoz Öncesi Sonrası 1", en: "Scoliosis Before After 1", url: "/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif" },
      { tr: "Skolyoz Öncesi Sonrası 2", en: "Scoliosis Before After 2", url: "/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif" },
      { tr: "Kifoz Öncesi Sonrası 1", en: "Kyphosis Before After 1", url: "/images/69b80d3d2324c321ba53cae5_Kyphosis-before-after-1.jpg.avif" },
      { tr: "Kifoz Öncesi Sonrası 2", en: "Kyphosis Before After 2", url: "/images/69b8010e9d8850fbd786d629_kyphoscoliosis-2.jpg.avif" },
    ]
  },
  {
    category_tr: "Diz & Kalça Protezi",
    category_en: "Knee & Hip Replacement",
    images: [
      { tr: "Diz Protezi Öncesi Sonrası 1", en: "Knee Replacement Before After 1", url: "/images/diz-kalca/diz-protezi-before-after-2.jpg" },
      { tr: "Diz Protezi Öncesi Sonrası 2", en: "Knee Replacement Before After 2", url: "/images/diz-kalca/diz-protezi-before-after-3.jpg" },
      { tr: "Kalça Protezi Öncesi Sonrası 1", en: "Hip Replacement Before After 1", url: "/images/diz-kalca/kalca-protezi-before-after-1.jpg" },
      { tr: "Kalça Protezi Öncesi Sonrası 2", en: "Hip Replacement Before After 2", url: "/images/diz-kalca/kalca-protezi-before-after-2.jpg" },
      { tr: "Kalça Protezi Öncesi Sonrası 3", en: "Hip Replacement Before After 3", url: "/images/diz-kalca/kalca1-protezi-before-after-1.jpg" },
    ]
  }
];

async function main() {
  console.log('Seeding gallery items...');
  
  for (const group of galleryData) {
    for (const img of group.images) {
      await prisma.galleryItem.create({
        data: {
          img: img.url,
          title_tr: img.tr,
          title_en: img.en,
          category_tr: group.category_tr,
          category_en: group.category_en,
          order: 0
        }
      });
    }
  }

  const others = [
    { tr: "Bel Fıtığı Tedavisi", en: "Herniated Disc Treatment", url: "/images/bel-fitigi-1.avif" },
    { tr: "Boyun Fıtığı Cerrahisi", en: "Neck Hernia Surgery", url: "/images/boyun-fitigi.avif" },
    { tr: "Çocuk Ortopedisi", en: "Pediatric Orthopedics", url: "/images/cocuk-ortopedisi.avif" },
    { tr: "Artroskopik Cerrahi", en: "Arthroscopic Surgery", url: "/images/artroskopik-cerrahi.avif" },
  ];

  for (const item of others) {
    await prisma.galleryItem.create({
      data: {
        img: item.url,
        title_tr: item.tr,
        title_en: item.en,
        category_tr: item.tr,
        category_en: item.en,
        order: 0
      }
    });
  }

  console.log('Gallery seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
