// src/app/treatments/[slug]/page.tsx
// TR detay sayfasının İngilizce aynası. Veri katmanı (force-dynamic + DB'den
// her istekte okuma) src/app/tedaviler/[slug]/page.tsx içinde tanımlıdır.
// Burada da aynı route config'i tekrarlanır; aksi halde Next.js bu segmenti
// statik olarak ön-render etmeye çalışır ve eski/yanlış içerik önbelleğe donar.
import Page from '../../tedaviler/[slug]/page';
import { canonicalTreatmentSlug } from '@/lib/routes';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function EnglishTreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  return Page({
    params: Promise.resolve({
      slug: canonicalTreatmentSlug(resolved.slug),
      originalSlug: resolved.slug,
    }),
    language: 'en',
  });
}
