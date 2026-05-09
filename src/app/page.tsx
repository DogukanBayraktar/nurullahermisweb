import { getStaticContent } from '@/lib/content';
export const dynamic = 'force-dynamic';
import HomeClient from '@/components/home/HomeClient';

import { prisma } from '@/lib/prisma';

export default async function Home() {
  const homepageData = await getStaticContent('homepage.json');
  // DB bağlantısı yoksa veya sorgu patlarsa boş dizi döndür,
  // sayfa yine de açılsın.
  let homeResults: any[] = [];
  try {
    homeResults = await prisma.homeResult.findMany({
      orderBy: { order: 'asc' },
    });
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