'use client';

import { usePathname } from 'next/navigation';
import Topline from '@/components/layout/Topline';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/whatsapp-button';
import { RouteTranslationProvider } from '@/lib/RouteTranslationContext';

// getStaticContent'in dönüş tipi dinamik JSON içeriği (any) olduğu için
// burada da aynı şekilde bırakıldı.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NavFooterData = any;

/**
 * Topline/Navbar/Footer/WhatsApp, admin route'larında gizlenir.
 *
 * ÖNEMLİ: Bu kontrol bilerek client tarafında (usePathname) yapılıyor.
 * Daha önce root layout'ta `headers()` ile server-side yapılıyordu; bu,
 * Next.js'in headers() çağrısı yapan HER server component'i (ve onun
 * sardığı TÜM route'ları) dynamic render'a zorlaması nedeniyle
 * /tedaviler/[slug] ve /saglik-rehberi/[slug] gibi statik olması gereken
 * sayfaların da her istekte SSR edilmesine ve Vercel cache'inin hep
 * MISS dönmesine yol açıyordu. usePathname client hook'u aynı işlevi
 * görür ama route'un statik/ISR olarak render edilmesini engellemez.
 */
export default function ConditionalChrome({
  navFooterData,
  children,
}: {
  navFooterData: NavFooterData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = (pathname ?? '').startsWith('/admin');

  return (
    <RouteTranslationProvider>
      <div className={`min-h-screen flex flex-col ${isAdmin ? '' : 'md:pt-12'}`}>
        {!isAdmin && <Topline />}
        {!isAdmin && <Navbar initialData={navFooterData} />}
        <main className={isAdmin ? 'flex-1 flex flex-col' : 'flex-1'}>{children}</main>
        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <Footer initialData={navFooterData} />}
      </div>
    </RouteTranslationProvider>
  );
}
