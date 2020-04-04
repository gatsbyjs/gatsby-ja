---
title: アクセス解析を追加する
---

## なぜアクセス解析を使うのですか？

あなたが自分のウェブサイトをデプロイしてから、どれだけの人がウェブサイトを訪れたか、様々な指標と共に確認できます。

- もっとも人気のあるページは？
- 訪問者はどこからアクセスしていた？
- 訪問者はいつアクセスしていた？

Google Analytics はアクセスデータを収集・分析して上記を含む様々な問いに答える方法を提供します。トラッキング ID ごとに 1 ヶ月あたり 1000 万アクセスまでは無料で利用できます。他のアクセス解析サービスについては、この記事の最後にある[他の Gatsby アクセス解析用プラグイン](/docs/adding-analytics#他のGatsbyアクセス解析用プラグイン)を参照してください。

## Google Analytics の設定

最初の作業は Google Analytics のアカウントを設定することです。[こちら](https://analytics.google.com/)にアクセスして、Google Account でログインしてください。

Google は[アナリティクスのスタートガイド](https://support.google.com/analytics/answer/1008015?hl=ja)も準備しています。

アカウントを手に入れたら、次はプロパティと呼ばれる概念を設定します。これはトラッキング ID とセットで提供されます。プロパティ名にはウェブサイト自身の名前を設定し、ウェブサイトの URL を入力します。

トラッキング ID はあなたのウェブサイト宛トラフィックを識別するための符号です。通常、アクセスを解析するウェブサイトごとに違うトラッキング ID を利用します。

トラッキング ID が発行されたら、これをメモします。ウェブサイトがページの閲覧情報を Google Analytics へ送るために必要となります。ID の形式は `UA-XXXXXXXXX-X` です。

もしトラッキング ID のがわからなくなった場合は、 `管理 > トラッキング情報 > トラッキングコード` より確認できます。

## `gatsby-plugin-google-analytics` を使う

では、Gatsby で Google Analytics アカウントを使い、閲覧情報を送信する設定を行いましょう。

この解説では `gatsby-plugin-google-analytics` プラグインを使用します。 他の解析手段を使う場合（gtag.js と Google Tag Manager を用いる場合を含む）、[他の Gatsby アクセス解析用プラグイン](#other-gatsby-analytics-plugins)のセクションを確認してください。

```shell
npm install --save gatsby-plugin-google-analytics
```

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // この下の行をあなたのトラッキング ID("UA-XXXXXXXXX-X") で置き換えてください
        trackingId: "UA-XXXXXXXXX-X",
      },
    },
  ],
}
```

> ヒント： 詳しい解説は [gatsby-config.js](/docs/gatsby-config/) を参照

プラグインに関する完全なドキュメントは[こちら](/packages/gatsby-plugin-google-analytics/)を参照してください。

Google Analytics アカウントと Gatsby のプラグインには、共に膨大な量の設定項目が存在します。あなたのウェブサイトの都合に合わせた設定が可能です。

以上で、あなたのウェブサイトにアクセス解析を追加する手順は終了です！Google Analytics のページにアクセスして、ダッシュボードで表示されている統計を確認しましょう。

## 他の Gatsby アクセス解析用プラグイン

- [Google Tag Manager](/packages/gatsby-plugin-google-tagmanager/)
- [Google Analytics gtag.js](/packages/gatsby-plugin-gtag/)
- [Segment](/packages/gatsby-plugin-segment-js)
- [Amplitude Analytics](/packages/gatsby-plugin-amplitude-analytics)
- [Fathom](/packages/gatsby-plugin-fathom/)
- [Baidu](/packages/gatsby-plugin-baidu-analytics/)
- [Matomo (formerly Piwik)](/packages/gatsby-plugin-matomo/)
- [Simple Analytics](/packages/gatsby-plugin-simple-analytics)
- [Parse.ly Analytics](/packages/gatsby-plugin-parsely-analytics/)
- [GoatCounter](/packages/gatsby-plugin-goatcounter/)
