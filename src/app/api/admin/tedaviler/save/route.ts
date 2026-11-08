// src/app/api/admin/tedaviler/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripSlugSuffix, syncTreatmentPairSlugMap } from '@/lib/updateTreatmentSlugMap';

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

    const img = shared.img ?? '';
    const images = Array.isArray(shared.images) ? shared.images : [];
    const published = shared.published ?? true;
    const sharedModified = Boolean(shared.isModified);

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
        const trData = {
          title: tr.title.trim(),
          slug: canonicalSlug,
          category: tr.category ?? '',
          img,
          images,
          published,
          stats: tr.stats ?? [],
          desc: tr.desc ?? [],
          symptoms: tr.symptoms ?? [],
          treatment: tr.treatment ?? [],
          faq: tr.faq ?? [],
          lang: 'tr',
        };

        if (tr.id) {
          // Güncelleme senaryosu:
          // Eğer TR içeriği değiştirildiyse tam güncelle;
          // Değiştirilmediyse ama sadece ortak alanlar (görsel/yayın) değiştiyse metinlere DOKUNMA!
          if (tr.isModified) {
            savedTr = await tx.treatment.update({
              where: { id: tr.id },
              data: trData,
            });
          } else if (sharedModified) {
            savedTr = await tx.treatment.update({
              where: { id: tr.id },
              data: { img, images, published },
            });
          } else {
            savedTr = await tx.treatment.findUnique({ where: { id: tr.id } });
          }
        } else {
          // Yeni TR kayıt oluşturma
          savedTr = await tx.treatment.create({
            data: trData,
          });
        }
      }

      // ─── 2. İNGİLİZCE KAYIT / GÜNCELLEME ───────────────────────────────────
      if (en && en.title?.trim()) {
        const fallbackBaseSlug = tr ? stripSlugSuffix(tr.slug || tr.title) : 'treatment';
        const cleanEnBase = stripSlugSuffix(en.slug || fallbackBaseSlug);
        const enSlug = `${cleanEnBase}_en`;

        const enData = {
          title: en.title.trim(),
          slug: enSlug,
          category: en.category ?? '',
          img,
          images,
          published,
          stats: en.stats ?? [],
          desc: en.desc ?? [],
          symptoms: en.symptoms ?? [],
          treatment: en.treatment ?? [],
          faq: en.faq ?? [],
          lang: 'en',
        };

        if (en.id) {
          // Güncelleme senaryosu:
          // Eğer EN içeriği değiştirildiyse tam güncelle;
          // Değiştirilmediyse ama sadece ortak alanlar değiştiyse EN metinlerine DOKUNMA!
          if (en.isModified) {
            savedEn = await tx.treatment.update({
              where: { id: en.id },
              data: enData,
            });
          } else if (sharedModified) {
            savedEn = await tx.treatment.update({
              where: { id: en.id },
              data: { img, images, published },
            });
          } else {
            savedEn = await tx.treatment.findUnique({ where: { id: en.id } });
          }
        } else {
          // Yeni EN kayıt oluşturma
          savedEn = await tx.treatment.create({
            data: enData,
          });
        }
      }

      return { tr: savedTr, en: savedEn };
    });

    // Slug eşleşmesini ve DB haritasını asenkron güncelle
    const primaryRecord = result.tr || result.en;
    if (primaryRecord) {
      await syncTreatmentPairSlugMap(primaryRecord).catch(console.error);
    }

    // Önbellek temizleme (Hem TR hem EN listeleri ve detayları)
    revalidateTag('treatment-detail', { expire: 0 });
    revalidateTag('treatment-slug-allowlist', { expire: 0 });
    revalidatePath('/tedaviler');
    revalidatePath('/treatments');

    if (result.tr) {
      const trSlug = stripSlugSuffix(result.tr.slug);
      revalidatePath(`/tedaviler/${trSlug}`);
    }

    if (result.en) {
      const enSlug = stripSlugSuffix(result.en.slug);
      revalidatePath(`/treatments/${enSlug}`);
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

