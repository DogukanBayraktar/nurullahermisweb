// src/components/admin/TreatmentForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info, Trash2 } from 'lucide-react';
import { canonicalTreatmentSlug } from '@/lib/routes';
import ImageUpload from './ImageUpload';

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

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
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
  const [success, setSuccess] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);

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
    const canonical = form.slug.replace(/_tr$/, '').replace(/_en$/, '');
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
    setSuccess(false);
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
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/tedaviler');
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.');
      setSaving(false);
    }
  }

  const tabs = [
    { lang: 'tr' as const, label: 'Türkçe', flag: '🇹🇷' },
    { lang: 'en' as const, label: 'English', flag: '🇬🇧' },
  ];

  const handleAddList = (lang: 'tr' | 'en', field: 'stats' | 'treatment' | 'faq', template: any) => {
    setForm(lang, { [field]: [template, ...getForm(lang)[field]] });
  };

  const handleRemoveList = (lang: 'tr' | 'en', field: 'stats' | 'treatment' | 'faq', index: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    setForm(lang, { [field]: getForm(lang)[field].filter((_, i) => i !== index) });
    setDeleteNotify(true);
    setTimeout(() => setDeleteNotify(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-12">
      {/* Notifications */}
      <div className="fixed top-24 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        {success && (
          <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">Değişiklikler Başarıyla Kaydedildi!</span>
          </div>
        )}
        {deleteNotify && (
          <div className="bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm tracking-wide">Öğe Listeden Silindi.</span>
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <Info className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">{error}</span>
          </div>
        )}
      </div>

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
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Ortak Alanlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUpload 
            label="Kapak Görseli" 
            value={img} 
            onChange={(url) => setImg(url)} 
          />
          <div className="flex items-center gap-3 md:pt-8">
            <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="published" className="text-sm font-bold text-slate-700 cursor-pointer uppercase tracking-wide">Yayında</label>
          </div>
        </div>
      </div>

      {/* Dil bazlı içerik */}
      {tabs.map(({ lang }) => (
        <div key={lang} className={activeTab === lang ? 'space-y-6' : 'hidden'}>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Temel Bilgiler — {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">İstatistikler</h2>
              <button type="button" onClick={() => handleAddList(lang, 'stats', { label: '', val: '' })} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all">+ Ekle</button>
            </div>
            {getForm(lang).stats.map((stat, i) => (
              <div key={i} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                <input value={stat.label} onChange={(e) => setForm(lang, { stats: getForm(lang).stats.map((s, j) => j === i ? { ...s, label: e.target.value } : s) })}
                  placeholder={lang === 'tr' ? 'Etiket' : 'Label'} className={inputCls} />
                <input value={stat.val} onChange={(e) => setForm(lang, { stats: getForm(lang).stats.map((s, j) => j === i ? { ...s, val: e.target.value } : s) })}
                  placeholder="%90+" className={inputCls} />
                <button type="button" onClick={() => handleRemoveList(lang, 'stats', i)} className="text-slate-400 hover:text-red-600 p-2 transition-all"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>

          {/* Açıklama */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Açıklama (desc)</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Paragrafları boş satırla (Enter×2) ayır.</p>
            <textarea value={getForm(lang).descRaw} onChange={(e) => setForm(lang, { descRaw: e.target.value })}
              rows={8} className={inputCls}
              placeholder={lang === 'tr' ? 'Birinci paragraf...\n\nİkinci paragraf...' : 'First paragraph...\n\nSecond paragraph...'} />
          </div>

          {/* Belirtiler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Belirtiler</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Her satır ayrı bir belirtidir.</p>
            <textarea value={getForm(lang).symptomsRaw} onChange={(e) => setForm(lang, { symptomsRaw: e.target.value })}
              rows={4} className={inputCls}
              placeholder={lang === 'tr' ? 'Sırt ağrısı\nUyuşma' : 'Back pain\nNumbness'} />
          </div>

          {/* Tedavi Yöntemleri */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Tedavi Yöntemleri</h2>
              <button type="button" onClick={() => handleAddList(lang, 'treatment', { baslik: '', icerik: '' })} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all">+ Ekle</button>
            </div>
            {getForm(lang).treatment.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 space-y-3 relative group">
                <button type="button" onClick={() => handleRemoveList(lang, 'treatment', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button>
                <input value={t.baslik} onChange={(e) => setForm(lang, { treatment: getForm(lang).treatment.map((s, j) => j === i ? { ...s, baslik: e.target.value } : s) })}
                  placeholder={lang === 'tr' ? 'Yöntem başlığı' : 'Method title'} className={inputCls} />
                <textarea value={t.icerik} onChange={(e) => setForm(lang, { treatment: getForm(lang).treatment.map((s, j) => j === i ? { ...s, icerik: e.target.value } : s) })}
                  rows={4} placeholder={lang === 'tr' ? 'Açıklama' : 'Description'} className={inputCls} />
              </div>
            ))}
          </div>

          {/* SSS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Sıkça Sorulan Sorular</h2>
              <button type="button" onClick={() => handleAddList(lang, 'faq', { s: '', c: '' })} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all">+ Ekle</button>
            </div>
            {getForm(lang).faq.map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 space-y-3 relative group">
                <button type="button" onClick={() => handleRemoveList(lang, 'faq', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button>
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
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-3">
          <Info className="w-4 h-4" />
          💡 TR içeriği zorunlu. EN sekmesi boş bırakılırsa sadece Türkçe kaydedilir.
        </div>
      )}

      <div className="sticky bottom-4 flex items-center justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
        <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-slate-700 font-bold text-sm px-6 py-2.5 transition-all">İptal</button>
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
          {saving ? 'Kaydediliyor...' : isEdit ? 'Değişiklikleri Güncelle' : 'Tedaviyi Kaydet'}
        </button>
      </div>
    </form>
  );
}