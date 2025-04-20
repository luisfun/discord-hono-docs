---
title: Pagination
description: Example of implementing pagination in DiscordHono with buttons for navigating between pages, including handling command and component context for dynamic page content.
---

```ts
// index.ts
import { type CommandContext, type ComponentContext, Button, Components, DiscordHono, Embed } from 'discord-hono'

type Env = {
  Variables: {
    content?: string
  }
}

const pageContent = (
  c: CommandContext<Env> | ComponentContext<Env, Button>,
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
