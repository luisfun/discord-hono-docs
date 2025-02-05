---
title: Embed
description: Guide on creating and customizing embedded messages in DiscordHono, including setting fields like title, description, image, video, and more.
sidebar:
  order: 5
---

```ts "Embed"
import { DiscordHono, Embed } from 'discord-hono'

const app = new DiscordHono().command('embed', c =>
  c.res({
    embeds: [new Embed().title('Title').description('description')],
  }),
)
```

## Method

```ts
const embed = new Embed()
  .title()
  .type()
  .description()
  .url()
  .timestamp()
  .color()
  .footer()
  .image()
  .thumbnail()
  .video()
  .provider()
  .author()
  .fields()
```

Please refer to the [Official Docs](https://discord.com/developers/docs/resources/message#embed-object).
