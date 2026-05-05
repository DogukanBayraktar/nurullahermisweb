import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateArticleSlugMapJson } from '@/lib/updateArticleSlugMap';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

/**
 * Tüm healthArticles'ları okuyup articleSlugMap.json'u rebuild et
 * Admin Dashboard'dan tıklanabilir
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    // Tüm makaleleri oku
    const articles = await prisma.healthArticle.findMany();

    // Canonical slug'a göre grup'la (bel-fitigi → bel-fitigi_tr, bel-fitigi_en)
    const slugGroups = new Map<string, typeof articles>();
    articles.forEach((article) => {
      const canonical = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
      if (!slugGroups.has(canonical)) {
        slugGroups.set(canonical, []);
      }
      slugGroups.get(canonical)!.push(article);
    });

    // Her grup'ta TR ve EN var mı kontrol etme
    let updated = 0;
    for (const group of slugGroups.values()) {
      const trArticle = group.find(a => a.slug.endsWith('_tr'));
      const enArticle = group.find(a => a.slug.endsWith('_en'));

      if (trArticle && enArticle) {
        await updateArticleSlugMapJson(trArticle.slug, enArticle.slug);
        updated++;
      }
    }

    return NextResponse.json(
      { message: `Harita güncellendi: ${updated} makale çifti`, updated },
      { status: 200 }
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
