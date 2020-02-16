---
title: Service Worker を使ってオフラインサポートを追加する
---

[Lighthouse による評価](/docs/audit-with-lighthouse/) を実施したときに、Progressive Web App カテゴリのスコアが良くないことに気づいたかもしれません。ここではスコアを上げる方法について紹介します。

1. [マニフェストファイルを追加](/docs/add-a-manifest-file/)しましょう。オフラインプラグインが、作成された `manifest.webmanifest` をキャッシュできるように、オフラインプラグインの**前に**マニフェストプラグインを書いていることを確認してください。
2. ウェブサイトが PWA として認定されるために [Service Worker](https://developer.mozilla.org/ja-JP/docs/Web/API/Service_Worker_API) を使って、オフラインサポートを追加しましょう。[Gatsby のオフラインプラグイン](/packages/gatsby-plugin-offline/)は、Service Worker を作成してサイトがオフラインでも動作するようにさせ、悪い回線状況に対する耐性を高めます。

## Service Worker とは？

Service Worker はウェブページとは別にバックグラウンドで実行されるスクリプトです。ウェブページやユーザーのインタラクションを必要としない機能を可能にします。不安定な回線でのサイトの使いやすさを向上させ、優れたユーザーエクスペリエンスを実現するには必要不可欠です。

プッシュ通知やバックグラウンド同期などの機能をサポートします。

## `gatsby-plugin-offline` を利用して Gatsby で Service Worker を使う

Gatsby は [gatsby-plugin-offline](https://www.npmjs.com/package/gatsby-plugin-offline) という Service Worker の作成、読み込みのための素晴らしいプラグインインターフェースを用意しています。

[マニフェストプラグイン](https://www.npmjs.com/package/gatsby-plugin-manifest)と一緒に使うことをおすすめします。（Service Worker にマニフェストファイルを含めるために、マニフェストプラグインの後にオフラインプラグインを追加することに注意してください）。

## `gatsby-plugin-offline` をインストール

`npm install --save gatsby-plugin-offline`

プラグインを `gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        ...
      }
    },
    'gatsby-plugin-offline'
  ]
}
```

Gatsby サイトにオフラインサポートを追加する手順は以上です。

ヒント： Service Worker はプロダクションビルド（`gatsby build`）でのみ登録します。

## Service Worker が更新したときにメッセージを表示する

Service Worker が更新を見つけたときに、カスタムメッセージを表示したいときは、`gatsby-browser.js` ファイルで [`onServiceWorkerUpdateReady`](/docs/browser-apis/#onServiceWorkerUpdateReady) ブラウザー API を使用しましょう。以下のコードは、更新が見つかったときにページを再読み込みしていいかどうかを尋ねるプロンプトを表示します。

```javascript:title=gatsby-browser.js
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `アプリケーションが更新されました。 ` + `最新版を表示しますか？`
  )

  if (answer === true) {
    window.location.reload()
  }
}
```

## Gatsby でカスタム Service Worker を使う

もし `gatsby-plugin-offline` がサポートしていない機能が必要なときは、カスタム Service Worker を追加できます。

`static` フォルダーに `sw.js` ファイルを追加します。

`gatsby-brwoser.js` ファイルで [`registerServiceWorker`](/docs/browser-apis/#registerServiceWorker) ブラウザー API を使用します。

```javascript:title=gatsby-browser.js
export const registerServiceWorker = () => true
```

以上でおしまいです！Gatsby はカスタム Service Worker を登録します。

## Service Worker を削除する

もしサイトから Service Worker を完全に削除したいときは、`gatsby-plugin-offline` の代わりに `gatsby-plugin-remove-serviceworker` を追加しましょう。手順は [`gatsby-plugin-offline` の README](/packages/gatsby-plugin-offline/#remove) をご覧ください。

## 参考資料

- [Service Worker の紹介](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja)
- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)
