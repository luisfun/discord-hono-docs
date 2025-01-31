---
title: Features
description: Overview of key features, comparisons between server-based and serverless Discord bots, and considerations for scaling, cost, and capabilities.
sidebar:
  order: 2
---

- **Intuitive API** - Influenced by Hono, offering a familiar and easy-to-use interface
- **Lightweight** - Zero dependencies, optimized for performance
- **Type-Safe** - Native support for TypeScript

## Server-based Bot vs Serverless Bot

|              | Server-based Bot                                     | Serverless Bot                                                    |
| ------------ | ---------------------------------------------------- | ----------------------------------------------------------------- |
| Capabilities | Everything                                           | Responding to commands<br>Anything that can be done with REST API |
| Limitations  | -                                                    | Cannot maintain constant connection                               |
| Scaling      | Requires various adjustments                         | Auto-scale                                                        |
| Cost         | Free: With downtime<br>Large-scale: Can be expensive | Free: No downtime<br>Large-scale: Can be low-cost                 |
| Libraries    | Discord.js<br>Discord.py<br>Discordeno etc...        | DiscordHono<br>...? (I don't know anything else)                  |

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
Even for free use, most services do not have downtime. (More precisely, it's fast enough that the downtime is negligible)

### References

https://github.com/IanMitchell/interaction-kit?tab=readme-ov-file#http

https://github.com/discordeno/discordeno/tree/main/packages/rest#discordeno-rest

## Development Direction

Priority items to address:

- Run on Cloudflare Workers
- Receiving and responding to Discord Interactions

Lower priority, but gradually addressing:

- Run in environments other than Cloudflare
- Requests and responses to REST API
