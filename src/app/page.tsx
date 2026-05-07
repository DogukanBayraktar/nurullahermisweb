import { getStaticContent } from '@/lib/content';
import HomeClient from '@/components/home/HomeClient';

export default async function Home() {
  const homepageData = getStaticContent('homepage.json');
  
  if (!homepageData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 font-medium">İçerik yüklenemedi. Lütfen admin panelinden homepage.json dosyasını kontrol edin.</p>
      </div>
    );
  }

  return <HomeClient homepageData={homepageData} />;
}
