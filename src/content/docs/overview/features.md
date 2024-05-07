---
title: Features
sidebar:
  order: 2
---

- **Easy Build** - Verify included. Code for each command is easier to write.
- **Lightweight** - We make them as light as possible. Discord Hono has zero dependencies.
- **TypeScript** - TypeScript support.

## Development Direction

Priority items to address:

- Run on Cloudflare Workers
- Receiving and responding to Discord Interactions

Lower priority, but gradually addressing:

- Run in environments other than Cloudflare
- Requests and responses to REST API

## Server-based Bot vs Serverless Bot

||Server-based Bot|Serverless Bot|
|---|---|---|
|Capabilities|Everything|Responding to commands<br>Anything that can be done with REST API|
|Limitations|-|Cannot maintain constant connection|
|Scaling|Requires various adjustments|Auto-scale|
|Cost|Free: With downtime<br>Large-scale: Can be expensive|Free: No downtime<br>Large-scale: Can be low-cost|
|Libraries|Discord.js<br>Discord.py<br>Discordeno etc...|DiscordHono<br>...? (Don't know others)|

### Capabilities and Limitations

- Server-based Bot
  - Can do everything
- Serverless Bot
  - Can respond to commands and anything that can be done with REST API
  - Cannot maintain constant connection

Serverless Bots cannot maintain a constant connection (like connecting to VC, monitoring comments and responding).  
This is the biggest disadvantage of Serverless Bots.  
On the other hand, if you don't plan to maintain a constant connection, it might be worth considering a Serverless Bot.

### Scaling

- Server-based Bot
  - Requires various adjustments
- Serverless Bot
  - Auto-scale

With Serverless Bots, you don't have to worry about scaling.

### Cost

- Server-based Bot
  - Free: With downtime
  - Large-scale: Can be expensive
- Serverless Bot
  - Free: No downtime
  - Large-scale: Can be low-cost

Since Serverless Bots are not always running, they can be low-cost.  
Even for free use, most services do not have downtime.

### References

https://github.com/IanMitchell/interaction-kit?tab=readme-ov-file#http

https://github.com/discordeno/discordeno/tree/main/packages/rest#discordeno-rest
