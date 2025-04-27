---
title: DiscordHono
description: A detailed guide on using DiscordHono for creating Discord bots, including commands, components, autocomplete, modals, cron jobs, and custom configurations.
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

Specifying `''` as the first argument functions as a catch-all pattern.

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
  .component('button-1', c => c.update().res('Button clicked'))
  .component('button-2', c => c.update().res('Second clicked'))
```

The first argument of the component element `Button()` must match the first argument of `.component()`.  
The second argument of the matched `.component()` is executed.

Specifying `''` as the first argument functions as a catch-all pattern.

## .autocomplete()

```ts /autocomplete(?!')/ "hello"
const commands = [
  new Command('hello', 'command').options(
    new Option('option', 'selector').autocomplete().required(),
  ),
]
const app = new DiscordHono().autocomplete(
  'hello',
  c =>
    c.resAutocomplete(
      new Autocomplete(c.focused?.value).choices(
        { name: 'world', value: 'world!!!' },
        { name: 'hi', value: 'hi!' },
      ),
    ),
  c => c.res(c.var.option),
)
```

Add `.autocomplete()` to `Option()` of the command.  
The first argument of `Command()` must match the first argument of `.autocomplete()`.  
The second argument of the matched `.autocomplete()` is the handler for choice generation, and the third argument is the handler for execution.

The third argument of `.autocomplete()` is the same as the second argument of `.command()`.

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

Specifying `''` as the first argument functions as a catch-all pattern.

## .cron()

```ts "cron" "0 0 * * *"
const app = new DiscordHono()
  .cron('0 0 * * *', async c => {
    await c.rest.post(_channels_$_messages, ['CHANNEL_ID'], {
      content: 'Daily Post',
    })
  })
  .cron('', async c => {
    await c.rest.post(_channels_$_messages, ['CHANNEL_ID'], {
      content: 'Other Cron Triggers Post',
    })
  })
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

Specifying `''` as the first argument functions as a catch-all pattern.

## .fetch()

Please refer to [here](https://hono.dev/api/hono#fetch).  
We try to be as similar as possible to Hono's fetch().

## .scheduled()

If you use `export default app`, `.scheduled()` is included.

## Init Options

### verify

If it's a Cloudflare environment, there's no need to use it.

[`discord-interactions`](https://github.com/discord/discord-interactions-js)

```ts
import { verifyKey } from 'discord-interactions'
const app = new DiscordHono({ verify: verifyKey })
```

[`discord-verify`](https://github.com/ianmitchell/interaction-kit/tree/main/packages/discord-verify)

```ts
import { verify, PlatformAlgorithm } from 'discord-verify'
const app = new DiscordHono({
  verify: (...args) =>
    verify(...args, crypto.webcrypto.subtle, PlatformAlgorithm.OldNode),
})
```

### discordEnv

If it's an environment variable similar to [Example](https://github.com/luisfun/discord-hono-example), there's no need to use it.  
Use it when you save the environment variable with a different name or when it's an environment other than Cloudflare.

```ts
const app = new DiscordHono({
  discordEnv: env => ({
    APPLICATION_ID: env.DISCORD_APPLICATION_ID,
    PUBLIC_KEY: env.DISCORD_PUBLIC_KEY,
    TOKEN: env.DISCORD_TOKEN,
  }),
})
```
