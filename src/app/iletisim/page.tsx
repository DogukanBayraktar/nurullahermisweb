'use client';

import React, { useState } from 'react';
import {
  MapPin, Phone, Clock, AlertCircle, CheckCircle2,
  MessageSquare, Navigation, Mail
} from 'lucide-react';
import { FadeIn } from "@/components/ui/fade-in";

/* ─── Veri ─── */

const LOCATIONS = [
  {
    name: "Ataşehir",
    fullName: "Central Hospital Ataşehir",
    address: "Küçükbakkalköy, Kayışdağı Cd. No:57/A",
    city: "34750 Ataşehir / İstanbul",
    phone: "444 77 99",
    phoneHref: "tel:4447799",
    hours: "Pzt – Cuma: 08:00 – 20:00",
    saturday: "Cumartesi: Randevu ile",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5118.220238154112!2d29.108239877284667!3d40.97924672121005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac63eda655555%3A0x81aef318ad174a80!2sCentral%20Hospital%20Ata%C5%9Fehir!5e1!3m2!1str!2str!4v1774208748265!5m2!1str!2str",
    mapLink: "https://maps.google.com/?q=Central+Hospital+Ata%C5%9Fehir",
  },
  {
    name: "Etiler",
    fullName: "Central Hospital Etiler",
    address: "Nispetiye Cad., Aydın Sok. No:1",
    city: "34470 Beşiktaş / İstanbul",
    phone: "444 77 99",
    phoneHref: "tel:4447799",
    hours: "Pzt – Cuma: 08:00 – 20:00",
    saturday: "Cumartesi: Randevu ile",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5110.973726942936!2d29.018440700000003!3d41.0725465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9ffdb70bec1%3A0x6feb6bf513363f5d!2sCentral%20Hospital%20Etiler!5e1!3m2!1str!2str!4v1774208693916!5m2!1str!2str",
    mapLink: "https://maps.google.com/?q=Central+Hospital+Etiler",
  },
  {
    name: "Kozyatağı",
    fullName: "Central Hospital Kozyatağı",
    address: "Kozyatağı Sk. No:5",
    city: "34742 Kadıköy / İstanbul",
    phone: "444 77 99",
    phoneHref: "tel:4447799",
    hours: "Pzt – Cuma: 08:00 – 20:00",
    saturday: "Cumartesi: Randevu ile",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5119.247640900299!2d29.097647377284336!3d40.96600462202482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac655d269c4e7%3A0x6cd24ca540cbe444!2sCentral%20Hospital!5e1!3m2!1str!2str!4v1774208725692!5m2!1str!2str",
    mapLink: "https://maps.google.com/?q=Central+Hospital+Kozyata%C4%9F%C4%B1",
  },
];

/* ─── Component ─── */

export default function IletisimPage() {
  const [activeLocation, setActiveLocation] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const isValidName = (t: string) => /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]*$/.test(t);
  const isValidPhone = (t: string) => /^[0-9\s]*$/.test(t);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value; setName(v);
    setNameError(!isValidName(v) ? 'Yalnızca harf giriniz.' : '');
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value; setPhone(v);
    if (!isValidPhone(v)) setPhoneError('Yalnızca rakam giriniz.');
    else if (v.replace(/\s/g, '').length < 10 && v.length > 0) setPhoneError('Geçerli bir numara giriniz.');
    else setPhoneError('');
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSubmitError('');
    if (nameError || phoneError || !name.trim() || !phone.trim()) {
      if (!name.trim()) setNameError('Bu alan zorunludur.');
      if (!phone.trim()) setPhoneError('Bu alan zorunludur.');
      return;
    }
    setIsSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('https://formsubmit.co/ajax/dogukan.bayraktar11@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setIsSuccess(true);
      else setSubmitError('Sunucu hatası. Lütfen tekrar deneyin.');
    } catch { setSubmitError('Bağlantı hatası. İnterneti kontrol edin.'); }
    finally { setIsSubmitting(false); }
  };

  const loc = LOCATIONS[activeLocation];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ══════════════════════════════════════════
          FORM + İLETİŞİM KARTLARI
      ══════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Sayfa başlığı */}
          <FadeIn direction="up">
            <div className="mb-10">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-2">Randevu & İletişim</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">İletişim</h1>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── FORM (3 kolon) ── */}
            <FadeIn direction="up" delay={0.05} className="lg:col-span-3">
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">

                <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                  <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-1.5">Online Başvuru</p>
                  <h2 className="text-2xl font-extrabold text-slate-900">Randevu Talebi</h2>
                  <p className="text-slate-500 text-sm mt-1.5">Formu doldurun, en kısa sürede sizi arayalım.</p>
                </div>

                {isSuccess ? (
                  <div className="px-8 py-16 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">Talebiniz Alındı</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
                      En kısa sürede sizinle irtibata geçeceğiz. Sağlıklı günler dileriz.
                    </p>
                    <button
                      onClick={() => { setIsSuccess(false); setName(''); setPhone(''); }}
                      className="px-7 py-3 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors"
                    >
                      Yeni Talep Oluştur
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
                    <input type="hidden" name="_subject" value="Web Sitenizden Yeni Randevu Talebi!" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />

                    {/* Ad + Telefon */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Ad Soyad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text" id="name" name="Ad Soyad" required
                          value={name} onChange={handleNameChange} placeholder="Ahmet Yılmaz"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-300 ${nameError ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-400 focus:border-blue-400 bg-white'}`}
                        />
                        {nameError && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{nameError}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel" id="phone" name="Telefon" required
                          value={phone} onChange={handlePhoneChange} placeholder="0555 555 55 55"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-300 ${phoneError ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-400 focus:border-blue-400 bg-white'}`}
                        />
                        {phoneError && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{phoneError}</p>}
                      </div>
                    </div>

                    {/* Şikayet */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Şikayet / Konu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="subject" name="Konu" required
                        placeholder="Örn: Bel fıtığı, skolyoz, diz ağrısı…"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-slate-300"
                      />
                    </div>

                    {/* Kampüs seçimi */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Tercih Edilen Kampüs
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {LOCATIONS.map((l, i) => (
                          <label key={i} className="relative cursor-pointer">
                            <input type="radio" name="Kampüs" value={l.name} defaultChecked={i === 0} className="sr-only peer" />
                            <div className="text-center px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-300 transition-all">
                              {l.name}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Mesaj */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Ek Bilgi <span className="text-slate-400 font-normal normal-case">(isteğe bağlı)</span>
                      </label>
                      <textarea
                        id="message" name="Mesaj" rows={3}
                        placeholder="MR veya röntgen sonucunuz varsa ziyarette getirmeniz önerilir."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-slate-300 resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />{submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !!nameError || !!phoneError}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01]"
                    >
                      {isSubmitting ? 'Gönderiliyor…' : 'Randevu Talebini Gönder'}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Kişisel verileriniz yalnızca randevu amacıyla kullanılır.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* ── İLETİŞİM KARTLARI (2 kolon) ── */}
            <FadeIn direction="up" delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">

                {/* Telefon */}
                <a href="tel:4447799"
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Randevu Hattı</p>
                    <p className="text-base font-extrabold text-slate-900">444 77 99</p>
                    <p className="text-xs text-slate-400 mt-0.5">0532 205 16 37</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/905321397799" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <MessageSquare className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">WhatsApp</p>
                    <p className="text-base font-extrabold text-slate-900">Mesaj Gönder</p>
                    <p className="text-xs text-slate-400 mt-0.5">Hızlı yanıt için</p>
                  </div>
                </a>

                {/* E-posta */}
                <a href="mailto:nurullahermis@erenhastanesi.com"
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">E-posta</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">nurullahermis</p>
                    <p className="text-xs text-slate-400">@erenhastanesi.com</p>
                  </div>
                </a>

                {/* Çalışma saatleri */}
                <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Çalışma Saatleri</p>
                    <p className="text-sm font-bold text-slate-900">Pzt – Cuma: 08:00 – 20:00</p>
                    <p className="text-xs text-slate-400 mt-0.5">Cumartesi: Randevu ile</p>
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MUAYENE LOKASYONLARI
      ══════════════════════════════════════════ */}
      <section className="py-14 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">

          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-1.5">Neredeyiz?</p>
                <h2 className="text-2xl font-extrabold text-slate-900">Muayene Lokasyonları</h2>
              </div>
            </div>
          </FadeIn>

          {/* 3 lokasyon kartı — haritanın ÜSTÜNDE */}
          <FadeIn direction="up" delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {LOCATIONS.map((l, i) => (
                <button key={i} onClick={() => setActiveLocation(i)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 ${activeLocation === i ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-white'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${activeLocation === i ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <p className={`font-extrabold text-sm ${activeLocation === i ? 'text-blue-700' : 'text-slate-800'}`}>{l.fullName}</p>
                  </div>
                  <p className="text-xs text-slate-600 pl-4 font-medium">{l.address}</p>
                  <p className="text-xs text-slate-400 pl-4">{l.city}</p>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Harita + detay kartı */}
          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Harita */}
              <div className="lg:col-span-2 h-80 lg:h-[100%] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <iframe
                  key={activeLocation}
                  src={loc.mapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Detay */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm">
                <div className="space-y-5">
                  <div>
                    <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
                      {loc.name} Kampüsü
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">{loc.fullName}</h3>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Adres</p>
                      <p className="text-sm text-slate-800 font-medium leading-snug">{loc.address}</p>
                      <p className="text-sm text-slate-500">{loc.city}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Telefon</p>
                      <a href={loc.phoneHref} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">{loc.phone}</a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Çalışma Saatleri</p>
                      <p className="text-sm text-slate-800 font-medium">{loc.hours}</p>
                      <p className="text-sm text-slate-500">{loc.saturday}</p>
                    </div>
                  </div>
                </div>

                <a href={loc.mapLink} target="_blank" rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all shadow-md shadow-blue-600/20">
                  <Navigation className="w-4 h-4" /> Google Maps'te Aç
                </a>
              </div>

            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
