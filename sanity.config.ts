import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'tilleggsstonader-brev',

  projectId: 's0grjk9v',
  dataset: 'production',

  plugins: [deskTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
