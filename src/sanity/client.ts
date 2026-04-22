import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'sg46eh28',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = createImageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
