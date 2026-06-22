import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

// In-memory cache
const memoryCache: Record<string, { data: any; cachedAt: number }> = {};
const CACHE_TTL = 86400 * 1000; // 24 saat

export async function getStaticContent(filename: string) {
  // Önce memory cache'e bak
  const cached = memoryCache[filename];
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
    return cached.data;
  }

  try {
    // 1. Try DB first
    const record = await prisma.siteContent.findUnique({
      where: { filename },
    });

    if (record) {
      memoryCache[filename] = { data: record.content, cachedAt: Date.now() };
      return record.content;
    }

    // 2. Fallback to filesystem (initial migration)
    const filePath = path.join(CONTENT_PATH, filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const content = JSON.parse(fileContent);
      
      try {
        await prisma.siteContent.upsert({
          where: { filename },
          update: { content },
          create: { filename, content },
        });
      } catch (dbError) {
        console.error(`Error migrating ${filename} to DB:`, dbError);
      }

      memoryCache[filename] = { data: content, cachedAt: Date.now() };
      return content;
    }

    return null;
  } catch (error) {
    console.error(`Error reading content ${filename}:`, error);
    return null;
  }
}

export async function updateStaticContent(filename: string, content: any) {
  try {
    await prisma.siteContent.upsert({
      where: { filename },
      update: { content },
      create: { filename, content },
    });

    // Admin değişiklik yapınca cache'i temizle
    delete memoryCache[filename];
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating content ${filename}:`, error);
    return { success: false, error: 'Database update failed' };
  }
}

