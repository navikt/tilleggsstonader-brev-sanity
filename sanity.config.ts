import { AuthConfig, defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemas'

const auth: AuthConfig = {
  redirectOnSingle: true,
  providers: () => [
    {
      name: 'saml',
      title: 'NAV SSO',
      url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/f3270b37',
      logo: '/static/navlogo.svg',
    },
  ],
  loginMethod: 'dual',
};

export default defineConfig({
  name: 'default',
  title: 'tilleggsstonader-brev',

  projectId: 's0grjk9v',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  auth: auth
})
