# スタイルガイド

Use this file for language-specific style rules to follow for translation.

## ルール

### コードブロック内のテキスト

Leave text in code blocks untranslated except for comments. You may optionally translate text in strings, but be careful not to translate strings that refer to code!

例：

```js
// Example
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ 良い：

```js
// Ejemplo
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ 良い：

```js
// 例
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ ダメ：

```js
// 例
import React from "react"
export default () => (
  // 'purple' is a CSS keyword
  <div style={{ color: `morado`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 絶対にダメ！

```js
importar Reaccionar desde "reaccionar"
exportar defecto () => (
   <div estilo = {{color: `morado`, fontSize:` 72px`}}> こんにちは、Gatsby！ </div>
)
```

### 外部リンク

If an external link is to an article in a reference like [MDN] or [Wikipedia], and a version of that article exists in your language that is of decent quality, consider linking to that version instead.

[mdn]: https://developer.mozilla.org/en-US/
[wikipedia]: https://en.wikipedia.org/wiki/Main_Page

例：

```md
React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object).
```

✅ 良い：

```md
Los elementos de React son [inmutables](https://es.wikipedia.org/wiki/Objeto_inmutable).
```

For links that have no equivalent (Stack Overflow, YouTube videos, etc.), just use the English link.

### 語り方

ですます調で、読者に直接語りかけるように書いてください。

✅ OK:

```md
もし React について詳しくなければ、まずは[こちらのガイド](https://reactjs.org)をご覧ください。
```

❌ DON'T:

```md
React について詳しくない方は、まず[こちらのガイド](https://reactjs.org)を参照してください。
```

## 用語集

Use this section to list how common technical terminology should be translated.

Also, you might want to add a word to [prh.yml](/prh.yml) to let CI checks terminology mismatches.

| 用語   | 和訳       |
| ------ | ---------- |
| Plugin | プラグイン |
| Theme  | テーマ     |
| Query  | クエリ     |
