---
title: rest
sidebar:
  order: 2
  badge:
    text: β
---

**まだ、全てのREST APIに対応していません。**

初めに、こちらの[公式ドキュメント](https://discord.com/developers/docs/resources/channel#get-channel)を参照してください。

`rest` 関数の呼び出しと各エンドポイントには、ある程度関連性があります。

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
