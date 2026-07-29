import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateArticleSlugMapDb } from '@/lib/updateArticleSlugMap';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

/**
 * Tüm healthArticles'ları okuyup DB'deki articleSlugMap'i rebuild et
 * Admin Dashboard'dan tıklanabilir
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    // Tüm makaleleri oku
    const articles = await prisma.healthArticle.findMany();

    const pairedIds = new Set<number>();
    let updated = 0;

    // 1) Öncelikli eşleştirme: aynı `img` değerini paylaşan TR/EN kaydı bul.
    // TR ve EN slug'ları kasıtlı olarak farklı metinler olabileceği için
    // (örn. bel-fitigi-ameliyati_tr / lumbar-disc-surgery_en), pairing
    // için slug metnine değil, admin formunda ikisi için de ortak olan
    // `img` alanına güveniyoruz.
    const byImg = new Map<string, typeof articles>();
    articles.forEach((article) => {
      if (!article.img) return;
      if (!byImg.has(article.img)) byImg.set(article.img, []);
      byImg.get(article.img)!.push(article);
    });

    for (const group of byImg.values()) {
      const trArticle = group.find((a) => a.lang === 'tr');
      const enArticle = group.find((a) => a.lang === 'en');
      if (trArticle && enArticle) {
        await updateArticleSlugMapDb(trArticle.slug, enArticle.slug);
        pairedIds.add(trArticle.id);
        pairedIds.add(enArticle.id);
        updated++;
      }
    }

    // 2) Yedek eşleştirme: img eşleşmesiyle bulunamayan (örn. img boş
    // bırakılmış) kayıtlar için, aynı canonical slug metnini paylaşanları
    // eşleştir (bel-fitigi_tr / bel-fitigi_en gibi çevrilmemiş slug'lar).
    const remaining = articles.filter((a) => !pairedIds.has(a.id));
    const slugGroups = new Map<string, typeof articles>();
    remaining.forEach((article) => {
      const canonical = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
      if (!slugGroups.has(canonical)) {
        slugGroups.set(canonical, []);
      }
      slugGroups.get(canonical)!.push(article);
    });

    for (const group of slugGroups.values()) {
      const trArticle = group.find(a => a.slug.endsWith('_tr'));
      const enArticle = group.find(a => a.slug.endsWith('_en'));

      if (trArticle && enArticle) {
        await updateArticleSlugMapDb(trArticle.slug, enArticle.slug);
        updated++;
      }
    }

    return NextResponse.json(
      { message: `Harita güncellendi: ${updated} makale çifti`, updated },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
