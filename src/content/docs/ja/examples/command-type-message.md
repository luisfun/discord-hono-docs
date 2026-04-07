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
    return c.res(
      c.ref.messages?.[c.ref.target_id!]?.content || 'Error: not found',
    )
  },
)
```
