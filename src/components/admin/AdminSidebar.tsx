'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  Stethoscope,
  User,
  Home,
  LogOut,
  Newspaper,
  PresentationIcon,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'Genel Bakış',    href: '/admin/dashboard',      icon: LayoutDashboard },
  { label: 'Sağlık Rehberi', href: '/admin/saglik-rehberi', icon: FileText },
  { label: 'Tedaviler',       href: '/admin/tedaviler',      icon: Stethoscope },
  // { label: 'Basın & Medya',  href: '/admin/basin',          icon: Newspaper },
  // { label: 'Sunumlar',        href: '/admin/sunumlar',       icon: PresentationIcon },
  { label: 'Hakkımda',        href: '/admin/hakkimda',       icon: User },
  { label: 'Ana Sayfa',       href: '/admin/anasayfa',       icon: Home },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-100 min-h-screen flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-widest">Admin Paneli</p>
        <p className="text-sm text-slate-400 mt-0.5">nurullahermis.com</p>
      </div>

      {/* Navigasyon */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Alt butonlar */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-slate-400" />
          Siteyi Görüntüle
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-slate-400" />
          Çıkış Yap
        </button>
      </div>

    </aside>
  );
}