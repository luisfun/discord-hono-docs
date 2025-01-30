import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  site: 'https://discord-hono.luis.fun/',
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
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content:
              'https://cdn.discordapp.com/attachments/1334435768298504232/1334516218044092489/fire_3d_-_Copy.webp?ex=679cd094&is=679b7f14&hm=5ecdf34e51cd93714e863654309a3c7bdec67f5500b3e35944d2aad5f84aa5e3&',
          },
        },
      ],
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
