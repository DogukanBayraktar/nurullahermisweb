import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ArrowRight, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Ana Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src="/logo.svg" alt="Prof. Dr. Nurullah Ermiş" className="h-17 w-auto brightness-0 invert" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Ortopedi ve Travmatoloji alanında profesör unvanıyla; omurga cerrahisi, çocuk ortopedisi ve eklem protezi konularında ileri düzey cerrahi çözümler.
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com/eren_orthospine" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center transition-all text-slate-400 hover:text-white"><Instagram className="w-4 h-4" /></a>
              <a href="https://facebook.com/ortopediveomurga" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 flex items-center justify-center transition-all text-slate-400 hover:text-white"><Facebook className="w-4 h-4" /></a>
              <a href="https://youtube.com/@ortopediveomurga" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 flex items-center justify-center transition-all text-slate-400 hover:text-white"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Sayfalar</h3>
            <ul className="space-y-3">
              {[
                { href: "/hakkimda", label: "Prof. Dr. Nurullah Ermiş" },
                { href: "/tedaviler", label: "Tedavi Alanları" },
                { href: "/blog", label: "Makaleler" },
                { href: "/iletisim", label: "İletişim & Randevu" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tedaviler */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Tedavi Alanları</h3>
            <ul className="space-y-3">
              {[
                "Skolyoz & Kifoz Cerrahisi",
                "Bel & Boyun Fıtığı",
                "Diz & Kalça Protezi",
                "Çocuk Ortopedisi",
                "Deformite & Boy Uzatma",
              ].map((t) => (
                <li key={t}>
                  <Link href="/tedaviler" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">İletişim</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5"><MapPin className="w-4 h-4 text-blue-400" /></div>
                <div>
                  <p className="text-sm text-slate-300 font-medium">Eren Hastanesi</p>
                  <p className="text-xs text-slate-500 mt-0.5">Küçükbakkalköy, Kayışdağı Cd. No:57/A<br/>34750 Ataşehir / İstanbul</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-blue-400" /></div>
                <div>
                  <a href="tel:+905322051637" className="text-sm text-slate-300 hover:text-white transition-colors font-medium">0532 205 16 37</a>
                  <p className="text-xs text-slate-500 mt-0.5">Pzt - Cuma: 08:00 - 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-blue-400" /></div>
                <a href="mailto:nurullahermis@erenhastanesi.com" className="text-sm text-slate-300 hover:text-white transition-colors font-medium mt-2">nurullahermis@erenhastanesi.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt Çizgi */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Prof. Dr. M. Nurullah Ermiş. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}