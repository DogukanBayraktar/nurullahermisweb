// prisma/seed.ts
// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
// Or add to package.json: "prisma": { "seed": "ts-node prisma/seed.ts" }
// Then run: npx prisma db seed

import { loadEnvConfig } from '@next/env';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { TREATMENTS_DATA, TREATMENTS_TRANSLATIONS } from '../src/lib/treatments';

loadEnvConfig(process.cwd());

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or POSTGRES_PRISMA_URL is required for seeding.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
      intro: 'Bel ağrısı, bacaklara yayılan uyuşma veya güçsüzlük mü yaşıyorsunuz? Bunlar çoğu zaman bel fıtığının belirtileri olabilir. Bel fıtığı, omurga disklerinin yerinden kayarak sinirlere baskı yapmasıyla oluşur ve çoğunlukla 30–50 yaş arasında görülür. Bel fıtığı tedavisinde ilk adım genellikle konservatif yöntemlerdir. Bunlar arasında ilaç tedavisi, fizik tedavi, omurga egzersizleri, yaşam tarzı değişiklikleri ve bel destekleri yer alır. Çoğu hasta bu yöntemlerle ağrısını yönetebilir ve günlük yaşam aktivitelerini sürdürebilir. Ancak bazı durumlarda konservatif tedavi yeterli olmayabilir. Şiddetli ağrı, bacaklarda güç kaybı, idrar veya dışkı kontrolünde sorun gibi belirtiler varsa ameliyat gerekebilir.',
      sections: [
        { h2: 'Bel Fıtığı Ameliyatı Nasıl Yapılır?', content: 'Bel fıtığı ameliyatı, genellikle mikrocerrahi veya endoskopik yöntemlerle yapılır. Cerrahi sırasında fıtıklaşmış disk bölgesi temizlenir ve sinir üzerindeki baskı kaldırılır. Modern tıbbi teknikler sayesinde ameliyatlar yüksek başarı oranıyla gerçekleştirilir ve hastalar genellikle kısa sürede günlük yaşamlarına dönebilir.' },
        { h2: 'Ameliyat Sonrası Süreç', content: 'Mikrocerrahi sonrası siyatik ağrısının büyük kısmı genellikle ilk günlerde geriler, ancak sinirin tam iyileşmesi 3–6 ay sürebilir; bu süreçte hafif karıncalanma hissi normal kabul edilir. İyileşmeyi hızlandırmak için ameliyat sonrası ilk 4–6 haftada ağır kaldırmaktan ve öne eğilmekten kaçınmak, fizyoterapist eşliğinde core egzersizlerine başlamak ve günde 2–3 kez kısa yürüyüşler yapmak çok önemlidir.' },
        { h2: 'Tekrar Fıtık Oluşma Riski', content: 'Ameliyattan sonra tekrar fıtık oluşma riski her 100 operasyondan yaklaşık 5–8\'idir. Bu riskin önüne geçmek için kilo kontrolü, düzenli core egzersizleri ve doğru kaldırma teknikleri büyük önem taşır. Tekrar fıtık oluştuğunda ise mikrodiskektomi veya endoskopik diskektomi yöntemleri başarıyla uygulanabilir.' },
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
      intro: 'Omuzlarınız eşit mi? Aynaya bakarken sırtınızda hafif bir eğrilik fark ettiniz mi? Basit bir duruş bozukluğu sandığınız bu durum, aslında skolyozun ilk işareti olabilir. Skolyoz, omurganın yanlara doğru eğrilmesiyle ortaya çıkan bir rahatsızlıktır ve özellikle çocukluk ve ergenlik döneminde sıkça fark edilir. Çoğu zaman ağrı yapmadığı için fark edilmesi zor olabilir. Prof. Dr. Nurullah Ermiş, her hastalıkta olduğu gibi skolyozda da erken tanının önemine dikkat çekiyor. Düzenli doktor kontrolü, doğru egzersizler ve bazı durumlarda korse tedavisi, sağlıklı bir omurgaya ulaşmayı kolaylaştırıyor. Bu süreçte ailelere büyük görev düşüyor. Çocuklarınızın duruşuna, oturuşuna ve günlük hareketlerine dikkat etmeniz gerekiyor. Özellikle çocuk eğilirken sırtın bir tarafında çıkıntı görülüyorsa, bu belirti ihmal edilmeden uzmana başvurulmalıdır.',
      sections: [
        { h2: 'Skolyozun Nedenleri Nelerdir?', content: 'Skolyozun tek bir nedeni yoktur; birçok faktör rol oynayabilir. Yapılan araştırmalara göre vakaların yaklaşık %80\'inde neden tam olarak belirlenemiyor. Öne çıkan faktörler arasında genetik yatkınlık önemli bir rol oynar ve kız çocuklarında erkeklere oranla daha sık görülür. Ayrıca anne karnında yeterince gelişmemiş omurga yapısı da skolyoza yol açabilir. Yanlış duruş, hatalı oturma ve ağır çantaların tek omuzda taşınması, var olan omurga eğriliğini daha da artırabilir.' },
        { h2: 'Skolyoz Tedavisi ve Ameliyat Süreci', content: 'Skolyoz ameliyatı ise ileri cerrahi deneyim ve teknoloji gerektiren bir operasyondur. Ancak günümüzdeki yöntemlerle ameliyat yüksek oranda başarılı geçmektedir. Ameliyat planı, hastanın yaşı ve eğriliğin derecesi göz önünde bulundurularak yapılır. Operasyonda omurga hizası boyunca açılan kesiye pedikül vida sistemleri yerleştirilir ve bu vidalar arasından metal çubuklar geçirilir.' },
        { h2: 'Skolyozdan Korkmalı Mıyız?', content: 'Unutmayın; skolyoz her zaman korkulacak bir durum değildir. Erken tanı, düzenli kontroller ve doğru tedavi yöntemleriyle çoğu vaka yönetilebilir ve sağlıklı bir omurgaya ulaşmak mümkündür.' },
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
      intro: 'Dizlerinizde sürekli ağrı, şişlik, hareket kısıtlılığı veya günlük yaşam aktivitelerinde zorlanma mı yaşıyorsunuz? Bunlar genellikle ileri derecede eklem hasarının veya diz kireçlenmesinin ilk işaretleri olabilir. Diz protezi ameliyatı, eklem yüzeylerinin aşınması, kireçlenme veya travma sonrası oluşan hasarları düzeltmek için uygulanan güvenli ve etkili bir yöntemdir. Prof. Dr. Nurullah Ermiş, diz protezi ameliyatlarında erken değerlendirmenin tedaviyi büyük oranda kolaylaştırdığını vurguluyor.',
      sections: [
        { h2: 'Diz Protezi Hangi Durumlarda Uygulanır?', content: 'Diz protezi genellikle ileri derecede osteoartrit, romatoid artrit, travmatik eklem hasarı veya önceki cerrahi müdahaleler sonrası dizde ciddi fonksiyon kaybı olan hastalarda uygulanır. Belirtiler arasında sürekli diz ağrısı, merdiven inip çıkmada zorluk, bacaklarda güç kaybı ve eklemde sertlik yer alır.' },
        { h2: 'Diz Protezi Ameliyatı Nasıl Yapılır?', content: 'Diz protezi ameliyatı, hastanın yaşı, genel sağlık durumu ve dizdeki hasarın derecesine göre planlanır. Cerrahide aşınmış veya hasar görmüş eklem yüzeyleri çıkarılır ve yerine metal, seramik veya polietilen malzemelerden oluşan yapay eklem yerleştirilir. Modern cerrahi teknikler ve robotik destekli yöntemler sayesinde operasyonlar yüksek başarı oranıyla gerçekleştirilir.' },
        { h2: 'Robotik Diz Protezi Nedir?', content: 'Robotik diz protezi, geleneksel yöntemlere göre daha hassas ve güvenlidir. Ameliyat öncesinde hastanın kemikleri 3 boyutlu olarak modellenir ve implant pozisyonu bilgisayar ortamında milimetrik hassasiyetle planlanır. Ameliyat sırasında robot, planlanan sınırların dışına çıkılmasını otomatik olarak engeller ve bacak ekseninin mükemmel biçimde düzeltilmesini sağlar.' },
        { h2: 'Diz Protezi Ameliyatı Hangi Durumlarda Tercih Edilir?', content: 'Diz protezi ameliyatı genellikle şu durumlarda tercih edilir:\n\n• İleri derecede osteoartrit veya kireçlenme ile ağrı ve hareket kaybı\n• Romatoid artrit veya diğer eklem hastalıklarında ciddi fonksiyon kaybı\n• Önceki tedavilere yanıt alınamayan kronik diz ağrıları\n• Travmatik eklem hasarı sonrası dizin düzgün çalışmaması' },
        { h2: 'İyileşme Süreci ve Sonuçlar', content: 'Erken değerlendirme, modern cerrahi teknikler ve doğru rehabilitasyon ile hastaların çoğu ağrısız ve aktif bir yaşam sürdürebilir. Düzenli kontroller, uygun tedavi planı ve bilinçli fizik tedavi ile diz sağlığınızı güvenle koruyabilirsiniz.' },
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
      intro: 'Boyun ağrısı, omuzlarda uyuşma veya kolda hissizlik fark ettiniz mi? Bunlar basit bir kas yorgunluğu gibi görünebilir, ancak boyun fıtığının ilk belirtileri olabilir. Boyun fıtığı, omurgadaki disklerin yerinden kayarak sinirlere baskı yapmasıyla ortaya çıkan bir rahatsızlıktır ve genellikle orta yaş ve ileri yaşlarda daha sık görülür. Ancak günümüzde masa başı çalışanlar ve gençlerde de yaygınlaşmıştır. Prof. Dr. Nurullah Ermiş, boyun fıtığında erken tanının önemine dikkat çekiyor.',
      sections: [
        { h2: 'Boyun Fıtığı Belirtileri Nelerdir?', content: 'Boyun fıtığının en sık görülen belirtileri arasında boyun ağrısı, omuz ve kollarda uyuşma veya karıncalanma, kollarda güç kaybı ve baş hareketlerinde kısıtlılık yer alır. Eğer bu belirtilerden biri veya birkaçı varsa, gecikmeden uzmana başvurmak önemlidir.' },
        { h2: 'Boyun Fıtığının Nedenleri Nelerdir?', content: 'Boyun fıtığının oluşumunda birçok faktör rol oynar. Uzun süre yanlış duruşla oturmak, ağır yük taşımak, ani hareketler veya genetik yatkınlık fıtık riskini artırabilir.' },
        { h2: 'Tedavi Seçenekleri Nelerdir?', content: 'Tedavi seçenekleri, hastalığın derecesine ve hastanın yaşam tarzına göre değişir. Çoğu hafif ve orta şiddette fıtık, ilaç tedavisi, fizik tedavi ve özel egzersiz programlarıyla kontrol altına alınabilir. Şiddetli vakalarda veya sinir basısı ileri düzeyde olduğunda, ileri cerrahi yöntemler uygulanabilir.' },
        { h2: 'Boyun Fıtığından Korkmalı Mıyız?', content: 'Unutmayın; boyun fıtığı her zaman korkulacak bir durum değildir. Erken tanı, düzenli doktor kontrolleri ve doğru tedavi yöntemleri ile çoğu hasta normal yaşamına dönebilir. Düzenli duruş kontrolleri, ergonomik çalışma düzeni ve bilinçli egzersizlerle boyun sağlığınızı koruyabilirsiniz.' },
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
      intro: 'Doğum sonrası bebeklerde kalça bölgelerinde asimetri fark ettiniz mi? Bacakların eşit uzunlukta olmaması, bebeğinizin bir bacağını diğerine göre daha az açabilmesi ya da kalçada hareket kısıtlılığı çocuklarda kalça çıkığının ilk işaretleri olabilir. Kalça çıkığı, genellikle doğuştan gelen bir durumdur ve eklem gelişimiyle doğrudan ilgilidir. Prof. Dr. Nurullah Ermiş, erken tanının önemine dikkat çekiyor; çünkü erken fark edilen kalça çıkığı, basit yöntemlerle kolayca düzeltilebilir.',
      sections: [
        { h2: 'Kalça Çıkığı Belirtileri Nelerdir?', content: 'Kalça çıkığı genellikle doğum sırasında veya ilk aylarda fark edilir. Belirtileri arasında bacak boylarında fark, kalça çevresinde simetri eksikliği, bebeğin bacaklarını açarken zorlanma veya "tık" sesiyle hareket etme yer alır.' },
        { h2: 'Kalça Çıkığının Nedenleri Nelerdir?', content: 'Kalça çıkığının oluşumunda birçok faktör rol oynayabilir. Genetik yatkınlık, bebek anne karnında ters pozisyonda olduğunda veya bazı doğum komplikasyonları riski artırabilir. Ayrıca prematüre bebeklerde veya ailede geçmişte kalça çıkığı öyküsü olan çocuklarda görülme olasılığı daha yüksektir.' },
        { h2: 'Tedavi Süreci Nasıldır?', content: 'Tedavi, çıkığın şiddetine ve çocuğun yaşına göre değişir. Hafif olgularda Pavlik bandajı veya özel kalça alçıları kullanılır; bunlar kalça eklemini doğru pozisyonda sabitler ve eklem gelişimini destekler. Daha ileri vakalarda cerrahi müdahale gerekebilir.' },
        { h2: 'Cerrahi Tedavi ve Sonrası', content: 'Cerrahi işlemde kalça eklemi düzgün konuma getirilir ve sabitlenir. Modern cerrahi yöntemler sayesinde ameliyatlar güvenli ve yüksek başarı oranıyla gerçekleştirilir, çocuk normal gelişimini sürdürebilir.' },
        { h2: 'Takip ve Önemi', content: 'Düzenli kontroller, uzman yönlendirmesi ve uygun tedavi yöntemleri ile çocuğunuzun sağlıklı bir şekilde yürümeye başlamasını ve normal gelişimini güvenle destekleyebilirsiniz.' },
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
      desc: 'Skolyozda doğru egzersizler omurga kaslarını güçlendirir, eğriliğin ilerlemesini yavaşlatabilir ve yaşam kalitesini artırır. Hangi egzersizler faydalı, hangileri sakıncalı?',
      intro: 'Skolyoz tanısı almak, hareketsiz kalmak anlamına gelmez. Aksine — doğru egzersizler, omurga kaslarını güçlendirerek eğriliğin ilerlemesini yavaşlatabilir, ağrıyı azaltabilir ve duruşu belirgin biçimde iyileştirebilir. Ancak her egzersiz her hastaya uygun değildir. Eğriliğin tipi, derecesi ve hastanın yaşı, hangi hareketlerin faydalı hangilerinin zararlı olacağını doğrudan belirler. Bu nedenle egzersiz programının mutlaka ortopedi uzmanı veya fizyoterapist gözetiminde oluşturulması gerekir.',
      sections: [
        { h2: 'Skolyozda Egzersizin Önemi', content: 'Omurga çevresindeki kaslar — özellikle paraspinal kaslar, karın kasları ve kalça stabilizatörleri — omurgayı dik tutan aktif desteklerdir. Bu kaslar zayıfladığında eğrilik üzerindeki yük artar ve eğriliğin ilerlemesi kolaylaşır.\n\nEgzersiz tedavisinin kanıtlanmış faydaları: Omurga kaslarını güçlendirerek omurgaya aktif destek sağlar, büyüme dönemindeki çocuklarda eğriliğin ilerlemesini yavaşlatabilir, postür farkındalığını artırır, ağrı ve kas yorgunluğunu azaltır, solunum kapasitesini destekler.' },
        { h2: 'Skolyozu Destekleyen Temel Egzersiz Yaklaşımları', content: 'Schroth Yöntemi: Almanya kökenli bu üç boyutlu solunum ve postür eğitimi yöntemi, skolyoz için en çok araştırılmış egzersiz yaklaşımlarından biridir. Omurgayı aktif olarak rotasyon ve elongasyon ile yeniden hizalama prensibine dayanır.\n\nSEAS: Hastanın kendi kendine uygulayabileceği aktif öz-düzeltme egzersizlerine dayanır. Korse tedavisiyle kombinasyonu başarılı sonuçlar vermektedir.\n\nCore Stabilizasyon: Derin karın kasları ve multifidus kaslarını hedef alan egzersizler, omurganın dinamik dengesini destekler.' },
        { h2: 'Evde Uygulanabilecek Destekleyici Hareketler', content: 'Cat-Cow: Dörtayak pozisyonunda sırtı yavaşça yukarı ve aşağı hareket ettirerek omurganın esnekliğini artırır.\n\nBird-Dog: Dörtayak pozisyondan karşılıklı kol ve bacağı yavaşça uzatma; core kaslarını güçlendirir.\n\nYan Köprü (modifiye): Diz üzerinde yapılan yan köprü, lateral stabilizatörleri güçlendirir.\n\nScapular Retraksiyon: Omuzları arkaya ve aşağıya çekme; üst sırt kaslarını güçlendirir.\n\nPelvik Tilt: Sırt üstü yatışta bel bölgesini zemine bastırıp bırakma; lumbar bölge mobilizasyonu sağlar.' },
        { h2: 'Kaçınılması Gereken Durumlar', content: 'Skolyozlu hastalarda dikkatli değerlendirilmesi gereken aktiviteler:\n\n• Ağır serbest ağırlık egzersizleri: Yanlış form altında omurgaya aşırı yük bindirebilir\n• Yüksek darbeli aktiviteler: Eğriliğin ilerlediği dönemlerde yoğunluk azaltılabilir\n• Asimetrik yük taşıma: Tek omuzda ağır çanta omurga asimetrisini artırabilir\n• Ağrı veren hareketler: Ağrı veya uyuşma yaşanıyorsa hemen durulmalı' },
        { h2: 'Egzersiz Programına Ne Zaman Başlanmalı?', content: 'Egzersiz, skolyoz tanısından sonra ne kadar erken başlanırsa o kadar faydalıdır. Büyüme dönemindeki çocuklarda — özellikle Cobb açısı 20–45° arasında olanlarda — düzenli egzersiz ve korse tedavisinin birlikte uygulanması cerrahiye gerek kalmadan eğriliği kontrol altında tutmaya yardımcı olabilir. Her hastanın durumu farklıdır; mutlaka uzman görüşü alın.' },
      ],
      tags: ['Skolyoz', 'Skolyoz Egzersizleri', 'Schroth', 'Core Egzersiz', 'Omurga Sağlığı', 'Postür'],
      lang: 'tr',
    },
    {
      slug: 'acl-cop-bag-ameliyati',
      title: 'Spor Yaralanmalarına Dikkat!',
      img: '/images/saglik/on-capraz.avif',
      date: '3 Ağustos 2024',
      readTime: '7 dk okuma',
      category: 'Artroskopik Cerrahi',
      desc: 'Spor yaralanmaları, kas, tendon, bağ ve eklemlerde oluşan hasarlardır ve hem amatör hem de profesyonel sporcular arasında sık görülür.',
      intro: 'Spor yaparken ya da günlük yaşamda ani hareketler sırasında eklem, kas veya kemiklerde ağrı, şişlik veya hareket kısıtlılığı mı hissediyorsunuz? Bunlar çoğu zaman basit bir zorlanma gibi görünebilir, ancak spor yaralanmalarının ilk işaretleri olabilir. Spor yaralanmaları, kas, tendon, bağ ve eklemlerde oluşan hasarlardır ve hem amatör hem de profesyonel sporcular arasında sık görülür. Prof. Dr. Nurullah Ermiş, spor yaralanmalarında erken tanı ve doğru müdahalenin önemine dikkat çekiyor.',
      sections: [
        { h2: 'Sık Görülen Spor Yaralanmaları ve Belirtileri', content: 'Sık görülen spor yaralanmaları arasında burkulmalar, kas zorlanmaları, tendon iltihapları, menisküs yaralanmaları ve kemik kırıkları yer alır. Belirtiler genellikle ağrı, şişlik, morarma, eklemde hareket kısıtlılığı veya basınca duyarlılık şeklindedir.' },
        { h2: 'Spor Yaralanmalarının Nedenleri', content: 'Spor yaralanmalarının oluşumunda birçok faktör rol oynar. Yanlış ısınma, hatalı teknik, aşırı yüklenme veya uygun olmayan ekipman kullanımı riski artırabilir. Ayrıca kişisel faktörler, genetik yatkınlık ve önceki yaralanmalar da süreci etkiler.' },
        { h2: 'Tedavi Seçenekleri ve Cerrahi Gereksinim', content: 'Tedavi seçenekleri, yaralanmanın türü ve şiddetine göre değişir. Hafif yaralanmalarda dinlenme, fizik tedavi ve ağrı yönetimi yeterli olurken; bazı durumlarda cerrahi müdahale gerekebilir. Cerrahi genellikle kemik kırıkları, menisküs yırtıkları ve bağ kopmaları, tendon kopmaları veya konservatif tedaviye yanıt alınamadığında tercih edilir.' },
        { h2: 'İyileşme Süreci ve Korunma', content: 'Modern ortopedik cerrahi teknikler sayesinde operasyonlar yüksek başarı oranıyla gerçekleştirilir ve sporcuların spora dönüş süresi minimuma indirilir. Erken tanı, doğru tedavi ve uygun rehabilitasyonla çoğu yaralanma tamamen iyileşir.' },
      ],
      tags: ['ACL', 'Ön Çapraz Bağ', 'Diz Ameliyatı', 'Artroskopi', 'Menisküs', 'Spor Cerrahisi'],
      lang: 'tr',
    },
  ];

  for (const article of trArticles) {
    const { slug, ...rest } = article;
    await prisma.healthArticle.upsert({
      where: { slug: `${slug}_tr` },
      update: { ...rest },
      create: { ...rest, slug: `${slug}_tr` },
    });
  }
  console.log(`✅ ${trArticles.length} TR health articles seeded`);

  // ─── HEALTH ARTICLES (EN) ───────────────────────────────────────────────────
  const enArticles = [
    {
      slug: 'lumbar-disc-surgery',
      title: 'Lumbar Disc Herniation Surgery: Walking on the Same Day with Microsurgery',
      img: '/images/saglik/bel-fitigi.avif',
      date: 'March 12, 2025',
      readTime: '7 min read',
      category: 'Lumbar Disc Herniation',
      desc: 'A lumbar disc herniation occurs when spinal discs shift out of place and put pressure on nerves, and it is most commonly seen between the ages of 30 and 50.',
      intro: 'Are you experiencing lower back pain, numbness radiating to the legs, or weakness? These may often be symptoms of a lumbar disc herniation. A lumbar disc herniation occurs when spinal discs shift out of place and put pressure on nerves, and it is most commonly seen between the ages of 30 and 50. The first step in treatment is usually conservative methods. These include medication, physical therapy, spinal exercises, lifestyle changes, and lumbar supports. Most patients can manage their pain and continue daily activities with these methods. However, in some cases, conservative treatment may not be sufficient.',
      sections: [
        { h2: 'How Is Lumbar Disc Herniation Surgery Performed?', content: 'Lumbar disc herniation surgery is generally performed using microsurgical or endoscopic methods. During the procedure, the herniated disc material is removed and the pressure on the nerve is relieved. Thanks to modern medical techniques, surgeries are performed with high success rates, and patients can usually return to their daily lives in a short time.' },
        { h2: 'Postoperative Process', content: 'After microsurgery, most of the sciatic pain usually decreases in the first days, but full nerve recovery may take 3–6 months; mild tingling during this period is considered normal. To accelerate recovery, avoid heavy lifting and bending forward during the first 4–6 weeks, start core exercises under physiotherapist supervision, and take short walks 2–3 times a day.' },
        { h2: 'Risk of Recurrent Herniation', content: 'The risk of recurrent herniation after surgery is approximately 5–8 out of every 100 operations. To reduce this risk, weight control, regular core exercises, and proper lifting techniques are very important. If herniation recurs, microdiscectomy or endoscopic discectomy methods can be successfully applied.' },
      ],
      tags: ['Lumbar Disc Herniation', 'Microdiscectomy', 'Sciatica', 'Lumbar Disc', 'Spine Surgery'],
      lang: 'en',
    },
    {
      slug: 'scoliosis-symptoms-treatment',
      title: 'Should we be afraid of scoliosis?',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: 'February 28, 2025',
      readTime: '8 min read',
      category: 'Scoliosis',
      desc: 'Scoliosis is a condition characterized by a sideways curvature of the spine and is often noticed during childhood and adolescence.',
      intro: 'Are your shoulders level? Have you noticed a slight curvature in your back when looking in the mirror? What you may think is a simple posture issue could actually be an early sign of scoliosis. Scoliosis is a condition characterized by a sideways curvature of the spine and is often noticed during childhood and adolescence. Since it usually does not cause pain, it can be difficult to detect. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis in scoliosis, as in all diseases.',
      sections: [
        { h2: 'What Causes Scoliosis?', content: 'Scoliosis does not have a single cause; multiple factors may play a role. According to studies, in approximately 80% of cases, the exact cause cannot be determined. Genetic predisposition is one of the leading factors, and it is more common in girls than in boys. Additionally, an underdeveloped spine during fetal development may also lead to scoliosis.' },
        { h2: 'Scoliosis Treatment and Surgery Process', content: 'Scoliosis surgery is an operation that requires advanced surgical experience and technology. However, with modern methods, the success rate of surgery is quite high. The surgical plan is determined by considering the patient\'s age and the degree of curvature. During the operation, pedicle screw systems are placed along the spine and metal rods are inserted between these screws.' },
        { h2: 'Should We Be Afraid of Scoliosis?', content: 'Remember, scoliosis is not always something to be feared. With early diagnosis, regular follow-ups, and appropriate treatment methods, most cases can be managed, and it is possible to achieve a healthy spine.' },
      ],
      tags: ['Scoliosis', 'VBT', 'Kyphosis', 'Spinal Curvature', 'Pediatric Orthopedics', 'Spine Surgery'],
      lang: 'en',
    },
    {
      slug: 'knee-replacement-surgery',
      title: 'What is knee replacement surgery?',
      img: '/images/saglik/diz-cerrahi.avif',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Joint Replacement',
      desc: 'Knee replacement surgery is a safe and effective method used to correct damage caused by joint wear, osteoarthritis, or trauma.',
      intro: 'Do you experience persistent knee pain, swelling, limited movement, or difficulty performing daily activities? These are often the first signs of advanced joint damage or knee osteoarthritis. Knee replacement surgery is a safe and effective method used to correct damage caused by joint wear, osteoarthritis, or trauma. Prof. Dr. Nurullah Ermiş emphasizes that early evaluation significantly facilitates treatment in knee replacement procedures.',
      sections: [
        { h2: 'When Is Knee Replacement Applied?', content: 'Knee replacement is generally performed in patients with advanced osteoarthritis, rheumatoid arthritis, traumatic joint damage, or severe loss of knee function. Symptoms include persistent knee pain, difficulty climbing stairs, loss of strength in the legs, and joint stiffness.' },
        { h2: 'How Is Knee Replacement Surgery Performed?', content: 'Knee replacement surgery is planned according to the patient\'s age, general health condition, and degree of damage. During surgery, worn or damaged joint surfaces are removed and replaced with an artificial joint made of metal, ceramic, or polyethylene materials. Thanks to modern surgical techniques and robotic-assisted methods, operations are performed with high success rates.' },
        { h2: 'What Is Robotic Knee Replacement?', content: 'Robotic knee replacement is more precise and safer compared to traditional methods. The patient\'s bones are modeled in 3D before surgery and the implant position is planned with millimetric precision. During the operation, the robot automatically prevents deviations beyond planned boundaries and ensures perfect alignment of the leg axis.' },
        { h2: 'In Which Cases Is Knee Replacement Surgery Preferred?', content: 'Knee replacement surgery is generally preferred in: advanced osteoarthritis with pain and loss of movement, severe functional loss in rheumatoid arthritis, chronic knee pain unresponsive to previous treatments, and improper knee function after traumatic joint damage.' },
        { h2: 'Recovery Process and Outcomes', content: 'With early evaluation, modern surgical techniques, and proper rehabilitation, most patients can lead a pain-free and active life. Regular check-ups, an appropriate treatment plan, and conscious physical therapy help you maintain your knee health safely.' },
      ],
      tags: ['Knee Replacement', 'Robotic Surgery', 'Osteoarthritis', 'Arthrosis', 'Joint Replacement'],
      lang: 'en',
    },
    {
      slug: 'do-you-have-a-cervical-disc-herniation',
      title: 'Do You Have a Cervical Disc Herniation? No Need to Panic…',
      img: '/images/saglik/boyun-cerrahi.avif',
      date: 'November 5, 2024',
      readTime: '6 min read',
      category: 'Cervical Disc Herniation',
      desc: 'A cervical disc herniation is a condition that occurs when the discs in the spine shift out of place and put pressure on the nerves, and it is more commonly seen in middle-aged and older individuals.',
      intro: 'Do you have neck pain, numbness in your shoulders, or a loss of sensation in your arm? These may seem like simple muscle fatigue, but they could be the first signs of a cervical disc herniation. A cervical disc herniation is a condition that occurs when the discs in the spine shift out of place and put pressure on the nerves, and it is generally more common in middle-aged and older individuals. However, today it has also become widespread among desk workers and younger people.',
      sections: [
        { h2: 'What Are the Symptoms of Cervical Disc Herniation?', content: 'The most common symptoms include neck pain, numbness or tingling in the shoulders and arms, loss of strength in the arms, and limited movement of the head. If one or more of these symptoms are present, it is important to consult a specialist without delay.' },
        { h2: 'What Causes Cervical Disc Herniation?', content: 'Many factors play a role in the development of a cervical disc herniation. Sitting for long periods with poor posture, carrying heavy loads, sudden movements, or genetic predisposition can increase the risk of herniation.' },
        { h2: 'What Are the Treatment Options?', content: 'Treatment options vary depending on the severity of the condition and the patient\'s lifestyle. Most mild to moderate herniations can be managed with medication, physical therapy, and special exercise programs. In severe cases or when nerve compression is advanced, surgical methods may be applied with high success rates.' },
        { h2: 'Should We Be Afraid of Cervical Disc Herniation?', content: 'Remember, cervical disc herniation is not always something to be feared. With early diagnosis, regular medical check-ups, and appropriate treatment methods, most patients can return to their normal lives. You can protect your neck health with regular posture checks, an ergonomic working environment, and conscious exercise.' },
      ],
      tags: ['Cervical Disc Herniation', 'Cervical Disc', 'ACDF', 'Artificial Disc', 'Spine Surgery'],
      lang: 'en',
    },
    {
      slug: 'how-can-we-recognize-hip-dislocation-in-children',
      title: 'How Can We Recognize Hip Dislocation in Children?',
      img: '/images/saglik/cocuk.avif',
      date: 'September 20, 2024',
      readTime: '5 min read',
      category: 'Pediatric Orthopedics',
      desc: 'Hip dislocation is usually a congenital condition and is directly related to joint development.',
      intro: 'Have you noticed asymmetry in your baby\'s hip area after birth? Differences in leg length, the baby being unable to open one leg as much as the other, or limited movement in the hip may be early signs of hip dislocation in children. Hip dislocation is usually a congenital condition and is directly related to joint development. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis, because when detected early, hip dislocation can be easily corrected with simple methods.',
      sections: [
        { h2: 'What Are the Symptoms of Hip Dislocation?', content: 'Hip dislocation is usually noticed during birth or in the first months. Symptoms include differences in leg length, lack of symmetry around the hips, difficulty in opening the baby\'s legs, or movement accompanied by a "click" sound.' },
        { h2: 'What Causes Hip Dislocation?', content: 'Many factors may play a role in the development of hip dislocation. Genetic predisposition, the baby being in a breech position in the womb, or certain birth complications can increase the risk. It is also more likely to be seen in premature babies or in children with a family history of hip dislocation.' },
        { h2: 'What Is the Treatment Process?', content: 'Treatment varies depending on the severity of the dislocation and the child\'s age. In mild cases, Pavlik harness or special hip casts are used to keep the hip joint in the correct position. In more advanced cases, surgical intervention may be necessary.' },
        { h2: 'Surgical Treatment and Aftercare', content: 'During surgery, the hip joint is repositioned correctly and stabilized. Thanks to modern surgical techniques, operations are performed safely with high success rates, allowing the child to continue normal development.' },
        { h2: 'Follow-up and Importance', content: 'With regular check-ups, specialist guidance, and appropriate treatment methods, you can safely support your child\'s ability to walk healthily and ensure normal development.' },
      ],
      tags: ['Hip Dislocation', 'DDH', 'Pediatric Orthopedics', 'Pavlik Harness', 'Infant Hip Dysplasia'],
      lang: 'en',
    },
    {
      slug: 'scoliosis-exercises',
      title: 'Scoliosis Exercises: Movements That Support the Spine',
      img: '/images/saglik/skolyoz-cerrahi.avif',
      date: 'March 28, 2025',
      readTime: '8 min read',
      category: 'Scoliosis',
      desc: 'The right exercises in scoliosis strengthen spinal muscles, may slow the progression of the curve, and improve quality of life. Which exercises help — and which should be avoided?',
      intro: 'A scoliosis diagnosis does not mean you should stop moving. Quite the opposite — when done correctly, exercises can strengthen the muscles around the spine, slow the progression of the curve, reduce pain, and noticeably improve posture. However, not every exercise suits every patient. The type, degree, and location of the curve directly determine which movements are beneficial and which may be harmful. Any exercise programme must be designed under the supervision of an orthopaedic specialist or physiotherapist.',
      sections: [
        { h2: 'Why Exercise Matters in Scoliosis', content: 'The muscles surrounding the spine — particularly the paraspinal muscles, abdominal muscles, and hip stabilisers — are the active supports that keep the spine upright. When these muscles weaken, the load on the curve increases. Evidence-based benefits include: strengthening spinal muscles, potentially slowing curve progression in growing children, increasing postural awareness, reducing pain and muscle fatigue, and supporting respiratory capacity.' },
        { h2: 'Key Exercise Approaches in Scoliosis', content: 'Schroth Method: A three-dimensional breathing and postural re-education method, developed in Germany, and one of the most researched exercise approaches for scoliosis. Based on actively realigning the spine through rotation and elongation.\n\nSEAS: Built around active self-correction exercises the patient can perform independently. Combining with brace treatment has shown promising results.\n\nCore Stabilisation: Exercises targeting deep abdominal muscles and multifidus support the dynamic balance of the spine.' },
        { h2: 'Supportive Movements You Can Do at Home', content: 'Cat-Cow: Slowly arch and round the back alternately from hands-and-knees. Increases spinal flexibility.\n\nBird-Dog: Slowly extend the opposite arm and leg from hands-and-knees. Strengthens core muscles.\n\nModified Side Plank: Performed from the knees; strengthens lateral stabilisers.\n\nScapular Retraction: Drawing shoulder blades back and downward; strengthens upper back muscles.\n\nPelvic Tilt: Lying on the back, gently press the lower back into the floor and release.' },
        { h2: 'Situations to Approach with Caution', content: 'Certain activities require careful consideration: heavy free-weight exercises can overload the spine if form is compromised; high-impact activities may need to be reduced during active curve progression; carrying a heavy bag on one shoulder worsens spinal asymmetry; if pain, numbness, or breathlessness occurs during exercise, stop immediately and consult a specialist.' },
        { h2: 'When Should an Exercise Programme Begin?', content: 'The earlier exercise begins after a scoliosis diagnosis, the more beneficial it is. In growing children and adolescents — particularly those with a Cobb angle between 20–45° — regular exercise combined with bracing can help keep the curve under control. After surgery, the exercise programme typically begins 4–6 weeks post-operatively under physiotherapy supervision.' },
      ],
      tags: ['Scoliosis', 'Scoliosis Exercises', 'Schroth', 'Core Exercise', 'Spine Health', 'Posture'],
      lang: 'en',
    },
    {
      slug: 'acl-surgery',
      title: 'Be Careful with Sports Injuries!',
      img: '/images/saglik/on-capraz.avif',
      date: 'August 3, 2024',
      readTime: '7 min read',
      category: 'Arthroscopic Surgery',
      desc: 'Sports injuries are damages that occur in muscles, tendons, ligaments, and joints, and are commonly seen among both amateur and professional athletes.',
      intro: 'Do you feel pain, swelling, or limited movement in your joints, muscles, or bones during sports activities or sudden movements in daily life? These may seem like simple strains, but they could be the first signs of sports injuries. Sports injuries are damages that occur in muscles, tendons, ligaments, and joints, and are commonly seen among both amateur and professional athletes. Prof. Dr. Nurullah Ermiş emphasizes the importance of early diagnosis and proper intervention in sports injuries.',
      sections: [
        { h2: 'Common Sports Injuries and Symptoms', content: 'Common sports injuries include sprains, muscle strains, tendon inflammations, meniscus injuries, and bone fractures. Symptoms are usually pain, swelling, bruising, limited joint movement, or sensitivity to pressure. When these symptoms occur, it is important to consult an orthopedic specialist without delay.' },
        { h2: 'Causes of Sports Injuries', content: 'Many factors play a role in the development of sports injuries. Improper warm-up, incorrect technique, overloading, or the use of inappropriate equipment can increase the risk. Additionally, personal factors, genetic predisposition, and previous injuries also affect the process.' },
        { h2: 'Treatment Options and Surgical Needs', content: 'Treatment options vary depending on the type and severity of the injury. In mild cases, rest, physical therapy, and pain management are sufficient. Surgery is generally preferred when bone fractures or joint dislocations occur, in serious joint injuries such as meniscus tears and ligament ruptures, in tendon ruptures, or when there is no response to conservative treatment.' },
        { h2: 'Recovery Process and Prevention', content: 'Thanks to modern orthopedic surgical techniques, operations are performed with high success rates and return-to-sport time is minimized. With early diagnosis, proper treatment, and appropriate rehabilitation, most injuries can fully heal. Regular warm-ups, correct techniques, and appropriate equipment use reduce your risk of injury.' },
      ],
      tags: ['ACL', 'Anterior Cruciate Ligament', 'Knee Surgery', 'Arthroscopy', 'Meniscus', 'Sports Surgery'],
      lang: 'en',
    },
  ];

  for (const article of enArticles) {
    const { slug, ...rest } = article;
    await prisma.healthArticle.upsert({
      where: { slug: `${slug}_en` },
      update: { ...rest },
      create: { ...rest, slug: `${slug}_en` },
    });
  }
  console.log(`✅ ${enArticles.length} EN health articles seeded`);

  // ─── TREATMENTS ─────────────────────────────────────────────────────────────
  for (const treatment of TREATMENTS_DATA) {
    await prisma.treatment.upsert({
      where: { slug: treatment.slug },
      update: {
        title: treatment.title,
        img: treatment.img,
        images: treatment.images ?? [],
        category: treatment.category,
        stats: treatment.stats,
        desc: treatment.desc,
        symptoms: treatment.symptoms,
        treatment: treatment.treatment,
        faq: treatment.faq,
      },
      create: {
        slug: treatment.slug,
        title: treatment.title,
        img: treatment.img,
        images: treatment.images ?? [],
        category: treatment.category,
        stats: treatment.stats,
        desc: treatment.desc,
        symptoms: treatment.symptoms,
        treatment: treatment.treatment,
        faq: treatment.faq,
      },
    });
  }
  console.log(`✅ ${TREATMENTS_DATA.length} treatments seeded`);

  const enTreatments = TREATMENTS_TRANSLATIONS.en;
  for (const [slug, content] of Object.entries(enTreatments)) {
    const trTreatment = TREATMENTS_DATA.find((t) => t.slug === slug);
    if (!trTreatment) continue;
    await prisma.treatment.upsert({
      where: { slug: `${slug}_en` },
      update: {
        title: content.title,
        img: trTreatment.img,
        images: trTreatment.images ?? [],
        category: content.category,
        stats: content.stats,
        desc: content.desc,
        symptoms: content.symptoms,
        treatment: content.treatment,
        faq: content.faq,
      },
      create: {
        slug: `${slug}_en`,
        title: content.title,
        img: trTreatment.img,
        images: trTreatment.images ?? [],
        category: content.category,
        stats: content.stats,
        desc: content.desc,
        symptoms: content.symptoms,
        treatment: content.treatment,
        faq: content.faq,
        published: true,
      },
    });
  }
  console.log(`✅ ${Object.keys(enTreatments).length} EN treatments seeded`);

  // ─── PRESS ITEMS ─────────────────────────────────────────────────────────────
  const pressItems = [
    { outlet: 'NTV Sağlık', title: 'Skolyozda erken tanı ve doğru takip neden önemli?', summary: 'Omurga eğriliklerinde erken farkındalık, ailelerin dikkat etmesi gereken bulgular ve tedavi süreci üzerine uzman değerlendirmesi.', date: 'Mart 2025', format: 'tv', image: '/images/skolyoz-kifoz.avif', href: '#', lang: 'tr' },
    { outlet: 'Anadolu Sağlık Dergisi', title: 'Boyun ve bel fıtığında hangi belirtiler ciddiye alınmalı?', summary: 'Günlük yaşamı etkileyen ağrı, uyuşma ve güç kaybı şikayetlerinde hangi noktada uzman görüşü alınması gerektiğine dair röportaj.', date: 'Ocak 2025', format: 'press', image: '/images/boyun-fitigi.avif', href: '#', lang: 'tr' },
    { outlet: 'Medical Update', title: 'Robotik diz ve kalça cerrahisine güncel bakış', summary: 'Eklem cerrahisinde hassas planlama, hasta konforu ve iyileşme sürecine etkileri üzerine dijital yayın dosyası.', date: 'Kasım 2024', format: 'press', image: '/images/diz-kalca-protezi.avif', href: '#', lang: 'tr' },
    { outlet: 'TRT Radyo 1', title: 'Çocuklarda kalça gelişimi ve ortopedik takip', summary: 'Ailelerin erken dönemde fark edebileceği bulgular ve çocuk ortopedisinde düzenli değerlendirmenin önemi üzerine canlı yayın konuşması.', date: 'Eylül 2024', format: 'radio', image: '/images/cocuk-ortopedisi.avif', href: '#', lang: 'tr' },
    { outlet: 'Habertürk Sağlık', title: 'Diz protezi sonrası hareket kabiliyeti nasıl toparlanır?', summary: 'Eklem protezi sonrası iyileşme, yürüme süreci ve günlük yaşama dönüş hakkında uzman görüşü içeren haber dosyası.', date: 'Temmuz 2024', format: 'tv', image: '/images/diz-kalca-protezi.avif', href: '#', lang: 'tr' },
    { outlet: 'Sağlık Postası', title: 'Çocuk ortopedisinde erken değerlendirme neden belirleyici?', summary: 'Büyüme çağındaki ortopedik sorunlarda gecikmeyen muayenenin tedavi planını nasıl değiştirdiğini anlatan özel içerik.', date: 'Mayıs 2024', format: 'press', image: '/images/cocuk-ortopedisi.avif', href: '#', lang: 'tr' },
    { outlet: 'CNN Türk', title: 'Boyun ağrısı ve kola vuran uyuşmada ne zaman uzmana gidilmeli?', summary: 'Boyun fıtığı belirtileri, masa başı yaşamın etkileri ve doğru zamanda değerlendirme alınmasının önemi üzerine yayın.', date: 'Şubat 2024', format: 'tv', image: '/images/boyun-fitigi.avif', href: '#', lang: 'tr' },
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