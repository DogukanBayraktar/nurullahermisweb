'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';
import { X } from 'lucide-react';

const CATEGORIES = [
  { tr: "Skolyoz & Kifoz Cerrahisi", en: "Scoliosis & Kyphosis Surgery" },
  { tr: "Bel Fıtığı Tedavisi", en: "Herniated Disc Treatment" },
  { tr: "Boyun Fıtığı Cerrahisi", en: "Neck Hernia Surgery" },
  { tr: "Diz & Kalça Protezi", en: "Knee & Hip Replacement" },
  { tr: "Çocuk Ortopedisi", en: "Pediatric Orthopedics" },
  { tr: "Artroskopik Cerrahi", en: "Arthroscopic Surgery" },
];

type GalleryFormProps = {
  initialData?: any;
  onCancel: () => void;
  onSuccess: () => void;
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

export default function GalleryForm({ initialData, onCancel, onSuccess }: GalleryFormProps) {
  const [img, setImg] = useState(initialData?.img ?? '');
  const [titleTr, setTitleTr] = useState(initialData?.title_tr ?? '');
  const [titleEn, setTitleEn] = useState(initialData?.title_en ?? '');
  const [catTr, setCatTr] = useState(initialData?.category_tr ?? '');
  const [catEn, setCatEn] = useState(initialData?.category_en ?? '');
  const [isCustomCat, setIsCustomCat] = useState(() => {
    const initial = initialData?.category_tr ?? '';
    return initial !== '' && !CATEGORIES.some((c) => c.tr === initial);
  });
  const [order, setOrder] = useState(initialData?.order ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!img) return setError('Görsel yüklemek zorunludur.');
    
    setSaving(true);
    setError('');

    const payload = {
      img,
      title_tr: titleTr,
      title_en: titleEn,
      category_tr: catTr,
      category_en: catEn,
      order: parseInt(order.toString()),
    };

    try {
      const url = initialData ? `/api/admin/gallery/${initialData.id}` : '/api/admin/gallery';
      const method = initialData ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Kayıt hatası');
      onSuccess();
    } catch (err) {
      setError('İşlem sırasında bir hata oluştu.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-extrabold text-slate-900">{initialData ? 'Görseli Düzenle' : 'Yeni Görsel Ekle'}</h2>
        <button type="button" onClick={onCancel} className="p-2 text-slate-400 hover:text-slate-600 transition-all"><X className="w-6 h-6" /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <ImageUpload 
            label="Galeri Görseli" 
            value={img} 
            onChange={(url) => setImg(url)} 
          />
          <Field label="Sıralama (Küçük olan üstte çıkar)">
            <input 
              type="number" 
              value={order} 
              onChange={(e) => setOrder(parseInt(e.target.value))} 
              className={inputCls} 
            />
          </Field>
        </div>

        <div className="space-y-4">
          <Field label="Başlık (TR)" required>
            <input 
              value={titleTr} 
              onChange={(e) => setTitleTr(e.target.value)} 
              placeholder="Örn: Skolyoz Ameliyatı Sonrası" 
              className={inputCls} 
              required 
            />
          </Field>
          <Field label="Kategori (TR)" required>
            <div className="relative group/sel">
              <select
                value={isCustomCat ? 'custom' : catTr}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'custom') {
                    setIsCustomCat(true);
                    setCatTr('');
                    return;
                  }
                  setIsCustomCat(false);
                  setCatTr(val);
                  // Otomatik İngilizce karşılığını setle
                  const found = CATEGORIES.find(c => c.tr === val);
                  if (found) setCatEn(found.en);
                }}
                className={inputCls}
                required
              >
                <option value="">Kategori Seçin...</option>
                {CATEGORIES.map(c => (
                  <option key={c.tr} value={c.tr}>{c.tr}</option>
                ))}
                <option value="custom">-- Özel Kategori Ekle --</option>
              </select>
            </div>
            {isCustomCat && (
              <input
                value={catTr}
                onChange={(e) => setCatTr(e.target.value)}
                placeholder="Özel Kategori Yazın..."
                className={`${inputCls} mt-2`}
              />
            )}
          </Field>
          
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">İngilizce İçerik (Opsiyonel)</p>
            <div className="space-y-4">
              <Field label="Title (EN)">
                <input 
                  value={titleEn} 
                  onChange={(e) => setTitleEn(e.target.value)} 
                  placeholder="Post-op Scoliosis Surgery" 
                  className={inputCls} 
                />
              </Field>
              <Field label="Category (EN)">
                <input 
                  value={catEn} 
                  onChange={(e) => setCatEn(e.target.value)} 
                  placeholder="Scoliosis Surgery" 
                  className={inputCls} 
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-700 transition-all">İptal</button>
        <button 
          type="submit" 
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-8 py-2.5 rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          {saving ? 'Kaydediliyor...' : initialData ? 'Değişiklikleri Güncelle' : 'Galeriyi Kaydet'}
        </button>
      </div>
    </form>
  );
}
