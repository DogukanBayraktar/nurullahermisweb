export type LocalArticleShape = {
  slug: string;
  title: string;
  img: string;
  date: string;
  readTime: string;
  category: string;
  desc: string;
  intro: string;
  sections: { h2: string; content: string }[];
  tags: string[];
};

export const healthGuideUi = {
  tr: {
    badge: 'Sağlık Rehberi',
    title: 'Tedavi ve Sağlık Rehberi',
    description:
      'Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. M. Nurullah Ermiş\'in hazırladığı bilgilendirici içerikleri inceleyin.',
    all: 'Tümü',
    noArticles: 'Bu kategoride henüz makale yok.',
    readMore: 'Devamını Oku',
    showMore: 'Daha Fazla Göster',
    minutesSuffix: 'dk',
    scrollLeft: 'Filtreleri sola kaydır',
    scrollRight: 'Filtreleri sağa kaydır',
    backToAll: 'Tüm Yazılara Dön',
    editInStudio: 'Studio\'da Düzenle',
    author: 'Prof. Dr. M. Nurullah Ermiş',
    authorTitle: 'Ortopedi ve Omurga Cerrahisi Uzmanı',
    bioLink: 'Özgeçmişini İncele',
    appointmentTitle: 'Randevu Talep Et',
    appointmentText: 'Şikayetleriniz için profesyonel değerlendirme alın.',
    appointmentCta: 'Randevu Al',
    otherArticles: 'Diğer Yazılar',
  },
  en: {
    badge: 'Health Guide',
    title: 'Treatment and Health Guide',
    description:
      'Explore informative content prepared by Prof. Dr. M. Nurullah Ermiş on spine health, orthopedics, and treatments.',
    all: 'All',
    noArticles: 'There are no articles in this category yet.',
    readMore: 'Read More',
    showMore: 'Show More',
    minutesSuffix: 'min',
    scrollLeft: 'Scroll filters left',
    scrollRight: 'Scroll filters right',
    backToAll: 'Back to All Articles',
    editInStudio: 'Edit in Studio',
    author: 'Prof. Dr. M. Nurullah Ermiş',
    authorTitle: 'Orthopedics and Spine Surgery Specialist',
    bioLink: 'View Biography',
    appointmentTitle: 'Request an Appointment',
    appointmentText: 'Get a professional evaluation for your complaints.',
    appointmentCta: 'Book Appointment',
    otherArticles: 'Other Articles',
  },
} as const;

export const localArticleTranslations: Record<'tr' | 'en', Record<string, LocalArticleShape>> = {
  tr: {
    'bel-fitigi-ameliyati': {
      slug: 'bel-fitigi-ameliyati',
      title: 'Bel Fıtığı Ameliyatı: Mikrocerrahi ile Aynı Gün Yürümek Mümkün',
      img: '/images/bel-fitigi.png',
      date: '12 Mart 2025',
      readTime: '7 dk okuma',
      category: 'Bel Fıtığı',
      desc: 'Bel fıtığı ameliyatı artık 1.5 cm\'lik kesiden, mikroskop altında uygulanıyor ve hastalar aynı gün yürüyebiliyor. Bu yazıda mikrodiskektominin nasıl yapıldığını, kimlere gerektiğini ve iyileşme sürecini ayrıntıyla anlatıyoruz.',
      intro: 'Bacağınıza vuran şiddetli ağrı, geceleri uyandıran siyatik, oturamama… Bel fıtığı yaşayan milyonlarca insan bu tabloya aşinadır. "Ameliyat olmadan geçer mi?" sorusunun cevabı birçok vakada evettir — ancak 6 haftayı aşan, nörolojik hasar gösteren ya da günlük yaşamı felç eden vakalarda mikrocerrahi, hem en güvenli hem de en hızlı çözümü sunar.',
      sections: [
        {
          h2: 'Bel Fıtığı Neden Oluşur?',
          content: 'Omurlar arasındaki disk yastıkları, yaşlanma, aşırı yük ve ani travmalarla zamanla dejenere olur. Diskin dış tabakası (anulus fibrozus) yırtıldığında içindeki jel kıvamındaki çekirdek (nukleus pulpozus) dışa fırlar ve çevre sinir köküne ya da omurilik kanalına baskı yapar. Bu baskı; siyatik ağrısı, his kaybı ve güçsüzlük olarak kendini gösterir.\n\nEn sık görülen bel fıtığı seviyeleri L4–L5 ve L5–S1\'dir. L4–L5 fıtığı ayak bileğini kaldırmayı güçleştirirken, L5–S1 fıtığı topukta kuvvet kaybına yol açar.',
        },
        {
          h2: 'Bel Fıtığı Ameliyatı — Mikrodiskektomi Nasıl Yapılır?',
          content: 'Genel anestezi altında başlayan operasyonda Prof. Dr. Ermiş, hastanın sırtında fıtığın tam üzerine gelecek biçimde yalnızca 1.5 cm\'lik bir kesi yapar. Ameliyat mikroskobu devreye girerek görüş alanını büyütür; bu sayede sinir kökü hassasiyetle korunurken fıtık kütlesi milimetrik dikkatle temizlenir.\n\nOperasyon ortalama 45–60 dakika sürer. Hasta 4–6 saat içinde kalkıp yürür; çoğunlukla ertesi gün taburcu edilir. Masa başı işlere 1–2 haftada, fiziksel işlere ise 4–6 haftada dönüş mümkündür.',
        },
        {
          h2: 'Bel Fıtığı Ameliyatı Kimlere Gerekir?',
          content: 'Her bel fıtığı ameliyat gerektirmez. Aşağıdaki durumlar cerrahi için güçlü endikasyonlardır:\n\n• Ağrı 6 haftadan uzun sürüyor ve konservatif tedaviye yanıt vermiyorsa\n• Ayak veya bacakta ilerleyen kuvvet kaybı varsa (özellikle düşük ayak)\n• İdrar ya da bağırsak kontrolünde ani güçlük (kauda equina sendromu) — bu durum acil cerrahidir\n• Ağrı kesiciler etkinliğini yitirdi ve yaşam kalitesi ciddi biçimde bozulduysa',
        },
        {
          h2: 'Ameliyat Sonrası İyileşme Süreci',
          content: 'Mikrocerrahi sonrası siyatik ağrısının büyük bölümü ilk günlerde geriler. Sinirin tam iyileşmesi 3–6 ay sürebilir; bu sürede hafif karıncalanma hissi normal kabul edilir.\n\nİyileşmeyi hızlandırmak için öneriler:\n• İlk 4–6 haftada ağır kaldırmaktan ve öne eğilmekten kaçının\n• Fizyoterapist eşliğinde core (gövde) egzersizlerine başlayın\n• Yürüyüş, en temel ve etkili rehabilitasyon aracıdır — günde 2–3 kez kısa yürüyüşler yapın\n• Sigara iyileşmeyi yavaşlatır; mümkünse bırakın',
        },
        {
          h2: 'Ameliyat Sonrası Tekrar Fıtık Olur mu?',
          content: 'Her 100 operasyonun yaklaşık 5–8\'inde aynı seviyede tekrar fıtık oluşabilir. Bunun önüne geçmek için kilo kontrolü, düzenli core egzersizleri ve doğru kaldırma teknikleri hayati önem taşır. Tekrar fıtık oluştuğunda yeniden mikrodiskektomi veya endoskopik diskektomi başarıyla uygulanabilir.',
        },
      ],
      tags: ['Bel Fıtığı', 'Mikrodiskektomi', 'Siyatik', 'Lomber Disk', 'Omurga Cerrahisi'],
    },
    'skolyoz-belirtileri-tedavisi': {
      slug: 'skolyoz-belirtileri-tedavisi',
      title: 'Skolyoz Belirtileri ve Tedavisi: Erken Teşhis Neden Bu Kadar Önemli?',
      img: '/images/skolyoz-kifoz.png',
      date: '28 Şubat 2025',
      readTime: '8 dk okuma',
      category: 'Skolyoz',
      desc: 'Skolyoz, omurganın 10 derecenin üzerinde anormal eğrilmesidir ve çoğunlukla büyüme çağında fark edilir. Erken teşhis, VBT gibi füzyonsuz yöntemlerle ameliyatsız hisse yakın sonuçlar elde etmeyi mümkün kılar.',
      intro: 'Okul çağındaki çocuğunuzun sırtına baktığınızda bir omuzun diğerinden yüksek durduğunu, bele ilişkin kıyafetlerin eşit oturmadığını fark ettiniz mi? Bu bulgular skolyozun erken işaretleri olabilir. Türkiye\'de her 100 çocuktan 2–3\'ünde anlamlı omurga eğriliği saptanmaktadır. İyi haber: erken yakalandığında VBT gibi modern yöntemlerle cerrahi füzyon yapmaksızın etkili tedavi mümkündür.',
      sections: [
        {
          h2: 'Skolyoz Nedir?',
          content: 'Skolyoz, omurganın öne-arkadan (frontal düzlemde) 10 derecenin üzerinde anormal biçimde sağa ya da sola eğrilmesidir. Eğrilik çoğunlukla S veya C şeklini alır. En yaygın türü olan Adölesan İdiyopatik Skolyoz (AIS), 10–16 yaş arasında, kesin nedeni bilinmeksizin ortaya çıkar. Kızlarda ilerleyen vakaların sıklığı erkeklere göre 8 kat daha fazladır.',
        },
        {
          h2: 'Skolyoz Belirtileri Nelerdir?',
          content: 'Çoğu skolyoz başlangıçta ağrısız seyreder; bu nedenle aile bireyleri ya da okul taramaları tanıda kritik rol oynar. Dikkat edilmesi gereken bulgular:\n\n• Omuzların eşit yükseklikte durmaması\n• Sırtın bir tarafının diğerinden belirgin kabarık görünmesi (jilet sırtı)\n• Kalçaların dengesiz durması\n• Öne eğilince sırtta asimetri\n• İleri vakalarda kronik sırt-bel ağrısı ve kısa nefes alma',
        },
        {
          h2: 'VBT (Vertebral Body Tethering) Nedir?',
          content: 'VBT, Türkiye\'de uygulanan en yeni skolyoz cerrahi tekniklerinden biridir. Büyüme potansiyeli olan 10–16 yaş hastalarında, Cobb açısı 40–65° arasındaykan uygulanır.\n\nToraks kısmına küçük kesilerden girilir (torakoskopik yaklaşım). Eğriliğin iç tarafındaki omurganın yan yüzlerine vidalar yerleştirilir ve vidalar arasına esnek bir bant (tether) gerilir. Hasta büyüdükçe bant, omurgayı kademeli olarak diker.\n\nVBT\'nin temel avantajı: füzyon (kaynama) gerektirmez, hareket kabiliyeti tamamen korunur ve hasta çok daha hızlı iyileşir.',
        },
        {
          h2: 'Skolyozda Korse Ne Zaman Yeterlidir?',
          content: 'Cobb açısı 25–45° arasında ve büyüme devam ediyorsa korse ilerlemeyi yavaşlatabilir. Ancak korse skolyozu düzeltmez; yalnızca eğriliğin artmasını önlemeye çalışır.\n\nKorse kullanımı için koşullar:\n• Büyüme plakaları açık olmalıdır (Risser 0–2)\n• Cobb açısı 25–45° arasında olmalıdır\n• Günde en az 18–23 saat kullanılmalıdır',
        },
      ],
      tags: ['Skolyoz', 'VBT', 'Kifoz', 'Omurga Eğriliği', 'Çocuk Ortopedisi', 'Omurga Cerrahisi'],
    },
    'diz-protezi-ameliyati': {
      slug: 'diz-protezi-ameliyati',
      title: 'Diz Protezi Ameliyatı: Robotik Cerrahi ile Ertesi Gün Yürümek',
      img: '/images/diz-kalca-protezi.png',
      date: '10 Ocak 2025',
      readTime: '6 dk okuma',
      category: 'Eklem Protezi',
      desc: 'Diz kireçlenmesinde (osteoartrit) ağrı kesiciler işe yaramıyorsa robotik total diz protezi en kalıcı çözümdür. Hastalar ertesi gün yürüyebilir; modern implantlar 20–25 yıl işlev görür.',
      intro: 'Merdiven inerken çekilen o keskin ağrı, geceleri uyandıran sızı, artık kaldırmanın anlamsız geldiği ağrı kesiciler… Diz kireçlenmesinin son evresinde milyonlarca kişinin tanıdığı bu tablo, robotik total diz protezi ile köklü biçimde değişebilir. Modern implantlar ve robotik hassasiyetle gerçekleştirilen bu operasyonda hastaların büyük çoğunluğu ertesi gün yürümeye başlamaktadır.',
      sections: [
        {
          h2: 'Diz Kireçlenmesi (Osteoartrit) Nedir?',
          content: 'Osteoartrit, diz eklemini örten kıkırdak dokunun zamanla aşınmasıdır. Kıkırdak incelip yok oldukça kemikler birbirine sürtünmeye başlar; bu durum şiddetli ağrı, şişlik ve hareket kısıtlılığına yol açar. 60 yaş üstü nüfusun yaklaşık %30\'u klinik osteoartrit belirtileri yaşamaktadır.',
        },
        {
          h2: 'Robotik Diz Protezi Neden Daha İyi?',
          content: 'Geleneksel diz protezinde cerrah, ameliyat sırasında kemik kesimlerini el aleti ve kılavuzlarla yapar. Robotik sistemde ise:\n\n• Ameliyat öncesi 3 boyutlu kemik modeli hazırlanır\n• İmplant pozisyonu bilgisayarda milimetrik hassasiyetle planlanır\n• Ameliyat sırasında robot, planlanan sınırların dışına çıkılmasını otomatik olarak engeller\n• Bacak ekseni mükemmel biçimde düzeltilir',
        },
      ],
      tags: ['Diz Protezi', 'Robotik Cerrahi', 'Osteoartrit', 'Kireçlenme', 'Eklem Protezi'],
    },
    'boyun-fitigi-belirtileri': {
      slug: 'boyun-fitigi-belirtileri',
      title: 'Boyun Fıtığı Belirtileri ve Tedavisi: Kola Vuran Ağrıya Son',
      img: '/images/boyun-fitigi.png',
      date: '5 Kasım 2024',
      readTime: '6 dk okuma',
      category: 'Boyun Fıtığı',
      desc: 'Boyun fıtığı omuz, kol ve parmaklara yayılan ağrı ile kendini gösterir. ACDF ve yapay disk (TDR) yöntemleriyle küçük bir kesiden kalıcı çözüm mümkündür.',
      intro: 'Boyun ağrısı, dünya genelinde bel ağrısından sonra en sık karşılaşılan ikinci kas-iskelet şikâyetidir. Uzun süreli bilgisayar ve telefon kullanımı, ofis hayatı ve hareketsizlik bu riski dramatik biçimde artırıyor.',
      sections: [
        {
          h2: 'Boyun Fıtığı Neden Olur?',
          content: 'Boyun (servikal) omurlar arasındaki disk yastıkları yaş ilerledikçe su kaybeder ve elastikiyetini yitirir. C5–C6 ve C6–C7 seviyeleri en sık etkilenen bölgelerdir.',
        },
      ],
      tags: ['Boyun Fıtığı', 'Servikal Disk', 'ACDF', 'Yapay Disk', 'Omurga Cerrahisi'],
    },
    'cocuk-ortopedisi-kalca-cikigi': {
      slug: 'cocuk-ortopedisi-kalca-cikigi',
      title: 'Çocuklarda Kalça Çıkığı (GKD): Erken Teşhis Ameliyatı Önler',
      img: '/images/cocuk-ortopedisi.png',
      date: '20 Eylül 2024',
      readTime: '5 dk okuma',
      category: 'Çocuk Ortopedisi',
      desc: 'Gelişimsel kalça displazisi (GKD), bebeklerde her 100 doğumda 1–3\'ünde görülür. İlk 6 ayda teşhis edildiğinde Pavlik bandajıyla %90 üzerinde ameliyatsız başarı elde edilir.',
      intro: 'Her yeni doğanın kalçası farklıdır; ancak bazı bebeklerde kalça ekleminin yuvası yetersiz gelişmiş ya da femur başı tamamen yerinden çıkmış olabilir.',
      sections: [
        {
          h2: 'GKD (Gelişimsel Kalça Displazisi) Nedir?',
          content: 'GKD, femur başının asetabulum içinde tam oturmadığı bir gelişimsel bozukluktur. Her 100 canlı doğumda 1–3 bebekte görülür; kız bebeklerde risk 6 kat daha yüksektir.',
        },
      ],
      tags: ['Kalça Çıkığı', 'GKD', 'Çocuk Ortopedisi', 'Pavlik Bandajı', 'Bebek Kalça Displazisi'],
    },
    'acl-cop-bag-ameliyati': {
      slug: 'acl-cop-bag-ameliyati',
      title: 'Ön Çapraz Bağ (ACL) Ameliyatı: Sporculara Spora Dönüş Rehberi',
      img: '/images/artroskopik-cerrahi.png',
      date: '3 Ağustos 2024',
      readTime: '7 dk okuma',
      category: 'Artroskopik Cerrahi',
      desc: 'ACL kopması artroskopik rekonstrüksiyonla tedavi edilir. Doğru greft seçimi ve rehabilitasyon protokolüyle sporcularda 6–9 ayda spora dönüş mümkündür.',
      intro: 'Futbol, basketbol ya da kayak yaparken ani bir manevra sırasında dizinizde duyduğunuz "çat" sesi ve hemen ardından gelen şişlik — ön çapraz bağ (ACL) kopmasının klasik tablosudur.',
      sections: [
        {
          h2: 'Ön Çapraz Bağ (ACL) Nedir ve Neden Kopar?',
          content: 'ACL, diz eklemini ön-arka yönde stabilize eden güçlü bir bağdır. Ani yön değiştirme, durma, atlama ve diz üzerine düşme gibi mekanizmalarla yırtılır.',
        },
      ],
      tags: ['ACL', 'Ön Çapraz Bağ', 'Diz Ameliyatı', 'Artroskopi', 'Menisküs', 'Spor Cerrahisi'],
    },
  },
  en: {
    'bel-fitigi-ameliyati': {
      slug: 'bel-fitigi-ameliyati',
      title: 'Lumbar Disc Herniation Surgery: Walking on the Same Day with Microsurgery',
      img: '/images/bel-fitigi.png',
      date: 'March 12, 2025',
      readTime: '7 min read',
      category: 'Lumbar Disc Herniation',
      desc: 'Lumbar disc herniation surgery can now be performed through a 1.5 cm incision under the microscope, and patients can walk on the same day. In this article, we explain how microdiscectomy is performed, who needs it, and what recovery looks like.',
      intro: 'Severe pain radiating down the leg, sciatica that wakes you at night, inability to sit... millions of people living with a lumbar disc herniation know this picture well. In many cases the answer to “Can it heal without surgery?” is yes — but when symptoms last longer than 6 weeks, cause neurological damage, or paralyze daily life, microsurgery offers the safest and fastest solution.',
      sections: [
        {
          h2: 'Why Does a Lumbar Disc Herniation Occur?',
          content: 'The discs between the vertebrae gradually degenerate due to aging, excessive load, and sudden trauma. When the outer layer of the disc (annulus fibrosus) tears, the gel-like core inside (nucleus pulposus) protrudes outward and compresses the nearby nerve root or spinal canal. This pressure appears as sciatica, numbness, and weakness.\n\nThe most common levels are L4–L5 and L5–S1. An L4–L5 herniation can make it difficult to lift the ankle, while an L5–S1 herniation may cause weakness in the heel.',
        },
        {
          h2: 'How Is Microdiscectomy Performed?',
          content: 'Under general anesthesia, Prof. Dr. Ermiş makes only a 1.5 cm incision on the back directly over the herniated level. The surgical microscope enlarges the field, allowing the nerve root to be protected while the herniated fragment is removed with millimetric precision.\n\nThe operation usually takes 45–60 minutes. Patients stand up and walk within 4–6 hours and are often discharged the next day. Desk work is usually possible within 1–2 weeks, while physically demanding jobs may require 4–6 weeks.',
        },
        {
          h2: 'Who Needs Surgery for a Lumbar Disc Herniation?',
          content: 'Not every lumbar disc herniation requires surgery. The situations below are strong indications for an operation:\n\n• Pain lasting longer than 6 weeks despite conservative treatment\n• Progressive weakness in the foot or leg (especially foot drop)\n• Sudden urinary or bowel control problems (cauda equina syndrome) — an emergency\n• Painkillers no longer work and quality of life is seriously impaired',
        },
        {
          h2: 'Recovery After Surgery',
          content: 'After microsurgery, most sciatic pain improves within the first days. Full nerve recovery may take 3–6 months; mild tingling during this period can be normal.\n\nTo speed up recovery:\n• Avoid heavy lifting and bending forward during the first 4–6 weeks\n• Start core exercises with a physiotherapist\n• Walking is the most basic and effective rehabilitation tool — take 2–3 short walks a day\n• Smoking slows recovery; quit if possible',
        },
        {
          h2: 'Can the Herniation Recur After Surgery?',
          content: 'About 5–8 out of every 100 operations may develop a recurrent herniation at the same level. Weight control, regular core exercise, and proper lifting techniques are crucial to reduce this risk. If recurrence occurs, repeat microdiscectomy or endoscopic discectomy can be performed successfully.',
        },
      ],
      tags: ['Lumbar Disc Herniation', 'Microdiscectomy', 'Sciatica', 'Lumbar Disc', 'Spine Surgery'],
    },
    'skolyoz-belirtileri-tedavisi': {
      slug: 'skolyoz-belirtileri-tedavisi',
      title: 'Scoliosis Symptoms and Treatment: Why Is Early Diagnosis So Important?',
      img: '/images/skolyoz-kifoz.png',
      date: 'February 28, 2025',
      readTime: '8 min read',
      category: 'Scoliosis',
      desc: 'Scoliosis is an abnormal curvature of the spine greater than 10 degrees and is often noticed during growth. Early diagnosis makes it possible to achieve near-surgical correction with fusionless methods such as VBT.',
      intro: 'Have you noticed that one shoulder is higher than the other or that clothes do not sit evenly on your child’s waistline? These may be early signs of scoliosis. In Turkey, clinically significant spinal curvature is detected in 2–3 out of every 100 children. The good news is that when diagnosed early, effective treatment may be possible with modern techniques such as VBT without spinal fusion.',
      sections: [
        {
          h2: 'What Is Scoliosis?',
          content: 'Scoliosis is an abnormal sideways curvature of the spine greater than 10 degrees on the frontal plane. The curve usually takes an S or C shape. The most common type, Adolescent Idiopathic Scoliosis (AIS), appears between the ages of 10 and 16 without a clearly known cause. Progressive cases are about 8 times more common in girls than in boys.',
        },
        {
          h2: 'What Are the Symptoms of Scoliosis?',
          content: 'Most scoliosis cases are painless at first, which is why family observation and school screening are critical. Warning signs include:\n\n• Uneven shoulder height\n• One side of the back appearing more prominent\n• Imbalance at the hips\n• Visible asymmetry when bending forward\n• In advanced cases, chronic back pain and shortness of breath',
        },
        {
          h2: 'What Is VBT (Vertebral Body Tethering)?',
          content: 'VBT is one of the newest surgical techniques used for scoliosis in Turkey. It is applied in growing patients aged 10–16 with a Cobb angle between 40° and 65°.\n\nThrough small thoracic incisions (thoracoscopic approach), screws are placed on the lateral side of the vertebrae along the inner side of the curve, and a flexible cord (tether) is tensioned between them. As the patient grows, the tether gradually corrects the spine.\n\nThe main advantage of VBT is that it does not require fusion, preserves motion, and allows a faster recovery.',
        },
        {
          h2: 'When Is a Brace Enough?',
          content: 'If the Cobb angle is between 25° and 45° and growth is ongoing, a brace can slow progression. However, a brace does not correct scoliosis; it mainly aims to prevent the curve from worsening.\n\nRequirements for brace treatment:\n• Growth plates should still be open (Risser 0–2)\n• Cobb angle should be between 25° and 45°\n• It should be worn at least 18–23 hours a day',
        },
      ],
      tags: ['Scoliosis', 'VBT', 'Kyphosis', 'Spinal Curvature', 'Pediatric Orthopedics', 'Spine Surgery'],
    },
    'diz-protezi-ameliyati': {
      slug: 'diz-protezi-ameliyati',
      title: 'Knee Replacement Surgery: Walking the Next Day with Robotic Surgery',
      img: '/images/diz-kalca-protezi.png',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Joint Replacement',
      desc: 'If painkillers no longer help in knee osteoarthritis, robotic total knee replacement is the most durable solution. Patients can walk the next day, and modern implants can function for 20–25 years.',
      intro: 'That sharp pain while going downstairs, the ache that wakes you up at night, painkillers that no longer make sense... in advanced knee osteoarthritis, this familiar picture can change dramatically with robotic total knee replacement. Thanks to modern implants and robotic precision, most patients start walking the very next day.',
      sections: [
        {
          h2: 'What Is Knee Osteoarthritis?',
          content: 'Osteoarthritis is the gradual wear of the cartilage covering the knee joint. As the cartilage thins and disappears, the bones begin to rub against each other, causing severe pain, swelling, and loss of motion. Around 30% of people over the age of 60 experience clinical symptoms of osteoarthritis.',
        },
        {
          h2: 'Why Is Robotic Knee Replacement Better?',
          content: 'In traditional knee replacement, the surgeon makes bone cuts using manual guides during the operation. With robotic systems:\n\n• A 3D bone model is prepared before surgery\n• Implant positioning is planned with millimetric accuracy\n• During surgery, the robot prevents movements beyond the planned boundaries\n• The leg axis is corrected with high precision',
        },
      ],
      tags: ['Knee Replacement', 'Robotic Surgery', 'Osteoarthritis', 'Arthrosis', 'Joint Replacement'],
    },
    'boyun-fitigi-belirtileri': {
      slug: 'boyun-fitigi-belirtileri',
      title: 'Cervical Disc Herniation Symptoms and Treatment: Relief for Arm Pain',
      img: '/images/boyun-fitigi.png',
      date: 'November 5, 2024',
      readTime: '6 min read',
      category: 'Cervical Disc Herniation',
      desc: 'A cervical disc herniation causes pain radiating to the shoulder, arm, and fingers. Permanent relief is possible through a small incision with ACDF and artificial disc replacement (TDR).',
      intro: 'Neck pain is the second most common musculoskeletal complaint worldwide after low back pain. Long hours at the computer, constant phone use, office life, and inactivity significantly increase this risk.',
      sections: [
        {
          h2: 'Why Does a Cervical Disc Herniation Occur?',
          content: 'As we age, the disc cushions between the cervical vertebrae lose water and elasticity. The C5–C6 and C6–C7 levels are the most commonly affected segments.',
        },
      ],
      tags: ['Cervical Disc Herniation', 'Cervical Disc', 'ACDF', 'Artificial Disc', 'Spine Surgery'],
    },
    'cocuk-ortopedisi-kalca-cikigi': {
      slug: 'cocuk-ortopedisi-kalca-cikigi',
      title: 'Hip Dislocation in Children (DDH): Early Diagnosis Prevents Surgery',
      img: '/images/cocuk-ortopedisi.png',
      date: 'September 20, 2024',
      readTime: '5 min read',
      category: 'Pediatric Orthopedics',
      desc: 'Developmental dysplasia of the hip (DDH) is seen in 1–3 out of every 100 births. When diagnosed in the first 6 months, more than 90% success can be achieved without surgery using a Pavlik harness.',
      intro: 'Every newborn hip is unique; however, in some babies the hip socket may be underdeveloped or the femoral head may be completely displaced.',
      sections: [
        {
          h2: 'What Is DDH (Developmental Dysplasia of the Hip)?',
          content: 'DDH is a developmental problem in which the femoral head does not sit fully within the acetabulum. It is seen in 1–3 babies per 100 live births, and the risk is about 6 times higher in girls.',
        },
      ],
      tags: ['Hip Dislocation', 'DDH', 'Pediatric Orthopedics', 'Pavlik Harness', 'Infant Hip Dysplasia'],
    },
    'acl-cop-bag-ameliyati': {
      slug: 'acl-cop-bag-ameliyati',
      title: 'Anterior Cruciate Ligament (ACL) Surgery: A Return-to-Sport Guide for Athletes',
      img: '/images/artroskopik-cerrahi.png',
      date: 'August 3, 2024',
      readTime: '7 min read',
      category: 'Arthroscopic Surgery',
      desc: 'ACL rupture is treated with arthroscopic reconstruction. With the right graft selection and rehabilitation protocol, athletes can return to sports in 6–9 months.',
      intro: 'That “pop” sound in the knee during a sudden move while playing football, basketball, or skiing, followed by immediate swelling, is the classic picture of an ACL rupture.',
      sections: [
        {
          h2: 'What Is the ACL and Why Does It Tear?',
          content: 'The ACL is a strong ligament that stabilizes the knee in the front-to-back direction. It tears with mechanisms such as sudden direction changes, abrupt stops, jumping, and falling onto the knee.',
        },
      ],
      tags: ['ACL', 'Anterior Cruciate Ligament', 'Knee Surgery', 'Arthroscopy', 'Meniscus', 'Sports Surgery'],
    },
  },
};

export function getCurrentLanguage(language?: string): 'tr' | 'en' {
  return language?.startsWith('en') ? 'en' : 'tr';
}

export function getTranslatedLocalArticle(slug: string, language?: string) {
  const lang = getCurrentLanguage(language);
  return localArticleTranslations[lang][slug];
}
