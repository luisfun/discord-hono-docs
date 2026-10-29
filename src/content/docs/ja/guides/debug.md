---
title: デバッグ
description: Discord APIとの応答に関する基本的なデバッグ方法
sidebar:
  order: 4
---

## c.res* のデバッグ

`c.res`, `c.resModal`, `c.resAutocomplete`

```ts
return c.resModal(modal, async res => {
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

引数の最後に、コールバック関数を含めることで、`c.res` が[コールバックモード](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-callback)として動作する。  
コールバックモードにすることで、Discord API から `Response` を受け取ることができ、Discord への返信内容に誤りがあれば、容易に発見できる。

## c.followup のデバッグ

```ts
return c.resDefer(async c => {
  const res = await c.followup(data)
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

`c.followup` の場合、そのまま `Response` を受け取ることができる。  
