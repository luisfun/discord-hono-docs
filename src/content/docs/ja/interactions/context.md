---
title: Context
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

```ts "var"
const app = new DiscordHono()
  .command('ping', c => c.res(c.var.OPTION_NAME))
  .modal('modal', c => c.res(c.var.TEXTINPUT_CUSTOM_ID))
```

`c.var` にはコマンドオプションの値が含まれます。  
モーダルの場合、custom_id の string が含まれます。

## .waitUntil()

`c.waitUntil` = `c.executionCtx.waitUntil`

## get: req

command, component, modal

インタラクションのリクエストそのままです。

## get: key

ハンドラーのトリガーとなった文字列です。

## get: interaction

command, component, modal

`c.interaction` = `JSON.parse(await c.req.text())`

[公式ドキュメント](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object)を参照してください。

## get: sub

command

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
      return c.res('g-sub2: ' + c.values.text)
    default:
      return c.res(c.sub.group + '-' + c.sub.command)
  }
})
```

`SubGroup` の第一引数が `c.sub.group` に入っています。  
`SubCommand` の第一引数が `c.sub.command` に入っています。  
`c.sub.string = (c.sub.group ? c.sub.group + ' ' : '') + c.sub.command`

## get: cronEvent

cron

```ts "cronEvent"
const app = new DiscordHono().cron('', c => console.log(c.cronEvent.cron))
```

[scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) の第一引数の event オブジェクトです。

## .res()

command, component, modal

```ts "res"
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('hello', c => c.res({ content: 'World!!' }))
```

引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。

## .resDefer()

command, component, modal

```ts "resDefer"
const app = new DiscordHono().command('ping', c =>
  c.resDefer(async c => await c.followup('Followup テキスト')),
)
```

3秒以内に Discord のインタラクションに応答しないとエラーが発生します。  
時間のかかる処理を行うときは、`.resDefer()` を使用して、その後の処理を引数に含めるといいでしょう。

## .resUpdate()

component

```ts "resUpdate"
const app = new DiscordHono().component('button', c =>
  c.resUpdate('text or data'),
)
```

送信済みのメッセージを上書きします。

引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。

## .resDeferUpdate()

component

```ts "resDeferUpdate"
const app = new DiscordHono().component('button', c =>
  c.resDeferUpdate(async c => await c.followup('Followup テキスト')),
)
```

メッセージの上書きを遅延させます。

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

第1引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。  
第2引数は FileData または FileData[] です。  
FileData = { blob: Blob, name: 'file.name' }

## .followupDelete()

command, component, modal

## .ephemeral()

command, component, modal

```ts
const app = new DiscordHono()
app.command('ping', c => c.ephemeral().res('Pong!!'))
```

インタラクションを実行したユーザーにのみ見えるメッセージを送信します。
