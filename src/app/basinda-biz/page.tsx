'use client';

import Link from 'next/link';
import { ExternalLink, Newspaper, Radio, Tv } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FadeIn } from '@/components/ui/fade-in';
import { getLangFromPathname } from '@/lib/routes';

type PressItem = {
  outlet: string;
  title: string;
  summary: string;
  date: string;
  format: 'tv' | 'press' | 'radio';
  image: string;
  href: string;
};

type PageCopy = {
  badge: string;
  title: string;
  subtitle: string;
  archiveTitle: string;
  archiveText: string;
  items: PressItem[];
};

const copyByLang: Record<'tr' | 'en', PageCopy> = {
  tr: {
    badge: 'Basında Biz',
    title: 'Basında yer alan haberler ve röportajlar',
    subtitle:
      'Prof. Dr. Nurullah Ermiş hakkında yayınlanan haberler, röportajlar ve medya içerikleri.',
    archiveTitle: 'Yayın Arşivi',
    archiveText:
      'Kartlar kaynak yayına yönlendirmek için hazırlandı. Gerçek yayın linkleri eklendiğinde bu arşiv doğrudan kullanılabilir.',
    items: [
      {
        outlet: 'NTV Sağlık',
        title: 'Skolyozda erken tanı ve doğru takip neden önemli?',
        summary:
          'Omurga eğriliklerinde erken farkındalık, ailelerin dikkat etmesi gereken bulgular ve tedavi süreci üzerine uzman değerlendirmesi.',
        date: 'Mart 2025',
        format: 'tv',
        image: '/images/skolyoz-kifoz.avif',
        href: '#',
      },
      {
        outlet: 'Anadolu Sağlık Dergisi',
        title: 'Boyun ve bel fıtığında hangi belirtiler ciddiye alınmalı?',
        summary:
          'Günlük yaşamı etkileyen ağrı, uyuşma ve güç kaybı şikayetlerinde hangi noktada uzman görüşü alınması gerektiğine dair röportaj.',
        date: 'Ocak 2025',
        format: 'press',
        image: '/images/boyun-fitigi.avif',
        href: '#',
      },
      {
        outlet: 'Medical Update',
        title: 'Robotik diz ve kalça cerrahisine güncel bakış',
        summary:
          'Eklem cerrahisinde hassas planlama, hasta konforu ve iyileşme sürecine etkileri üzerine dijital yayın dosyası.',
        date: 'Kasım 2024',
        format: 'press',
        image: '/images/diz-kalca-protezi.avif',
        href: '#',
      },
      {
        outlet: 'TRT Radyo 1',
        title: 'Çocuklarda kalça gelişimi ve ortopedik takip',
        summary:
          'Ailelerin erken dönemde fark edebileceği bulgular ve çocuk ortopedisinde düzenli değerlendirmenin önemi üzerine canlı yayın konuşması.',
        date: 'Eylül 2024',
        format: 'radio',
        image: '/images/cocuk-ortopedisi.avif',
        href: '#',
      },
      {
        outlet: 'Habertürk Sağlık',
        title: 'Diz protezi sonrası hareket kabiliyeti nasıl toparlanır?',
        summary:
          'Eklem protezi sonrası iyileşme, yürüme süreci ve günlük yaşama dönüş hakkında uzman görüşü içeren haber dosyası.',
        date: 'Temmuz 2024',
        format: 'tv',
        image: '/images/diz-kalca-protezi.avif',
        href: '#',
      },
      {
        outlet: 'Sağlık Postası',
        title: 'Çocuk ortopedisinde erken değerlendirme neden belirleyici?',
        summary:
          'Büyüme çağındaki ortopedik sorunlarda gecikmeyen muayenenin tedavi planını nasıl değiştirdiğini anlatan özel içerik.',
        date: 'Mayıs 2024',
        format: 'press',
        image: '/images/cocuk-ortopedisi.avif',
        href: '#',
      },
      {
        outlet: 'CNN Türk',
        title: 'Boyun ağrısı ve kola vuran uyuşmada ne zaman uzmana gidilmeli?',
        summary:
          'Boyun fıtığı belirtileri, masa başı yaşamın etkileri ve doğru zamanda değerlendirme alınmasının önemi üzerine yayın.',
        date: 'Şubat 2024',
        format: 'tv',
        image: '/images/boyun-fitigi.avif',
        href: '#',
      },
    ],
  },
  en: {
    badge: 'In The Media',
    title: 'News coverage and media interviews',
    subtitle:
      'News features, interviews, and media appearances involving Prof. Dr. Nurullah Ermiş.',
    archiveTitle: 'Coverage Archive',
    archiveText:
      'The cards are structured to point directly to the source publication once real links are added.',
    items: [
      {
        outlet: 'NTV Health',
        title: 'Why are early diagnosis and proper follow-up so important in scoliosis?',
        summary:
          'Expert commentary on spinal curvature awareness, signs families should notice, and the treatment pathway.',
        date: 'March 2025',
        format: 'tv',
        image: '/images/skolyoz-kifoz.avif',
        href: '#',
      },
      {
        outlet: 'Anatolia Health Review',
        title: 'Which neck and lumbar disc symptoms should be taken seriously?',
        summary:
          'An interview on when pain, numbness, and loss of strength should lead to specialist evaluation.',
        date: 'January 2025',
        format: 'press',
        image: '/images/boyun-fitigi.avif',
        href: '#',
      },
      {
        outlet: 'Medical Update',
        title: 'A current perspective on robotic knee and hip surgery',
        summary:
          'A digital feature focused on precise planning, patient comfort, and recovery in joint surgery.',
        date: 'November 2024',
        format: 'press',
        image: '/images/diz-kalca-protezi.avif',
        href: '#',
      },
      {
        outlet: 'TRT Radio 1',
        title: 'Hip development and orthopedic follow-up in children',
        summary:
          'A live broadcast on early signs families can notice and the value of structured pediatric orthopedic evaluation.',
        date: 'September 2024',
        format: 'radio',
        image: '/images/cocuk-ortopedisi.avif',
        href: '#',
      },
      {
        outlet: 'Habertürk Health',
        title: 'How does mobility recover after knee replacement?',
        summary:
          'A feature on recovery, walking, and returning to daily life after joint replacement surgery.',
        date: 'July 2024',
        format: 'tv',
        image: '/images/diz-kalca-protezi.avif',
        href: '#',
      },
      {
        outlet: 'Health Post',
        title: 'Why is early evaluation so important in pediatric orthopedics?',
        summary:
          'A focused article on how timely assessment can reshape treatment planning during the growth period.',
        date: 'May 2024',
        format: 'press',
        image: '/images/cocuk-ortopedisi.avif',
        href: '#',
      },
      {
        outlet: 'CNN Türk',
        title: 'When should neck pain and arm numbness be evaluated by a specialist?',
        summary:
          'A media segment on cervical disc symptoms, desk-based lifestyle effects, and the value of timely assessment.',
        date: 'February 2024',
        format: 'tv',
        image: '/images/boyun-fitigi.avif',
        href: '#',
      },
    ],
  },
};

function getFormatIcon(format: PressItem['format']) {
  if (format === 'tv') return <Tv className="h-4 w-4" />;
  if (format === 'radio') return <Radio className="h-4 w-4" />;
  return <Newspaper className="h-4 w-4" />;
}

function getFormatLabel(format: PressItem['format'], lang: 'tr' | 'en') {
  if (lang === 'tr') {
    if (format === 'tv') return 'TV';
    if (format === 'radio') return 'Radyo';
    return 'Basın';
  }
  if (format === 'tv') return 'TV';
  if (format === 'radio') return 'Radio';
  return 'Press';
}

export default function BasindaBizPage() {
  const pathname = usePathname();
  const lang = getLangFromPathname(pathname || '/');
  const copy = copyByLang[lang];
  const [page, setPage] = useState(1);
  const [dbItems, setDbItems] = useState<PressItem[] | null>(null);

  // DB'den güncel verileri çek (varsa override et)
  useEffect(() => {
    fetch(`/api/public/basin?lang=${lang}`)
      .then((r) => r.json())
      .then((data: Array<{ outlet: string; title: string; summary: string; date: string; format: 'tv'|'press'|'radio'; image: string; href: string }>) => {
        if (Array.isArray(data) && data.length > 0) {
          setDbItems(data.map((d) => ({
            outlet: d.outlet,
            title: d.title,
            summary: d.summary,
            date: d.date,
            format: d.format,
            image: d.image,
            href: d.href,
          })));
        }
      })
      .catch(() => {/* DB hazır değilse hardcoded veriyle devam */});
  }, [lang]);

  const activeItems = dbItems ?? copy.items;
  const pageSize = 6;
  const pageCount = Math.ceil(activeItems.length / pageSize);
  const pagedItems = useMemo(
    () => activeItems.slice((page - 1) * pageSize, page * pageSize),
    [activeItems, page]
  );

  useEffect(() => {
    setPage(1);
  }, [lang]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-18 md:py-22">
        <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 8% 20%, rgba(186,230,253,0.75), transparent 24%), radial-gradient(circle at 92% 18%, rgba(125,211,252,0.55), transparent 22%), radial-gradient(circle at 22% 92%, rgba(207,250,254,0.72), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.78) 100%)',
          }}
        />
        <div className="section-grid absolute inset-0 opacity-[0.22] pointer-events-none" />
        <div className="absolute right-[-7rem] top-[-5rem] h-64 w-64 rounded-full bg-blue-100/75 blur-3xl" />
        <div className="absolute left-[-5rem] bottom-[-4rem] h-52 w-52 rounded-full bg-teal-100/75 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <FadeIn direction="up" delay={0.08}>
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{copy.badge}</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{copy.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-500">{copy.subtitle}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <FadeIn direction="up" delay={0.08}>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{copy.archiveTitle}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  {lang === 'tr' ? 'Basında yer alan tüm içerikler' : 'All published media items'}
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {pagedItems.map((item, index) => (
              <FadeIn key={`${item.outlet}-${item.title}`} delay={0.06 + index * 0.05} direction="up">
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-900/10 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                          {getFormatIcon(item.format)}
                          {getFormatLabel(item.format, lang)}
                        </div>
                        <span className="text-xs font-medium text-slate-400">{item.date}</span>
                      </div>

                      <p className="mb-2 text-sm font-semibold text-blue-600">{item.outlet}</p>
                      <h2 className="text-xl font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {item.title}
                      </h2>
                      <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{item.summary}</p>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors group-hover:text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                        {lang === 'tr' ? 'Kaynağa git' : 'Open source'}
                      </div>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-bold transition-all ${
                    page === pageNumber
                      ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
