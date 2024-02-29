---
title: DiscordHono
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

## .cron()

```ts "cron" "0 0 * * *"
const app = new DiscordHono()
  .cron('0 0 * * *', async c =>
    postMessage(c.env.DISCORD_TOKEN, 'CHANNEL_ID', '毎日投稿'),
  )
  .cron('', async c =>
    postMessage(c.env.DISCORD_TOKEN, 'CHANNEL_ID', '他のCronトリガーの投稿'),
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

`''` を指定すると、残りの全ての crons にマッチします。  
cron ごとに処理を分ける必要がないときは、 `''` だけを指定すればいいです。

## .discordKey()

```ts "discordKey"
app.discordKey(env => ({
  APPLICATION_ID: env.YOUR_DISCORD_APPLICATION_ID,
  PUBLIC_KEY: env.YOUR_DISCORD_PUBLIC_KEY,
  TOKEN: env.YOUR_DISCORD_TOKEN,
}))
```

[Example](https://github.com/LuisFun/discord-hono-example) と同じような設定であれば、このメソッドは使いません。  
これは、キーを別の名前で保存したときや、Cloudflare 以外の環境の時に利用します。

## .fetch()

[こちら](https://hono.dev/api/hono#fetch)を参照してください。  
できるだけ Hono の fetch() と同じようになるようにしています。

## .scheduled()

`export default app` を使っていれば、`.scheduled()` は含まれています。

## 初期オプション

```ts
import { verifyKey } from 'discord-interactions'
const app = new DiscordHono({ verify: verifyKey })
```

`discord-interactions` の `verifyKey` を使うオプションです。  
Cloudflare Workers の環境であれば、使う必要はありません。
