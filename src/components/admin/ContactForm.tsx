'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, Plus, Trash2, Phone, Mail, Globe, 
  MapPin, CheckCircle, Info 
} from 'lucide-react';

interface Location {
  name_tr: string;
  name_en: string;
  fullName_tr: string;
  fullName_en: string;
  address_tr: string;
  address_en: string;
  city: string;
  phone: string;
  phoneHref: string;
  mapSrc: string;
  mapLink: string;
  workingHours_tr?: string;
  workingHours_en?: string;
}

interface ContactData {
  appointmentPhone: string;
  whatsappNumber: string;
  email: string;
  locations: Location[];
}

const DEFAULT_DATA: ContactData = {
  appointmentPhone: '444 77 99',
  whatsappNumber: '905321397799',
  email: 'nurullahermis@central.com.tr',
  locations: [
    {
      name_tr: 'Ataşehir',
      name_en: 'Atasehir',
      fullName_tr: 'Central Hospital Ataşehir',
      fullName_en: 'Central Hospital Atasehir',
      address_tr: 'Küçükbakkalköy, Kayışdağı Cd. No:57/A',
      address_en: 'Kucukbakkalkoy, Kayisdagi Cd. No:57/A',
      city: '34750 Ataşehir / İstanbul',
      phone: '444 77 99',
      phoneHref: 'tel:4447799',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5118.220238154112!2d29.108239877284667!3d40.97924672121005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac63eda655555%3A0x81aef318ad174a80!2sCentral%20Hospital%20Ata%C5%9Fehir!5e1!3m2!1str!2str!4v1774208748265!5m2!1str!2str',
      mapLink: 'https://maps.google.com/?q=Central+Hospital+Ata%C5%9Fehir',
      workingHours_tr: 'Hafta içi: 08:30 - 18:00',
      workingHours_en: 'Weekdays: 08:30 - 18:00',
    }
  ]
};

export default function ContactForm() {
  const router = useRouter();
  const [data, setData] = useState<ContactData>(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/content?filename=contact.json');
      if (res.ok) {
        const json = await res.json();
        if (json) {
          let content = json;
          
          // Veri yapısı kontrolü ve göçü (Migration)
          if (content.locations && Array.isArray(content.locations)) {
            content.locations = content.locations.map((loc: any) => ({
              ...loc,
              name_tr: loc.name_tr || loc.name || '',
              name_en: loc.name_en || loc.name || '',
              fullName_tr: loc.fullName_tr || loc.fullName || '',
              fullName_en: loc.fullName_en || loc.fullName || '',
              address_tr: loc.address_tr || loc.address || '',
              address_en: loc.address_en || loc.address || '',
              workingHours_tr: loc.workingHours_tr || 'Hafta içi: 08:30 - 18:00',
              workingHours_en: loc.workingHours_en || 'Weekdays: 08:30 - 18:00',
            }));
            setData(content);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'contact.json',
          content: data
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        setError('Kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      setError('Sunucuyla bağlantı kurulamadı.');
    } finally {
      setSaving(false);
    }
  };

  const addLocation = () => {
    setData({
      ...data,
      locations: [...data.locations, { 
        ...DEFAULT_DATA.locations[0], 
        name_tr: 'Yeni Lokasyon',
        name_en: 'New Location'
      }]
    });
  };

  const removeLocation = (index: number) => {
    const newLocations = data.locations.filter((_, i) => i !== index);
    setData({ ...data, locations: newLocations });
  };

  const updateLocation = (index: number, field: keyof Location, value: string) => {
    const newLocations = [...data.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setData({ ...data, locations: newLocations });
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Yükleniyor...</div>;

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

      {/* Language Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('tr')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'tr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          🇹🇷 Türkçe
        </button>
        <button 
          onClick={() => setActiveTab('en')} 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          🇬🇧 English
        </button>
      </div>

      <div className="space-y-8 pb-32">
        {/* GENEL BILGILER */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Genel İletişim Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Randevu Hattı">
              <input 
                value={data.appointmentPhone} 
                onChange={(e) => setData({ ...data, appointmentPhone: e.target.value })} 
                className={inputCls} 
                placeholder="444 77 99"
              />
            </Field>
            <Field label="WhatsApp No (90...)">
              <input 
                value={data.whatsappNumber} 
                onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })} 
                className={inputCls} 
                placeholder="90532..."
              />
            </Field>
            <Field label="E-Posta">
              <input 
                value={data.email} 
                onChange={(e) => setData({ ...data, email: e.target.value })} 
                className={inputCls} 
                placeholder="e-posta@adresiniz.com"
              />
            </Field>
          </div>
        </section>

        {/* LOKASYONLAR */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Hastaneler & Lokasyonlar</h2>
            <button 
              onClick={addLocation} 
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
            >
              + Yeni Lokasyon Ekle
            </button>
          </div>

          <div className="space-y-6">
            {data.locations.map((loc, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <button 
                  onClick={() => removeLocation(i)} 
                  className="absolute top-4 right-4 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label={`Kısa İsim (${activeTab.toUpperCase()})`}>
                        {activeTab === 'tr' ? (
                          <input value={loc.name_tr} onChange={(e) => updateLocation(i, 'name_tr', e.target.value)} className={inputCls} placeholder="Örn: Ataşehir" />
                        ) : (
                          <input value={loc.name_en} onChange={(e) => updateLocation(i, 'name_en', e.target.value)} className={inputCls} placeholder="Ex: Atasehir" />
                        )}
                      </Field>
                      <Field label={`Tam Hastane Adı (${activeTab.toUpperCase()})`}>
                        {activeTab === 'tr' ? (
                          <input value={loc.fullName_tr} onChange={(e) => updateLocation(i, 'fullName_tr', e.target.value)} className={inputCls} />
                        ) : (
                          <input value={loc.fullName_en} onChange={(e) => updateLocation(i, 'fullName_en', e.target.value)} className={inputCls} />
                        )}
                      </Field>
                    </div>
                    <Field label={`Adres (${activeTab.toUpperCase()})`}>
                      {activeTab === 'tr' ? (
                        <textarea value={loc.address_tr} onChange={(e) => updateLocation(i, 'address_tr', e.target.value)} className={inputCls} rows={2} />
                      ) : (
                        <textarea value={loc.address_en} onChange={(e) => updateLocation(i, 'address_en', e.target.value)} className={inputCls} rows={2} />
                      )}
                    </Field>
                    <Field label={`Çalışma Saatleri (${activeTab.toUpperCase()})`}>
                      {activeTab === 'tr' ? (
                        <input value={loc.workingHours_tr} onChange={(e) => updateLocation(i, 'workingHours_tr', e.target.value)} className={inputCls} placeholder="Haftaiçi: 08:30..." />
                      ) : (
                        <input value={loc.workingHours_en} onChange={(e) => updateLocation(i, 'workingHours_en', e.target.value)} className={inputCls} placeholder="Weekdays: 08:30..." />
                      )}
                    </Field>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Telefon Görünümü">
                        <input value={loc.phone} onChange={(e) => updateLocation(i, 'phone', e.target.value)} className={inputCls} />
                      </Field>
                      <Field label="İl / İlçe">
                        <input value={loc.city} onChange={(e) => updateLocation(i, 'city', e.target.value)} className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Google Maps Embed URL">
                      <input value={loc.mapSrc} onChange={(e) => updateLocation(i, 'mapSrc', e.target.value)} className={inputCls} placeholder="https://www.google.com/maps/embed?..." />
                    </Field>
                    <Field label="Google Maps Link">
                      <input value={loc.mapLink} onChange={(e) => updateLocation(i, 'mapLink', e.target.value)} className={inputCls} />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-4 right-8 left-64 flex justify-end gap-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl z-50 lg:left-72">
        <button 
          onClick={() => router.back()} 
          className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:text-slate-900 transition-all"
        >
          İptal
        </button>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-10 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
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
