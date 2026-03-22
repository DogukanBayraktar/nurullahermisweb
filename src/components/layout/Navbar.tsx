'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Phone, ArrowRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Sayfa değişiminde veya link tıklandığında menüyü kapat
  const closeMenu = () => setIsOpen(false);

  // Menü açıkken sayfa kaydırmayı engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımda', href: '/hakkimda' },
    { name: 'Tedaviler', href: '/tedaviler' },
    { name: 'Sağlık Rehberi', href: '/saglik-rehberi' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md md:top-9">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center">
          <img
            src="/logo.svg"
            alt="Prof. Dr. Nurullah Ermiş"
            className="h-16 md:h-18 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-[15px] font-bold text-slate-700">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:text-blue-700 transition-all duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Sağ - Masaüstü Randevu & Mobil Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/iletisim" className="hidden md:block">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-sky-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-sky-800 hover:via-sky-700 hover:to-cyan-600 hover:shadow-xl hover:shadow-cyan-700/20">
              <Calendar className="w-4 h-4" />
              <span>Randevu Al</span>
            </span>
          </Link>

          {/* Hamburger Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100 transition-all"
            aria-label="Menü"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 bottom-0 top-20 md:hidden bg-white z-[49] overflow-hidden border-t border-slate-100 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 py-10 space-y-8">
              {/* Links */}
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={closeMenu}
                      className="text-2xl font-extrabold text-slate-900 hover:text-blue-700 flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <hr className="border-slate-100" />

              {/* Contact Info in Mobile Menu */}
              <div className="space-y-6 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">İletişim Bilgileri</p>
                <div className="grid grid-cols-1 gap-4">
                  <a href="tel:+902163621415" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Merkez Telefon</p>
                      <p className="text-sm font-bold text-slate-900">0216 362 14 15</p>
                    </div>
                  </a>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-sm font-bold text-slate-900">Dil Seçimi</p>
                  <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700">
                    <Globe className="w-4 h-4" />
                    TR
                  </button>
                </div>

                <Link 
                  href="/iletisim" 
                  onClick={closeMenu}
                  className="w-full"
                >
                  <span className="flex w-full items-center justify-center gap-3 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-700 py-5 text-lg font-extrabold text-white shadow-xl shadow-sky-900/20 transition-all duration-200 active:scale-95">
                    <Calendar className="w-5 h-5" />
                    <span>Randevu Al</span>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Alt Bilgi */}
            <div className="p-8 bg-slate-50 text-center border-t border-slate-100">
               <p className="text-sm text-slate-500 font-medium">© 2026 Prof. Dr. M. Nurullah Ermiş</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
