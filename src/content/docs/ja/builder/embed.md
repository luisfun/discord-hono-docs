---
title: Embed
sidebar:
  order: 4
---

```ts "Embed"
import { DiscordHono, Embed } from 'discord-hono'

const app = new DiscordHono().command('embed', c =>
  c.res({
    embeds: [new Embed().title('タイトル').description('内容')],
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

[公式ドキュメント](https://discord.com/developers/docs/resources/message#embed-object)を参照してください。
