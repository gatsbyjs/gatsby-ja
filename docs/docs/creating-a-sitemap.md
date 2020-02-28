---
title: サイトマップを生成する
---

## サイトマップとは

[XML sitemap](https://support.google.com/webmasters/answer/156184?hl=ja) は、ウェブサイトの重要なページのリストで、Google のような検索エンジンがこれらのページをすべてクロールできるように用いられます。サイトマップは、検索エンジンがあなたのウェブサイトの構造を理解することを助けます。

これは、あなたのウェブサイトの地図であると考えてください。あなたのウェブサイトの全ページが何であるかを示します。

## [gatsby-plugin-sitemap](/packages/gatsby-plugin-sitemap/) を使う

XML サイトマップを生成するために、[`gatsby-plugin-sitemap`](/packages/gatsby-plugin-sitemap/) プラグインを利用します。

下記のコマンドでプラグインをインストールします。
`npm install --save gatsby-plugin-sitemap`

### 設定方法

プラグインのインストールが終了したら、`gatsby-config.js` に、下記のような設定を追加します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.example.com`,
  },
  plugins: [`gatsby-plugin-sitemap`],
}
```

**ヒント：** `siteUrl` は必須項目です、空白のままにしないでください。

サイトマップの生成は、本番環境のビルド時のみ行われるため、まずはビルドコマンド (`npm run build`)を実行します。Gatsby でサイトマップを生成する作業はこれだけです！既定では、/sitemap.xml にサイトマップが生成され、ウェブサイトの全ページがサイトマップに含まれています。もちろん、プラグインでこのデフォルト設定を変更することも可能です。

### 追加設定

追加の設定を行いたい場合は、[`gatsby-plugin-sitemap` のドキュメント](/packages/gatsby-plugin-sitemap)を確認してください。

## 追加情報

- サイトマップの生成に関する、さらに詳しい情報を知りたい場合、Gatsby ブログの [gatsby-plugin-advanced-sitemap](/blog/2019-05-07-advanced-sitemap-plugin-for-seo/) の確認をおすすめします
