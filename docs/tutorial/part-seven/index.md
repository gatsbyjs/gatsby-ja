---
title: データからプログラムによるページを作成する
typora-copy-images-to: ./
disableTableOfContents: true
---

> This tutorial is part of a series about Gatsby’s data layer. Make sure you’ve gone through [part 4](/tutorial/part-four/), [part 5](/tutorial/part-five/), and [part 6](/tutorial/part-six/) before continuing here.

> このチュートリアルは Gatsby のデータ層に関する解説の一部です。先に、[パート 4](/tutorial/part-four/)、[パート 5](/tutorial/part-five/)、[パート 6](/tutorial/part-six/)の内容を確認してください。

## このチュートリアルは何ですか？

In the previous tutorial, you created a nice index page that queries markdown
files and produces a list of blog post titles and excerpts. But you don't want to just see excerpts, you want actual pages for your
markdown files.

前回は Markdown を取得して、ブログ投稿のタイトルと抜粋のリストを作成し、すばらしい index ページを作成しました。しかし、抜粋だけではなく、実際の Markdown を表示するページが必要です。

You could continue to create pages by placing React components in `src/pages`. However, you'll
now learn how to _programmatically_ create pages from _data_. Gatsby is _not_
limited to making pages from files like many static site generators. Gatsby lets
you use GraphQL to query your _data_ and _map_ the query results to _pages_—all at build
time. This is a really powerful idea. You'll be exploring its implications and
ways to use it for the remainder of this part of the tutorial.

`src/pages`に React コンポーネントを設置することで、ページの作成を続けることができます。しかし、今回は**データ**から**プログラムで**ページを作成する方法を学びます。 Gatsby は多くの静的サイトジェネレーターのように、ファイルからページを作成することに限定されません。 Gatsby は GraphQL を使用して**データ**を取得し、ビルド時にクエリーの結果を**マッピング**できます。これはとても強力なアイディアです。このチュートリアルで、その意味と方法を調べます。

さっそく始めましょう。

## ページのスラッグの作成

新しいページの作成には 2 つの手順があります。

1.  Generate the "path" or "slug" for the page.
2.  Create the page.

3.  ページの "path" か "slag" を生成する。
4.  ページを作成する。

_**Note**: Often data sources will directly provide a slug or pathname for content — when working with one of those systems (e.g. a CMS), you don't need to create the slugs yourself as you do with markdown files._

_**注**: 多くのデータソースは、コンテンツのスラッグやパスを直接提供します - それらを提供するシステム(CMS など)で作業をする場合は、 Markdown のように自分でスラッグを作成する必要はありません。_

To create your markdown pages, you'll learn to use two Gatsby APIs:
[`onCreateNode`](/docs/node-apis/#onCreateNode) and
[`createPages`](/docs/node-apis/#createPages). These are two workhorse APIs
you'll see used in many sites and plugins.

Markdown のページを作成するために、2 つの Gatsby API を学びます。:
[`onCreateNode`](/docs/node-apis/#onCreateNode) と
[`createPages`](/docs/node-apis/#createPages) です。この 2 つは、多くのサイトやプラグインで使用されている主力の API です。

We do our best to make Gatsby APIs simple to implement. To implement an API, you export a function
with the name of the API from `gatsby-node.js`.

私達は、Gatsby API をシンプルに実装するよう努めています。API を実装するには、`gatsby-node.js`で API の名前を用いて関数をエクスポートします。

So, here's where you'll do that. In the root of your site, create a file named
`gatsby-node.js`. Then add the following.

サイトのルートフォルダーに、`gatsby-node.js`を作成し、次のように記述します。

```javascript:title=gatsby-node.js
exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}
```

This `onCreateNode` function will be called by Gatsby whenever a new node is created (or updated).

この`onCreateNode`関数は、新しいノードが作成（またはアップデート）されたるたびに Gatsby によって呼び出されます。

Stop and restart the development server. As you do, you'll see quite a few newly
created nodes get logged to the terminal console.

開発用のサーバーを停止し、再起動します。すると、多くのノードがターミナルのコンソールに記録されます。

In the next section, you will use this API to add slugs for your Markdown pages to `MarkdownRemark`
nodes.

次のセクションでは、この API を使用して、`MarkdownRemark`ノードに Markdown のスラッグを追加します。

Change your function so it now only logs `MarkdownRemark` nodes.

`MarkdownRemark`ノードだけのログを記録するように、関数を変更します。

```javascript:title=gatsby-node.js
exports.onCreateNode = ({ node }) => {
  // highlight-start
  if (node.internal.type === `MarkdownRemark`) {
    console.log(node.internal.type)
  }
  // highlight-end
}
```

You want to use each markdown file name to create the page slug. So
`pandas-and-bananas.md` will become `/pandas-and-bananas/`. But how do you get
the file name from the `MarkdownRemark` node? To get it, you need to _traverse_
the "node graph" to its _parent_ `File` node, as `File` nodes contain data you
need about files on disk. To do that, modify your function again:

ページのスラッグを作成するためには、各 Markdown の名前が必要です。 `pandas-and-bananas.md` は `/pandas-and-bananas/` になります。しかし、どうすれば`MarkdownRemark`ノードからファイル名を取得できるのでしょうか？`File`ノードにはあなたが必要としているファイルの情報が含まれています。
そのために、関数を再度変更します。

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

After restarting your development server, you should see the relative paths for your two markdown
files print to the terminal screen.

開発用サーバーを再起動すると、2 つの Markdown の相対パスがターミナルに表示されます。

![markdown-relative-path](markdown-relative-path.png)

Now you'll have to create slugs. As the logic for creating slugs from file names can get
tricky, the `gatsby-source-filesystem` plugin ships with a function for creating
slugs. Let's use that.

次に、スラッグを作成する必要があります。ファイル名からスラッグを作成するロジックは複雑になります。`gatsby-source-filesystem` プラグインにはスラッグを作成する関数が付属されているので、それを使用しましょう。

```javascript:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`) // highlight-line

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    console.log(createFilePath({ node, getNode, basePath: `pages` })) // highlight-line
  }
}
```

The function handles finding the parent `File` node along with creating the
slug. Run the development server again and you should see logged to the terminal
two slugs, one for each markdown file.

この関数はスラッグの作成とともに、 親の`File`ノードの探索を処理します。開発用サーバーを再起動すると。Markdown ごとに 1 つずつ、2 つのスラッグがターミナルに表示されます。

Now you can add your new slugs directly onto the `MarkdownRemark` nodes. This is
powerful, as any data you add to nodes is available to query later with GraphQL.
So, it'll be easy to get the slug when it comes time to create the pages.

これで新しいスラッグを `MarkdownRemark` ノードに直接追加できます。これは、 後から GraphQL でクエリーを実行できるので、強力です。そのため、ページを作成する時、スラッグを簡単に取得できます。

To do so, you'll use a function passed to your API implementation called
[`createNodeField`](/docs/actions/#createNodeField). This function
allows you to create additional fields on nodes created by other plugins. Only
the original creator of a node can directly modify the node—all other plugins
(including your `gatsby-node.js`) must use this function to create additional
fields.

そのために、[`createNodeField`](/docs/actions/#createNodeField)と呼ばれる関数を使用します。この関数を使用すると、他のプラグインにより作成されたノードに追加のフィールドを作成できます。

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

Restart the development server and open or refresh GraphiQL. Then run this
GraphQL query to see your new slugs.

サーバーを再起動して、GraphiQL を開くか更新します。次に、以下の GraphQL クエリーを実行して、新しいスラッグを確認します。

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

Now that the slugs are created, you can create the pages.

スラッグが作成され、ページを作成できます。

## Creating pages

## ページを作成する

In the same `gatsby-node.js` file, add the following.

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

You've added an implementation of the
[`createPages`](/docs/node-apis/#createPages) API which Gatsby calls so plugins can add
pages.

プラグインがページを追加できるように Gatsby が呼びだす [`createPages`](/docs/node-apis/#createPages) API の実装を追加しました。

As mentioned in the intro to this part of the tutorial, the steps to programmatically creating pages are:

冒頭で述べたように、プログラムでページを作成するステップは次の通りです。

1.  Query data with GraphQL
2.  Map the query results to pages

3.  GraphQL でデータを取得する
4.  結果をページにマッピングする

The above code is the first step for creating pages from your markdown as you're
using the supplied `graphql` function to query the markdown slugs you created.
Then you're logging out the result of the query which should look like:

上記のコードは、提供された `graphql` 関数を使用して作成された Markdown のスラッグを取得するため、 Markdown からページを作成する最初のステップです。
それから。

![query-markdown-slugs](query-markdown-slugs.png)

You need one additional thing beyond a slug to create pages: a page template
component. Like everything in Gatsby, programmatic pages are powered by React
components. When creating a page, you need to specify which component to use.

ページを作成するためには、スラッグの他にもう 1 つ追加する必要があります。ページテンプレートコンポーネントです。Gatsby の他のページと同じく、プログラムされるページは React コンポーネントによって強化されます。ページを作成する時、使用するコンポーネントを指定する必要があります。

Create a directory at `src/templates`, and then add the following in a file named
`src/templates/blog-post.js`.

`src/templates`ディレクトリーを追加し、`src/templates/blog-post.js`を作成して以下を追加します。

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

`gatsby-node.js`を更新します。

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

Restart the development server and your pages will be created! An easy way to
find new pages you create while developing is to go to a random path where
Gatsby will helpfully show you a list of pages on the site. If you go to
<http://localhost:8000/sdf>, you'll see the new pages you created.

サーバーを再起動すると、ページが作成されました！開発中に作成したページを見つける簡単な方法は、Gatsby がサイトのページリストを表示してくれるランダムなパスに移動することです。<http://localhost:8000/sdf> に移動すると、作成した新しいページが表示されます。

![new-pages](new-pages.png)

Visit one of them and you see:

それらにアクセスすると、次のように表示されます。

![hello-world-blog-post](hello-world-blog-post.png)

Which is a bit boring and not what you want. Now you can pull in data from your markdown post. Change
`src/templates/blog-post.js` to:

少し退屈で、あなたが望むものではありません。 Markdown の投稿からデータを取得できます。 `src/templates/blog-post.js` を次のように変更します。

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

The last step is to link to your new pages from the index page.

最後のステップは、index ページから新しいページにリンクすることです。

Return to `src/pages/index.js`, query for your markdown slugs, and create
links.

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
                    color: #bbb;
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

And there you go! A working, albeit small, blog!

そして、それを開きます！　小さなブログですが、動作します！

## チャレンジ

Try playing more with the site. Try adding some more markdown files. Explore
querying other data from the `MarkdownRemark` nodes and adding them to the
front page or blog posts pages.

作成したサイトでもっと遊んでみてください。さらに Markdown を追加してみてください。`MarkdownRemark`から他のデータを照会し、それらをフロントページや投稿ページに追加する方法を調べます。

In this part of the tutorial, you've learned the foundations of building with
Gatsby's data layer. You've learned how to _source_ and _transform_ data using
plugins, how to use GraphQL to _map_ data to pages, and then how to build _page
template components_ where you query for data for each page.

このパートでは、Gatsby のデータ層で構築する基礎を学びました。**ソース**とプラグインを使用して**変換**する方法、GraphQL を使ってページのデータを**マッピング**する方法、各ページのデータを取得する**ページ**テンプレート**コンポーネント**を構築する方法を学びました。

## 次は？

Now that you've built a Gatsby site, where do you go next?

あなたは Gatsby のサイトを構築しました。次はどうしますか？

- Share your Gatsby site on Twitter and see what other people have created by searching for #gatsbytutorial! Make sure to mention @gatsbyjs in your Tweet and include the hashtag #gatsbytutorial :)
- You could take a look at some [example sites](https://github.com/gatsbyjs/gatsby/tree/master/examples#gatsby-example-websites)
- Explore more [plugins](/docs/plugins/)
- See what [other people are building with Gatsby](/showcase/)
- Check out the documentation on [Gatsby's APIs](/docs/api-specification/), [nodes](/docs/node-interface/), or [GraphQL](/docs/graphql-reference/)

- Gatsby のサイトを Twitter で共有し、 #gatsbytutorial で検索して、他の人が作成したサイトを見てみましょう！
  ツイートには @gatsbyjs と、 #gatsbytutorial 　のハッシュタグを含めてください :)
- いくつかの[サンプルページ](https://github.com/gatsbyjs/gatsby/tree/master/examples#gatsby-example-websites)を見ることができます。
- [プラグイン](/docs/plugins/)を調べる
- [Gatsby によって構築されたページ](/showcase/)を見る
- [Gatsby の API](/docs/api-specification/)、[ノード](/docs/node-interface/)、[GraphQL](/docs/graphql-reference/)を調べる
