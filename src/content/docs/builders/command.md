---
title: Command
description: Guide to creating commands in DiscordHono, including subcommands, options, and advanced settings like localization, permissions, and autocomplete.
sidebar:
  order: 1
---

## Overview

```ts
import {
  // Commands
  makeSlashCommand,
  makeUserCommand,
  makeMessageCommand,
  makeEntryPointCommand,
  // Subcommands
  makeSubCommand,
  makeSubCommandGroup,
  // Options
  makeStringOption,
  makeIntegerOption,
  makeBooleanOption,
  makeUserOption,
  makeChannelOption,
  makeRoleOption,
  makeMentionableOption,
  makeNumberOption,
  makeAttachmentOption,
} from 'discord-hono'
```

## Commands

```ts "makeSlashCommand"
import { makeSlashCommand } from 'discord-hono'

const commands = [
  makeSlashCommand('name', 'description'),
  makeSlashCommand('ping', 'Respond with pong'),
]
```

For the first argument, check the [official documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming) about command name rules.

`makeUserCommand`, `makeMessageCommand`, and `makeEntryPointCommand` can be created in the same way.  
The second argument `description` is not required for these command types.

### Methods

```ts ".description" ".options"
makeSlashCommand('name', 'description').description('Override').options([])
```

If your editor supports autocompletion, typing `.` will show the available methods.

For full details, see the [official documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object).

## Subcommands

```ts "makeSubCommand" "makeSubCommandGroup"
import {
  makeSlashCommand,
  makeSubCommand,
  makeSubCommandGroup,
} from 'discord-hono'

const commands = [
  makeSlashCommand('slash', 'slash description').options([
    makeSubCommand('sub1', 'Subcommand 1'),
    makeSubCommandGroup('group', 'Subcommand group description').options([
      makeSubCommand('sub2', 'Subcommand 2'),
      makeSubCommand('sub3', 'Subcommand 3'),
    ]),
  ]),
]
```

For some restrictions and rules, see the [official documentation](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups).

`makeSubCommand.options` can accept the same values as `makeSlashCommand.options`.

## Options

```ts ".options" "makeStringOption" "makeChannelOption"
import {
  makeSlashCommand,
  makeStringOption,
  makeChannelOption,
} from 'discord-hono'

const commands = [
  makeSlashCommand('hello', 'Respond with world').options([
    makeStringOption('text', 'Text input').required(true),
    makeChannelOption('channel', 'Channel selection').channel_types([0]),
  ]),
]
```

Similar to commands, typing `.` in your editor can show the available methods for the option object.

For full details, see the [official documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure).

### Reading input data

```ts "c.var" "string_op" "channel_op"
import {
  makeSlashCommand,
  makeSubCommand,
  makeStringOption,
  makeChannelOption,
} from 'discord-hono'
import { factory } from '../init'

export const command_slash = factory.command(
  makeSlashCommand('slash', 'Slash command').options([
    makeSubCommand('sub', 'Subcommand').options([
      makeStringOption('string_op', 'String option').required(true),
      makeChannelOption('channel_op', 'Channel option').channel_types([0]),
    ]),
  ]),
  c => {
    const channel = c.ref.channels?.[c.var.channel_op ?? '']
    return c.res(
      `- ${c.var.string_op}\n- ${channel?.name}\n- <#${channel?.id}>`,
    )
  },
)
```
