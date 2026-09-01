'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin, Phone, Clock, AlertCircle, CheckCircle2,
  MessageSquare, Navigation, Mail
} from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export default function ContactClient({ 
  contactData, 
  forceLang 
}: { 
  contactData: any; 
  forceLang?: 'tr' | 'en';
}) {
  const { t, i18n } = useTranslation();
  const lang = forceLang || (i18n.language as 'tr' | 'en') || 'tr';
  const [activeLocation, setActiveLocation] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const LOCATIONS = (contactData.locations || []).map((loc: any) => ({
    ...loc,
    name: lang === 'en' ? (loc.name_en || loc.name_tr) : loc.name_tr,
    fullName: lang === 'en' ? (loc.fullName_en || loc.fullName_tr) : loc.fullName_tr,
    address: lang === 'en' ? (loc.address_en || loc.address_tr) : loc.address_tr,
    workingHours: lang === 'en' ? (loc.workingHours_en || loc.workingHours_tr) : loc.workingHours_tr,
  }));

  const appointmentPhone = contactData.appointmentPhone || '444 77 99';
  const whatsappNumber = contactData.whatsappNumber || '905321397799';
  const email = contactData.email || 'nurullahermis@central.com.tr';

  const isValidName = (value: string) => /^[a-zA-ZğüşöçİĞÜŞÖÇ\s]*$/.test(value);
  const isValidPhone = (value: string) => /^[0-9\s]*$/.test(value);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(!isValidName(value) ? t('contact.form.errors.onlyLetters') : '');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (!isValidPhone(value)) setPhoneError(t('contact.form.errors.onlyNumbers'));
    else if (value.replace(/\s/g, '').length < 10 && value.length > 0) setPhoneError(t('contact.form.errors.invalidPhone'));
    else setPhoneError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    if (nameError || phoneError || !name.trim() || !phone.trim()) {
      if (!name.trim()) setNameError(t('contact.form.errors.required'));
      if (!phone.trim()) setPhoneError(t('contact.form.errors.required'));
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
      else setSubmitError(t('contact.form.errors.server'));
    } catch {
      setSubmitError(t('contact.form.errors.connection'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const loc = LOCATIONS[activeLocation];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up">
            <div className="mb-10">
              <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-2">{t('contact.pageBadge')}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{t('contact.pageTitle')}</h1>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <FadeIn direction="up" delay={0.05} className="lg:col-span-3">
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                  <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-1.5">{t('contact.form.badge')}</p>
                  <h2 className="text-2xl font-extrabold text-slate-900">{t('contact.form.title')}</h2>
                  <p className="text-slate-500 text-sm mt-1.5">{t('contact.form.subtitle')}</p>
                </div>

                {isSuccess ? (
                  <div className="px-8 py-16 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">{t('contact.success.title')}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">{t('contact.success.description')}</p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setPhone('');
                      }}
                      className="px-7 py-3 bg-slate-900 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors"
                    >
                      {t('contact.success.newRequest')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
                    <input type="hidden" name="_subject" value={t('contact.form.emailSubject')} />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                          {t('contact.form.name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name={t('contact.form.name')}
                          required
                          value={name}
                          onChange={handleNameChange}
                          placeholder={t('contact.form.placeholders.name')}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-300 ${nameError ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-400 focus:border-blue-400 bg-white'}`}
                        />
                        {nameError && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{nameError}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                          {t('contact.form.phone')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name={t('contact.form.phone')}
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder={t('contact.form.placeholders.phone')}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all placeholder:text-slate-300 ${phoneError ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-blue-400 focus:border-blue-400 bg-white'}`}
                        />
                        {phoneError && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{phoneError}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        {t('contact.form.subject')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name={t('contact.form.subject')}
                        required
                        placeholder={t('contact.form.placeholders.subject')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        {t('contact.form.campus')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {LOCATIONS.map((location: any, i: number) => (
                          <label key={i} className="relative cursor-pointer">
                            <input type="radio" name={t('contact.form.campus')} value={location.name} defaultChecked={i === 0} className="sr-only peer" />
                            <div className="text-center px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-300 transition-all">
                              {location.name}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                        {t('contact.form.messageOptional')}
                      </label>
                      <textarea
                        id="message"
                        name={t('contact.form.message')}
                        rows={3}
                        placeholder={t('contact.form.placeholders.message')}
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
                      {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                    </button>

                    <p className="text-center text-xs text-slate-400">{t('contact.form.privacy')}</p>
                  </form>
                )}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1} className="lg:col-span-2 h-full">
              <div className="h-full bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                  <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-1.5">{t('contact.info.badge')}</p>
                  <h2 className="text-xl font-extrabold text-slate-900">{t('contact.info.title')}</h2>
                </div>

                <div className="flex flex-col flex-1 divide-y divide-slate-100">
                  <a href={`tel:${appointmentPhone.replace(/\s/g, '')}`} className="group flex items-center gap-4 px-8 py-5 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Phone className="w-[18px] h-[18px] text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('contact.info.appointmentLine')}</p>
                      <p className="text-base font-extrabold text-slate-900 leading-tight">{appointmentPhone}</p>
                    </div>
                  </a>

                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-8 py-5 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                      <MessageSquare className="w-[18px] h-[18px] text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">WhatsApp</p>
                      <p className="text-base font-extrabold text-slate-900 leading-tight">{t('contact.info.whatsappTitle')}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{t('contact.info.whatsappSubtitle')}</p>
                    </div>
                  </a>

                  <a href={`mailto:${email}`} className="group flex items-center gap-4 px-8 py-5 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                      <Mail className="w-[18px] h-[18px] text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('contact.info.email')}</p>
                      <p className="text-sm font-extrabold text-slate-900 leading-tight truncate">{email}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 px-8 py-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <Clock className="w-[18px] h-[18px] text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t('contact.info.hours')}</p>
                      <p className="text-sm font-extrabold text-slate-900 leading-tight whitespace-pre-line">{loc.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-md shadow-emerald-600/20">
                    <MessageSquare className="w-4 h-4" />
                    {t('contact.info.whatsappButton')}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-1.5">{t('contact.locations.badge')}</p>
                <h2 className="text-2xl font-extrabold text-slate-900">{t('contact.locations.title')}</h2>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {LOCATIONS.map((location: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveLocation(i)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 ${activeLocation === i ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-blue-200 hover:bg-white'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${activeLocation === i ? 'bg-blue-600' : 'bg-slate-300'}`} />
                    <p className={`font-extrabold text-sm ${activeLocation === i ? 'text-blue-700' : 'text-slate-800'}`}>{location.fullName}</p>
                  </div>
                  <p className="text-xs text-slate-600 pl-4 font-medium">{location.address}</p>
                  <p className="text-xs text-slate-400 pl-4">{location.city}</p>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 h-80 lg:h-[100%] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                {loc && (
                  <iframe
                    key={activeLocation}
                    src={loc.mapSrc}
                    title={`${loc.name} ${t('contact.locations.mapTitleSuffix')}`}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 flex flex-col justify-between shadow-sm">
                {loc && (
                  <>
                    <div className="space-y-5">
                      <div>
                        <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
                          {loc.name} {t('contact.locations.campus')}
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900">{loc.fullName}</h3>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{t('contact.info.address')}</p>
                          <p className="text-sm text-slate-800 font-medium leading-snug">{loc.address}</p>
                          <p className="text-sm text-slate-500">{loc.city}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{t('contact.info.phone')}</p>
                          <a href={loc.phoneHref} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">{loc.phone}</a>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{t('contact.info.hours')}</p>
                          <p className="text-sm text-slate-800 font-medium whitespace-pre-line">{loc.workingHours}</p>
                        </div>
                      </div>
                    </div>

                    <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all shadow-md shadow-blue-600/20">
                      <Navigation className="w-4 h-4" /> {t('contact.locations.openInMaps')}
                    </a>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
