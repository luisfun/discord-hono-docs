---
title: Command
description: Detailed guide on using the `Command` class in DiscordHono, including subcommands, options, and advanced configurations like localization, permissions, and autocomplete.
sidebar:
  order: 1
---

```ts "Command"
import { Command } from 'discord-hono'

const commands = [
  new Command('name', 'description'),
  new Command('ping', 'response pong'),
]
```

Check the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming) for the first argument (name) of `Command`.

## Method

```ts
const commands = [
  new Command('name', 'description')
    .id()
    .type(2) // 1,2,3 default 1 --- 1: CHAT_INPUT, 2: USER, 3: MESSAGE
    .application_id()
    .guild_id()
    .name_localizations()
    .description_localizations()
    .options(
      new Option('text', 'first text'),
      new Option('second', 'second text'),
    )
    .default_member_permissions()
    .dm_permission()
    .default_permission()
    .nsfw()
    .integration_types()
    .contexts()
    .version()
    .handler(),
]
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object).

## Subcommands

```ts
import { Command, SubGroup, SubCommand } from 'discord-hono'

const commands = [
  new Command('slash', 'slash description').options(
    new SubCommand('sub1', 'Subcommand 1'),
    new SubGroup('group', 'group description').options(
      new SubCommand('sub2', 'Subcommand 2'),
      new SubCommand('sub3', 'Subcommand 3'),
    ),
  ),
]
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups).

`SubCommand.options` can be set to the same `Command.options`.

## Options

```ts
import { Command, Option } from 'discord-hono'

type OptionType =
  | 'String'
  | 'Integer'
  | 'Number'
  | 'Boolean'
  | 'User'
  | 'Channel'
  | 'Role'
  | 'Mentionable'
  | 'Attachment'

const optionType: OptionType = 'Channel' // default: 'String'

const commands = [
  new Command('hello', 'response world').options(
    new Option('text', 'text input'), // String option
    new Option('channel', 'channel select', optionType), // Channel option
  ),
]
```

### Method

```ts
const commands = [
  new Command('ping', 'response pong').options(
    new Option('name', 'description')
      .name_localizations()
      .description_localizations()
      .required() // .required(true) = .required()
      .choices(
        { name: 'choice 1', value: 'string 1' },
        { name: 'choice 2', value: 'string 2' },
      ) // STRING, INTEGER, NUMBER
      .channel_types() // CHANNEL
      .min_value() // INTEGER, NUMBER
      .max_value() // INTEGER, NUMBER
      .min_length() // STRING
      .max_length() // STRING
      .autocomplete(), // STRING, INTEGER, NUMBER
  ),
]
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure).

Depending on the type of option, some fields (methods) cannot be used.
