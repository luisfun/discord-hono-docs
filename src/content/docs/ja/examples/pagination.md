---
title: ページネーション
description: Discord Hono でページネーションを実装する例で、ページ間を移動するためのボタンを含み、動的なページコンテンツのためのコマンドとコンポーネントのコンテキスト処理も含まれています。
---

```ts
// index.ts
import { Button, Components, DiscordHono, Embed } from 'discord-hono'

type Env = {
  Variables: {
    content?: string
  }
}

const pageContent = (
  c: CommandContext<Env> | ComponentContext<Env, 'Button'>,
  page: number,
  content: string,
) => {
  ///// Process /////
  const db = c.env.DB
  ///// Response Build /////
  const maxPage = 3
  const embed = new Embed()
    .title('Title')
    .description(`${content}\nPage: ${page}`)
  const components = new Components().row(
    new Button('page', ['⬅️', 'Previous'])
      .custom_id(JSON.stringify([page - 1, content]))
      .disabled(page <= 1),
    new Button('page', ['➡️', 'Next'])
      .custom_id(JSON.stringify([page + 1, content]))
      .disabled(maxPage <= page),
  )
  return { embeds: [embed], components }
}

const app = new DiscordHono<Env>()
  .command('page', c => c.res(pageContent(c, 1, c.var.content)))
  .component('page', c => {
    const arr: [number, string] = JSON.parse(c.var.custom_id ?? '')
    return c.resUpdate(pageContent(c, ...arr))
  })

export default app
```

```ts
// register.ts
const commands = [
  new Command('page', 'pagination').options(
    new Option('content', 'page content').required(),
  ),
]
```
