// src/components/admin/TreatmentForm.tsx
'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';

function stripSlugSuffix(slug: string): string {
  if (!slug) return '';
  return slug.replace(/_tr$/, '').replace(/_en$/, '');
}

type Stat = { label: string; val: string };
type TreatmentPatient = { hastaAdi: string; img?: string; gallery?: any[] };
type TreatmentSubSection = { baslik: string; icerik: string; patients?: TreatmentPatient[] };
type TreatmentSection = { baslik: string; icerik: string; submethods?: TreatmentSubSection[] };
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
    images?: string[];
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
    pairImages?: string[];
  };
};

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
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

  // Tedavi galerisi görselleri (Sonuç / Öncesi-Sonrası)
  const [images, setImages] = useState<string[]>(() => {
    if (Array.isArray(defaultValues.images) && defaultValues.images.length > 0) {
      return defaultValues.images;
    }
    if (Array.isArray(defaultValues.pairImages) && defaultValues.pairImages.length > 0) {
      return defaultValues.pairImages;
    }
    return [];
  });
  const [showAddGallery, setShowAddGallery] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);

  // Başlangıç TR formu
  const initialTr = useMemo<LangForm>(
    () =>
      primaryLang === 'tr'
        ? {
            title: defaultValues.title ?? '',
            slug: stripSlugSuffix(defaultValues.slug ?? ''),
            category: defaultValues.category ?? '',
            descRaw: (defaultValues.desc ?? []).join('\n\n'),
            symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
            stats: defaultValues.stats ?? [{ label: '', val: '' }],
            treatment: (defaultValues.treatment as any) ?? [{ baslik: '', icerik: '' }],
            faq: defaultValues.faq ?? [{ s: '', c: '' }],
          }
        : {
            title: defaultValues.pairTitle ?? '',
            slug: stripSlugSuffix(defaultValues.pairSlug ?? ''),
            category: defaultValues.pairCategory ?? '',
            descRaw: (defaultValues.pairDesc ?? []).join('\n\n'),
            symptomsRaw: (defaultValues.pairSymptoms ?? []).join('\n'),
            stats: defaultValues.pairStats ?? [{ label: '', val: '' }],
            treatment: (defaultValues.pairTreatment as any) ?? [{ baslik: '', icerik: '' }],
            faq: defaultValues.pairFaq ?? [{ s: '', c: '' }],
          },
    [defaultValues, primaryLang]
  );

  // Başlangıç EN formu
  const initialEn = useMemo<LangForm>(
    () =>
      primaryLang === 'en'
        ? {
            title: defaultValues.title ?? '',
            slug: stripSlugSuffix(defaultValues.slug ?? ''),
            category: defaultValues.category ?? '',
            descRaw: (defaultValues.desc ?? []).join('\n\n'),
            symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
            stats: defaultValues.stats ?? [{ label: '', val: '' }],
            treatment: (defaultValues.treatment as any) ?? [{ baslik: '', icerik: '' }],
            faq: defaultValues.faq ?? [{ s: '', c: '' }],
          }
        : {
            title: defaultValues.pairTitle ?? '',
            slug: stripSlugSuffix(defaultValues.pairSlug ?? ''),
            category: defaultValues.pairCategory ?? '',
            descRaw: (defaultValues.pairDesc ?? []).join('\n\n'),
            symptomsRaw: (defaultValues.pairSymptoms ?? []).join('\n'),
            stats: defaultValues.pairStats ?? [{ label: '', val: '' }],
            treatment: (defaultValues.pairTreatment as any) ?? [{ baslik: '', icerik: '' }],
            faq: defaultValues.pairFaq ?? [{ s: '', c: '' }],
          },
    [defaultValues, primaryLang]
  );

  const [trForm, setTrForm] = useState<LangForm>(initialTr);
  const [enForm, setEnForm] = useState<LangForm>(initialEn);

  // Başlangıç state'lerini referans olarak sakla (Değişiklik tespiti için)
  const initialTrRef = useRef(initialTr);
  const initialEnRef = useRef(initialEn);
  const initialSharedRef = useRef({
    img: defaultValues.img ?? '',
    images: Array.isArray(defaultValues.images) && defaultValues.images.length > 0
      ? defaultValues.images
      : defaultValues.pairImages ?? [],
    published: defaultValues.published ?? true,
  });

  const isTrModified = () => JSON.stringify(trForm) !== JSON.stringify(initialTrRef.current);
  const isEnModified = () => JSON.stringify(enForm) !== JSON.stringify(initialEnRef.current);
  const isSharedModified = () =>
    img !== initialSharedRef.current.img ||
    published !== initialSharedRef.current.published ||
    JSON.stringify(images) !== JSON.stringify(initialSharedRef.current.images);

  const getForm = (lang: 'tr' | 'en') => (lang === 'tr' ? trForm : enForm);
  const setForm = (lang: 'tr' | 'en', update: Partial<LangForm>) => {
    if (lang === 'tr') setTrForm((f) => ({ ...f, ...update }));
    else setEnForm((f) => ({ ...f, ...update }));
  };

  const updateTreatmentList = (
    lang: 'tr' | 'en',
    updater: (prev: LangForm['treatment']) => LangForm['treatment']
  ) => {
    if (lang === 'tr') setTrForm((f) => ({ ...f, treatment: updater(f.treatment) }));
    else setEnForm((f) => ({ ...f, treatment: updater(f.treatment) }));
  };

  function buildPayload(form: LangForm, lang: 'tr' | 'en') {
    const canonical = stripSlugSuffix(form.slug || form.title);
    return {
      slug: lang === 'tr' ? canonical : `${canonical}_en`,
      lang,
      title: form.title,
      img,
      images, // Galeri görselleri form state'inde korunur
      category: form.category,
      published,
      desc: form.descRaw
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean),
      symptoms: form.symptomsRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
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
      const hasEnTitle = Boolean(enForm.title?.trim());
      const enPayload = hasEnTitle ? buildPayload(enForm, 'en') : null;

      const trId = primaryLang === 'tr' ? defaultValues.id : defaultValues.pairId;
      const enId = primaryLang === 'en' ? defaultValues.id : defaultValues.pairId;

      // İki dil tek bir atomik API isteği üzerinden kaydedilir.
      // Prisma $transaction sayesinde ikisi birlikte başarılı olur veya ikisi de geri alınır.
      const res = await fetch('/api/admin/tedaviler/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tr: {
            id: trId,
            ...trPayload,
            isModified: !isEdit || isTrModified(),
          },
          en: enPayload
            ? {
                id: enId,
                ...enPayload,
                isModified: !isEdit || isEnModified(),
              }
            : null,
          shared: {
            img,
            images,
            published,
            isModified: !isEdit || isSharedModified(),
            // Bu admin sayfasında asıl düzenlenen kayıt hangi dil ise onu belirtir.
            // Sunucu, kapak görseli/galeriyi karşı dilin (pair) kaydına ZORLA yazmaz;
            // pair'in kendi görselleri varsa dokunmaz, sadece boşsa doldurur.
            primaryLang,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? 'Kaydetme sırasında bir hata oluştu.');
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

      {/* Sekmeler */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ lang, label, flag }) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveTab(lang)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === lang ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {flag} {label}
            {lang === 'en' && getForm('en').title && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
          </button>
        ))}
      </div>

      {/* Ortak Alanlar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ortak Alanlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <ImageUpload
            label="Kapak Görseli"
            value={img}
            onChange={(url) => setImg(url)}
          />
          <div className="flex items-center gap-3 md:pt-8">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-bold text-slate-700 cursor-pointer uppercase tracking-wide">
              Yayında
            </label>
          </div>
        </div>

        {/* Tedavi Galerisi (Sonuç / Öncesi-Sonrası Görselleri) */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Tedavi Galerisi (Sonuç / Öncesi-Sonrası Görselleri)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tedaviye ait sonuç görselleri ({images.length} görsel kayıtlı)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddGallery(!showAddGallery)}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" /> {showAddGallery ? 'Kapat' : 'Yeni Görsel Ekle'}
            </button>
          </div>

          {/* Yeni Galeri Görseli Ekleme Alanı */}
          {showAddGallery && (
            <div className="mb-4 p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-3">
              <p className="text-xs font-semibold text-blue-900">Yeni Galeri Görseli Yükle:</p>
              <ImageUpload
                value=""
                onChange={(url) => {
                  if (url) {
                    setImages((prev) => [...prev, url]);
                    setShowAddGallery(false);
                  }
                }}
              />
            </div>
          )}

          {/* Mevcut Galeri Görselleri Grid */}
          {images.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
              Henüz galeri görseli eklenmemiş. Yukarıdaki &quot;Yeni Görsel Ekle&quot; butonunu kullanarak görsel ekleyebilirsiniz.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={imgUrl} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Bu galeri görselini listeden çıkarmak istediğinize emin misiniz?')) {
                          setImages((prev) => prev.filter((_, i) => i !== idx));
                        }
                      }}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all transform hover:scale-110 shadow"
                      title="Görseli Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-900/70 text-white">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dil bazlı içerik */}
      {tabs.map(({ lang }) => (
        <div key={lang} className={activeTab === lang ? 'space-y-6' : 'hidden'}>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Temel Bilgiler — {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Başlık" required={lang === 'tr'}>
                <input
                  value={getForm(lang).title}
                  onChange={(e) => setForm(lang, { title: e.target.value })}
                  placeholder={lang === 'tr' ? 'Tedavi başlığı' : 'Treatment title'}
                  className={inputCls}
                  required={lang === 'tr'}
                />
              </Field>
              <Field label="Slug" required={lang === 'tr'}>
                <input
                  value={getForm(lang).slug}
                  onChange={(e) =>
                    setForm(lang, { slug: stripSlugSuffix(e.target.value) })
                  }
                  placeholder={lang === 'tr' ? 'tedavi-slug' : 'treatment-slug'}
                  className={inputCls}
                  required={lang === 'tr'}
                />
              </Field>
            </div>
            <Field label="Kategori">
              <input
                value={getForm(lang).category}
                onChange={(e) => setForm(lang, { category: e.target.value })}
                placeholder={lang === 'tr' ? 'Omurga Cerrahisi' : 'Spine Surgery'}
                className={inputCls}
              />
            </Field>
          </div>

          {/* İstatistikler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">İstatistikler</h2>
              <button
                type="button"
                onClick={() => handleAddList(lang, 'stats', { label: '', val: '' })}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
              >
                + Ekle
              </button>
            </div>
            {getForm(lang).stats.map((stat, i) => (
              <div key={i} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                <input
                  value={stat.label}
                  onChange={(e) =>
                    setForm(lang, {
                      stats: getForm(lang).stats.map((s, j) => (j === i ? { ...s, label: e.target.value } : s)),
                    })
                  }
                  placeholder={lang === 'tr' ? 'Etiket' : 'Label'}
                  className={inputCls}
                />
                <input
                  value={stat.val}
                  onChange={(e) =>
                    setForm(lang, {
                      stats: getForm(lang).stats.map((s, j) => (j === i ? { ...s, val: e.target.value } : s)),
                    })
                  }
                  placeholder="%90+"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveList(lang, 'stats', i)}
                  className="text-slate-400 hover:text-red-600 p-2 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Açıklama */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Açıklama (desc)</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Paragrafları boş satırla (Enter×2) ayır.
            </p>
            <textarea
              value={getForm(lang).descRaw}
              onChange={(e) => setForm(lang, { descRaw: e.target.value })}
              rows={8}
              className={inputCls}
              placeholder={
                lang === 'tr'
                  ? 'Birinci paragraf...\n\nİkinci paragraf...'
                  : 'First paragraph...\n\nSecond paragraph...'
              }
            />
          </div>

          {/* Belirtiler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Belirtiler</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Her satır ayrı bir belirtidir.
            </p>
            <textarea
              value={getForm(lang).symptomsRaw}
              onChange={(e) => setForm(lang, { symptomsRaw: e.target.value })}
              rows={4}
              className={inputCls}
              placeholder={lang === 'tr' ? 'Sırt ağrısı\nUyuşma' : 'Back pain\nNumbness'}
            />
          </div>

          {/* Tedavi Yöntemleri */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Tedavi Yöntemleri</h2>
              <button
                type="button"
                onClick={() => handleAddList(lang, 'treatment', { baslik: '', icerik: '' })}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
              >
                + Ekle
              </button>
            </div>
            {getForm(lang).treatment.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleRemoveList(lang, 'treatment', i)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <input
                  value={t.baslik}
                  onChange={(e) =>
                    setForm(lang, {
                      treatment: getForm(lang).treatment.map((s, j) =>
                        j === i ? { ...s, baslik: e.target.value } : s
                      ),
                    })
                  }
                  placeholder={lang === 'tr' ? 'Yöntem başlığı' : 'Method title'}
                  className={inputCls}
                />
                <textarea
                  value={t.icerik}
                  onChange={(e) =>
                    setForm(lang, {
                      treatment: getForm(lang).treatment.map((s, j) =>
                        j === i ? { ...s, icerik: e.target.value } : s
                      ),
                    })
                  }
                  rows={4}
                  placeholder={
                    lang === 'tr'
                      ? 'Açıklama (içinde alt yöntemler açılacaksa başlık metni olarak kullanılır)'
                      : 'Description (if it contains sub-methods, this acts as the intro text)'
                  }
                  className={inputCls}
                />

                {/* Alt Yöntemler (örn. Konjenital Skolyoz) */}
                <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/40 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Alt Yöntemler (açılır listeler)
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setForm(lang, {
                          treatment: getForm(lang).treatment.map((s, j) =>
                            j === i
                              ? { ...s, submethods: [...(s.submethods ?? []), { baslik: '', icerik: '' }] }
                              : s
                          ),
                        })
                      }
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white px-3 py-1.5 rounded-lg transition-all border border-blue-100"
                    >
                      + Alt Yöntem Ekle
                    </button>
                  </div>

                  {t.submethods?.map((sub, si) => (
                    <div key={si} className="bg-white border border-slate-100 rounded-xl p-3 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() =>
                          setForm(lang, {
                            treatment: getForm(lang).treatment.map((s, j) =>
                              j === i
                                ? { ...s, submethods: s.submethods?.filter((_, x) => x !== si) }
                                : s
                            ),
                          })
                        }
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        value={sub.baslik}
                        onChange={(e) =>
                          setForm(lang, {
                            treatment: getForm(lang).treatment.map((s, j) =>
                              j === i
                                ? {
                                    ...s,
                                    submethods: s.submethods?.map((sm, x) =>
                                      x === si ? { ...sm, baslik: e.target.value } : sm
                                    ),
                                  }
                                : s
                            ),
                          })
                        }
                        placeholder={
                          lang === 'tr'
                            ? 'Alt yöntem başlığı (örn. Growing Rod)'
                            : 'Sub-method title (e.g. Growing Rod)'
                        }
                        className={inputCls}
                      />
                      <textarea
                        value={sub.icerik}
                        onChange={(e) =>
                          setForm(lang, {
                            treatment: getForm(lang).treatment.map((s, j) =>
                              j === i
                                ? {
                                    ...s,
                                    submethods: s.submethods?.map((sm, x) =>
                                      x === si ? { ...sm, icerik: e.target.value } : sm
                                    ),
                                  }
                                : s
                            ),
                          })
                        }
                        rows={4}
                        placeholder={lang === 'tr' ? 'Alt yöntem açıklaması' : 'Sub-method description'}
                        className={inputCls}
                      />

                      {/* Hasta Röntgenleri */}
                      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Hasta Röntgenleri
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setForm(lang, {
                                treatment: getForm(lang).treatment.map((s, j) =>
                                  j === i
                                    ? {
                                        ...s,
                                        submethods: s.submethods?.map((sm, x) =>
                                          x === si
                                            ? {
                                                ...sm,
                                                patients: [...(sm.patients ?? []), { hastaAdi: '' }],
                                              }
                                            : sm
                                        ),
                                      }
                                    : s
                                ),
                              })
                            }
                            className="flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-700 bg-white px-3 py-1 rounded-lg transition-all border border-slate-200"
                          >
                            + Hasta Ekle
                          </button>
                        </div>

                        {sub.patients?.map((patient, pi) => (
                          <div
                            key={pi}
                            className="rounded-xl border border-slate-100 bg-white p-3 space-y-3 relative group"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                value={patient.hastaAdi}
                                onChange={(e) =>
                                  setForm(lang, {
                                    treatment: getForm(lang).treatment.map((s, j) =>
                                      j === i
                                        ? {
                                            ...s,
                                            submethods: s.submethods?.map((sm, x) =>
                                              x === si
                                                ? {
                                                    ...sm,
                                                    patients: sm.patients?.map((p, y) =>
                                                      y === pi ? { ...p, hastaAdi: e.target.value } : p
                                                    ),
                                                  }
                                                : sm
                                            ),
                                          }
                                        : s
                                    ),
                                  })
                                }
                                placeholder={
                                  lang === 'tr' ? 'Hasta adı (örn. Burak İpekçi)' : 'Patient name'
                                }
                                className={inputCls}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setForm(lang, {
                                    treatment: getForm(lang).treatment.map((s, j) =>
                                      j === i
                                        ? {
                                            ...s,
                                            submethods: s.submethods?.map((sm, x) =>
                                              x === si
                                                ? {
                                                    ...sm,
                                                    patients: sm.patients?.filter((_, y) => y !== pi),
                                                  }
                                                : sm
                                            ),
                                          }
                                        : s
                                    ),
                                  })
                                }
                                className="text-slate-400 hover:text-red-600 p-2 transition-all shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                              Röntgen Görseli
                            </label>
                            <ImageUpload
                              value={patient.img ?? ''}
                              onChange={(url) =>
                                updateTreatmentList(lang, (treatment) =>
                                  treatment.map((s, j) =>
                                    j === i
                                      ? {
                                          ...s,
                                          submethods: s.submethods?.map((sm, x) =>
                                            x === si
                                              ? {
                                                  ...sm,
                                                  patients: sm.patients?.map((p, y) =>
                                                    y === pi ? { ...p, img: url } : p
                                                  ),
                                                }
                                              : sm
                                          ),
                                        }
                                      : s
                                  )
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SSS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Sıkça Sorulan Sorular
              </h2>
              <button
                type="button"
                onClick={() => handleAddList(lang, 'faq', { s: '', c: '' })}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
              >
                + Ekle
              </button>
            </div>
            {getForm(lang).faq.map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => handleRemoveList(lang, 'faq', i)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <input
                  value={f.s}
                  onChange={(e) =>
                    setForm(lang, {
                      faq: getForm(lang).faq.map((q, j) => (j === i ? { ...q, s: e.target.value } : q)),
                    })
                  }
                  placeholder={lang === 'tr' ? 'Soru' : 'Question'}
                  className={inputCls}
                />
                <textarea
                  value={f.c}
                  onChange={(e) =>
                    setForm(lang, {
                      faq: getForm(lang).faq.map((q, j) => (j === i ? { ...q, c: e.target.value } : q)),
                    })
                  }
                  rows={3}
                  placeholder={lang === 'tr' ? 'Cevap' : 'Answer'}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isEdit && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-3">
          <Info className="w-4 h-4" />
          💡 TR içeriği zorunlu. EN sekmesi doldurulursa iki dil birlikte atomik olarak kaydedilir.
        </div>
      )}

      <div className="sticky bottom-4 flex items-center justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-500 hover:text-slate-700 font-bold text-sm px-6 py-2.5 transition-all"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
        >
          {saving ? 'Kaydediliyor...' : isEdit ? 'Değişiklikleri Güncelle' : 'Tedaviyi Kaydet'}
        </button>
      </div>
    </form>
  );
}