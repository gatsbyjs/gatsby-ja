---
title: "レシピ集: データの取得"
tableOfContentsDepth: 1
---

Gatsby のデータ取得はプラグインによって実現されています。データ取得プラグインはデータソースからデータを取得します。（例： `gatsby-source-filesystem` プラグインはファイルシステムからデータを取得する、`gatsby-source-wordpress` プラグインは WordPress API からデータを取得する、等）データソースを自身で用意することも可能です。

## GraphQL にデータを追加する

Gatsby の [GraphQL data layer](/docs/graphql-concepts/) はデータの塊をモデル化するノードを必要とします。Gatsby データ取得プラグインはクエリ対象のソースノードを追加します。しかし、ソースノードはご自身で作成することも可能です。Gatsby では、GraphQL のデータレイヤーにカスタムデータを追加する為のメソッドが提供されています。

このレシピでは、`createNode()` を用いてカスタムデータを追加する方法を紹介します。

### 手順

1. `gatsby-node.js` では `sourceNodes()` と `actions.createNode()` が、データを検索する為のノードの作成と書き出しに用いられます。

```javascript:title=gatsby-node.js
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const pokemons = [
    { name: "Pikachu", type: "electric" },
    { name: "Squirtle", type: "water" },
  ]

  pokemons.forEach(pokemon => {
    const node = {
      name: pokemon.name,
      type: pokemon.type,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}
```

2. `gatsby develop` を実行します。

   > ヒント：`gatsby-node.js` に変更を加えたら、変更を反映させるために、`gatsby develop` を再度実行する必要があります。

3. データの検索（GraphiQL もしくは新たに作成したコンポーネント内で）

```graphql
query MyPokemonQuery {
  allPokemon {
    nodes {
      name
      type
      id
    }
  }
}
```

### 追加資料

<<<<<<< HEAD
- [チュートリアル パート 5](/tutorial/part-five/#source-plugins) にて、`gatsby-source-filesystem` を用いた例の概略
- [Gatsby ライブラリ](/plugins/?=source)内で検索可能なデータ取得プラグイン
- [Pixabay データ取得プラグインのチュートリアル](/docs/pixabay-source-plugin-tutorial/) 内での、データ取得プラグインのハンズオン
- createNode の[ドキュメント](/docs/actions/#createNode)
=======
- Walk through an example using the `gatsby-source-filesystem` plugin in [tutorial part five](/tutorial/part-five/#source-plugins)
- Search available source plugins in the [Gatsby library](/plugins/?=source)
- Understand source plugins by building one in the [Pixabay source plugin tutorial](/tutorial/pixabay-source-plugin-tutorial/)
- The createNode function [documentation](/docs/actions/#createNode)
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

## GraphQL を用いたブログ投稿やページの為の Markdown データの取得

Markdown データと Gatsby が提供する [`createPages` API](/docs/actions/#createPage) を用いて、動的にページを作成することが出来ます。

このレシピでは、Gatsby の GraphQL データレイヤーを用いて、ローカル環境にある Markdown ファイルからページを作る方法をご紹介します。

### 条件

- `gatsby-config.js` を持つ [Gatsby の作られたサイト](/docs/quick-start) である
- [Gatsby CLI](/docs/gatsby-cli) がインストールされている
- [gatsby-source-filesystem プラグイン](/packages/gatsby-source-filesystem) がインストールされている
- [gatsby-transformer-remark プラグイン](/packages/gatsby-transformer-remark) がインストールされている
- `gatsby-node.js` が存在する

### 手順

1. `gatsby-config.js` で、`gatsby-transformer-remark` と `gatsby-source-filesystem` の設定を行い、ソースディレクトリーから Markdown ファイルを落としてくる様にします。この設定は、画像など、それまでに記載された `gatsby-source-filesystem` のエントリーに追加して読み込まれます。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
  ]
```

2. `src/content` に Markdown を投稿する際は、タイトル、日付、パス、そして投稿本文の初期コンテンツの Formatter を含めてください。

```markdown:title=src/content/my-first-post.md
---
title: My First Post
date: 2019-07-10
path: /my-first-post
---

This is my first Gatsby post written in Markdown!
```

3. `gatsby develop` コマンドで開発用サーバーを立ち上げ、`http://localhost:8000/___graphql` にアクセスし、GraphiQL エクスプロラーを閲覧します。そこで、すべての Markdown データを取得するクエリを作成します。

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          path
        }
      }
    }
  }
}
```

<iframe
  title="Query for all markdown"
  src="https://q4xpb.sse.codesandbox.io/___graphql?explorerIsOpen=false&query=%7B%0A%20%20allMarkdownRemark%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
  width="600"
  height="300"
/>

4. `gatsby-node.js` への GraphQL クエリをコピーして結果をループすることにより、ビルド時に Markdown 投稿からページを作成する JavaScript のコードを追加します。

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
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
  if (result.errors) {
    console.error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })
}
```

5. ビルド時に、Markdown コンテンツから動的にページを生成するための GraphQL クエリを含む投稿テンプレートを `src/templates` に追加します。

```jsx:title=src/templates/post.js
import React from "react"
import { graphql } from "gatsby"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post">
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
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

6. `gatsby develop` コマンドを実行して、開発サーバーを再起動します。投稿は `http://localhost:8000/my-first-post` で閲覧できます。

### 追加資料

- [チュートリアル：データからページをプログラムで作成する](/tutorial/part-seven/)
- [ページの作成と編集](/docs/creating-and-modifying-pages/)
- [マークダウンのページを追加](/docs/adding-markdown-pages/)
- [プログラムでデータからページを作成する方法](/docs/programmatically-create-pages-from-data/)
- このレシピの[参考リポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/recipe-sourcing-markdown)

## WordPress のデータを扱う

### 条件

- `gatsby-config.js` と `gatsby-node.js` が存在する [Gatsby サイト](/docs/quick-start/)であること
- WordPress インスタンスであること（自分でホスティングしているもの、Wordpress.com 上で展開しているもののどちらでも）

### 手順

1. 次のコマンドを実行して、`gatsby-source-wordpress` プラグインをインストール

```shell
npm install gatsby-source-wordpress --save
```

2. プラグインの設定の為に、`gatsby-config.js` に次にコードを追記

```javascript:title=gatsby-config.js
module.exports = {
  ...
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // baseUrl will need to be updated with your WordPress source
        baseUrl: `wpexample.com`,
        protocol: `https`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: false
      }
    },
  ]
}
```

> **ヒント：** プラグインの設定については、[`gatsby-source-wordpress` プラグインの Docs](/packages/gatsby-source-wordpress/?=wordpre#how-to-use) を参考にしてください

3. 次のコードを含むテンプレートコンポーネントを `src/templates/post.js` に作成します

```jsx:title=post.js
import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

class Post extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Post

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
    }
  }
`
```

4. `gatsby-node.js` に次のサンプルコードを貼り付けて、WordPress の投稿の為のページを動的に作成します：

```javascript:title=gatsby-node.js
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWordpressPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/post.js`)
  result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      // `path` will be the url for the page
      path: edge.node.slug,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this posts's data.
      context: {
        id: edge.node.id,
      },
    })
  })
}
```

5. `gatsby-develop` を実行して、新しく生成されたページを閲覧しにいきます

6. `http://localhost:8000/__graphql` で `GraphiQL IDE` を表示して、Docs や `allWordpressPosts` に対するクエリーフィールドの監視をするエクスプローラーを開きます。

上記 `gatsby-node.js` で作成された動的ページには、特定の投稿に移動する為の一意のパスがあり、投稿用のテンプレートコンポーネントと WordPress 投稿コンテンツのソースとなるサンプル GraphQL クエリを使用します。

### 追加資料

- [Getting Started with WordPress and Gatsby](/blog/2019-04-26-how-to-build-a-blog-with-wordpress-and-gatsby-part-1/)
- [WordPress のデータを利用する](/docs/sourcing-from-wordpress/) へ進む
- [データを利用する例](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-wordpress)

## Sourcing data from Contentful

### 条件

- [Gatsby サイト](/docs/quick-start/) であること
- [Contentful アカウント](https://www.contentful.com/) をもっていること
- [Contentful CLI](https://www.npmjs.com/package/contentful-cli) がインストールされていること

### 手順

1. まず、Contentful CLI を使って Contentful にログインしてください。アカウントを持っていない場合にアカウントを作成するのに役立ちます。

```shell
contentful login
```

1. Contentful Space や Space ID を持っている場合には、ステップ 2 と 3 はスキップできます。まだ Contentful Space を作成していない場合には、新しく作成してください。コマンドの最後で割り振られた Space ID は保存してください。

ヒント：新しいアカウントの場合、デフォルトのオンボーディング Space は上書きされます。詳しくは [spaces included with your account](https://app.contentful.com/account/profile/space_memberships) を見てください。

```shell
contentful space create --name 'Gatsby example'
```

1. `<space ID>` の代わりに、前のコマンドから返された新しい Space ID を使用して、サンプルのブログコンテンツで新しい Space を作成（seed）します。

```shell
contentful space seed -s '<space ID>' -t blog
```

例えば、Space ID は右のように配置します： `contentful space seed -s '22fzx88spbp7' -t blog`

1. Space への新しいアクセストークンを作成します。このトークンは記憶してください。Step 6 で必要になります。

```shell
contentful space accesstoken create -s '<space ID>' --name 'Example token'
```

1. あなたの Gatsby サイトに `gatsby-source-contentful` プラグインをインストールします：

```shell
npm install --save gatsby-source-contentful
```

1. `gatsby-config.js` を編集して、`gatsby-source-contentful` を `plugins` の配列に追加して、プラグインを有効化します。セキュリティー為に、Space ID やトークンの管理には[環境変数](/docs/environment-variables/)を用いることを強く検討してみてください。

```javascript:title=gatsby-config.js
plugins: [
   // add to array along with any other installed plugins
   // highlight-start
   {


    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: `<space ID>`, // or process.env.CONTENTFUL_SPACE_ID
      accessToken: `<access token>`, // or process.env.CONTENTFUL_TOKEN
    },
  },
  // highlight-end
],
```

7. `gatsby develop` を実行し、サイトのコンパイルが成功したことを確認してください。

8) `http://localhost:8000/___graphql` にアクセスして、[GraphiQL editor](/docs/introducing-graphiql/) を使い、データを検索してください。Contentful プラグインによって、あなたのサイトに、あなたの Contentful ウェブサイトのすべての Content タイプを含む新しいノードタイプがいくつか追加されます。"Blog Post" という Content タイプを持つあなたの Example Space は、GraphQL に `allContentfulBlogPost` ノードタイプを作成します。

![the graphql interface, with a sample query outlined below](../images/recipe-sourcing-contentful-graphql.png)

Contentful からブログ投稿の titles に対してクエリを投げる場合には、次の GraphQL クエリを使用してください：

```graphql
{
  allContentfulBlogPost {
    edges {
      node {
        title
      }
    }
  }
}
```

Contentful ノードは `createdAt` や `node_locale` の様ないくつかのメタフィールドも含みます。

9. ブログの投稿へのリンクの一覧を表示するには、`/src/pages/blog.js` を作成してください。このページでは、すべての投稿が更新日順に表示されます。

```jsx:title=src/pages/blog.js
import React from "react"
import { graphql, Link } from "gatsby"

const BlogPage = ({ data }) => (
  <div>
    <h1>Blog</h1>
    <ul>
      {data.allContentfulBlogPost.edges.map(({ node, index }) => (
        <li key={index}>
          <Link to={`/blog/${node.slug}`}>{node.title}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogPage

export const query = graphql`
  {
    allContentfulBlogPost(sort: { fields: [updatedAt] }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
```

投稿詳細ページを含む Contentful サイト構築を続けるには、他の [Gatsby docs](/docs/sourcing-from-contentful/) と下記の追加資料をチェックしてみてください。

### 追加資料

- [Building a Site with React and Contentful](/blog/2018-1-25-building-a-site-with-react-and-contentful/)
- [Contentful のデータ利用についてもっと見る](/docs/sourcing-from-contentful/)
- [Contentful データ取得プラグイン](/packages/gatsby-source-contentful/)
- [Long-text field types returned as objects](/packages/gatsby-source-contentful/#a-note-about-longtext-fields)
- [このレシピの例](https://github.com/gatsbyjs/gatsby/tree/master/examples/recipe-sourcing-contentful)

## 外部ソースからデータを読み込み、GraphQL を使わずページを作成する

[GraphQL の利用を検討すべき理由はいくつかありますが](/docs/why-gatsby-uses-graphql/)、ページ内にデータを内包させる為に、必ずしも GraphQL データレイヤーを用いる必要はありません。GraphQL とソース プラグインを経由せず、`createPages` API を利用して、まだ構築されていないデータを直接 Gatsby サイトに読み込むことができます。

このレシピでは、[PokéAPI’s REST endpoints](https://www.pokeapi.co/) からデータを取得して動的にページを作成していきます。[完全な例](https://github.com/jlengstorf/gatsby-with-unstructured-data/) は GitHub にあります。

### 条件

- `gatsby-node.js` を持つ Gatsby サイトであること
- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること
- npm から [axios](https://www.npmjs.com/package/axios) がインストールされていること

### 手順

1. `gatsby-node.js` で、PokéAPI からデータを取得する JavaScript コードを追加して、プログラムでインデックスページを作成します：

```js:title=gatsby-node.js
const axios = require("axios")

const get = endpoint => axios.get(`https://pokeapi.co/api/v2${endpoint}`)

const getPokemonData = names =>
  Promise.all(
    names.map(async name => {
      const { data: pokemon } = await get(`/pokemon/${name}`)
      return { ...pokemon }
    })
  )
exports.createPages = async ({ actions: { createPage } }) => {
  const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

  // Create a page that lists Pokémon.
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon },
  })
}
```

2. ホームページに Pokémon を表示させるテンプレートを作成します：

```jsx:title=src/templates/all-pokemon.js
import React from "react"

export default ({ pageContext: { allPokemon } }) => (
  <div>
    <h1>Behold, the Pokémon!</h1>
    <ul>
      {allPokemon.map(pokemon => (
        <li key={pokemon.id}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </li>
      ))}
    </ul>
  </div>
)
```

1. `gatsby develop` を実行して、データを取得、ページの構築、開発用サーバーを立ち上げます。
2. ホームページをブラウザーで閲覧します：`http://localhost:8000`

### 追加資料

- [Full Pokemon data repo](https://github.com/jlengstorf/gatsby-with-unstructured-data/)
- 非構造化データの利用についてもっと知るには、[Using Gatsby without GraphQL](/docs/using-gatsby-without-graphql/) をみてください
- より複雑な Gatsby サイトの為に、いつ、どのように[GraphQL でデータを検索するか](/docs/graphql-concepts/)

## Drupal からコンテンツを読み込む

### 条件

- [Gatsby サイト](/docs/quick-start) であること
- [Drupal](http://drupal.org) サイトであること
- Drupal サイトに [JSON:API module](https://www.drupal.org/project/jsonapi) がインストールされていて使用可能であること

### 手順

1. `gatsby-source-drupal` をインストールしてください。

```shell
npm install --save gatsby-source-drupal
```

1. `gatsby-config.js` を編集し、プラグインを有効化してください。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://your-website/`,
        apiBase: `api`, // optional, defaults to `jsonapi`
      },
    },
  ],
}
```

3. コマンドを実行し、開発用サーバーを立ち上げて、`http://localhost:8000/___graphql` で GraphiQL エクスプローラーを開いてください。Explorer タブの下に、Drupal ブロックの場合は `allBlockBlock` 、Drupal サイトのすべてのコンテンツタイプの場合は新しいノードタイプが表示されます。例えば、もし「ページ」コンテンツタイプがある場合では、`allNodePage` として使用可能になります。すべての「ページ」ノードの title と body を検索するには、次のようなクエリを使用します：

```graphql
{
  allNodePage {
    edges {
      node {
        title
        body {
          value
        }
      }
    }
  }
}
```

4. Drupal データを使うには、Gatsby サイトの `src/pages/drupal.js` に新しいページを作成してください。このページには、すべての Drupal「ページ」ノードが一覧表示されます。

**ヒント：** 正確な GraphQL スキーマは、Drupal インスタンスの構造に依存します。

```jsx:title=src/pages/drupal.js
import React from "react"
import { graphql } from "gatsby"

const DrupalPage = ({ data }) => (
  <div>
    <h1>Drupal pages</h1>
    <ul>
    {data.allNodePage.edges.map(({ node, index }) => (
      <li key={index}>
        <h2>{node.title}</h2>
        <div>
          {node.body.value}
        </div>
      </li>
    ))}
   </ul>
  </div>
)

export default DrupalPage

export const query = graphql`
  {
  allNodePage {
    edges {
      node {
        title
        body {
          value
        }
      }
    }
  }
}
```

1. 開発用サーバーを起動すると、`http://localhost:8000/drupal` に訪問することで新しいページを閲覧できます。

### 追加資料

- [Using Decoupled Drupal with Gatsby](/blog/2018-08-13-using-decoupled-drupal-with-gatsby/)
- [Drupal のデータ利用についてもっと見る](/docs/sourcing-from-drupal)
- [チュートリアル：プログラムでデータからページを生成する](/tutorial/part-seven/)
