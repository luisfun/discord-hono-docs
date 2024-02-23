---
title: register
sidebar:
  order: 1
---

```ts
// register.ts
import dotenv from 'dotenv'
import process from 'node:process'
import { Command, Option, register } from 'discord-hono'

dotenv.config({ path: '.dev.vars' })

const commands = [
  new Command('ping', 'response pong'),
  new Command('image', 'response image file').options(
    new Option('text', 'with text').required(),
  ),
]

await register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```

第4引数を指定すると、1つのguild（サーバー）に対して、即座にコマンドを登録します。  
第4引数に何も入れなければ、グローバルなコマンドを登録します。
