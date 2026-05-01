// prisma/seed.ts
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
// Or add to package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
// Then run: npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── HEALTH ARTICLES (TR) ───────────────────────────────────────────────────
  const trArticles = [
    {
      slug: 'bel-fitigi-ameliyati',
      title: 'Bel Fıtığı Ameliyatı Nedir?',
      img: '/images/saglik/bel-fitigi.avif',
      date: '12 Mart 2025',
      readTime: '7 dk okuma',
      category: 'Bel Fıtığı',
      desc: 'Bel fıtığı, omurga disklerinin yerinden kayarak sinirlere baskı yapmasıyla oluşur ve çoğunlukla 30–50 yaş arasında görülür.',
      intro: 'Bel fıtığı ameliyatı, konservatif tedavilerin yetersiz kaldığı durumlarda omurga üzerindeki baskıyı gidermek için uygulanan cerrahi bir işlemdir.',
      sections: [
        { h2: 'Bel Fıtığı Nedir?', content: 'Bel fıtığı, omurlar arasındaki disklerin dış kabuğunun yırtılarak iç kısmının sinir kanalına baskı yapmasıyla ortaya çıkar.' },
        { h2: 'Ameliyat Gerektiren Durumlar', content: 'Konservatif tedaviye yanıt alınamayan, sinir basısına bağlı güç kaybı ve mesane/bağırsak kontrolü sorunu olan hastalarda cerrahi gerekebilir.' },
      ],
      tags: ['Bel Fıtığı', 'Mikrodiskektomi', 'Siyatik', 'Lomber Disk', 'Omurga Cerrahisi'],
      lang: 'tr',
    },
    {
      slug: 'skolyoz-belirtileri-tedavisi',
      title: 'Skolyozdan Korkmalı Mıyız?',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: '28 Şubat 2025',
      readTime: '8 dk okuma',
      category: 'Skolyoz',
      desc: 'Skolyoz, omurganın yanlara doğru eğrilmesiyle ortaya çıkan bir rahatsızlıktır ve özellikle çocukluk ve ergenlik döneminde sıkça fark edilir.',
      intro: 'Omuzlarınız eşit mi? Aynaya bakarken sırtınızda hafif bir eğrilik fark ettiniz mi? Basit bir duruş bozukluğu sandığınız bu durum, aslında skolyozun ilk işareti olabilir.',
      sections: [
        { h2: 'Skolyoz Nedir?', content: 'Skolyoz, omurganın yan yana veya dönerek eğrildiği bir durumdur. Genellikle ergenlik döneminde ortaya çıkar.' },
        { h2: 'Tedavi Yöntemleri', content: 'Hafif vakalarda egzersiz ve takip, orta vakalarda korse, ileri vakalarda cerrahi tedavi uygulanır.' },
      ],
      tags: ['Skolyoz', 'VBT', 'Kifoz', 'Omurga Eğriliği', 'Çocuk Ortopedisi', 'Omurga Cerrahisi'],
      lang: 'tr',
    },
    {
      slug: 'diz-protezi-ameliyati',
      title: 'Diz Protezi Ameliyatı Nedir?',
      img: '/images/saglik/diz-cerrahi.avif',
      date: '10 Ocak 2025',
      readTime: '6 dk okuma',
      category: 'Eklem Protezi',
      desc: 'Diz protezi ameliyatı, eklem yüzeylerinin aşınması, kireçlenme veya travma sonrası oluşan hasarları düzeltmek için uygulanan güvenli ve etkili bir yöntemdir.',
      intro: 'Diz protezi, kireçlenme ve eklem hasarı nedeniyle günlük yaşamı kısıtlayan ağrıyı gidermek amacıyla uygulanan cerrahi bir tedavidir.',
      sections: [
        { h2: 'Diz Protezi Nedir?', content: 'Diz protezi, hasar görmüş eklem yüzeylerinin metalik veya plastik implantlarla değiştirildiği bir cerrahidir.' },
        { h2: 'Kimler Aday?', content: 'Konservatif tedavilere yanıt vermeyen ileri evre kireçlenmesi olan hastalarda uygulanır.' },
      ],
      tags: ['Diz Protezi', 'Robotik Cerrahi', 'Osteoartrit', 'Kireçlenme', 'Eklem Protezi'],
      lang: 'tr',
    },
    {
      slug: 'boyun-fitiginiz-mi-var',
      title: 'Boyun Fıtığınız Mı Var? Paniğe Gerek Yok…',
      img: '/images/saglik/boyun-cerrahi.avif',
      date: '5 Kasım 2024',
      readTime: '6 dk okuma',
      category: 'Boyun Fıtığı',
      desc: 'Boyun fıtığı, omurgadaki disklerin yerinden kayarak sinirlere baskı yapmasıyla ortaya çıkan bir rahatsızlıktır ve genellikle orta yaş ve ileri yaşlarda daha sık görülür.',
      intro: 'Boyun fıtığı tanısı alan pek çok kişi gereksiz panik yaşar. Oysa vakaların büyük çoğunluğu cerrahi olmadan başarıyla tedavi edilebilir.',
      sections: [
        { h2: 'Boyun Fıtığı Belirtileri', content: 'Boyun ağrısı, kola yayılan uyuşma ve karıncalanma, güç kaybı boyun fıtığının tipik belirtileridir.' },
        { h2: 'Tedavi Seçenekleri', content: 'Fizik tedavi, ağrı yönetimi ve cerrahi tedavi seçenekleri mevcuttur.' },
      ],
      tags: ['Boyun Fıtığı', 'Servikal Disk', 'ACDF', 'Yapay Disk', 'Omurga Cerrahisi'],
      lang: 'tr',
    },
    {
      slug: 'cocuklarda-kalca-cikigini-nasil-anlariz',
      title: 'Çocuklarda Kalça Çıkığını Nasıl Anlarız?',
      img: '/images/saglik/cocuk.avif',
      date: '20 Eylül 2024',
      readTime: '5 dk okuma',
      category: 'Çocuk Ortopedisi',
      desc: 'Kalça çıkığı, genellikle doğuştan gelen bir durumdur ve eklem gelişimiyle doğrudan ilgilidir.',
      intro: 'Doğumsal kalça displazisi, erken tanı konulduğunda basit yöntemlerle tedavi edilebilir. Geç kalınan her ay tedaviyi zorlaştırır.',
      sections: [
        { h2: 'Kalça Displazisi Nedir?', content: 'Kalça eklemi yuvası yeterince derin olmadığında femur başı yerinden oynayabilir.' },
        { h2: 'Erken Tanının Önemi', content: 'İlk 6 ayda Pavlik bandajı ile tedavi son derece başarılıdır. Gecikilen vakalarda cerrahi gerekebilir.' },
      ],
      tags: ['Kalça Çıkığı', 'GKD', 'Çocuk Ortopedisi', 'Pavlik Bandajı', 'Bebek Kalça Displazisi'],
      lang: 'tr',
    },
    {
      slug: 'skolyoz-egzersizleri',
      title: 'Skolyoz Egzersizleri: Omurgayı Destekleyen Hareketler',
      img: '/images/saglik/skolyoz-egzersiz.avif',
      date: '28 Mart 2025',
      readTime: '8 dk okuma',
      category: 'Skolyoz',
      desc: 'Skolyozda doğru egzersizler omurga kaslarını güçlendirir, eğriliğin ilerlemesini yavaşlatabilir ve yaşam kalitesini artırır.',
      intro: 'Skolyoz tanısı almak, hareketsiz kalmak anlamına gelmez. Aksine — doğru egzersizler, omurga kaslarını güçlendirerek eğriliğin ilerlemesini yavaşlatabilir.',
      sections: [
        { h2: 'Schroth Yöntemi', content: 'Schroth egzersizleri, skolyozun üç boyutlu düzeltilmesini hedefleyen özel solunum ve postür egzersizleridir.' },
        { h2: 'Kaçınılması Gereken Hareketler', content: 'Yüksek yük bindiren egzersizler ve dönme hareketleri kontrolsüz yapıldığında zararlı olabilir.' },
      ],
      tags: ['Skolyoz', 'Skolyoz Egzersizleri', 'Schroth', 'Core Egzersiz', 'Omurga Sağlığı', 'Postür'],
      lang: 'tr',
    },
    {
      slug: 'acl-cop-bag-ameliyati',
      title: 'ÖCB (Ön Çapraz Bağ) Ameliyatı',
      img: '/images/saglik/diz-cerrahi.avif',
      date: '15 Nisan 2025',
      readTime: '7 dk okuma',
      category: 'Spor Yaralanmaları',
      desc: 'Ön çapraz bağ yırtılması, sporcular ve aktif bireylerde sık görülen bir diz yaralanmasıdır. Cerrahi tedavi ve sonrası rehabilitasyon süreci.',
      intro: 'ÖCB yaralanması ciddi bir diz yaralanmasıdır ancak doğru tedavi ve rehabilitasyon ile tam iyileşme mümkündür.',
      sections: [
        { h2: 'ÖCB Nedir?', content: 'Ön çapraz bağ, diz ekleminin stabilitesini sağlayan en önemli bağdır.' },
        { h2: 'Cerrahi Tedavi', content: 'Artroskopik yöntemle greft kullanılarak bağ yeniden yapılandırılır.' },
      ],
      tags: ['ACL', 'Ön Çapraz Bağ', 'Diz Yaralanması', 'Spor Cerrahisi', 'Artroskopi'],
      lang: 'tr',
    },
  ];

  for (const article of trArticles) {
    await prisma.healthArticle.upsert({
      where: { slug: `${article.slug}_tr` },
      update: {},
      create: {
        ...article,
        slug: `${article.slug}_tr`,
      },
    });
  }
  console.log(`✅ ${trArticles.length} TR health articles seeded`);

  // ─── TREATMENTS ─────────────────────────────────────────────────────────────
  const treatments = [
    {
      slug: 'skolyoz-kifoz-cerrahisi',
      title: 'Skolyoz & Kifoz Cerrahisi',
      img: '/images/skolyoz-kifoz.avif',
      images: [
        '/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif',
        '/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif',
      ],
      category: 'Omurga Cerrahisi',
      stats: [{ label: 'VBT Cobb açısı', val: '40–65°' }, { label: 'Hastane süresi', val: '3–5 gün' }, { label: 'Düzeltme başarısı', val: '%85+' }],
      desc: ['Skolyoz, omurganın yana doğru eğrilmesiyle kendini gösteren ve genellikle "S" veya "C" şeklinde kıvrımlar oluşturan bir durumdur.'],
      symptoms: ['Sırtta veya belde gözle görülür asimetri ve eğrilik', 'Omuzların ya da kalçaların farklı yüksekliklerde durması'],
      treatment: [{ baslik: 'VBT (Vertebral Body Tethering)', icerik: 'Büyüme potansiyelini koruyan adölesanlarda uygulanan minimal invaziv yöntem.' }],
      faq: [{ s: 'Skolyoz ameliyat olmadan geçer mi?', c: '25° altındaki hafif eğrilikler büyüme tamamlandıktan sonra duraksayabilir.' }],
    },
    {
      slug: 'bel-fitigi-tedavisi',
      title: 'Bel Fıtığı Tedavisi',
      img: '/images/bel-fitigi-1.avif',
      images: [],
      category: 'Omurga Cerrahisi',
      stats: [{ label: 'Başarı oranı', val: '%90+' }, { label: 'Taburculuk', val: '1–2 gün' }],
      desc: ['Bel fıtığı, omurlar arasındaki disklerin dış kabuğunun yırtılarak sinir kanalına baskı yapmasıyla oluşur.'],
      symptoms: ['Belde başlayıp bacağa yayılan ağrı', 'Bacakta uyuşma ve karıncalanma'],
      treatment: [{ baslik: 'Mikrodiskektomi', icerik: 'Minimal invaziv yaklaşımla fıtık parçasının alınması.' }],
      faq: [{ s: 'Bel fıtığı ameliyatsız iyileşir mi?', c: 'Vakaların %80-90\'ı konservatif tedaviyle düzelir.' }],
    },
    {
      slug: 'boyun-fitigi-tedavisi',
      title: 'Boyun Fıtığı Tedavisi',
      img: '/images/boyun-fitigi.avif',
      images: [],
      category: 'Omurga Cerrahisi',
      stats: [{ label: 'Başarı oranı', val: '%85+' }, { label: 'Taburculuk', val: '1–2 gün' }],
      desc: ['Boyun fıtığı, servikal disklerin sinir köklerine veya omuriliğe baskı yapmasıyla ortaya çıkar.'],
      symptoms: ['Boyun ağrısı', 'Kola yayılan uyuşma', 'Ellerde güç kaybı'],
      treatment: [{ baslik: 'ACDF', icerik: 'Anterior servikal diskektomi ve füzyon — önden yapılan standart boyun fıtığı ameliyatı.' }],
      faq: [{ s: 'Boyun fıtığı tedavisi ne kadar sürer?', c: 'Fizik tedavi ile çoğu hasta 6–12 haftada düzelir.' }],
    },
    {
      slug: 'diz-kalca-protezi',
      title: 'Diz & Kalça Protezi',
      img: '/images/diz-kalca-protezi.avif',
      images: [],
      category: 'Eklem Cerrahisi',
      stats: [{ label: 'Protez ömrü', val: '15–20 yıl' }, { label: 'Başarı oranı', val: '%95+' }],
      desc: ['Eklem protezi, ileri evre kireçlenme ve hasar durumunda eklem yüzeylerinin implantlarla değiştirilmesidir.'],
      symptoms: ['Şiddetli eklem ağrısı', 'Yürümekte güçlük', 'Eklemde şişlik ve sertlik'],
      treatment: [{ baslik: 'Total Diz Protezi', icerik: 'Robotik navigasyon yardımıyla hassas yerleştirme.' }],
      faq: [{ s: 'Protez ameliyatı sonrası ne zaman yürünür?', c: 'Çoğu hasta ameliyat günü veya ertesi gün yürümeye başlar.' }],
    },
    {
      slug: 'cocuk-ortopedisi',
      title: 'Çocuk Ortopedisi',
      img: '/images/cocuk-ortopedisi.avif',
      images: [],
      category: 'Çocuk Ortopedisi',
      stats: [{ label: 'Yaş grubu', val: '0–18' }],
      desc: ['Çocuklarda kemik, eklem ve kas-iskelet sistemi sorunlarının tanı ve tedavisi.'],
      symptoms: ['Yürüme bozukluğu', 'Bacaklarda uzunluk farkı', 'Omurga eğriliği'],
      treatment: [{ baslik: 'Konservatif Tedavi', icerik: 'Korse, fizik tedavi ve büyüme takibi.' }],
      faq: [{ s: 'Çocuklarda kalça displazisi nedir?', c: 'Kalça ekleminin yeterince gelişmemesidir, erken tanıda bandaj tedavisi etkilidir.' }],
    },
    {
      slug: 'artroskopik-cerrahi',
      title: 'Artroskopik Cerrahi',
      img: '/images/artroskopik.avif',
      images: [],
      category: 'Eklem Cerrahisi',
      stats: [{ label: 'Kesi boyutu', val: '< 1 cm' }, { label: 'İyileşme', val: 'Hızlı' }],
      desc: ['Artroskopi, eklem içine küçük kamera ve aletler yerleştirilerek yapılan minimal invaziv cerrahidir.'],
      symptoms: ['Eklem kilitlenmesi', 'Yırtık menisküs', 'Kıkırdak hasarı'],
      treatment: [{ baslik: 'Menisküs Tamiri', icerik: 'Yırtık menisküs dokusu artroskopik yöntemle onarılır veya kısmi olarak alınır.' }],
      faq: [{ s: 'Artroskopi sonrası iyileşme ne kadar sürer?', c: 'İşleme bağlı olarak 2–6 hafta.' }],
    },
  ];

  for (const treatment of treatments) {
    await prisma.treatment.upsert({
      where: { slug: treatment.slug },
      update: {},
      create: treatment,
    });
  }
  console.log(`✅ ${treatments.length} treatments seeded`);

  // ─── PRESS ITEMS ─────────────────────────────────────────────────────────────
  const pressItems = [
    { outlet: 'NTV Sağlık', title: 'Skolyozda erken tanı ve doğru takip neden önemli?', summary: 'Omurga eğriliklerinde erken farkındalık, ailelerin dikkat etmesi gereken bulgular ve tedavi süreci üzerine uzman değerlendirmesi.', date: 'Mart 2025', format: 'tv', image: '/images/skolyoz-kifoz.avif', href: '#', lang: 'tr' },
    { outlet: 'Anadolu Sağlık Dergisi', title: 'Boyun ve bel fıtığında hangi belirtiler ciddiye alınmalı?', summary: 'Günlük yaşamı etkileyen ağrı, uyuşma ve güç kaybı şikayetlerinde hangi noktada uzman görüşü alınması gerektiğine dair röportaj.', date: 'Ocak 2025', format: 'press', image: '/images/boyun-fitigi.avif', href: '#', lang: 'tr' },
    { outlet: 'Medical Update', title: 'Robotik diz ve kalça cerrahisine güncel bakış', summary: 'Eklem cerrahisinde hassas planlama, hasta konforu ve iyileşme sürecine etkileri üzerine dijital yayın dosyası.', date: 'Kasım 2024', format: 'press', image: '/images/diz-kalca-protezi.avif', href: '#', lang: 'tr' },
    { outlet: 'TRT Radyo 1', title: 'Çocuklarda kalça gelişimi ve ortopedik takip', summary: 'Ailelerin erken dönemde fark edebileceği bulgular ve çocuk ortopedisinde düzenli değerlendirmenin önemi üzerine canlı yayın konuşması.', date: 'Eylül 2024', format: 'radio', image: '/images/cocuk-ortopedisi.avif', href: '#', lang: 'tr' },
    { outlet: 'Habertürk Sağlık', title: 'Diz protezi sonrası hareket kabiliyeti nasıl toparlanır?', summary: 'Eklem protezi sonrası iyileşme, yürüme süreci ve günlük yaşama dönüş hakkında uzman görüşü içeren haber dosyası.', date: 'Temmuz 2024', format: 'tv', image: '/images/diz-kalca-protezi.avif', href: '#', lang: 'tr' },
    { outlet: 'Sağlık Postası', title: 'Çocuk ortopedisinde erken değerlendirme neden belirleyici?', summary: 'Büyüme çağındaki ortopedik sorunlarda gecikmeyen muayenenin tedavi planını nasıl değiştirdiğini anlatan özel içerik.', date: 'Mayıs 2024', format: 'press', image: '/images/cocuk-ortopedisi.avif', href: '#', lang: 'tr' },
    { outlet: 'CNN Türk', title: 'Boyun ağrısı ve kola vuran uyuşmada ne zaman uzmana gidilmeli?', summary: 'Boyun fıtığı belirtileri, masa başı yaşamın etkileri ve doğru zamanda değerlendirme alınmasının önemi üzerine yayın.', date: 'Şubat 2024', format: 'tv', image: '/images/boyun-fitigi.avif', href: '#', lang: 'tr' },
    // EN versions
    { outlet: 'NTV Health', title: 'Why are early diagnosis and proper follow-up so important in scoliosis?', summary: 'Expert commentary on spinal curvature awareness, signs families should notice, and the treatment pathway.', date: 'March 2025', format: 'tv', image: '/images/skolyoz-kifoz.avif', href: '#', lang: 'en' },
    { outlet: 'Anatolia Health Review', title: 'Which neck and lumbar disc symptoms should be taken seriously?', summary: 'An interview on when pain, numbness, and loss of strength should lead to specialist evaluation.', date: 'January 2025', format: 'press', image: '/images/boyun-fitigi.avif', href: '#', lang: 'en' },
    { outlet: 'Medical Update', title: 'A current perspective on robotic knee and hip surgery', summary: 'A digital feature focused on precise planning, patient comfort, and recovery in joint surgery.', date: 'November 2024', format: 'press', image: '/images/diz-kalca-protezi.avif', href: '#', lang: 'en' },
  ];

  for (const item of pressItems) {
    await prisma.pressItem.create({ data: item });
  }
  console.log(`✅ ${pressItems.length} press items seeded`);

  // ─── PRESENTATIONS ────────────────────────────────────────────────────────────
  const presentations = [
    { year: '2024', title: 'Adolesan İdiyopatik Skolyozda Minimal İnvazif Teknikler', congress: '38. Türk Ortopedi ve Travmatoloji Kongresi', location: 'İstanbul, Türkiye', type: 'konferans', language: 'TR', topic: 'Skolyoz' },
    { year: '2024', title: 'Navigated Spinal Surgery: Current Indications and Outcomes', congress: 'SICOT World Congress 2024', location: 'Paris, Fransa', type: 'konferans', language: 'EN', topic: 'Omurga Cerrahisi' },
    { year: '2023', title: 'Kifoskolyozda Cerrahi Planlama ve Komplikasyon Yönetimi', congress: '11. Omurga Cerrahisi Sempozyumu', location: 'Ankara, Türkiye', type: 'sempozyum', language: 'TR', topic: 'Skolyoz' },
    { year: '2023', title: 'Pediatric Flatfoot: When to Operate?', congress: 'EPOS Annual Meeting 2023', location: 'Barselona, İspanya', type: 'konferans', language: 'EN', topic: 'Çocuk Ortopedisi' },
    { year: '2023', title: 'Diz Protezinde Robotik Destekli Cerrahi: 500 Vakalık Deneyim', congress: 'Türk Ortopedi Derneği Güz Toplantısı', location: 'Antalya, Türkiye', type: 'sempozyum', language: 'TR', topic: 'Diz ve Kalça Protezi' },
    { year: '2022', title: 'Lumbar Disc Herniation: Microsurgical vs. Endoscopic Approaches', congress: 'AOSpine Global Meeting', location: 'Viyana, Avusturya', type: 'konferans', language: 'EN', topic: 'Omurga Cerrahisi' },
    { year: '2022', title: 'Erken Başlangıçlı Skolyozda Büyüyen Çubuk Sistemleri', congress: 'Pediatrik Ortopedi Günleri', location: 'İzmir, Türkiye', type: 'workshop', language: 'TR', topic: 'Çocuk Ortopedisi' },
    { year: '2022', title: 'Artroskopik Diz Cerrahisinde Güncel Yaklaşımlar', congress: 'Türk Spor Hekimliği Kongresi', location: 'İstanbul, Türkiye', type: 'konferans', language: 'TR', topic: 'Artroskopik Cerrahi' },
    { year: '2021', title: 'Spinal Deformity Correction in Adults: Risk Stratification', congress: 'SRS Annual Meeting 2021', location: 'Chicago, ABD', type: 'konferans', language: 'EN', topic: 'Omurga Cerrahisi' },
    { year: '2021', title: 'COVID Sonrası Ortopedi Pratiğinde Değişimler', congress: 'Türk Tıp Dünyası Webinar Serisi', location: 'Online', type: 'webinar', language: 'TR', topic: 'Genel Ortopedi' },
    { year: '2020', title: 'Childhood Scoliosis: Bracing vs. Surgery Decision Making', congress: 'POSNA Annual Meeting', location: 'Online', type: 'webinar', language: 'EN', topic: 'Çocuk Ortopedisi' },
    { year: '2019', title: 'Kalça Protezinde Anterolateral Yaklaşım: Avantaj ve Dezavantajlar', congress: '33. Türk Ortopedi ve Travmatoloji Kongresi', location: 'Bursa, Türkiye', type: 'konferans', language: 'TR', topic: 'Diz ve Kalça Protezi' },
  ];

  for (const p of presentations) {
    await prisma.presentation.create({ data: p });
  }
  console.log(`✅ ${presentations.length} presentations seeded`);

  console.log('✅ Seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
