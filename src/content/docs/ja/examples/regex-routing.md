---
title: 正規表現ルーティング
description: Discord Hono で正規表現で Key をルーティングする実例。
---

```ts
// index.ts
import type { ComponentHandler, ModalHandler } from 'discord-hono'
import { DiscordHono } from 'discord-hono'

class CustomMap<
  E extends Env,
  H extends ComponentHandler<E, any> | ModalHandler<E>,
> extends Map<string | RegExp, H> {
  override get = (key: string) => {
    if (super.has(key)) return super.get(key)!
    ///// your custom logic /////
    for (const [k, v] of this) if (k instanceof RegExp && k.test(key)) return v!
    ///// your custom logic /////
    if (super.has('')) return super.get('')!
    throw new Error('Handler is missing')
  }
}

const app = new DiscordHono()

app.component('', c => {
  const map = new CustomMap<Env, ComponentHandler<Env, any>>()

  map.set('string', c => c.res('string'))
  map.set(/regex/, c => c.res('regex'))
  map.set('', c => c.res('error'))

  return map.get(c.key)(c)
})

export default app
```

`CustomMap` のカスタムロジック部分を編集することで、正規表現以外のオリジナルの key を導入できるようになります。
