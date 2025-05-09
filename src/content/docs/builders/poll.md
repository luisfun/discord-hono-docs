---
title: Poll
description: A guide to creating and customizing polls in Discord Hono, including how to set fields such as questions and answers.
sidebar:
  order: 6
---

```ts "Poll"
import { DiscordHono, Poll } from 'discord-hono'

const app = new DiscordHono().command('poll', c =>
  c.res({
    poll: new Poll()
      .question('What is your favorite color?')
      .answers(['🔴', 'Red'], ['🟢', 'Green'], 'Blue', 'Yellow'),
  }),
)
```

## Method

```ts
const poll = new Poll()
  .question()
  .tyanswerse()
  .duration()
  .allow_multiselect()
  .layout_type()
```

Please refer to the [Official Docs](https://discord.com/developers/docs/resources/poll).
