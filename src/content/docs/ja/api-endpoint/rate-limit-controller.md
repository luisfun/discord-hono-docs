---
title: ApiRateLimitController
sidebar:
  order: 2
  badge:
    text: β
---

```ts "controller"
import { ApiRateLimitController, postMessage } from 'discord-hono'

const manyPosts = async () => {
  const controller = new ApiRateLimitController()
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
