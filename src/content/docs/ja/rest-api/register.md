---
title: register
sidebar:
  order: 1
---

```ts "register"
// register.ts
import { config } from 'dotenv'
import { env } from 'node:process'
import { Command, Option, register } from 'discord-hono'
config({ path: '.dev.vars' })

const commands = [
  new Command('ping', 'pong を返答'),
  new Command('image', '画像ファイルを返答').options(
    new Option('text', 'テキスト付で').required(),
  ),
]

register(
  commands,
  env.DISCORD_APPLICATION_ID,
  env.DISCORD_TOKEN,
  //env.DISCORD_TEST_GUILD_ID,
)
```

第4引数を指定すると、1つのguild（サーバー）に対して、即座にコマンドを登録します。  
第4引数に何も入れなければ、グローバルなコマンドを登録します。
