'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, ArrowDown, CheckCircle2, AlertTriangle, HelpCircle, Clock, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";

const TREATMENTS_DATA = [
  {
    id: 1,
    title: "Skolyoz & Kifoz Cerrahisi",
    img: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "VBT Cobb açısı", val: "40–65°" }, { label: "Hastane süresi", val: "3–5 gün" }, { label: "Düzeltme başarısı", val: "%85+" }],
    desc: [
      "Skolyoz, omurganın öne-arkadan bakıldığında sağa ya da sola 10 derecenin üzerinde anormal biçimde eğrilmesidir. Kifoz ise omurganın öne doğru aşırı kamburlaşmasıdır; halk arasında \"kambur sırt\" olarak bilinir. Her iki durum da erken teşhis edilmediğinde zamanla ilerleyerek akciğer kapasitesini azaltır, kronik ağrıya ve ciddi hareket kısıtlılığına yol açar.",
      "Skolyoz en sık 10–16 yaş arasındaki büyüme çağı çocuklarında (adölesan idiyopatik skolyoz) görülmekle birlikte yetişkinlerde de dejeneratif form olarak ortaya çıkabilir. Türkiye'de her 100 çocuktan 2–3'ünde anlamlı omurga eğriliği saptanmaktadır.",
      "Prof. Dr. M. Nurullah Ermiş, skolyoz ve kifoz cerrahisinde Vertebral Body Tethering (VBT) dahil tüm güncel minimal invaziv ve açık cerrahi teknikleri uygulamaktadır. Özellikle büyüme potansiyeli olan adölesan hastalarda VBT, omurgayı füzyon yapmaksızın kademeli olarak düzelten \"büyüme dostu\" bir yöntemdir.",
    ],
    symptoms: [
      "Sırtta veya belde gözle görülür asimetri ve eğrilik",
      "Omuzların ya da kalçaların farklı yüksekliklerde durması",
      "Öne eğilince sırtta belirgin kabarma (jilet sırtı)",
      "Uzun süre ayakta durmakta ve yürümekte güçlük",
      "İlerleyen eğrilikle birlikte sırt ve bel ağrısı",
      "Ağır vakalarda nefes darlığı ve çabuk yorulma",
    ],
    treatment: [
      { baslik: "VBT (Vertebral Body Tethering)", icerik: "Büyüme potansiyeli olan 10–16 yaş hastalarında, Cobb açısı 40–65° arasında iken uygulanır. Torakoskopik (kapalı) yöntemle vertebralara vidalar yerleştirilir ve esnek bir bant gerilir. Hasta büyüdükçe bant omurgayı kademeli olarak düzeltir; füzyon gerekmez, hareket kabiliyeti tamamen korunur." },
      { baslik: "Posterior Spinal Füzyon (PSF)", icerik: "Büyümesini tamamlamış veya 65° üzeri eğrilikli hastalarda uygulanır. Nöromonitör eşliğinde 3 boyutlu navigasyon ile vida-çubuk sistemi yerleştirilerek kalıcı düzeltme sağlanır. Ameliyat sonrası hastalar genellikle 3–5 günde taburcu olur ve 3–6 ay içinde normal yaşamına döner." },
    ],
    faq: [
      { s: "Skolyoz ameliyatı olmadan geçer mi?", c: "25° altındaki hafif eğrilikler büyüme tamamlandıktan sonra duraksayabilir. 25–45° arası vakalarda korse ilerlemeyi yavaşlatır. Ancak 45° üzerindeki eğrilikler büyümeyle hızlanmaya devam ettiğinden cerrahi tek kalıcı çözümdür." },
      { s: "Skolyoz ameliyatından sonra spora dönülebilir mi?", c: "VBT sonrası 6–9 ayda, füzyon sonrası ise 12–18 ayda kademeli spora dönüş sağlanır. Yüzme ve bisiklet en erken başlanabilen sporlardır." },
      { s: "Skolyoz ameliyatı kaç yaşında yapılır?", c: "VBT genellikle büyüme plakaları açık olan 10–16 yaş arasında uygulanır. Füzyon ameliyatı her yaşta yapılabilir; yetişkin skolyozunda da etkili sonuçlar elde edilmektedir." },
    ],
  },
  {
    id: 2,
    title: "Bel Fıtığı Tedavisi",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "Cerrahi kesi boyutu", val: "1.5 cm" }, { label: "Operasyon süresi", val: "45–60 dk" }, { label: "Yürüme zamanı", val: "Aynı gün" }],
    desc: [
      "Bel fıtığı (lomber disk hernisi), omurlar arasındaki disk yastıklarının dışa taşarak çevre sinir köklerine ya da omurilik kanalına baskı yapmasıyla oluşur. En sık L4–L5 ve L5–S1 seviyelerinde görülür. Bacağa vuran şiddetli ağrı (siyatik), uyuşukluk ve kas güçsüzlüğü en tipik belirtileridir.",
      "Türkiye'de aktif nüfusun yaklaşık %10'u yaşamlarının bir döneminde anlamlı bel fıtığı ağrısı yaşamaktadır. Uzun süreli oturma, yanlış kaldırma teknikleri ve hareketsiz yaşam en önemli risk faktörleridir.",
      "Prof. Dr. Ermiş, bel fıtığı ameliyatlarını ameliyat mikroskobu altında yalnızca 1.5 cm'lik kesiden uygulayarak hastanın aynı gün ayağa kalkmasını ve çoğunlukla ertesi gün taburcu olmasını sağlamaktadır.",
    ],
    symptoms: [
      "Belden kalça, uyluk, diz ve ayak tabanına yayılan siyatik ağrısı",
      "Ayak veya parmaklarda his kaybı ve uyuşukluk",
      "Ayak bileğini yukarı kaldıramama (düşük ayak — acil cerrahi gerektirir)",
      "Uzun süre oturamama, araba kullanmada güçlük",
      "Geceleri uyandıran ağrı nöbetleri",
      "İdrar veya bağırsak kontrolünde ani güçlük (kauda equina — acil!)",
    ],
    treatment: [
      { baslik: "Mikrodiskektomi", icerik: "Genel anestezi altında yaklaşık 45–60 dakikada tamamlanan operasyonda, yalnızca 1.5 cm'lik kesi yoluyla ameliyat mikroskobu altında sinire baskı yapan disk parçası hassasiyetle çıkarılır. Sağlıklı disk dokusu ve kaslar korunur; hasta ameliyat günü 4–6 saat içinde yürür, ertesi gün taburcu edilir." },
      { baslik: "Endoskopik Diskektomi", icerik: "Geleneksel mikrocerrahiden bile daha küçük kesilerle (7 mm) endoskop eşliğinde uygulanan bu yöntemde kas hasarı minimuma iner. Özellikle obez hastalar ve tekrar ameliyat gerektiren olgularda avantaj sağlar. Hasta aynı gün taburcu edilebilir." },
      { baslik: "Ne zaman ameliyat gerekli?", icerik: "Belirtiler 6 haftadan uzun sürüyorsa, günlük yaşamı kısıtlayan ağrı varsa ya da nörolojik tablo (kuvvet kaybı, his bozukluğu) gelişiyorsa cerrahi öncelikli seçenektir. 6 haftadan kısa, nörolojik bulgu yoksa fizik tedavi ve ağrı yönetimiyle takip önerilir." },
    ],
    faq: [
      { s: "Bel fıtığı ameliyat olmadan iyileşir mi?", c: "Hafif vakaların %70–80'i 6–12 haftada kendiliğinden iyileşebilir. Ancak kauda equina sendromu veya ilerleyen sinir hasarı durumunda acil cerrahi zorunludur." },
      { s: "Bel fıtığı ameliyatı sonrası ne zaman işe dönülür?", c: "Masa başı işlerde 1–2 hafta, fiziksel işlerde 4–6 hafta sonra iş hayatına dönüş mümkündür. Ağır kaldırmaktan en az 3 ay kaçınılmalıdır." },
      { s: "Bel fıtığı ameliyatı sonrası tekrar fıtık oluşur mu?", c: "Her 100 hastanın yaklaşık 5–8'inde aynı seviyede tekrar fıtık görülebilir. Kilo kontrolü, core egzersizleri ve doğru kaldırma teknikleri riski belirgin azaltır." },
      { s: "Bel fıtığı ağrısı ne zaman geçer?", c: "Mikrocerrahi sonrası siyatik ağrısının büyük bölümü ilk günlerde geriler. Sinirin tam iyileşmesi 3–6 ay sürebilir." },
    ],
  },
  {
    id: 3,
    title: "Boyun Fıtığı Cerrahisi",
    img: "https://images.unsplash.com/photo-1582560469715-d72b220bc0a6?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "Cerrahi kesi", val: "~3 cm" }, { label: "Hastane süresi", val: "1–2 gün" }, { label: "İşe dönüş", val: "2–4 hafta" }],
    desc: [
      "Boyun fıtığı (servikal disk hernisi), boyun omurları arasındaki disk yastıklarının taşarak kola giden sinir köklerine ya da doğrudan omuriliğe baskı yapmasıyla oluşur. En sık C5–C6 ve C6–C7 seviyeleri etkilenir. Kolda ağrı, uyuşukluk ve güçsüzlük tipik belirtilerdir.",
      "Uzun süreli bilgisayar kullanımı, öne eğik baş pozisyonu ve hareketsiz ofis hayatı boyun fıtığı riskini artırır. Omurilik basısı yapan ileri vakalarda (servikal miyelopati) yürüme bozukluğu ve denge sorunları ortaya çıkabilir; bu durum acil değerlendirme gerektirir.",
      "Prof. Dr. Ermiş, boyun fıtığı cerrahisini boynun ön tarafından yapılan estetik bir kesiyle, ameliyat mikroskobu altında uygulayarak sorunlu diski temizlemekte ve yerine titanyum kafes (cage) ya da yapay disk yerleştirmektedir.",
    ],
    symptoms: [
      "Omuzdan kola, ön kola ve parmak uçlarına yayılan ağrı",
      "Parmaklarda karıncalanma, uyuşukluk ve kavrama güçsüzlüğü",
      "Düğme ilikleme veya kalem tutma gibi ince hareketlerde güçlük",
      "Boyun hareketlerinde ciddi kısıtlılık ve ense sertliği",
      "Bacaklarda denge sorunu veya yürüme güçlüğü (omurilik basısı işareti)",
    ],
    treatment: [
      { baslik: "ACDF — Anterior Servikal Diskektomi ve Füzyon", icerik: "Boynun ön-yan tarafından yaklaşık 3 cm'lik estetik kesiyle, ameliyat mikroskobu altında sorunlu disk tamamen çıkarılır. Yerine titanyum veya PEEK kafes (cage) yerleştirilerek disk yüksekliği korunur ve kaynak (füzyon) sağlanır. En sık uygulanan ve klinik sonuçları kanıtlanmış yöntemdir." },
      { baslik: "TDR — Total Disk Replasmanı (Yapay Disk)", icerik: "Özellikle tek seviye fıtıklarda ve aktif, genç hastalarda tercih edilir. Diskektomi sonrası kafes yerine hareketli yapay disk yerleştirilerek boyun hareketi korunur. Komşu seviyelere binen yük azalır; uzun vadede ek seviye sorunları riski düşer." },
    ],
    faq: [
      { s: "Boyun fıtığı egzersizle geçer mi?", c: "Hafif vakalarda boyun egzersizleri ve fizik tedavi ağrıyı azaltabilir. Ancak kola yayılan ağrı, güçsüzlük veya omurilik basısı bulguları varsa egzersiz tek başına yeterli olmaz ve uzman değerlendirmesi gereklidir." },
      { s: "Boyun ameliyatı tehlikeli midir?", c: "Deneyimli ellerde ACDF komplikasyon oranı çok düşüktür. Ses kısıklığı %2–5 oranında ve geçici olarak görülebilir. Yüksek riskli unsur bırakmak, tedavi etmekten genellikle daha tehlikelidir." },
      { s: "Kafes mi yapay disk mi daha iyi?", c: "Karar; hastanın yaşına, aktivite düzeyine, etkilenen seviye sayısına ve kemik kalitesine göre verilir. Her iki yöntemin de kanıtlanmış uzun dönem sonuçları mevcuttur." },
      { s: "Boyun ameliyatı sonrası boyunluk takılır mı?", c: "Ağır olgularda 2–4 hafta, hafif olgularda ise yalnızca birkaç gün boyunluk önerilir. Hareketsizlik süresini uzatmamak iyileşmeyi hızlandırır." },
    ],
  },
  {
    id: 4,
    title: "Diz & Kalça Protezi",
    img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "Yürüme zamanı", val: "Ertesi gün" }, { label: "Taburculuk", val: "2–3. gün" }, { label: "Protez ömrü", val: "20–25 yıl" }],
    desc: [
      "Diz ve kalça protezi, ileri evre kireçlenme (osteoartrit) veya romatoid artrit nedeniyle tahrip olmuş eklem yüzeylerinin biyouyumlu metal ve plastik implantlarla değiştirilmesi işlemidir. Ameliyat sonrası hastaların büyük çoğunluğu ağrısız bir hayata kavuşmakta ve ertesi gün yürümeye başlamaktadır.",
      "Son yıllarda robotik cerrahi ve bilgisayar destekli navigasyon sistemlerinin kullanıma girmesiyle implant yerleşim hassasiyeti artmış, bacak ekseni uyumu iyileşmiş ve uzun dönem protez ömrü uzamıştır.",
      "Prof. Dr. Ermiş, hem robotik destekli hem de gelişmiş navigasyon sistemleri eşliğinde total diz ve kalça protezi operasyonları gerçekleştirmektedir. Kalça protezinde minimal invaziv ön yaklaşım (anterior approach) uygulandığında kaslar kesilmez; iyileşme hızlanır ve çıkık riski azalır.",
    ],
    symptoms: [
      "Merdiven inip çıkmada ve uzun yürüyüşlerde dayanılmaz ağrı",
      "Eklemin sabah sertleşmesi ve ilk adımlarda tutukluk",
      "Eklem hareket açıklığında belirgin azalma",
      "Geceleri uyandıran kronik ağrı",
      "Ağrı kesicilerin artık yeterince işe yaramaması",
      "Bastonla yürüme ihtiyacı ve günlük yaşamda ciddi kısıtlılık",
    ],
    treatment: [
      { baslik: "Robotik Destekli Total Diz Protezi", icerik: "Ameliyat öncesi hazırlanan 3 boyutlu kemik modeli üzerinde implant pozisyonu milimetrik hassasiyetle planlanır. Ameliyat sırasında robot, belirlenen sınırlar dışına çıkılmasını engelleyerek bacak ekseninin mükemmel biçimde düzeltilmesini sağlar. Geleneksel tekniğe kıyasla implant hizalama hatası belirgin azalır." },
      { baslik: "Total Kalça Protezi (Anterior Yaklaşım)", icerik: "Minimal invaziv ön yaklaşımda kaslar kesilmez, yalnızca aralarından geçilir. Bu sayede ameliyat sonrası ağrı azalır, çıkık riski düşer ve hasta ertesi gün yürümeye başlar. Asetabulum (kase) ve femur başı değiştirilerek tam hareket açıklığı yeniden sağlanır." },
    ],
    faq: [
      { s: "Diz protezi ömrü ne kadar?", c: "Modern implantların %90–95'i 20–25 yıl sorunsuz çalışmaktadır. Aşırı kilo, yüksek darbeli sporlar ve sigara implant ömrünü olumsuz etkiler." },
      { s: "Diz protezi sonrası merdiven çıkılabilir mi?", c: "Evet. Rehabilitasyon tamamlandıktan sonra merdiven inip çıkmak, araba kullanmak ve günlük yaşam aktivitelerinin tamamı mümkündür." },
      { s: "Kalça protezi çıkar mı?", c: "Anterior yaklaşım ve doğru implant seçimiyle çıkık riski %1'in altına iner. İlk 6 haftada önerilen pozisyon kısıtlamalarına uymak bu riski daha da azaltır." },
      { s: "Kaç yaşında protez ameliyatı yapılır?", c: "Yaştan çok eklemdeki hasarın derecesi ve yaşam kalitesine etkisi belirleyicidir. 50'li yaşlardan itibaren yapılabilmekle birlikte, her hasta kendi koşullarında değerlendirilir." },
    ],
  },
  {
    id: 5,
    title: "Çocuk Ortopedisi",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "GKD erken başarı", val: "%95" }, { label: "Boy uzatma hızı", val: "1 mm/gün" }, { label: "Tedavi yaş aralığı", val: "0–18 yaş" }],
    desc: [
      "Çocuk ortopedisi, kemik-iskelet sisteminin doğumsal veya gelişimsel bozukluklarını inceleyen ve tedavi eden özel bir uzmanlık alanıdır. Erken tanı ve uygun müdahale, çocukların ilerleyen yaşlarda sağlıklı ve aktif bir yaşam sürmesi açısından kritik öneme sahiptir.",
      "Gelişimsel Kalça Displazisi (GKD), çarpık ayak (pes ekinovarus), omurga eğriliği, büyüme bozuklukları ve doğumsal kemik deformiteleri çocuk ortopedisinin başlıca tedavi alanlarını oluşturmaktadır.",
      "Prof. Dr. Ermiş'in çocuk ortopedisi pratiği; GKD, çarpık ayak (Ponseti yöntemi), büyüme çağı skolyozu, boy uzatma cerrahisi (İlizarov, Taylor Spatial Frame, PRECICE çivi) ve çocukluk çağı kırık tedavisini kapsamaktadır.",
    ],
    symptoms: [
      "Bebekte bacak kıvrımlarında asimetri veya bacak kısalığı",
      "Çocuğun yürüyüşünde topallama ya da geniş adımlı yürüyüş",
      "Ayakların içe veya dışa dönük durması",
      "Bacaklarda eşitsiz uzunluk",
      "Omurga eğriliği (özellikle ergenlikte hız kazanan skolyoz)",
      "Boy gelişiminde belirgin yavaşlama veya duraksama",
    ],
    treatment: [
      { baslik: "Gelişimsel Kalça Displazisi (GKD)", icerik: "0–6 aylık bebeklerde Pavlik bandajı ile %90'ın üzerinde başarı elde edilir. 6–18 aylık dönemde kapalı redüksiyon ve spika alçı uygulanır. 18 ay üzerinde ise açık cerrahi redüksiyon gereklidir. Erken tanı tedaviyi dramatik biçimde kolaylaştırır; bu nedenle tüm bebeklere doğumdan sonra kalça ultrasonografisi önerilmektedir." },
      { baslik: "Çarpık Ayak — Ponseti Yöntemi", icerik: "Doğumdan itibaren uygulanan seri alçılama ile ayak kademeli olarak düzgün pozisyona getirilir. Ardından minimal cerrahi (perkutan Aşil tendonu uzatma) ve özel ortez kullanımı sürdürülür. Yönteme uyulduğunda vakaların %90'ından fazlası ameliyatsız tedavi edilebilir." },
      { baslik: "Boy Uzatma Cerrahisi", icerik: "İlizarov veya Taylor Spatial Frame (TSF) eksternal fiksatör ya da PRECICE manyetik çivi ile kontrollü kemik uzatması sağlanır. Uzatma hızı günde 1 mm olup istenilen uzunluğa ulaşıldıktan sonra kemik konsolidasyonu beklenir. Her 1 cm uzatma için yaklaşık 1 ay uzatma + 1 ay konsolidasyon süresi hesaplanır." },
    ],
    faq: [
      { s: "Kalça çıkığı nasıl anlaşılır?", c: "Doğumdan sonraki ilk 4–6 hafta içinde kalça ultrasonografisi önerilir. Asimetrik bacak kıvrımları, bir bacağın daha kısa görünmesi veya kalçayı açmada direnç muayenede fark edilebilir." },
      { s: "Çarpık ayak ameliyatsız tedavi edilebilir mi?", c: "Ponseti yöntemi uygulandığında vakaların %90'ında ameliyatsız başarı elde edilir. Yalnızca Aşil tendonu uzatması küçük bir prosedür olarak gerekebilir." },
      { s: "Boy uzatma ameliyatı ne kadar sürer?", c: "Uzatma süreci istenilen uzunluğa bağlıdır. Her 1 cm için yaklaşık 2 ay (1 ay uzatma + 1 ay konsolidasyon) hesaplanır." },
      { s: "Çocuklarda skolyoz ne zaman ameliyat gerektirir?", c: "Cobb açısı 45° üzerine çıktığında, büyüme devam ediyorsa ve korse yetersiz kalıyorsa cerrahi önerilir. VBT ile büyüme çağında füzyonsuz düzeltme mümkündür." },
    ],
  },
  {
    id: 6,
    title: "Artroskopik Cerrahi",
    img: "https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2600&auto=format&fit=crop",
    stats: [{ label: "Kesi sayısı", val: "2 adet" }, { label: "Hastane süresi", val: "1–2 gün" }, { label: "ACL'de spora dönüş", val: "6–9 ay" }],
    desc: [
      "Artroskopi, eklem içine milimetrik kesilerden yerleştirilen kamera ve cerrahi aletler aracılığıyla hem tanı hem de tedavi amacıyla uygulanan minimal invaziv bir yöntemdir. Diz, omuz, kalça ve dirsek eklemlerinde uygulanabilen artroskopi; açık cerrahiye kıyasla çok daha kısa iyileşme süresi, daha az ağrı ve neredeyse görünmez kesi izi avantajı sunar.",
      "Menisküs yırtıkları ve ön çapraz bağ (ACL) kopmaları artroskopinin en sık kullanıldığı durumlardır. Sporcularda ve aktif bireylerde spor hasarları sonrası uygulanan artroskopik cerrahi, büyük çoğunluğunun eski performansına dönmesini sağlamaktadır.",
    ],
    symptoms: [
      "Diz içinde ani tıklama, kilitlenme veya boşalma hissi",
      "Yürürken, merdivenlerden inerken dize keskin ağrı",
      "Spor sırasında dizde güvensizlik ve instabilite",
      "Omuzda takılma, sıkışma ve kol kaldırmada ağrı",
      "Travma sonrası hızla gelişen eklem şişliği",
    ],
    treatment: [
      { baslik: "Menisküs Cerrahisi (Tamirat veya Parsiyel Çıkarma)", icerik: "Yırtığın şekli ve yerine göre menisküs dokusu ya dikilir (tamirat) ya da yırtık parça çıkarılır (parsiyel menisektomi). Tamirat öncelikli seçenektir; çünkü menisküs kıkırdağı korur ve ilerleyen kireçlenmeyi önler. Periferik yırtıklar tamirata daha uygundur." },
      { baslik: "Ön Çapraz Bağ (ACL) Rekonstrüksiyonu", icerik: "Kopan bağ, hamstring tendonu veya patellar tendondan alınan greft ile artroskopik teknikle yeniden oluşturulur. Greft seçimi hastanın yaşına, aktivite düzeyine ve anatomik özelliklerine göre yapılır. Doğru rehabilitasyon protokolü ile sporcularda 6–9 ayda spora dönüş sağlanır." },
      { baslik: "Omuz Artroskopisi", icerik: "Rotator manşet yırtıkları, SLAP lezyonları ve tekrarlayan omuz çıkıklarında artroskopik tamirat ve stabilizasyon uygulanır. Açık cerrahiye kıyasla iyileşme süreci çok daha hızlıdır." },
    ],
    faq: [
      { s: "Menisküs ameliyatı olmadan iyileşir mi?", c: "Küçük, periferik yırtıklar kendiliğinden iyileşebilir. Ancak kilitlenme yapan, ağrıyı sürdüren ve hareket açıklığını kısıtlayan yırtıklar artroskopik tedaviden fayda görür." },
      { s: "Çapraz bağ ameliyatı sonrası futbol oynanabilir mi?", c: "Evet. Uygun rehabilitasyon ve spesifik dönüş testleri tamamlandıktan sonra çoğu sporcu eski performansına ulaşabilir." },
      { s: "Menisküs ameliyatı sonrası ne zaman yürünür?", c: "Tamirat yapıldıysa 4–6 hafta koltuk değneği kullanılır. Parsiyel çıkarmada ise hasta genellikle ertesi gün tam yük verebilir." },
      { s: "Artroskopi genel anestezi mi?", c: "Çoğunlukla spinal veya genel anestezi altında yapılır. Küçük prosedürlerde lokal anestezi ve sedasyon da yeterli olabilir." },
    ],
  },
];

function TedavilerContent() {
  const searchParams = useSearchParams();
  const idFromParam = searchParams.get('id');
  const [activeId, setActiveId] = React.useState(idFromParam ? parseInt(idFromParam) : 1);
  const activeData = TREATMENTS_DATA.find(t => t.id === activeId) || TREATMENTS_DATA[0];

  React.useEffect(() => {
    if (idFromParam) setActiveId(parseInt(idFromParam));
  }, [idFromParam]);

  const handleScrollToContent = (id: number) => {
    setActiveId(id);
    if (window.innerWidth < 768) {
      const el = document.getElementById("treatment-content-area");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">

        <FadeIn direction="up">
          <div className="mb-14 text-center">
            <p className="text-blue-600 font-bold uppercase tracking-[0.18em] text-xs mb-3">Tedavi Alanları</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Uzmanlık Alanları & Tedaviler</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Prof. Dr. M. Nurullah Ermiş'in <strong className="text-slate-900">ortopedi, omurga cerrahisi ve çocuk ortopedisi</strong> alanlarındaki tedavi yöntemleri hakkında kapsamlı bilgi edinin.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-10 relative">

          {/* Sidebar */}
          <FadeIn direction="right" delay={0.2} className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-28 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col space-y-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4 pr-4 py-3 border-b mb-2">Tüm Tedaviler</h4>
              {TREATMENTS_DATA.map((t) => (
                <button key={t.id} onClick={() => handleScrollToContent(t.id)}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all font-semibold text-sm group ${t.id === activeId ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 translate-x-1' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}>
                  <span className="leading-snug pr-2">{t.title}</span>
                  <ChevronRight size={18} className={`shrink-0 transition-transform ${t.id === activeId ? 'text-white' : 'text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600'}`} />
                </button>
              ))}
              <div className="md:hidden flex justify-center pt-2 pb-1">
                <span className="text-xs text-slate-400 flex items-center animate-bounce mt-2"><ArrowDown size={12} className="mr-1" /> Aşağı kaydırın</span>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="up" delay={0.3} className="w-full md:w-2/3 lg:w-3/4" id="treatment-content-area">
            <AnimatePresence mode="wait">
              <motion.div key={activeId}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}>

                <div className="overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl bg-white">

                  {/* Hero image */}
                  <div className="h-56 sm:h-72 w-full relative shrink-0">
                    <img src={activeData.img} alt={activeData.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-7">
                      <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Prof. Dr. M. Nurullah Ermiş</p>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white">{activeData.title}</h2>
                    </div>
                  </div>

                  {/* Stats bar */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/60">
                    {activeData.stats.map((s, i) => (
                      <div key={i} className="text-center py-4">
                        <div className="text-lg font-extrabold text-blue-600">{s.val}</div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5 px-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 md:p-12 space-y-10">

                    {/* Hastalık nedir */}
                    <section>
                      <h2 className="text-2xl font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">{activeData.title} Nedir?</h2>
                      <div className="space-y-4">
                        {activeData.desc.map((p, i) => (
                          <p key={i} className="text-slate-600 text-[1.05rem] leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </section>

                    {/* Belirtiler */}
                    <section className="bg-amber-50/60 border border-amber-100 rounded-2xl p-6 md:p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                        Belirtiler — Ne Zaman Doktora Gitmelisiniz?
                      </h3>
                      <ul className="space-y-3">
                        {activeData.symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Tedavi yöntemleri */}
                    <section>
                      <h2 className="text-2xl font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">Tedavi Yöntemleri</h2>
                      <div className="space-y-4">
                        {activeData.treatment.map((t, i) => (
                          <div key={i} className="p-5 bg-blue-50/60 border border-blue-100 rounded-xl">
                            <div className="flex items-start gap-3">
                              <Scissors className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                              <div>
                                <p className="font-bold text-slate-900 mb-2 text-sm">{t.baslik}</p>
                                <p className="text-slate-600 text-sm leading-relaxed">{t.icerik}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* FAQ */}
                    <section>
                      <h2 className="text-2xl font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
                        Sıkça Sorulan Sorular
                      </h2>
                      <div className="space-y-3">
                        {activeData.faq.map((item, i) => (
                          <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                            <div className="flex items-start gap-3 px-5 py-4 bg-slate-50/80">
                              <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                              <p className="font-bold text-slate-900 text-sm leading-snug">{item.s}</p>
                            </div>
                            <div className="px-5 py-4 pl-12">
                              <p className="text-slate-600 text-sm leading-relaxed">{item.c}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-slate-900 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                      <div>
                        <p className="text-white font-bold text-base mb-1">{activeData.title} için randevu alın</p>
                        <p className="text-slate-400 text-sm">Prof. Dr. Ermiş ile uzman değerlendirmesi için hemen iletişime geçin.</p>
                      </div>
                      <a href="/iletisim"
                        className="shrink-0 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 whitespace-nowrap">
                        Randevu Al
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export default function TedavilerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Yükleniyor...</div>}>
      <TedavilerContent />
    </Suspense>
  );
}