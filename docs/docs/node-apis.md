---
title: Gatsby Node API
description: ページ作成のような一般的利用におけるGatsbyのビルド処理で使用されるNode APIに関するドキュメント
jsdoc: ["gatsby/src/utils/api-node-docs.js"]
apiCalls: NodeAPI
---

Gatsby では GraphQL データ層でサイトのデータを扱うための多くの API を、プラグインとサイトビルダーに提供します。

## 非同期プラグイン

プラグインが非同期操作（ディスク I/O、データベースアクセス、リモート API の呼び出しなど）を実行する場合は、Promise を返すか、第 3 引数に渡されたコールバック関数を使用する必要があります。正常に動作するためには、以前の API がまず先に終了している必要があるため、Gatsby はプラグインが一部の API としていつ終了するのかを知る必要があります。詳細については[非同期ライフサイクルのデバッグ](/docs/debugging-async-lifecycles/)をご覧ください。

```javascript
// Promise API
exports.createPages = () => {
  return new Promise((resolve, reject) => {
    // 非同期処理を行う
  })
}

// Callback API
exports.createPages = (_, pluginOptions, cb) => {
  // 非同期処理を行う
  cb()
}
```

プラグインが非同期処理を行わない場合は、直接戻ることができます。

## 使い方

プロジェクトのルートディレクトリーにある `gatsby-node.js` という名前のファイルからエクスポートして、これらの API を実装してください。
