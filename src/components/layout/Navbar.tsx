import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-9 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.svg"
            alt="Prof. Dr. Nurullah Ermiş"
            className="h-17 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-blue-700 transition-colors">Ana Sayfa</Link>
          <Link href="/hakkimda" className="hover:text-blue-700 transition-colors">Hakkımda</Link>
          <Link href="/tedaviler" className="hover:text-blue-700 transition-colors">Tedaviler</Link>
          <Link href="/blog" className="hover:text-blue-700 transition-colors">Makaleler</Link>
          <Link href="/iletisim" className="hover:text-blue-700 transition-colors">İletişim</Link>
        </nav>

        {/* Sağ — sadece randevu butonu */}
        <div className="flex items-center gap-3">
          <Link href="/iletisim" className="hidden md:block">
            <span className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/25 hover:scale-[1.02]">
              Randevu Al
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

      </div>
    </header>
  );
}