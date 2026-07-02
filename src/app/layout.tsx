import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import I18nRouteSync from "@/components/layout/I18nRouteSync";
import ConditionalChrome from "@/components/layout/ConditionalChrome";
import { getStaticContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Prof. Dr. Nurullah Ermiş | Ortopedi ve Omurga Cerrahisi Uzmanı",
  description: "Prof. Dr. Nurullah Ermiş - Ortopedi ve Travmatoloji Uzmanı. Skolyoz, bel fıtığı, boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanında uzman cerrahi çözümler. Eren Hastanesi, Ataşehir/İstanbul.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOT: Burada bilerek headers()/cookies() KULLANILMIYOR. Root layout tüm
  // route ağacını sardığı için, burada yapılacak bir headers() çağrısı
  // Next.js'i /tedaviler/[slug], /saglik-rehberi/[slug] gibi statik/ISR
  // olması gereken TÜM alt sayfaları da dynamic (SSR-per-request) render
  // etmeye zorlar ve Vercel edge cache'i her zaman MISS döner. Admin/site
  // ayrımı artık ConditionalChrome içinde client-side usePathname ile
  // yapılıyor; bu, statik render'ı bozmaz.
  const navFooterData = await getStaticContent('nav-footer.json');

  return (
    <html lang="tr">
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-912DXY8E7D"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-912DXY8E7D');
      `}
    </Script>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased bg-slate-50 text-slate-900`}
      >
        <I18nRouteSync />
        <ConditionalChrome navFooterData={navFooterData}>{children}</ConditionalChrome>
      </body>
    </html>
  );
}