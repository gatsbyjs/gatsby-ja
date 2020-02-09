---
title: ファイルシステムからデータを取得する
---

このガイドでは、ファイルシステムからデータを取得する方法について説明します。

## セットアップ

このガイドは Gatsby プロジェクトがセットアップされていることを前提としています。プロジェクトをセットアップする必要がある場合、[クイックスタートガイド](/docs/quick-start/)を参照してください。

クエリーを正しく構成するのに役立つツールである [GraphiQL](/docs/introducing-graphiql/) を精通している場合も役立ちます。

## `gatsby-source-filesystem` を使う

`gatsby-source-filesystem` はファイルシステムからファイルノードを作成する Gatsby プラグインです。

Gatsby プロジェクトのルートにプラグインをインストールします：

```shell
npm install --save gatsby-source-filesystem
```

それから、下記をあなたのプロジェクトの `gatsby-config.js` ファイルに追加します：

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Your Site Name`,
  },
  plugins: [
    // highlight-start
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    // highlight-end
  ],
}
```

`gatsby-config.js` ファイルを保存して、Gatsby 開発サーバーを再起動してください。

GraphiQL を開きます。

オートコンプリートウィンドウを表示すると、これが表示されます：

![graphiql-filesystem](./images/graphiql-filesystem.png)

`allFile`　で <kbd>Enter</kbd> キーを押し、<kbd>Ctrl + Enter</kbd> を押してクエリーを実行します。

![filesystem-query](./images/filesystem-query.png)

クエリーから `id` を削除し、オートコンプリートを再度表示します。（<kbd>Ctrl + Space</kbd>）

![filesystem-autocomplete](./images/filesystem-autocomplete.png)

クエリーにいくつかのフィールドを追加して、毎回 <kbd>Ctrl + Enter</kbd> を押してクエリーを再実行してみてください。次のようなものが表示されます：

![allfile-query](./images/allfile-query.png)

結果はファイル「ノード」の配列です。（ノードは「グラフ」内のオブジェクトの仮名です）各ファイルオブジェクトには、クエリーしたフィールドがあります。

複数のデータセットがある場合、`gatsby-config.js` の `name` プロパティにて特定のデータをクエリすることができます。以下の例では、`name` は `src` に設定されています。

```javascript:title=gatsby-config.js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src`,
    name: `src`,
  },
},
```

次に、`sourceInstanceName` を使って、先ほど設定した `name` の値でフィルターされたクエリを作成することができます。

```graphql
{
  allFile(filter: { sourceInstanceName: { eq: "src" } }) {
    edges {
      node {
        relativePath
        prettySize
        extension
        birthTime
      }
    }
  }
}
```

## ファイルノードの変換

ファイルが取得されると、Gatsby エコシステムのさまざまな「トランスフォーマー」プラグインを使用して、ファイルノードを様々な他のタイプのデータに変換できます。例えば、JSON ファイルは `gatsby-source-filesystem` を使用してデータを取得でき、結果であるファイルノードを `gatsby-transformer-json` を使用して JSON ノードに変換できます。

## 詳細なリファレンスと例

さらに使い方を学びたければ、 `gatsby-source-filesystem` [パッケージの README](/packages/gatsby-source-filesystem/) や様々な公式およびコミュニティーが作成した [このプラグインを使用しているスターター](/starters/?d=gatsby-source-filesystem) を確認してください。
