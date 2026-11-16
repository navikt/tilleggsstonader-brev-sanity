import { defineCliConfig } from 'sanity/cli';

import { DATASETT, PROSJEKT_ID } from './src/utils/datasett';

export default defineCliConfig({
  api: {
    projectId: PROSJEKT_ID,
    dataset: DATASETT,
  },
  deployment: {
    appId: 'e6f32e6a48b1d1e2c8202543',
  },
});
