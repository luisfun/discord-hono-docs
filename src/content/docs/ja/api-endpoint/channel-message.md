---
title: Channel Message
---

```ts
import { DiscordHono, postMessage } from 'discord-hono'

const app = new DiscordHono()
app.command('ping', async c => {
  const token = c.env.DISCORD_TOKEN
  const channelId = c.interaction.channel.id
  await postMessage(token, channelId, '別の投稿')
  return c.res('投稿を返答')
})

export default app
```

## postMessage()

```ts
await postMessage('DISCORD_TOKEN', 'Channel ID', 'string or data', ...files)
```

第3引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData)。

## deleteMessage()

```ts
await deleteMessage('DISCORD_TOKEN', 'Channel ID', 'Message ID')
```

## followupMessage()

```ts
await followupMessage(
  'Application ID',
  'Interaction Token',
  'string or data',
  ...files,
)
```

第3引数は string または [APIInteractionResponseCallbackData](https://discord-api-types.dev/api/next/discord-api-types-v10#APIInteractionResponseCallbackData)。

`c.followup()` では、これを使っています。

## followupDeleteMessage()

```ts
await followupDeleteMessage('Application ID', 'Interaction Token', 'Message ID')
```

`c.followupDelete()`、`c.resRepost()` では、これを使っています。
