'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  // basePath can also be passed as a prop for consistency
  return <NextStudio config={config} />;
}
