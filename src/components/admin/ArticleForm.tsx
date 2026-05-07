// src/components/admin/ArticleForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

type Section = { h2: string; content: string };

type LangForm = {
  title: string;
  slug: string;
  desc: string;
  intro: string;
  category: string;
  date: string;
  readTime: string;
  tagsRaw: string;
  sections: Section[];
};

type ArticleFormProps = {
  defaultValues?: {
    id?: number;
    slug?: string;
    title?: string;
    img?: string;
    date?: string;
    readTime?: string;
    category?: string;
    desc?: string;
    intro?: string;
    sections?: Section[];
    tags?: string[];
    lang?: string;
    published?: boolean;
    pairId?: number;
    pairSlug?: string;
    pairTitle?: string;
    pairDesc?: string;
    pairIntro?: string;
    pairCategory?: string;
    pairDate?: string;
    pairReadTime?: string;
    pairTags?: string[];
    pairSections?: Section[];
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

function parseSections(raw: unknown): Section[] {
  if (Array.isArray(raw) && raw.length > 0) {
    return (raw as { h2?: string; content?: string }[]).map((s) => ({
      h2: s?.h2 ?? '',
      content: s?.content ?? '',
    }));
  }
  return [{ h2: '', content: '' }];
}

export default function ArticleForm({ defaultValues = {} }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;
  const primaryLang = defaultValues.lang ?? 'tr';
  const secondaryLang = primaryLang === 'tr' ? 'en' : 'tr';

  const [activeTab, setActiveTab] = useState<'tr' | 'en'>(primaryLang as 'tr' | 'en');
  const [img, setImg] = useState(defaultValues.img ?? '');
  const [published, setPublished] = useState(defaultValues.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);

  // TR formu
  const [trForm, setTrForm] = useState<LangForm>(() => {
    if (primaryLang === 'tr') {
      return {
        title: defaultValues.title ?? '',
        slug: defaultValues.slug ?? '',
        desc: defaultValues.desc ?? '',
        intro: defaultValues.intro ?? '',
        category: defaultValues.category ?? '',
        date: defaultValues.date ?? '',
        readTime: defaultValues.readTime ?? '',
        tagsRaw: (defaultValues.tags ?? []).join(', '),
        sections: parseSections(defaultValues.sections),
      };
    }
    return {
      title: defaultValues.pairTitle ?? '',
      slug: defaultValues.pairSlug ?? '',
      desc: defaultValues.pairDesc ?? '',
      intro: defaultValues.pairIntro ?? '',
      category: defaultValues.pairCategory ?? '',
      date: defaultValues.pairDate ?? '',
      readTime: defaultValues.pairReadTime ?? '',
      tagsRaw: (defaultValues.pairTags ?? []).join(', '),
      sections: parseSections(defaultValues.pairSections),
    };
  });

  // EN formu
  const [enForm, setEnForm] = useState<LangForm>(() => {
    if (primaryLang === 'en') {
      return {
        title: defaultValues.title ?? '',
        slug: defaultValues.slug ?? '',
        desc: defaultValues.desc ?? '',
        intro: defaultValues.intro ?? '',
        category: defaultValues.category ?? '',
        date: defaultValues.date ?? '',
        readTime: defaultValues.readTime ?? '',
        tagsRaw: (defaultValues.tags ?? []).join(', '),
        sections: parseSections(defaultValues.sections),
      };
    }
    return {
      title: defaultValues.pairTitle ?? '',
      slug: defaultValues.pairSlug ?? '',
      desc: defaultValues.pairDesc ?? '',
      intro: defaultValues.pairIntro ?? '',
      category: defaultValues.pairCategory ?? '',
      date: defaultValues.pairDate ?? '',
      readTime: defaultValues.pairReadTime ?? '',
      tagsRaw: (defaultValues.pairTags ?? []).join(', '),
      sections: parseSections(defaultValues.pairSections),
    };
  });

  function getForm(lang: 'tr' | 'en') { return lang === 'tr' ? trForm : enForm; }
  function setForm(lang: 'tr' | 'en', update: Partial<LangForm>) {
    if (lang === 'tr') setTrForm((f) => ({ ...f, ...update }));
    else setEnForm((f) => ({ ...f, ...update }));
  }
  function getSections(lang: 'tr' | 'en') { return lang === 'tr' ? trForm.sections : enForm.sections; }
  function setSections(lang: 'tr' | 'en', sections: Section[]) {
    if (lang === 'tr') setTrForm((f) => ({ ...f, sections }));
    else setEnForm((f) => ({ ...f, sections }));
  }

  function updateSection(lang: 'tr' | 'en', index: number, field: keyof Section, value: string) {
    setSections(lang, getSections(lang).map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }
  function addSection(lang: 'tr' | 'en') {
    setSections(lang, [{ h2: '', content: '' }, ...getSections(lang)]); // Add at TOP
  }
  function removeSection(lang: 'tr' | 'en', index: number) {
    if (!confirm('Bu bölümü silmek istediğinize emin misiniz?')) return;
    setSections(lang, getSections(lang).filter((_, i) => i !== index));
    setDeleteNotify(true);
    setTimeout(() => setDeleteNotify(false), 2500);
  }

  function buildPayload(form: LangForm, lang: 'tr' | 'en') {
    const canonicalSlug = form.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const suffix = lang === 'en' ? '_en' : '_tr';
    return {
      slug: `${canonicalSlug}${suffix}`,
      title: form.title,
      img,
      date: form.date,
      readTime: form.readTime,
      category: form.category,
      desc: form.desc,
      intro: form.intro,
      sections: form.sections,
      tags: form.tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
      lang,
      published,
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
        const res1 = await fetch(`/api/admin/saglik-rehberi/${defaultValues.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(primaryPayload),
        });
        if (!res1.ok) throw new Error((await res1.json()).error ?? 'TR güncelleme hatası');

        const secondaryPayload = primaryLang === 'tr' ? enPayload : trPayload;
        if (defaultValues.pairId) {
          const res2 = await fetch(`/api/admin/saglik-rehberi/${defaultValues.pairId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? `${secondaryLang.toUpperCase()} güncelleme hatası`);
        } else if (secondaryPayload.title) {
          const res2 = await fetch('/api/admin/saglik-rehberi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? `${secondaryLang.toUpperCase()} oluşturma hatası`);
        }
      } else {
        const res1 = await fetch('/api/admin/saglik-rehberi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trPayload),
        });
        if (!res1.ok) throw new Error((await res1.json()).error ?? 'TR kayıt hatası');

        if (enForm.title) {
          const res2 = await fetch('/api/admin/saglik-rehberi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? 'EN kayıt hatası');
        }
      }

      setSuccess(true);
      try {
        await fetch('/api/admin/saglik-rehberi/rebuild-slug-map', { method: 'POST' });
      } catch (err) {}

      setTimeout(() => {
        router.push('/admin/saglik-rehberi');
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.');
      setSaving(false);
    }
  }

  const tabs: { lang: 'tr' | 'en'; label: string; flag: string }[] = [
    { lang: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { lang: 'en', label: 'English', flag: '🇬🇧' },
  ];

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

      {/* Dil Sekmeleri */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {tabs.map(({ lang, label, flag }) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveTab(lang)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === lang
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>{flag}</span>
            {label}
            {lang !== 'tr' && getForm(lang).title && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" title="İçerik dolu" />
            )}
          </button>
        ))}
      </div>

      {/* Ortak Alan: Görsel */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Ortak Alanlar</h2>
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
            <label htmlFor="published" className="text-sm font-bold text-slate-700 cursor-pointer uppercase tracking-wide">Yayında</label>
          </div>
        </div>
      </div>

      {/* Aktif Dil Formu */}
      {tabs.map(({ lang }) => (
        <div key={lang} className={activeTab === lang ? 'space-y-6' : 'hidden'}>
          {/* Temel Bilgiler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Temel Bilgiler — {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Başlık" required={lang === 'tr'}>
                <input
                  value={getForm(lang).title}
                  onChange={(e) => setForm(lang, { title: e.target.value })}
                  placeholder={lang === 'tr' ? 'Makale başlığı' : 'Article title'}
                  className={inputCls}
                  required={lang === 'tr'}
                />
              </Field>
              <Field label={`Slug — kaydedilecek: ${getForm(lang).slug || 'slug'}_${lang}`} required={lang === 'tr'}>
                <input
                  value={getForm(lang).slug}
                  onChange={(e) => setForm(lang, { slug: e.target.value.replace(/_tr$/, '').replace(/_en$/, '') })}
                  placeholder={lang === 'tr' ? 'makale-slug' : 'article-slug'}
                  className={inputCls}
                  required={lang === 'tr'}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label={lang === 'tr' ? 'Kategori' : 'Category'}>
                <input
                  value={getForm(lang).category}
                  onChange={(e) => setForm(lang, { category: e.target.value })}
                  placeholder={lang === 'tr' ? 'Skolyoz' : 'Scoliosis'}
                  className={inputCls}
                />
              </Field>
              <Field label={lang === 'tr' ? 'Tarih' : 'Date'}>
                <input
                  value={getForm(lang).date}
                  onChange={(e) => setForm(lang, { date: e.target.value })}
                  placeholder={lang === 'tr' ? '12 Mart 2025' : 'March 12, 2025'}
                  className={inputCls}
                />
              </Field>
              <Field label={lang === 'tr' ? 'Okuma Süresi' : 'Read Time'}>
                <input
                  value={getForm(lang).readTime}
                  onChange={(e) => setForm(lang, { readTime: e.target.value })}
                  placeholder={lang === 'tr' ? '7 dk okuma' : '7 min read'}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label={lang === 'tr' ? 'Kısa Açıklama' : 'Short Description'} required={lang === 'tr'}>
              <textarea
                value={getForm(lang).desc}
                onChange={(e) => setForm(lang, { desc: e.target.value })}
                rows={3}
                placeholder={lang === 'tr' ? 'Makaleyi özetleyen 1-2 cümle...' : 'A 1-2 sentence summary...'}
                className={inputCls}
                required={lang === 'tr'}
              />
            </Field>

            <Field label={lang === 'tr' ? 'Etiketler (virgülle ayır)' : 'Tags'}>
              <input
                value={getForm(lang).tagsRaw}
                onChange={(e) => setForm(lang, { tagsRaw: e.target.value })}
                placeholder="Skolyoz, VBT..."
                className={inputCls}
              />
            </Field>
          </div>

          {/* Giriş Paragrafı */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              {lang === 'tr' ? 'Giriş Paragrafı' : 'Introduction'}
            </h2>
            <textarea
              value={getForm(lang).intro}
              onChange={(e) => setForm(lang, { intro: e.target.value })}
              rows={4}
              className={inputCls}
              placeholder="..."
            />
          </div>

          {/* Bölümler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {lang === 'tr' ? 'Bölümler' : 'Sections'}
              </h2>
              <button
                type="button"
                onClick={() => addSection(lang)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
              >
                + {lang === 'tr' ? 'Bölüm Ekle' : 'Add Section'}
              </button>
            </div>

            {getSections(lang).map((section, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100/50 rounded-2xl p-4 space-y-4 relative group">
                <button
                  type="button"
                  onClick={() => removeSection(lang, i)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <Field label={lang === 'tr' ? 'Bölüm Başlığı (H2)' : 'Section Title'}>
                  <input
                    value={section.h2}
                    onChange={(e) => updateSection(lang, i, 'h2', e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label={lang === 'tr' ? 'İçerik' : 'Content'}>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(lang, i, 'content', e.target.value)}
                    rows={6}
                    className={inputCls}
                  />
                </Field>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isEdit && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center gap-3">
          <Info className="w-4 h-4" />
          💡 TR içeriği zorunlu. EN boş bırakılırsa sadece Türkçe kaydedilir.
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
          {saving ? 'Kaydediliyor...' : isEdit ? 'Değişiklikleri Güncelle' : 'Makaleyi Kaydet'}
        </button>
      </div>
    </form>
  );
}