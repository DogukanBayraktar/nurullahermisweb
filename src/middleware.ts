import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Eğer kullanıcı /admin sayfalarına gitmeye çalışıyorsa ve giriş yapmamışsa
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !token) {
    // Manuel yönlendirme yaparak callbackUrl parametresinden kurtuluyoruz
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Admin layout'u için pathname bilgisini header'a ekle
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};