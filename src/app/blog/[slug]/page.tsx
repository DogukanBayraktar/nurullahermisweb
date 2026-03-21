import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, UserRound, ChevronRight, Clock, Tag } from 'lucide-react';
import { articles } from '@/lib/articles';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  const otherArticles = articles.filter(a => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Makale bulunamadı</h1>
          <Link href="/blog" className="text-blue-600 font-semibold hover:underline">Tüm makalelere dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        <Link href="/blog" className="inline-flex items-center text-blue-600 font-semibold mb-8 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tüm Makalelere Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main article */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">

              {/* Hero image */}
              <div className="w-full h-[280px] md:h-[380px] relative">
                <img src={article.img} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <span className="inline-block text-[10px] font-bold px-3 py-1 bg-blue-600 text-white rounded-full uppercase tracking-widest mb-3">{article.category}</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{article.title}</h1>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium px-8 py-5 border-b border-slate-100">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-600" />{article.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-600" />{article.readTime}</span>
                <span className="flex items-center gap-1.5"><UserRound className="w-4 h-4 text-blue-600" />Prof. Dr. M. Nurullah Ermiş</span>
              </div>

              <div className="p-8 md:p-12">

                {/* Intro */}
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-10 pb-8 border-b border-slate-100">
                  {article.intro}
                </p>

                {/* Sections */}
                <div className="space-y-10">
                  {article.sections.map((section, i) => (
                    <section key={i}>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-50">
                        {section.h2}
                      </h2>
                      <div className="text-slate-600 leading-relaxed text-[1.05rem] space-y-3">
                        {section.content.split('\n\n').map((para, j) => {
                          // Bullet list desteği
                          if (para.includes('\n•')) {
                            const [intro, ...items] = para.split('\n•');
                            return (
                              <div key={j}>
                                {intro && <p className="mb-3">{intro}</p>}
                                <ul className="space-y-2">
                                  {items.map((item, k) => (
                                    <li key={k} className="flex items-start gap-2.5">
                                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                      <span>{item.trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          return <p key={j}>{para}</p>;
                        })}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Etiketler</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default">
                        <Tag className="w-3 h-3" />{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author card */}
                <div className="mt-10 flex items-center gap-5 bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <img
                    src="http://www.nurullahermis.com/assets/uploads/hakk%C4%B1mda/5f50b2218201e.jpg"
                    alt="Prof. Dr. M. Nurullah Ermiş"
                    className="w-16 h-16 rounded-2xl object-cover object-top shrink-0"
                  />
                  <div>
                    <p className="font-extrabold text-slate-900">Prof. Dr. M. Nurullah Ermiş</p>
                    <p className="text-sm text-slate-500 mt-0.5">Ortopedi ve Omurga Cerrahisi Uzmanı — Central Hospital, İstanbul</p>
                    <Link href="/hakkimda" className="text-blue-600 text-xs font-semibold mt-1.5 inline-flex items-center gap-1 hover:underline">
                      Özgeçmiş <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* CTA */}
              <div className="bg-blue-600 rounded-2xl p-6 text-center">
                <h4 className="text-lg font-bold text-white mb-2">Uzman Görüşü Alın</h4>
                <p className="text-blue-100 text-sm mb-5 leading-relaxed">Şikayetlerinizi Prof. Dr. Ermiş ile değerlendirin.</p>
                <Link href="/iletisim"
                  className="block bg-white text-blue-700 font-bold py-3 px-4 rounded-xl transition-all hover:bg-blue-50 shadow-md text-sm">
                  Randevu Al
                </Link>
              </div>

              {/* Related articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-5 border-b pb-3">İlgili Makaleler</h3>
                <div className="flex flex-col gap-5">
                  {otherArticles.map((a, i) => (
                    <Link href={`/blog/${a.slug}`} key={i} className="group flex gap-3 items-start">
                      <div className="w-20 h-16 shrink-0 rounded-xl overflow-hidden relative">
                        <img src={a.img} alt={a.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide block mb-1">{a.category}</span>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                          {a.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{a.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}