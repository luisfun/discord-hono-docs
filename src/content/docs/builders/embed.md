---
title: Embed
description: A guide to creating and customizing embed messages in Discord Hono, including how to set fields like title, description, image, video, and more.
sidebar:
  order: 5
---

## Available Builders

```ts
import {
  // Main
  makeEmbed,
  // Child
  makeEmbedFooter,
  makeEmbedImage,
  makeEmbedVideo,
  makeEmbedProvider,
  makeEmbedAuthor,
  makeEmbedField,
} from 'discord-hono'
```

## Embed

```ts "makeEmbed"
import { DiscordHono, makeEmbed } from 'discord-hono'

const app = new DiscordHono().command('embed', c =>
  c.res({
    embeds: [makeEmbed().title('Title').description('Content')],
  }),
)
```

If your editor supports autocompletion, typing `.` will show a list of available methods.

For details on each method, please refer to the [Official Docs](https://docs.discord.com/developers/resources/message#embed-object).
