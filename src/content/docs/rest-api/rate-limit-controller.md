---
title: ApiRateLimitController
sidebar:
  order: 3
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

Set the Response.

## get: headers

Response X-Rate-Limit headers.

## .wait()

I will make sure that my future self operates nicely.
