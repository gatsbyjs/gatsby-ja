---
title: Markdown のページを追加する
---

Gatsby ではあなたのウェブサイトにページを追加するために Markdown ファイルを利用できます。
プラグインを追加し、Markdown ファイルのあるフォルダーを読み込むよう設定するだけで、自動的に Markdown ファイルからページを生成します。

以下が、Gatsby における上記の処理です。

1. ファイルシステムから Gatsby にファイルを読み込む
2. `gatsby-transformer-remark` を使って Markdown と [frontmatter](#Frontmatter - Markdown ファイルのメタデータ）を変換してデータとして利用する
3. Markdown ファイルを追加する
4. Markdown ファイルのためのページテンプレートを作成する
5. Gatsby の `createPage` Node.js API を使って静的なページを生成する

## ファイルシステムから Gatsby にファイルを読み込む

[`gatsby-source-filesystem`](/packages/gatsby-source-filesystem/#gatsby-source-filesystem) をファイル読み込みのために利用します。

### インストール

`npm install --save gatsby-source-filesystem`

### プラグインの追加

**ヒント：** `gatsby-config.js` にプラグインを追加する方法は 2 通りあります。プラグイン名の文字列を記述する方法と、オプションを含んだ内容を記述する方法です。後者の場合はオブジェクトとして記述します。

`gatsby-config.js` を開き `gatsby-source-filesystem` プラグインを追加しましょう。この時、`plugins` 配列の最後の位置にオブジェクトを追加します。`path` キーに、Gatsby が読み込むファイルシステムのパスを指定してください。

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/src/markdown-pages`,
    },
  },
]
```

この手順を完了することで、Markdown ファイルをファイルシステムからデータソースとして利用できます。Markdown 本文は HTML に変換され、frontmatter の YAML は JSON ファイルとしてデータ化されます。

## `gatsby-transformer-remark` を使って Markdown と Frontmatter を変換してデータとして利用する

[`gatsby-transformer-remark`](/packages/gatsby-transformer-remark/) プラグインを使うことで、Markdown ファイルのコンテンツを認識し、読み込むことができます。このプラグインは Frontmatter のメタデータを `frontmatter` に変換して、コンテンツ部分を HTML に変換します。

### `gatsby-transformer-remark` プラグインのインストール

`npm install --save gatsby-transformer-remark`

### Configure plugin

`gatsby-config.js` に下記の記述を追加します。`gatsby-source-filesystem` より後ろである必要があります。

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/markdown-pages`,
      name: `markdown-pages`,
    },
  },
  `gatsby-transformer-remark`,
]
```

## Markdown ファイルを追加する

`/src` ディレクトリー内に、 `markdown-pages` ディレクトリーを新しく作成しましょう。
そしてその中に `post-1.md` ファイルを作成します。

### Frontmatter - Markdown ファイルのメタデータ

Markdown ファイルを作成すると、コンテンツ以外のデータとしてキー・バリュー値のセットを含めることができます。これはコンテンツ以外のデータとして GraphQL のデータレイヤーに追加されます。このデータは frontmatter と呼ばれ、ハイフン 3 つで区切られたブロックで記述されます。このブロック内に書かれたキーバリュー値は `gatsby-transformer-remark` によって `frontmatter` データに変換されます。GraphQL によってこのキーバリュー値のペアが React コンポーネント内で利用できるようになります。

```markdown:title=src/markdown-pages/post-1.md
---
path: "/blog/my-first-post"
date: "2019-05-04"
title: "My first blog post"
---
```

ここで重要なのは `path` のキーペアです。 `path` の値は、この記事をウェブサイト上で利用されるパスとして機能します。

## Markdown ファイルのためのページテンプレートを作成する

`/src` ディレクトリー内に、 `templates` ディレクトリーを新しく作成しましょう。
`blogTemplate.js` ファイルをこのディレクトリー内に下記の内容で作成します。

```jsx:title=src/templates/blogTemplate.js
import React from "react"
import { graphql } from "gatsby"

export default function Template({
  data, // この prop はGraphQLのクエリ結果が注入されます
}) {
  const { markdownRemark } = data // data.markdownRemark が記事データ
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
```

ファイルに置いては 2 つの重要なポイントがあります：

1. GraphQL クエリーは Markdown データのファイル取得後半で生成されます。Gatsby は自動的にクエリ結果に含まれるすべての Markdown メタデータと HTML をあなたに渡します。

   **ヒント： GraphQL についてさらに知りたい場合は、こちらをお読みください [How to GraphQL](https://www.howtographql.com/)**

2. クエリ結果は、Gatsby の `Template` に `data` として渡されます。`markdownRemark` はクエリした Markdown ファイルに関するすべてのプロパティが含まれます。このデータを使っってテンプレートを構築し、ブログ記事のスタイリングを変更できます。テンプレートは React コンポーネントなので、スタイリングに関しては Gatsby における[推奨されるスタイリング手段](/docs/styling/)を利用できます。

### Gatsby の `createPage` Node.js API を使って静的なページを生成する

Gatsby は強力な Node.js API を用意しており、これによって動的ページの作成などの機能が可能になります。 この API は `gatsby-node.js` 内で利用可能です。ルートディレクトリー、つまり `gatsby-config.js` と同じ階層に配置します。このファイルに書かれたそれぞれのエクスポート設定が Gatsby によって実行されます。詳細は [Node API の詳細](/docs/node-apis/)で確認できます。このセクションでは、`createPages` のみを利用します。

`graphql` を利用して Markdown ファイルのデータを下記サンプルのように取得します。 次に、`createPage` を利用して前のステップで作成した `blogTemplate.js` にデータを渡すことでファイルごとに静的なページを生成します。

**ヒント：** Gatsby は `createPages` API をビルド時に呼びだす際、`actions` と `graphql` パラメーターを付与しています。

```javascript:title=gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // コンテキストとして任意のデータを付与できます
    })
  })
}
```

以上が、あなたの Gatsby ウェブサイトにおける基本的な Markdown ファイル機能です。frotmatter とテンプレートファイルをカスタマイズすることで、思い通りの効果を得ることができます！

実際に動作するコードを Github のサンプルで確認することもできます。公式リポジトリーの [Gatsby examples section](https://github.com/gatsbyjs/gatsby/tree/master/examples) から `using-markdown-pages` ディレクトリーを探してください。

## 他のチュートリアル

Markdown ファイルを利用したウェブサイト作成に関して、追加のチュートリアルが [Awesome Gatsby](/docs/awesome-gatsby-resources/#gatsby-tutorials) で紹介されています。

## Gatsby Markdown スターター

Markdown ファイルを利用するための設定がすでに済んだスターターキットを [Gatsby starters](/starters?c=Markdown) から探して利用できます。
