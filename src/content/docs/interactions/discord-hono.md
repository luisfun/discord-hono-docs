---
title: DiscordHono
sidebar:
  order: 1
---

```ts "DiscordHono"
import { DiscordHono } from 'discord-hono'

const app = new DiscordHono()
app.command('ping', c => c.res('Pong!!'))

export default app
```

## .command()

```ts /command(?!s)/ "ping" "image"
const commands = [
  new Command('ping', 'response Pong'),
  new Command('image', 'response Image'),
]
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('image', c => c.res('Image!!'))
```

The first argument of `Command()` must match the first argument of `.command()`.  
The second argument of the matched `.command()` is executed.

## .component()

```ts /component(?!s)/ "button-1" "button-2"
const app = new DiscordHono()
  .command('components', c =>
    c.res({
      content: 'No button clicked yet',
      components: new Components().row(
        new Button('button-1', 'Button'),
        new Button('button-2', 'Second'),
      ),
    }),
  )
  .component('button-1', c => c.resUpdate('Button clicked'))
  .component('button-2', c => c.resUpdate('Second clicked'))
```

The first argument of the component element `Button()` must match the first argument of `.component()`.  
The second argument of the matched `.component()` is executed.

## .modal()

```ts /modal(?!')/ "modal-1"
const app = new DiscordHono()
  .command('modal', c =>
    c.resModal(
      new Modal('modal-1', 'Modal Title')
        .row(new TextInput('text-1', 'Text'))
        .row(new TextInput('text-2', 'Second')),
    ),
  )
  .modal('modal-1', c => c.res('Modal submitted'))
```

The first argument of `Modal()` must match the first argument of `.modal()`.  
The second argument of the matched `.modal()` is executed.

## .cron()

```ts "cron" "0 0 * * *"
const app = new DiscordHono()
  .cron('0 0 * * *', async c =>
    postMessage(c.env.DISCORD_TOKEN, 'CHANNEL_ID', 'Daily Post'),
  )
  .cron('', async c =>
    postMessage(c.env.DISCORD_TOKEN, 'CHANNEL_ID', 'Other Cron Triggers Post'),
  )
```

```toml "0 0 * * *"
// wrangler.toml
name = "example"
main = "src/index.ts"
compatibility_date = "2024-02-08"
[triggers]
crons = [ "0 * * * *", "0 0 * * *" ]
```

The first argument of `.cron()` must match the toml file crons.  
The second argument of the matched `.cron()` is executed.

If `''` is specified, it matches all remaining crons.  
If you do not need to separate processing by crons, you can specify only `''`.

## .discordKey()

```ts "discordKey"
app.discordKey(env => ({
  APPLICATION_ID: env.YOUR_DISCORD_APPLICATION_ID,
  PUBLIC_KEY: env.YOUR_DISCORD_PUBLIC_KEY,
  TOKEN: env.YOUR_DISCORD_TOKEN,
}))
```

If you have the same setup as in [Example](https://github.com/luisfun/discord-hono-example), this method is not used.  
This is used when you save the key with a different name, or in environments other than Cloudflare.

## .fetch()

Please refer to [here](https://hono.dev/api/hono#fetch).  
We try to be as similar as possible to Hono's fetch().

## .scheduled()

If you use `export default app`, `.scheduled()` is included.

## Init Options

```ts
import { verifyKey } from 'discord-interactions'
const app = new DiscordHono({ verify: verifyKey })
```

Option to use `verifyKey` of `discord-interactions`.  
If you are in a cloudflare workers environment, you do not need to use it.
