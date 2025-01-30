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
              'https://cdn.discordapp.com/attachments/1331897779169263710/1334551787331522600/fire_3d_-_Copy.webp?ex=679cf1b4&is=679ba034&hm=0e7035c0b1141a6547df1985dee6641ef1c5cc9cd5dd939c85ade2440df79f8c&',
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
