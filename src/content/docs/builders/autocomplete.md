---
title: Autocomplete
sidebar:
  order: 3
---

```ts /(?<!res)Autocomplete/
return c.resAutocomplete(
  new Autocomplete(c.focused?.value).choices(
    { name: 'world', value: 'world!!!' },
    { name: 'hi', value: 'hi!' },
  ),
)
```

The initialization argument is the word to search for.  
The `.choices()` argument contains all choices.  
Autocomplete returns only those choices that partially match the search word.
