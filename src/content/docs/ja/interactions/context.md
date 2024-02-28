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

## get: req

command, component, modal

インタラクションのリクエストそのままです。

## get: interaction

command, component, modal

`c.interaction` = `JSON.parse(await c.req.text())`

[公式ドキュメント](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object)を参照してください。

## get: values

command

```ts "values"
const app = new DiscordHono().command('ping', c => c.res(c.values.OPTION_NAME))
```

コマンドオプションのデータが入っています。

## get: cronEvent

cron

```ts "cronEvent"
const app = new DiscordHono().cron('', c => console.log(c.cronEvent.cron))
```

[scheduled()](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) の第一引数の event オブジェクトです。

## .resBase()

command, component, modal

```ts "resBase"
const app = new DiscordHono().command('ping', c =>
  c.resBase({ type: 4, data: { content: 'テキストを返答' } }),
)
```

引数は [APIInteractionResponse](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponse) です。  
[公式ドキュメント](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure)を参照してください。

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

## .resUpdate()

component

```ts "resUpdate"
const app = new DiscordHono().component('button', c =>
  c.resUpdate('text or data'),
)
```

送信済みのメッセージを上書きします。

引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。

## .resUpdateDefer()

component

```ts "resUpdateDefer"
const app = new DiscordHono().component('button', c =>
  c.resUpdateDefer(async c => await c.followup('Followup テキスト')),
)
```

メッセージの上書きを遅延させます。

## .resRepost()

component

```ts "resRepost"
const app = new DiscordHono().component('button', c =>
  c.resRepost('再投稿テキスト'),
)
```

インタラクション元の投稿を削除して、新しいメッセージを送信します。

引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData) です。  
引数が空の場合、メッセージの削除のみ行います。

## .\*\*\*Ephemeral()

.resEphemeral() .followupEphemeral() .resRepostEphemeral()

インタラクションを実行したユーザーにのみ見えるメッセージを送信します。
