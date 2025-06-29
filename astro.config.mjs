import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt()],
  base: '/juansueldo.github.io/',
  site: 'https://juansueldo.dev/',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    routing:{
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    }
  },
})
