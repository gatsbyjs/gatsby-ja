# スタイルガイド

ドキュメントを日本語へ翻訳する際に参照すべきスタイルガイドです。内容の改定を提案したい場合は、Issue を立てるか、あるいは Discord で議論してください。

## 心構え

原文をなるべく忠実に翻訳したいという気持ちが先行してしまい、直訳のような文章になってしまうことがあります。意訳を恐れず、日本語として自然な文章を心掛けましょう。

## ガイドライン

### コードブロック内のテキスト

コードブロック内に関しては、基本的にコメント以外を翻訳しないでください。任意で文字列リテラルの中身を翻訳することはできますが、コード自体はそのままにしてください！

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
// 例
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

❌ 悪い：

```js
// 例
import React from "react"
export default () => (
  // 'purple' はCSSのキーワード
  <div style={{ color: `紫`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 絶対にしないで：

```js
インポート リアクト フロム "リアクト"
エクスポート デフォルト () => (
   <div スタイル={{color: `紫`, fontSize:` 72px`}}>こんにちは、Gatsby！</div>
)
```

### 外部リンク

もし外部リンクが[MDN]や[Wikipedia]のような記事の場合であって、かつ十分なクオリティの日本語版が存在する場合は、翻訳版へのリンクを貼りましょう。

[mdn]: https://developer.mozilla.org/en-US/
[wikipedia]: https://en.wikipedia.org/wiki/Main_Page

例：

```md
React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object).
```

✅ 良い：

```md
React エレメントは[イミュータブル](https://ja.wikipedia.org/wiki/イミュータブル)です。
```

同等のリンクが存在しない場合（Stack Overflow、YouTube 等）、英語リンクをそのまま使用してください。

### 文体

敬体（ですます調）を使って、読者に一対一で語りかけるように書いてください。

✅ 良い：

```md
もし React について詳しくなければ、まずは[こちらのガイド](https://reactjs.org)をご覧ください。
```

❌ ダメかも：

```md
React について詳しくない方は、まず[こちらのガイド](https://reactjs.org)を参照してください。
```

## 用語集

頻出する用語は合意を得た上でリストに加えてください。さらに[prh.yml](/prh.yml)にルールを追加することで、CI にチェックを任せることができます。

| 用語   | 和訳       |
| ------ | ---------- |
| Plugin | プラグイン |
| Theme  | テーマ     |
| Query  | クエリー   |

## 校正

`gatsby-ja`では文章の校正に textlint を活用しています。

### `npm run lint`

`npm run lint`を実行して、ローカルで textlint による校正を受けることができます。ほとんどのエラーは`npm run format`を実行することで自動修正できます。

## よくある質問

### 画像のリンクが切れている

各言語版のリポジトリーには画像アセットが含まれていないため表示されない仕様になっています。

### 他の Markdown 記事へのリンクが切れている

Gatsby でプレビューをする前提で書かれているため、生の Markdown から飛ぶと 404 が表示されます。ブラウザー上で URL の末尾に`.md`をつけることで正しい記事に移動できます。
