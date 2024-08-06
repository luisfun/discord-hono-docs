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
//await new Rest(token).method('公式ドキュメントのPath', ['Path内の変数'], data)
```

method の第一引数は[公式ドキュメント](https://discord.com/developers/docs/resources/message#create-message)の Path をそのままコピーしてください。  
第二引数は Path 内の `{}` で囲まれた変数部分を配列で入力してください。  
第三引数以降は、必要なデータです。

## 対応状況

|                                                                   |     |
| ----------------------------------------------------------------- | --- |
| [Messages](https://discord.com/developers/docs/resources/message) | ✅  |
