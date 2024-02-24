---
title: Components
sidebar:
  order: 2
---

```ts
import { DiscordHono, Components, Button } from 'discord-hono'

const app = new DiscordHono().command('component', c =>
  c.res({
    content: 'Components',
    components: new Components().row(
      new Button('button-1', 'ボタン'),
      new Button('button-2', '2つ目'),
    ),
  }),
)
```

## .row()

```ts
const components = new Components()
  .row(new Button('button-1', '1'), new Button('button-2', '22'))
  .row(new Button('button-3', '333'), new Button('button-4', '4444'))
```

```bash title="Discord Bot コンポーネントレスポンス"
[1][22]
[333][4444]
```

`.row()` は [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows) と同じ機能です。

## Button

```ts
import { Components, Button } from 'discord-hono'

type Style = 'Primary' | 'Secondary' | 'Success' | 'Danger'

const components = new Components().row(
  new Button('unique-id', 'label', 'Primary' as Style),
  new Button('button', 'ボタン', 'Secondary'),
)
```

`unique-id` は `app.component()` で識別するために使います。  
また、`unique-id` に `;` は使用できません。  
第3引数にはボタンのスタイルを指定します。デフォルトは `Primary` です。

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

## LinkButton

```ts
import { Components, LinkButton } from 'discord-hono'

const components = new Components().row(
  new LinkButton('https://github.com', 'Github'),
  new LinkButton('url', 'ラベル'),
)
```

リンクボタンには、unique-id の代わりに URL を指定する必要があります。また、ボタンのスタイルは指定できません。

メソッドは基本的に Button と同じです。

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

コンポーネント Type については[こちら](https://discord.com/developers/docs/interactions/message-components#component-object-component-types)を参照してください。  
`Select` は String Select です。

`unique-id` は `app.component()` で識別するために使用されます。  
また、`unique-id` に `;` は使用できません。

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

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#select-menu-object)を参照してください。

オプションによって使用できないフィールド（メソッド）があります。

公式ドキュメントと異なる注意点があります。  
`.custom_id()` は `unique-id` を含めて99文字までです。
