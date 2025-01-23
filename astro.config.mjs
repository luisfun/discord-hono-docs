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
        github: 'https://github.com/luisfun/discord-hono',
        discord: 'https://discord.gg/KFAgHFwBsr',
      },
      sidebar: [
        {
          label: 'Guides',
          translations: { ja: 'ガイド' },
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Interactions',
          autogenerate: { directory: 'interactions' },
        },
        {
          label: 'Builders',
          translations: { ja: 'ビルダー' },
          autogenerate: { directory: 'builders' },
        },
        {
          label: 'Helpers',
          collapsed: true,
          translations: { ja: 'ヘルパー関数' },
          autogenerate: { directory: 'helpers' },
        },
        {
          label: 'Examples',
          collapsed: true,
          translations: { ja: 'コード例' },
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Migration Guides',
          collapsed: true,
          translations: { ja: '移行ガイド' },
          autogenerate: { directory: 'migration-guides' },
        },
      ],
    }),
  ],
})
