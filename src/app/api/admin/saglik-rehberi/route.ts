import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateArticleSlugMapJson } from '@/lib/updateArticleSlugMap';

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
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const article = await prisma.healthArticle.create({ data: body });

    const canonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
    
    // Yeni makale eklenince articleSlugMap.json'u otomatik güncelle
    // TR ve EN pair'larını bulup mapa ekle
    const relatedArticles = await prisma.healthArticle.findMany({
      where: {
        OR: [
          { slug: { contains: canonicalSlug } },
        ],
      },
    });
    
    const trArticle = relatedArticles.find(a => a.slug.endsWith('_tr'));
    const enArticle = relatedArticles.find(a => a.slug.endsWith('_en'));
    
    if (trArticle && enArticle) {
      await updateArticleSlugMapJson(trArticle.slug, enArticle.slug);
    }

    revalidatePath(`/saglik-rehberi/${canonicalSlug}`);
    revalidatePath('/saglik-rehberi');
    revalidatePath(`/health-guide/${canonicalSlug}`);
    revalidatePath('/health-guide');

    return NextResponse.json(article, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}