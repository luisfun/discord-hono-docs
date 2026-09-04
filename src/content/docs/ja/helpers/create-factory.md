---
title: createFactory
description: Discord Hono における createFactory を使用したファイル分割のガイドです。複数のファイルにわたるコマンド、コンポーネント、ページネーションロジックの構造化例を含みます。
---

[Example リポジトリ](https://github.com/luisfun/discord-hono-examples/tree/main/workerd-use-factory)

`createFactory` はコマンド毎のファイル分割を補助する関数です。

また、factory 内で型を抽出し、`var` の型を自動的に適応してくれます。

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
