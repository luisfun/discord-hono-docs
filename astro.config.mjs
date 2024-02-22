import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Discord Hono',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        ja: {
          label: '日本語',
        },
      },
      social: {
        github: 'https://github.com/LuisFun/discord-hono',
      },
      sidebar: [
        {
          label: 'Overview',
          translations: { ja: '概要' },
          autogenerate: { directory: 'overview' },
        },
        {
          label: 'Interactions',
          autogenerate: { directory: 'interactions' },
        },
        {
          label: 'API Endpoint',
          translations: { ja: 'APIエンドポイント' },
          autogenerate: { directory: 'api-endpoint' },
        },
        {
          label: 'Builder',
          translations: { ja: 'ビルダー' },
          autogenerate: { directory: 'builder' },
        },
      ],
    }),
  ],
})
