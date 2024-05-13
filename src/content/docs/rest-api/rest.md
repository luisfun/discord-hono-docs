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

## List of REST API and corresponding methods

<!-- prettier-ignore -->
|||||||
|---|---|---|---|---|---|
|.channels()|.get()||||[📑](https://discord.com/developers/docs/resources/channel#get-channel)|
|^|.delete()||||[📑](https://discord.com/developers/docs/resources/channel#deleteclose-channel)|
|^|.messages()|.get()|||[📑](https://discord.com/developers/docs/resources/channel#get-channel-messages) [📑](https://discord.com/developers/docs/resources/channel#get-channel-message)|
|^|^|.post()|||[📑](https://discord.com/developers/docs/resources/channel#create-message)|
|^|^|.patch()|||[📑](https://discord.com/developers/docs/resources/channel#edit-message)|
|^|^|.delete()|||[📑](https://discord.com/developers/docs/resources/channel#delete-message)|
|^|^|.crosspost()|.post()||[📑](https://discord.com/developers/docs/resources/channel#crosspost-message)|
|^|^|.reactions()|.get()||[📑](https://discord.com/developers/docs/resources/channel#get-reactions)|
|^|^|^|.delete()||[📑](https://discord.com/developers/docs/resources/channel#delete-all-reactions) [📑](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji)|
|^|^|^|.me()|.put()|[📑](https://discord.com/developers/docs/resources/channel#create-reaction)|
|^|^|^|^|.delete()|[📑](https://discord.com/developers/docs/resources/channel#delete-own-reaction)|
|^|^|^|.user()|.delete()|[📑](https://discord.com/developers/docs/resources/channel#delete-user-reaction)|
