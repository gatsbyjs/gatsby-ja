---
title: ブログ記事のタグ一覧ページを生成する
---

ブログ記事のタグ一覧ページを作成することは、訪問者に関連するコンテンツを提供する手段のひとつです。

タグをブログ記事に追加するには、まず Markdown ページをあなたのウェブサイトにブログ記事として設定する必要があります。この設定については、[Gatsby におけるデータ](/tutorial/part-four/) と [Markdown のページを追加する](/docs/adding-markdown-pages/)に記載されています。

タグページ追加の主なプロセスは下記の通りです。

1. `markdown` ファイルにタグを追加する
2. あなたの記事にある全てのタグを取得するクエリーを書く
3. タグページのテンプレートを作成する (`/tags/{tag}`のようなページ）
4. `gatsby-node.js` にテンプレートを利用してタグページをレンダリングする設定を追加する
5. タグインデックスページ (`/tags`)を作成し、全てのタグを一覧化する
6. _(任意)_ タグ一覧をブログ記事の中に表示させる

## `markdown` ファイルにタグを追加する

タグは Markdown ファイル内の `frontmatter` に追加します。`frontmatter` はハイフンによって区切られたエリアで、記事のタイトルや投稿日時のデータを含む部分です。

```markdown
---
title: "動物園への旅行"
---

今日は動物園に行ってきました！とても楽しかった！
```

属性は `string`,`number` もしくはその配列である必要があります。記事に複数のタグを付けたい場合は配列にして記載します。新しくタグ属性を追加すると以下のようなファイルになります。

```markdown
---
title: "動物園への旅行"
tags: ["animals", "Chicago", "zoos"]
---

今日は動物園に行ってきました！とても楽しかった！
```

`gatsby develop` が実行されている場合、再実行してから新しい `frontmatter` の属性が取得されます。

## あなたの記事にある全てのタグを取得するクエリーを書く

これらの属性は全てデータレイヤーで利用可能となっています。属性データを使うには `graphql` を使ってこれをクエリします。 `frontmatter` に含まれる全ての属性が GraphQL で取得できます。

まずは、Graph<em>i</em>QL (`http://localhost:8000/___graphql`) を使ってクエリーを実行してみましょう。`gatsby develop` を実行していない場合は実行してからアクセスしてください！

```graphql
{
  allMarkdownRemark {
    group(field: frontmatter___tags) {
      tag: fieldValue
      totalCount
    }
  }
}
```

上記のクエリーは `tags` 属性ごとにグルーピングして、それぞれの `tag` が付いている記事の数を `totalCount` で表示します。 さらに、必要であればそれぞれのグループに含まれるいくつかの記事データを抽出することもできます。このチュートリアルを短く済ませるために、今回はタグ名のみをタグごとのページに表示します。次にタグページのテンプレートを作りましょう。

## タグページのテンプレートを作成する（`/tags/{tag}` のようなページ）

あなたが [Markdown のページを追加する](/docs/adding-markdown-pages/)を済ませていれば、このプロセスと似た作業をすでに実施しているでしょう。タグページのテンプレートを作成し、`createPages` を `gatsby-node.js` の中で実行して記事に含めたタグごとのページを生成します。

まずは、`src/templates/tags.js` にタグごとのページテンプレートを作成します。

```jsx:title=src/templates/tags.js
import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      {/*
              このリンクは存在しないページを参照します。
              チュートリアルの後半で作成するので今は気にしない！
            */}
      <Link to="/tags">All tags</Link>
    </div>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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

**ヒント**: `propTypes` がこのサンプルに含まれています。これはコンポーネントにおける全てのデータを取得するときに、データ階層を参照・利用する際にガイドを表示し、あなたを助けます。

## `gatsby-node.js` にテンプレートを利用してタグページをレンダリングする設定を追加する

テンプレートを作成しましたね、素晴らしい！　あなたが [Markdown のページを追加する](/docs/adding-markdown-pages/) をすでに読んでいるなら、その中に含まれている `createPages` が記事ページを作るサンプルはタグページのそれとほぼ同じものです。あなたのウェブサイトにおける `gatsby-node.js` ファイルが `lodash` をインポートして宣言済み (`const _ = require('lodash')`) ならば、[`createPages`](/docs/node-apis/#createPages) は下記のように使えます。

```js:title=gatsby-node.js
const path = require("path")
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/templates/blog.js")
  const tagTemplate = path.resolve("src/templates/tags.js")

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges

  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
```

いくつかのヒント：

- あなたの GraphQL クエリーはページ生成に必要なデータのみを参照しています。他のデータをページ内で利用したくなった場合、再度クエリを実行できます。 (つまりタグ一覧のテンプレートファイルを更新してクエリを再実行する必要があります）
- あなたはすでにふたつの `allMarkdownRemark` 要素をクエリで利用しています。名前の衝突を避けるために、必ずクエリの [エイリアス](/docs/graphql-reference/#aliasing) を利用しましょう。それぞれのクエリでエイリアスを命名して読みやすいコードにすることを心がけましょう。
- タグページを作成している際、`context` として `tag.name` を渡していることを覚えておいてください。この値は `TagPage` クエリー内で利用しており、検索対象を指定したタグ名のページのみに限定するために利用しています。

## タグインデックスページ (`/tags`)を作成し、全てのタグを一覧化する

これから作成する `/tags` ページはシンプルにウェブサイト内の全タグを一覧化し、タグごとの記事数を合わせて表示します。このチュートリアルの序盤に作成したクエリを使って、タグごとに記事をグルーピングします。

```jsx:title=src/pages/tags.js
import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div>
    <Helmet title={title} />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
```

## _(任意)_ タグをブログ記事の中に表示させる

もう少し頑張りますか？タグを記事内の任意の位置に表示させたい場合、記事用の `graphql` クエリーに手を加え、`frontmatter` からタグデータを取得するように変更します。これでコンポーネント内からタイトルなどと同じようにタグ情報へアクセスできるようになります。
