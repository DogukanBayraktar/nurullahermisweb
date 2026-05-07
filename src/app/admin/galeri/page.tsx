'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, CheckCircle, Info } from 'lucide-react';
import Image from 'next/image';
import GalleryForm from '@/components/admin/GalleryForm';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [deleteNotify, setDeleteNotify] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bu görseli galeriden silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setDeleteNotify(true);
      setTimeout(() => setDeleteNotify(false), 2500);
      fetchItems();
    }
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingItem(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
    fetchItems();
  };

  return (
    <AdminShell>
      <div className="p-8 space-y-6">
        {/* Notifications */}
        <div className="fixed top-24 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
          {success && (
            <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold text-sm tracking-wide">Galeri Güncellendi!</span>
            </div>
          )}
          {deleteNotify && (
            <div className="bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-sm tracking-wide">Görsel Galeriden Silindi.</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Galeri Yönetimi</h1>
            <p className="text-slate-500 text-sm mt-1">Önce/Sonra görsellerini ve vaka fotoğraflarını yönetin.</p>
          </div>
          <button
            onClick={() => { setEditingItem(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Görsel Ekle</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8">
                <GalleryForm
                  initialData={editingItem}
                  onCancel={() => { setShowForm(false); setEditingItem(null); }}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-slate-400 font-medium">Yükleniyor...</div>
          ) : items.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">Galeride henüz görsel yok.</p>
              <p className="text-slate-400 text-sm mt-1">Yeni bir görsel ekleyerek başlayın.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
              {items.map((item) => (
                <div key={item.id} className="group relative bg-slate-50 rounded-2xl border border-slate-100/50 overflow-hidden transition-all hover:shadow-xl hover:border-blue-100">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={item.img} alt={item.title_tr} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{item.category_tr}</p>
                    <h3 className="font-bold text-slate-900 text-sm truncate">{item.title_tr}</h3>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { setEditingItem(item); setShowForm(true); }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-600 hover:text-blue-600 shadow-sm transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-600 hover:text-red-600 shadow-sm transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
