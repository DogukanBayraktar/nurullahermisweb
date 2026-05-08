import { getStaticContent } from '@/lib/content';
import AboutClient from '@/components/about/AboutClient';

export default async function HakkimdaPage() {
  const aboutData = await getStaticContent('about.json');
  
  if (!aboutData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500 font-medium">İçerik yüklenemedi. Lütfen admin panelinden about.json dosyasını kontrol edin.</p>
      </div>
    );
  }

  return <AboutClient aboutData={aboutData} />;
}