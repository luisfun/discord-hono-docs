---
title: rest
sidebar:
  order: 2
  badge:
    text: β
---

**We have not yet implemented all the REST APIs.**

First, please refer to this [official docs](https://discord.com/developers/docs/resources/channel#get-channel).

There is a certain degree of relevance between the `rest` function call and each endpoint.

```ts
// get-channel.ts
// GET: /channels/{channel.id}
const { result } = await rest('token').channels('channel.id').get()
```

```ts
// create-message.ts
// POST: /channels/{channel.id}/messages
await rest('token').channels('channel.id').messages().post(messageData)
```

```ts
// create-reaction.ts
// PUT: /channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me
await rest('token')
  .channels('channel.id')
  .messages('message.id')
  .reactions('emoji')
  .me()
  .put()
```

```ts
// METHOD: /CATEGORY/{CATEGORY_ID}/SUB/{SUB_ID}
rest('token').CATEGORY('CATEGORY_ID').SUB('SUB_ID').METHOD('data or null')
```
