---
title: DiscordHono
sidebar:
  order: 1
---

```ts
// index.ts
import { DiscordHono, CommandHandlers } from 'discord-hono'

const handlers = new CommandHandlers().on('ping', c => c.resText('Pong!!'))

const app = new DiscordHono()
app.handlers(handlers)
export default app
```

## .handlers()

```ts
import { CommandHandlers, ComponentHandlers } from 'discord-hono'

const command = new CommandHandlers().on('ping', c => c.res(/*****/))
const component = new ComponentHandlers().on('button', c => c.res(/*****/))

app.handlers(command)
app.handlers(component)
```

Accept all `***Handlers`.

## .discordKey()

```ts
app.discordKey(env => ({
  APPLICATION_ID: env.YOUR_DISCORD_APPLICATION_ID,
  PUBLIC_KEY: env.YOUR_DISCORD_PUBLIC_KEY,
  TOKEN: env.YOUR_DISCORD_TOKEN,
}))
```

If you have the same setup as in [Example](https://github.com/LuisFun/discord-hono-example), this method is not used.  
This is used when you save the key with a different name, or in environments other than Cloudflare.

## .fetch()

Please refer [here](https://hono.dev/api/hono#fetch).  
We try to be as similar as possible to Hono's fetch().

## .scheduled()

If you use `export default app`, `.scheduled()` is included.
