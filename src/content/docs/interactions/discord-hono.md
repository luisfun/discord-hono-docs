---
title: DiscordHono
sidebar:
  order: 1
---

```ts
// index.ts
import { DiscordHono } from 'discord-hono'
import { commands, handlers } from './other-files'

const app = new DiscordHono()
app.commands(commands)
app.handlers(handlers)
export default app
```

## .commands()

```ts
import { Command } from 'discord-hono'

const commands = [new Command('ping', 'response pong')]

app.commands(commands)
```

Works even if not used.  
`c.values` just can't be used.

## .handlers()

```ts
import { CommandHandlers } from 'discord-hono'

const handlers = new CommandHandlers().on('ping', c => c.resText('Pong!!'))

app.handlers(handlers)
```

Accept all `***Handlers`.

## .discordKey()

```ts
const handler = env => ({
  APPLICATION_ID: env.YOUR_DISCORD_APPLICATION_ID
  PUBLIC_KEY: env.YOUR_DISCORD_PUBLIC_KEY
  TOKEN: env.YOUR_DISCORD_TOKEN
})

app.discordKey(handler)
```

If you have the same setup as in [Example](https://github.com/LuisFun/discord-hono-example), this method is not used.
