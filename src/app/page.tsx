import { getStaticContent } from '@/lib/content';
import { unstable_cache } from 'next/cache';
import HomeClient from '@/components/home/HomeClient';
import { prisma } from '@/lib/prisma';

export const revalidate = 86400;

const getHomeResults = unstable_cache(
  async () => {
    return await prisma.homeResult.findMany({
      orderBy: { order: 'asc' },
    });
  },
  ['home-results'],
  { revalidate: 86400 }
);

export default async function Home() {
  const homepageData = await getStaticContent('homepage.json');

  let homeResults: any[] = [];
  try {
    homeResults = await getHomeResults();
  } catch (err) {
    console.error('[HomeResult] DB sorgusu başarısız, boş dizi kullanılıyor:', err);
  }
  
  if (!homepageData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 font-medium">İçerik yüklenemedi. Lütfen admin panelinden homepage.json dosyasını kontrol edin.</p>
      </div>
    );
  }

  return <HomeClient homepageData={homepageData} initialResults={homeResults} />;
}