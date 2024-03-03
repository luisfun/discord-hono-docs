---
title: Modal
sidebar:
  order: 3
---

```ts "Modal" "TextInput"
import { Modal, TextInput } from 'discord-hono'

const modal = new Modal('unique-id', 'Title').row(
  new TextInput('custom_id', 'Label'),
)
```

## .row()

```ts "row"
const modal = new Modal('unique-id', 'Modal Title')
  .row(new TextInput('text-1', 'Label'))
  .row(new TextInput('text-2', 'MultiInput', 'Multi'))
```

`.row()` has the same feature as [Action Rows](https://discord.com/developers/docs/interactions/message-components#action-rows).

## TextInput

```ts "TextInput"
import { Modal, TextInput } from 'discord-hono'

type Style = 'Single' | 'Multi'

const modal = new Modal('unique-id', 'Modal Title')
  .row(new TextInput('text-1', 'Label'))
  .row(new TextInput('custom_id', 'MultiInput', 'Multi' as Style))
```

The third argument specifies the style of the TextInput. The default is `Single`.

### Method

```ts
const modal = new Modal('unique-id', 'Modal Title').row(
  new TextInput('custom_id', 'Label')
    .min_length()
    .max_length()
    .required()
    .value()
    .placeholder(),
)
```

Please refer to the [Official Docs](https://discord.com/developers/docs/interactions/message-components#text-input-object).
