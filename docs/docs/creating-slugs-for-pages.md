---
title: ページのスラッグを作成する
---

ファイル名からスラッグを作成するロジックはときに複雑になり得ます。`gatsby-source-filesystem` プラグインは、そのための関数を用意しています。

## インストール

`npm install --save gatsby-source-filesystem`

## gatsby-node.js を使ったスラッグの作成

`MarkdownRemark` ノードに新しいスラッグを直接作成しましょう。このノードに追加されたデータは GraphQL によってクエリ可能となります。

作成するには、[`createNodeField`](/docs/actions/#createNodeField) という API を使用します。この関数は他のプラグインによって作成されたノードに新しくフィールドを追加することができます。

```javascript:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`)

// highlight-start
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // highlight-end
  if (node.internal.type === `MarkdownRemark`) {
    // highlight-start
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    // highlight-end
  }
}
```

## 作成されたスラッグの確認

GraphiQL を開き、以下の GraphQL クエリを実行することで、全てのスラッグが確認できます。

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```
