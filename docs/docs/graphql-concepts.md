---
title: GraphQLのコンセプト
---

"../../www/src/components/layer-model"から、LayerModel をインポートします。

React コンポーネントにデータをロードするためのオプションは、数多くあります。なかでももっとも人気があり、かつ強力な技術が [GraphQL](http://graphql.org/) です。

GraphQL は、開発者がより楽に React コンポーネントにデータを取り込む（_pull_)ために、Facebook で発明されました。

GraphQL はクエリー検索言語（GraphQL の QL は、Query Language の*QL*)です。

SQL に精通している開発者であれば、GraphQL を同じように扱うことができます。特別な構文を使用して、コンポーネントに必要なデータを記述すれば、そのデータが提供されます。

Gatsby は GraphQL を使用して、[ページおよび StaticQuery コンポーネント](/docs/building-with-components/)で有効になったデータとそのサブコンポーネントに必要なデータを宣言します。 次に Gatsby は、コンポーネントにデータが必要となるタイミングで、ブラウザーで使用できます。

複数ソースからのデータは、Gatsby の構築プロセスの重要な部分である、統合レイヤーで検索可能になります。

<LayerModel initialLayer="Data" />

## GraphQL はなぜ良いのか

詳細については、[Gatsby が GraphQL を使用する理由](/docs/why-gatsby-uses-graphql/)を参照してください。

- フロントエンドのデータの雛形 — データの要求と待機を心配する必要はありません。 GraphQL クエリーで必要なデータを要求するだけで、必要なときに表示されます
- フロントエンドの複雑さをクエリーに投げる — GraphQL クエリー内の _build-time_ で多くのデータ変換を実行できます
- モダンなアプリケーションにありがちな、複雑でネストされたデータの依存関係に最適なデータクエリー言語です
- データの肥大化を除去してパフォーマンスを改善 — GraphQL では、API のレスポンス値ではなく、必要なデータのみを選択し取得できます

## GraphQL はどんな感じか

GraphQL では、必要なる正しいデータを要求できます。
クエリーは JSON ライクです。

```graphql
{
  site {
    siteMetadata {
      title
    }
  }
}
```

このように返ってきます。

```json
{
  "site": {
    "siteMetadata": {
      "title": "A Gatsby site!"
    }
  }
}
```

GraphQL クエリーを含む基本的なページコンポーネントは、次のようになります。

```jsx
import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => (
  <div>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>We're a very cool website you should return to often.</p>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

クエリーの結果は、 `data`プロパティの React コンポーネントに自動的に挿入されます。GraphQL と Gatsby を使用すると、データを要求すると即座に使用を開始できます。

**注：** ページ以外のコンポーネントで GraphQL クエリーを実行するには、[Gatsby の静的クエリー機能](/docs/static-query/)を使用する必要があります。

### クエリーを理解する

図は、凡例の名前に、対応する色で強調された各単語を含む GraphQL クエリーを示しています。

![GraphQL query diagram](./images/basic-query.png)

#### クエリーオペレーションタイプ

図では、`Query`という単語を `Operation type` としてマーキングしています。Gatsby が扱う操作タイプは `Query` のみのため、必要に応じてクエリーから省略できます（上記の例のように）。

#### オペレーションネーム

`SiteInformation` は `Operation Name` としてマークされます。これは、クエリーに自分で割り当てる一意の名前です。

関数や変数に名前を付ける方法と似ています。関数のように、クエリーを匿名にする場合は省略できます。

#### クエリーフィールド

4 つの単語 `site` 、 `id` 、 `siteMetadata` 、および `title` は"Fields"としてマークされます。

GraphQL クエリーのすべてのフィールドは同じように動作するため、名前は機能上の重要性を意味しませんが、トップレベルのフィールド（図の `site` など）は**ルートレベルのフィールド**と呼ばれることもあります。

## GraphQL の学び方

GraphQL を初めて見たのは、Gatsby での開発経験です！　あなたがそれを愛することを願っています。すべてのプロジェクトに役立つと思います。

GraphQL を使用する場合、次の 2 つのチュートリアルをお勧めします。

- https://www.howtographql.com/
- http://graphql.org/learn/

[Gatsby 公式チュートリアル](/tutorial/part-four/)には、特に Gatsby で GraphQL を使用するための紹介も含まれています。

## GraphQL と Gatsby はどう連携するか

GraphQL の優れた点の 1 つは、その柔軟性です。 GraphQL は、[多くの異なるプログラミング言語](http://graphql.org/code/)で、Web アプリとネイティブアプリに使用されます。

ほとんどの人は、サーバーで GraphQL を実行して、クライアントからのデータの要求にライブで応答します。GraphQL サーバーのスキーマ（スキーマはデータの形状を記述する正式な方法です）を定義し、GraphQL リゾルバーがデータベースや他の API からデータを取得します。

Gatsby は、ライブサイトの*build-time*および*not*で GraphQL を使用します。これはユニークであり、実際に動いているウェブサイトで GraphQL を使用するためにサービス（データベースや Node.js など）を余計に実行する必要がないことを意味します。

Gatsby はアプリを構築するための優れたフレームワークであるため、ブラウザーからライブの GraphQL サーバーに対して実行される Gatsby のネイティブビルド時に、GraphQL と GraphQL クエリーを組み合わせることが可能です。

## Gatsby の GraphQL スキーマはどこから来るのか

GraphQL のほとんどの使用法では、GraphQL スキーマを手動で作成します。

Gatsby は、さまざまなソースからデータを取得できるプラグインを使用します。そのデータは、GraphQL スキーマを自動的に推測（_infer_)するために使用されます。

次のような Gatsby データを指定した場合：

```json
{
  "title": "A long long time ago"
}
```

Gatsby は、次のようなスキーマを作成します。

```
title: String
```

これにより、どこからでも簡単にデータを要求し、データに対する GraphQL クエリーの作成をすぐに開始できます。

この _can_ は、いくつかのデータソースで定義できるため、混乱を引き起こします。スキーマの一部またはすべてにデータが追加されていない場合でも、スキーマのこれらの部分は Gatsby で再作成されない可能性があります。

## 強力なデータ変換

GraphQL は、Gatsby の別のユニークな機能を可能にします — クエリーへの引数でデータ変換を制御できます。 次に例を示します。

### 日付のフォーマット

多くの場合、"2018-01-05"のような日付を保存しますが、"2018 年 1 月 5 日"のような他の形式で日付を表示したいと考えています。

これを行う 1 つの方法は、日付形式の JavaScript ライブラリをブラウザーにロードすることです。または、Gatsby の GraphQL レイヤーを使用すると、クエリ時にフォーマットを次のように行うことができます。

```graphql
{
  date(formatString: "MMMM Do, YYYY")
}
```

フォーマットオプションの一覧は、 [GraphQL reference page](/docs/graphql-reference/#dates)を表示してご覧ください。

### Markdown

Gatsby には、あるフォームから別のフォームにデータを変換できる _transformer_ プラグインがあります。

一般的な例は Markdown です。 [`gatsby-transformer-remark`](/packages/gatsby-transformer-remark/)をインストールする場合、Markdown の代わりに、変換された HTML バージョンを使用するかどうかをクエリで指定できます。

```graphql
markdownRemark {
  html
}
```

### 画像

Gatsby は、画像の処理を豊富にサポートしています。

レスポンシブ画像は現代のウェブの大部分を占めており、通常、写真ごとに 5 つ以上のサイズのサムネイルを作成する必要があります。 Gatsby の[`gatsby-transformer-sharp`](/packages/gatsby-transformer-sharp/)を使用すると、レスポンシブバージョンの画像を*query*できます。 クエリは、必要なレスポンシブサムネイルをすべて自動的に作成し、 `src` および `srcSet` フィールドを返して、画像要素に追加します。

特別な Gatsby 画像コンポーネント[gatsby-image](/packages/gatsby-image/)と組み合わせることで、画像を含むサイトを構築するための非常に強力なセットを使用できます。

以下は、 `gatsby-image`を使用するコンポーネントがどのように見えるかです：

```jsx
import React from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"

export default ({ data }) => (
  <div>
    <h1>Hello gatsby-image</h1>
    <Img fixed={data.file.childImageSharp.fixed} />
  </div>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

こちらのブログもご覧ください。

- [Making Website Building Fun](/blog/2017-10-16-making-website-building-fun/)
- [Image Optimization Made Easy with Gatsby.js](https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e)

## 上級者向け

### フラグメント

[querying images](#images)の上記の例では、 `... GatsbyImageSharpFixed`を使用したことに注意してください。

これは、GraphQL Fragment であり、クエリー作成用の再利用可能なフィールドのセットです。
詳細については、[こちら](http://graphql.org/learn/queries/#fragments)をご覧ください。

アプリケーションで使用する独自のフラグメントを定義する場合は、名前付きのエクスポートを使用して、任意の JavaScript ファイルにエクスポートできます。それらは GraphQL クエリーで使用するために Gatsby によって自動的に処理されます。

たとえば、ヘルパーコンポーネントにフラグメントを配置すると、他のクエリーでそのフラグメントを使用できます。

```jsx:title=src/components/PostItem.js
export const markdownFrontmatterFragment = graphql`
  fragment MarkdownFrontmatter on MarkdownRemark {
    frontmatter {
      path
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
```

それらはその後、GraphQL クエリーで使用できます！

```graphql
query($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    ...MarkdownFrontmatter
  }
}
```

ヘルパーコンポーネントは、必要なデータのフラグメントを定義してエクスポートすることをお勧めします。 たとえば、インデックスページで、すべての投稿をマップして一覧に表示できます。

```jsx:title=src/pages/index.jsx
import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <div>
      <h1>Index page</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>
            {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
          </h3>
        </div>
      ))}
    </div>
  )
}

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
        }
      }
    }
  }
`
```

インデックスコンポーネントが大きくなりすぎた場合は、小さなコンポーネントにリファクタリングすることをお勧めします。

```jsx:title=src/components/IndexPost.jsx
import React from "react"
import { graphql } from "gatsby"

export default ({ frontmatter: { title, date } }) => (
  <div>
    <h3>
      {title} <span>— {date}</span>
    </h3>
  </div>
)

export const query = graphql`
  fragment IndexPostFragment on MarkdownRemark {
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
```

これで、インデックスページでエクスポートされたフラグメントとともにコンポーネントを使用できます。

```jsx:title=src/pages/index.jsx
import React from "react"
import IndexPost from "../components/IndexPost"
import { graphql } from "gatsby"

export default ({ data }) => {
  return (
    <div>
      <h1>Index page</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <IndexPost frontmatter={node.frontmatter} />
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          ...IndexPostFragment
        }
      }
    }
  }
`
```

## 参考文献

- [Gatsby が GraphQL を使う理由](/docs/why-gatsby-uses-graphql/)
- [GraphQL クエリーの構造](https://blog.apollographql.com/the-anatomy-of-a-graphql-query-6dffa9e9e747)

### GraphQL をはじめてみよう

- http://graphql.org/learn/
- https://www.howtographql.com/
- https://reactjs.org/blog/2015/05/01/graphql-introduction.html
- https://services.github.com/on-demand/graphql/

### GraphQL をより理解するために

- [GraphQL の仕様](https://facebook.github.io/graphql/October2016/)
- [インターフェースとユニオン](https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d)
- [リレーコンパイラ(Gatsby がクエリーを処理するために)](https://facebook.github.io/relay/docs/en/compiler-architecture.html)
