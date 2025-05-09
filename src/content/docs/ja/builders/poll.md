---
title: Poll
description: Discord Hono における投票の作成とカスタマイズに関するガイドです。質問、回答などのフィールドの設定方法を含みます。
sidebar:
  order: 6
---

```ts "Poll"
import { DiscordHono, Poll } from 'discord-hono'

const app = new DiscordHono().command('poll', c =>
  c.res({
    poll: new Poll()
      .question('好きな色は？')
      .answers(['🔴', '赤'], ['🟢', '緑'], '青', '黄'),
  }),
)
```

## Method

```ts
const poll = new Poll()
  .question()
  .tyanswerse()
  .duration()
  .allow_multiselect()
  .layout_type()
```

[公式ドキュメント](https://discord.com/developers/docs/resources/poll)を参照してください。
