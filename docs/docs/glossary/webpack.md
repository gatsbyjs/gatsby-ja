---
title: webpack
disableTableOfContents: true
---

webpack がどんなもので、どう動き、Gatsby がウェブサイト開発を加速するためにどのように使っているかを学びましょう。

## webpack とは？

[webpack](/docs/glossary#webpack) は<q>静的モジュールバンドラー</q>、つまり JavaScript のかたまりやモジュールを集めて、それらを 1 つ以上の最適化されたバンドルにコンパイルするソフトウェアです。webpack は Gatsby を支えるコアソフトウェアパッケージのひとつです。

webpack は<strong>依存関係グラフ</strong>を構築することで動きます。言いかえると、webpack はどのモジュールがあなたのサイトを動かすために他のモジュールに依存しているかを割り出します。<strong>モジュール</strong>とは、何らかの機能をカプセル化したコードのかたまりです。1 つの JavaScript 関数のように小さいかもしれませんし、[React](/docs/glossary#react) のように色々備えたライブラリかもしれません。

webpack は `webpack.config.js` のコンテンツから依存関係を割り出します。`webpack.config.js` は 1 つ以上の<strong>エントリーポイント</strong>を持ちます。エントリーポイントとは、どのファイルを依存関係の開始点（複数あることも）として使うかを webpack に伝えます。以下の例を見てみましょう。

```javascript
module.exports = {
  entry: "/scripts/index.js",
}
```

webpack は JavaScript と JSON ファイルをデフォルトで処理しますが、追加のソフトウェアと設定により CSS やメディアファイルのサポートを追加できます。例えば、Gatsby は[グローバルな CSS ファイル](/docs/global-css/)、 [コンポーネントスコープの CSS モジュール](/docs/css-modules/)、[CSS-in-JS](/docs/css-in-js/) をサポートする自身の [`webpack.config.js`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/webpack.config.js) ファイルとともに出荷されています。

また、webpack を使うことで CSS や JavaScript をブラウザにどのように届けるかも最適化できます。webpack は<strong>[コード分割](https://webpack.js.org/guides/code-splitting/)</strong>として知られる仕組みをサポートしています。コード分割により、コードを必要時またはリクエスト時に読み込まれる数個のバンドルに分割できます。Gatsby はこの仕組みを使うようにすでに設定されています。この恩恵を受けるのに追加のセットアップは必要ありません。

もし [Sass/SCSS](/docs/sass/) のような仕組みのサポートを追加したい場合は、Gatsby はそのままではサポートしていませんが、[webpack にカスタム設定を追加したり](/docs/add-custom-webpack-config/)、あるいはコミュニティによって貢献された [Gatsby プラグイン](/docs/plugins/)のひとつを使えます。

### webpack についてさらに学ぶ

- [webpack](https://webpack.js.org/) 公式サイト
- [カスタム設定](/docs/customization/) Gatsby ドキュメント
