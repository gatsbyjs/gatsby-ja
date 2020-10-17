---
title: ページ間のハイパーリンク
---

このガイドは Gatsby におけるページ間のリンクを作成する方法について説明します。

## Gatsby のリンクコンポーネント

Gatsby においては `<Link />` コンポーネントをサイト内部のページ間リンクに使用します。外部リンク（Gatsby 外で管理しているウェブサイト）へのリンクを作成する場合は一般滝な HTML における `<a>` タグを使用します。

## 内部リンクに `<Link />` コンポーネントを利用する

下記が、Gatsby サイト内の 2 ページをリンクするコードサンプルです。

ページコンテンツ（例： `src/pages/index.js`）を開くと、 `Link` コンポーネントが Gatsby からインポートされています。 `<Link />` コンポーネントは `to` プロパティに記載されているパス、ここでは `"/contact/"` へのリンクを生成します。

```jsx
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <Link to="/contact/">Contact</Link>
  </div>
)
```

このコードは contact ページへのリンクを生成し、ビルド時に `<a href="/contact/">` へ置き換わります。さらに、Link コンポーネントによって追加されたリンクはパフォーマンス上のメリットを得ることができます。 `to` 要素はファイルネームで記載します。この場合、リンクは `/contact.jsx` へ向いています。

> **ヒント:** `"/"` を `to` 要素に指定することでホームページに遷移できます。

## `<a>` タグを外部リンクとして設定する

もし、あなたの Gatsby ウェブサイト外にリンクを作成したい場合（違うドメインなど）、 HTML の `<a>` タグを Link コンポーネントの代わりに使う必要があります。

さらに、外部リンクを別ウィンドウで開きたい場合は `target` 要素を設定し、 `rel` 要素に脆弱性対応として [Referer ヘッダーのプライバシーとセキュリティの考慮事項](https://developer.mozilla.org/ja/docs/Web/Security/Referer_header:_privacy_and_security_concerns) を参考にいくつかの値を設定する必要があります。

```jsx
import React from "react"

export default () => (
  <div>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
      External link
    </a>
  </div>
)
```

[外部リンクを示すアイコン](https://thenounproject.com/term/new-window/2864/) を追加するか、その他の外部リンクであることを示す仕組みを提供することを推奨しています。

## 追加リソース

- チュートリアル [Part 1](/tutorial/part-one/#linking-between-pages/) にコードサンプルがあります
- ルーティングについて詳しく知りたい場合は [API doc for Gatsby Link](/docs/gatsby-link/) を参照してください
