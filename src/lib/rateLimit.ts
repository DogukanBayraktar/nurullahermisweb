/**
 * src/lib/rateLimit.ts
 *
 * Basit in-memory rate limiter.
 * Vercel serverless'ta her instance ayrı memory kullandığından
 * production'da Redis tabanlı çözüm daha iyi olur;
 * ancak bu bile brute-force'u önemli ölçüde zorlaştırır.
 */

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

// IP başına istek sayısı takibi
const store = new Map<string, RateLimitEntry>();

// Eski kayıtları temizle (bellek sızıntısını önle)
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) {
            store.delete(key);
        }
    }
}, 60_000); // Her dakika temizle

interface RateLimitOptions {
    /** Zaman penceresi (ms). Default: 60 saniye */
    windowMs?: number;
    /** Pencerede maksimum istek sayısı. Default: 10 */
    maxRequests?: number;
}

interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetAt: number;
}

/**
 * @param identifier - IP adresi veya kullanıcı ID'si
 * @param options - Pencere süresi ve limit
 */
export function checkRateLimit(
    identifier: string,
    options: RateLimitOptions = {}
): RateLimitResult {
    const { windowMs = 60_000, maxRequests = 10 } = options;
    const now = Date.now();

    const existing = store.get(identifier);

    // Pencere dolmuşsa sıfırla
    if (!existing || existing.resetAt < now) {
        const entry: RateLimitEntry = {
            count: 1,
            resetAt: now + windowMs,
        };
        store.set(identifier, entry);
        return { success: true, remaining: maxRequests - 1, resetAt: entry.resetAt };
    }

    // Limit aşıldı
    if (existing.count >= maxRequests) {
        return { success: false, remaining: 0, resetAt: existing.resetAt };
    }

    // Sayacı artır
    existing.count += 1;
    return {
        success: true,
        remaining: maxRequests - existing.count,
        resetAt: existing.resetAt,
    };
}

/**
 * Next.js Request'ten IP adresini al
 */
export function getIpFromRequest(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') ?? 'unknown';
}