'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, MoveUp, MoveDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

export default function HomeResultsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/home-results');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu sonucu silmek istediğinize emin misiniz?')) return;
    try {
      await fetch(`/api/admin/home-results/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Tedavi Sonuçları Slider</h2>
          <p className="text-sm text-slate-500">Ana sayfadaki sonuçlar kısmındaki görselleri buradan yönetebilirsiniz.</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" /> Yeni Sonuç Ekle
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
      ) : !Array.isArray(items) ? (
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium">Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-video relative">
              <img src={item.img} alt={item.label_tr} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsFormOpen(true);
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg hover:bg-white shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg hover:bg-white shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{item.label_tr}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{item.desc_tr}</p>
            </div>
          </div>
        ))}
      </div>
    )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <HomeResultForm 
              initialData={editingItem} 
              onCancel={() => setIsFormOpen(false)} 
              onSuccess={() => {
                setIsFormOpen(false);
                fetchItems();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function HomeResultForm({ initialData, onCancel, onSuccess }: any) {
  const [img, setImg] = useState(initialData?.img ?? '');
  const [labelTr, setLabelTr] = useState(initialData?.label_tr ?? '');
  const [labelEn, setLabelEn] = useState(initialData?.label_en ?? '');
  const [descTr, setDescTr] = useState(initialData?.desc_tr ?? '');
  const [descEn, setDescEn] = useState(initialData?.desc_en ?? '');
  const [order, setOrder] = useState(initialData?.order ?? 0);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { img, label_tr: labelTr, label_en: labelEn, desc_tr: descTr, desc_en: descEn, order: parseInt(order.toString()) };
    try {
      const url = initialData ? `/api/admin/home-results/${initialData.id}` : '/api/admin/home-results';
      const method = initialData ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h3 className="text-xl font-extrabold text-slate-900">{initialData ? 'Sonucu Düzenle' : 'Yeni Sonuç Ekle'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ImageUpload label="Görsel" value={img} onChange={setImg} />
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sıralama</label>
            <input type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value))} className={inputCls} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Başlık (TR)</label>
            <input value={labelTr} onChange={(e) => setLabelTr(e.target.value)} placeholder="Örn: Skolyoz Tedavisi" className={inputCls} required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Açıklama (TR)</label>
            <textarea value={descTr} onChange={(e) => setDescTr(e.target.value)} rows={3} className={inputCls} placeholder="Tedavi sonucu detayları..." required />
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">İngilizce (Opsiyonel)</p>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Label (EN)</label>
              <input value={labelEn} onChange={(e) => setLabelEn(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Desc (EN)</label>
              <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={2} className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-700">İptal</button>
        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-8 py-2.5 rounded-xl text-sm shadow-lg shadow-blue-600/20">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}
