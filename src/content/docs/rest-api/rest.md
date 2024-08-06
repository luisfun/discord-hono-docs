---
title: Rest
sidebar:
  order: 2
  badge:
    text: β
---

```ts
// create-message.ts
import { Rest } from 'discord-hono'

await new Rest(token).post('/channels/{channel.id}/messages', [channel_id], {
  content: 'this is rest',
})
//await new Rest(token).method('Path of official docs', ['Variables in Path'], data)
```

For the first argument of method, copy the Path from the [official documentation](https://discord.com/developers/docs/resources/message#create-message) as is.  
The second argument is an array of variables enclosed in `{}` in the Path.  
The third and subsequent arguments are necessary data.

## Support

|                                                                          |     |
| ------------------------------------------------------------------------ | --- |
| [Application](https://discord.com/developers/docs/resources/application) | ✅  |
| [Messages](https://discord.com/developers/docs/resources/message)        | ✅  |
