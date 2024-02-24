---
title: Modal
sidebar:
  order: 3
  badge:
    text: β
---

```ts
import { Modal, TextInput } from 'discord-hono'

const modal = new Modal('unique-id', 'モーダルタイトル').row(
  new TextInput('text-id', 'テキストラベル'),
)
```

## .row()

```ts
const modal = new Modal('unique-id', 'モーダルタイトル')
  .row(new TextInput('text-1', 'テキストラベル'))
  .row(new TextInput('text-2', '複数行入力', 'Multi'))
```

`.row()` は [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows) と同じ機能です。

## TextInput

```ts
import { Modal, TextInput } from 'discord-hono'

type Style = 'Single' | 'Multi'

const modal = new Modal('unique-id', 'モーダルタイトル')
  .row(new TextInput('text-1', 'テキストラベル'))
  .row(new TextInput('text-2', '複数行入力', 'Multi' as Style))
```

第3引数には TextInput のスタイルを指定します。デフォルトは `Single` です。

### Method

```ts
const modal = new Modal('unique-id', 'モーダルタイトル').row(
  new TextInput('text-1', 'テキストラベル')
    .min_length()
    .max_length()
    .required()
    .value()
    .placeholder(),
)
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#text-input-object)を参照してください。
