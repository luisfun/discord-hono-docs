---
title: Handlers
sidebar:
  order: 3
---

CommandHandlers, ComponentHandlers, ModalHandlers, CronHandlers

```ts
// index.ts
import {
  CommandHandlers,
  ComponentHandlers,
  ModalHandlers,
  CronHandlers,
} from 'discord-hono'

const handlers = new CommandHandlers().on('ping', c => c.resText('Pong!!'))

const app = new DiscordHono()
app.handlers(handlers)
export default app
```

## Method

```ts
import { Command, Option } from 'discord-hono'

const commands = [
  new Command('ping', 'response pong')
    .id()
    .type(2) // 1,2,3 default 1 --- 1: CHAT_INPUT, 2: USER, 3: MESSAGE
    .application_id()
    .guild_id()
    .name_localizations()
    .description_localizations()
    .options(
      new Option('text', 'response text'),
      new Option('second', 'second text'),
    )
    .default_member_permissions()
    .dm_permission()
    .nsfw()
    .version(),
]
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object).

## Option

```ts
import {
  Command,
  Option,
  SubOption,
  SubGroupOption,
  NumberOption,
  BooleanOption,
  UserOption,
  ChannelOption,
  RoleOption,
  MentionableOption,
  AttachmentOption,
} from 'discord-hono'

const commands = [
  new Command('ping', 'response pong').options(
    new Option('text', 'response text'),
    new Option('second', 'second text'),
  ),
]
```

Option is string option.

### Method

```ts
import { Command, Option } from 'discord-hono'

const commands = [
  new Command('ping', 'response pong').options(
    new Option('text', 'response text')
      .name_localizations()
      .description_localizations()
      .required() // .required(true) = .required()
      .choices(
        { name: 'choice 1', value: 'string 1' },
        { name: 'choice 2', value: 'string 2' },
      )
      .min_length()
      .max_length()
      .autocomplete(),
  ),
]
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure).
