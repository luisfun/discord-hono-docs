---
title: Debugging
description: Basic techniques for debugging responses to the Discord API
sidebar:
  order: 4
---

## Debugging `c.res*` Methods

`c.res`, `c.resModal`, `c.resAutocomplete`

```ts
return c.resModal(modal, async res => {
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

Pass a callback function as the final argument to a `c.res*` method to use [callback mode](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-callback).  
In callback mode, you can inspect the `Response` returned by the Discord API, making it easier to identify issues with your response.

## Debugging `c.followup`

```ts
return c.resDefer(async c => {
  const res = await c.followup(data)
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

With `c.followup`, you can inspect the returned `Response` directly.
