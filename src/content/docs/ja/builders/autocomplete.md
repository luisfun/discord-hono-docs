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

初期化の引数は検索するワードです。  
`.choices()` の引数に全ての選択肢をいれます。  
Autocomplete は検索ワードに部分一致する choices のみを返却します。
