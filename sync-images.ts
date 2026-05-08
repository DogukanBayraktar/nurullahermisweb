import { prisma } from './src/lib/prisma';
import fs from 'fs';
import path from 'path';

async function forceSync() {
  const filePath = path.join(process.cwd(), 'content', 'homepage.json');
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  console.log('Force Syncing corrected image paths...');
  
  await prisma.siteContent.upsert({
    where: { filename: 'homepage.json' },
    update: { content: content },
    create: { filename: 'homepage.json', content: content },
  });
  
  console.log('Successfully updated DB with corrected paths.');
}

forceSync().catch(console.error);
