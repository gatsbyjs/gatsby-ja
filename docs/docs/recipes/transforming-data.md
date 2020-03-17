---
title: "レシピ集: データの変換"
tableOfContentsDepth: 1
---

Gatsby でのデータ変換はプラグインによって実現されています。トランスフォーマープラグインは source プラグインを通じてデータを取得し、実際に使う形式へ変換します（例：JSON を JavaScript オブジェクトにする等）。

## Markdown を HTML に変換する

`gatsby-transformer-remark`プラグインは、Markdown ファイルを HTML に変換できます。

### 前提条件

- `gatsby-config.js`と `index.js` ページがある。
- `src`ディレクトリーに Markdown ファイルが保存されている。
- `gatsby-source-filesystem` のようなソースプラグインがインストールされている。
- `gatsby-transformer-remark`プラグインがインストールされている。

### 進め方

1. トランスフォーマープラグインを `gatsby-config.js` に追加します。

```js:title=gatsby-config.js
plugins: [
  // gatsby-source-filesystem を省略: 変換するノードを作成するため
  `gatsby-transformer-remark`
],
```

2. `MarkdownRemark` ノードを取得するため、`index.js` に GraphQL クエリーを追加します。

```jsx:title=src/pages/index.js
export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
```

3. 開発用サーバーを再起動して、`http://localhost:8000/___graphql` で GraphiQL を開きます。`MarkdownRemark` ノードで使用できるフィールドを探します。

### 追加の資料

- `gatsby-transformer-remark` を使用して、[Markdown を HTML に変換するチュートリアル](/tutorial/part-six/#transformer-plugins)。
- [Gatsby プラグインライブラリ](/plugins/?=transformer)で利用できるトランスフォーマープラグインを探す。

## GraphQL を使って画像をグレースケールに変換する

### 前提条件

- `gatsby-config.js`と `index.js` ページがある [Gatsby のサイト](/docs/quick-start)が用意されている。
- `gatsby-image`、`gatsby-transformer-sharp`、`gatsby-plugin-sharp`のパッケージがインストールされている。
- `gatsby-source-filesystem` のようなソースプラグインがインストールされている。
- 画像ファイル（`.jpg`、`.png`、`.gif`、`.svg`、等）が `src/images` フォルダに格納されている。

### 進め方

1. `gatsby-config.js` を編集して、Gatsby 内の GraphQL のデータ層に使用する画像を設定してください。`gatsby-source-filesystem` プラグインを使って画像が含まれているフォルダを組み込むのが一般的です。

```javascript:title=gatsby-config.js

 plugins: [
   {
     resolve: `gatsby-source-filesystem`,
     options: {
       name: `images`,
       path: `${__dirname}/src/images`,
     },
   },
   `gatsby-transformer-sharp`,
   `gatsby-plugin-sharp`,
 ],
```

2. GraphQL を使って画像のクエリを行い、インラインでグレースケール変換を適用させましょう。`relativePath` は `gatsby-source-filesystem` で設定したパスからの相対パスを設定します。

```graphql
  query {
     file(relativePath: { eq: "corgi.jpg" }) {
       childImageSharp {
         // highlight-next-line
         fluid(grayscale: true) {
           ...GatsbyImageSharpFluid
         }
       }
     }
   }
```

ヒント： これらのパラメーターは `http://localhost:8000/__graphql` から閲覧できる GraphQL プレイグラウンドにて確認できます。

3. 次に "gatsby-image" から `Img` コンポーネントをインポートしてください。これは画像を表示させるために JSX 内で使用します。

```jsx:title=src/pages/index.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
// highlight-next-line
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
     file(relativePath: { eq: "corgi.jpg" }) {
       childImageSharp {
         // highlight-next-line
         fluid(grayscale: true) {
           ...GatsbyImageSharpFluid
         }
       }
     }
   }
  `)
  return (
    <Layout>
      <h1>I love my corgi!</h1>
      // highlight-start
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt="A corgi smiling happily"
      />
      // highlight-end
    </Layout>
  )
}
```

4. `gatsby develop` を起動し、開発サーバーを立ち上げましょう。

5. ブラウザ上で `http://localhost:8000/` を開き、画像を確認しましょう。

### 追加の資料

- [グレースケールやデュオトーンクエリについて記載されている API ドキュメント](/docs/gatsby-image/#shared-query-parameters)
- [Gatsby Image ドキュメント](/docs/gatsby-image/)
- [画像処理のサンプルコード](https://github.com/gatsbyjs/gatsby/tree/master/examples/image-processing)
