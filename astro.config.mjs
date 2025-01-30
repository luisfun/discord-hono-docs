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
              'https://media.discordapp.net/attachments/1334435768298504232/1334553904956047390/fire_3d.webp?ex=679cf3ad&is=679ba22d&hm=986ac3516f33f41dc9708f7b1895ef0ae43cd51effc4c090ac344de5a81b8fb6&=&format=webp',
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
