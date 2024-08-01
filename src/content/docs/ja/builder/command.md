---
title: Command
sidebar:
  order: 1
---

```ts "Command"
import { Command } from 'discord-hono'

const commands = [
  new Command('name', 'description'),
  new Command('ping', 'pong を返答'),
]
```

`Command` の第1引数については、[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)を確認してください。

## Method

```ts
const commands = [
  new Command('name', 'description')
    .id()
    .type(2) // 1,2,3 デフォルト 1 --- 1: CHAT_INPUT, 2: USER, 3: MESSAGE
    .application_id()
    .guild_id()
    .name_localizations()
    .description_localizations()
    .options(
      new Option('text', 'テキスト1つ目'),
      new Option('second', 'テキスト2つ目'),
    )
    .default_member_permissions()
    .dm_permission()
    .nsfw()
    .integration_types()
    .contexts()
    .version(),
]
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object)を参照してください。

## Subcommands

```ts
import { Command, SubGroup, SubCommand } from 'discord-hono'

const commands = [
  new Command('slash', 'slash description').options(
    new SubCommand('sub1', 'サブコマンド 1'),
    new SubGroup('group', 'サブコマンドグループ description').options(
      new SubCommand('sub2', 'サブコマンド 2'),
      new SubCommand('sub3', 'サブコマンド 3'),
    ),
  ),
]
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)を参照してください。

`SubCommand.options` には `Command.options` と同じものを設定できます。

## Options

```ts
import { Command, Option } from 'discord-hono'

type OptionType =
  | 'String'
  | 'Integer'
  | 'Number'
  | 'Boolean'
  | 'User'
  | 'Channel'
  | 'Role'
  | 'Mentionable'
  | 'Attachment'

const optionType: OptionType = 'Channel' // デフォルト: 'String'

const commands = [
  new Command('hello', 'world を返答').options(
    new Option('text', 'テキスト入力'), // String オプション
    new Option('channel', 'チャンネル選択', optionType), // Channel オプション
  ),
]
```

### Method

```ts
const commands = [
  new Command('ping', 'pong を返答').options(
    new Option('name', 'description')
      .name_localizations()
      .description_localizations()
      .required() // .required(true) = .required()
      .choices(
        { name: '選択肢1', value: 'string 1' },
        { name: '選択肢2', value: 'string 2' },
      )
      .min_length()
      .max_length()
      .autocomplete(),
  ),
]
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure)を参照してください。

オプションによって使用できないフィールド（メソッド）があります。
