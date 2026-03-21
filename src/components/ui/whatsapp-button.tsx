'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Tooltip style label */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-xl font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 border border-slate-100 pointer-events-none">
        WhatsApp ile Randevu Al
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-slate-100 rotate-45" />
      </div>
      
      {/* Main button */}
      <a
        href="https://wa.me/905322051637"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-2xl shadow-green-500/40 hover:bg-[#128C7E] hover:scale-110 active:scale-95 transition-all duration-300 relative"
        title="WhatsApp'tan Bize Ulaşın"
      >
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-25" />
        <FaWhatsapp size={36} className="relative z-10" />
      </a>
    </div>
  );
}
