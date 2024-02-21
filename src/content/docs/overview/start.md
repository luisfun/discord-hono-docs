---
title: Getting Started
sidebar:
  order: 1
---

You can start from [Workers](https://developers.cloudflare.com/workers/get-started/guide/) or clone an [Example](https://github.com/LuisFun/discord-hono-example).

## Install

```shell
npm i discord-hono
npm i -D discord-api-types # When using TypeScript
npm i -D dotenv # When using 'npm run register'
```

### Sample Code

```ts
// index.ts
import { DiscordHono, CommandHandlers } from 'discord-hono'

const handlers = new CommandHandlers()
  .on('ping', c => c.resText('Pong!!'))
  .on('image', c =>
    c.resDefer(async () => {
      const image = await fetch('https://luis.fun/images/hono.webp')
      const blob = new Blob([await image.arrayBuffer()])
      await c.followup(
        { content: c.values.text.toString() },
        { blob, name: 'image.webp' },
      )
    }),
  )

const app = new DiscordHono()
app.handlers(handlers)
export default app
```

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
