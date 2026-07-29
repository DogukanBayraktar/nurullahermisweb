// src/app/api/admin/saglik-rehberi/[id]/route.ts
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

type IdContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const article = await prisma.healthArticle.findUnique({ where: { id: Number(id) } });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const article = await prisma.healthArticle.update({
      where: { id: Number(id) },
      data: body,
    });

    // Slug'dan suffix'i temizleyerek canonical slug'ı bul
    const canonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const pairLang = article.lang === 'tr' ? 'en' : 'tr';

    // Slug değişmiş olabilir (örn. yanlış girilen bir EN slug düzeltilmiş
    // olabilir) — TR/EN eşini bulup articleSlugMap'i güncelle, aksi halde
    // eski/yanlış eşleme DB'de kalmaya devam eder.
    // NOT: TR ve EN slug'ları kasıtlı olarak FARKLI metinler olabilir, bu
    // yüzden "aynı canonical slug metnini içeren kayıt" araması yanlış
    // sonuç verir (hiç eşleşme bulamaz). Admin düzenleme sayfasındaki
    // mantıkla aynı şekilde, aynı `img` değerini paylaşan karşı-dil
    // kaydını buluyoruz.
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

    // Detay ve liste sayfalarının cache'ini temizle (hem data cache tag'i
    // hem route cache path'i)
    revalidateTag('health-article-detail', { expire: 0 });
    revalidateTag('health-article-slug-allowlist', { expire: 0 });
    revalidatePath(`/saglik-rehberi/${canonicalSlug}`);
    revalidatePath('/saglik-rehberi');
    revalidatePath(`/health-guide/${canonicalSlug}`);
    if (pairArticle) {
      revalidatePath(`/health-guide/${pairArticle.slug.replace(/_tr$/, '').replace(/_en$/, '')}`);
    }
    revalidatePath('/health-guide');

    return NextResponse.json(article);
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: IdContext) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.healthArticle.delete({ where: { id: Number(id) } });

    revalidateTag('health-article-detail', { expire: 0 });
    revalidateTag('health-article-slug-allowlist', { expire: 0 });
    revalidatePath('/saglik-rehberi');
    revalidatePath('/health-guide');

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Error && e.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}