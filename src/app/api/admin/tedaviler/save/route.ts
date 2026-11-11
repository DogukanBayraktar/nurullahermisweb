// src/app/api/admin/tedaviler/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripSlugSuffix, syncTreatmentPairSlugMap, getTreatmentLanguage } from '@/lib/updateTreatmentSlugMap';
import { mergePatientImages } from '@/lib/mergePatientImages';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

type LangPayload = {
  id?: number;
  title: string;
  slug: string;
  category?: string;
  desc?: string[];
  symptoms?: string[];
  stats?: { label: string; val: string }[];
  treatment?: any[];
  faq?: { s: string; c: string }[];
  isModified?: boolean;
};

type SharedPayload = {
  img?: string;
  images?: string[];
  published?: boolean;
  isModified?: boolean;
  // Bu kaydı sunan admin sayfasında asıl düzenlenen dil ('tr' | 'en').
  // Karşı dilin (pair) görselleri bu bilgiye göre korunur.
  primaryLang?: 'tr' | 'en';
};

type TreatmentSaveRequest = {
  tr?: LangPayload | null;
  en?: LangPayload | null;
  shared?: SharedPayload;
};

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body: TreatmentSaveRequest = await req.json();

    const { tr, en, shared = {} } = body;

    const sharedImg = shared.img ?? '';
    const sharedImages = Array.isArray(shared.images) ? shared.images : [];
    const published = shared.published ?? true;
    const sharedModified = Boolean(shared.isModified);
    // Hangi dil bu admin sayfasında asıl düzenlenen kayıt (primary)?
    // Belirtilmemişse (eski istemci/eski build) güvenli taraf: ikisini de primary
    // kabul et ki önceki davranış bozulmasın — ama normalde TreatmentForm bunu her zaman gönderir.
    const primaryLang = shared.primaryLang;

    // Pair (karşı dil) kaydının img/images alanı için: kendi mevcut görseli varsa
    // ASLA sharedImg/sharedImages ile ezilmez — sadece kendi görseli yoksa doldurulur.
    // Bu, "TR sayfasını kaydedince EN'in görselleri gidiyor / tam tersi" sorununu önler.
    function resolveImgFor(lang: 'tr' | 'en', existingImg: string | null | undefined) {
      const isPrimary = !primaryLang || primaryLang === lang;
      if (isPrimary) return sharedImg || existingImg || '';
      // Pair: kendi görseli varsa dokunma, yoksa doldur.
      return existingImg || sharedImg || '';
    }
    function resolveImagesFor(lang: 'tr' | 'en', existingImages: string[] | null | undefined) {
      const isPrimary = !primaryLang || primaryLang === lang;
      const existing = existingImages ?? [];
      if (isPrimary) return sharedImages.length > 0 ? sharedImages : existing;
      // Pair: kendi galerisi doluysa dokunma, boşsa doldur.
      return existing.length > 0 ? existing : sharedImages;
    }

    if ((!tr || !tr.title?.trim()) && (!en || !en.title?.trim())) {
      return NextResponse.json(
        { error: 'En az bir dil için tedavi başlığı zorunludur.' },
        { status: 400 }
      );
    }

    // Prisma Transaction: İki dil tek bir atomik işlemde kaydedilir.
    // Biri başarısız olursa ikisi de geri alınır (rollback).
    const result = await prisma.$transaction(async (tx) => {
      let savedTr: any = null;
      let savedEn: any = null;

      // ─── 1. TÜRKÇE KAYIT / GÜNCELLEME ─────────────────────────────────────
      if (tr && tr.title?.trim()) {
        const canonicalSlug = stripSlugSuffix(tr.slug || tr.title);

        if (tr.id) {
          // Mevcut kaydı önce oku — görsel alanları ve yayın durumunu korumak için
          const existing = await tx.treatment.findUnique({
            where: { id: tr.id },
            select: { img: true, images: true, published: true },
          });

          // TR bu sayfada pair (karşı dil) ise kendi görseli asla ezilmez, sadece boşsa doldurulur.
          const resolvedImg = resolveImgFor('tr', existing?.img);
          const resolvedImages = resolveImagesFor('tr', existing?.images as string[] | null);

          const trData = {
            title: tr.title.trim(),
            slug: canonicalSlug,
            category: tr.category ?? '',
            img: resolvedImg,
            images: resolvedImages,
            published,
            stats: tr.stats ?? [],
            desc: tr.desc ?? [],
            symptoms: tr.symptoms ?? [],
            treatment: tr.treatment ?? [],
            faq: tr.faq ?? [],
            lang: 'tr',
          };

          // Güncelleme senaryosu:
          // Eğer TR içeriği değiştirildiyse tam güncelle;
          // Değiştirilmediyse ama sadece ortak alanlar (görsel/yayın) değiştiyse metinlere DOKUNMA!
          if (tr.isModified) {
            savedTr = await tx.treatment.update({
              where: { id: tr.id },
              data: trData,
            });
          } else if (sharedModified || existing?.published !== published) {
            // Metin değişmedi ama görsel veya "Yayında" durumu değişti.
            // Yayın durumu tek bir checkbox ile yönetildiği için iki dile de yansıtılır.
            savedTr = await tx.treatment.update({
              where: { id: tr.id },
              data: { img: resolvedImg, images: resolvedImages, published },
            });
          } else {
            savedTr = await tx.treatment.findUnique({ where: { id: tr.id } });
          }
        } else {
          // Yeni TR kayıt oluşturma
          savedTr = await tx.treatment.create({
            data: {
              title: tr.title.trim(),
              slug: canonicalSlug,
              category: tr.category ?? '',
              img: sharedImg,
              images: sharedImages,
              published,
              stats: tr.stats ?? [],
              desc: tr.desc ?? [],
              symptoms: tr.symptoms ?? [],
              treatment: tr.treatment ?? [],
              faq: tr.faq ?? [],
              lang: 'tr',
            },
          });
        }
      }

      // ─── 2. İNGİLİZCE KAYIT / GÜNCELLEME ───────────────────────────────────
      if (en && en.title?.trim()) {
        const fallbackBaseSlug = tr ? stripSlugSuffix(tr.slug || tr.title) : 'treatment';
        const cleanEnBase = stripSlugSuffix(en.slug || fallbackBaseSlug);
        const enSlug = `${cleanEnBase}_en`;

        if (en.id) {
          // Mevcut kaydı önce oku — görselleri, yayın durumunu ve hasta verisini korumak için
          const existing = await tx.treatment.findUnique({
            where: { id: en.id },
            select: { img: true, images: true, treatment: true, published: true },
          });

          // EN bu sayfada pair (karşı dil) ise kendi görseli asla ezilmez, sadece boşsa doldurulur.
          const resolvedImg = resolveImgFor('en', existing?.img);
          const resolvedImages = resolveImagesFor('en', existing?.images as string[] | null);

          // EN treatment'ına TR'deki patients img'lerini merge et
          const mergedEnTreatment = mergePatientImages(
            en.treatment ?? [],
            savedTr?.treatment as any[] ?? tr?.treatment ?? []
          );

          // TR kaydı güncellendiğinde EN formunda metin değişikliği olmasa bile
          // yeni hasta fotoğraflarını EN kaydına yaz. Aksi halde merge sonucu
          // hesaplanıyor ancak en.isModified=false olduğu için DB'ye kaydedilmiyordu.
          const patientImagesChanged =
            JSON.stringify(existing?.treatment ?? []) !==
            JSON.stringify(mergedEnTreatment);

          const enData = {
            title: en.title.trim(),
            slug: enSlug,
            category: en.category ?? '',
            img: resolvedImg,
            images: resolvedImages,
            published,
            stats: en.stats ?? [],
            desc: en.desc ?? [],
            symptoms: en.symptoms ?? [],
            treatment: mergedEnTreatment,
            faq: en.faq ?? [],
            lang: 'en',
          };

          // Güncelleme senaryosu:
          // Eğer EN içeriği değiştirildiyse tam güncelle;
          // Değiştirilmediyse ama sadece ortak alanlar değiştiyse EN metinlerine DOKUNMA!
          if (en.isModified) {
            savedEn = await tx.treatment.update({
              where: { id: en.id },
              data: enData,
            });
          } else if (sharedModified || patientImagesChanged || existing?.published !== published) {
            // EN metinleri değişmedi; ama görsel, yayın durumu veya TR'den gelen
            // hasta fotoğrafları değişmiş olabilir. Sadece ilgili alanları yaz.
            savedEn = await tx.treatment.update({
              where: { id: en.id },
              data: {
                img: resolvedImg,
                images: resolvedImages,
                published,
                ...(patientImagesChanged ? { treatment: mergedEnTreatment } : {}),
              },
            });
          } else {
            savedEn = await tx.treatment.findUnique({ where: { id: en.id } });
          }
        } else {
          // Yeni EN kayıt oluşturma — TR'deki patients img'lerini merge et
          const newEnTreatment = mergePatientImages(
            en.treatment ?? [],
            savedTr?.treatment as any[] ?? tr?.treatment ?? []
          );

          savedEn = await tx.treatment.create({
            data: {
              title: en.title.trim(),
              slug: enSlug,
              category: en.category ?? '',
              img: sharedImg,
              images: sharedImages,
              published,
              stats: en.stats ?? [],
              desc: en.desc ?? [],
              symptoms: en.symptoms ?? [],
              treatment: newEnTreatment,
              faq: en.faq ?? [],
              lang: 'en',
            },
          });
        }
      }

      return { tr: savedTr, en: savedEn };
    });

    // Slug eşleşmesini ve DB haritasını güncelle + karşı dil (pair) kaydını al.
    // ÖNEMLİ DÜZELTME: Önceden sadece bu istekte GÖNDERİLEN dilin (tr/en) sayfası
    // revalidate ediliyordu. Admin sadece TR sekmesini kaydettiğinde (ör. EN
    // formu bu sayfada yüklenmemişse `en` payload'ı hiç gönderilmiyor) EN detay
    // sayfasının statik cache'i ASLA temizlenmiyordu ve EN tarafı değişene kadar
    // (24 saatlik revalidate süresine kadar) eski/bozuk haliyle kalabiliyordu.
    // Bu da kullanıcıya "TR'yi yayınlayınca EN gitti" gibi görünüyordu.
    // Artık karşı dil kaydı bulunursa onun sayfası da her zaman revalidate edilir.
    const primaryRecord = result.tr || result.en;
    let pairRecord: { id: number; slug: string; lang?: string | null } | null = null;
    if (primaryRecord) {
      pairRecord = await syncTreatmentPairSlugMap(primaryRecord).catch((err) => {
        console.error('[POST /api/admin/tedaviler/save] syncTreatmentPairSlugMap hatası:', err);
        return null;
      });
    }

    // Önbellek temizleme (Hem TR hem EN listeleri ve detayları)
    revalidateTag('treatment-detail', { expire: 0 });
    revalidateTag('treatment-slug-allowlist', { expire: 0 });
    revalidateTag('treatments-list', { expire: 0 });
    revalidatePath('/tedaviler');
    revalidatePath('/treatments');

    const trRecord =
      result.tr ?? (pairRecord && getTreatmentLanguage(pairRecord) === 'tr' ? pairRecord : null);
    const enRecord =
      result.en ?? (pairRecord && getTreatmentLanguage(pairRecord) === 'en' ? pairRecord : null);

    if (trRecord) {
      revalidatePath(`/tedaviler/${stripSlugSuffix(trRecord.slug)}`);
    }

    if (enRecord) {
      revalidatePath(`/treatments/${stripSlugSuffix(enRecord.slug)}`);
    }

    return NextResponse.json({
      ok: true,
      tr: result.tr,
      en: result.en,
    });
  } catch (e: any) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[POST /api/admin/tedaviler/save] Hata:', e);
    return NextResponse.json(
      { error: e?.message || 'Tedavi kaydedilirken hata oluştu.' },
      { status: 500 }
    );
  }
}