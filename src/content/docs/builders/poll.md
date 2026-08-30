---
title: Poll
description: A guide to creating and customizing polls in Discord Hono, including how to configure fields such as the question and answers.
sidebar:
  order: 6
---

## Available Builders

```ts
import {
  // Main
  makePoll,
  // Child
  makePollMedia,
  makePollAnswer,
} from 'discord-hono'
```

## Poll

```ts "makePoll"
import { DiscordHono, makePoll } from 'discord-hono'

const app = new DiscordHono().command('poll', c =>
  c.res({
    poll: makePoll('What is your favorite color?', [['🔴', 'Red'], ['🟢', 'Green'], 'Blue', 'Yellow'])
      .allow_multiselect(true)
      .duration(1),
  }),
)
```

If your editor supports autocompletion, typing `.` will show a list of available methods.

Please refer to the [Official Docs](https://docs.discord.com/developers/resources/poll) for details on each method.
