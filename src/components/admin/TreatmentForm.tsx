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
    desc?: string[];
    symptoms?: string[];
    treatment?: TreatmentSection[];
    faq?: FaqItem[];
    published?: boolean;
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

  const [form, setForm] = useState({
    slug: defaultValues.slug ?? '',
    title: defaultValues.title ?? '',
    img: defaultValues.img ?? '',
    category: defaultValues.category ?? '',
    published: defaultValues.published ?? true,
    symptomsRaw: (defaultValues.symptoms ?? []).join('\n'),
  });

  // desc — string[] (her paragraf ayrı)
  const [descParagraphs, setDescParagraphs] = useState<string[]>(
    defaultValues.desc && defaultValues.desc.length > 0 ? defaultValues.desc : ['']
  );

  const [stats, setStats] = useState<Stat[]>(defaultValues.stats ?? [{ label: '', val: '' }]);
  const [treatment, setTreatment] = useState<TreatmentSection[]>(
    defaultValues.treatment ?? [{ baslik: '', icerik: '' }]
  );
  const [faq, setFaq] = useState<FaqItem[]>(defaultValues.faq ?? [{ s: '', c: '' }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function updateDesc(index: number, value: string) {
    setDescParagraphs((p) => p.map((v, i) => (i === index ? value : v)));
  }
  function addDesc() { setDescParagraphs((p) => [...p, '']); }
  function removeDesc(index: number) { setDescParagraphs((p) => p.filter((_, i) => i !== index)); }

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
      desc: descParagraphs.filter((p) => p.trim()),
      symptoms: form.symptomsRaw.split('\n').map((s) => s.trim()).filter(Boolean),
      stats,
      treatment,
      faq,
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Temel Bilgiler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">Temel Bilgiler</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Başlık" required>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
              required
              placeholder="Tedavi başlığı"
            />
          </Field>
          <Field label="Slug" required>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className={inputCls}
              required
              placeholder="tedavi-slug"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kategori">
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputCls}
              placeholder="Omurga Cerrahisi"
            />
          </Field>
          <Field label="Görsel URL">
            <input
              value={form.img}
              onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
              className={inputCls}
              placeholder="/images/tedavi.avif"
            />
          </Field>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="pub"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            className="rounded"
          />
          <label htmlFor="pub" className="text-sm text-slate-700">Yayınla</label>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">İstatistikler</h2>
          <button
            type="button"
            onClick={() => setStats((p) => [...p, { label: '', val: '' }])}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            + Ekle
          </button>
        </div>
        {stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 items-center">
            <input
              value={stat.label}
              onChange={(e) => setStats((p) => p.map((s, j) => j === i ? { ...s, label: e.target.value } : s))}
              placeholder="Başarı oranı"
              className={inputCls}
            />
            <div className="flex gap-2">
              <input
                value={stat.val}
                onChange={(e) => setStats((p) => p.map((s, j) => j === i ? { ...s, val: e.target.value } : s))}
                placeholder="%90+"
                className={inputCls}
              />
              {stats.length > 1 && (
                <button
                  type="button"
                  onClick={() => setStats((p) => p.filter((_, j) => j !== i))}
                  className="text-red-400 hover:text-red-600 text-xs px-2"
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Açıklama Paragrafları */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Açıklama (desc)</h2>
            <p className="text-xs text-slate-400 mt-0.5">Her kutu ayrı bir paragraf. Detay sayfasında sırayla gösterilir.</p>
          </div>
          <button
            type="button"
            onClick={addDesc}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            + Paragraf ekle
          </button>
        </div>
        {descParagraphs.map((para, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Paragraf {i + 1}</span>
              {descParagraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDesc(i)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Sil
                </button>
              )}
            </div>
            <textarea
              value={para}
              onChange={(e) => updateDesc(i, e.target.value)}
              rows={4}
              className={inputCls}
              placeholder="Tedavi açıklaması..."
            />
          </div>
        ))}
      </div>

      {/* Belirtiler */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Belirtiler</h2>
        <p className="text-xs text-slate-400 mb-3">Her satır ayrı belirti olarak kaydedilir.</p>
        <textarea
          value={form.symptomsRaw}
          onChange={(e) => setForm((f) => ({ ...f, symptomsRaw: e.target.value }))}
          rows={6}
          className={inputCls}
          placeholder={'Sırt ağrısı\nYürümekte güçlük\nUyuşma'}
        />
      </div>

      {/* Tedavi Yöntemleri */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Tedavi Yöntemleri</h2>
          <button
            type="button"
            onClick={() => setTreatment((p) => [...p, { baslik: '', icerik: '' }])}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            + Ekle
          </button>
        </div>
        {treatment.map((t, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Yöntem {i + 1}</span>
              {treatment.length > 1 && (
                <button
                  type="button"
                  onClick={() => setTreatment((p) => p.filter((_, j) => j !== i))}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Sil
                </button>
              )}
            </div>
            <input
              value={t.baslik}
              onChange={(e) => setTreatment((p) => p.map((s, j) => j === i ? { ...s, baslik: e.target.value } : s))}
              placeholder="Yöntem başlığı"
              className={inputCls}
            />
            <textarea
              value={t.icerik}
              onChange={(e) => setTreatment((p) => p.map((s, j) => j === i ? { ...s, icerik: e.target.value } : s))}
              rows={4}
              placeholder="Yöntem açıklaması"
              className={inputCls}
            />
          </div>
        ))}
      </div>

      {/* SSS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Sıkça Sorulan Sorular</h2>
          <button
            type="button"
            onClick={() => setFaq((p) => [...p, { s: '', c: '' }])}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            + Ekle
          </button>
        </div>
        {faq.map((f, i) => (
          <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Soru {i + 1}</span>
              {faq.length > 1 && (
                <button
                  type="button"
                  onClick={() => setFaq((p) => p.filter((_, j) => j !== i))}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Sil
                </button>
              )}
            </div>
            <input
              value={f.s}
              onChange={(e) => setFaq((p) => p.map((q, j) => j === i ? { ...q, s: e.target.value } : q))}
              placeholder="Soru"
              className={inputCls}
            />
            <textarea
              value={f.c}
              onChange={(e) => setFaq((p) => p.map((q, j) => j === i ? { ...q, c: e.target.value } : q))}
              rows={3}
              placeholder="Cevap"
              className={inputCls}
            />
          </div>
        ))}
      </div>

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