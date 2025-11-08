import { defineConfig } from '@tanstack/start/config'

export default defineConfig({
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
})

