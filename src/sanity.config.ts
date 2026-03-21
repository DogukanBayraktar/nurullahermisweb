import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity';

export default defineConfig({
  name: 'default',
  title: 'Prof. Dr. Nurullah Ermiş CMS',

  projectId: 'sg46eh28',
  dataset: 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
