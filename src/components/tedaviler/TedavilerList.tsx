'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FadeIn } from "@/components/ui/fade-in";

interface Treatment {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  description?: string[];
}

export default function TedavilerList({ initialTreatments }: { initialTreatments: Treatment[] }) {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = ['Tümü', ...Array.from(new Set(initialTreatments.map(t => t.category).filter(Boolean)))];

  const filtered = activeCategory === 'Tümü' 
    ? initialTreatments 
    : initialTreatments.filter(t => t.category === activeCategory);

  return (
    <>
      <FadeIn direction="up" delay={0.1}>
        <div className="flex flex-wrap gap-2.5 justify-center mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.05]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {cat}
              {cat !== 'Tümü' && (
                <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {initialTreatments.filter(t => t.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">Bu kategoride henüz tedavi bilgisi bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[220px] md:auto-rows-[250px]">
          {filtered.map((item, i) => {
            let gridClass = "md:col-span-4";
            
            if (activeCategory === 'Tümü') {
              if (i === 0) gridClass = "md:col-span-7 md:row-span-2";
              else if (i === 1) gridClass = "md:col-span-5 md:row-span-1";
              else if (i === 2) gridClass = "md:col-span-5 md:row-span-1";
              else if (i === 3) gridClass = "md:col-span-4 md:row-span-1";
              else if (i === 4) gridClass = "md:col-span-4 md:row-span-1";
              else gridClass = "md:col-span-4 md:row-span-1";
            }

            return (
              <FadeIn key={item._id} delay={0.05 + i * 0.08} direction="up" className={gridClass}>
                <Link href={`/tedaviler/${item.slug}`} className="group block h-full">
                  <div className="relative rounded-3xl overflow-hidden h-full border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 bg-white">
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      {item.category && (
                        <span className="inline-block text-[10px] font-bold px-2.5 py-1 bg-blue-500/30 border border-blue-400/30 text-blue-200 rounded-full uppercase tracking-widest mb-3 backdrop-blur-sm">
                          {item.category}
                        </span>
                      )}
                      <h3 className={`font-extrabold text-white mb-2 leading-tight ${gridClass.includes('col-span-7') ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                        {item.title}
                      </h3>
                      {item.description?.[0] && (
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-4 max-w-md">
                          {item.description[0]}
                        </p>
                      )}
                      <span className="text-blue-300 font-bold text-sm flex items-center gap-1.5 group-hover:gap-3 transition-all shrink-0">
                        Detaylı Bilgi <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      )}
    </>
  );
}
