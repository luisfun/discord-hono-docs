---
title: Embed
description: Discord Hono における埋め込みメッセージの作成とカスタマイズに関するガイドです。タイトル、説明、画像、動画などのフィールドの設定方法を含みます。
sidebar:
  order: 5
---

## 一覧

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
    embeds: [makeEmbed().title('タイトル').description('内容')],
  }),
)
```

IDEが対応していれば、`.` を打つと候補となるメソッド一覧をみれます。

メソッドの内容は[公式ドキュメント](https://docs.discord.com/developers/resources/message#embed-object)を参照してください。
