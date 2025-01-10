---
title: retry429
sidebar:
  order: 3
  badge:
    text: β
---

```ts "retry429"
import { retry429, Rest, _channels_$_messages } from 'discord-hono'

const manyPosts = async () => {
  const rest = new Rest(token)
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
