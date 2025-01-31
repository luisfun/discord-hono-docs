---
title: Modal
description: Discord Hono でのモーダルの使用に関するガイドです。テキスト入力を含むモーダルの作成、スタイルなどのカスタマイズオプション、バリデーションやプレースホルダーの設定方法が含まれています。
sidebar:
  order: 4
---

```ts "Modal" "TextInput"
import { Modal, TextInput } from 'discord-hono'

const modal = new Modal('unique-id', 'モーダルタイトル').row(
  new TextInput('custom_id', 'テキストラベル'),
)
```

## .row()

```ts "row"
const modal = new Modal('unique-id', 'モーダルタイトル')
  .row(new TextInput('text-1', 'テキストラベル'))
  .row(new TextInput('text-2', '複数行入力', 'Multi'))
```

`.row()` は [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows) と同じ機能です。

## TextInput

```ts "TextInput"
import { Modal, TextInput } from 'discord-hono'

type Style = 'Single' | 'Multi'

const modal = new Modal('unique-id', 'モーダルタイトル')
  .row(new TextInput('text-1', 'テキストラベル'))
  .row(new TextInput('custom_id', '複数行入力', 'Multi' as Style))
```

第3引数には TextInput のスタイルを指定します。デフォルトは `Single` です。

### Method

```ts
const modal = new Modal('unique-id', 'モーダルタイトル').row(
  new TextInput('custom_id', 'テキストラベル')
    .min_length()
    .max_length()
    .required()
    .value()
    .placeholder(),
)
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/message-components#text-input-object)を参照してください。
