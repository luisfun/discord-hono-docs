---
title: デバッグ
description: Discord APIへの応答をデバッグする基本的な方法
sidebar:
  order: 4
---

## `c.res*` メソッドのデバッグ

`c.res`, `c.resModal`, `c.resAutocomplete`

```ts
return c.resModal(modal, async res => {
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

`c.res*` メソッドの最後の引数にコールバック関数を渡すと、[コールバックモード](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-callback)で動作する。  
コールバックモードでは、Discord API から返される `Response` を確認できるため、応答内容に問題がないか調べやすくなる。

## `c.followup` のデバッグ

```ts
return c.resDefer(async c => {
  const res = await c.followup(data)
  const log = await inspectResponse(res)
  console.log(log.text)
})
```

`c.followup` では、返される `Response` を直接確認できる。  
