---
title: Command
description: Discord Hono におけるコマンド作成関数の使用に関するガイドです。サブコマンド、オプション、そしてローカライゼーション、権限、オートコンプリートなどの高度な設定を含みます。
sidebar:
  order: 1
---

## 一覧

```ts
import {
  // Commands
  makeSlashCommand,
  makeUserCommand,
  makeMessageCommand,
  makeEntryPointCommand,
  // Subcommands
  makeSubCommand,
  makeSubCommandGroup,
  // Options
  makeStringOption,
  makeIntegerOption,
  makeBooleanOption,
  makeUserOption,
  makeChannelOption,
  makeRoleOption,
  makeMentionableOption,
  makeNumberOption,
  makeAttachmentOption,
} from 'discord-hono'
```

## Commands

```ts "makeSlashCommand"
import { makeSlashCommand } from 'discord-hono'

const commands = [
  makeSlashCommand('name', 'description'),
  makeSlashCommand('ping', 'pong を返答'),
]
```

第1引数については、[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)を確認してください。

`makeUserCommand`, `makeMessageCommand`, `makeEntryPointCommand` についても同様に作成できます。  
ただし、第二引数の `description` は不要です。

### メソッド

```ts ".description" ".options"
makeSlashCommand('name', 'description').description('上書き').options([])
```

IDEが対応していれば、`.` を打つと候補となるメソッド一覧をみれます。

メソッドの内容は[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object)を参照してください。

## Subcommands

```ts "makeSubCommand" "makeSubCommandGroup"
import {
  makeSlashCommand,
  makeSubCommand,
  makeSubCommandGroup,
} from 'discord-hono'

const commands = [
  makeSlashCommand('slash', 'slash description').options([
    makeSubCommand('sub1', 'サブコマンド 1'),
    makeSubCommandGroup('group', 'サブコマンドグループ description').options([
      makeSubCommand('sub2', 'サブコマンド 2'),
      makeSubCommand('sub3', 'サブコマンド 3'),
    ]),
  ]),
]
```

いくつかの制約については[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)を参照してください。

`makeSubCommand.options` には `makeSlashCommand.options` と同じものを設定できます。

## Options

```ts ".options" "makeStringOption" "makeChannelOption"
import {
  makeSlashCommand,
  makeStringOption,
  makeChannelOption,
} from 'discord-hono'

const commands = [
  makeSlashCommand('hello', 'world を返答').options([
    makeStringOption('text', 'テキスト入力').required(true),
    makeChannelOption('channel', 'チャンネル選択').channel_types([0]),
  ]),
]
```

コマンドと同様に、`.` を打つと候補となるメソッド一覧をみれます。

メソッドの内容は[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure)を参照してください。

### 入力データの取得

```ts "c.var" "string_op" "channel_op"
import {
  makeSlashCommand,
  makeSubCommand,
  makeStringOption,
  makeChannelOption,
} from 'discord-hono'
import { factory } from '../init'

export const command_slash = factory.command(
  makeSlashCommand('slash', 'スラッシュコマンド').options([
    makeSubCommand('sub', 'サブコマンド').options([
      makeStringOption('string_op', '文字列オプション').required(true),
      makeChannelOption('channel_op', 'チャンネルオプション').channel_types([
        0,
      ]),
    ]),
  ]),
  c => {
    const channel = c.ref.channels?.[c.var.channel_op ?? '']
    return c.res(
      `- ${c.var.string_op}\n- ${channel?.name}\n- <#${channel?.id}>`,
    )
  },
)
```

## メッセージコマンド例

```ts
import {
  makeContainer,
  makeMessageCommand,
  makeTextDisplay,
} from 'discord-hono'
import { factory } from '../init.js'

export const command_repost = factory.command(
  makeMessageCommand('repost'),
  c => {
    return c.flags('IS_COMPONENTS_V2').res({
      components: [
        makeContainer([
          makeTextDisplay(
            c.ref.messages[c.ref.target_id]?.content || 'Error: not found',
          ),
        ]),
      ],
    })
  },
)
```
