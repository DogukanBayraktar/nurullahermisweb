import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkRateLimit, getIpFromRequest } from '@/lib/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

const handler = NextAuth(authOptions);

// Login denemelerini rate limit ile koru
export async function POST(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Sadece credentials login endpoint'ine uygula
    if (pathname.includes('/api/auth/callback/credentials')) {
        const ip = getIpFromRequest(req);
        const rl = checkRateLimit(`login:${ip}`, {
            windowMs: 15 * 60_000, // 15 dakika
            maxRequests: 10,        // 15 dakikada max 10 deneme
        });

        if (!rl.success) {
            return NextResponse.json(
                { error: 'Çok fazla giriş denemesi. 15 dakika bekleyin.' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
                    },
                }
            );
        }
    }

    return handler(req as any, {} as any);
}

export { handler as GET };