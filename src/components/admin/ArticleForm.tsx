// src/components/admin/ArticleForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    // Edit modunda karşı dil verisi
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

const emptyLangForm = (): LangForm => ({
  title: '',
  slug: '',
  desc: '',
  intro: '',
  category: '',
  date: '',
  readTime: '',
  tagsRaw: '',
  sections: [{ h2: '', content: '' }],
});

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
    setSections(lang, [...getSections(lang), { h2: '', content: '' }]);
  }
  function removeSection(lang: 'tr' | 'en', index: number) {
    setSections(lang, getSections(lang).filter((_, i) => i !== index));
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

    try {
      // TR kaydı
      const trPayload = buildPayload(trForm, 'tr');
      const enPayload = buildPayload(enForm, 'en');

      if (isEdit) {
        // Güncelleme — önce mevcut dili güncelle
        const primaryPayload = primaryLang === 'tr' ? trPayload : enPayload;
        const res1 = await fetch(`/api/admin/saglik-rehberi/${defaultValues.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(primaryPayload),
        });
        if (!res1.ok) throw new Error((await res1.json()).error ?? 'TR güncelleme hatası');

        // Karşı dil kaydı varsa güncelle, yoksa oluştur
        const secondaryPayload = primaryLang === 'tr' ? enPayload : trPayload;
        if (defaultValues.pairId) {
          const res2 = await fetch(`/api/admin/saglik-rehberi/${defaultValues.pairId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? `${secondaryLang.toUpperCase()} güncelleme hatası`);
        } else if (secondaryPayload.title) {
          // Karşı dil kaydı yoktu, oluştur
          const res2 = await fetch('/api/admin/saglik-rehberi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(secondaryPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? `${secondaryLang.toUpperCase()} oluşturma hatası`);
        }
      } else {
        // Yeni kayıt — TR + EN aynı anda
        const res1 = await fetch('/api/admin/saglik-rehberi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trPayload),
        });
        if (!res1.ok) throw new Error((await res1.json()).error ?? 'TR kayıt hatası');

        // EN doluysa onu da kaydet
        if (enForm.title) {
          const res2 = await fetch('/api/admin/saglik-rehberi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(enPayload),
          });
          if (!res2.ok) throw new Error((await res2.json()).error ?? 'EN kayıt hatası');
        }
      }

      router.push('/admin/saglik-rehberi');
      router.refresh();

      // Slug map'i rebuild et (yeni veya düzenlenen makale için)
      try {
        await fetch('/api/admin/saglik-rehberi/rebuild-slug-map', { method: 'POST' });
      } catch (err) {
        console.error('Slug map rebuild başarısız:', err);
        // Hata silent, main işlem tamamlandı
      }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

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
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Ortak Alanlar</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Görsel URL">
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="/images/saglik/makale.avif"
              className={inputCls}
            />
          </Field>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-slate-700">Yayınla (canlıya al)</span>
            </label>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">Görsel ve yayın durumu her iki dil için ortaktır.</p>
      </div>

      {/* Aktif Dil Formu */}
      {tabs.map(({ lang }) => (
        <div key={lang} className={activeTab === lang ? 'space-y-6' : 'hidden'}>
          {/* Temel Bilgiler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-1">
              Temel Bilgiler — {lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-3 gap-4">
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

            <Field label={lang === 'tr' ? 'Kısa Açıklama — liste kartında ve detay sayfasında görünür' : 'Short Description — shown in list card and detail page'} required={lang === 'tr'}>
              <textarea
                value={getForm(lang).desc}
                onChange={(e) => setForm(lang, { desc: e.target.value })}
                rows={3}
                placeholder={lang === 'tr' ? 'Makaleyi özetleyen 1-2 cümle...' : 'A 1-2 sentence summary of the article...'}
                className={inputCls}
                required={lang === 'tr'}
              />
            </Field>

            <Field label={lang === 'tr' ? 'Etiketler (virgülle ayır)' : 'Tags (comma separated)'}>
              <input
                value={getForm(lang).tagsRaw}
                onChange={(e) => setForm(lang, { tagsRaw: e.target.value })}
                placeholder={lang === 'tr' ? 'Skolyoz, VBT, Omurga' : 'Scoliosis, VBT, Spine'}
                className={inputCls}
              />
            </Field>
          </div>

          {/* Giriş Paragrafı */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              {lang === 'tr' ? 'Giriş Paragrafı' : 'Introduction'}
            </h2>
            <textarea
              value={getForm(lang).intro}
              onChange={(e) => setForm(lang, { intro: e.target.value })}
              rows={5}
              className={inputCls}
              placeholder={lang === 'tr' ? 'Makalenin açılış paragrafı...' : 'Opening paragraph of the article...'}
            />
          </div>

          {/* Bölümler */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">
                {lang === 'tr' ? 'Bölümler' : 'Sections'}
              </h2>
              <button
                type="button"
                onClick={() => addSection(lang)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                + {lang === 'tr' ? 'Bölüm ekle' : 'Add section'}
              </button>
            </div>

            {getSections(lang).map((section, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {lang === 'tr' ? 'Bölüm' : 'Section'} {i + 1}
                  </span>
                  {getSections(lang).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(lang, i)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      {lang === 'tr' ? 'Sil' : 'Remove'}
                    </button>
                  )}
                </div>
                <input
                  value={section.h2}
                  onChange={(e) => updateSection(lang, i, 'h2', e.target.value)}
                  placeholder={lang === 'tr' ? 'Bölüm başlığı (h2)' : 'Section title (h2)'}
                  className={inputCls}
                />
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(lang, i, 'content', e.target.value)}
                  rows={4}
                  placeholder={lang === 'tr' ? 'Bölüm içeriği...' : 'Section content...'}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bilgi notu */}
      {!isEdit && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
          💡 TR içeriği zorunlu. EN sekmesini doldurmak isteğe bağlı — boş bırakılırsa sadece Türkçe kaydedilir.
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          {saving ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-slate-500 hover:text-slate-700 text-sm px-4 py-2.5"
        >
          İptal
        </button>
      </div>
    </form>
  );
}

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

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';