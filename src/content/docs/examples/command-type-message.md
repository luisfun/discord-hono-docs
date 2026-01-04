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
    // Type guard to narrow the type in TypeScript
    if (c.interaction.data.type !== 3) return c.res('Error: type mismatch')
    return c.res(
      c.interaction.data.resolved.messages[c.interaction.data.target_id]
        ?.content || 'Error: not found',
    )
  },
)
```
