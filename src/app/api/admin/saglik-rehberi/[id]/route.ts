// src/app/api/admin/saglik-rehberi/[id]/route.ts
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
    const before = await prisma.healthArticle.findUnique({ where: { id: Number(id) } });
    const oldOwnCanonicalSlug = before?.slug.replace(/_tr$/, '').replace(/_en$/, '');

    const article = await prisma.healthArticle.update({
      where: { id: Number(id) },
      data: body,
    });

    // Slug değişmiş olabilir (örn. baştan Türkçe kalmış bir EN slug artık
    // gerçek İngilizce bir metinle düzeltilmiş olabilir — bu durumda TR ve
    // EN slug'lar metinsel olarak birbirine benzemez). Bu yüzden eşi
    // slug metnine bakarak DEĞİL, img alanına göre buluyoruz
    // (bkz. lib/updateArticleSlugMap.ts) — aksi halde eski/yanlış eşleme
    // DB'de kalmaya devam eder ve articleSlugMap hiç güncellenmez.
    const pair = await syncArticlePairSlugMap(article);

    const ownCanonicalSlug = article.slug.replace(/_tr$/, '').replace(/_en$/, '');
    const trSlug = article.lang === 'tr' ? ownCanonicalSlug : pair?.slug.replace(/_tr$/, '');
    const enSlug = article.lang === 'en' ? ownCanonicalSlug : pair?.slug.replace(/_en$/, '');

    // Detay ve liste sayfalarının cache'ini temizle (hem data cache tag'i
    // hem route cache path'i). Slug değiştiyse eski path'i de temizle ki
    // eski URL'de bayat/kırık bir statik sayfa asılı kalmasın.
    revalidateTag('health-article-detail', { expire: 0 });
    revalidateTag('health-article-slug-allowlist', { expire: 0 });
    if (trSlug) revalidatePath(`/saglik-rehberi/${trSlug}`);
    revalidatePath('/saglik-rehberi');
    if (enSlug) revalidatePath(`/health-guide/${enSlug}`);
    revalidatePath('/health-guide');
    if (oldOwnCanonicalSlug && oldOwnCanonicalSlug !== ownCanonicalSlug) {
      revalidatePath(
        before?.lang === 'en'
          ? `/health-guide/${oldOwnCanonicalSlug}`
          : `/saglik-rehberi/${oldOwnCanonicalSlug}`
      );
    }

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