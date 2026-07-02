import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// ÖNEMLİ: Bu dosya daha önce `src/proxy.ts` adıyla duruyordu.
// Next.js middleware'i SADECE proje kökünde (ya da src/ altında)
// `middleware.ts` adlı dosyadan okur — "proxy.ts" hiçbir zaman
// çalıştırılmıyordu. Sonuç olarak:
//   1) /admin altındaki auth guard (giriş yapmamış kullanıcıyı
//      /admin/login'e yönlendirme) hiç çalışmıyordu.
//   2) 'x-pathname' header'ı hiç set edilmiyordu (root layout'taki
//      headers() okuması zaten kaldırıldı, o yüzden buna artık ihtiyaç yok).
// Bu dosya, o mantığı + bot/kırık-link engellemeyi birleştirir ve doğru
// dosya adıyla (middleware.ts) gerçekten çalışır hale getirir.

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

export default async function middleware(req: NextRequest) {
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

  // 3) Admin auth guard (daha önce proxy.ts'de olup hiç çalışmayan kısım)
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req });

    if (pathname === '/admin/login' && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    if (pathname !== '/admin/login' && !token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // _next, statik dosyalar ve API route'ları hariç tüm sayfa isteklerinde
  // çalışsın; böylece hem bot/junk-path engelleme tüm public sayfalarda
  // hem de admin auth guard /admin altında etkili olur.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
