import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkRateLimit, getIpFromRequest } from '@/lib/rateLimit';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];

export async function POST(request: Request): Promise<NextResponse> {
  // Auth kontrolü
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: Admin başına dakikada max 20 upload
  const ip = getIpFromRequest(request);
  const rl = checkRateLimit(`upload:${ip}`, { windowMs: 60_000, maxRequests: 20 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Çok fazla istek. Lütfen bir dakika bekleyin.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json({ error: 'Missing filename or body' }, { status: 400 });
  }

  // Uzantı kontrolü
  const ext = '.' + filename.split('.').pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: `Geçersiz dosya uzantısı. İzin verilenler: ${ALLOWED_EXTENSIONS.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Boyut kontrolü
    if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Dosya boyutu 4MB'dan büyük olamaz." },
        { status: 400 }
      );
    }

    // Magic bytes ile gerçek MIME kontrolü
    const detectedMime = detectMimeFromBuffer(buffer);
    if (!detectedMime || !ALLOWED_MIME_TYPES.includes(detectedMime)) {
      return NextResponse.json(
        { error: 'Geçersiz dosya tipi. Yalnızca resim dosyaları yüklenebilir.' },
        { status: 400 }
      );
    }

    // Güvenli dosya adı (path traversal önlemi)
    const safeName = filename
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/\.{2,}/g, '.')
      .toLowerCase();

    const blob = await put(safeName, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: detectedMime,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload başarısız.' }, { status: 500 });
  }
}

function detectMimeFromBuffer(buffer: Buffer): string | null {
  if (buffer.length < 4) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return 'image/png';
  }
  // GIF: 47 49 46 38
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return 'image/gif';
  }
  // WebP: RIFF....WEBP
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer.length >= 12 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return 'image/webp';
  }
  // AVIF: ftyp box
  if (
    buffer.length >= 12 &&
    buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70
  ) {
    const brand = buffer.slice(8, 12).toString('ascii');
    if (brand.startsWith('avif') || brand.startsWith('avis')) return 'image/avif';
  }

  return null;
}