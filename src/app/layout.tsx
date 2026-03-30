import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topline from "@/components/layout/Topline";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import I18nRouteSync from "@/components/layout/I18nRouteSync";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prof. Dr. Nurullah Ermiş | Ortopedi ve Omurga Cerrahisi Uzmanı",
  description: "Prof. Dr. Nurullah Ermiş - Ortopedi ve Travmatoloji Uzmanı. Skolyoz, bel fıtığı, boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanında uzman cerrahi çözümler. Eren Hastanesi, Ataşehir/İstanbul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* md:pt-12 = topline yüksekliği (48px = h-12) */}
      <body suppressHydrationWarning className={`${inter.className} min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 md:pt-12`}>
        <I18nRouteSync />
        <Topline />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}