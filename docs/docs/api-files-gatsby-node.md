---
title: gatsby-node.js API ファイル
---

`gatsby-node.js` ファイルのコードは、サイトをビルドする過程で 1 回実行されます。`gatsby-node.js` を使うと、ページを動的に生成したり、GraphQL にノードを追加したり、ビルドライフサイクル上のイベントに対して実行したりできます。[Gatsby Node API](/docs/node-apis/) を使うためには、まずサイトのルートに `gatsby-node.js` という名前のファイルを作成します。そして、利用したい API をこのファイルからエクスポートしてください。

あらゆる Gatsby Node API は [Node API のヘルパー一式](/docs/node-api-helpers/)を提供します。これらを利用して、レポートの作成といったメソッドにアクセスしたり、新しいページの作成のようなアクションを行えます。

```js:title=gatsby-node.js
const path = require(`path`)
// ビルドが終了したら情報をログに記録する
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Gatsby サイト、構築完了！`)
}
// 動的にブログのページを生成する
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const result = await graphql(`
    query {
      allSamplePages {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)
  result.data.allSamplePages.edges.forEach(edge => {
    createPage({
      path: `${edge.node.slug}`,
      component: blogPostTemplate,
      context: {
        title: edge.node.title,
      },
    })
  })
}
```
