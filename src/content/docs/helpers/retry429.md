---
title: retry429
description: Guide on handling rate-limiting with retry429 in DiscordHono.
sidebar:
  badge:
    text: β
---

```ts "retry429"
import { retry429, createRest, _channels_$_messages } from 'discord-hono'

const manyPosts = async () => {
  const rest = createRest(token)
  for (let i = 0; i < 1000; i++) {
    await retry429(
      () =>
        rest.post(_channels_$_messages, [channel_id], {
          content: 'this is rest',
        }),
      3,
      5000,
    )
  }
}
```
