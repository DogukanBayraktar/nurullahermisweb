// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? '';

export const hasDatabaseUrl = connectionString.length > 0;

const adapter = new PrismaPg({
  connectionString,
  max: 3,
  idleTimeoutMillis: 10_000, // 10 sn boşta kalan bağlantıyı kapat
  connectionTimeoutMillis: 5_000,
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
