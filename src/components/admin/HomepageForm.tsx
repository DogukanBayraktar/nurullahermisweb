'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info } from 'lucide-react';
import ImageUpload from './ImageUpload';
import HomeResultsManager from './HomeResultsManager';

type HomepageContent = {
  tr: any;
  en: any;
};

export default function HomepageForm({ initialData }: { initialData: HomepageContent }) {
  const router = useRouter();
  const [data, setData] = useState<HomepageContent>(initialData);
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: 'homepage.json', content: data }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } catch (err) {
      setError('Kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (lang: 'tr' | 'en', section: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [field]: value,
        },
      },
    }));
  };

  const updateSharedField = (section: string, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      tr: {
        ...prev.tr,
        [section]: {
          ...prev.tr[section],
          [field]: value,
        },
      },
      en: {
        ...prev.en,
        [section]: {
          ...prev.en[section],
          [field]: value,
        },
      },
    }));
  };

  const updateStat = (lang: 'tr' | 'en', index: number, field: string, value: string) => {
    setData(prev => {
      const stats = [...prev[lang].stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, [lang]: { ...prev[lang], stats } };
    });
  };

  const updateCenterStat = (lang: 'tr' | 'en', index: number, field: string, value: string) => {
    setData(prev => {
      const stats = [...prev[lang].center.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, [lang]: { ...prev[lang], center: { ...prev[lang].center, stats } } };
    });
  };

  const updateProcessStep = (lang: 'tr' | 'en', index: number, field: string, value: string) => {
    setData(prev => {
      const steps = [...prev[lang].process.steps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, [lang]: { ...prev[lang], process: { ...prev[lang].process, steps } } };
    });
  };

  return (
    <div className="space-y-6">
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

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button onClick={() => setActiveTab('tr')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>🇹🇷 Türkçe</button>
        <button onClick={() => setActiveTab('en')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>🇬🇧 English</button>
      </div>

      <div className="space-y-8 pb-20">
        {/* HERO */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Hero Bölümü</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Görsel (Opsiyonel)">
              <ImageUpload 
                value={data[activeTab].hero.image || ''} 
                onChange={(url) => updateSharedField('hero', 'image', url)} 
              />
            </Field>
            <div className="space-y-4">
              <Field label="Rozet">
                <input value={data[activeTab].hero.badge} onChange={(e) => updateNestedField(activeTab, 'hero', 'badge', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Başlık">
                <input value={data[activeTab].hero.title} onChange={(e) => updateNestedField(activeTab, 'hero', 'title', e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Field label="Alt Başlık" className="md:col-span-2">
              <textarea value={data[activeTab].hero.subtitle} onChange={(e) => updateNestedField(activeTab, 'hero', 'subtitle', e.target.value)} className={inputCls} rows={3} />
            </Field>
          </div>
        </section>

        {/* HERO STATS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Hero İstatistikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data[activeTab].stats.map((stat: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100/50">
                <Field label={`Değer ${i+1}`}>
                  <input value={stat.value} onChange={(e) => updateStat(activeTab, i, 'value', e.target.value)} className={inputCls} />
                </Field>
                <Field label={`Etiket ${i+1}`}>
                  <input value={stat.label} onChange={(e) => updateStat(activeTab, i, 'label', e.target.value)} className={inputCls} />
                </Field>
              </div>
            ))}
          </div>
        </section>

        {/* ANA SAYFA HAKKIMDA */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Ana Sayfa Hakkımda Bölümü</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Field label="Bölüm Görseli">
              <ImageUpload 
                value={data[activeTab].about.image || ''} 
                onChange={(url) => updateSharedField('about', 'image', url)} 
              />
            </Field>
            <div className="grid grid-cols-1 gap-4">
              <Field label="Rozet">
                <input value={data[activeTab].about.badge} onChange={(e) => updateNestedField(activeTab, 'about', 'badge', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Başlık">
                <input value={data[activeTab].about.title} onChange={(e) => updateNestedField(activeTab, 'about', 'title', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Alt Başlık">
                <input value={data[activeTab].about.subtitle} onChange={(e) => updateNestedField(activeTab, 'about', 'subtitle', e.target.value)} className={inputCls} />
              </Field>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
               <Field label="Açıklama">
                <textarea value={data[activeTab].about.description} onChange={(e) => updateNestedField(activeTab, 'about', 'description', e.target.value)} className={inputCls} rows={4} />
              </Field>
              <Field label="Buton Metni">
                <input value={data[activeTab].about.viewCareer} onChange={(e) => updateNestedField(activeTab, 'about', 'viewCareer', e.target.value)} className={inputCls} />
              </Field>
            </div>
          </div>
        </section>

        {/* HOME RESULTS SLIDER - MOVED HERE */}
        <div className="py-4">
          <div className="h-px bg-slate-100 mb-8" />
          <HomeResultsManager />
          <div className="h-px bg-slate-100 mt-8" />
        </div>

        {/* OMURGA SAĞLIĞI MERKEZİ */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Omurga Sağlığı Merkezi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Rozet">
              <input value={data[activeTab].center.badge} onChange={(e) => updateNestedField(activeTab, 'center', 'badge', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Başlık Öneki">
              <input value={data[activeTab].center.titlePrefix} onChange={(e) => updateNestedField(activeTab, 'center', 'titlePrefix', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Başlık Vurgusu">
              <input value={data[activeTab].center.titleAccent} onChange={(e) => updateNestedField(activeTab, 'center', 'titleAccent', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Buton 1">
              <input value={data[activeTab].center.primaryCta} onChange={(e) => updateNestedField(activeTab, 'center', 'primaryCta', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Buton 2">
              <input value={data[activeTab].center.secondaryCta} onChange={(e) => updateNestedField(activeTab, 'center', 'secondaryCta', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Açıklama" className="md:col-span-2">
              <textarea value={data[activeTab].center.description} onChange={(e) => updateNestedField(activeTab, 'center', 'description', e.target.value)} className={inputCls} rows={3} />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {data[activeTab].center.stats.map((stat: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100/50">
                <Field label={`İstatistik ${i+1} Değer`}>
                  <input value={stat.value} onChange={(e) => updateCenterStat(activeTab, i, 'value', e.target.value)} className={inputCls} />
                </Field>
                <Field label={`İstatistik ${i+1} Etiket`}>
                  <input value={stat.label} onChange={(e) => updateCenterStat(activeTab, i, 'label', e.target.value)} className={inputCls} />
                </Field>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Tedavi Süreci Steps</h2>
          <div className="space-y-4">
            {data[activeTab].process.steps.map((step: any, i: number) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-100/50">
                <Field label="Adım No">
                  <input value={step.step} onChange={(e) => updateProcessStep(activeTab, i, 'step', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Başlık">
                  <input value={step.title} onChange={(e) => updateProcessStep(activeTab, i, 'title', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Açıklama">
                  <input value={step.desc} onChange={(e) => updateProcessStep(activeTab, i, 'desc', e.target.value)} className={inputCls} />
                </Field>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Alt CTA Alanı</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Başlık (Satır başı \n ile)">
              <textarea value={data[activeTab].cta.title} onChange={(e) => updateNestedField(activeTab, 'cta', 'title', e.target.value)} className={inputCls} rows={2} />
            </Field>
            <Field label="Alt Başlık">
              <textarea value={data[activeTab].cta.subtitle} onChange={(e) => updateNestedField(activeTab, 'cta', 'subtitle', e.target.value)} className={inputCls} rows={2} />
            </Field>
            <Field label="Buton 1 Metni">
              <input value={data[activeTab].cta.appointmentBtn} onChange={(e) => updateNestedField(activeTab, 'cta', 'appointmentBtn', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Buton 2 Metni">
              <input value={data[activeTab].cta.callBtn} onChange={(e) => updateNestedField(activeTab, 'cta', 'callBtn', e.target.value)} className={inputCls} />
            </Field>
          </div>
        </section>
      </div>

      <div className="fixed bottom-4 right-8 left-64 flex justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl z-50 lg:left-72">
        <button onClick={() => router.back()} className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:text-slate-900 transition-all">İptal</button>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95">{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</button>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm";
