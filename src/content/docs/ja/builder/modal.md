---
title: Modal
sidebar:
  order: 3
  badge:
    text: β
---

```ts
import { Modal, TextInput } from 'discord-hono'

const modal = new Modal('unique-id', 'Title').row(
  new TextInput('text-id', 'Label'),
)
```

## .row()

```ts
const modal = new Modal('unique-id', 'Modal Title')
  .row(new TextInput('text-1', 'Label'))
  .row(new TextInput('text-2', 'MultiInput', 'Multi'))
```

`.row()` は [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows) と同じ機能です。

## TextInput

```ts
import { Modal, TextInput } from 'discord-hono'

type Style = 'Single' | 'Multi'

const modal = new Modal('unique-id', 'Modal Title')
  .row(new TextInput('text-1', 'Label'))
  .row(new TextInput('text-2', 'MultiInput', 'Multi' as Style))
```

第3引数には TextInput のスタイルを指定します。デフォルトは `Single` です。

### Method

```ts
const modal = new Modal('unique-id', 'Modal Title').row(
  new TextInput('text-1', 'Label')
    .min_length()
    .max_length()
    .required()
    .value()
    .placeholder(),
)
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#text-input-object)を参照してください。
