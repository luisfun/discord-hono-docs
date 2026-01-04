---
title: Command type Message
description: Discord Hono でメッセージをトリガーとした、UIベースのコマンドを作成する方法
---

```ts
// handlers/repost.ts
import { Command } from 'discord-hono'
import { factory } from '../init.js'

export const command_repost = factory.command(
  // .type(3) でメッセージトリガーに指定する
  new Command('repost').type(3),
  c => {
    // TypeScript で型を絞り込むための if文
    if (c.interaction.data.type !== 3) return c.res('Error: type mismatch')
    return c.res(
      c.interaction.data.resolved.messages[c.interaction.data.target_id]
        ?.content || 'Error: not found',
    )
  },
)
```
