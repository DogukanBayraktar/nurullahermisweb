import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkRateLimit, getIpFromRequest } from '@/lib/rateLimit';

// Galeriye görsel VE video yüklemek için kullanılan client-upload endpoint'i.
// Görselden farklı olarak dosya, sunucu üzerinden GEÇMEDEN doğrudan tarayıcıdan
// Vercel Blob'a gönderiliyor (bu route sadece imzalı bir token üretiyor).
// Bu sayede Next.js/Vercel'in ~4.5MB'lık request body limiti videolar için
// bir sorun oluşturmuyor.

const ALLOWED_CONTENT_TYPES = [
  // Görseller
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  // Videolar
  'video/mp4',
  'video/webm',
  'video/quicktime', // .mov
];

const MAX_VIDEO_SIZE_BYTES = 200 * 1024 * 1024; // 200MB

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Sadece giriş yapmış admin kullanıcılar token alabilsin
        const session = await getServerSession(authOptions);
        if (!session) {
          throw new Error('Unauthorized');
        }

        const ip = getIpFromRequest(request);
        const rl = checkRateLimit(`gallery-media:${ip}`, { windowMs: 60_000, maxRequests: 20 });
        if (!rl.success) {
          throw new Error('Çok fazla istek. Lütfen bir dakika bekleyin.');
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_VIDEO_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Şu an ekstra bir işlem gerekmiyor; galeri kaydı GalleryForm
        // tarafından ayrıca /api/admin/gallery çağrısıyla oluşturuluyor.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Gallery media upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload başarısız.';
    const status = message === 'Unauthorized' ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
