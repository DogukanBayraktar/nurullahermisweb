'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, CheckCircle, Info } from 'lucide-react';

type AboutContent = {
  tr: any;
  en: any;
};

export default function AboutForm({ initialData }: { initialData: AboutContent }) {
  const router = useRouter();
  const [data, setData] = useState<AboutContent>(initialData);
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: 'about.json', content: data }),
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

  const updateHero = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        hero: { ...prev[activeTab].hero, [field]: value }
      }
    }));
  };

  const updateList = (section: string, index: number, field: string | null, value: string) => {
    setData(prev => {
      const newList = [...prev[activeTab][section].items];
      if (field === null) {
        newList[index] = value;
      } else {
        newList[index] = { ...newList[index], [field]: value };
      }
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [section]: { ...prev[activeTab][section], items: newList }
        }
      };
    });
  };

  const addListItem = (section: string, template: any) => {
    setData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [section]: {
          ...prev[activeTab][section],
          items: [template, ...prev[activeTab][section].items] // NEW ITEM AT TOP
        }
      }
    }));
  };

  const removeListItem = (section: string, index: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    
    setData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [section]: {
          ...prev[activeTab][section],
          items: prev[activeTab][section].items.filter((_: any, i: number) => i !== index)
        }
      }
    }));
    setDeleteNotify(true);
    setTimeout(() => setDeleteNotify(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
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

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button onClick={() => setActiveTab('tr')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>🇹🇷 Türkçe</button>
        <button onClick={() => setActiveTab('en')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>🇬🇧 English</button>
      </div>

      <div className="space-y-8">
        {/* HERO */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Üst Bölüm & Biyografi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Rozet">
              <input value={data[activeTab].hero.badge} onChange={(e) => updateHero('badge', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Ad Soyad">
              <input value={data[activeTab].hero.name} onChange={(e) => updateHero('name', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Ünvan" className="md:col-span-2">
              <input value={data[activeTab].hero.title} onChange={(e) => updateHero('title', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Biyografi Paragraf 1" className="md:col-span-2">
              <textarea value={data[activeTab].hero.bio1} onChange={(e) => updateHero('bio1', e.target.value)} className={inputCls} rows={3} />
            </Field>
            <Field label="Biyografi Paragraf 2" className="md:col-span-2">
              <textarea value={data[activeTab].hero.bio2} onChange={(e) => updateHero('bio2', e.target.value)} className={inputCls} rows={3} />
            </Field>
            <Field label="Alıntı (Motto)" className="md:col-span-2">
              <textarea value={data[activeTab].hero.bio3} onChange={(e) => updateHero('bio3', e.target.value)} className={inputCls} rows={3} />
            </Field>
          </div>
        </section>

        {/* EĞİTİM */}
        <ListSection
          title="Eğitim ve Uzmanlık"
          items={data[activeTab].education.items}
          onUpdate={(i, f, v) => updateList('education', i, f, v)}
          onAdd={() => addListItem('education', { year: '', title: '', subtitle: '' })}
          onRemove={(i) => removeListItem('education', i)}
          fields={[{ key: 'year', label: 'Yıl' }, { key: 'title', label: 'Kurum' }, { key: 'subtitle', label: 'Detay' }]}
        />

        {/* DENEYİM */}
        <ListSection
          title="Mesleki Deneyim"
          items={data[activeTab].experience.items}
          onUpdate={(i, f, v) => updateList('experience', i, f, v)}
          onAdd={() => addListItem('experience', { period: '', title: '', subtitle: '' })}
          onRemove={(i) => removeListItem('experience', i)}
          fields={[{ key: 'period', label: 'Dönem' }, { key: 'title', label: 'Hastane/Kurum' }, { key: 'subtitle', label: 'Pozisyon/Şehir' }]}
        />

        {/* SERTİFİKALAR */}
        <ListSection
          title="Kurslar ve Sertifikalar"
          items={data[activeTab].certificates.items}
          onUpdate={(i, f, v) => updateList('certificates', i, f, v)}
          onAdd={() => addListItem('certificates', { year: '', title: '' })}
          onRemove={(i) => removeListItem('certificates', i)}
          fields={[{ key: 'year', label: 'Yıl' }, { key: 'title', label: 'Sertifika Adı' }]}
        />

        {/* UZMANLIK ALANLARI */}
        <ListSection
          title="Uzmanlık ve Tıbbi İlgi Alanları"
          items={data[activeTab].expertise.items}
          onUpdate={(i, f, v) => updateList('expertise', i, f, v)}
          onAdd={() => addListItem('expertise', { title: '', desc: '' })}
          onRemove={(i) => removeListItem('expertise', i)}
          fields={[{ key: 'title', label: 'Kategori' }, { key: 'desc', label: 'Açıklama (virgülle ayırın)' }]}
        />

        {/* YAYINLAR */}
        <ListSection
          title="Akademik Yayınlar"
          items={data[activeTab].publications.items}
          onUpdate={(i, f, v) => updateList('publications', i, f, v)}
          onAdd={() => addListItem('publications', { year: '', title: '', journal: '', authors: '' })}
          onRemove={(i) => removeListItem('publications', i)}
          fields={[{ key: 'year', label: 'Yıl' }, { key: 'title', label: 'Makale Başlığı' }, { key: 'journal', label: 'Dergi/Cilt' }, { key: 'authors', label: 'Yazarlar' }]}
        />

        {/* KİTAPLAR */}
        <ListSection
          title="Kitap Bölümleri"
          items={data[activeTab].books.items}
          onUpdate={(i, f, v) => updateList('books', i, f, v)}
          onAdd={() => addListItem('books', { title: '', book: '', detail: '' })}
          onRemove={(i) => removeListItem('books', i)}
          fields={[{ key: 'title', label: 'Bölüm Adı' }, { key: 'book', label: 'Kitap Adı' }, { key: 'detail', label: 'Yayıncı/Yıl' }]}
        />

        {/* KONGRELER */}
        <ListSection
          title="Kongre Sunumları"
          items={data[activeTab].congresses.items}
          onUpdate={(i, f, v) => updateList('congresses', i, f, v)}
          onAdd={() => addListItem('congresses', { year: '', title: '', topic: '' })}
          onRemove={(i) => removeListItem('congresses', i)}
          fields={[{ key: 'year', label: 'Yıl' }, { key: 'title', label: 'Kongre Adı' }, { key: 'topic', label: 'Konu' }]}
        />

        {/* ÜYELİKLER */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Mesleki Üyelikler</h2>
            <button onClick={() => addListItem('memberships', '')} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"><Plus className="w-3.5 h-3.5" /> Ekle</button>
          </div>
          <div className="space-y-3">
            {data[activeTab].memberships.items.map((item: string, i: number) => (
              <div key={i} className="flex gap-2">
                <input value={item} onChange={(e) => updateList('memberships', i, null, e.target.value)} className={inputCls} placeholder="Dernek adı..." />
                <button onClick={() => removeListItem('memberships', i)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="sticky bottom-8 flex justify-end gap-3 pt-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl">
        <button onClick={() => router.back()} className="px-6 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-all">İptal</button>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95">{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</button>
      </div>
    </div>
  );
}

function ListSection({ title, items, onUpdate, onAdd, onRemove, fields }: { title: string; items: any[]; onUpdate: (i: number, f: string, v: string) => void; onAdd: () => void; onRemove: (i: number) => void; fields: { key: string, label: string }[] }) {
  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <button onClick={onAdd} className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-all"><Plus className="w-3.5 h-3.5" /> Ekle</button>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 relative group">
            <button onClick={() => onRemove(i)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              {fields.map((field) => (
                <Field key={field.key} label={field.label} className={fields.length > 2 && field.key !== 'year' && field.key !== 'period' ? 'md:col-span-1' : ''}>
                  <input value={item[field.key]} onChange={(e) => onUpdate(i, field.key, e.target.value)} className={inputCls} />
                </Field>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
