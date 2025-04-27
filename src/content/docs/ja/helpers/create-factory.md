---
title: createFactory
description: Discord Hono における createFactory を使用したファイル分割のガイドです。複数のファイルにわたるコマンド、コンポーネント、ページネーションロジックの構造化例を含みます。
---

`createFactory` はコマンド毎のファイル分割を補助する関数です。

```ts "createFactory"
// src/init.ts
import { createFactory } from 'discord-hono'

export type Env = {
  Bindings: {
    DB: any
  }
}

export const factory = createFactory<Env>()
```

```ts "factory"
// src/index.ts
import * as handlers from './handlers'
import { factory } from './init'

export default factory.discord().loader(Object.values(handlers))
```

```ts
// src/register.ts
// src/register.ts
import { register } from 'discord-hono'
import * as handlers from './handlers/index.js'
import { factory } from './init.js'

register(
  factory.getCommands(Object.values(handlers)),
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```

```ts
// src/handlers/index.ts
export * from './hello-world.js'
export * from './help.js'
```

```ts "factory"
// src/handlers/hello-world.ts
import { Command } from 'discord-hono'
import { factory } from '../init.js'

export const command_hello = factory.command(
  new Command('hello', 'response world'),
  c => c.res('world'),
)
```

```ts "factory"
// src/handlers/help.ts
import { Command, Option, Components, Button } from 'discord-hono'
import { factory } from '../init.js'

type Var = { text?: string }

export const command_help = factory.command<Var>(
  new Command('help', 'response help').options(new Option('text', 'with text')),
  c =>
    c.res({
      content: `text: ${c.var.text}`,
      components: new Components().row(
        new Button('https://discord-hono.luis.fun', ['📑', 'Docs'], 'Link'),
        component_delete.component,
      ),
    }),
)

export const component_delete = factory.component(
  new Button('delete', ['🗑️', 'Delete'], 'Secondary'),
  c => c.resDeferUpdate(c.followupDelete),
)
```

## component 要素を使い回すとき

上書き後に `.toJSON()` でオブジェクトにしてください。

```ts "component_page.component" ".toJSON()"
// src/handlers/pagination.ts
import {
  Button,
  Command,
  type CommandContext,
  type ComponentContext,
  Components,
  Embed,
  Option,
} from 'discord-hono'
import { type Env, factory } from '../init.js'

type Var = { content: string }

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
    component_page.component
      .emoji('⬅️')
      .label('Previous')
      .custom_id(JSON.stringify([page - 1, content]))
      .disabled(page <= 1)
      .toJSON(),
    component_page.component
      .emoji('➡️')
      .label('Next')
      .custom_id(JSON.stringify([page + 1, content]))
      .disabled(maxPage <= page)
      .toJSON(),
  )
  return { embeds: [embed], components }
}

export const command_page = factory.command<Var>(
  new Command('page', 'pagination').options(
    new Option('content', 'page content').required(),
  ),
  c => c.res(pageContent(c, 1, c.var.content)),
)

export const component_page = factory.component(new Button('page', ''), c => {
  const arr: [number, string] = JSON.parse(c.var.custom_id ?? '')
  return c.resUpdate(pageContent(c, ...arr))
})
```

`.toJSON()` をしない場合、同じ component 要素となり、エラーが発生します。
