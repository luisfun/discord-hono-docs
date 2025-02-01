---
title: register
description: A guide to registering commands in DiscordHono, including how to register them globally or to a specific guild.
sidebar:
  order: 1
---

```ts "register"
// register.ts
import { Command, Option, register } from 'discord-hono'

const commands = [
  new Command('ping', 'response pong'),
  new Command('image', 'response image file').options(
    new Option('text', 'with text').required(),
  ),
]

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```

When you specify the fourth argument, it registers a command to a single guild (server) immediately.  
If you do not specify the fourth argument, it can be registered globally.

## To delete all commands

```ts
register(
  [],
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```
