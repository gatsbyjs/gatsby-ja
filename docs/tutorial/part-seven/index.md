---
title: プログラムでデータからページを生成する
typora-copy-images-to: ./
disableTableOfContents: true
---

> このチュートリアルは Gatsby のデータ層に関する解説の一部です。先に、[パート 4](/tutorial/part-four/)、[パート 5](/tutorial/part-five/)、[パート 6](/tutorial/part-six/)の内容を確認してください。

## このチュートリアルは何ですか？

前回では Markdown を取得して、ブログ投稿のタイトルと抜粋の一覧を生成し、すばらしい index ページを作成しました。しかし、抜粋の表示だけではなく、実際の Markdown を表示するページが必要です。

`src/pages`に React コンポーネントを設置することで、ページの作成を続けることができますが、今回は**プログラムでデータ**からページを生成する方法を学びます。 Gatsby は多くの静的サイトジェネレーターのように、ページの生成をファイルに**限定しません**。 Gatsby は GraphQL を使用して**データ**を取得し、ビルド時にクエリの結果を**マッピング**できます。これはとても強力なアイディアです。このチュートリアルで、その意味と実装の手順を掘り下げていきます。

さっそく始めましょう。

## ページのスラッグの生成

ページの生成には 2 つの手順があります。

1.  ページのパスかスラッグを生成する。
2.  ページを生成する。

_**ヒント**: 多くのデータソースは、コンテンツのスラッグやパスを直接提供します。それらを提供するシステム(CMS など)で作業をする場合は、 Markdown のように自分でスラッグを生成する必要はありません。_

Markdown のページを生成するために、2 つの Gatsby API を学びます。
[`onCreateNode`](/docs/node-apis/#onCreateNode) と
[`createPages`](/docs/node-apis/#createPages) です。この 2 つは、多くのサイトやプラグインで使用されている主力の API です。

私たちは Gatsby API をシンプルに実装できるようベストを尽くします。API を使って実装するには、`gatsby-node.js` で API 関数名をエクスポートします。

試しに API を実装してみましょう。サイトのルートフォルダーに、`gatsby-node.js`を作成し、次のように記述してください。

```javascript:title=gatsby-node.js
exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}
```

`onCreateNode` 関数は、新しいノードが生成（または更新）されたるたびに Gatsby によって呼び出されます。

開発用のサーバーを再起動してください。すると、多数のノードがターミナルのコンソールに記録されます。

次は、この API を使用して、`MarkdownRemark`ノードに Markdown のスラッグを追加します。

`MarkdownRemark` ノードだけのログを記録するように、関数の処理を変更します。

```javascript:title=gatsby-node.js
exports.onCreateNode = ({ node }) => {
  // highlight-start
  if (node.internal.type === `MarkdownRemark`) {
    console.log(node.internal.type)
  }
  // highlight-end
}
```

ページのスラッグを生成するために、各 Markdown のファイル名が必要です。`pandas-and-bananas.md` なら `/pandas-and-bananas/` になります。しかし、どうやって `MarkdownRemark` ノードからファイル名を取得するのでしょうか？`File` ノードには、あなたが必要としているファイルの情報が含まれているので、ノードのつながりから**親の**`File` ノードまで**辿る**必要があります。それを行うために、関数を再度変更します。

```javascript:title=gatsby-node.js
// highlight-next-line
exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    // highlight-start
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
    // highlight-end
  }
}
```

サーバーを再起動すると、2 つの Markdown の相対パスがターミナルに表示されます。

![markdown-relative-path](markdown-relative-path.png)

次に、スラッグを生成する必要があります。ファイル名からスラッグを生成するロジックは複雑になりがちです。`gatsby-source-filesystem` プラグインにはスラッグを生成する関数が付属されているので、それを使用しましょう。

```javascript:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`) // highlight-line

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode, basePath: `pages` })) // highlight-line
  }
}
```

この関数はスラッグの生成とともに、 親の `File` ノードの探索を処理します。サーバーを再起動すると、Markdown ごとに 1 つずつ、計 2 つのスラッグがターミナルに表示されます。

これで新しいスラッグを `MarkdownRemark` ノードに直接追加できます。これは、ノードに追加したデータを後から GraphQL で取得できるので、強力です。新しいページを生成する時に、スラッグを簡単に取得できます。

そのためには、[`createNodeField`](/docs/actions/#createNodeField) と呼ばれる関数を使用します。この関数を使用すると、他のプラグインにより生成されたノードに、フィールドを追加できます。ノードを変更できるのは元の作成者のみなので、他のプラグイン（`gatsby-node.js`を含む）は、フィールドを追加するためにこの関数を用いる必要があります。

```javascript:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`)
// highlight-next-line
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions // highlight-line
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

サーバーを再起動して、GraphiQL を開くか更新します。次に、以下の GraphQL クエリを実行して、新しいスラッグを確認します。

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

これでスラッグが生成され、ページを生成できます。

## ページを生成する

`gatsby-node.js` ファイルに、以下を追加します。

```javascript:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// highlight-start
exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
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
  `)

  console.log(JSON.stringify(result, null, 4))
}
// highlight-end
```

プラグインがページを追加できるように Gatsby が呼びだす [`createPages`](/docs/node-apis/#createPages) API を追加しました。

チュートリアルの冒頭で述べたように、プログラムでページを生成する手順は次の通りです。

1.  GraphQL でデータを取得
2.  結果をページにマッピング

上記のコードは、`graphql` 関数を使用して Markdown のスラッグを取得するため、 Markdown からページを生成する最初のステップです。これで、次のような取得結果が出力されます。

![query-markdown-slugs](query-markdown-slugs.png)

ページを生成するためには、スラッグの他に、ページのテンプレートコンポーネントを追加する必要があります。Gatsby の他のページと同様に、プログラムされるページは React コンポーネントによって動作します。ページを生成する時には、使用するコンポーネントを指定する必要があります。

`src/templates` ディレクトリーを追加し、`src/templates/blog-post.js` を作成して、以下を追加します。

```jsx:title=src/templates/blog-post.js
import React from "react"
import Layout from "../components/layout"

export default () => {
  return (
    <Layout>
      <div>Hello blog post</div>
    </Layout>
  )
}
```

`gatsby-node.js` を更新します。

```javascript:title=gatsby-node.js
const path = require(`path`) // highlight-line
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions // highlight-line
  const result = await graphql(`
    query {
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
  `)

  // highlight-start
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  // highlight-end
}
```

サーバーを再起動すれば、ページが生成されます！生成されたページを見つける簡単な方法は、サイトに存在しないでたらめなパスへ移動することです。Gatsby がページの一覧を表示してくれます。例えば `http://localhost:8000/sdf` に移動すれば、生成されたページの一覧が表示されます。

![new-pages](new-pages.png)

そのどれかにアクセスすると、次のように表示されます。

![hello-world-blog-post](hello-world-blog-post.png)

これだけでは少し退屈なページですね。 Markdown の投稿からデータを取得するために、 `src/templates/blog-post.js` を次のように変更します。

```jsx:title=src/templates/blog-post.js
import React from "react"
import { graphql } from "gatsby" // highlight-line
import Layout from "../components/layout"

// highlight-start
export default ({ data }) => {
  const post = data.markdownRemark
  // highlight-end
  return (
    <Layout>
      {/* highlight-start */}
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      {/* highlight-end */}
    </Layout>
  )
}

// highlight-start
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
// highlight-end
```

そして…。

![blog-post](blog-post.png)

すばらしい！

最後のステップは、index から生成されたページにリンクすることです。

`src/pages/index.js` に戻り、 Markdown のスラッグを取得し、リンクを作成します。

```jsx:title=src/pages/index.js
import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby" // highlight-line
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            {/* highlight-start */}
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              {/* highlight-end */}
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span
                  css={css`
                    color: #555;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link> {/* highlight-line */}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          // highlight-start
          fields {
            slug
          }
          // highlight-end
          excerpt
        }
      }
    }
  }
`
```

よくできました！小さなブログですが、動作しています！

## チャレンジする

作成したサイトでもっと遊んでみてください。さらに Markdown を追加してみてください。`MarkdownRemark`から他のデータを取得し、それらをフロントページや投稿ページに追加する方法を調べてください。

このパートでは、Gatsby のデータ層を使用した構築の基礎を学びました。プラグインを使用して**ソース**を**変換**する方法、GraphQL を使ってページデータを**マッピング**する方法、各ページデータを取得する**ページ**の**テンプレートコンポーネント**を構築する方法を学びました。

## 次は？

無事、Gatsby のサイトを構築できましたね！次はどうしますか？

- Gatsby のサイトを Twitter で共有し、#gatsbytutorial で検索して、他の人が作成したサイトを見てみましょう！
  ツイートには @gatsbyjs を記載して、#gatsbytutorial のハッシュタグを含めてください :)
- いくつかの[サンプルページ](https://github.com/gatsbyjs/gatsby/tree/master/examples#gatsby-example-websites)を見ることができます。
- [プラグイン](/docs/plugins/)を調べる
- [Gatsby によって構築されたページ](/showcase/)を見る
- [Gatsby の API](/docs/api-specification/)、[ノード](/docs/node-interface/)、[GraphQL](/docs/graphql-reference/)を調べる
