---
title: GraphCMS からデータを取得する
---

## GraphCMS 流のヘッドレス CMS

[GraphCMS](https://graphcms.com?ref="gatsby-headless-docs-top") は GraphQL で操作するのに最適化されたヘッドレス CMS です。記事、作成者、プロダクトなどのコンテンツの構造は、モデルと呼ばれるコンテンツタイプに分類されます。これらのモデルはおなじみの GraphQL を使ってクエリーできます。

GraphCMS を Gatsby から使用するときの利点のひとつは、プロジェクトを開始する前にコンテンツのクエリーを試せることです。これは Gatsby が GraphQL をネイティブでサポートしているためです。

## Getting started

このガイドでは、 GraphCMS からデータをクエリーできる完全なプロジェクトを作成します。

### 雛形をインストールする

はじめに、Gatsby のスターターサイトを作りましょう。

```shell
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-default
```

`cd gatsby-site` を実行してプロジェクトのディレクトリーに移動します。

### ソースプラグインを追加する

加えて、`gatsby-source-graphql` が必要です。GraphCMS は GraphQL をネイティブで使用するので、Gatsby の機能を利用してふたつの GraphQL API をつなぎ合わせるだけで、コンテンツの変換に必要な時間を短縮できます。gatsby-source-x-cms のような特別なプラグインは必要なく、`gatsby-source-graphql` があれば十分です。

次のコマンドでインストールできます。

```shell
  # Optionally with `npm install`
  npm install --save gatsby-source-graphql
```

### プラグインの設定

最後に、データをクエリーする前に `gatsby-source-graphql` プラグインの設定が必要です。`gatsby-config.js` を開いて plugins の配列に次のオブジェクトを追加します。この例では GraphCMS の公開 API を使っていますが、ほとんどの場合あなたのプロジェクトに合わせて API の url や fieldName を置き換えることになります。[GraphCMS API の詳細はこちらをご覧ください。](https://docs.graphcms.com/developers/api)

```js
{
    resolve: "gatsby-source-graphql",
        options: {
        // The top level query type, can be anything you want!
        typeName: "GCMS",
        // The field you'll query against, can also be anything you want.
        fieldName: "gcms",
        // Your API endpoint, available from the dashboard and settings window.
        // You can use this endpoint that features US mountains for now.
        url: "https://api-euwest.graphcms.com/v1/cjm7tab4c04ro019omujh708u/master",
    },
},
```

もしすべてが正常に動いていたら GraphCMS のデータが Gatsby のソース API に追加されているはずです！

### コンテンツをクエリーする

プロジェクトのルートで `gatsby develop` を実行して開発サーバーを起動します。エラーのない状態でサーバーが起動したら、ブラウザーで次の URL を開けます。

`http://localhost:8000/___graphql`

このページには新しいコンテンツ API を試すためのインターフェースが表示されます。

このクエリーを実行してください。

```graphql
query {
  gcms {
    mountains {
      title
      elevation
      image {
        url
      }
    }
  }
}
```

もしすべてが正常に動いていたら、次のような形のレスポンスが表示されます。

```json
{
  "data": {
    "gcms": {
      "mountains": [
        {
          "title": "Denali",
          "elevation": 6190,
          "image": {
            "url": "https://media.graphcms.com//J0rGKdjuSwCk7QrFxVDQ"
          }
        },
        {
          "title": "Mount Elbert",
          "elevation": 4401,
          "image": {
            "url": "https://media.graphcms.com//JNonajrqT6SOyUKgC4L2"
          }
        }
        // ...more results
      ]
    }
  }
}
```

### ページでコンテンツを取得する

このチュートリアルのために、`src/pages/index.js` から layout 、SEO 、link やページコンポーネントを含むすべてのコンポーネントを取り除きました。これらのコンポーネントは存在しており、99% のユーザーはコードの内容を理解したらこれらのコンポーネントを元に戻したいと思うことでしょう。今は釘を見ているだけですが、ハンマーやのこぎりなど、その他のツールがツールボックスに入っています。`src/pages/index.js` にあるインデックスファイルを開いて、コンテンツを次のコードに置き換えます。

```jsx
import React from "react"
import { StaticQuery } from "gatsby"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        gcms {
          mountains {
            title
            elevation
          }
        }
      }
    `}
    render={data => (
      <div>
        <h1>USA Mountains</h1>
        <ul>
          {data.gcms.mountains.map(mountain => {
            const { title, elevation } = mountain
            return (
              <li>
                <strong>{title}:</strong>
                {elevation}
              </li>
            )
          })}
        </ul>
      </div>
    )}
  />
)

export default IndexPage
```

このコードで次のことができます。

1. ページに `StaticQuery` コンポーネントを追加する。このコンポーネントは GraphQL API でコンテンツをフェッチできます。
2. title と elevation を含む簡略化されたデータを Mountain API からフェッチする。
3. `StaticQuery` の "render" で一覧を描画する。

## まとめ

このチュートリアルから、GraphCMS と Gatsby を使い始めるのがどれだけ簡単かを感じとってもらえることを願っています。昨今、どのようなサイズのプロジェクトも Jamstack の利点へと引き寄せられているので、 Gatsby がどのように動いているかを学ぶには最適なタイミングです。コンテンツ API のバックエンドに GraphCMS を追加することで、プロジェクトの寿命に合わせたスケーラブルな CMS を数分以内で使い始められます。

[GraphCMS を今すぐチェックして"高速な Web サイト"を高速に構築しましょう！](https://graphcms.com?ref="gatsby-headless-docs-bottom")
