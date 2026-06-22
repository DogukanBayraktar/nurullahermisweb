// src/app/health-guide/page.tsx
import Page from '../saglik-rehberi/page';

export const revalidate = 86400;

export default function EnHealthGuidePage() {
  return Page({ lang: 'en' });
}