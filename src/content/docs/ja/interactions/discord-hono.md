---
title: DiscordHono
description: Discord Hono を使用して Discord ボットを作成するための詳細なガイドです。コマンド、コンポーネント、オートコンプリート、モーダル、 cron ジョブ、カスタム設定などが含まれています。
sidebar:
  order: 1
---

```ts "DiscordHono"
import { DiscordHono } from 'discord-hono'

const app = new DiscordHono()
app.command('ping', c => c.res('Pong!!'))

export default app
```

## .command()

```ts /command(?!s)/ "ping" "image"
const commands = [
  new Command('ping', 'Pong を返答'),
  new Command('image', 'Image を返答'),
]
const app = new DiscordHono()
  .command('ping', c => c.res('Pong!!'))
  .command('image', c => c.res('Image!!'))
```

`Command()` の第1引数と `.command()` の第1引数を一致させてください。  
一致した `.command()` の第2引数が実行されます。

第1引数に `''` を指定すると、キャッチオールパターンとして機能します。

## .component()

```ts /component(?!s)/ "button-1" "button-2"
const app = new DiscordHono()
  .command('components', c =>
    c.res({
      content: 'まだボタンはクリックされていない',
      components: new Components().row(
        new Button('button-1', 'ボタン'),
        new Button('button-2', '2つ目'),
      ),
    }),
  )
  .component('button-1', c => c.resUpdate('ボタン がクリックされた'))
  .component('button-2', c => c.resUpdate('2つ目 がクリックされた'))
```

コンポーネント要素 `Button()` の第1引数と `.component()` の第1引数を一致させてください。  
一致した `.component()` の第2引数が実行されます。

第1引数に `''` を指定すると、キャッチオールパターンとして機能します。

## .autocomplete()

```ts /autocomplete(?!')/ "hello"
const commands = [
  new Command('hello', 'command').options(
    new Option('option', 'selector').autocomplete().required(),
  ),
]
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

コマンドの `Option()` に `.autocomplete()` を付与してください。  
`Command()` の第1引数と `.autocomplete()` の第1引数を一致させてください。  
一致した `.autocomplete()` の第2引数が選択肢生成用のハンドラ、第3引数が実行用のハンドラです。

`.autocomplete()` の第3引数は `.command()` の第2引数と同じです。

## .modal()

```ts /modal(?!')/ "modal-1"
const app = new DiscordHono()
  .command('modal', c =>
    c.resModal(
      new Modal('modal-1', 'モーダル タイトル')
        .row(new TextInput('text-1', 'テキスト'))
        .row(new TextInput('text-2', '2つ目')),
    ),
  )
  .modal('modal-1', c => c.res('モーダルが送信された'))
```

`Modal()` の第1引数と `.modal()` の第1引数を一致させてください。  
一致した `.modal()` の第2引数が実行されます。

第1引数に `''` を指定すると、キャッチオールパターンとして機能します。

## .cron()

```ts "cron" "0 0 * * *"
const app = new DiscordHono()
  .cron(
    '0 0 * * *',
    async c =>
      await Rest(c.env.DISCORD_TOKEN).post(
        '/channels/{channel.id}/messages',
        ['CHANNEL_ID'],
        { content: '毎日投稿' },
      ),
  )
  .cron(
    '',
    async c =>
      await Rest(c.env.DISCORD_TOKEN).post(
        '/channels/{channel.id}/messages',
        ['CHANNEL_ID'],
        { content: '他のCronトリガーの投稿' },
      ),
  )
```

```toml "0 0 * * *"
// wrangler.toml
name = "example"
main = "src/index.ts"
compatibility_date = "2024-02-08"
[triggers]
crons = [ "0 * * * *", "0 0 * * *" ]
```

`.cron()` の第1引数と wrangler.toml の crons を一致させてください。  
一致した `.cron()` の第2引数が実行されます。

第1引数に `''` を指定すると、キャッチオールパターンとして機能します。

## .fetch()

[こちら](https://hono.dev/api/hono#fetch)を参照してください。  
できるだけ Hono の fetch() と同じようになるようにしています。

## .scheduled()

`export default app` を使っていれば、`.scheduled()` は含まれています。

## 初期オプション

### verify

Cloudflare の環境であれば、使う必要はありません。

[`discord-interactions`](https://github.com/discord/discord-interactions-js)

```ts
import { verifyKey } from 'discord-interactions'
const app = new DiscordHono({ verify: verifyKey })
```

[`discord-verify`](https://github.com/ianmitchell/interaction-kit/tree/main/packages/discord-verify)

```ts
import { verify, PlatformAlgorithm } from 'discord-verify'
const app = new DiscordHono({
  verify: (...args) =>
    verify(...args, crypto.webcrypto.subtle, PlatformAlgorithm.OldNode),
})
```

### discordEnv

[Example](https://github.com/luisfun/discord-hono-example) と同じような環境変数であれば、使う必要はありません。  
環境変数を別の名前で保存したときや、Cloudflare 以外の環境の時に利用します。

```ts
const app = new DiscordHono({
  discordEnv: env => ({
    APPLICATION_ID: env.DISCORD_APPLICATION_ID,
    PUBLIC_KEY: env.DISCORD_PUBLIC_KEY,
    TOKEN: env.DISCORD_TOKEN,
  }),
})
```

### HandlerMap (β)

`.command()` や `.component()` などの第1引数に正規表現を使用したい場合に利用します。

```ts
const app = new DiscordHono<Env, RegExp>({ HandlerMap: RegExpMap })
```
