// src/components/admin/PressForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PressFormProps = {
  defaultValues?: {
    id?: number;
    outlet?: string;
    title?: string;
    summary?: string;
    date?: string;
    format?: string;
    image?: string;
    href?: string;
    lang?: string;
    published?: boolean;
  };
};

const inputCls = 'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function PressForm({ defaultValues = {} }: PressFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;

  const [form, setForm] = useState({
    outlet: defaultValues.outlet ?? '',
    title: defaultValues.title ?? '',
    summary: defaultValues.summary ?? '',
    date: defaultValues.date ?? '',
    format: defaultValues.format ?? 'press',
    image: defaultValues.image ?? '',
    href: defaultValues.href ?? '#',
    lang: defaultValues.lang ?? 'tr',
    published: defaultValues.published ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEdit ? `/api/admin/basin/${defaultValues.id}` : '/api/admin/basin';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/basin');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Bir hata oluştu.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">Haber Bilgileri</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Kaynak (Outlet)">
            <input value={form.outlet} onChange={(e) => setForm((f) => ({ ...f, outlet: e.target.value }))} placeholder="NTV Sağlık" className={inputCls} required />
          </Field>
          <Field label="Tarih">
            <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} placeholder="Mart 2025" className={inputCls} />
          </Field>
        </div>

        <Field label="Başlık">
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} required />
        </Field>

        <Field label="Özet">
          <textarea value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} rows={3} className={inputCls} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Format">
            <select value={form.format} onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))} className={inputCls}>
              <option value="press">Basın</option>
              <option value="tv">TV</option>
              <option value="radio">Radyo</option>
            </select>
          </Field>
          <Field label="Dil">
            <select value={form.lang} onChange={(e) => setForm((f) => ({ ...f, lang: e.target.value }))} className={inputCls}>
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </Field>
          <Field label="Link (href)">
            <input value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} placeholder="https://..." className={inputCls} />
          </Field>
        </div>

        <Field label="Görsel URL">
          <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="/images/..." className={inputCls} />
        </Field>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="pub" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="rounded" />
          <label htmlFor="pub" className="text-sm text-slate-700">Yayınla</label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors">
          {saving ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
        </button>
        <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-slate-700 text-sm px-4 py-2.5">İptal</button>
      </div>
    </form>
  );
}
