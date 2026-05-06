// src/components/admin/TreatmentForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { canonicalTreatmentSlug } from '@/lib/routes';

type Stat = { label: string; val: string };
type TreatmentSection = { baslik: string; icerik: string };
type FaqItem = { s: string; c: string };

type LangForm = {
  title: string;
  slug: string;
  category: string;
  descRaw: string;
  symptomsRaw: string;
  stats: Stat[];
  treatment: TreatmentSection[];
  faq: FaqItem[];
};

type TreatmentFormProps = {
  defaultValues?: {
    id?: number;
    slug?: string;
    title?: string;
    img?: string;
    category?: string;
    stats?: Stat[];
    desc?: string[];
    symptoms?: string[];
    treatment?: TreatmentSection[];
    faq?: FaqItem[];
    published?: boolean;
    lang?: string;
    pairId?: number;
    pairSlug?: string;
    pairTitle?: string;
    pairCategory?: string;
    pairDesc?: string[];
    pairSymptoms?: string[];
    pairStats?: Stat[];
    pairTreatment?: TreatmentSection[];
    pairFaq?: FaqItem[];
  };
};

const inputCls = 'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function TreatmentForm({ defaultValues = {} }: TreatmentFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;
  const primaryLang = (defaultValues.lang ?? 'tr') as 'tr' | 'en';

  const [activeTab, setActiveTab] = useState<'tr' | 'en'>(primaryLang);
  const [img, setImg] = useState(defaultValues.img ?? '');
  const [published, setPublished] = useState(defaultValues.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [trForm, setTrForm] = useState<LangForm>(() =>
    primaryLang === 'tr'
      ? {
          title: defaultValues.title ?? '',
          slug: (defaultValues.slug ?? '').replace(/_tr$/, '').replace(/_en$/, ''),
          category: defaultValues.category ?? '',
          descRaw: (defaultValues.desc ?? []).join('\n\n'),
          symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
          stats: defaultValues.stats ?? [{ label: '', val: '' }],
          treatment: defaultValues.treatment ?? [{ baslik: '', icerik: '' }],
          faq: defaultValues.faq ?? [{ s: '', c: '' }],
        }
      : {
          title: defaultValues.pairTitle ?? '',
          slug: (defaultValues.pairSlug ?? '').replace(/_tr$/, '').replace(/_en$/, ''),
          category: defaultValues.pairCategory ?? '',
          descRaw: (defaultValues.pairDesc ?? []).join('\n\n'),
          symptomsRaw: (defaultValues.pairSymptoms ?? []).join('\n'),
          stats: defaultValues.pairStats ?? [{ label: '', val: '' }],
          treatment: defaultValues.pairTreatment ?? [{ baslik: '', icerik: '' }],
          faq: defaultValues.pairFaq ?? [{ s: '', c: '' }],
        }
  );

  const [enForm, setEnForm] = useState<LangForm>(() =>
    primaryLang === 'en'
      ? {
          title: defaultValues.title ?? '',
          slug: (defaultValues.slug ?? '').replace(/_tr$/, '').replace(/_en$/, ''),
          category: defaultValues.category ?? '',
          descRaw: (defaultValues.desc ?? []).join('\n\n'),
          symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
          stats: defaultValues.stats ?? [{ label: '', val: '' }],
          treatment: defaultValues.treatment ?? [{ baslik: '', icerik: '' }],
          faq: defaultValues.faq ?? [{ s: '', c: '' }],
        }
      : {
          title: defaultValues.pairTitle ?? '',
          slug: (defaultValues.pairSlug ?? '').replace(/_tr$/, '').replace(/_en$/, ''),
          category: defaultValues.pairCategory ?? '',
          descRaw: (defaultValues.pairDesc ?? []).join('\n\n'),
          symptomsRaw: (defaultValues.pairSymptoms ?? []).join('\n'),
          stats: defaultValues.pairStats ?? [{ label: '', val: '' }],
          treatment: defaultValues.pairTreatment ?? [{ baslik: '', icerik: '' }],
          faq: defaultValues.pairFaq ?? [{ s: '', c: '' }],
        }
  );

  const getForm = (lang: 'tr' | 'en') => lang === 'tr' ? trForm : enForm;
  const setForm = (lang: 'tr' | 'en', update: Partial<LangForm>) => {
    if (lang === 'tr') setTrForm((f) => ({ ...f, ...update }));
    else setEnForm((f) => ({ ...f, ...update }));
  };

  function buildPayload(form: LangForm, lang: 'tr' | 'en') {
    const canonical = lang === 'tr'
      ? form.slug.replace(/_tr$/, '').replace(/_en$/, '')
      : canonicalTreatmentSlug(form.slug.replace(/_tr$/, '').replace(/_en$/, ''));
    return {
      slug: lang === 'tr' ? canonical : `${canonical}_en`,
      title: form.title,
      img,
      images: [],
      category: form.category,
      published,
      desc: form.descRaw.split('\n\n').map((p) => p.trim()).filter(Boolean),
      symptoms: form.symptomsRaw.split('\n').map((s) => s.trim()).filter(Boolean),
      stats: form.stats,
      treatment: form.treatment,
      faq: form.faq,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const trPayload = buildPayload(trForm, 'tr');
      const enPayload = buildPayload(enForm, 'en');

      if (isEdit) {
        const primaryPayload = primaryLang === 'tr' ? trPayload : enPayload;
        const r1 = await fetch(`/api/admin/tedaviler/${defaultValues.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(primaryPayload),
        });
        if (!r1.ok) throw new Error((await r1.json()).error ?? 'Güncelleme hatası');

        const secondaryPayload = primaryLang === 'tr' ? enPayload : trPayload;
        if (defaultValues.pairId) {
          const r2 = await fetch(`/api/admin/tedaviler/${defaultValues.pairId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!r2.ok) throw new Error((await r2.json()).error ?? 'Karşı dil güncelleme hatası');
        } else if (secondaryPayload.title) {
          const r2 = await fetch('/api/admin/tedaviler', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!r2.ok) throw new Error((await r2.json()).error ?? 'EN oluşturma hatası');
        }
      } else {
        const r1 = await fetch('/api/admin/tedaviler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trPayload),
        });
        if (!r1.ok) throw new Error((await r1.json()).error ?? 'TR kayıt hatası');
        if (enForm.title) {
          const r2 = await fetch('/api/admin/tedaviler', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enPayload),
          });
          if (!r2.ok) throw new Error((await r2.json()).error ?? 'EN kayıt hatası');
        }
      }
      router.push('/admin/tedaviler');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.');
      setSaving(false);
    }
  }

  const tabs = [
    { lang: 'tr' as const, label: 'Türkçe', flag: '🇹🇷' },
    { lang: 'en' as const, label: 'English', flag: '🇬🇧' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

      {/* Sekme */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ lang, label, flag }) => (
          <button key={lang} type="button" onClick={() => setActiveTab(lang)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === lang ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {flag} {label}
            {lang === 'en' && getForm('en').title && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
          </button>
        ))}
      </div>

      {/* Ortak */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Ortak Alanlar</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Görsel URL">
            <input value={img} onChange={(e) => setImg(e.target.value)} placeholder="/images/tedavi.avif" className={inputCls} />
          </Field>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="rounded" />
              <span className="text-sm text-slate-700">Yayınla</span>
            </label>
          </div>
        </div>
      </div>

      {/* Dil bazlı içerik */}
      {tabs.map(({ lang }) => (
        <div key={lang} className={activeTab === lang ? 'space-y-6' : 'hidden'}>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700">Temel — {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Başlık" required={lang === 'tr'}>
                <input value={getForm(lang).title} onChange={(e) => setForm(lang, { title: e.target.value })}
                  placeholder={lang === 'tr' ? 'Tedavi başlığı' : 'Treatment title'} className={inputCls} required={lang === 'tr'} />
              </Field>
              <Field label="Slug" required={lang === 'tr'}>
                <input value={getForm(lang).slug}
                  onChange={(e) => setForm(lang, { slug: e.target.value.replace(/_tr$/, '').replace(/_en$/, '') })}
                  placeholder={lang === 'tr' ? 'tedavi-slug' : 'treatment-slug'} className={inputCls} required={lang === 'tr'} />
              </Field>
            </div>
            <Field label="Kategori">
              <input value={getForm(lang).category} onChange={(e) => setForm(lang, { category: e.target.value })}
                placeholder={lang === 'tr' ? 'Omurga Cerrahisi' : 'Spine Surgery'} className={inputCls} />
            </Field>
          </div>

          {/* İstatistikler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-700">İstatistikler</h2>
              <button type="button" onClick={() => setForm(lang, { stats: [...getForm(lang).stats, { label: '', val: '' }] })} className="text-xs text-blue-600 font-medium">+ Ekle</button>
            </div>
            {getForm(lang).stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 items-center">
                <input value={stat.label} onChange={(e) => setForm(lang, { stats: getForm(lang).stats.map((s, j) => j === i ? { ...s, label: e.target.value } : s) })}
                  placeholder={lang === 'tr' ? 'Etiket' : 'Label'} className={inputCls} />
                <div className="flex gap-2">
                  <input value={stat.val} onChange={(e) => setForm(lang, { stats: getForm(lang).stats.map((s, j) => j === i ? { ...s, val: e.target.value } : s) })}
                    placeholder="%90+" className={inputCls} />
                  {getForm(lang).stats.length > 1 && (
                    <button type="button" onClick={() => setForm(lang, { stats: getForm(lang).stats.filter((_, j) => j !== i) })} className="text-red-400 text-xs px-2">Sil</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Açıklama */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-1">Açıklama (desc)</h2>
            <p className="text-xs text-slate-400 mb-3">Paragrafları boş satırla (Enter×2) ayır.</p>
            <textarea value={getForm(lang).descRaw} onChange={(e) => setForm(lang, { descRaw: e.target.value })}
              rows={10} className={inputCls}
              placeholder={lang === 'tr' ? 'Birinci paragraf...\n\nİkinci paragraf...' : 'First paragraph...\n\nSecond paragraph...'} />
          </div>

          {/* Belirtiler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-1">Belirtiler</h2>
            <p className="text-xs text-slate-400 mb-3">Her satır ayrı belirti.</p>
            <textarea value={getForm(lang).symptomsRaw} onChange={(e) => setForm(lang, { symptomsRaw: e.target.value })}
              rows={5} className={inputCls}
              placeholder={lang === 'tr' ? 'Sırt ağrısı\nUyuşma' : 'Back pain\nNumbness'} />
          </div>

          {/* Tedavi Yöntemleri */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-700">Tedavi Yöntemleri</h2>
              <button type="button" onClick={() => setForm(lang, { treatment: [...getForm(lang).treatment, { baslik: '', icerik: '' }] })} className="text-xs text-blue-600 font-medium">+ Ekle</button>
            </div>
            {getForm(lang).treatment.map((t, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Yöntem {i + 1}</span>
                  {getForm(lang).treatment.length > 1 && (
                    <button type="button" onClick={() => setForm(lang, { treatment: getForm(lang).treatment.filter((_, j) => j !== i) })} className="text-xs text-red-400">Sil</button>
                  )}
                </div>
                <input value={t.baslik} onChange={(e) => setForm(lang, { treatment: getForm(lang).treatment.map((s, j) => j === i ? { ...s, baslik: e.target.value } : s) })}
                  placeholder={lang === 'tr' ? 'Yöntem başlığı' : 'Method title'} className={inputCls} />
                <textarea value={t.icerik} onChange={(e) => setForm(lang, { treatment: getForm(lang).treatment.map((s, j) => j === i ? { ...s, icerik: e.target.value } : s) })}
                  rows={4} placeholder={lang === 'tr' ? 'Açıklama' : 'Description'} className={inputCls} />
              </div>
            ))}
          </div>

          {/* SSS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-700">Sıkça Sorulan Sorular</h2>
              <button type="button" onClick={() => setForm(lang, { faq: [...getForm(lang).faq, { s: '', c: '' }] })} className="text-xs text-blue-600 font-medium">+ Ekle</button>
            </div>
            {getForm(lang).faq.map((f, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400">Soru {i + 1}</span>
                  {getForm(lang).faq.length > 1 && (
                    <button type="button" onClick={() => setForm(lang, { faq: getForm(lang).faq.filter((_, j) => j !== i) })} className="text-xs text-red-400">Sil</button>
                  )}
                </div>
                <input value={f.s} onChange={(e) => setForm(lang, { faq: getForm(lang).faq.map((q, j) => j === i ? { ...q, s: e.target.value } : q) })}
                  placeholder={lang === 'tr' ? 'Soru' : 'Question'} className={inputCls} />
                <textarea value={f.c} onChange={(e) => setForm(lang, { faq: getForm(lang).faq.map((q, j) => j === i ? { ...q, c: e.target.value } : q) })}
                  rows={3} placeholder={lang === 'tr' ? 'Cevap' : 'Answer'} className={inputCls} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isEdit && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
          💡 TR içeriği zorunlu. EN sekmesi isteğe bağlı — boş bırakılırsa sadece Türkçe kaydedilir.
        </div>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-xl text-sm">
          {saving ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
        </button>
        <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-slate-700 text-sm px-4 py-2.5">İptal</button>
      </div>
    </form>
  );
}