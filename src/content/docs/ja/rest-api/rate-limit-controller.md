---
title: RateLimitController
sidebar:
  order: 3
  badge:
    text: β
---

```ts "controller"
import { RateLimitController, postMessage } from 'discord-hono'

const manyPosts = async () => {
  const controller = new RateLimitController()
  for (let i = 0; i < 1000; i++) {
    await controller.wait()
    controller.res = await postMessage(
      c.env.DISCORD_TOKEN,
      c.interaction.channel.id,
      `count: ${i}`,
    )
  }
}
```

## set/get: res

Response を入れる用です。

## get: headers

Response の X-Rate-Limit ヘッダーです。

## .wait()

いい感じに待機するようにします。将来の僕が
