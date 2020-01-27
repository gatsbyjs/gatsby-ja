---
title: マニフェストファイルを追加しましょう！
---

[audit with Lighthouse](/docs/audit-with-lighthouse/) を実行したとき、"Progressive Web App" カテゴリのスコアが低いことに気付くかも知れません。ここでは、そのスコアを改善する方法を紹介します。

まず初めに PWA とはなんでしょうか？

They are regular websites that take advantage of modern browser functionality to augment the web experience with app-like features and benefits. Check out [Google's overview](https://developers.google.com/web/progressive-web-apps/) of what defines a PWA experience and the [Progressive web apps (PWAs) doc](/docs/progressive-web-app/) to learn how a Gatsby site is a progressive web app.

The inclusion of a web app manifest is one of the three generally accepted [baseline requirements for a PWA](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1).

[Google](https://developers.google.com/web/fundamentals/web-app-manifest/) からの引用：

> The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when 'installed' on the user's mobile device or desktop.

[Gatsby's manifest plugin](/packages/gatsby-plugin-manifest/) configures Gatsby to create a `manifest.webmanifest` file on every site build.

## Using `gatsby-plugin-manifest`

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

Gatsby サイトに Web マニフェストを追加するために必要なことはたったこれだけです！ここでは基本構成を例に反映する方法を紹介しています。その他のオプションについては、 [plugin reference](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode) をご覧ください。
