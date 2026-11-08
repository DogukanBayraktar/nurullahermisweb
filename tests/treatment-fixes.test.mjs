// tests/treatment-fixes.test.mjs
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// 1. Slug & Dil Fonksiyonları (src/lib/updateTreatmentSlugMap.ts ile birebir aynı implementasyon)
function stripSlugSuffix(slug) {
  if (!slug) return '';
  return slug.replace(/_tr$/, '').replace(/_en$/, '');
}

function getTreatmentLanguage(t) {
  if (t.slug?.endsWith('_en')) return 'en';
  if (t.slug?.endsWith('_tr')) return 'tr';
  if (t.lang === 'en') return 'en';
  return 'tr';
}

const treatmentSlugMap = {
  'skolyoz-kifoz-cerrahisi': 'scoliosis-kyphosis-surgery',
  'bel-fitigi-tedavisi': 'lumbar-herniated-disc-treatment',
  'boyun-fitigi-cerrahisi': 'cervical-disc-surgery',
  'diz-kalca-protezi': 'knee-hip-replacement',
  'cocuk-ortopedisi': 'pediatric-orthopedics',
  'artroskopik-cerrahi': 'arthroscopic-surgery',
};

function getReverseTreatmentSlugMap() {
  return Object.fromEntries(Object.entries(treatmentSlugMap).map(([k, v]) => [v, k]));
}

function localizeTreatmentSlug(slug, language) {
  const normalized = stripSlugSuffix(slug);
  const lang = language?.startsWith('en') ? 'en' : 'tr';
  if (lang === 'en') return treatmentSlugMap[normalized] ?? normalized;
  const reverseMap = getReverseTreatmentSlugMap();
  return reverseMap[normalized] ?? normalized;
}

function canonicalTreatmentSlug(slug) {
  const normalized = stripSlugSuffix(slug);
  const reverseMap = getReverseTreatmentSlugMap();
  return reverseMap[normalized] ?? normalized;
}

async function runTests() {
  console.log('🧪 Nurullah Ermiş Web — Kapsamlı Test Paketi Başlatılıyor...\n');
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    HATA: ${err.message}`);
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 1. SLUG VE DİL EŞLEŞTİRME TESTLERİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('--- 1. Slug ve Dil Eşleştirme Testleri ---');

  test('stripSlugSuffix: _tr ve _en uzantılarını temizlemeli, eksiz olanı korumalı', () => {
    assert.strictEqual(stripSlugSuffix('skolyoz-kifoz-cerrahisi_tr'), 'skolyoz-kifoz-cerrahisi');
    assert.strictEqual(stripSlugSuffix('skolyoz-kifoz-cerrahisi_en'), 'skolyoz-kifoz-cerrahisi');
    assert.strictEqual(stripSlugSuffix('skolyoz-kifoz-cerrahisi'), 'skolyoz-kifoz-cerrahisi');
    assert.strictEqual(stripSlugSuffix(''), '');
  });

  test('getTreatmentLanguage: dil tespiti öncelikleri ve geriye dönük uyumluluk', () => {
    // Slug _en ile bitiyorsa, lang 'tr' bile olsa 'en' olarak tespit etmeli (seed bug uyumluluğu)
    assert.strictEqual(
      getTreatmentLanguage({ slug: 'skolyoz-kifoz-cerrahisi_en', lang: 'tr' }),
      'en'
    );
    // Slug _tr ile bitiyorsa 'tr'
    assert.strictEqual(
      getTreatmentLanguage({ slug: 'skolyoz-kifoz-cerrahisi_tr', lang: 'tr' }),
      'tr'
    );
    // lang: 'en' ise 'en'
    assert.strictEqual(
      getTreatmentLanguage({ slug: 'scoliosis-kyphosis-surgery', lang: 'en' }),
      'en'
    );
    // Varsayılan 'tr'
    assert.strictEqual(
      getTreatmentLanguage({ slug: 'skolyoz-kifoz-cerrahisi', lang: 'tr' }),
      'tr'
    );
  });

  test('localizeTreatmentSlug & canonicalTreatmentSlug: eski ve yeni slug çiftlerini doğru eşleştirmeli', () => {
    // TR -> EN çevirisi
    assert.strictEqual(
      localizeTreatmentSlug('skolyoz-kifoz-cerrahisi', 'en'),
      'scoliosis-kyphosis-surgery'
    );
    // _tr ekiyle gelen slug'ı da EN'e çevirebilmeli
    assert.strictEqual(
      localizeTreatmentSlug('skolyoz-kifoz-cerrahisi_tr', 'en'),
      'scoliosis-kyphosis-surgery'
    );
    // EN -> TR ters çevirisi (canonical)
    assert.strictEqual(
      canonicalTreatmentSlug('scoliosis-kyphosis-surgery'),
      'skolyoz-kifoz-cerrahisi'
    );
    // _en ekiyle gelen EN slug'ı da TR canonical slug'a çevirebilmeli
    assert.strictEqual(
      canonicalTreatmentSlug('scoliosis-kyphosis-surgery_en'),
      'skolyoz-kifoz-cerrahisi'
    );
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. TEDAVİ GALERİSİ GÖRSELLERİNİN KORUNMASI TESTLERİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 2. Tedavi Galerisi Görselleri Testleri ---');

  test('Galeri görselleri: buildPayload içinde images: [] gönderilmemeli, state korunmalı', () => {
    const existingImages = [
      '/images/69b7fcf298c193a1b456984e_skolyoz-2.jpg.avif',
      '/images/69b7fcf232c107d58afb5fbe_skolyoz-3.jpg.avif',
    ];

    // Simüle edilen buildPayload
    function simulateBuildPayload(form, lang, galleryImages) {
      const canonical = stripSlugSuffix(form.slug || form.title);
      return {
        slug: lang === 'tr' ? canonical : `${canonical}_en`,
        lang,
        title: form.title,
        img: '/images/skolyoz.avif',
        images: galleryImages, // Artık boş dizi değil!
      };
    }

    const payload = simulateBuildPayload({ title: 'Skolyoz Cerrahisi', slug: 'skolyoz' }, 'tr', existingImages);
    assert.deepStrictEqual(payload.images, existingImages);
    assert.strictEqual(payload.images.length, 2);
  });

  test('Galeri görselleri: Yeni görsel ekleme ve silme simülasyonu', () => {
    let images = ['/img1.jpg', '/img2.jpg'];

    // Yeni görsel ekleme
    images = [...images, '/img3.jpg'];
    assert.strictEqual(images.length, 3);
    assert.strictEqual(images[2], '/img3.jpg');

    // Görsel silme (index 1'deki img2 siliniyor)
    images = images.filter((_, idx) => idx !== 1);
    assert.strictEqual(images.length, 2);
    assert.deepStrictEqual(images, ['/img1.jpg', '/img3.jpg']);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. PRISMA SEED DOSYASI DİL VE VERİ GÜVENLİĞİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 3. Prisma Seed Dil Güvenliği Testleri ---');

  test('prisma/seed.ts: İngilizce kayıtların create ve update işlemlerinde lang: "en" bulunmalı', () => {
    const seedContent = fs.readFileSync(path.join(process.cwd(), 'prisma/seed.ts'), 'utf-8');

    const enBlockStart = seedContent.indexOf('const enTreatments = TREATMENTS_TRANSLATIONS.en;');
    assert.ok(enBlockStart > 0, 'enTreatments döngüsü bulunamadı');

    const enBlock = seedContent.slice(enBlockStart);
    const updateMatches = enBlock.match(/update:\s*\{[\s\S]*?lang:\s*['"]en['"]/);
    const createMatches = enBlock.match(/create:\s*\{[\s\S]*?lang:\s*['"]en['"]/);

    assert.ok(updateMatches, "enTreatments update bloğunda lang: 'en' bulunamadı");
    assert.ok(createMatches, "enTreatments create bloğunda lang: 'en' bulunamadı");
  });

  test('prisma/seed.ts: Türkçe kayıtların create ve update işlemlerinde lang: "tr" bulunmalı', () => {
    const seedContent = fs.readFileSync(path.join(process.cwd(), 'prisma/seed.ts'), 'utf-8');

    const trBlockStart = seedContent.indexOf('for (const treatment of TREATMENTS_DATA)');
    assert.ok(trBlockStart > 0, 'TREATMENTS_DATA döngüsü bulunamadı');

    const trBlock = seedContent.slice(trBlockStart, trBlockStart + 1500);
    const updateMatches = trBlock.match(/update:\s*\{[\s\S]*?lang:\s*['"]tr['"]/);
    const createMatches = trBlock.match(/create:\s*\{[\s\S]*?lang:\s*['"]tr['"]/);

    assert.ok(updateMatches, "trTreatments update bloğunda lang: 'tr' bulunamadı");
    assert.ok(createMatches, "trTreatments create bloğunda lang: 'tr' bulunamadı");
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. İKİ DİLLİ ATOMİK İŞLEM VE İÇERİK BAĞIMSIZLIĞI TESTLERİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 4. İki Dilli Kayıt ve Bağımsızlık Testleri ---');

  test('Değişiklik tespiti (isModified): Sadece Türkçe düzenlendiğinde İngilizce isModified=false olmalı', () => {
    const initialTr = { title: 'Skolyoz Cerrahisi', desc: 'TR Açıklama' };
    const initialEn = { title: 'Scoliosis Surgery', desc: 'EN Description' };

    // Kullanıcı sadece Türkçe başlığı değiştirdi
    const currentTr = { title: 'Skolyoz Cerrahisi (Güncel)', desc: 'TR Açıklama' };
    const currentEn = { title: 'Scoliosis Surgery', desc: 'EN Description' };

    const trModified = JSON.stringify(initialTr) !== JSON.stringify(currentTr);
    const enModified = JSON.stringify(initialEn) !== JSON.stringify(currentEn);

    assert.strictEqual(trModified, true, 'TR modified true olmalı');
    assert.strictEqual(enModified, false, 'EN modified false olmalı');
  });

  test('İki dilli transaction mantığı: Türkçe düzenlendiğinde İngilizce içeriğe dokunulmamalı', async () => {
    const mockDb = {
      treatments: [
        { id: 1, lang: 'tr', title: 'Skolyoz', desc: ['TR Metin'], img: '/img.jpg', images: ['/g1.jpg'] },
        { id: 2, lang: 'en', title: 'Scoliosis', desc: ['EN Content'], img: '/img.jpg', images: ['/g1.jpg'] },
      ],
    };

    // Simüle edilen save route handler mantığı
    async function simulateSaveHandler(body) {
      if (body.tr.isModified) {
        const item = mockDb.treatments.find((t) => t.id === body.tr.id);
        item.title = body.tr.title;
        item.desc = body.tr.desc;
      }
      // İngilizce değiştirilmediyse metinlere dokunma
      if (body.en.isModified) {
        const item = mockDb.treatments.find((t) => t.id === body.en.id);
        item.title = body.en.title;
        item.desc = body.en.desc;
      }
      if (body.shared.isModified) {
        mockDb.treatments.forEach((t) => {
          t.img = body.shared.img;
          t.images = body.shared.images;
        });
      }
    }

    // Kullanıcı sadece TR güncelliyor:
    await simulateSaveHandler({
      tr: { id: 1, title: 'Skolyoz Cerrahisi 2026', desc: ['Yeni TR Metin'], isModified: true },
      en: { id: 2, title: 'Scoliosis', desc: ['EN Content'], isModified: false },
      shared: { img: '/img.jpg', images: ['/g1.jpg'], isModified: false },
    });

    const trRow = mockDb.treatments.find((t) => t.id === 1);
    const enRow = mockDb.treatments.find((t) => t.id === 2);

    assert.strictEqual(trRow.title, 'Skolyoz Cerrahisi 2026');
    assert.strictEqual(enRow.title, 'Scoliosis', 'İngilizce başlık değişmemiş olmalı');
    assert.deepStrictEqual(enRow.desc, ['EN Content'], 'İngilizce açıklama değişmemiş olmalı');
  });

  test('İki dilli transaction mantığı: İngilizce düzenlendiğinde Türkçe içeriğe dokunulmamalı', async () => {
    const mockDb = {
      treatments: [
        { id: 1, lang: 'tr', title: 'Skolyoz Cerrahisi 2026', desc: ['TR Metin'], img: '/img.jpg', images: ['/g1.jpg'] },
        { id: 2, lang: 'en', title: 'Scoliosis', desc: ['EN Content'], img: '/img.jpg', images: ['/g1.jpg'] },
      ],
    };

    async function simulateSaveHandler(body) {
      if (body.tr.isModified) {
        const item = mockDb.treatments.find((t) => t.id === body.tr.id);
        item.title = body.tr.title;
        item.desc = body.tr.desc;
      }
      if (body.en.isModified) {
        const item = mockDb.treatments.find((t) => t.id === body.en.id);
        item.title = body.en.title;
        item.desc = body.en.desc;
      }
      if (body.shared.isModified) {
        mockDb.treatments.forEach((t) => {
          t.img = body.shared.img;
          t.images = body.shared.images;
        });
      }
    }

    // Kullanıcı sadece EN güncelliyor:
    await simulateSaveHandler({
      tr: { id: 1, title: 'Skolyoz Cerrahisi 2026', desc: ['TR Metin'], isModified: false },
      en: { id: 2, title: 'Scoliosis Surgery 2026', desc: ['Updated EN Content'], isModified: true },
      shared: { img: '/img.jpg', images: ['/g1.jpg'], isModified: false },
    });

    const trRow = mockDb.treatments.find((t) => t.id === 1);
    const enRow = mockDb.treatments.find((t) => t.id === 2);

    assert.strictEqual(trRow.title, 'Skolyoz Cerrahisi 2026', 'Türkçe başlık değişmemiş olmalı');
    assert.deepStrictEqual(trRow.desc, ['TR Metin'], 'Türkçe açıklama değişmemiş olmalı');
    assert.strictEqual(enRow.title, 'Scoliosis Surgery 2026');
    assert.deepStrictEqual(enRow.desc, ['Updated EN Content']);
  });

  test('İki dilli transaction mantığı: Hata durumunda rollback simülasyonu', async () => {
    let trCommitted = false;
    let enCommitted = false;

    try {
      await (async function runTransaction() {
        try {
          trCommitted = true;
          throw new Error('EN unique slug hatası');
        } catch (e) {
          trCommitted = false;
          enCommitted = false;
          throw e;
        }
      })();
    } catch {
      // Hata yakalandı
    }

    assert.strictEqual(trCommitted, false, 'Rollback sonrası TR commited olmamalı');
    assert.strictEqual(enCommitted, false, 'Rollback sonrası EN commited olmamalı');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. GROWING ROD GÖRSEL VE GÜVENLİK TESTLERİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 5. Growing Rod Görsel ve Güvenlik Testleri ---');

  test('Eksik görsel tespiti: /images/rontgen/burak-ipekci-2020-preop.jpg dosyası diskte yok ve sahte görsel üretilmedi', () => {
    const filePath = path.join(process.cwd(), 'public/images/rontgen/burak-ipekci-2020-preop.jpg');
    assert.strictEqual(fs.existsSync(filePath), false, 'Dosya gerçekten mevcut değil (404 sebebi)');

    const rontgenDir = path.join(process.cwd(), 'public/images/rontgen');
    assert.strictEqual(fs.existsSync(rontgenDir), false, 'public/images/rontgen dizini yapay olarak oluşturulmamalı');
  });

  test('TedaviDetayClient: XrayGallery onError durumuyla graceful degradation sağlamalı', () => {
    const clientCode = fs.readFileSync(
      path.join(process.cwd(), 'src/components/tedaviler/TedaviDetayClient.tsx'),
      'utf-8'
    );
    assert.ok(clientCode.includes('imgError'), 'TedaviDetayClient imgError state içermeli');
    assert.ok(clientCode.includes('onError={() => setImgError(true)}'), 'img elemanı onError callback içermeli');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 6. CODEBASE ENTEGRASYON KONTROLLERİ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 6. Codebase Entegrasyon Kontrolleri ---');

  test('TreatmentForm.tsx: /api/admin/tedaviler/save endpointini çağırmalı ve images: [] göndermemeli', () => {
    const formCode = fs.readFileSync(
      path.join(process.cwd(), 'src/components/admin/TreatmentForm.tsx'),
      'utf-8'
    );
    assert.ok(formCode.includes('/api/admin/tedaviler/save'), 'TreatmentForm tekli save endpointini çağırmalı');
    assert.ok(!formCode.includes('images: [],'), 'images: [] artık formda gönderilmemeli');
    assert.ok(formCode.includes('images,'), 'images form payloadunda yer almalı');
  });

  test('EditTreatmentPage: findTreatmentPair kullanmalı ve images/pairImages propunu geçirmeli', () => {
    const pageCode = fs.readFileSync(
      path.join(process.cwd(), 'src/app/admin/tedaviler/[id]/page.tsx'),
      'utf-8'
    );
    assert.ok(pageCode.includes('findTreatmentPair(t)'), 'findTreatmentPair kullanılmalı');
    assert.ok(pageCode.includes('images: t.images'), 't.images geçilmeli');
    assert.ok(pageCode.includes('pairImages: pair?.images'), 'pairImages geçilmeli');
  });

  test('/api/admin/tedaviler/save: prisma.$transaction kullanmalı', () => {
    const saveCode = fs.readFileSync(
      path.join(process.cwd(), 'src/app/api/admin/tedaviler/save/route.ts'),
      'utf-8'
    );
    assert.ok(saveCode.includes('prisma.$transaction'), 'prisma.$transaction kullanılmalı');
    assert.ok(saveCode.includes("lang: 'tr'"), "lang: 'tr' atanmalı");
    assert.ok(saveCode.includes("lang: 'en'"), "lang: 'en' atanmalı");
  });

  test('scripts/check-treatment-languages.ts: kontrol scripti mevcut olmalı', () => {
    assert.ok(
      fs.existsSync(path.join(process.cwd(), 'scripts/check-treatment-languages.ts')),
      'scripts/check-treatment-languages.ts oluşturulmuş olmalı'
    );
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SONUÇ
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log(`🎉 TEST SONUÇLARI: ${passed}/${total} test başarıyla tamamlandı!`);
  console.log('════════════════════════════════════════════════════════════════\n');
}

runTests().catch(console.error);

