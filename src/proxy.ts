import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// NOT: Next.js 16'da middleware.ts dosya adı KALDIRILDI ve proxy.ts olarak
// değiştirildi (fonksiyon adı da `middleware` -> `proxy`). Bu proje zaten
// Next 16.2.0 kullandığı için doğru dosya adı budur.
// Ref: https://nextjs.org/docs/messages/middleware-to-proxy
//
// Bu dosya önceki haliyle (auth guard + x-pathname header set etme) zaten
// çalışıyordu; buraya ek olarak bilinen zararlı bot'ları ve yaygın
// otomatik-tarama path'lerini erken engelleyen bir katman eklendi.
// 'x-pathname' header'ı artık root layout'ta okunmuyor (headers() kaldırıldı,
// bkz. src/app/layout.tsx) ama başka bir yerde ihtiyaç olursa diye
// zararsız olduğu için bırakıldı.

// Bilinen zararlı/agresif scraper ve saldırı bot'ları. Google/Bing/sosyal
// medya önizleme botları (SEO için gerekli) burada BİLEREK yok.
const BLOCKED_BOT_PATTERNS = [
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /serpstatbot/i,
  /python-requests/i,
  /scrapy/i,
  /curl\//i,
  /libwww-perl/i,
  /go-http-client/i,
  /masscan/i,
  /nikto/i,
  /sqlmap/i,
];

// Sık karşılaşılan, sitede hiç var olmamış path taramaları (WordPress/PHP
// vb. otomatik zafiyet tarayıcıları). Bunlara Prisma/DB'ye hiç gitmeden
// erken 404 dönerek gereksiz cold-start + sorgu yükünü engelliyoruz.
const KNOWN_JUNK_PATH_PATTERNS = [
  /^\/wp-(admin|login|content|includes)/i,
  /\.(php|env|git|aws)($|\/)/i,
  /^\/xmlrpc\.php/i,
  /^\/\.well-known\/(?!.*(acme-challenge|security\.txt))/i,
];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get('user-agent') ?? '';

  // 1) Bilinen kötü/agresif bot'ları tüm sitede engelle
  if (BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2) Sitede hiç var olmayan, yaygın otomatik tarama path'lerini erken 404'le
  if (KNOWN_JUNK_PATH_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const token = await getToken({ req });

  // Giriş yapmış kullanıcıyı login sayfasından dashboard'a yönlendir
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Eğer kullanıcı /admin sayfalarına gitmeye çalışıyorsa ve giriş yapmamışsa
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // _next, statik dosyalar ve API route'ları hariç tüm sayfa isteklerinde
  // çalışsın; böylece hem bot/junk-path engelleme tüm public sayfalarda
  // hem de admin auth guard /admin altında etkili olur.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
