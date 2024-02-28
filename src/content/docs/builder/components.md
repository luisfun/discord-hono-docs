---
title: Components
sidebar:
  order: 2
---

```ts "Components" "Button"
import { DiscordHono, Components, Button } from 'discord-hono'

const app = new DiscordHono().command('component', c =>
  c.res({
    content: 'components',
    components: new Components().row(
      new Button('button-1', 'Button'),
      new Button('button-2', 'Second'),
    ),
  }),
)
```

## .row()

```ts "row"
const components = new Components()
  .row(new Button('button-1', '1'), new Button('button-2', '22'))
  .row(new Button('button-3', '333'), new Button('button-4', '4444'))
```

```bash title="Discord Bot Components Response"
[1][22]
[333][4444]
```

`.row()` has the same feature as [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows).

## Button

```ts "Button"
import { Components, Button } from 'discord-hono'

type Style = 'Primary' | 'Secondary' | 'Success' | 'Danger'

const components = new Components().row(
  new Button('button', 'Button', 'Secondary'),
  new Button('unique-id', 'label', 'Primary' as Style),
)
```

`unique-id` is used to identify `app.component()`.  
Also, do not use `;` for `unique-id`.  
The third argument specifies the style of the button. The default is `Primary`.

### Method

```ts
// prettier-ignore
const components = new Components().row(
  new Button('unique-id', 'label', 'Primary')
    .custom_id()
    .emoji()
    .disabled(),
)
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/message-components#button-object).

There are some notes that differ from the official one.  
`.custom_id()` are limited to a total of 99 characters with `unique-id`.

## LinkButton

```ts "LinkButton"
import { Components, LinkButton } from 'discord-hono'

const components = new Components().row(
  new LinkButton('https://github.com', 'Github'),
  new LinkButton('url', 'label'),
)
```

The link button should contain a URL instead of a unique-id. Also, style cannot be specified.

Method is basically the same as for a Button.

## Select elements

```ts
import {
  Components,
  Select,
  UserSelect,
  RoleSelect,
  MentionableSelect,
  ChannelSelect,
} from 'discord-hono'

const components = new Components().row(new ChannelSelect('unique-id'))
```

See [here](https://discord.com/developers/docs/interactions/message-components#component-object-component-types) for Component Types.  
`Select` is String Select.

`unique-id` is used to identify `app.component()`.  
Also, do not use `;` for `unique-id`.

### Method

```ts
const components = new Components().row(
  new ChannelSelect('unique-id')
    .custom_id()
    .placeholder()
    .min_values()
    .max_values()
    .disabled()
    .channel_types()
    .default_values(),
)
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/message-components#select-menu-object).

Depending on the type of option, some fields (methods) cannot be used.

There are some notes that differ from the official one.  
`.custom_id()` are limited to a total of 99 characters with `unique-id`.
