---
title: register
description: Discord Hono でコマンドを登録する方法のガイドです。グローバルに登録する方法や特定のギルドに登録する方法が含まれています。
sidebar:
  order: 1
---

```ts "register"
// register.ts
import { Command, Option, register } from 'discord-hono'

const commands = [
  new Command('ping', 'pong を返答'),
  new Command('image', '画像ファイルを返答').options(
    new Option('text', 'テキスト付で').required(),
  ),
]

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```

第4引数を指定すると、1つのguild（サーバー）に対して、即座にコマンドを登録します。  
第4引数に何も入れなければ、グローバルなコマンドを登録します。

## コマンドを全て削除する場合

```ts
register(
  [],
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```
