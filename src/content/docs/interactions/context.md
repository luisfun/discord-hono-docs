---
title: Context
sidebar:
  order: 2
---

```ts /(?<=\s)c/
import { DiscordHono } from 'discord-hono'

const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res('world!!'))
```

Context can be received as the second argument of `app.command()`, `app.component()`, `app.modal()`, `app.cron()`.

## .env .event .executionCtx .set() .get() .var

Please refer to [here](https://hono.dev/api/context).  
We try to make it as similar to Hono as possible.

## get: req

command, component, modal

Interaction Request are included as is.

## get: interaction

command, component, modal

`c.interaction` = `JSON.parse(await c.req.text())`

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object).

## get: values

command modal

```ts "values"
const app = new DiscordHono()
  .command('ping', c => c.res(c.values.OPTION_NAME))
  .modal('modal', c => c.res(c.values.TEXTINPUT_CUSTOM_ID))
```

It contains the value of the command option.  
In the case of a modal, it contains the string of the custom_id.

## get: cronEvent

cron

```ts "cronEvent"
const app = new DiscordHono().cron('', c => console.log(c.cronEvent.cron))
```

It has the event value of the [scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) first argument.

## .resBase()

command, component, modal

```ts "resBase"
const app = new DiscordHono().command('ping', c =>
  c.resBase({ type: 4, data: { content: 'Response Text' } }),
)
```

The argument is [APIInteractionResponse](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponse).  
Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure).

## .res()

command, component, modal

```ts "res"
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res({ content: 'World!!' }))
```

The argument is a string or [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData).

## .resDefer()

command, component, modal

```ts "resDefer"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(async c => await c.followup('Followup Text')),
)
```

If you don’t respond to a Discord interaction within 3 seconds, an error will occur.  
When performing time-consuming tasks, it’s a good idea to use `.resDefer()` and include the subsequent processing as an argument.

## .followup()

command, component, modal

```ts "followup"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(
    async c =>
      await c.followup('Followup Text or Data', {
        blob: Blob,
        name: 'image-blob.png',
      }),
  ),
)
```

`.followup()` is used to update messages after Defer.

The first argument is a string or [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData).  
The second argument is FileData or FileData[].  
FileData = { blob: Blob, name: 'file.name' }

## .followupDelete()

command, component, modal

## .resModal()

command, component

```ts "resModal"
const app = new DiscordHono().command('ping', c =>
  c.resModal(
    new Modal('unique-id', 'Title').row(new TextInput('text-id', 'Label')),
  ),
)
```

The argument is a Modal instance or [APIModalInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10/interface/APIModalInteractionResponseCallbackData).

## .resUpdate()

component

```ts "resUpdate"
const app = new DiscordHono().component('button', c =>
  c.resUpdate('text or data'),
)
```

Overwrites a message that has already been sent.

The argument is a string or [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData).

## .resUpdateDefer()

component

```ts "resUpdateDefer"
const app = new DiscordHono().component('button', c =>
  c.resUpdateDefer(async c => await c.followup('Followup Text')),
)
```

Delay overwriting messages.

## .resRepost()

component

```ts "resRepost"
const app = new DiscordHono().component('button', c =>
  c.resRepost('Repost Text'),
)
```

Delete the original interaction post and post a new message.

The argument is a string or [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData).  
If the argument is empty, only deletion is performed.

## .\*\*\*Ephemeral()

.resEphemeral() .resRepostEphemeral()

Send a message that is only visible to the user who performed the interaction.
