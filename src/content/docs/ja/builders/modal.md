---
title: Modal
description: Discord Hono でのモーダルの使用に関するガイドです。テキスト入力を含むモーダルの作成、スタイルなどのカスタマイズオプション、バリデーションやプレースホルダーの設定方法が含まれています。
sidebar:
  order: 4
---

```ts "makeModal"
import {
  makeModal,
  makeTextInput,
  makeLabel,
  makeChannelSelect,
} from 'discord-hono'

const modal = makeModal('custom_id', 'label', [
  makeLabel('Text Input', makeTextInput('text', 'Text').required(true)),
  makeLabel('Channel Select', makeChannelSelect('channel')),
])
```

`custom_id` は `app.modal()` で識別するために使います。  
また、`custom_id` に `;` は使用できません。

IDEが対応していれば、`.` を打つと候補となるメソッド一覧をみれます。

メソッドの内容は[公式ドキュメント](https://docs.discord.com/developers/components/reference#text-input)を参照してください。

## コード例

```ts "makeModal" "c.resModal"
import {
  makeChannelSelect,
  makeLabel,
  makeModal,
  makeSlashCommand,
  makeStringOption,
  makeTextDisplay,
  makeTextInput,
} from 'discord-hono'
import { factory } from '../init'

export const command_modal = factory.command(
  makeSlashCommand('modal', 'modal test').options([
    makeStringOption('text', 'with text'),
  ]),
  c => {
    if (!c.var.text) return c.resModal(modal_modal.modal)
    const modal = modal_modal.modal.toJSON()
    return c.resModal(
      makeModal(modal.custom_id, modal.title, [
        ...modal.components,
        makeTextDisplay(`Text: ${c.var.text}`),
      ]),
    )
  },
)

export const modal_modal = factory.modal(
  makeModal('modal', 'Modal Test', [
    makeLabel('Text Input', makeTextInput('modal_text', 'Text').required(true)),
    makeLabel('Channel Select', makeChannelSelect('channel')),
  ]),
  c => {
    const channelObj = c.ref.channels?.[c.var.channel?.[0] ?? '']
    return c.res(
      `- Text: ${c.var.modal_text}\n- Channel: ${channelObj?.name} <#${channelObj?.id}>`,
    )
  },
)
```
