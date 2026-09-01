import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { syncArticlePairSlugMap } from '@/lib/updateArticleSlugMap';

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

    // Sadece TR makaleleri baz alıyoruz; her biri için karşı dildeki (EN)
    // eşini img'e göre buluyoruz. Slug metinlerinin aynı kelimelerden
    // oluştuğunu VARSAYMIYORUZ — EN slug gerçek İngilizce bir çeviri olabilir
    // (örn. TR: acl-cop-bag-ameliyati, EN: acl-anterior-cruciate-ligament-surgery).
    const trArticles = await prisma.healthArticle.findMany({ where: { lang: 'tr' } });

    let updated = 0;
    const alreadyPaired = new Set<number>();
    for (const trArticle of trArticles) {
      const enArticle = await syncArticlePairSlugMap(trArticle);
      if (enArticle && !alreadyPaired.has(trArticle.id)) {
        alreadyPaired.add(trArticle.id);
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