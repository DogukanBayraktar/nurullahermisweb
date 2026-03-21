'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { FadeIn } from "@/components/ui/fade-in";
import { articles } from '@/lib/articles';

const CATEGORIES = ['Tümü', ...Array.from(new Set(articles.map(a => a.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = activeCategory === 'Tümü' ? articles : articles.filter(a => a.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Sağlık Rehberi</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Makaleler ve Güncel Bilgiler</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. M. Nurullah Ermiş'in kaleme aldığı kapsamlı bilgilendirme yazıları.
            </p>
          </div>
        </FadeIn>

        {/* Filtre butonları */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.03]'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {cat}
                {cat !== 'Tümü' && (
                  <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {articles.filter(a => a.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">Bu kategoride henüz makale yok.</p>
          </div>
        ) : (
          <>
            {featured && (
              <FadeIn direction="up" delay={0.15}>
                <Link href={`/blog/${featured.slug}`} className="group block mb-8">
                  <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-400 flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                      <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-l" />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full uppercase tracking-widest">{featured.category}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors">{featured.title}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.desc}</p>
                      <span className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Devamını Oku <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {rest.map((a, i) => (
                  <FadeIn key={a.slug} delay={0.05 + i * 0.07} direction="up">
                    <Link href={`/blog/${a.slug}`} className="group block h-full">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-400 h-full flex flex-col">
                        <div className="h-48 relative overflow-hidden">
                          <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-600" />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-bold px-2.5 py-1 bg-white/90 backdrop-blur-sm text-blue-700 rounded-full uppercase tracking-widest shadow-sm">{a.category}</span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center text-slate-400 text-xs mb-3 font-medium gap-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.date}</span>
                            <span>{a.readTime}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-3 text-slate-900 leading-snug group-hover:text-blue-700 transition-colors flex-1">{a.title}</h3>
                          <p className="text-slate-500 text-sm mb-5 line-clamp-2 leading-relaxed">{a.desc}</p>
                          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                            Devamını Oku <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}