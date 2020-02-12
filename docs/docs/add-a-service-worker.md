---
title: Service Worker を追加する
---

## Service Worker とは？

Service Worker はウェブページとは別にバックグラウンドで実行されるスクリプトです。ウェブページやユーザーのインタラクションを必要としない機能を可能にします。不安定な回線でのサイトの使いやすさを向上させ、優れたユーザーエクスペリエンスを実現するには必要不可欠です。

プッシュ通知やバックグラウンド同期などの機能をサポートします。

## `gatsby-plugin-offline` を利用して Gatsby で Service Worker を使う

Gatsby は [gatsby-plugin-offline](https://www.npmjs.com/package/gatsby-plugin-offline) という Service Worker の作成、読み込みのための素晴らしいプラグインインターフェースを用意しています。

このプラグインは [マニフェストプラグイン](https://www.npmjs.com/package/gatsby-plugin-manifest) と共に使うことができます。（Service Worker にマニフェストファイルを含めるために、マニフェストプラグインの後にオフラインプラグインを追加することに注意してください）。

## `gatsby-plugin-offline` をインストール

`npm install --save gatsby-plugin-offline`

プラグインを `gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-offline`]
```

## 参考資料

- [Service Worker の紹介](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja)
- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)
