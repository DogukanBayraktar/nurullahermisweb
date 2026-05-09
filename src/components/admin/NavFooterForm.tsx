'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Info, Plus, Trash2, MoveUp, MoveDown, Globe, Phone, MapPin, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

type NavFooterContent = {
  navbar: {
    links: Array<{ label_tr: string; label_en: string; href: string }>;
  };
  footer: {
    aboutText_tr: string;
    aboutText_en: string;
    quickLinks: Array<{ label_tr: string; label_en: string; href: string }>;
    treatments: Array<{ label_tr: string; label_en: string; href: string }>;
    contact: {
      hospitalName: string;
      address: string;
      phone: string;
      workingHours_tr: string;
      workingHours_en: string;
      email: string;
    };
    social: {
      instagram: string;
      facebook: string;
      youtube: string;
    };
  };
};

export default function NavFooterForm({ initialData }: { initialData: NavFooterContent }) {
  const router = useRouter();
  const [data, setData] = useState<NavFooterContent>(initialData);
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
        body: JSON.stringify({ filename: 'nav-footer.json', content: data }),
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

  const updateLink = (section: 'navbar' | 'quickLinks' | 'treatments', index: number, field: string, value: string) => {
    setData(prev => {
      const newData = { ...prev };
      let links: any[] = [];
      if (section === 'navbar') links = [...prev.navbar.links];
      else if (section === 'quickLinks') links = [...prev.footer.quickLinks];
      else if (section === 'treatments') links = [...prev.footer.treatments];

      links[index] = { ...links[index], [field]: value };

      if (section === 'navbar') newData.navbar = { ...prev.navbar, links };
      else if (section === 'quickLinks') newData.footer = { ...prev.footer, quickLinks: links };
      else if (section === 'treatments') newData.footer = { ...prev.footer, treatments: links };

      return newData;
    });
  };

  const addLink = (section: 'navbar' | 'quickLinks' | 'treatments') => {
    setData(prev => {
      const newData = { ...prev };
      const newLink = { label_tr: '', label_en: '', href: '' };
      
      if (section === 'navbar') newData.navbar = { ...prev.navbar, links: [...prev.navbar.links, newLink] };
      else if (section === 'quickLinks') newData.footer = { ...prev.footer, quickLinks: [...prev.footer.quickLinks, newLink] };
      else if (section === 'treatments') newData.footer = { ...prev.footer, treatments: [...prev.footer.treatments, newLink] };

      return newData;
    });
  };

  const removeLink = (section: 'navbar' | 'quickLinks' | 'treatments', index: number) => {
    setData(prev => {
      const newData = { ...prev };
      if (section === 'navbar') newData.navbar = { ...prev.navbar, links: prev.navbar.links.filter((_, i) => i !== index) };
      else if (section === 'quickLinks') newData.footer = { ...prev.footer, quickLinks: prev.footer.quickLinks.filter((_, i) => i !== index) };
      else if (section === 'treatments') newData.footer = { ...prev.footer, treatments: prev.footer.treatments.filter((_, i) => i !== index) };
      return newData;
    });
  };

  const moveLink = (section: 'navbar' | 'quickLinks' | 'treatments', index: number, direction: 'up' | 'down') => {
    setData(prev => {
      const newData = { ...prev };
      let links: any[] = [];
      if (section === 'navbar') links = [...prev.navbar.links];
      else if (section === 'quickLinks') links = [...prev.footer.quickLinks];
      else if (section === 'treatments') links = [...prev.footer.treatments];

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= links.length) return prev;

      [links[index], links[newIndex]] = [links[newIndex], links[index]];

      if (section === 'navbar') newData.navbar = { ...prev.navbar, links };
      else if (section === 'quickLinks') newData.footer = { ...prev.footer, quickLinks: links };
      else if (section === 'treatments') newData.footer = { ...prev.footer, treatments: links };

      return newData;
    });
  };

  const updateContact = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        contact: { ...prev.footer.contact, [field]: value }
      }
    }));
  };

  const updateSocial = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        social: { ...prev.footer.social, [field]: value }
      }
    }));
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm";

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="fixed top-24 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
        {success && (
          <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">Başarıyla Kaydedildi!</span>
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

      <div className="space-y-8 pb-32">
        {/* NAVBAR LINKS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Üst Menü (Navbar)</h2>
              <p className="text-sm text-slate-500">Sitenin en üstündeki ana navigasyon linkleri.</p>
            </div>
            <button onClick={() => addLink('navbar')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              <Plus className="w-4 h-4" /> Yeni Link Ekle
            </button>
          </div>
          
          <div className="space-y-3">
            {data.navbar.links.map((link, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveLink('navbar', i, 'up')} disabled={i === 0} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0"><MoveUp className="w-4 h-4" /></button>
                  <button onClick={() => moveLink('navbar', i, 'down')} disabled={i === data.navbar.links.length - 1} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-0"><MoveDown className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                  {activeTab === 'tr' ? (
                    <input placeholder="Etiket (TR)" value={link.label_tr} onChange={(e) => updateLink('navbar', i, 'label_tr', e.target.value)} className={inputCls} />
                  ) : (
                    <input placeholder="Etiket (EN)" value={link.label_en} onChange={(e) => updateLink('navbar', i, 'label_en', e.target.value)} className={inputCls} />
                  )}
                  <input placeholder="URL (Örn: /galeri)" value={link.href} onChange={(e) => updateLink('navbar', i, 'href', e.target.value)} className={inputCls} />
                </div>
                <button onClick={() => removeLink('navbar', i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER ABOUT */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Footer Hakkımda Yazısı</h2>
          <div className="space-y-4">
             {activeTab === 'tr' ? (
               <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Yazı (TR)</label>
                <textarea value={data.footer.aboutText_tr} onChange={(e) => setData(prev => ({ ...prev, footer: { ...prev.footer, aboutText_tr: e.target.value } }))} className={inputCls} rows={3} />
              </div>
             ) : (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Yazı (EN)</label>
                <textarea value={data.footer.aboutText_en} onChange={(e) => setData(prev => ({ ...prev, footer: { ...prev.footer, aboutText_en: e.target.value } }))} className={inputCls} rows={3} />
              </div>
             )}
          </div>
        </section>

        {/* FOOTER QUICK LINKS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hızlı Linkler (Footer)</h2>
              <p className="text-sm text-slate-500">Footer'daki sol orta sütun.</p>
            </div>
            <button onClick={() => addLink('quickLinks')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              <Plus className="w-4 h-4" /> Yeni Link Ekle
            </button>
          </div>
          <div className="space-y-3">
            {data.footer.quickLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                  {activeTab === 'tr' ? (
                    <input placeholder="Etiket (TR)" value={link.label_tr} onChange={(e) => updateLink('quickLinks', i, 'label_tr', e.target.value)} className={inputCls} />
                  ) : (
                    <input placeholder="Etiket (EN)" value={link.label_en} onChange={(e) => updateLink('quickLinks', i, 'label_en', e.target.value)} className={inputCls} />
                  )}
                  <input placeholder="URL" value={link.href} onChange={(e) => updateLink('quickLinks', i, 'href', e.target.value)} className={inputCls} />
                </div>
                <button onClick={() => removeLink('quickLinks', i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER TREATMENTS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tedaviler Linkleri (Footer)</h2>
              <p className="text-sm text-slate-500">Footer'daki sağ orta sütun.</p>
            </div>
            <button onClick={() => addLink('treatments')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              <Plus className="w-4 h-4" /> Yeni Link Ekle
            </button>
          </div>
          <div className="space-y-3">
            {data.footer.treatments.map((link, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                  {activeTab === 'tr' ? (
                    <input placeholder="Etiket (TR)" value={link.label_tr} onChange={(e) => updateLink('treatments', i, 'label_tr', e.target.value)} className={inputCls} />
                  ) : (
                    <input placeholder="Etiket (EN)" value={link.label_en} onChange={(e) => updateLink('treatments', i, 'label_en', e.target.value)} className={inputCls} />
                  )}
                  <input placeholder="URL" value={link.href} onChange={(e) => updateLink('treatments', i, 'href', e.target.value)} className={inputCls} />
                </div>
                <button onClick={() => removeLink('treatments', i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT INFO */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">İletişim Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Globe className="w-3 h-3"/> Hastane Adı</label>
              <input value={data.footer.contact.hospitalName} onChange={(e) => updateContact('hospitalName', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><MapPin className="w-3 h-3"/> Adres</label>
              <input value={data.footer.contact.address} onChange={(e) => updateContact('address', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Phone className="w-3 h-3"/> Telefon</label>
              <input value={data.footer.contact.phone} onChange={(e) => updateContact('phone', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Mail className="w-3 h-3"/> E-Posta</label>
              <input value={data.footer.contact.email} onChange={(e) => updateContact('email', e.target.value)} className={inputCls} />
            </div>
            {activeTab === 'tr' ? (
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Çalışma Saatleri (TR)</label>
                <input value={data.footer.contact.workingHours_tr} onChange={(e) => updateContact('workingHours_tr', e.target.value)} className={inputCls} />
              </div>
            ) : (
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Çalışma Saatleri (EN)</label>
                <input value={data.footer.contact.workingHours_en} onChange={(e) => updateContact('workingHours_en', e.target.value)} className={inputCls} />
              </div>
            )}
          </div>
        </section>

        {/* SOCIAL LINKS */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Sosyal Medya Linkleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Instagram className="w-3 h-3"/> Instagram</label>
              <input value={data.footer.social.instagram} onChange={(e) => updateSocial('instagram', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Facebook className="w-3 h-3"/> Facebook</label>
              <input value={data.footer.social.facebook} onChange={(e) => updateSocial('facebook', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1"><Youtube className="w-3 h-3"/> Youtube</label>
              <input value={data.footer.social.youtube} onChange={(e) => updateSocial('youtube', e.target.value)} className={inputCls} />
            </div>
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
