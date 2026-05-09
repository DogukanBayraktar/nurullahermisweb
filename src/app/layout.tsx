import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topline from "@/components/layout/Topline";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import I18nRouteSync from "@/components/layout/I18nRouteSync";
import { headers } from "next/headers";
import { getStaticContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prof. Dr. Nurullah Ermiş | Ortopedi ve Omurga Cerrahisi Uzmanı",
  description: "Prof. Dr. Nurullah Ermiş - Ortopedi ve Travmatoloji Uzmanı. Skolyoz, bel fıtığı, boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanında uzman cerrahi çözümler. Eren Hastanesi, Ataşehir/İstanbul.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? '';
  const isAdmin = pathname.startsWith('/admin');

  const navFooterData = await getStaticContent('nav-footer.json');

  return (
    <html lang="tr">
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 ${isAdmin ? '' : 'md:pt-12'}`}
      >
        <I18nRouteSync />
        {!isAdmin && <Topline />}
        {!isAdmin && <Navbar initialData={navFooterData} />}
        <main className={isAdmin ? 'flex-1 flex flex-col' : 'flex-1'}>
          {children}
        </main>
        {!isAdmin && <WhatsAppButton />}
        {!isAdmin && <Footer initialData={navFooterData} />}
      </body>
    </html>
  );
}