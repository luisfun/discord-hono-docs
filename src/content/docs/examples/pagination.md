---
title: Pagination
description: Example of implementing pagination in DiscordHono with buttons for navigating between pages, including handling command and component context for dynamic page content.
---

```ts
// src/handlers/pagination.ts
import {
  buttonStyle,
  type CommandContext,
  type ComponentContext,
  makeActionRow,
  makeButton,
  makeEmbed,
  makeModal,
  makeSlashCommand,
  makeStringOption,
  makeTextInput,
} from 'discord-hono'
import { type Env, factory } from '../init.js'

const pageContent = (
  c: CommandContext<Env> | ComponentContext<Env>,
  page: number,
  content: string,
): ReturnType<typeof c.res> => {
  ///// Process /////
  const _db = c.env.DB
  ///// Response Build /////
  const maxPage = 3
  const embed = makeEmbed()
    .title('Title')
    .description(`${content}\nPage: ${page}`)
  const previousButton = component_page.component
    .clone()
    .emoji({ name: '⬅️' } as const)
    .label('Previous')
    .style(buttonStyle.Success)
    .custom_value(JSON.stringify([page - 1, content]))
    .disabled(page <= 1)
  const nextButton = component_page.component
    .clone()
    .emoji({ name: '➡️' } as const)
    .label('Next')
    .style(buttonStyle.Primary)
    .custom_value(JSON.stringify([page + 1, content]))
    .disabled(maxPage <= page)
  const components = [makeActionRow([previousButton, nextButton])]
  return c.res({ embeds: [embed], components })
}

export const command_page = factory.command(
  makeSlashCommand('page', 'pagination').options([
    makeStringOption('content', 'page content').required(true),
  ]),
  c => pageContent(c, 1, c.var.content),
)

export const component_page = factory.component(makeButton('page', ''), c => {
  const arr: [number, string] = JSON.parse(c.ref.custom_value ?? '')
  return pageContent(c.update(), ...arr)
})
```
