// src/components/admin/TreatmentForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Stat = { label: string; val: string };
type TreatmentSection = { baslik: string; icerik: string };
type FaqItem = { s: string; c: string };

type TreatmentFormProps = {
  defaultValues?: {
    id?: number;
    slug?: string;
    title?: string;
    img?: string;
    category?: string;
    stats?: Stat[];
    symptoms?: string[];
    treatment?: TreatmentSection[];
    faq?: FaqItem[];
    published?: boolean;
  };
};

const inputCls = 'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';

export default function TreatmentForm({ defaultValues = {} }: TreatmentFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;

  const [form, setForm] = useState({
    slug: defaultValues.slug ?? '',
    title: defaultValues.title ?? '',
    img: defaultValues.img ?? '',
    category: defaultValues.category ?? '',
    published: defaultValues.published ?? true,
    symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
  });

  const [stats, setStats] = useState<Stat[]>(defaultValues.stats ?? [{ label: '', val: '' }]);
  const [treatment, setTreatment] = useState<TreatmentSection[]>(defaultValues.treatment ?? [{ baslik: '', icerik: '' }]);
  const [faq, setFaq] = useState<FaqItem[]>(defaultValues.faq ?? [{ s: '', c: '' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      slug: form.slug,
      title: form.title,
      img: form.img,
      images: [],
      category: form.category,
      published: form.published,
      symptoms: form.symptomsRaw.split('\n').map((s) => s.trim()).filter(Boolean),
      stats,
      treatment,
      faq,
      desc: [],
    };

    const url = isEdit ? `/api/admin/tedaviler/${defaultValues.id}` : '/api/admin/tedaviler';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/tedaviler');
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
        <h2 className="text-sm font-semibold text-slate-700">Temel Bilgiler</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Başlık *</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} required />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Slug *</label>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inputCls} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Kategori</label>
            <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Görsel URL</label>
            <input value={form.img} onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="pub" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} className="rounded" />
          <label htmlFor="pub" className="text-sm text-slate-700">Yayınla</label>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">İstatistikler</h2>
          <button type="button" onClick={() => setStats((p) => [...p, { label: '', val: '' }])} className="text-xs text-blue-600">+ Ekle</button>
        </div>
        {stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <input value={stat.label} onChange={(e) => setStats((p) => p.map((s, j) => j === i ? { ...s, label: e.target.value } : s))} placeholder="Başarı oranı" className={inputCls} />
            <input value={stat.val} onChange={(e) => setStats((p) => p.map((s, j) => j === i ? { ...s, val: e.target.value } : s))} placeholder="%90+" className={inputCls} />
          </div>
        ))}
      </div>

      {/* Belirtiler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Belirtiler (her satır ayrı belirti)</h2>
        <textarea value={form.symptomsRaw} onChange={(e) => setForm((f) => ({ ...f, symptomsRaw: e.target.value }))} rows={5} className={inputCls} placeholder="Sırt ağrısı&#10;Yürümekte güçlük&#10;Uyuşma" />
      </div>

      {/* Tedavi Yöntemleri */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Tedavi Yöntemleri</h2>
          <button type="button" onClick={() => setTreatment((p) => [...p, { baslik: '', icerik: '' }])} className="text-xs text-blue-600">+ Ekle</button>
        </div>
        {treatment.map((t, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
            <input value={t.baslik} onChange={(e) => setTreatment((p) => p.map((s, j) => j === i ? { ...s, baslik: e.target.value } : s))} placeholder="Yöntem başlığı" className={inputCls} />
            <textarea value={t.icerik} onChange={(e) => setTreatment((p) => p.map((s, j) => j === i ? { ...s, icerik: e.target.value } : s))} rows={3} placeholder="Açıklama" className={inputCls} />
          </div>
        ))}
      </div>

      {/* SSS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Sıkça Sorulan Sorular</h2>
          <button type="button" onClick={() => setFaq((p) => [...p, { s: '', c: '' }])} className="text-xs text-blue-600">+ Ekle</button>
        </div>
        {faq.map((f, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
            <input value={f.s} onChange={(e) => setFaq((p) => p.map((q, j) => j === i ? { ...q, s: e.target.value } : q))} placeholder="Soru" className={inputCls} />
            <textarea value={f.c} onChange={(e) => setFaq((p) => p.map((q, j) => j === i ? { ...q, c: e.target.value } : q))} rows={3} placeholder="Cevap" className={inputCls} />
          </div>
        ))}
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
