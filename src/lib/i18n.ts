import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  tr: {
    translation: {
      // Navbar
      nav: {
        home: 'Ana Sayfa',
        about: 'Hakkımda',
        treatments: 'Tedaviler',
        healthGuide: 'Sağlık Rehberi',
        contact: 'İletişim',
        appointment: 'Randevu Al',
        languageSelection: 'Dil Seçimi',
        contactInfo: 'İletişim Bilgileri',
        centralPhone: 'Merkez Telefon',
      },
      
      // Homepage
      home: {
        hero: {
          badge: 'Ortopedi & Travmatoloji Uzmanı',
          title: 'Omurga ve Eklem Sağlığınızda Güvenilir Uzman',
          subtitle: '20+ yıllık cerrahi tecrübe ile skolyoz, bel fıtığı ve eklem sorunlarına kapsamlı çözümler.',
          cta: 'Hemen Randevu Al',
          whatsapp: 'WhatsApp ile Ulaşın',
        },
        stats: {
          years: 'Yıllık Tecrübe',
          surgeries: 'Başarılı Ameliyat',
          patients: 'Mutlu Hasta',
          publications: 'Bilimsel Yayın',
        },
        treatments: {
          badge: 'Uzmanlık Alanlarımız',
          title: 'Tedavi Hizmetleri',
          subtitle: 'Modern cerrahi teknikler ve hasta odaklı yaklaşım ile kapsamlı tedavi seçenekleri.',
          viewAll: 'Tüm Tedavileri İncele',
        },
        results: {
          badge: 'Klinik Sonuçlar',
          title: 'Tedavi Öncesi & Sonrası',
          subtitle: 'Gerçek hasta sonuçları ve radyolojik iyileşme örnekleri.',
          scoliosis: 'Skolyoz Düzeltme',
          scoliosisDesc: 'Skolyoz cerrahisi sonrası omurga diziliminde belirgin düzelme.',
          scoliosisResult: 'Skolyoz Sonucu',
          scoliosisResultDesc: 'Cerrahi sonrası daha dengeli omurga hattı ve radyolojik iyileşme.',
          kyphosis: 'Kifoz Sonucu',
          kyphosisDesc: 'Kifoz tedavisi sonrası duruş ve açılanmada görünür toparlanma.',
          kneeProsthesis: 'Diz Protezi',
          kneeProsthesisDesc: 'Diz protezi sonrası eklem hizalanması ve hareket açıklığında iyileşme.',
          kyphoscoliosis: 'Kifoskolyoz',
          kyphoscoliosisDesc: 'Kifoskolyoz vakasında ameliyat sonrası daha dengeli omurga yapısı.',
        },
        patientStories: {
          badge: 'Gerçek Hasta Hikayeleri',
          title: 'Hastalarımızın Deneyimleri',
          subtitle: 'Tedavi sürecini tamamlayan hastalarımızın kendi ağızlarından yaşadıkları.',
          scoliosisSurgery: 'Skolyoz Cerrahisi',
          herniation: 'Bel Fıtığı',
          kneeProsthesis: 'Diz Protezi',
          readFullStory: 'Tüm Hikayeyi Oku',
          result: 'Sonuç',
          beforeAfter: 'Önce/Sonra',
        },
        testimonials: {
          badge: 'Hasta Görüşleri',
          title: 'Hastalarımız Ne Diyor?',
          subtitle: 'Tedavi sürecini tamamlayan hastalarımızın deneyimleri.',
          scoliosisParent: 'Skolyoz Hastası Velisi',
          herniationPatient: 'Bel Fıtığı Hastası, 52 Yaşında',
          kneePatient: 'Diz Protezi Hastası, 68 Yaşında',
          pediatricParent: 'Çocuk Ortopedisi Velisi',
        },
        about: {
          badge: 'Hakkımda',
          title: 'Bilimsel Tecrübe & Uluslararası Eğitim',
          subtitle: 'Uluslararası standartlarda cerrahi tecrübe.',
          description: 'Hacettepe Üniversitesi\'nden mezun olup ABD (UCSF) ve Belçika\'da ileri cerrahi eğitimler alan Prof. Dr. Ermiş, 20 yılı aşkın tecrübesiyle binlerce başarılı operasyona imza atmıştır.',
          viewCareer: 'Kariyerini ve Akademik Geçmişini İncele',
        },
        videos: {
          badge: 'Video İçerikler',
          title: 'YouTube Kanalımız',
          subtitle: 'Tedavi yöntemleri ve hasta bilgilendirme videoları.',
          close: 'Kapat',
          scoliosisSurgery: 'Skolyoz Cerrahisi',
          herniationSurgery: 'Bel Fıtığı Ameliyatı',
          kneeSurgery: 'Diz Protezi Cerrahisi',
        },
        process: {
          badge: 'Tedavi Süreci',
          title: 'İlk Muayeneden Taburculuğa',
          examination: 'Muayene',
          examinationDesc: 'Fizik muayene ve görüntüleme ile tanı.',
          plan: 'Plan',
          planDesc: 'Kişiye özel tedavi yolu belirlenir.',
          treatment: 'Tedavi',
          treatmentDesc: 'Minimal invaziv cerrahi uygulanır.',
          recovery: 'İyileşme',
          recoveryDesc: 'Fizyoterapi ve düzenli kontroller.',
        },
        cta: {
          badge: 'İletişime Geçin',
          title: 'Sağlığınız İçin\nProfesyonel Adım Atın',
          subtitle: 'MR ve röntgen sonuçlarınızın değerlendirilmesi için Prof. Dr. Nurullah Ermiş\'e hemen ulaşabilir, online randevunuzu kolayca oluşturabilirsiniz.',
          appointmentBtn: 'Muayene Randevusu Al',
          callBtn: 'Hemen Arayın',
        },
      },
      
      // Patient Stories Data
      patientStoriesData: {
        mehmet: {
          name: 'Mehmet Yılmaz',
          summary: 'Oğlumuzun omurgası 58 derece eğriydi',
          story: 'Oğlumuz Kerem, 12 yaşında okul taramasında skolyoz teşhisi aldı. Başka iki hastanede \'bekleyelim\' dediler; ama eğrilik hızla ilerliyordu. Prof. Dr. Ermiş bizi ilk muayenede detaylıca dinledi, MR görüntülerini tek tek anlattı. Ameliyattan 2 gün sonra Kerem kendi ayakları üstünde yürüdü. Şimdi 16 yaşında, basketbol oynuyor.',
          result: '58° → 9° düzelme',
          date: 'Mart 2024',
        },
        ayse: {
          name: 'Ayşe Kılıç',
          summary: '3 yıl boyunca sağ bacağıma yayılan ağrıyla yaşadım',
          story: 'Üç yıl boyunca sağ bacağıma vuran ağrıyla uyuyamaz oldum. Ağrı kesiciler işe yaramıyordu, işe gidemez hale geldim. Prof. Dr. Ermiş ameliyat öncesi her adımı anlattı, sorularımı hiç atlamamıştı. Ameliyat sonrası ertesi sabah ağrı sıfırdı — o anı tarif edemem. Aynı gün koridorda yürüdüm.',
          result: 'Ameliyat sonrası ertesi gün taburcu',
          date: 'Ocak 2024',
        },
        huseyin: {
          name: 'Hüseyin Toprak',
          summary: 'Yıllardır merdivenden çıkmaktan korkuyordum',
          story: 'Sağ dizim yıllardır beni zorladı; artık merdivenden bile çıkamaz olmuştum. Robotik navigasyonlu diz protezi hakkında araştırırken Prof. Dr. Ermiş\'e ulaştım. Ameliyat sonrası fizyoterapi süreci çok düzenliydi, her kontrolde ilerlememizi gördük. 3 ay sonra eşimle yürüyüşe çıktım.',
          result: '6 haftada tam yük bindirme',
          date: 'Kasım 2023',
        },
      },
      
      // Testimonials Data
      testimonialsData: [
        {
          text: 'Skolyoz ameliyatı sonrası çocuğumuz ilk kez dik bir şekilde yürüdü. Profesörümüze minnettarız.',
          author: 'Mehmet A.',
          detail: 'Skolyoz Hastası Velisi',
        },
        {
          text: 'Yıllardır çektiğim bel fıtığı ağrısı ameliyattan bir gün sonra tamamen geçti. Aynı gün ayağa kalktım!',
          author: 'Ayşe K.',
          detail: 'Bel Fıtığı Hastası, 52 Yaşında',
        },
        {
          text: 'Diz protezi sonrası merdivenlerden rahatça inip çıkabiliyordum. Hayatım değişti.',
          author: 'Hüseyin T.',
          detail: 'Diz Protezi Hastası, 68 Yaşında',
        },
        {
          text: 'Çocuğumuzun kalça çıkığı sorunu erken yaşta tespit edildi ve tedavi sürecini çok profesyonelce yönettiler.',
          author: 'Fatma S.',
          detail: 'Çocuk Ortopedisi Velisi',
        },
      ],
      
      // Footer
      footer: {
        aboutTitle: 'Hakkımda',
        aboutText: 'Ortopedi ve Travmatoloji alanında 20+ yıllık deneyim ile skolyoz, bel fıtığı ve eklem tedavilerinde uzman.',
        quickLinks: 'Hızlı Bağlantılar',
        treatments: 'Tedaviler',
        healthGuide: 'Sağlık Rehberi',
        contact: 'İletişim',
        contactInfo: 'İletişim',
        phone: 'Telefon',
        email: 'E-posta',
        address: 'Adres',
        addressText: 'Acıbadem Atakent Hastanesi, İstanbul',
        rights: '© 2026 Prof. Dr. M. Nurullah Ermiş. Tüm hakları saklıdır.',
      },
      
      // Topline
      topline: {
        callUs: 'Bizi Arayın',
        workingHours: 'Çalışma Saatleri',
        mondayFriday: 'Pzt - Cum',
        hours: '09:00 - 18:00',
      },
      
      // Common
      common: {
        readMore: 'Devamını Oku',
        learnMore: 'Daha Fazla Bilgi',
        viewAll: 'Tümünü Gör',
        back: 'Geri',
        next: 'İleri',
        close: 'Kapat',
        loading: 'Yükleniyor...',
      },
    },
  },
  en: {
    translation: {
      // Navbar
      nav: {
        home: 'Home',
        about: 'About',
        treatments: 'Treatments',
        healthGuide: 'Health Guide',
        contact: 'Contact',
        appointment: 'Make Appointment',
        languageSelection: 'Language Selection',
        contactInfo: 'Contact Information',
        centralPhone: 'Central Phone',
      },
      
      // Homepage
      home: {
        hero: {
          badge: 'Orthopedics & Traumatology Specialist',
          title: 'Trusted Expert in Spine and Joint Health',
          subtitle: '20+ years of surgical experience providing comprehensive solutions for scoliosis, herniated disc, and joint problems.',
          cta: 'Book Appointment Now',
          whatsapp: 'Contact via WhatsApp',
        },
        stats: {
          years: 'Years Experience',
          surgeries: 'Successful Surgeries',
          patients: 'Happy Patients',
          publications: 'Scientific Publications',
        },
        treatments: {
          badge: 'Our Specialties',
          title: 'Treatment Services',
          subtitle: 'Comprehensive treatment options with modern surgical techniques and patient-centered approach.',
          viewAll: 'View All Treatments',
        },
        results: {
          badge: 'Clinical Results',
          title: 'Before & After Treatment',
          subtitle: 'Real patient outcomes and radiological improvement examples.',
          scoliosis: 'Scoliosis Correction',
          scoliosisDesc: 'Significant improvement in spinal alignment after scoliosis surgery.',
          scoliosisResult: 'Scoliosis Outcome',
          scoliosisResultDesc: 'More balanced spinal curve and radiological healing after surgery.',
          kyphosis: 'Kyphosis Outcome',
          kyphosisDesc: 'Visible improvement in posture and angulation after kyphosis treatment.',
          kneeProsthesis: 'Knee Prosthesis',
          kneeProsthesisDesc: 'Joint alignment and range of motion improvement after knee prosthesis.',
          kyphoscoliosis: 'Kyphoscoliosis',
          kyphoscoliosisDesc: 'More balanced spinal structure after kyphoscoliosis surgery.',
        },
        patientStories: {
          badge: 'Real Patient Stories',
          title: 'Our Patients\' Experiences',
          subtitle: 'Experiences shared by our patients who completed their treatment journey.',
          scoliosisSurgery: 'Scoliosis Surgery',
          herniation: 'Herniated Disc',
          kneeProsthesis: 'Knee Prosthesis',
          readFullStory: 'Read Full Story',
          result: 'Result',
          beforeAfter: 'Before/After',
        },
        testimonials: {
          badge: 'Patient Reviews',
          title: 'What Our Patients Say',
          subtitle: 'Experiences from our patients who completed their treatment.',
          scoliosisParent: 'Scoliosis Patient Parent',
          herniationPatient: 'Herniated Disc Patient, 52 Years Old',
          kneePatient: 'Knee Prosthesis Patient, 68 Years Old',
          pediatricParent: 'Pediatric Orthopedics Parent',
        },
        about: {
          badge: 'About',
          title: 'Scientific Experience & International Education',
          subtitle: 'Surgical expertise at international standards.',
          description: 'Having graduated from Hacettepe University and received advanced surgical training in the USA (UCSF) and Belgium, Prof. Dr. Ermiş has performed thousands of successful operations with over 20 years of experience.',
          viewCareer: 'Review Career and Academic Background',
        },
        videos: {
          badge: 'Video Content',
          title: 'Our YouTube Channel',
          subtitle: 'Treatment methods and patient education videos.',
          close: 'Close',
          scoliosisSurgery: 'Scoliosis Surgery',
          herniationSurgery: 'Herniated Disc Surgery',
          kneeSurgery: 'Knee Prosthesis Surgery',
        },
        process: {
          badge: 'Treatment Process',
          title: 'From Initial Examination to Discharge',
          examination: 'Examination',
          examinationDesc: 'Diagnosis through physical examination and imaging.',
          plan: 'Plan',
          planDesc: 'Personalized treatment path is determined.',
          treatment: 'Treatment',
          treatmentDesc: 'Minimally invasive surgery is performed.',
          recovery: 'Recovery',
          recoveryDesc: 'Physiotherapy and regular check-ups.',
        },
        cta: {
          badge: 'Get in Touch',
          title: 'Take a Professional Step\nfor Your Health',
          subtitle: 'You can immediately contact Prof. Dr. Nurullah Ermiş for evaluation of your MRI and X-ray results, and easily schedule your online appointment.',
          appointmentBtn: 'Book Medical Appointment',
          callBtn: 'Call Now',
        },
      },
      
      // Patient Stories Data
      patientStoriesData: {
        mehmet: {
          name: 'Mehmet Yılmaz',
          summary: 'Our son\'s spine had a 58-degree curvature',
          story: 'Our son Kerem was diagnosed with scoliosis during a school screening at age 12. Two other hospitals told us to "wait and see," but the curvature was progressing rapidly. Prof. Dr. Ermiş listened to us thoroughly at the first examination and explained each MRI image in detail. Two days after surgery, Kerem walked on his own feet. He\'s now 16 years old and playing basketball.',
          result: '58° → 9° correction',
          date: 'March 2024',
        },
        ayse: {
          name: 'Ayşe Kılıç',
          summary: 'I lived with pain radiating to my right leg for 3 years',
          story: 'For three years, I couldn\'t sleep due to pain shooting down my right leg. Painkillers didn\'t work, and I couldn\'t go to work anymore. Prof. Dr. Ermiş explained every step before the surgery and never skipped my questions. The morning after surgery, the pain was zero — I can\'t describe that moment. I walked down the corridor the same day.',
          result: 'Discharged the day after surgery',
          date: 'January 2024',
        },
        huseyin: {
          name: 'Hüseyin Toprak',
          summary: 'I was afraid to climb stairs for years',
          story: 'My right knee troubled me for years; I couldn\'t even climb stairs anymore. While researching robotic navigation knee prosthesis, I found Prof. Dr. Ermiş. The post-surgery physiotherapy process was very organized, we saw progress at every check-up. Three months later, I went for a walk with my wife.',
          result: 'Full weight bearing in 6 weeks',
          date: 'November 2023',
        },
      },
      
      // Testimonials Data
      testimonialsData: [
        {
          text: 'After scoliosis surgery, our child walked upright for the first time. We are grateful to our professor.',
          author: 'Mehmet A.',
          detail: 'Scoliosis Patient Parent',
        },
        {
          text: 'The herniated disc pain I had been suffering from for years completely disappeared the day after surgery. I stood up the same day!',
          author: 'Ayşe K.',
          detail: 'Herniated Disc Patient, 52 Years Old',
        },
        {
          text: 'After knee prosthesis, I could easily go up and down stairs. My life changed.',
          author: 'Hüseyin T.',
          detail: 'Knee Prosthesis Patient, 68 Years Old',
        },
        {
          text: 'Our child\'s hip dysplasia problem was detected at an early age and they managed the treatment process very professionally.',
          author: 'Fatma S.',
          detail: 'Pediatric Orthopedics Parent',
        },
      ],
      
      // Footer
      footer: {
        aboutTitle: 'About',
        aboutText: '20+ years of experience in Orthopedics and Traumatology, specializing in scoliosis, herniated disc, and joint treatments.',
        quickLinks: 'Quick Links',
        treatments: 'Treatments',
        healthGuide: 'Health Guide',
        contact: 'Contact',
        contactInfo: 'Contact',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        addressText: 'Acıbadem Atakent Hospital, Istanbul',
        rights: '© 2026 Prof. Dr. M. Nurullah Ermiş. All rights reserved.',
      },
      
      // Topline
      topline: {
        callUs: 'Call Us',
        workingHours: 'Working Hours',
        mondayFriday: 'Mon - Fri',
        hours: '09:00 AM - 06:00 PM',
      },
      
      // Common
      common: {
        readMore: 'Read More',
        learnMore: 'Learn More',
        viewAll: 'View All',
        back: 'Back',
        next: 'Next',
        close: 'Close',
        loading: 'Loading...',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    lng: 'tr',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
