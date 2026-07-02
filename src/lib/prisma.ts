// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? '';

export const hasDatabaseUrl = connectionString.length > 0;

/**
 * SSL yapılandırması env üzerinden kontrol edilir; kodda hardcoded bir
 * sslmode YOK. Sebebi: connection string'e `?sslmode=verify-full` eklemek
 * tek başına yeterli değildir — `verify-full`, sunucunun sertifikasını
 * doğrulamak için bir CA sertifikası ister (pg bunu `ssl.ca` alanından
 * bekler). CA sertifikası verilmeden verify-full'a geçilirse bağlantı
 * "self signed certificate" / "unable to verify the first certificate"
 * hatasıyla tamamen kopar (sadece warning değil).
 *
 * Kullanım:
 *  - Varsayılan: `sslmode=require` (Vercel Postgres, Supabase, Neon gibi
 *    managed sağlayıcıların pooler bağlantıları için yeterli ve önerilen
 *    davranış; şifreli bağlantı sağlar ama sertifika zincirini doğrulamaz).
 *  - Tam doğrulamalı (`verify-full`) bağlantı istiyorsanız iki env
 *    değişkeni tanımlayın:
 *      DB_SSL_MODE=verify-full
 *      DB_SSL_CA=<PEM formatında CA sertifikası içeriği>
 *    Bu ikisi birlikte tanımlı değilse otomatik olarak require moduna
 *    (rejectUnauthorized: false) düşülür; tek başına DB_SSL_MODE=verify-full
 *    yazıp CA vermemek, bağlantıyı build/deploy anında kırar.
 */
function resolveSslConfig(): { rejectUnauthorized: boolean; ca?: string } | undefined {
  if (!connectionString) return undefined;

  // Bağlantı zaten sslmode=disable içeriyorsa (örn. lokal geliştirme),
  // ekstra ssl objesi göndermeyip pg/connection string'in kendi haline
  // bırakıyoruz.
  if (/sslmode=disable/i.test(connectionString)) return undefined;

  const sslMode = process.env.DB_SSL_MODE ?? 'require';
  const ca = process.env.DB_SSL_CA;

  if (sslMode === 'verify-full') {
    if (!ca) {
      console.warn(
        '[prisma] DB_SSL_MODE=verify-full ayarlı ama DB_SSL_CA tanımlı değil. ' +
          'CA sertifikası olmadan verify-full bağlantı kesin olarak başarısız olur; ' +
          "güvenli tarafta kalmak için 'require' moduna (rejectUnauthorized: false) düşülüyor."
      );
      return { rejectUnauthorized: false };
    }
    return { rejectUnauthorized: true, ca };
  }

  // Varsayılan: şifreli ama sertifika doğrulamasız (managed Postgres
  // sağlayıcılarının çoğunda beklenen davranış)
  return { rejectUnauthorized: false };
}

const adapter = new PrismaPg({
  connectionString,
  max: 3,
  idleTimeoutMillis: 10_000, // 10 sn boşta kalan bağlantıyı kapat
  connectionTimeoutMillis: 5_000,
  ssl: resolveSslConfig(),
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

globalForPrisma.prisma = prisma;
