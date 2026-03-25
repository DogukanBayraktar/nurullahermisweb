'use client';
import React from 'react';
import { Award, BookOpen, GraduationCap, Building, Star, ChevronRight, Phone, CheckCircle2, FileText, Globe, Users } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import { getLocalizedPath } from '@/lib/routes';

type TimelineItem = { year: string; title: string; subtitle?: string; type?: string };
type ExperienceItem = { period: string; title: string; subtitle: string };
type PublicationItem = { year: string; title: string; journal: string; authors: string };
type CertificateItem = { year: string; title: string };
type CongressItem = { year: string; title: string; topic: string };
type BookItem = { title: string; book: string; detail: string };
type BadgeItem = { label: string };
type ExpertiseItem = { title: string; desc: string };

export default function HakkimdaPage() {
  const { t, i18n } = useTranslation();

  const education = t('aboutPage.education.items', { returnObjects: true }) as TimelineItem[];
  const experience = t('aboutPage.experience.items', { returnObjects: true }) as ExperienceItem[];
  const publications = t('aboutPage.publications.items', { returnObjects: true }) as PublicationItem[];
  const certificates = t('aboutPage.certificates.items', { returnObjects: true }) as CertificateItem[];
  const congresses = t('aboutPage.congresses.items', { returnObjects: true }) as CongressItem[];
  const memberships = t('aboutPage.memberships.items', { returnObjects: true }) as string[];
  const books = t('aboutPage.books.items', { returnObjects: true }) as BookItem[];
  const heroBadges = t('aboutPage.hero.badges', { returnObjects: true }) as BadgeItem[];
  const expertiseItems = t('aboutPage.expertise.items', { returnObjects: true }) as ExpertiseItem[];

  const expertiseIcons = [
    <GraduationCap className="w-6 h-6" key="1" />,
    <Award className="w-6 h-6" key="2" />,
    <Users className="w-6 h-6" key="3" />,
    <BookOpen className="w-6 h-6" key="4" />,
  ];

  const badgeIcons = [
    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" key="1" />,
    <Globe className="w-4 h-4 text-blue-600" key="2" />,
    <Building className="w-4 h-4 text-blue-600" key="3" />,
    <FileText className="w-4 h-4 text-blue-600" key="4" />,
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 py-20">
        <div className="absolute inset-0 dotted-bg opacity-[0.03]" />
        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <FadeIn direction="right" delay={0.1} className="w-full lg:w-5/12">
              <div className="relative">
                <img
                  src="/nurullah-hoca3.avif"
                  alt={t('aboutPage.hero.imageAlt')}
                  className="relative aspect-[4/5] w-full rounded-3xl border-4 border-white object-cover object-top shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 z-20 hidden min-h-[124px] flex-col items-center justify-center rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-5 py-2.5 text-center shadow-[0_20px_50px_-30px_rgba(37,99,235,0.35)] md:flex">
                  <span className="text-3xl font-extrabold leading-none text-blue-600">20+</span>
                  <span className="mt-2 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-xs font-extrabold uppercase tracking-widest text-transparent">{t('aboutPage.hero.experienceLabel')}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2} className="w-full lg:w-7/12">
              <p className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{t('aboutPage.hero.badge')}</p>
              <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{t('aboutPage.hero.name')}</h1>
              <p className="mb-8 text-xl font-medium text-slate-500">{t('aboutPage.hero.title')}</p>
              <div className="mb-8 space-y-4 text-[1.05rem] leading-relaxed text-slate-600">
                <p>{t('aboutPage.hero.bio1')}</p>
                <p>{t('aboutPage.hero.bio2')}</p>
                <p>{t('aboutPage.hero.bio3')}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {heroBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
                    {badgeIcons[i] ?? <Star className="w-4 h-4 text-blue-600" />} {badge.label}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{t('aboutPage.education.badge')}</p>
            <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">{t('aboutPage.education.title')}</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <GraduationCap className="h-5 w-5 text-blue-600" /> {t('aboutPage.education.columnTitle')}
              </h3>
              <div className="space-y-0">
                {education.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i} direction="up">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-blue-500 bg-white" />
                        {i < education.length - 1 && <div className="mb-1 mt-1 flex-1 w-0.5 bg-slate-200" />}
                      </div>
                      <div className="pb-6">
                        <span className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-md shadow-blue-600/20">{item.year}</span>
                        <h4 className="mb-0.5 text-base font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <Building className="h-5 w-5 text-blue-600" /> {t('aboutPage.experience.columnTitle')}
              </h3>
              <div className="space-y-0">
                {experience.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i} direction="up">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${i === 0 ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`} />
                        {i < experience.length - 1 && <div className="mb-1 mt-1 flex-1 w-0.5 bg-slate-200" />}
                      </div>
                      <div className="pb-5">
                        <span className="mb-1 inline-block text-[11px] font-bold text-blue-600">{item.period}</span>
                        <h4 className="mb-0.5 text-base font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-bold text-slate-900">
              <Award className="h-5 w-5 text-blue-600" /> {t('aboutPage.certificates.title')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <FadeIn key={i} delay={0.05 * i} direction="up">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-100 hover:bg-blue-50/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <div>
                        <p className="mb-0.5 text-[11px] font-bold text-blue-600">{cert.year}</p>
                        <p className="text-sm font-semibold text-slate-800">{cert.title}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{t('aboutPage.expertise.badge')}</p>
            <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">{t('aboutPage.expertise.title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-500">{t('aboutPage.expertise.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {expertiseItems.map((card, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
                <div className="group flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-xl">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    {expertiseIcons[i]}
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold text-slate-900">{card.title}</h3>
                  <p className="text-xs font-medium leading-relaxed text-slate-500">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">{t('aboutPage.publications.badge')}</p>
            <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">{t('aboutPage.publications.title')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-500">{t('aboutPage.publications.subtitle')}</p>
          </div>
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <FadeIn key={i} delay={0.04 * i} direction="up">
                <div className="group flex gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-blue-100 hover:bg-blue-50/20">
                  <div className="shrink-0">
                    <span className="inline-block w-12 rounded-lg bg-blue-600 px-2 py-1.5 text-center text-xs font-bold text-white shadow-md shadow-blue-600/20">{pub.year}</span>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">{pub.title}</h4>
                    <p className="mb-1 text-xs font-semibold italic text-blue-600">{pub.journal}</p>
                    <p className="text-xs text-slate-500">{pub.authors}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 border-t border-slate-100 pt-10">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-bold text-slate-900">
              <BookOpen className="h-5 w-5 text-blue-600" /> {t('aboutPage.books.title')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {books.map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-slate-900">{b.title}</p>
                    <p className="text-xs text-slate-500">{b.book} — {b.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
                <Globe className="h-6 w-6 text-blue-600" /> {t('aboutPage.congresses.title')}
              </h2>
              <div className="space-y-5">
                {congresses.map((c, i) => (
                  <FadeIn key={i} delay={0.1 * i} direction="up">
                    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:border-blue-100 hover:shadow-md">
                      <span className="inline-block shrink-0 self-start rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/20">{c.year}</span>
                      <div>
                        <p className="mb-1 text-sm font-bold text-slate-900">{c.title}</p>
                        <p className="text-xs text-slate-500">{c.topic}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-8 flex items-center gap-2.5 text-2xl font-extrabold text-slate-900">
                <Users className="h-5 w-5 text-blue-600" /> {t('aboutPage.memberships.title')}
              </h2>
              <div className="space-y-3">
                {memberships.map((m, i) => (
                  <FadeIn key={i} delay={0.1 * i} direction="up">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-blue-100 hover:bg-blue-50/30">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                      <p className="text-sm font-semibold text-slate-800">{m}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <FadeIn direction="up">
            <div className="cta-bg relative overflow-hidden rounded-[2.5rem] p-12 text-center md:p-20">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
              <div className="hero-glow-1 pointer-events-none absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full opacity-10" />
              <div className="relative z-10">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">{t('aboutPage.cta.badge')}</p>
                <h2 className="mb-6 text-3xl font-extrabold text-white md:text-5xl">{t('aboutPage.cta.title')}</h2>
                <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-sky-200/70">{t('aboutPage.cta.subtitle')}</p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href={getLocalizedPath('contact', i18n.language)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-sky-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-sky-50"
                  >
                    {t('aboutPage.cta.primaryBtn')} <ChevronRight className="h-5 w-5" />
                  </Link>
                  <a
                    href="tel:+905322051637"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all hover:border-white/40 hover:bg-white/20"
                  >
                    <Phone className="h-5 w-5 text-sky-300" /> {t('aboutPage.cta.phone')}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
