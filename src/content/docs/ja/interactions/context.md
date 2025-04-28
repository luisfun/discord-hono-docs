---
title: Context
description: Discord Hono におけるコンテキスト、インタラクションデータ、およびレスポンス処理の使用に関する包括的なガイドです。コマンド、コンポーネント、モーダル、 cron ジョブについて、さまざまなレスポンス方法とともに解説しています。
sidebar:
  order: 2
---

```ts /(?<=\s)c/
import { DiscordHono } from 'discord-hono'

const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res('world!!'))
```

`app.command()`、`app.component()`、`app.modal()`、`app.cron()` の第2引数で Context を受け取ることできます。

## .env .event .executionCtx .set() .get() .var

[こちら](https://hono.dev/api/context)を参照してください。  
できるだけ Hono と同じになるようにしています。

### .var について

```ts "var"
const app = new DiscordHono()
  .command('ping', c => c.res(c.var.OPTION_NAME))
  .component('button', c => c.res(c.var.custom_id))
  .modal('modal', c => c.res(c.var.custom_id + c.var.TEXTINPUT_CUSTOM_ID))
```

デフォルトで次の値が含まれています。

- `c.var.OPTION_NAME` コマンドオプションの値 (command, autocomplete)
- `c.var.custom_id` custom_id の値 (component, modal)
- `c.var.TEXTINPUT_CUSTOM_ID` テキストインプットの値 (modal)

## get: interaction

command, component, autocomplete, modal

`c.interaction` = `JSON.parse(await c.req.text())`

[公式ドキュメント](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object)を参照してください。

## get: key

ハンドラーのトリガーとなった文字列です。

## get: sub

command, autocomplete

```ts "sub.string" "sub.group" "sub.command"
const commands = [
  new Command('slash', 'slash description').options(
    new SubCommand('sub1', 'サブコマンド 1'),
    new SubGroup('group', 'サブコマンドグループ description').options(
      new SubCommand('sub2', 'サブコマンド 2').options(
        new Option('text', 'テキスト'),
      ),
      new SubCommand('sub3', 'サブコマンド 3'),
    ),
  ),
]
const app = new DiscordHono().command('slash', c => {
  switch (c.sub.string) {
    case 'sub1':
      return c.res('sub1')
    case 'group sub2':
      return c.res('g-sub2: ' + c.var.text)
    default:
      return c.res(c.sub.group + '-' + c.sub.command)
  }
})
```

`SubGroup` の第一引数が `c.sub.group` に入っています。  
`SubCommand` の第一引数が `c.sub.command` に入っています。  
`c.sub.string = (c.sub.group ? c.sub.group + ' ' : '') + c.sub.command`

## get: focused

autocomplete

```ts "focused"
const app = new DiscordHono().autocomplete('hello', c => {
  console.log(c.focused?.name) // オプション名
  console.log(c.focused?.value) // オプションの値
  return c.resAutocomplete(...)
})
```

フォーカスされているオプションのオブジェクト。

[公式ドキュメント](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure)

## get: cronEvent

cron

```ts "cronEvent"
const app = new DiscordHono().cron('', c => console.log(c.cronEvent.cron))
```

[scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) の第一引数の event オブジェクトです。

## get: rest

`c.rest` = `createRest(c.env.DISCORD_TOKEN)`  
[Rest](/ja/interactions/rest/)

## .res()

command, component, modal

```ts "res"
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res({ content: 'World!!' }))
```

第1引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。  
第2引数は FileData または FileData[] です。  
FileData = { blob: Blob, name: 'file.name' }

## .resDefer()

command, component, modal

```ts "resDefer"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(async c => await c.followup('Followup テキスト')),
)
```

3秒以内に Discord のインタラクションに応答しないとエラーが発生します。  
時間のかかる処理を行うときは、`.resDefer()` を使用して、その後の処理を引数に含めるといいでしょう。

## .resAutocomplete()

autocomplete

```ts "resAutocomplete"
const app = new DiscordHono().autocomplete(
  'hello',
  c =>
    c.resAutocomplete(
      new Autocomplete(c.focused?.value).choices(
        { name: 'world', value: 'world!!!' },
        { name: 'hi', value: 'hi!' },
      ),
    ),
  c => c.res(c.var.option),
)
```

引数は Autocomplete インスタンスまたは [APICommandAutocompleteInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10/interface/APICommandAutocompleteInteractionResponseCallbackData) です。

## .resModal()

command, component

```ts "resModal"
const app = new DiscordHono().command('ping', c =>
  c.resModal(
    new Modal('unique-id', 'タイトル').row(
      new TextInput('text-id', 'テキストラベル'),
    ),
  ),
)
```

引数は Modal インスタンスまたは [APIModalInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10/interface/APIModalInteractionResponseCallbackData) です。

## .resActivity()

command, component, modal

```ts
const app = new DiscordHono().command('activity', c => c.resActivity())
```

アクティビティを起動します。（アクティビティが有効になっているアプリでのみ使用可能）

## .update()

component

`c.res()` と `c.resDefer()` を送信済みメッセージの上書きモードに変更します。

```ts "update"
const app = new DiscordHono().component('button', c =>
  c.update().res('Update Text'),
)
```

## .followup()

command, component, modal

```ts "followup"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(
    async c =>
      await c.followup('Followup テキスト or Data', {
        blob: Blob,
        name: 'image-blob.png',
      }),
  ),
)
```

`.followup()` は Defer の後のメッセージの更新に利用します。

第1引数は string または [RESTPatchAPIInteractionOriginalResponseJSONBody](https://discord-api-types.dev/api/discord-api-types-v10#RESTPatchAPIWebhookWithTokenMessageJSONBody) です。  
第2引数は FileData または FileData[] です。  
FileData = { blob: Blob, name: 'file.name' }

## .followupDelete()

command, component, modal

```ts "followupDelete"
c.update().resDefer(c.followupDelete)
```

## .flags()

command, component, modal

```ts "flags"
const app = new DiscordHono()
app.command('ping', c =>
  c.flags('EPHEMERAL', 'SUPPRESS_NOTIFICATIONS').res('Pong!!'),
)
```

[こちら](https://discord.com/developers/docs/resources/message#message-object-message-flags)のメッセージフラグを追加します。
