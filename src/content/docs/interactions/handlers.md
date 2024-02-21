---
title: Handlers
sidebar:
  order: 5
---

## CommandHandlers

```ts "ping" "image"
import { DiscordHono, Command, CommandHandlers } from 'discord-hono'

export const commands = [
  new Command('ping', 'response Pong'),
  new Command('image', 'response Image'),
]

const handlers = new CommandHandlers()
  .on('ping', c => c.resText('Pong!!'))
  .on('image', c => c.resText('Image!!'))

const app = new DiscordHono()
app.handlers(handlers)
export default app
```

The first argument of `Command()` must match the first argument of `CommandHandlers.on()`.  
The second argument of the matched `.on()` is executed.

## ComponentHandlers

```ts "button-1" "button-2"
import {
  DiscordHono,
  CommandHandlers,
  Components,
  Button,
  ComponentHandlers,
} from 'discord-hono'

const commandHandlers = new CommandHandlers().on('component', c =>
  c.res({
    content: 'No button clicked yet',
    components: new Components().row(
      new Button('button-1', 'Button'),
      new Button('button-2', 'Second'),
    ),
  }),
)

const componentHandlers = new ComponentHandlers()
  .on('button-1', c => c.resUpdateText('Button clicked'))
  .on('button-2', c => c.resUpdateText('Second clicked'))

const app = new DiscordHono()
app.handlers(commandHandlers)
app.handlers(componentHandlers)
export default app
```

The first argument of the component element `Button()` must match the first argument of `ComponentHandlers.on()`.  
The second argument of the matched `.on()` is executed.

## ModalHandlers

```ts "modal-1"
import {
  DiscordHono,
  CommandHandlers,
  Modal,
  TextInput,
  ModalHandlers,
} from 'discord-hono'

const commandHandlers = new CommandHandlers().on('modal', c =>
  c.resModal(
    new Modal('modal-1', 'Modal Title')
      .row(new TextInput('text-1', 'Text'))
      .row(new TextInput('text-2', 'Second')),
  ),
)

const modalHandlers = new ModalHandlers().on('modal-1', c =>
  c.resText('Modal submitted'),
)

const app = new DiscordHono()
app.handlers(commandHandlers)
app.handlers(modalHandlers)
export default app
```

The first argument of `Modal()` must match the first argument of `ModalHandlers.on()`.  
The second argument of the matched `.on()` is executed.

## CronHandlers

```ts "0 0 * * *"
// index.ts
import { DiscordHono, CronHandlers } from 'discord-hono'

const handlers = new CronHandlers()
  .on('0 0 * * *', c => c.postText('CHANNEL_ID', 'Daily Post'))
  .on('', c => c.postText('CHANNEL_ID', 'Other Cron Triggers Post'))

const app = new DiscordHono()
app.handlers(handlers)
export default app
```

```toml "0 0 * * *"
// wrangler.toml
name = "example"
main = "src/index.ts"
compatibility_date = "2024-02-08"

[triggers]
crons = [ "0 * * * *", "0 0 * * *" ]
```

The first argument of `CronHandlers.on()` must match the toml file crons.  
The second argument of the matched `.on()` is executed.

If `''` is specified, it matches all remaining crons.  
If you do not need to separate processing by crons, you can specify only `''`.
