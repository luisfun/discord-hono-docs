---
title: Command
sidebar:
  order: 1
---

```ts
import { Command } from 'discord-hono'

const commands = [
  new Command('name', 'description'),
  new Command('ping', 'response pong'),
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
      new Option('text', 'first text'),
      new Option('second', 'second text'),
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
  new Command('ping', 'response pong').options(
    new Option('name', 'description'),
    new Option('text', 'response text'),
  ),
]
```

[こちら](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)の Type ごとのオプションを用意しています。  
ただの Option は String option です。

### Method

```ts
const commands = [
  new Command('ping', 'response pong').options(
    new Option('name', 'description')
      .name_localizations()
      .description_localizations()
      .required() // .required(true) = .required()
      .choices(
        { name: 'choice 1', value: 'string 1' },
        { name: 'choice 2', value: 'string 2' },
      )
      .min_length()
      .max_length()
      .autocomplete(),
  ),
]
```

[公式ドキュメント](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure)を参照してください。

オプションによって使用できないフィールド（メソッド）があります。
