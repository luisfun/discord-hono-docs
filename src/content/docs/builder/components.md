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

## Button elements

```ts "Button"
import { Components, Button } from 'discord-hono'

type ButtonStyle =
  | 'Primary'
  | 'Secondary'
  | 'Success'
  | 'Danger'
  | 'Link'
  | 'SKU'

const buttonStyle: ButtonStyle = 'Secondary' // defaul: 'Primary'

const components = new Components().row(
  new Button('unique-id', 'label'),
  new Button('button', 'Button', buttonStyle),
  new Button('https://example.com', 'Link Button', 'Link'),
)
```

`unique-id` is used to identify `app.component()`.  
Also, do not use `;` for `unique-id`.  
The third argument specifies the style of the button. The default is `Primary`.  
If the third argument is `Link`, `unique-id` is a URL.

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

## Select elements

```ts
import { Components, Select } from 'discord-hono'

type SelectType = 'String' | 'User' | 'Role' | 'Mentionable' | 'Channel'

const selectType: SelectType = 'Channel' // defaul: 'String'

const components = new Components().row(new Select('unique-id', selectType))
```

`unique-id` is used to identify `app.component()`.  
Also, do not use `;` for `unique-id`.

### Method

```ts
const components = new Components().row(
  new Select('unique-id')
    .custom_id()
    .options() // required: String
    .channel_types() // Channel
    .placeholder()
    .default_values() // User, Role, Mentionable, Channel
    .min_values()
    .max_values()
    .disabled(),
)
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/message-components#select-menu-object).

Depending on the type, some fields (methods) cannot be used.

There are some notes that differ from the official one.  
`.custom_id()` are limited to a total of 99 characters with `unique-id`.
