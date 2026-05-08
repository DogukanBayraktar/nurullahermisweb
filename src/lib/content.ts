import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export async function getStaticContent(filename: string) {
  try {
    // 1. Try DB first
    const record = await prisma.siteContent.findUnique({
      where: { filename },
    });

    if (record) {
      return record.content;
    }

    // 2. Fallback to filesystem (initial migration)
    const filePath = path.join(CONTENT_PATH, filename);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const content = JSON.parse(fileContent);
      
      // Seed DB with this content so it works in production
      try {
        await prisma.siteContent.upsert({
          where: { filename },
          update: { content },
          create: { filename, content },
        });
      } catch (dbError) {
        console.error(`Error migrating ${filename} to DB:`, dbError);
      }
      
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
    // Save to Database only (Production-safe)
    await prisma.siteContent.upsert({
      where: { filename },
      update: { content },
      create: { filename, content },
    });
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating content ${filename}:`, error);
    return { success: false, error: 'Database update failed' };
  }
}

