---
title: createFactory
description: Discord Hono における createFactory を使用したファイル分割のガイドです。複数のファイルにわたるコマンド、コンポーネント、ページネーションロジックの構造化例を含みます。
---

[Example リポジトリ](https://github.com/luisfun/discord-hono-examples/tree/main/workerd-use-factory)

`createFactory` はコマンド毎のファイル分割を補助する関数です。

```ts "createFactory" "factory"
// src/
// src/init.ts
import { createFactory } from 'discord-hono'
export const factory = createFactory<{ Bindings: Env }>()

// src/index.ts
import * as handlers from './handlers'
import { factory } from './init'
export default factory.discord().loader(Object.values(handlers))

// src/register.ts
import { register } from 'discord-hono'
import * as handlers from './handlers/index.js'
import { factory } from './init.js'
register(
  factory.getCommands(Object.values(handlers)),
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  // process.env.DISCORD_TEST_GUILD_ID,
)
```

```ts "factory"
// src/handlers/
// src/handlers/index.ts
export * from './hello.js'
export * from './help.js'
export * from './utils.js'

// src/handlers/hello.ts
import { makeSlashCommand, makeStringOption } from 'discord-hono'
import { factory } from '../init.js'
export const command_hello = factory.command(
  makeSlashCommand('hello', 'Hello, World!').options([
    makeStringOption('name', 'Your name'),
  ]),
  c => c.res(`Hello, ${c.var.name ?? 'World'}!`),
)

// src/handlers/help.ts
import { makeActionRow, makeLinkButton, makeSlashCommand } from 'discord-hono'
import { factory } from '../init.js'
import { component_delete } from './utils.js'
export const command_help = factory.command(
  makeSlashCommand('help', 'response help'),
  c =>
    c.res({
      components: [
        makeActionRow([
          makeLinkButton('https://discord-hono.luis.fun', ['📑', 'Docs']),
          component_delete.component,
        ]),
      ],
    }),
)

// src/handlers/utils.ts
import { buttonStyle, makeButton } from 'discord-hono'
import { factory } from '../init.js'
export const component_delete = factory.component(
  makeButton('delete', ['🗑️', 'Delete']).style(buttonStyle.Secondary),
  c => c.update().resDefer(c => c.followup()),
)
```

## component を使い回すとき

`.clone()` で component をコピーしてください。

`.clone()` をしない場合、同じ component となり、エラーが発生します。

```ts "component_page.component" ".clone()"
// src/handlers/pagination.ts
import {
  buttonStyle,
  type CommandContext,
  type ComponentContext,
  makeActionRow,
  makeButton,
  makeEmbed,
  makeModal,
  makeSlashCommand,
  makeStringOption,
  makeTextInput,
} from 'discord-hono'
import { type Env, factory } from '../init.js'

const pageContent = (
  c: CommandContext<Env> | ComponentContext<Env>,
  page: number,
  content: string,
): ReturnType<typeof c.res> => {
  ///// Process /////
  const _db = c.env.DB
  ///// Response Build /////
  const maxPage = 3
  const embed = makeEmbed()
    .title('Title')
    .description(`${content}\nPage: ${page}`)
  const previousButton = component_page.component
    .clone()
    .emoji({ name: '⬅️' } as const)
    .label('Previous')
    .style(buttonStyle.Success)
    .custom_value(JSON.stringify([page - 1, content]))
    .disabled(page <= 1)
  const nextButton = component_page.component
    .clone()
    .emoji({ name: '➡️' } as const)
    .label('Next')
    .style(buttonStyle.Primary)
    .custom_value(JSON.stringify([page + 1, content]))
    .disabled(maxPage <= page)
  const components = [makeActionRow([previousButton, nextButton])]
  return c.res({ embeds: [embed], components })
}

export const command_page = factory.command(
  makeSlashCommand('page', 'pagination').options([
    makeStringOption('content', 'page content').required(true),
  ]),
  c => pageContent(c, 1, c.var.content),
)

export const component_page = factory.component(makeButton('page', ''), c => {
  const arr: [number, string] = JSON.parse(c.ref.custom_value ?? '')
  return pageContent(c.update(), ...arr)
})
```
