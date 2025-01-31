---
title: retry429
description: Discord Hono における retry429 を使用したレート制限の処理に関するガイド。

sidebar:
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
