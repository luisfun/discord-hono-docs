---
title: createFactory
description: Guide on using createFactory for file separation in DiscordHono, with examples of structuring commands, components, and pagination logic across multiple files.
sidebar:
  badge:
    text: β
---

`createFactory` is a function that assists in file separation for each command.

```ts "createFactory"
// src/init.ts
import { createFactory } from 'discord-hono'

export type Env = {
  Bindings: {
    DB: any
  }
  Variables: {
    text?: string
  }
}

export const factory = createFactory<Env>()
```

```ts "factory"
// src/index.ts
import * as interactions from './interactions'
import { factory } from './init'

const app = factory.discord()

factory.loader(app, Object.values(interactions))

export default app
```

```ts
// src/register.ts
import { register } from 'discord-hono'
import * as interactions from './interactions/index.js'

const commands = Object.values(interactions)
  .filter(e => 'command' in e)
  .map(e => e.command)

register(
  commands,
  process.env.DISCORD_APPLICATION_ID,
  process.env.DISCORD_TOKEN,
  //process.env.DISCORD_TEST_GUILD_ID,
)
```

```ts
// src/interactions/index.ts
export * from './hello-world.js'
export * from './help.js'
```

```ts "factory"
// src/interactions/hello-world.ts
import { Command } from 'discord-hono'
import { factory } from '../init.js'

export const command_hello = factory.command(
  new Command('hello', 'response world'),
  c => c.res('world'),
)
```

```ts "factory"
// src/interactions/help.ts
import { Command, Option, Components, Button } from 'discord-hono'
import { factory } from '../init.js'

export const command_help = factory.command(
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

## When reusing component elements

Please convert to an object using `.toJSON()` after overwriting.

```ts "component_page.component" ".toJSON()"
// src/interactions/pagination.ts
import {
  Button,
  Command,
  CommandContext,
  type ComponentContext,
  Components,
  Embed,
  Option,
} from 'discord-hono'
import { type Env, factory } from '../init.js'

const pageContent = (c: CommandContext<Env> | ComponentContext<Env>) => {
  ///// Parse /////
  let page = 1
  let content = ''
  if (c instanceof CommandContext) {
    content = c.var.content ?? ''
  } else {
    const arr: [number, string] = JSON.parse(c.var.custom_id ?? '')
    page = arr[0]
    content = arr[1]
  }
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

export const command_page = factory.command(
  new Command('page', 'pagination').options(
    new Option('content', 'page content').required(),
  ),
  c => c.res(pageContent(c)),
)

export const component_page = factory.component(new Button('page', ''), c =>
  c.resUpdate(pageContent(c)),
)
```

If you don't use `.toJSON()`, it will result in the same component element, causing an error.
