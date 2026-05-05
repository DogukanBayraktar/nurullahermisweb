import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Admin layout'unun Navbar/Footer'ı gizleyebilmesi için pathname header'ı ekle
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
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
  matcher: ['/admin/:path*'],
};