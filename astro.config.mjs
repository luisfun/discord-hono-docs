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
            content: 'https://discord-hono.luis.fun/logo.webp',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/luisfun/discord-hono',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/KFAgHFwBsr',
        },
      ],

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
