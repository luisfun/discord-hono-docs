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

type ButtonStyle =
  | 'Primary'
  | 'Secondary'
  | 'Success'
  | 'Danger'
  | 'Link'
  | 'SKU'

const buttonStyle: ButtonStyle = 'Secondary' // デフォルト: 'Primary'

const components = new Components().row(
  new Button('unique-id', 'label'),
  new Button('button', 'ボタン', buttonStyle),
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

## Select 要素

```ts
import { Components, Select } from 'discord-hono'

type SelectType = 'String' | 'User' | 'Role' | 'Mentionable' | 'Channel'

const selectType: SelectType = 'Channel' // デフォルト: 'String'

const components = new Components().row(new Select('unique-id', selectType))
```

`unique-id` は `app.component()` で識別するために使用されます。  
また、`unique-id` に `;` は使用できません。

### Method

```ts
const components = new Components().row(
  new Select('unique-id', 'Channel')
    .custom_id()
    .placeholder()
    .min_values()
    .max_values()
    .disabled()
    .channel_types()
    .default_values(),
)
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#select-menu-object)を参照してください。

タイプによって使用できないフィールド（メソッド）があります。

公式ドキュメントと異なる注意点があります。  
`.custom_id()` は `unique-id` を含めて99文字までです。
