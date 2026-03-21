'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="text-center max-w-lg">
        <FadeIn direction="up">
          <div className="mb-6 relative inline-block">
            <h1 className="text-9xl font-black text-blue-600/10">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">Bulunamadı</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Aradığınız sayfa mevcut değil</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Girmek istediğiniz sayfa kaldırılmış, adı değiştirilmiş ya da geçici olarak ulaşılamıyor olabilir. 
            Lütfen ana sayfaya dönerek tekrar deneyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 h-auto rounded-xl shadow-lg shadow-blue-600/20 gap-2">
                <Home className="w-4 h-4" /> Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
