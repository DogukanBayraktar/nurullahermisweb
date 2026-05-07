import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export function getStaticContent(filename: string) {
  try {
    const filePath = path.join(CONTENT_PATH, filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading content file ${filename}:`, error);
    return null;
  }
}

export async function updateStaticContent(filename: string, content: any) {
  try {
    const filePath = path.join(CONTENT_PATH, filename);
    
    // Ensure directory exists
    if (!fs.existsSync(CONTENT_PATH)) {
      fs.mkdirSync(CONTENT_PATH, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error(`Error updating content file ${filename}:`, error);
    return { success: false, error: 'Failed to write file' };
  }
}
