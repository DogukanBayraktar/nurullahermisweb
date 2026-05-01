// src/components/admin/ArticleForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Section = { h2: string; content: string };

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
  };
};

export default function ArticleForm({ defaultValues = {} }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;

  const [form, setForm] = useState({
    slug: defaultValues.slug ?? '',
    title: defaultValues.title ?? '',
    img: defaultValues.img ?? '',
    date: defaultValues.date ?? '',
    readTime: defaultValues.readTime ?? '',
    category: defaultValues.category ?? '',
    desc: defaultValues.desc ?? '',
    intro: defaultValues.intro ?? '',
    lang: defaultValues.lang ?? 'tr',
    published: defaultValues.published ?? true,
    tagsRaw: (defaultValues.tags ?? []).join(', '),
  });

  const [sections, setSections] = useState<Section[]>(
    defaultValues.sections ?? [{ h2: '', content: '' }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function updateSection(index: number, field: keyof Section, value: string) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSection() {
    setSections((prev) => [...prev, { h2: '', content: '' }]);
  }

  function removeSection(index: number) {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      tags: form.tagsRaw.split(',').map((t) => t.trim()).filter(Boolean),
      sections,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tagsRaw, ...rest } = payload;

    const url = isEdit
      ? `/api/admin/saglik-rehberi/${defaultValues.id}`
      : '/api/admin/saglik-rehberi';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });

    if (res.ok) {
      router.push('/admin/saglik-rehberi');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Bir hata oluştu.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Temel Bilgiler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Temel Bilgiler</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Başlık" required>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Makale başlığı"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Slug" required>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="makale-slug"
              className={inputCls}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Kategori">
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              placeholder="Skolyoz"
              className={inputCls}
            />
          </Field>
          <Field label="Tarih">
            <input
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="12 Mart 2025"
              className={inputCls}
            />
          </Field>
          <Field label="Okuma Süresi">
            <input
              value={form.readTime}
              onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))}
              placeholder="7 dk okuma"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Görsel URL">
          <input
            value={form.img}
            onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
            placeholder="/images/saglik/makale.avif"
            className={inputCls}
          />
        </Field>

        <Field label="Kısa Açıklama (liste görünümü için)">
          <textarea
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            rows={2}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Dil">
            <select
              value={form.lang}
              onChange={(e) => setForm((f) => ({ ...f, lang: e.target.value }))}
              className={inputCls}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Etiketler (virgülle ayır)">
            <input
              value={form.tagsRaw}
              onChange={(e) => setForm((f) => ({ ...f, tagsRaw: e.target.value }))}
              placeholder="Skolyoz, VBT, Omurga"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="published" className="text-sm text-slate-700">Yayınla (canlıya al)</label>
        </div>
      </div>

      {/* Giriş Paragrafı */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Giriş Paragrafı</h2>
        <textarea
          value={form.intro}
          onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))}
          rows={4}
          className={inputCls}
          placeholder="Makalenin açılış paragrafı..."
        />
      </div>

      {/* Bölümler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Bölümler</h2>
          <button
            type="button"
            onClick={addSection}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            + Bölüm ekle
          </button>
        </div>

        {sections.map((section, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Bölüm {i + 1}</span>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Sil
                </button>
              )}
            </div>
            <input
              value={section.h2}
              onChange={(e) => updateSection(i, 'h2', e.target.value)}
              placeholder="Bölüm başlığı (h2)"
              className={inputCls}
            />
            <textarea
              value={section.content}
              onChange={(e) => updateSection(i, 'content', e.target.value)}
              rows={4}
              placeholder="Bölüm içeriği..."
              className={inputCls}
            />
          </div>
        ))}
      </div>

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
