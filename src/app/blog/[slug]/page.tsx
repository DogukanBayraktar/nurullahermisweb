import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, UserRound, Clock, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getAllArticles } from '@/sanity/queries';
import { articles as localArticles } from '@/lib/articles';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/client';

export const revalidate = 60;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Sanity'den çekmeyi dene
  let article = await getArticleBySlug(slug);
  let isLocal = false;

  // 2. Sanity'de yoksa yerel veriden çek
  if (!article) {
    const local = localArticles.find(a => a.slug === slug);
    if (local) {
      article = {
        title: local.title,
        slug: local.slug,
        category: local.category,
        summary: local.desc,
        content: null, // Yerel veride content yapısı farklı, aşağıda özel render edilecek
        _localContent: local, // Referans için
        readTime: local.readTime,
        publishedAt: local.date,
        coverImage: local.img,
      };
      isLocal = true;
    }
  }

  if (!article) notFound();

  // "Diğer yazılar" için Sanity + Local birleşimi (Öncekine benzer şekilde)
  // Basitlik için burada sadece linkler yeterli

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        <Link href="/blog" className="inline-flex items-center text-blue-600 font-semibold mb-8 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
          <ArrowLeft className="w-4 h-4 mr-2" /> Tüm Makalelere Dön
        </Link>

        {!isLocal && (
          <div className="mb-4 text-right">
             <Link href="/studio" className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded hover:bg-blue-100 italic transition-colors">
               Studio'da Düzenle
             </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main article */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">

              {/* Hero image */}
              <div className="w-full h-[280px] md:h-[420px] relative bg-slate-100">
                {article.coverImage ? (
                  <img src={article.coverImage} className="absolute inset-0 w-full h-full object-cover" alt={article.title} />
                ) : (
                  <div className="absolute inset-0 bg-blue-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 text-white">
                  <span className="inline-block text-[10px] font-bold px-3 py-1 bg-blue-600 rounded-full uppercase tracking-widest mb-3">{article.category}</span>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">{article.title}</h1>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium px-8 py-5 border-b border-slate-100 bg-slate-50/30">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-600" /> {article.publishedAt}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-600" /> {article.readTime}</span>
                <span className="flex items-center gap-1.5"><UserRound className="w-4 h-4 text-blue-600" /> Prof. Dr. M. Nurullah Ermiş</span>
              </div>

              <div className="p-8 md:p-12">
                {/* Intro */}
                <div className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-10 pb-8 border-b border-slate-100 italic">
                  {article.summary}
                </div>

                {/* Content Rendering */}
                {isLocal ? (
                  <div className="space-y-10">
                    {article._localContent.sections.map((section: any, i: number) => (
                      <section key={i}>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-50">
                          {section.h2}
                        </h2>
                        <div className="text-slate-600 leading-relaxed text-[1.05rem] space-y-3">
                          {section.content.split('\n\n').map((para: string, j: number) => (
                            <p key={j}>{para}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                    <PortableText 
                      value={article.content} 
                      components={{
                        types: {
                          image: ({ value }) => (
                            <div className="my-10 rounded-2xl overflow-hidden border border-slate-100 shadow-lg bg-slate-50">
                              <img src={urlFor(value).url()} alt="Görsel" className="w-full h-auto" />
                            </div>
                          ),
                        },
                        block: {
                          h2: ({children}) => <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-14 mb-6 pb-2 border-b-2 border-blue-50">{children}</h2>,
                          h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h3>,
                          normal: ({children}) => <p className="text-[1.1rem] mb-5 leading-relaxed">{children}</p>,
                        },
                      }}
                    />
                  </div>
                )}
                
                {/* Author Card ... */}
                <div className="mt-16 flex items-center gap-5 bg-slate-50 border border-slate-100 rounded-3xl p-8">
                  <img src="/nurullah-hoca1.avif" alt="Hoca" className="w-20 h-20 rounded-2xl object-cover object-top shrink-0 shadow-md" />
                  <div>
                    <p className="font-extrabold text-slate-900 text-lg">Prof. Dr. M. Nurullah Ermiş</p>
                    <p className="text-sm text-slate-500 mt-0.5">Ortopedi ve Omurga Cerrahisi Uzmanı</p>
                    <Link href="/hakkimda" className="text-blue-600 text-sm font-bold mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Özgeçmişini İncele <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </article>

          {/* Sidebar ... */}
          <aside className="lg:col-span-1">
             <div className="sticky top-28 bg-blue-600 rounded-2xl p-7 text-center text-white shadow-xl shadow-blue-500/20">
                <h4 className="text-lg font-bold mb-2">Randevu Talep Et</h4>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">Şikayetleriniz için profesyonel değerlendirme alın.</p>
                <Link href="/iletisim" className="block bg-white text-blue-700 font-extrabold py-3.5 px-4 rounded-xl hover:bg-blue-50 shadow-md text-sm">
                  Randevu Al
                </Link>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
}