---
title: Poll
description: Discord Hono における投票の作成とカスタマイズに関するガイドです。質問、回答などのフィールドの設定方法を含みます。
sidebar:
  order: 6
---

## 一覧

```ts
import {
  // Main
  makePoll,
  // Child
  makePollMedia,
  makePollAnswer,
} from 'discord-hono'
```

## Poll

```ts "Poll"
import { DiscordHono, makePoll } from 'discord-hono'

const app = new DiscordHono().command('poll', c =>
  c.res({
    poll: makePoll('好きな色は？', [['🔴', '赤'], ['🟢', '緑'], '青', '黄'])
      .allow_multiselect(true)
      .duration(1),
  }),
)
```

IDEが対応していれば、`.` を打つと候補となるメソッド一覧をみれます。

メソッドの内容は[公式ドキュメント](https://docs.discord.com/developers/resources/poll)を参照してください。
