---
title: Components
description: Comprehensive guide on using components in DiscordHono, including buttons, select elements, and customizations like styles, emojis, and select options.
sidebar:
  order: 2
---

```ts "Components" "Button"
import { DiscordHono, Components, Button } from 'discord-hono'

const app = new DiscordHono().command('component', c =>
  c.res({
    content: 'components',
    components: new Components().row(
      new Button('button-1', 'button'),
      new Button('button-2', 'second'),
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

type Style = 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link' | 'SKU'

const style: Style = 'Secondary' // defaul: 'Primary'

const components = new Components().row(
  new Button('unique-id', 'label'),
  new Button('button', 'button', style),
  new Button('https://example.com', 'Link button', 'Link'),
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

### Simple emoji setup

```ts
import { Components, Button } from 'discord-hono'

const components = new Components().row(new Button('button', ['✅', 'button']))
```

## Select elements

```ts "Select"
import { Components, Select } from 'discord-hono'

type Type = 'String' | 'User' | 'Role' | 'Mentionable' | 'Channel'

const selectType: Type = 'Channel' // defaul: 'String'

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

## Components V2 (β)

When using Components V2, you must specify `c.flags('IS_COMPONENTS_V2')`.

### Layout

### Content

example

```ts
export const command_components_v2 = factory.command(
  new Command('components_v2', 'response components_v2'),
  async c => {
    const image = await fetch('https://luis.fun/images/hono.webp')
    const blob = new Blob([await image.arrayBuffer()])
    return c.flags('EPHEMERAL', 'IS_COMPONENTS_V2').res(
      {
        components: [
          new Content('text top'),
          new Layout('Container').components(
            new Layout('Action Row').components(component_delete.component),
            new Layout('Separator'),
            new Content('container - text'),
            new Layout('Section')
              .components(
                new Content('container - section - text'),
                new Content('container - section - text2'),
              )
              .accessory(new Content('image.webp', 'Thumbnail')),
            new Content('container - text2'),
          ),
        ],
      },
      { blob, name: 'image.webp' },
    )
  },
)
export const component_delete = factory.component(
  new Button('delete', ['🗑️', 'Delete'], 'Secondary'),
  c => c.update().resDefer(c => c.followup()),
)
```
