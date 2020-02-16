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
