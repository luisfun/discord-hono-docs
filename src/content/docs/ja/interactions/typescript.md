---
title: TypeScript
---

```ts "Env"
import { DiscordHono } from 'discord-hono'

type Env = {
  Bindings: {
    DB: D1Database
  }
}

const app = new DiscordHono<Env>()
app.command('hello', async c => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.res('world!!')
})

export default app
```

## .var Types

```ts
type Env = {
  Variables: {
    OPTION_NAME?: string
    TEXTINPUT_CUSTOM_ID?: string
  }
}

const app = new DiscordHono<Env>()
  .command('ping', c => c.res(c.var.OPTION_NAME))
  .modal('modal', c => c.res(c.var.TEXTINPUT_CUSTOM_ID))
```

## Init Options

```ts "InitOptions"
import type { InitOptions } from 'discord-hono'
import { DiscordHono } from 'discord-hono'

type Env = {
  Bindings: {
    DB: D1Database
  }
}

const options: InitOptions<Env> = {
  /***/
}
const app = new DiscordHono<Env>(options)
```

## Context Types

```ts "Env" "CommandContext" "ComponentContext" "ModalContext" "CronContext" "AutocompleteContext"
import type {
  CommandContext,
  ComponentContext,
  AutocompleteContext,
  ModalContext,
  CronContext,
} from 'discord-hono'
import {
  DiscordHono,
  Components,
  Button,
  Modal,
  TextInput,
  Autocomplete,
} from 'discord-hono'

type Env = {
  Bindings: {
    DB: D1Database
  }
}

const commandHandler = async (c: CommandContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.res({
    components: new Components().row(new Button('button', 'Yo!!')),
  })
}

const componentHandler = async (c: ComponentContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.resModal(
    new Modal('modal', 'これはモーダル').row(
      new TextInput('id', '何か入力して'),
    ),
  )
}

const modalHandler = async (c: ModalContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.res('モーダルが送信された')
}

const autocompleteHandler = async (c: AutocompleteContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.resAutocomplete(new Autocomplete().choices())
}

const autocompleteCommandHandler = async (c: CommandContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
  return c.res('オートコンプリートコマンド')
}

const cronHandler = async (c: CronContext<Env>) => {
  const db = c.env.DB
  /* 何かしらの処理 */
}

const app = new DiscordHono<Env>()
  .command('hey', commandHandler)
  .component('button', componentHandler)
  .modal('modal', modalHandler)
  .autocomplete('autocomplete', autocompleteHandler, autocompleteCommandHandler)
  .cron('', cronHandler)
export default app
```

それぞれの `app.***()` の第2引数で受け取ったコンテキストに対応します。
