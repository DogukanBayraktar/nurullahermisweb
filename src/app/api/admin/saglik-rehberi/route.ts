import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateArticleSlugMapDb } from '@/lib/updateArticleSlugMap';

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

    const canonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const pairLang = article.lang === 'tr' ? 'en' : 'tr';

    // Yeni makale eklenince DB'deki articleSlugMap'i otomatik güncelle.
    // NOT: TR ve EN slug'ları kasıtlı olarak FARKLI metinler olabilir
    // (örn. bel-fitigi-ameliyati_tr / lumbar-disc-surgery_en), bu yüzden
    // eşi "aynı canonical slug metnini paylaşan kayıt" diye aramak yanlış
    // sonuç verir. Admin düzenleme sayfasındaki mantıkla aynı şekilde,
    // aynı `img` değerini paylaşan karşı-dil kaydını buluyoruz.
    const pairArticle = await prisma.healthArticle.findFirst({
      where: {
        lang: pairLang,
        OR: [
          { slug: `${canonicalSlug}_${pairLang}` },
          ...(article.img ? [{ img: article.img }] : []),
        ],
      },
    });

    if (pairArticle) {
      const trArticle = article.lang === 'tr' ? article : pairArticle;
      const enArticle = article.lang === 'en' ? article : pairArticle;
      await updateArticleSlugMapDb(trArticle.slug, enArticle.slug);
    }

    revalidateTag('health-article-slug-allowlist', { expire: 0 });
    revalidateTag('health-article-detail', { expire: 0 });
    revalidatePath(`/saglik-rehberi/${canonicalSlug}`);
    revalidatePath('/saglik-rehberi');
    revalidatePath(`/health-guide/${canonicalSlug}`);
    if (pairArticle) {
      revalidatePath(`/health-guide/${pairArticle.slug.replace(/_tr$/, '').replace(/_en$/, '')}`);
    }
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