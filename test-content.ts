import { getStaticContent } from './src/lib/content';

async function test() {
  console.log('Testing getStaticContent...');
  const homepage = await getStaticContent('homepage.json');
  console.log('Homepage content:', homepage ? 'Found' : 'Not Found');
  
  const about = await getStaticContent('about.json');
  console.log('About content:', about ? 'Found' : 'Not Found');
}

test().catch(console.error);
