---
title: Components
description: Discord Hono でのコンポーネントの使用に関する包括的なガイド。ボタン、セレクト要素、およびスタイル、絵文字、セレクトオプションなどのカスタマイズを含みます。
sidebar:
  order: 2
---

```ts "Components" "Button"
import { DiscordHono, Components, Button } from 'discord-hono'

const app = new DiscordHono().command('component', c =>
  c.res({
    content: 'components',
    components: new Components().row(
      new Button('button-1', 'ボタン'),
      new Button('button-2', '2つ目'),
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

```bash title="Discord Bot コンポーネントレスポンス"
[1][22]
[333][4444]
```

`.row()` は [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows) と同じ機能です。

## Button 要素

```ts "Button"
import { Components, Button } from 'discord-hono'

type Style = 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link' | 'SKU'

const style: Style = 'Secondary' // デフォルト: 'Primary'

const components = new Components().row(
  new Button('unique-id', 'label'),
  new Button('button', 'ボタン', style),
  new Button('https://example.com', 'リンク', 'Link'),
)
```

`unique-id` は `app.component()` で識別するために使います。  
また、`unique-id` に `;` は使用できません。  
第3引数にはボタンのスタイルを指定します。デフォルトは `Primary` です。  
第3引数が `Link` の場合、 `unique-id` はURLです。

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

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#button-object)を参照してください。

公式ドキュメントと異なる注意点があります。  
`.custom_id()` は `unique-id` を含めて99文字までです。

### 簡単なemojiの設定

```ts
import { Components, Button } from 'discord-hono'

const components = new Components().row(new Button('button', ['✅', 'ボタン']))
```

## Select 要素

```ts "Select"
import { Components, Select } from 'discord-hono'

type Type = 'String' | 'User' | 'Role' | 'Mentionable' | 'Channel'

const selectType: Type = 'Channel' // デフォルト: 'String'

const components = new Components().row(new Select('unique-id', selectType))
```

`unique-id` は `app.component()` で識別するために使用されます。  
また、`unique-id` に `;` は使用できません。

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

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#select-menu-object)を参照してください。

タイプによって使用できないフィールド（メソッド）があります。

公式ドキュメントと異なる注意点があります。  
`.custom_id()` は `unique-id` を含めて99文字までです。

## Components V2 (β)

Components V2 を利用する際、 `c.flags('IS_COMPONENTS_V2')` を必ず指定してください。

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
  c => c.update().resDefer(c.followupDelete),
)
```
