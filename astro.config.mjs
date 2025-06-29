import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt()],
  site: 'https://juansueldo.dev/',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    routing:{
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    }
  },
})
