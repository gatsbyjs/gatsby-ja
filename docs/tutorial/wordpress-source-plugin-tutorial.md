---
title: "WordPress Source Plugin Tutorial"
---

## WordPress から取得したデータを使用するサイトの作成方法

### このチュートリアルの範囲：

このチュートリアルでは、 Gatsby サイトに設定された WordPress からブログや画像データを取得・レンダリングするために `gatsby-source-wordpress` をインストールすることになります。こちらの [Gatsby + WordPress デモサイト](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-wordpress) では、これからチュートリアルで作成するサイトに近いサンプルサイトのソースコードを確認できます。サンプルサイトには見た目の良い画像は設定されていませんが、次の [WordPress サイトに画像を追加する](/tutorial/wordpress-image-tutorial/) チュートリアルで設定を行うことになるでしょう。

#### まって、 GraphQL の方がいい？

もし GraphQL を使いたいとお考えでしたら、 WordPress で簡単にデータを GraphQL で取得できる [wp-graphql](https://github.com/wp-graphql/wp-graphql) プラグインがあります。

WP-API でサポートされている同一の認証スキームは wp-graphql でサポートされています。これは [gatsby-source-graphql](/packages/gatsby-source-graphql/) と同時に使うことができます。

## なぜこのチュートリアルをやるの？

各ソースプラグインは、他と異なった動きをすることがあります。ほとんどの Gatsby サイトではほぼ確実にソースプラグインを使用することになるため、このチュートリアルはきっと助けになるでしょう。このチュートリアルでは Gatsby サイトを CMS に接続し、データを取得し、そのデータを React で表示するための素晴らしい方法の基礎を学ぶことができます。

もし利用可能な、今も増え続けているソースプラグインをご覧になりたければ、 [Gatsby プラグインライブラリー](/plugins/?=source) で "source" というキーワードで検索してください。

### `gatsby-source-wordpress` プラグインを使用するサイトを作成

Gatsby プロジェクトを新規作成し、生成されたプロジェクトのディレクトリーに移動してください。

```shell
 gatsby new wordpress-tutorial-site
cd wordpress-tutorial-site
```

`gatsby-source-wordpress` プラグインをインストールしてください。このチュートリアルでは説明していないプラグインの機能や GraphQL クエリーの例については、 [`gatsby-source-wordpress` プラグインの README ファイル](/packages/gatsby-source-wordpress/?=wordpress) をご覧ください。

```shell
npm install --save gatsby-source-wordpress
```

以下のコードを使い、 `gatsby-config.js` に `gatsby-source-wordpress` プラグインを追加してください。これは[デモサイトのソースコード](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/gatsby-config.js) でも確認できます。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Gatsby WordPress Tutorial",
  },
  plugins: [
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Gatsby のデータ処理レイヤーは "source" プラグインから始まります。
     * このサイトでは WordPress からデータを取得しています。
     */
    // highlight-start
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * 最後のスラッシュとプロトコルを含まない WordPress サイトのベース URL。これは必須項目です。
         * 例 : 'dev-gatbsyjswp.pantheonsite.io' または 'www.example-site.com'
         */
        baseUrl: `dev-gatbsyjswp.pantheonsite.io`,
        // プロトコル。ここでは http か https を設定できます。
        protocol: `http`,
        // wordpress.com にホスティングされているかを示します。
        // false を設定した場合、セルフホスティングだと仮定されます。
        // true を設定した場合、プラグインは JSON REST API V2 を使用して wordpress.com からコンテンツを取得します。
        // もし wordpress.org にホスティングされている場合は false を指定してください。
        hostingWPCOM: false,
        // もし useACF が true の場合、ソースプラグインは WordPress ACF プラグインコンテンツのインポートを試行します。
        // この機能は WordPress.com にホスティングされたサイトではテストされていません。
        useACF: true,
      },
    },
    // highlight-end
  ],
}
```

### WordPress からデータを取得する GraphQL クエリーの作成

これで WordPress サイトからデータを取得するための GraphQL クエリーを作成する準備が整いました。それではブログ記事のタイトル、投稿日付、ブログ記事の本文を取得するためのクエリーを作成しましょう。

以下を実行してください。

```shell
gatsby develop
```

ブラウザーから localhost:8000 を開いてください。また GraphQL クエリーを作成するために localhost:8000/\_\_\_graphql を開いてください。

練習として、 GraphQL エクスプローラーで以下のクエリーの再作成に挑戦してみてください。この最初のクエリーは WordPress のブログ記事の本文を取得します。

```graphql
query {
  allWordpressPage {
    edges {
      node {
        id
        title
        excerpt
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
}
```

次のクエリーはソートされたブログ記事のリストを取得します。

```graphql
{
  allWordpressPost(sort: { fields: [date] }) {
    edges {
      node {
        title
        excerpt
        slug
      }
    }
  }
}
```

## `index.js` にブログ記事をレンダリングする

これであなたが必要としているデータを取得する GraphQL クエリーが作成できました。 2 番目のクエリーはあなたのサイトのトップページで、ソートされたブログ記事のタイトルのリストを作成するために使用します。こちらが `index.js` のあるべき状態です。

```jsx:title=src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  //highlight-line
  return (
    <Layout>
      <SEO title="home" />
      //highlight-start
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div>
          <p>{node.title}</p>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
      //highlight-end
    </Layout>
  )
}

//highlight-start
export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
//highlight-end
```

こちらの変更を保存して localhost:8000 にアクセスし、ソートされたブログ記事のリストがある新しいトップページを確認しましょう！

![クエリー実行後の WordPress ホーム](./images/wordpress-source-plugin-home.jpg)

> **ヒント:** 将来の編集者へ: ブログ記事をそれぞれの個別ページに表示させるための例も示しておくと便利でしょう。また最終的な結果のスクリーンショットをここに挿入することも助けとなります。

## 各ブログ記事のページを作成し、それらにリンクを設定する

投稿のタイトルと抜粋があるインデックスページは素晴らしいものですが、あなたは各ブログ記事の個別ページを作り、それらに `index.js` ファイルからリンクさせる必要があるでしょう。

そのためには以下を行う必要があります。

1. 各ブログ記事のページを作成する。
2. インデックスページ上のタイトルからブログ記事へのリンクを作成する。

もしまだこれらを行っていないようでしたら、基本チュートリアルの[パート 7](/tutorial/part-seven/) をご覧ください。このページでは WordPress の代わりに Markdown を使用してコンセプトとこのプロセスの例について説明しています。

### 各ブログ記事へのページを作成する

先程のチュートリアルのパート 7 では、ページを作成するための最初の一歩として Markdown ファイルのためにスラッグを作成しています。 Markdown ファイルの代わりに WordPress を使用しているため、 WordPress への API 呼び出しから取得できるスラッグを利用できます。あなたはすでにスラッグを取得できるため、新たにそれらを作成する必要はありません。

プロジェクトのルートにある `gatsby-node.js` ファイルを開き（これはいくつかのコメントを除けば空のファイルのはずです）以下を追記してください。

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    console.log(JSON.stringify(result, null, 4))
  })
}
```

次に `gatsby develop` 環境の停止と再起動を行います。ターミナルを見ることで、あなたは 2 つの記事オブジェクトのログ出力を見ることができます。

![ターミナルにログ出力された 2 つのブログ記事](./images/wordpress-source-plugin-log.jpg)

すばらしい！チュートリアルのパート 7 で述べられたように、この `createPages` の出力は Gatsby の主機能の 1 つであり、 WordPress のインストールからブログ記事（もしくはページやカスタムポストなど）を作成することを可能にします。

しかしながら、実際のブログ記事を作成するためには、事前にページをビルドするためのテンプレートを指定しなければなりません。

`src` ディレクトリー内で、 `templates` という名前のディレクトリーを作成し、その中で `blog-post.js` というフィールドを作成します。その新しいファイル内に、以下をペーストしてください。

```jsx:title=src/templates/blog-post.js
import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({ data }) => {
  const post = data.allWordpressPost.edges[0].node
  console.log(post)
  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`
```

このファイルは何をやっているのでしょうか？依存関係をインポートした後に、 JSX を使いブログ記事のレイアウトを構築しています。これは `Layout` コンポーネント内のすべてをラップしているため、サイト全体を通してレイアウトは同じです。また、これは記事のタイトルと本文を単純に追加しています。ここでは好きなものを追加したり、クエリー内容を変更したり出来ます（例：画像、記事のメタデータ、カスタムフィールドなど）

以下では `$slug` を使用した特定の記事を取得する GraphQL を確認できます。この変数は `gatsby-node.js` 内でページが作成される際に `blog-post.js` テンプレートへ渡されます。これを行うために、以下のコードを `gatsby-node.js` ファイルに追記してください。

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWordpressPost(sort: { fields: [date] }) {
        edges {
          node {
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `).then(result => {
    //highlight-start
    result.data.allWordpressPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
    //highlight-end
  })
}
```

再度開発環境を `gatsby develop` コマンドで再起動する必要があります。再起動を行ったら、サイトのインデックスページでは変化は見られませんが、 [http://localhost:8000/asdf](http://localhost:8000/asdf) のような 404 ページを閲覧すると、作成した 2 つの
サンプル記事を確認でき、それらをクリックすることでサンプル記事のページに行くことが出来ます。

![サンプル記事のリンク](./images/wordpress-source-plugin-sample-post-links.gif)

しかし、誰もブログ記事を見つけようと 404 ページに飛びたいとは思いませんね！なので、トップページからリンクを張りましょう。

### トップページから記事にリンクを張る

すでに `index.js` に構造とクエリーの設定を行っているため、ただ `Link` コンポーネントを使ってタイトルを囲むだけで設定できます。

`index.js` ファイルを開き、以下を追記してください。

```jsx:title=src/pages/index.js
import React from "react"
import { Link, graphql } from "gatsby" //highlight-line
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div>
          //highlight-start
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
          //highlight-end
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
```

これで完了です！ `Link` コンポーネントでタイトルを囲って記事の slug を参照させれば、 Gatsby は魔法のようにそこへのリンクを設定し、事前に読み込み、ページ間の移動を信じられないほど早くしてくれます。

![トップページからブログ記事へのリンクが設置された最終的な完成品](./images/wordpress-source-plugin-home-to-post-links.gif)

### まとめ

同じ手順を使うことで、ページを呼び出して生成したり、カスタム記事タイプやカスタムフィールドを設定したり、分類を行ったり、そして WordPress の機能として知られているすべての楽しく柔軟なコンテンツを利用したりできます。これはいくらでも簡単にしたり複雑にしたりできます。なので楽しみながらいろいろ試してみてください！
