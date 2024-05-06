---
title: register
sidebar:
  order: 1
---

```ts "register"
// register.ts
import { config } from 'dotenv'
import { env } from 'node:process'
import { Command, Option, register } from 'discord-hono'
config({ path: '.dev.vars' })

const commands = [
  new Command('ping', 'response pong'),
  new Command('image', 'response image file').options(
    new Option('text', 'with text').required(),
  ),
]

register(
  commands,
  env.DISCORD_APPLICATION_ID,
  env.DISCORD_TOKEN,
  //env.DISCORD_TEST_GUILD_ID,
)
```

When you specify the fourth argument, it registers a command to a single guild (server) immediately.  
If you do not specify the fourth argument, it can be registered globally.
