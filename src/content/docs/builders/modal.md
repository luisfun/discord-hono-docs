---
title: Modal
description: A guide to creating and using modals in Discord Hono, including text inputs, channel selection, labels, and validation.
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

`custom_id` is used to identify the modal in `app.modal()`.  
It also cannot contain `;`.

If your editor supports it, typing `.` will show a list of available methods.

Please refer to the [Official Docs](https://docs.discord.com/developers/components/reference#text-input) for the details of each method.

## Example

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
