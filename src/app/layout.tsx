import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topline from "@/components/layout/Topline";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prof. Dr. M. Nurullah Ermiş | Ortopedi ve Omurga Cerrahisi Uzmanı",
  description: "Prof. Dr. M. Nurullah Ermiş - Ortopedi ve Travmatoloji Uzmanı. Skolyoz, bel fıtığı, boyun fıtığı, diz-kalça protezi ve çocuk ortopedisi alanında uzman cerrahi çözümler. Eren Hastanesi, Ataşehir/İstanbul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* pt-9 = topline yüksekliği (36px = h-9) */}
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 pt-9`}>
        <Topline />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}