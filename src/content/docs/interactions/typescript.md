---
title: TypeScript
sidebar:
  order: 3
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
  /* Perform some operation */
  return c.res('world!!')
})

export default app
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

## Context types

```ts "Env" "CommandContext" "ComponentContext" "ModalContext" "CronContext"
import type {
  CommandContext,
  ComponentContext,
  ModalContext,
  CronContext,
} from 'discord-hono'
import { DiscordHono } from 'discord-hono'

type Env = {
  Bindings: {
    DB: D1Database
  }
}

const commandHandler = async (c: CommandContext<Env>) => {
  const db = c.env.DB
  /* Perform some operation */
  return c.res({
    components: new Components().row(new Button('button', 'Yo!!')),
  })
}

const componentHandler = async (c: ComponentContext<Env>) => {
  const db = c.env.DB
  /* Perform some operation */
  return c.resModal(
    new Modal('modal', 'This is Modal').row(
      new TextInput('id', 'Type something'),
    ),
  )
}

const modalHandler = async (c: ModalContext<Env>) => {
  const db = c.env.DB
  /* Perform some operation */
  return c.res('Modal Submit')
}

const cronHandler = async (c: CronContext<Env>) => {
  const db = c.env.DB
  /* Perform some operation */
}

const app = new DiscordHono<Env>()
  .command('hey', commandHandler)
  .component('button', componentHandler)
  .modal('modal', modalHandler)
  .cron('', cronHandler)
export default app
```

It corresponds to the context received as the second argument of each `app.***()`.
