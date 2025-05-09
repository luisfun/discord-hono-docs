---
title: Context
description: Comprehensive guide on using context, interaction data, and response handling in DiscordHono, covering commands, components, modals, and cron jobs with various response methods.
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

### Regarding .var

```ts "var"
const app = new DiscordHono()
  .command('ping', c => c.res(c.var.OPTION_NAME))
  .component('button', c => c.res(c.var.custom_id))
  .modal('modal', c => c.res(c.var.custom_id + c.var.TEXTINPUT_CUSTOM_ID))
```

The following values are included by default.

- `c.var.OPTION_NAME` command option value (command, autocomplete)
- `c.var.custom_id` value of custom_id (component, modal)
- `c.var.TEXTINPUT_CUSTOM_ID` value of text input (modal)

## get: interaction

command, component, autocomplete, modal, cron

`c.interaction` = `JSON.parse(await c.req.text())`

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object).

### In case of CronContext

It has the controller value of the [scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) first argument.

## get: key

Handler triggered string.

## get: sub

command, autocomplete

```ts "sub.string" "sub.group" "sub.command"
const commands = [
  new Command('slash', 'slash description').options(
    new SubCommand('sub1', 'Subcommand 1'),
    new SubGroup('group', 'group description').options(
      new SubCommand('sub2', 'Subcommand 2').options(
        new Option('text', 'text'),
      ),
      new SubCommand('sub3', 'Subcommand 3'),
    ),
  ),
]
const app = new DiscordHono().command('slash', c => {
  switch (c.sub.string) {
    case 'sub1':
      return c.res('sub1')
    case 'group sub2':
      return c.res('g-sub2: ' + c.var.text)
    default:
      return c.res(c.sub.group + '-' + c.sub.command)
  }
})
```

The first argument of `SubGroup` is in `c.sub.group`.  
The first argument of `SubCommand` is in `c.sub.command`.  
`c.sub.string = (c.sub.group ? c.sub.group + ' ' : '') + c.sub.command`

## get: focused

autocomplete

```ts "focused"
const app = new DiscordHono().autocomplete('hello', c => {
  console.log(c.focused?.name) // option name
  console.log(c.focused?.value) // option value
  return c.resAutocomplete(...)
})
```

The optional object in focus.

[Official Docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure)

## get: rest

`c.rest` = `createRest(c.env.DISCORD_TOKEN)`  
[Rest](/interactions/rest/)

## .res()

command, component, modal

```ts "res"
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res({ content: 'World!!' }))
```

The first argument is a string or [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData).  
The second argument is FileData or FileData[].  
FileData = { blob: Blob, name: 'file.name' }

## .resDefer()

command, component, modal

```ts "resDefer"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(async c => await c.followup('Followup Text')),
)
```

If you don’t respond to a Discord interaction within 3 seconds, an error will occur.  
When performing time-consuming tasks, it’s a good idea to use `.resDefer()` and include the subsequent processing as an argument.

## .resAutocomplete()

autocomplete

```ts "resAutocomplete"
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

The argument is a Autocomplete instance or [APICommandAutocompleteInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10/interface/APICommandAutocompleteInteractionResponseCallbackData).

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

## .resActivity()

command, component, modal

```ts
const app = new DiscordHono().command('activity', c => c.resActivity())
```

Launch the Activity. (Only available for apps with Activities enabled)

## .update()

component

Changes `c.res()` and `c.resDefer()` to overwrite mode for sent messages.

```ts "update"
const app = new DiscordHono().component('button', c =>
  c.update().res('Update Text'),
)
```

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

The first argument is a string or [RESTPatchAPIInteractionOriginalResponseJSONBody](https://discord-api-types.dev/api/discord-api-types-v10#RESTPatchAPIWebhookWithTokenMessageJSONBody).  
The second argument is FileData or FileData[].  
FileData = { blob: Blob, name: 'file.name' }

Additionally, by leaving the arguments empty, you can delete the original message.

```ts
return c.update().resDefer(c => c.followup())
```

## .flags()

command, component, modal

```ts "flags"
const app = new DiscordHono()
app.command('ping', c =>
  c.flags('EPHEMERAL', 'SUPPRESS_NOTIFICATIONS').res('Pong!!'),
)
```

Adds the message flags from [here](https://discord.com/developers/docs/resources/message#message-object-message-flags).
