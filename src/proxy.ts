import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        if (pathname === '/admin/login') return true;
        if (pathname.startsWith('/admin')) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  // Sadece /admin altındaki tüm rotaları yakala
  // Sitenin mevcut i18n/routing mantığına dokunmaz
  matcher: ['/admin/:path*'],
};
