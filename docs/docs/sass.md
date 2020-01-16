---
title: Gatsby で Sass を使用する
---

[Sass](https://sass-lang.com) は CSS にネストや変数、ミックスイン、セレクターの継承などを追加して拡張したものです。Gatsby では、プラグインを使用して Sass を適切な形式の CSS に変換できます。

Sass は `.sass` もしくは `.scss` ファイルを `.css` にコンパイルすることで、より高度な機能を備えたスタイルシートを作成できます。

> **メモ**: `.sass` と `.scss` ファイルはスタイルを記述する文法が異なります。全ての有効な CSS 記法は SCSS でも使用可能であるため、もっとも使いやすく人気があります。これらの違いについては、[Sass documentation](https://sass-lang.com/documentation/syntax) をご覧ください。

## Sass のインストールと設定

このガイドでは、Gatsby プロジェクトが準備されている必要があります。もしプロジェクトの準備が完了していない場合は、[**クイックスタートガイド**](/docs/quick-start/)を参照しましょう。

1.  Gatsby プラグイン [**gatsby-plugin-sass**](/packages/gatsby-plugin-sass/) および v2.0.0 以降の `node-sass` をインストールします。

`npm install --save node-sass gatsby-plugin-sass`

2.  プラグインを `gatsby-config.js` ファイルに追記します。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-sass`],
```

> **メモ**: パスや `css-loader` のオプションなど、[追加のプラグインオプション](/packages/gatsby-plugin-sass/#other-options)を設定できます。

3.  スタイルシートを `.sass` もしくは `.scss` ファイルに記述し、require もしくは import で取り込みます。

```css:title=styles.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css:title=styles.sass
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

```javascript
import "./styles.scss"
import "./styles.sass"
```

## その他の参照文献

- [Introduction to Sass](https://designmodo.com/introduction-sass/)
- [Sass documentation](https://sass-lang.com/documentation)
- [Gatsby starters that use Sass](/starters/?c=Styling%3ASCSS)
