// src/components/admin/PresentationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info } from 'lucide-react';

type PresentationFormProps = {
  defaultValues?: {
    id?: number;
    year?: string;
    title?: string;
    congress?: string;
    location?: string;
    type?: string;
    language?: string;
    topic?: string;
  };
};

const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
      {children}
    </div>
  );
}

export default function PresentationForm({ defaultValues = {} }: PresentationFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues.id;

  const [form, setForm] = useState({
    year: defaultValues.year ?? new Date().getFullYear().toString(),
    title: defaultValues.title ?? '',
    congress: defaultValues.congress ?? '',
    location: defaultValues.location ?? '',
    type: defaultValues.type ?? 'konferans',
    language: defaultValues.language ?? 'TR',
    topic: defaultValues.topic ?? '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    const url = isEdit ? `/api/admin/sunumlar/${defaultValues.id}` : '/api/admin/sunumlar';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/sunumlar');
        router.refresh();
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.error ?? 'Bir hata oluştu.');
      setSaving(false);
    }
  }

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
        {error && (
          <div className="bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <Info className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">{error}</span>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Sunum Bilgileri</h2>

        <Field label="Başlık">
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} required />
        </Field>

        <Field label="Kongre / Etkinlik Adı">
          <input value={form.congress} onChange={(e) => setForm((f) => ({ ...f, congress: e.target.value }))} placeholder="38. Türk Ortopedi Kongresi" className={inputCls} />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Yıl">
            <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2024" className={inputCls} />
          </Field>
          <Field label="Tür">
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className={inputCls}>
              <option value="konferans">Konferans</option>
              <option value="sempozyum">Sempozyum</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
            </select>
          </Field>
          <Field label="Dil">
            <select value={form.language} onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))} className={inputCls}>
              <option value="TR">Türkçe (TR)</option>
              <option value="EN">English (EN)</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Konum">
            <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="İstanbul, Türkiye" className={inputCls} />
          </Field>
          <Field label="Konu">
            <input value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} placeholder="Skolyoz" className={inputCls} />
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
        <button type="button" onClick={() => router.back()} className="text-slate-500 hover:text-slate-700 font-bold text-sm px-6 py-2.5 transition-all">İptal</button>
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
          {saving ? 'Kaydediliyor...' : isEdit ? 'Değişiklikleri Güncelle' : 'Sunumu Kaydet'}
        </button>
      </div>
    </form>
  );
}
