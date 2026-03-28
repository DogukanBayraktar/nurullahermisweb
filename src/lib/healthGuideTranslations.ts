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
      'Omurga sağlığı, ortopedi ve tedaviler hakkında Prof. Dr. Nurullah Ermiş\'in hazırladığı bilgilendirici içerikleri inceleyin.',
    all: 'Tümü',
    noArticles: 'Bu kategoride henüz makale yok.',
    readMore: 'Devamını Oku',
    showMore: 'Daha Fazla Göster',
    minutesSuffix: 'dk',
    scrollLeft: 'Filtreleri sola kaydır',
    scrollRight: 'Filtreleri sağa kaydır',
    backToAll: 'Tüm Yazılara Dön',
    editInStudio: 'Studio\'da Düzenle',
    author: 'Prof. Dr. Nurullah Ermiş',
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
      'Explore informative content prepared by Prof. Dr. Nurullah Ermiş on spine health, orthopedics, and treatments.',
    all: 'All',
    noArticles: 'There are no articles in this category yet.',
    readMore: 'Read More',
    showMore: 'Show More',
    minutesSuffix: 'min',
    scrollLeft: 'Scroll filters left',
    scrollRight: 'Scroll filters right',
    backToAll: 'Back to All Articles',
    editInStudio: 'Edit in Studio',
    author: 'Prof. Dr. Nurullah Ermiş',
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
      title: 'Bel Fıtığı Ameliyatı Nedir?',
      img: '/images/saglik/bel-fitigi.avif',
      date: '12 Mart 2025',
      readTime: '7 dk okuma',
      category: 'Bel Fıtığı',
      desc: "Bel fıtığı, omurga disklerinin yerinden kayarak sinirlere baskı yapmasıyla oluşur ve çoğunlukla 30–50 yaş arasında görülür.",
      intro: `Bel Fıtığı Ameliyatı Nedir? 

Bel ağrısı, bacaklara yayılan uyuşma veya güçsüzlük mü yaşıyorsunuz? Bunlar çoğu zaman bel fıtığının belirtileri olabilir. Bel fıtığı, omurga disklerinin yerinden kayarak sinirlere baskı yapmasıyla oluşur ve çoğunlukla 30–50 yaş arasında görülür. Bel fıtığı tedavisinde ilk adım genellikle konservatif yöntemlerdir. Bunlar arasında ilaç tedavisi, fizik tedavi, omurga egzersizleri, yaşam tarzı değişiklikleri ve bel destekleri yer alır. Çoğu hasta bu yöntemlerle ağrısını yönetebilir ve günlük yaşam aktivitelerini sürdürebilir. Ancak bazı durumlarda konservatif tedavi yeterli olmayabilir. Şiddetli ağrı, bacaklarda güç kaybı, idrar veya dışkı kontrolünde sorun gibi belirtiler varsa ameliyat gerekebilir.`,
      sections: [
        {
          h2: "Bel Fıtığı Ameliyatı Nasıl Yapılır?",
          content: `Bel fıtığı ameliyatı, genellikle mikrocerrahi veya endoskopik yöntemlerle yapılır. Cerrahi sırasında fıtıklaşmış disk bölgesi temizlenir ve sinir üzerindeki baskı kaldırılır. Modern tıbbi teknikler sayesinde ameliyatlar yüksek başarı oranıyla gerçekleştirilir ve hastalar genellikle kısa sürede günlük yaşamlarına dönebilir.`
        },
        {
          h2: "Ameliyat Sonrası Süreç",
          content: `Mikrocerrahi sonrası siyatik ağrısının büyük kısmı genellikle ilk günlerde geriler, ancak sinirin tam iyileşmesi 3–6 ay sürebilir; bu süreçte hafif karıncalanma hissi normal kabul edilir. İyileşmeyi hızlandırmak için ameliyat sonrası ilk 4–6 haftada ağır kaldırmaktan ve öne eğilmekten kaçınmak, fizyoterapist eşliğinde core (gövde) egzersizlerine başlamak ve günde 2–3 kez kısa yürüyüşler yapmak çok önemlidir. Ayrıca sigara kullanımı iyileşmeyi yavaşlattığı için mümkünse bırakılmalıdır.`
        },
        {
          h2: "Tekrar Fıtık Oluşma Riski",
          content: `Ameliyattan sonra tekrar fıtık oluşma riski her 100 operasyondan yaklaşık 5–8’idir. Bu riskin önüne geçmek için kilo kontrolü, düzenli core egzersizleri ve doğru kaldırma teknikleri büyük önem taşır. Tekrar fıtık oluştuğunda ise mikrodiskektomi veya endoskopik diskektomi yöntemleri başarıyla uygulanabilir.`
        }
      ],
      tags: ['Bel Fıtığı', 'Mikrodiskektomi', 'Siyatik', 'Lomber Disk', 'Omurga Cerrahisi'],
    },
    'skolyoz-belirtileri-tedavisi': {
      slug: 'skolyoz-belirtileri-tedavisi',
      title: 'Skolyozdan Korkmalı Mıyız? ',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: '28 Şubat 2025',
      readTime: '8 dk okuma',
      category: 'Skolyoz',
      desc: "Skolyoz, omurganın yanlara doğru eğrilmesiyle ortaya çıkan bir rahatsızlıktır ve özellikle çocukluk ve ergenlik döneminde sıkça fark edilir.",
      intro: `Omuzlarınız eşit mi? Aynaya bakarken sırtınızda hafif bir eğrilik fark ettiniz mi? Basit bir duruş bozukluğu sandığınız bu durum, aslında skolyozun ilk işareti olabilir. 
    Skolyoz, omurganın yanlara doğru eğrilmesiyle ortaya çıkan bir rahatsızlıktır ve özellikle çocukluk ve ergenlik döneminde sıkça fark edilir. Çoğu zaman ağrı yapmadığı için fark edilmesi zor olabilir. Prof. Dr. Nurullah Ermiş, her hastalıkta olduğu gibi skolyozda da erken tanının önemine dikkat çekiyor. Düzenli doktor kontrolü, doğru egzersizler ve bazı durumlarda korse tedavisi, sağlıklı bir omurgaya ulaşmayı kolaylaştırıyor. Bu süreçte ailelere büyük görev düşüyor. Çocuklarınızın duruşuna, oturuşuna ve günlük hareketlerine dikkat etmeniz gerekiyor. Özellikle çocuk eğilirken sırtın bir tarafında çıkıntı görülüyorsa, bu belirti ihmal edilmeden uzmana başvurulmalıdır.`,
      sections: [
        {
          h2: "Skolyozun Nedenleri Nelerdir?",
          content: `Skolyozun tek bir nedeni yoktur; birçok faktör rol oynayabilir. Yapılan araştırmalara göre vakaların yaklaşık %80’inde neden tam olarak belirlenemiyor. Öne çıkan faktörler arasında genetik yatkınlık önemli bir rol oynar ve kız çocuklarında erkeklere oranla daha sık görülür. Ayrıca anne karnında yeterince gelişmemiş omurga yapısı da skolyoza yol açabilir. Yanlış duruş, hatalı oturma ve ağır çantaların tek omuzda taşınması, var olan omurga eğriliğini daha da artırabilir.`
        },
        {
          h2: "Skolyoz Tedavisi ve Ameliyat Süreci",
          content: `Skolyoz ameliyatı ise ileri cerrahi deneyim ve teknoloji gerektiren bir operasyondur. Ancak günümüzdeki yöntemlerle ameliyat yüksek oranda başarılı geçmektedir. Ameliyat planı, hastanın yaşı ve eğriliğin derecesi göz önünde bulundurularak yapılır. Operasyonda omurga hizası boyunca açılan kesiye pedikül vida sistemleri yerleştirilir ve bu vidalar arasından metal çubuklar geçirilir.`
        },
        {
          h2: "Skolyozdan Korkmalı Mıyız?",
          content: `Unutmayın; skolyoz her zaman korkulacak bir durum değildir. Erken tanı, düzenli kontroller ve doğru tedavi yöntemleriyle çoğu vaka yönetilebilir ve sağlıklı bir omurgaya ulaşmak mümkündür.`
        }
      ],
      tags: ['Skolyoz', 'VBT', 'Kifoz', 'Omurga Eğriliği', 'Çocuk Ortopedisi', 'Omurga Cerrahisi'],
    },
    'diz-protezi-ameliyati': {
      slug: 'diz-protezi-ameliyati',
      title: 'Diz Protezi Ameliyatı Nedir?',
      img: '/images/saglik/diz-cerrahi.avif',
      date: '10 Ocak 2025',
      readTime: '6 dk okuma',
      category: 'Eklem Protezi',
      desc: "Diz protezi ameliyatı, eklem yüzeylerinin aşınması, kireçlenme veya travma sonrası oluşan hasarları düzeltmek için uygulanan güvenli ve etkili bir yöntemdir.",
      intro: `DİZ PROTEZİ AMELİYATI NEDİR?
ROBOTİK CERRAHİ HANGİ DURUMLARDA KULLANILIR? 

Dizlerinizde sürekli ağrı, şişlik, hareket kısıtlılığı veya günlük yaşam aktivitelerinde zorlanma mı yaşıyorsunuz? Bunlar genellikle ileri derecede eklem hasarının veya diz kireçlenmesinin ilk işaretleri olabilir. Diz protezi ameliyatı, eklem yüzeylerinin aşınması, kireçlenme veya travma sonrası oluşan hasarları düzeltmek için uygulanan güvenli ve etkili bir yöntemdir. Prof. Dr. Nurullah Ermiş, diz protezi ameliyatlarında erken değerlendirmenin tedaviyi büyük oranda kolaylaştırdığını vurguluyor.`,
      sections: [
        {
          h2: "Diz Protezi Hangi Durumlarda Uygulanır?",
          content: `Diz protezi genellikle ileri derecede osteoartrit, romatoid artrit, travmatik eklem hasarı veya önceki cerrahi müdahaleler sonrası dizde ciddi fonksiyon kaybı olan hastalarda uygulanır. Belirtiler arasında sürekli diz ağrısı, merdiven inip çıkmada zorluk, bacaklarda güç kaybı ve eklemde sertlik yer alır. Bu belirtiler varsa gecikmeden ortopedi uzmanına başvurmak gerekir.`
        },
        {
          h2: "Diz Protezi Ameliyatı Nasıl Yapılır?",
          content: `Diz protezi ameliyatı, hastanın yaşı, genel sağlık durumu ve dizdeki hasarın derecesine göre planlanır. Cerrahide aşınmış veya hasar görmüş eklem yüzeyleri çıkarılır ve yerine metal, seramik veya polietilen malzemelerden oluşan yapay eklem (protezi) yerleştirilir. Modern cerrahi teknikler ve robotik destekli yöntemler sayesinde operasyonlar yüksek başarı oranıyla gerçekleştirilir. Ameliyat sonrası fizik tedavi ile dizin hareket kabiliyeti artırılır ve hastalar günlük yaşam aktivitelerine güvenle dönebilir.`
        },
        {
          h2: "Diz Protezi Ameliyatı Hangi Durumlarda Tercih Edilir?",
          content: `Diz protezi ameliyatı genellikle şu durumlarda tercih edilir:\n\n• İleri derecede osteoartrit veya kireçlenme ile ağrı ve hareket kaybı \n• Romatoid artrit veya diğer eklem hastalıklarında ciddi fonksiyon kaybı \n• Önceki tedavilere yanıt alınamayan kronik diz ağrıları \n• Travmatik eklem hasarı sonrası dizin düzgün çalışmaması`
        },
        {
          h2: "Robotik Diz Protezi Nedir?",
          content: `Robotik diz protezi, geleneksel yöntemlere göre daha hassas ve güvenlidir. Geleneksel diz protezi ameliyatında cerrah, kemik kesimlerini el aletleri ve kılavuzlarla gerçekleştirirken, robotik sistemde ameliyat öncesinde hastanın kemikleri 3 boyutlu olarak modellenir ve implant pozisyonu bilgisayar ortamında milimetrik hassasiyetle planlanır. Ameliyat sırasında robot, planlanan sınırların dışına çıkılmasını otomatik olarak engeller ve bacak ekseninin mükemmel biçimde düzeltilmesini sağlar, böylece implantın yerleşimi ve dizin fonksiyonu çok daha güvenli ve doğru olur.`
        },
        {
          h2: "İyileşme Süreci ve Sonuçlar",
          content: `Erken değerlendirme, modern cerrahi teknikler ve doğru rehabilitasyon ile hastaların çoğu ağrısız ve aktif bir yaşam sürdürebilir. Düzenli kontroller, uygun tedavi planı ve bilinçli fizik tedavi ile diz sağlığınızı güvenle koruyabilirsiniz.`
        }
      ],
      tags: ['Diz Protezi', 'Robotik Cerrahi', 'Osteoartrit', 'Kireçlenme', 'Eklem Protezi'],
    },
    'boyun-fitiginiz-mi-var': {
      slug: 'boyun-fitiginiz-mi-var',
      title: 'Boyun Fıtığınız Mı Var? Paniğe Gerek Yok…',
      img: '/images/saglik/boyun-cerrahi.avif',
      date: '5 Kasım 2024',
      readTime: '6 dk okuma',
      category: 'Boyun Fıtığı',
      desc: "Boyun fıtığı, omurgadaki disklerin yerinden kayarak sinirlere baskı yapmasıyla ortaya çıkan bir rahatsızlıktır ve genellikle orta yaş ve ileri yaşlarda daha sık görülür.",
      intro: `Boyun Fıtığınız Mı Var? Paniğe Gerek Yok…
Boyun ağrısı, omuzlarda uyuşma veya kolda hissizlik fark ettiniz mi? Bunlar basit bir kas yorgunluğu gibi görünebilir, ancak boyun fıtığının ilk belirtileri olabilir. 
Boyun fıtığı, omurgadaki disklerin yerinden kayarak sinirlere baskı yapmasıyla ortaya çıkan bir rahatsızlıktır ve genellikle orta yaş ve ileri yaşlarda daha sık görülür. 
Ancak günümüzde masa başı çalışanlar ve gençlerde de yaygınlaşmıştır. Prof. Dr. Nurullah Ermiş, boyun fıtığında erken tanının önemine dikkat çekiyor. Düzenli kontroller, doğru egzersizler ve yaşam alışkanlıklarının düzenlenmesi çoğu vakada ağrıyı azaltabilir ve yaşam kalitesini artırabilir.`,
      sections: [
        {
          h2: "Boyun Fıtığı Belirtileri Nelerdir?",
          content: `Boyun fıtığının en sık görülen belirtileri arasında boyun ağrısı, omuz ve kollarda uyuşma veya karıncalanma, kollarda güç kaybı ve baş hareketlerinde kısıtlılık yer alır. Eğer bu belirtilerden biri veya birkaçı varsa, gecikmeden uzmana başvurmak önemlidir.`
        },
        {
          h2: "Boyun Fıtığının Nedenleri Nelerdir?",
          content: `Boyun fıtığının oluşumunda birçok faktör rol oynar. Uzun süre yanlış duruşla oturmak, ağır yük taşımak, ani hareketler veya genetik yatkınlık fıtık riskini artırabilir.`
        },
        {
          h2: "Tedavi Seçenekleri Nelerdir?",
          content: `Tedavi seçenekleri, hastalığın derecesine ve hastanın yaşam tarzına göre değişir. Çoğu hafif ve orta şiddette fıtık, ilaç tedavisi, fizik tedavi ve özel egzersiz programlarıyla kontrol altına alınabilir. Şiddetli vakalarda veya sinir basısı ileri düzeyde olduğunda, ileri cerrahi yöntemler uygulanabilir. Modern tıbbi tekniklerle boyun fıtığı ameliyatları yüksek başarı oranıyla gerçekleştirilmektedir.`
        },
        {
          h2: "Boyun Fıtığından Korkmalı Mıyız?",
          content: `Unutmayın; boyun fıtığı her zaman korkulacak bir durum değildir. Erken tanı, düzenli doktor kontrolleri ve doğru tedavi yöntemleri ile çoğu hasta normal yaşamına dönebilir, ağrıları yönetilebilir ve hareket özgürlüğü korunabilir. Düzenli duruş kontrolleri, ergonomik çalışma düzeni ve bilinçli egzersizlerle boyun sağlığınızı koruyabilirsiniz.`
        }
      ],
      tags: ['Boyun Fıtığı', 'Servikal Disk', 'ACDF', 'Yapay Disk', 'Omurga Cerrahisi'],
    },
    'cocuklarda-kalca-cikigini-nasil-anlariz': {
      slug: 'cocuklarda-kalca-cikigini-nasil-anlariz',
      title: 'Çocuklarda Kalça Çıkığını Nasıl Anlarız?',
      img: '/images/saglik/cocuk.avif',
      date: '20 Eylül 2024',
      readTime: '5 dk okuma',
      category: 'Çocuk Ortopedisi',
      desc: "Kalça çıkığı, genellikle doğuştan gelen bir durumdur ve eklem gelişimiyle doğrudan ilgilidir.",
      intro: `Çocuklarda Kalça Çıkığını Nasıl Anlarız? 

Doğum sonrası bebeklerde kalça bölgelerinde asimetri fark ettiniz mi? Bacakların eşit uzunlukta olmaması, bebeğinizin bir bacağını diğerine göre daha az açabilmesi ya da kalçada hareket kısıtlılığı çocuklarda kalça çıkığının ilk işaretleri olabilir. Kalça çıkığı, genellikle doğuştan gelen bir durumdur ve eklem gelişimiyle doğrudan ilgilidir. Prof. Dr. Nurullah Ermiş, erken tanının önemine dikkat çekiyor; çünkü erken fark edilen kalça çıkığı, basit yöntemlerle kolayca düzeltilebilir ve çocuğun normal gelişimi sağlanabilir.`,
      sections: [
        {
          h2: "Kalça Çıkığı Belirtileri Nelerdir?",
          content: `Kalça çıkığı genellikle doğum sırasında veya ilk aylarda fark edilir. Belirtileri arasında bacak boylarında fark, kalça çevresinde simetri eksikliği, bebeğin bacaklarını açarken zorlanma veya “tık” sesiyle hareket etme yer alır.`
        },
        {
          h2: "Kalça Çıkığının Nedenleri Nelerdir?",
          content: `Kalça çıkığının oluşumunda birçok faktör rol oynayabilir. Genetik yatkınlık, bebek anne karnında ters pozisyonda olduğunda veya bazı doğum komplikasyonları riski artırabilir. Ayrıca prematüre bebeklerde veya ailede geçmişte kalça çıkığı öyküsü olan çocuklarda görülme olasılığı daha yüksektir.`
        },
        {
          h2: "Tedavi Süreci Nasıldır?",
          content: `Tedavi, çıkığın şiddetine ve çocuğun yaşına göre değişir. Hafif olgularda Pavlik bandajı veya özel kalça alçıları kullanılır; bunlar kalça eklemini doğru pozisyonda sabitler ve eklem gelişimini destekler. Tedavi genellikle birkaç hafta ile birkaç ay sürebilir ve düzenli takip gerektirir. Daha ileri vakalarda veya konservatif yöntemlerle yeterli düzeltme sağlanamazsa, cerrahi müdahale gerekebilir.`
        },
        {
          h2: "Cerrahi Tedavi ve Sonrası",
          content: `Cerrahi işlemde kalça eklemi düzgün konuma getirilir ve sabitlenir; bazı durumlarda pelvik kemik ve femur kemiklerine müdahale gerekebilir. Modern cerrahi yöntemler sayesinde ameliyatlar güvenli ve yüksek başarı oranıyla gerçekleştirilir, çocuk normal gelişimini sürdürebilir. Ameliyat sonrası genellikle özel alçılar veya destekleyici cihazlarla kalça korunur ve fizik tedavi ile hareket kabiliyeti güçlendirilir.`
        },
        {
          h2: "Takip ve Önemi",
          content: `Düzenli kontroller, uzman yönlendirmesi ve uygun tedavi yöntemleri ile çocuğunuzun sağlıklı bir şekilde yürümeye başlamasını ve normal gelişimini güvenle destekleyebilirsiniz.`
        }
      ],
      tags: ['Kalça Çıkığı', 'GKD', 'Çocuk Ortopedisi', 'Pavlik Bandajı', 'Bebek Kalça Displazisi'],
    },
    'skolyoz-egzersizleri': {
      slug: 'skolyoz-egzersizleri',
      title: 'Skolyoz Egzersizleri: Omurgayı Destekleyen Hareketler',
      img: '/images/saglik/skolyoz-egzersiz.avif',
      date: '28 Mart 2025',
      readTime: '8 dk okuma',
      category: 'Skolyoz',
      desc: 'Skolyozda doğru egzersizler omurga kaslarını güçlendirir, eğriliğin ilerlemesini yavaşlatabilir ve yaşam kalitesini artırır. Hangi egzersizler faydalı, hangileri sakıncalı?',
      intro: `Skolyoz tanısı almak, hareketsiz kalmak anlamına gelmez. Aksine — doğru egzersizler, omurga kaslarını güçlendirerek eğriliğin ilerlemesini yavaşlatabilir, ağrıyı azaltabilir ve duruşu belirgin biçimde iyileştirebilir.\n\nAncak her egzersiz her hastaya uygun değildir. Eğriliğin tipi, derecesi ve hastanın yaşı, hangi hareketlerin faydalı hangilerinin zararlı olacağını doğrudan belirler. Bu nedenle egzersiz programının mutlaka ortopedi uzmanı veya fizyoterapist gözetiminde oluşturulması gerekir.\n\nProf. Dr. Nurullah Ermiş, skolyozlu hastalarında egzersizi tedavinin ayrılmaz bir parçası olarak görür. Bu rehberde bilimsel temeli olan yaklaşımları, dikkat edilmesi gereken noktaları ve sıkça sorulan soruları bulacaksınız.`,
      sections: [
        {
          h2: 'Skolyozda Egzersizin Önemi',
          content: `Omurga çevresindeki kaslar — özellikle paraspinal kaslar, karın kasları ve kalça stabilizatörleri — omurgayı dik tutan aktif desteklerdir. Bu kaslar zayıfladığında eğrilik üzerindeki yük artar ve eğriliğin ilerlemesi kolaylaşır.\n\nEgzersiz tedavisinin kanıtlanmış faydaları şunlardır:\n\n• Omurga kaslarını güçlendirerek omurgaya aktif destek sağlar\n• Büyüme dönemindeki çocuklarda eğriliğin ilerlemesini yavaşlatabilir\n• Postür farkındalığını artırır, günlük yaşam alışkanlıklarını iyileştirir\n• Ağrı ve kas yorgunluğunu azaltır\n• Solunum kapasitesini destekler (özellikle torakal eğriliklerde)\n• Cerrahi sonrası iyileşme sürecini hızlandırır\n\nÖnemli: Egzersiz, korse veya cerrahi tedavinin yerini almaz. Eğriliğin derecesine göre bu yöntemler birlikte uygulanır.`
        },
        {
          h2: 'Skolyozu Destekleyen Temel Egzersiz Yaklaşımları',
          content: `Bilimsel literatürde ve klinik uygulamada öne çıkan birkaç yöntem vardır:\n\nSchroth Yöntemi\nAlmanya kökenli bu üç boyutlu solunum ve postür eğitimi yöntemi, skolyoz için en çok araştırılmış egzersiz yaklaşımlarından biridir. Omurgayı aktif olarak rotasyon ve elongasyon ile yeniden hizalama prensibine dayanır. Fizyoterapist eşliğinde öğrenilmesi önerilir.\n\nSEAS (Scientific Exercise Approach to Scoliosis)\nİtalyan kökenli bu yaklaşım, hastanın kendi kendine uygulayabileceği aktif öz-düzeltme egzersizlerine dayanır. Korse tedavisiyle kombinasyonu başarılı sonuçlar vermektedir.\n\nCore Stabilizasyon Egzersizleri\nDerin karın kasları (transversus abdominis) ve multifidus kaslarını hedef alan bu egzersizler, omurganın dinamik dengesini destekler. Pilates bazlı hareketler bu kategoriye girer.\n\nSolunum Egzersizleri\nÖzellikle torakal (göğüs bölgesi) skolyozda solunum kapasitesini korumak için diyafragmatik ve yönlendirici solunum egzersizleri önemlidir.`
        },
        {
          h2: 'Evde Uygulanabilecek Destekleyici Hareketler',
          content: `Aşağıdaki hareketler genel omurga sağlığını destekler; ancak kişisel egzersiz programınız uzman tarafından belirlenmelidir:\n\nCat-Cow (Kedi-İnek Hareketi)\nDörtayak pozisyonda sırtı yavaşça yukarı ve aşağı hareket ettirerek omurganın esnekliğini artırır, kas gerilimini azaltır.\n\nBird-Dog\nDörtayak pozisyondan karşılıklı kol ve bacağı yavaşça uzatma hareketi; core kaslarını ve denge koordinasyonunu güçlendirir.\n\nYan Köprü (Side Plank — modifiye)\nDiz üzerinde yapılan yan köprü, lateral stabilizatörleri güçlendirerek lateral eğriliklerde destek sağlar.\n\nScapular Retraksiyon\nOmuzları arkaya ve aşağıya çekme hareketi; üst sırt kaslarını güçlendirir, öne düşen omuz duruşunu düzeltir.\n\nPelvik Tilt\nSırt üstü yatış pozisyonunda bel bölgesini zemine bastırıp bırakma; lumbar bölge mobilizasyonu ve karın kası aktivasyonu için kullanılır.\n\nDikkat: Bu hareketler genel bilgilendirme amaçlıdır. Eğriliğin yönüne ve lokalizasyonuna göre bazı hareketler hastaya uygun olmayabilir.`
        },
        {
          h2: 'Kaçınılması Gereken Durumlar',
          content: `Skolyozlu hastalarda bazı aktivite ve egzersizler dikkatli değerlendirilmelidir:\n\n• Ağır serbest ağırlık egzersizleri: Yanlış form altında omurgaya aşırı yük bindirebilir\n• Yüksek darbeli aktiviteler: Eğriliğin ilerlediği dönemlerde koşu veya atlama yoğunluğu azaltılabilir\n• Asimetrik yük taşıma: Tek omuzda ağır çanta omurga kasimetrini artırabilir\n• Ağrı veren hareketler: Herhangi bir egzersiz sırasında ağrı, uyuşma veya nefes darlığı yaşanıyorsa hemen bırakılmalı ve uzman görüşü alınmalıdır\n\nNot: Hafif eğriliklerde (20° altı) yüzme, yürüyüş, pilates ve yoga gibi aktiviteler genellikle güvenle yapılabilir. 20–45° arası vakalarda program fizyoterapist eşliğinde tasarlanmalıdır.`
        },
        {
          h2: 'Egzersiz Programına Ne Zaman Başlanmalı?',
          content: `Egzersiz, skolyoz tanısından sonra ne kadar erken başlanırsa o kadar faydalıdır. Büyüme dönemindeki çocuklarda ve ergenlerde — özellikle Cobb açısı 20–45° arasında olanlarda — düzenli egzersiz ve gerekirse korse tedavisinin birlikte uygulanması, cerrahiye gerek kalmadan eğriliğin kontrol altında tutulmasına yardımcı olabilir.\n\nCerrahi sonrası dönemde ise egzersiz programı genellikle ameliyattan 4–6 hafta sonra fizyoterapist gözetiminde başlar; ilerleme cerrahın onayıyla adım adım yürütülür.\n\nHer hastanın durumu farklıdır. Egzersiz programınızı oluşturmadan önce mutlaka uzman görüşü alın.`
        },
      ],
      tags: ['Skolyoz', 'Skolyoz Egzersizleri', 'Schroth', 'Core Egzersiz', 'Omurga Sağlığı', 'Postür'],
    },
    'acl-cop-bag-ameliyati': {
      slug: 'acl-cop-bag-ameliyati',
      title: 'Spor Yaralanmalarına Dikkat! ',
      img: '/images/saglik/on-capraz.avif',
      date: '3 Ağustos 2024',
      readTime: '7 dk okuma',
      category: 'Artroskopik Cerrahi',
      desc: "Spor yaralanmaları, kas, tendon, bağ ve eklemlerde oluşan hasarlardır ve hem amatör hem de profesyonel sporcular arasında sık görülür.",
      intro: `Spor Yaralanmalarına Dikkat! 

      Spor yaparken ya da günlük yaşamda ani hareketler sırasında eklem, kas veya kemiklerde ağrı, şişlik veya hareket kısıtlılığı mı hissediyorsunuz? Bunlar çoğu zaman basit bir zorlanma gibi görünebilir, ancak spor yaralanmalarının ilk işaretleri olabilir.\n 
      Spor yaralanmaları, kas, tendon, bağ ve eklemlerde oluşan hasarlardır ve hem amatör hem de profesyonel sporcular arasında sık görülür. Prof. Dr. Nurullah Ermiş, spor yaralanmalarında erken tanı ve doğru müdahalenin önemine dikkat çekiyor.`,
      sections: [
        {
          h2: "Sık Görülen Spor Yaralanmaları ve Belirtileri",
          content: `Sık görülen spor yaralanmaları arasında burkulmalar, kas zorlanmaları, tendon iltihapları, menisküs yaralanmaları ve kemik kırıkları yer alır. Belirtiler genellikle ağrı, şişlik, morarma, eklemde hareket kısıtlılığı veya basınca duyarlılık şeklindedir. Bu belirtiler ortaya çıktığında gecikmeden ortopedik uzmana başvurmak gerekir.`
        },
        {
          h2: "Spor Yaralanmalarının Nedenleri",
          content: `Spor yaralanmalarının oluşumunda birçok faktör rol oynar. Yanlış ısınma, hatalı teknik, aşırı yüklenme veya uygun olmayan ekipman kullanımı riski artırabilir. Ayrıca kişisel faktörler, genetik yatkınlık ve önceki yaralanmalar da süreci etkiler.`
        },
        {
          h2: "Tedavi Seçenekleri ve Cerrahi Gereksinim",
          content: `Tedavi seçenekleri, yaralanmanın türü ve şiddetine göre değişir. Hafif yaralanmalarda dinlenme, fizik tedavi, egzersiz ve ağrı yönetimi yeterli olurken; bazı durumlarda cerrahi müdahale gerekebilir. Cerrahi genellikle şu durumlarda tercih edilir:\n\n• Kemik kırıkları veya eklemde kayma oluştuğunda \n• Menisküs yırtıkları ve bağ kopmaları gibi ciddi eklem yaralanmalarında \n• Tendon kopmaları veya kronik, iyileşmeyen yaralanmalarda \n• Konservatif (ameliyatsız) tedaviye yanıt alınamadığında veya ağrı ve fonksiyon kaybı devam ettiğinde`
        },
        {
          h2: "İyileşme Süreci ve Korunma",
          content: `Modern ortopedik cerrahi teknikler sayesinde operasyonlar yüksek başarı oranıyla gerçekleştirilir ve sporcuların spora dönüş süresi minimuma indirilir. Erken tanı, doğru tedavi ve uygun rehabilitasyonla çoğu yaralanma tamamen iyileşir. Düzenli ısınma, doğru teknik, uygun ekipman kullanımı ve bilinçli egzersizler, yaralanma riskinizi azaltır ve sağlıklı bir spor hayatı sürdürmenizi sağlar.`
        }
      ],
      tags: ['ACL', 'Ön Çapraz Bağ', 'Diz Ameliyatı', 'Artroskopi', 'Menisküs', 'Spor Cerrahisi'],
    },
  },
  en: {
    'bel-fitigi-ameliyati': {
      slug: 'bel-fitigi-ameliyati',
      title: 'Lumbar Disc Herniation Surgery: Walking on the Same Day with Microsurgery',
      img: '/images/saglik/bel-fitigi.avif',
      date: 'March 12, 2025',
      readTime: '7 min read',
      category: 'Lumbar Disc Herniation',
      desc: "A lumbar disc herniation occurs when spinal discs shift out of place and put pressure on nerves, and it is most commonly seen between the ages of 30 and 50.",
      intro: `What Is Lumbar Disc Herniation Surgery? 

Are you experiencing lower back pain, numbness radiating to the legs, or weakness? These may often be symptoms of a lumbar disc herniation. A lumbar disc herniation occurs when spinal discs shift out of place and put pressure on nerves, and it is most commonly seen between the ages of 30 and 50. The first step in treatment is usually conservative methods. These include medication, physical therapy, spinal exercises, lifestyle changes, and lumbar supports. Most patients can manage their pain and continue daily activities with these methods. However, in some cases, conservative treatment may not be sufficient. If there are symptoms such as severe pain, loss of strength in the legs, or problems with bladder or bowel control, surgery may be required.`,
      sections: [
        {
          h2: "How Is Lumbar Disc Herniation Surgery Performed?",
          content: `Lumbar disc herniation surgery is generally performed using microsurgical or endoscopic methods. During the procedure, the herniated disc material is removed and the pressure on the nerve is relieved. Thanks to modern medical techniques, surgeries are performed with high success rates, and patients can usually return to their daily lives in a short time.`
        },
        {
          h2: "Postoperative Process",
          content: `After microsurgery, most of the sciatic pain usually decreases in the first days, but full nerve recovery may take 3–6 months; mild tingling during this period is considered normal. To accelerate recovery, it is very important to avoid heavy lifting and bending forward during the first 4–6 weeks after surgery, start core exercises under the supervision of a physiotherapist, and take short walks 2–3 times a day. Additionally, smoking should be stopped if possible, as it slows down recovery.`
        },
        {
          h2: "Risk of Recurrent Herniation",
          content: `The risk of recurrent herniation after surgery is approximately 5–8 out of every 100 operations. To reduce this risk, weight control, regular core exercises, and proper lifting techniques are very important. If herniation recurs, microdiscectomy or endoscopic discectomy methods can be successfully applied.`
        }
      ],
      tags: ['Lumbar Disc Herniation', 'Microdiscectomy', 'Sciatica', 'Lumbar Disc', 'Spine Surgery'],
    },
    'skolyoz-belirtileri-tedavisi': {
      slug: 'skolyoz-belirtileri-tedavisi',
      title: 'Should we be afraid of scoliosis?',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: 'February 28, 2025',
      readTime: '8 min read',
      category: 'Scoliosis',
      desc: "Scoliosis is a condition characterized by a sideways curvature of the spine and is often noticed during childhood and adolescence.",
      intro: `Are your shoulders level? Have you noticed a slight curvature in your back when looking in the mirror? What you may think is a simple posture issue could actually be an early sign of scoliosis. 
Scoliosis is a condition characterized by a sideways curvature of the spine and is often noticed during childhood and adolescence. Since it usually does not cause pain, it can be difficult to detect. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis in scoliosis, as in all diseases. Regular medical check-ups, proper exercises, and in some cases brace treatment help achieve a healthy spine. In this process, families have a major responsibility. You need to pay attention to your children's posture, sitting habits, and daily movements. Especially if a prominence is noticed on one side of the back when the child bends forward, this sign should not be ignored and a specialist should be consulted.`,
      sections: [
        {
          h2: "What Causes Scoliosis?",
          content: `Scoliosis does not have a single cause; multiple factors may play a role. According to studies, in approximately 80% of cases, the exact cause cannot be determined. Genetic predisposition is one of the leading factors, and it is more common in girls than in boys. Additionally, an underdeveloped spine during fetal development may also lead to scoliosis. Poor posture, incorrect sitting habits, and carrying heavy bags on one shoulder can further worsen an existing spinal curvature.`
        },
        {
          h2: "Scoliosis Treatment and Surgery Process",
          content: `Scoliosis surgery is an operation that requires advanced surgical experience and technology. However, with modern methods, the success rate of surgery is quite high. The surgical plan is determined by considering the patient’s age and the degree of curvature. During the operation, pedicle screw systems are placed along the incision made along the spine, and metal rods are inserted between these screws.`
        },
        {
          h2: "Should We Be Afraid of Scoliosis?",
          content: `Remember, scoliosis is not always something to be feared. With early diagnosis, regular follow-ups, and appropriate treatment methods, most cases can be managed, and it is possible to achieve a healthy spine.`
        }
      ],
      tags: ['Scoliosis', 'VBT', 'Kyphosis', 'Spinal Curvature', 'Pediatric Orthopedics', 'Spine Surgery'],
    },
    'diz-protezi-ameliyati': {
      slug: 'diz-protezi-ameliyati',
      title: 'What is knee replacement surgery?',
      img: '/images/saglik/diz-cerrahi.avif',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Joint Replacement',
      desc: "Knee replacement surgery is a safe and effective method used to correct damage caused by joint wear, osteoarthritis, or trauma.",
      intro: `WHAT IS KNEE REPLACEMENT SURGERY?
WHEN IS ROBOTIC SURGERY USED? 

Do you experience persistent knee pain, swelling, limited movement, or difficulty performing daily activities? These are often the first signs of advanced joint damage or knee osteoarthritis. Knee replacement surgery is a safe and effective method used to correct damage caused by joint wear, osteoarthritis, or trauma. Prof. Dr. Nurullah Ermiş emphasizes that early evaluation significantly facilitates treatment in knee replacement procedures.`,
      sections: [
        {
          h2: "When Is Knee Replacement Applied?",
          content: `Knee replacement is generally performed in patients with advanced osteoarthritis, rheumatoid arthritis, traumatic joint damage, or severe loss of knee function after previous surgical interventions. Symptoms include persistent knee pain, difficulty climbing stairs, loss of strength in the legs, and joint stiffness. If these symptoms are present, it is important to consult an orthopedic specialist without delay.`
        },
        {
          h2: "How Is Knee Replacement Surgery Performed?",
          content: `Knee replacement surgery is planned according to the patient’s age, general health condition, and the degree of damage in the knee. During surgery, worn or damaged joint surfaces are removed and replaced with an artificial joint (prosthesis) made of metal, ceramic, or polyethylene materials. Thanks to modern surgical techniques and robotic-assisted methods, operations are performed with high success rates. After surgery, mobility of the knee is improved through physical therapy, and patients can safely return to their daily activities.`
        },
        {
          h2: "In Which Cases Is Knee Replacement Surgery Preferred?",
          content: `Knee replacement surgery is generally preferred in the following situations:\n\n• Advanced osteoarthritis or degeneration with pain and loss of movement \n• Severe functional loss in rheumatoid arthritis or other joint diseases \n• Chronic knee pain unresponsive to previous treatments \n• Improper knee function after traumatic joint damage`
        },
        {
          h2: "What Is Robotic Knee Replacement?",
          content: `Robotic knee replacement is more precise and safer compared to traditional methods. In conventional knee replacement surgery, the surgeon performs bone cuts using manual instruments and guides, whereas in robotic systems, the patient’s bones are modeled in 3D before surgery and the implant position is planned with millimetric precision in a computer environment. During the operation, the robot automatically prevents deviations beyond the planned boundaries and ensures perfect alignment of the leg axis, resulting in much safer and more accurate implant placement and knee function.`
        },
        {
          h2: "Recovery Process and Outcomes",
          content: `With early evaluation, modern surgical techniques, and proper rehabilitation, most patients can lead a pain-free and active life. Regular check-ups, an appropriate treatment plan, and conscious physical therapy help you maintain your knee health safely.`
        }
      ],
      tags: ['Knee Replacement', 'Robotic Surgery', 'Osteoarthritis', 'Arthrosis', 'Joint Replacement'],
    },
    'boyun-fitiginiz-mi-var': {
      slug: 'boyun-fitiginiz-mi-var',
      title: 'Do You Have a Cervical Disc Herniation? No Need to Panic…',
      img: '/images/saglik/boyun-cerrahi.avif',
      date: 'November 5, 2024',
      readTime: '6 min read',
      category: 'Cervical Disc Herniation',
      desc: "A cervical disc herniation is a condition that occurs when the discs in the spine shift out of place and put pressure on the nerves, and it is more commonly seen in middle-aged and older individuals.",
      intro: `Do You Have a Cervical Disc Herniation? No Need to Panic…
Do you have neck pain, numbness in your shoulders, or a loss of sensation in your arm? These may seem like simple muscle fatigue, but they could be the first signs of a cervical disc herniation. 
A cervical disc herniation is a condition that occurs when the discs in the spine shift out of place and put pressure on the nerves, and it is generally more common in middle-aged and older individuals. 
However, today it has also become widespread among desk workers and younger people. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis in cervical disc herniation. Regular check-ups, proper exercises, and adjustments in lifestyle habits can reduce pain and improve quality of life in most cases.`,
      sections: [
        {
          h2: "What Are the Symptoms of Cervical Disc Herniation?",
          content: `The most common symptoms of cervical disc herniation include neck pain, numbness or tingling in the shoulders and arms, loss of strength in the arms, and limited movement of the head. If one or more of these symptoms are present, it is important to consult a specialist without delay.`
        },
        {
          h2: "What Causes Cervical Disc Herniation?",
          content: `Many factors play a role in the development of a cervical disc herniation. Sitting for long periods with poor posture, carrying heavy loads, sudden movements, or genetic predisposition can increase the risk of herniation.`
        },
        {
          h2: "What Are the Treatment Options?",
          content: `Treatment options vary depending on the severity of the condition and the patient’s lifestyle. Most mild to moderate herniations can be managed with medication, physical therapy, and special exercise programs. In severe cases or when nerve compression is advanced, advanced surgical methods may be applied. With modern medical techniques, cervical disc herniation surgeries are performed with high success rates.`
        },
        {
          h2: "Should We Be Afraid of Cervical Disc Herniation?",
          content: `Remember, cervical disc herniation is not always something to be feared. With early diagnosis, regular medical check-ups, and appropriate treatment methods, most patients can return to their normal lives, manage their pain, and maintain their freedom of movement. You can protect your neck health with regular posture checks, an ergonomic working environment, and conscious exercise.`
        }
      ],
      tags: ['Cervical Disc Herniation', 'Cervical Disc', 'ACDF', 'Artificial Disc', 'Spine Surgery'],
    },
    'cocuklarda-kalca-cikigini-nasil-anlariz': {
      slug: 'cocuklarda-kalca-cikigini-nasil-anlariz',
      title: 'How Can We Recognize Hip Dislocation in Children?',
      img: '/images/saglik/cocuk.avif',
      date: 'September 20, 2024',
      readTime: '5 min read',
      category: 'Pediatric Orthopedics',
      desc: "Hip dislocation is usually a congenital condition and is directly related to joint development.",
      intro: `How Can We Recognize Hip Dislocation in Children? 

Have you noticed asymmetry in your baby’s hip area after birth? Differences in leg length, the baby being unable to open one leg as much as the other, or limited movement in the hip may be early signs of hip dislocation in children. Hip dislocation is usually a congenital condition and is directly related to joint development. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis, because when detected early, hip dislocation can be easily corrected with simple methods and normal development can be ensured.`,
      sections: [
        {
          h2: "What Are the Symptoms of Hip Dislocation?",
          content: `Hip dislocation is usually noticed during birth or in the first months. Symptoms include differences in leg length, lack of symmetry around the hips, difficulty in opening the baby’s legs, or movement accompanied by a “click” sound.`
        },
        {
          h2: "What Causes Hip Dislocation?",
          content: `Many factors may play a role in the development of hip dislocation. Genetic predisposition, the baby being in a breech position in the womb, or certain birth complications can increase the risk. It is also more likely to be seen in premature babies or in children with a family history of hip dislocation.`
        },
        {
          h2: "What Is the Treatment Process?",
          content: `Treatment varies depending on the severity of the dislocation and the child’s age. In mild cases, Pavlik harness or special hip casts are used; these keep the hip joint in the correct position and support joint development. Treatment usually lasts from a few weeks to several months and requires regular follow-up. In more advanced cases or when sufficient correction cannot be achieved with conservative methods, surgical intervention may be necessary.`
        },
        {
          h2: "Surgical Treatment and Aftercare",
          content: `During surgery, the hip joint is repositioned correctly and stabilized; in some cases, intervention on the pelvic bone and femur may be required. Thanks to modern surgical techniques, operations are performed safely with high success rates, allowing the child to continue normal development. After surgery, the hip is usually protected with special casts or supportive devices, and mobility is improved through physical therapy.`
        },
        {
          h2: "Follow-up and Importance",
          content: `With regular check-ups, specialist guidance, and appropriate treatment methods, you can safely support your child’s ability to walk healthily and ensure normal development.`
        }
      ],
      tags: ['Hip Dislocation', 'DDH', 'Pediatric Orthopedics', 'Pavlik Harness', 'Infant Hip Dysplasia'],
    },
    'skolyoz-egzersizleri': {
      slug: 'skolyoz-egzersizleri',
      title: 'Scoliosis Exercises: Movements That Support the Spine',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: 'March 28, 2025',
      readTime: '8 min read',
      category: 'Scoliosis',
      desc: 'The right exercises in scoliosis strengthen spinal muscles, may slow the progression of the curve, and improve quality of life. Which exercises help — and which should be avoided?',
      intro: `A scoliosis diagnosis does not mean you should stop moving. Quite the opposite — when done correctly, exercises can strengthen the muscles around the spine, slow the progression of the curve, reduce pain, and noticeably improve posture.\n\nHowever, not every exercise suits every patient. The type, degree, and location of the curve — as well as the patient's age — directly determine which movements are beneficial and which may be harmful. For this reason, any exercise programme must be designed under the supervision of an orthopaedic specialist or physiotherapist.\n\nProf. Dr. Nurullah Ermiş considers exercise an integral part of treatment for his patients with scoliosis. In this guide you will find evidence-based approaches, important precautions, and answers to frequently asked questions.`,
      sections: [
        {
          h2: 'Why Exercise Matters in Scoliosis',
          content: `The muscles surrounding the spine — particularly the paraspinal muscles, abdominal muscles, and hip stabilisers — are the active supports that keep the spine upright. When these muscles weaken, the load on the curve increases and its progression becomes easier.\n\nEvidence-based benefits of exercise therapy include:\n\n• Strengthening spinal muscles and providing active support to the spine\n• Potentially slowing curve progression in growing children\n• Increasing postural awareness and improving daily habits\n• Reducing pain and muscle fatigue\n• Supporting respiratory capacity (especially in thoracic curves)\n• Accelerating recovery after surgery\n\nImportant: Exercise does not replace bracing or surgical treatment. Depending on the severity of the curve, these approaches are used in combination.`
        },
        {
          h2: 'Key Exercise Approaches in Scoliosis',
          content: `Several methods are prominent in both scientific literature and clinical practice:\n\nSchroth Method\nThis three-dimensional breathing and postural re-education method, developed in Germany, is one of the most extensively researched exercise approaches for scoliosis. It is based on the principle of actively realigning the spine through rotation and elongation. Learning from a trained physiotherapist is strongly recommended.\n\nSEAS (Scientific Exercise Approach to Scoliosis)\nThis Italian approach is built around active self-correction exercises the patient can perform independently. Combining it with brace treatment has shown promising results.\n\nCore Stabilisation Exercises\nExercises targeting the deep abdominal muscles (transversus abdominis) and multifidus support the dynamic balance of the spine. Pilates-based movements fall into this category.\n\nBreathing Exercises\nDiaphragmatic and directional breathing exercises are important for preserving respiratory capacity, particularly in thoracic (chest-region) scoliosis.`
        },
        {
          h2: 'Supportive Movements You Can Do at Home',
          content: `The following movements support general spinal health; however, your personal exercise programme should always be determined by a specialist:\n\nCat-Cow\nIn a hands-and-knees position, slowly arch and round the back alternately. Increases spinal flexibility and reduces muscle tension.\n\nBird-Dog\nFrom hands-and-knees, slowly extend the opposite arm and leg. Strengthens core muscles and improves balance coordination.\n\nModified Side Plank\nA side plank performed from the knees rather than the feet; strengthens lateral stabilisers and provides support in lateral curves.\n\nScapular Retraction\nDrawing the shoulder blades back and downward; strengthens the upper back muscles and corrects rounded-shoulder posture.\n\nPelvic Tilt\nLying on the back, gently press the lower back into the floor and release; mobilises the lumbar region and activates the abdominal muscles.\n\nNote: These movements are for general information purposes. Depending on the direction and location of the curve, some exercises may not be appropriate for a given patient.`
        },
        {
          h2: 'Situations to Approach with Caution',
          content: `Certain activities and exercises require careful consideration in patients with scoliosis:\n\n• Heavy free-weight exercises: Can place excessive load on the spine if form is compromised\n• High-impact activities: During periods of active curve progression, running or jumping intensity may need to be reduced\n• Asymmetric load-bearing: Carrying a heavy bag on a single shoulder can worsen spinal asymmetry\n• Pain-inducing movements: If pain, numbness, or breathlessness occurs during any exercise, stop immediately and consult a specialist\n\nNote: In mild curves (below 20°), swimming, walking, Pilates, and yoga can generally be performed safely. For curves between 20–45°, the programme should be designed with a physiotherapist.`
        },
        {
          h2: 'When Should an Exercise Programme Begin?',
          content: `The earlier exercise begins after a scoliosis diagnosis, the more beneficial it is. In growing children and adolescents — particularly those with a Cobb angle between 20–45° — regular exercise combined with bracing where necessary can help keep the curve under control without the need for surgery.\n\nAfter surgery, the exercise programme typically begins 4–6 weeks post-operatively under physiotherapy supervision, with progress advanced step by step under the surgeon's approval.\n\nEvery patient's situation is different. Always consult a specialist before starting your exercise programme.`
        },
      ],
      tags: ['Scoliosis', 'Scoliosis Exercises', 'Schroth', 'Core Exercise', 'Spine Health', 'Posture'],
    },
    'acl-cop-bag-ameliyati': {
      slug: 'acl-cop-bag-ameliyati',
      title: 'Be Careful with Sports Injuries! ',
      img: '/images/saglik/on-capraz.avif',
      date: 'August 3, 2024',
      readTime: '7 min read',
      category: 'Arthroscopic Surgery',
      desc: "Sports injuries are damages that occur in muscles, tendons, ligaments, and joints, and are commonly seen among both amateur and professional athletes.",
      intro: `Be Careful with Sports Injuries! 

      Do you feel pain, swelling, or limited movement in your joints, muscles, or bones during sports activities or sudden movements in daily life? These may seem like simple strains, but they could be the first signs of sports injuries. 
      Sports injuries are damages that occur in muscles, tendons, ligaments, and joints, and are commonly seen among both amateur and professional athletes. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis and proper intervention in sports injuries.`,
      sections: [
        {
          h2: "Common Sports Injuries and Symptoms",
          content: `Common sports injuries include sprains, muscle strains, tendon inflammations, meniscus injuries, and bone fractures. Symptoms are usually pain, swelling, bruising, limited joint movement, or sensitivity to pressure. When these symptoms occur, it is important to consult an orthopedic specialist without delay.`
        },
        {
          h2: "Causes of Sports Injuries",
          content: `Many factors play a role in the development of sports injuries. Improper warm-up, incorrect technique, overloading, or the use of inappropriate equipment can increase the risk. Additionally, personal factors, genetic predisposition, and previous injuries also affect the process.`
        },
        {
          h2: "Treatment Options and Surgical Needs",
          content: `Treatment options vary depending on the type and severity of the injury. In mild cases, rest, physical therapy, exercise, and pain management are sufficient; however, in some cases, surgical intervention may be required. Surgery is generally preferred in the following situations:\n\n• When bone fractures or joint dislocations occur \n• In serious joint injuries such as meniscus tears and ligament ruptures \n• In tendon ruptures or chronic, non-healing injuries \n• When there is no response to conservative (non-surgical) treatment or when pain and loss of function persist`
        },
        {
          h2: "Recovery Process and Prevention",
          content: `Thanks to modern orthopedic surgical techniques, operations are performed with high success rates and the return-to-sport time is minimized. With early diagnosis, proper treatment, and appropriate rehabilitation, most injuries can fully heal. Regular warm-ups, correct techniques, appropriate equipment use, and conscious exercise reduce your risk of injury and help you maintain a healthy sports life.`
        }
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

export function getAllTranslatedLocalArticles(language?: string) {
  const lang = getCurrentLanguage(language);
  return Object.values(localArticleTranslations[lang]);
}

export function getDefaultLocalArticles() {
  return getAllTranslatedLocalArticles('tr');
}
