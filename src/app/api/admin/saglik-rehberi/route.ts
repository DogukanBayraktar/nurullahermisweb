import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { syncArticlePairSlugMap } from '@/lib/updateArticleSlugMap';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'tr';
    const articles = await prisma.healthArticle.findMany({
      where: { lang },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(articles);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const article = await prisma.healthArticle.create({ data: body });

    // Yeni makale eklenince DB'deki articleSlugMap'i otomatik güncelle.
    // EN slug, TR slug'dan farklı (gerçek İngilizce) bir metin olsa bile
    // img alanına göre doğru eşi bulur (bkz. lib/updateArticleSlugMap.ts).
    const pair = await syncArticlePairSlugMap(article);
    const trArticle = article.lang === 'tr' ? article : pair;
    const enArticle = article.lang === 'en' ? article : pair;
    const trSlug = trArticle?.slug.replace(/_tr$/, '');
    const enSlug = enArticle?.slug.replace(/_en$/, '');

    revalidateTag('health-article-slug-allowlist', { expire: 0 });
    revalidateTag('health-article-detail', { expire: 0 });
    if (trSlug) revalidatePath(`/saglik-rehberi/${trSlug}`);
    revalidatePath('/saglik-rehberi');
    if (enSlug) revalidatePath(`/health-guide/${enSlug}`);
    revalidatePath('/health-guide');

    return NextResponse.json(article, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}