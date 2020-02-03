---
title: マニフェストファイルの追加
---

[Lighthouse による監査](/docs/audit-with-lighthouse/) を実行したとき、「プログレッシブウェブアプリ」カテゴリのスコアが低いことに気付くかも知れません。ここでは、そのスコアを改善する方法を紹介します。

はじめに、 PWA とはなんでしょうか？

これらは、モダンブラウザーの機能を利用して、通常のウェブサイトにアプリのような機能と利点を備えて、WEB 体験を強化したものです。 Gatsby サイトをプログレッシブウェブアプリにしている方法の詳細については、PWA の体験と [プログレッシブウェブアプリ (PWA) のドキュメント](/docs/progressive-web-app/)の定義に関する [Google の概要](https://developers.google.com/web/progressive-web-apps/)をご覧ください。

ウェブアプリマニフェストを含めることは、一般的な [PWA の基本要件](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1)の 3 つのうちの 1 つです。

[Google](https://developers.google.com/web/fundamentals/web-app-manifest/) からの引用：

> ウェブアプリマニフェストは、ウェブアプリケーションと、それがユーザーのモバイルデバイスやデスクトップにインストールされたときの動作をブラウザーに伝えるシンプルな JSON ファイルです。

[Gatsby のマニフェストプラグイン](/packages/gatsby-plugin-manifest/) はすべてのサイトのビルドで `manifest.webmanifest` を作成するように Gatsby を構成します。

## `gatsby-plugin-manifest` の使い方

1.  プラグインをインストールします。

```shell
npm install --save gatsby-plugin-manifest
```

2. `src/images/icon.png` にアプリのファビコンを追加します。このアイコンはマニフェストにある全ての画像を作成するために必要です。詳細は [`gatsby-plugin-manifest`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-manifest/README.md) のドキュメントをご覧ください。

3. `gatsby-config.js` の `plugins` にプラグインを追記します。

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
  ]
}
```

Gatsby サイトにウェブマニフェストを追加するために必要なことはたったこれだけです！ここでは基本構成を例に反映する方法を紹介しています。その他のオプションについては、 [プラグインリファレンス](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode) をご覧ください。
