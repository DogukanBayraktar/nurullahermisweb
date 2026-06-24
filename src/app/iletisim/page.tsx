import { getStaticContent } from '@/lib/content';
import ContactClient from '@/components/contact/ContactClient';

const DEFAULT_LOCATIONS = [
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
  },
  {
    name_tr: 'Etiler',
    name_en: 'Etiler',
    fullName_tr: 'Central Hospital Etiler',
    fullName_en: 'Central Hospital Etiler',
    address_tr: 'Nispetiye Cad., Aydın Sok. No:1',
    address_en: 'Nispetiye Cad., Aydın Sok. No:1',
    city: '34470 Beşiktaş / İstanbul',
    phone: '444 77 99',
    phoneHref: 'tel:4447799',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5110.973726942936!2d29.018440700000003!3d41.0725465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9ffdb70bec1%3A0x6feb6bf513363f5d!2sCentral%20Hospital%20Etiler!5e1!3m2!1str!2str!4v1774208693916!5m2!1str!2str',
    mapLink: 'https://maps.google.com/?q=Central+Hospital+Etiler',
    workingHours_tr: 'Hafta içi: 08:30 - 18:00',
    workingHours_en: 'Weekdays: 08:30 - 18:00',
  },
  {
    name_tr: 'Kozyatağı',
    name_en: 'Kozyatagi',
    fullName_tr: 'Central Hospital Kozyatağı',
    fullName_en: 'Central Hospital Kozyatagi',
    address_tr: 'Kozyatağı Sk. No:5',
    address_en: 'Kozyatagi Sk. No:5',
    city: '34742 Kadıköy / İstanbul',
    phone: '444 77 99',
    phoneHref: 'tel:4447799',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5119.247640900299!2d29.097647377284336!3d40.96600462202482!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x14cac655d269c4e7%3A0x6cd24ca540cbe444!2sCentral%20Hospital!5e1!3m2!1str!2str!4v1774208725692!5m2!1str!2str',
    mapLink: 'https://maps.google.com/?q=Central+Hospital+Kozyata%C4%9F%C4%B1',
    workingHours_tr: 'Hafta içi: 08:30 - 18:00',
    workingHours_en: 'Weekdays: 08:30 - 18:00',
  },
];

export const revalidate = 86400;

export default async function IletisimPage({ lang = 'tr' }: { lang?: 'tr' | 'en' }) {
  let contactData = {
    appointmentPhone: '444 77 99',
    whatsappNumber: '905321397799',
    email: 'nurullahermis@central.com.tr',
    locations: DEFAULT_LOCATIONS
  };

  try {
    const record = await getStaticContent('contact.json');
    if (record) {
      contactData = record as any;
    }
  } catch (error) {
    console.error('Error fetching contact content:', error);
  }

  return <ContactClient contactData={contactData} forceLang={lang} />;
}