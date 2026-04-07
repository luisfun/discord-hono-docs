---
title: Command type Message
description: How to create UI-based commands that are triggered by messages in Discord Hono
---

```ts
// handlers/repost.ts
import { Command } from 'discord-hono'
import { factory } from '../init.js'

export const command_repost = factory.command(
  // .type(3) specifies a message trigger
  new Command('repost').type(3),
  c => {
    return c.res(
      c.ref.messages?.[c.ref.target_id!]?.content || 'Error: not found',
    )
  },
)
```
