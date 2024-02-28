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

`Command` の第1引数につては、[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming)を確認してください。

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
    .version(),
]
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object)を参照してください。

## Option elements

```ts
import {
  Command,
  Option,
  SubOption,
  SubGroupOption,
  NumberOption,
  BooleanOption,
  UserOption,
  ChannelOption,
  RoleOption,
  MentionableOption,
  AttachmentOption,
} from 'discord-hono'

const commands = [
  new Command('ping', 'pong を返答').options(
    new Option('name', 'description'),
    new Option('text', 'テキストを返答'),
  ),
]
```

[こちら](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)の Type ごとのオプションを用意しています。  
ただの Option は String option です。

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
