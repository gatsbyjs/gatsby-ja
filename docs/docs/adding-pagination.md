---
title: ページネーションの追加
---

コンテンツのリストを表示するページは、コンテンツの量が増えるにつれて長くなります。ページネーションは、コンテンツを複数のページに分ける方法です。

ページネーションのゴールは、単一の[テンプレート](/docs/building-with-components/#page-template-components)から、限られた数のアイテムを表示する複数のページを作成することです。

各ページは、それぞれのアイテムを [GraphQL のクエリー](/docs/querying-with-graphql/)で取得します。

それぞれのアイテムを取得するために必要な、[`limit`](/docs/graphql-reference/#limit) や [`skip`](/docs/graphql-reference/#skip) などの情報は、[ページの作成](/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)時に `gatsby-node` で追加される [`context`] から取得します。

## 例

```jsx:title=src/templates/blog-list-template.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div key={node.fields.slug}>{title}</div>
        })}
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
// highlight-start
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
// highlight-end
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
```

```js:title=gatsby-node.js
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // ...

  // ブログリストページの作成
  // highlight-start
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  // highlight-end
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

上記コードは、投稿総数に基づいた量のページを作成します。残りの投稿数が `postPerPage` で指定された 6 未満になるまで、各ページには 6 投稿ずつ表示されます。各ページのパスは、最初のページが `blog` 、次のページからは `blog/2` , `blog/3` となります。

## その他の資料

- 前へ/次へのページリンクや、ページの下部に配置する従来のページナビゲーションの追加は、この [チュートリアル](https://nickymeuleman.netlify.com/blog/gatsby-pagination/) にしたがってください

- 公式のエクステンション [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) のページネーションは [gatsby-paginated-blog](https://github.com/NickyMeuleman/gatsby-paginated-blog) を参照してください
