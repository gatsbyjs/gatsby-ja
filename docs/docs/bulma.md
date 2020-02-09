---
title: Bulma
---

[Bulma](https://bulma.io) は Flexbox をベースにした、無料のオープンソース CSS フレームワークです。このガイドでは Gatsby で Bulma を使う方法を紹介します。

このガイドは、すでに Gatsby プロジェクトが設定済みであることを前提としています。まだ設定済みでない場合は、[**クイックスタートガイド**](/docs/quick-start) を読んでから戻ってきてください。

## インストール

まずは、必要なパッケージをインストールしましょう。

`yarn add bulma node-sass gatsby-plugin-sass`

次に `gatsby-config.js` に `gatsby-plugin-sass` を追加します。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-sass`],
```

## スタイルファイル

ではシンプルなスタイル変更と、bulma をインポートする文を含んだ scss ファイルを作っていきましょう。

（話を簡単にするため、index.js のページディレクトリにファイルを追加します）

```scss:title=mystyles.scss
@charset "utf-8";

// もし必要なら、Bulma をインポートする前に変数を変更しましょう
$title-color: #ff0000;

@import "~bulma/bulma.sass";
```

## Bulma を使う

最後に、スタイルをインポートしましょう。

index.js ファイルの内容を書き換えます。

```jsx:title=index.js
import React from "react"
import "./mystyles.scss"

const IndexPage = () => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h2 className="title is-2">Level 2 heading</h2>
          <p className="content">Cool content. Using Bulma!</p>
        </div>

        <div className="column is-four-fifths">
          <h2 className="title is-2">Level 2 heading</h2>
          <p className="content">This column is cool too!</p>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
```

以上で終わりです！これで通常どおり Bulma を使うことができます。

## 参考資料

- [Bulma documentation on how to use sass](https://bulma.io/documentation/customize/with-node-sass/)
