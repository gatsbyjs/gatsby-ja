---
title: Gatsby が GraphQL を使用する理由
---

「なぜ Gatsby は GraphQL を使用するのですか？ Gatsby は静的ファイルを生成するのですよね？」とよく質問されます。

何らかのコンテキストが与えられなければ、Gatsby にとって GraphQL は過剰に見えるかもしれません。このドキュメントでは、ページ作成時に発生する問題と、それらの問題を GraphQL を使用して解決する方法について説明します。

## データなしでページを作成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-create-a-gatsby-page-without-any-data"
  lessonTitle="データなしで Gatsby ページを作成する"
/>

`src/pages/` 以外の場所でページを動的に作成するためには、Gatsby の [`createPages` Node API](/docs/node-apis/#createPages) が必要です。

`path` とレンダリングしたいコンポーネントを指定するだけで、ページを作成できます。

例えば、次のコンポーネントを考えてみましょう。

```jsx:title=src/templates/no-data.js
import React from "react"

const NoData = () => (
  <section>
    <h1>This Page Was Created Programmatically</h1>
    <p>
      No data was required to create this page — it’s just a React component!
    </p>
  </section>
)

export default NoData
```

以下のコードを `gatsby-node.js` に追加することで、`/no-data/` にページを動的に作成できます。

```js:title=gatsby-node.js
exports.createPages = ({ actions: { createPage } }) => {
  createPage({
    path: "/no-data/",
    component: require.resolve("./src/templates/no-data.js"),
  })
}
```

`gatsby develop` コマンドを実行すると、`http://localhost:8000/no-data/` では次のように表示されます。

![１つ前のコードスニペットで生成されたページのスクリーンショット](./images/why-gql-no-data.png)

もっともシンプルな場合は、 Gatsby でページを作成するために必要な手順はこれだけです。 しかし多くの場合は、ページにデータを渡し、テンプレートコンポーネントを再利用できるようにしたいはずです。

## ハードコードされたデータでページを作成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-create-a-gatsby-page-with-hard-coded-data"
  lessonTitle="Create a Gatsby Page With Hard-Coded Data"
/>

作成されたページにデータを渡すには、`context` を `createPage` に渡す必要があります。

`gatsby-node.js` では、以下のように `context` を追加できます。

```js:title=gatsby-node.js
exports.createPages = ({ actions: { createPage } }) => {
  createPage({
    path: "/page-with-context/",
    component: require.resolve("./src/templates/with-context.js"),
    context: {
      title: "We Don’t Need No Stinkin’ GraphQL!",
      content: "<p>This is page content.</p><p>No GraphQL required!</p>",
    },
  })
}
```

このようにして追加された `context` は、オブジェクトを受け取ります。`context` に渡された任意のデータは、そのページから参照できるようにできます。

> **ヒント：** `context` の中で使用できない予約語がいくつかあります。 それらは、`path` 、`matchPath` 、`component` 、`componentChunkName` 、`pluginCreator___NODE` 、そして `pluginCreatorId` です。

Gatsby が作成したページには `pageContext` という プロパティが含まれており、その値は `context` となっています。そのため、作成されたページからは、コンポーネントの任意の値を参照できます。

```jsx:title=src/templates/with-context.js
import React from "react"

const WithContext = ({ pageContext }) => (
  <section>
    <h1>{pageContext.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </section>
)

export default WithContext
```

`gatsby develop` コマンドで開発サーバーを起動し、`localhost:8000/page-with-context/` にアクセスして、作成されたページを確認してみましょう。

![ハードコードされたデータで作成されたページのスクリーンショット](./images/why-gql-with-context.png)

場合によっては、この方法で十分かもしれません。 しかし、ハードコードできないデータからページを作成したい場合も多々あります。

## 画像を含む JSON ファイルからページを作成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-create-pages-from-json-with-images"
  lessonTitle="Create Pages from JSON With Images"
/>

多くの場合、ページ用のデータを `gatsby-node.js` にハードコーディングすることはできません。 サードパーティー API 、ローカル Markdown、JSON ファイルなどの外部ソースからデータを取得する可能性が高くなるでしょう。

例えば、投稿データを含む JSON ファイルがあるとします。

```json:title=data/products.json
[
  {
    "title": "Vintage Purple Tee",
    "slug": "vintage-purple-tee",
    "description": "<p>Keep it simple with this vintage purple tee.</p>",
    "price": "$10.00",
    "image": "/images/amberley-romo-riggins.jpg"
  },
  {
    "title": "Space Socks",
    "slug": "space-socks",
    "description": "<p>Get your feet into these spaced-out black socks with a Gatsby purple border and heel.</p>",
    "price": "$10.00",
    "image": "/images/erin-fox-and-sullivan.jpg"
  },
  {
    "title": "This Purple Hat Is Blazing Fast",
    "slug": "purple-hat",
    "description": "<p>Add more blazingly blazing speed to your wardrobe with this solid purple laundered chino twill hat.</p>",
    "price": "$10.00",
    "image": "/images/david-bailey-cat-hat.jpg"
  }
]
```

この場合、画像を `/static/images/` フォルダーに追加する必要があります。（JSON ファイルと画像が同じ場所に追加されないため、これらの管理は難しくなります）

JSON ファイルと画像を追加したら、JSON ファイルを `gatsby-node.js` にインポートしてエントリーをループ処理し、 product ページを作成します。

```js:title=gatsby-node.js
exports.createPages = ({ actions: { createPage } }) => {
  const products = require("./data/products.json")
  products.forEach(product => {
    createPage({
      path: `/product/${product.slug}/`,
      component: require.resolve("./src/templates/product.js"),
      context: {
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
      },
    })
  })
}
```

product テンプレートは、引き続き `pageContext` を使用して product データを表示します。

```jsx:title=src/templates/product.js
import React from "react"

const Product = ({ pageContext }) => (
  <div>
    <h1>{pageContext.title}</h1>
    <img
      src={pageContext.image}
      alt={pageContext.title}
      style={{ float: "left", marginRight: "1rem", width: 150 }}
    />
    <p>{pageContext.price}</p>
    <div dangerouslySetInnerHTML={{ __html: pageContext.description }} />
  </div>
)

export default Product
```

`gatsby develop` コマンドを実行し、`localhost:8000/product/space-socks/` を開いて、生成された product の一例を見てみましょう。

![レンダリングされた product ページのスクリーンショット](./images/why-gql-product-json.png)

以上で作業は完了ですが、時間が経つにつれて複雑になる欠点がいくつかあります。

1. 画像と product データは、ソースコードの異なる場所にあります。
2. 画像のパスは、ソースコードではなく*ビルドされた*サイトからの絶対パスであるため、JSON ファイルから画像のパスを見つける方法を知るのは大変です。
3. 画像は最適化されていないため、手動で最適化を行う必要があります。
4. すべての product のプレビューリストを作成するには、`context` に _全ての_ product の情報を渡す必要があります。`context` は、product の数が増えるにつれて扱いにくくなります。
5. ページをレンダリングするテンプレートのどの部分からデータが来ているかがあまり明らかではないため、データを更新すると後で混乱を招く可能性があります。

これらの欠点を克服するために、Gatsby はデータ管理層として GraphQL を使用しています。

## GraphQL を使用してページを作成する

GraphQL にデータを取り込むには、少し前もってセットアップする必要がありますが、その利益はコストをはるかに上回ります。

`data/products.json` を例に考えてみましょう。GraphQL を使用することにより、前のセクションで述べた全ての欠点を解決できます。

1. 画像は `data/images/` にある product と同じ場所に配置できます。
2. `data/products.json` 中に記述される画像のパスを、その JSON ファイルを起点とする相対パスにできます。
3. Gatsby は、画像読み込みの高速化と UX の向上のために、画像を自動的に最適化できます。
4. ページを作成するときに、すべての product データを `context` に渡す必要がなくなりました。
5. データは使用されているコンポーネント内で GraphQL を用いて読み込まれるため、私たちはそのデータの取得元と変更方法をとても簡単に確認できます。

### GraphQL にデータを読み込むために必要なプラグインを追加する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-make-data-queryable-in-graphql-with-gatsby"
  lessonTitle="Make Data Queryable in GraphQL With Gatsby"
/>

product データと画像を GraphQL に読み込むには、以下の [Gatsby プラグイン](/plugins/) を追加し、いくつかの手順を踏む必要があります。

- JSON ファイルを Gatsby の内部データストアに読み込みます。このデータストアでは、GraphQL を使用してクエリーを実行できます。（[`gatsby-source-filesystem`](/packages/gatsby-source-filesystem/)）
- GraphQL を使用してクエリーを実行できるように、JSON ファイルのフォーマットを変換します。（[`gatsby-transformer-json`](/packages/gatsby-transformer-json/)）
- 画像を最適化します。（[`gatsby-plugin-sharp`](/packages/gatsby-plugin-sharp/)）
- 最適化された画像に関するデータを Gatsby のデータストアに追加します。（[`gatsby-transformer-sharp`](/packages/gatsby-transformer-sharp/)）

以上のプラグインに加えて、[`gatsby-image`](/packages/gatsby-image/) を使用し、最適化された画像を遅延読み込みで表示します。

次のコマンドラインを使用し、これらのパッケージをインストールします。

```shell
npm install --save gatsby-source-filesystem gatsby-transformer-json gatsby-plugin-sharp gatsby-transformer-sharp gatsby-image
```

次に、これらを `gatsby-config.js` に追加します。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./data/",
      },
    },
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
  ],
}
```

これが機能したことを確認するために、GraphQL Playground で次のコマンドを実行してみましょう。

```shell
GATSBY_GRAPHQL_IDE=playground gatsby develop
```

> **ヒント:** このコマンドのうち、 `GATSBY_GRAPHQL_IDE=playground` 部分はオプションです。 このオプションを追加すると、GraphQL を探索するための古いインターフェースである GraphiQL の代わりに GraphQL Playground を有効にできます。

右側の [ドキュメント] タブを使えば、利用可能なデータスキーマを確認できます。

利用可能なオプションの 1 つは `allProductsJson` で、これにはいくつかのノードを持つエッジが含まれます。

JSON ファイル変換プラグインは product ごとに 1 つのノードを作成します。ノード内ではその product に必要なデータを選択できます。

各 product のスラッグを選択するクエリーは以下のように記述できます。

```graphql
{
  allProductsJson {
    edges {
      node {
        slug
      }
    }
  }
}
```

GraphQL Playground の左側のパネルにこのクエリーを入力して上部中央の実行ボタンを押し、テストしてみましょう。

次のような実行結果がクエリーとドキュメントの間のパネルに表示されるはずです。

![GraphQL Playground](./images/why-gql-playground.png)

### GraphQL でページを生成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-create-pages-in-gatsby-using-graphql"
  lessonTitle="Create Pages in Gatsby Using GraphQL"
/>

`gatsby-node.js` では、先ほど書いた GraphQL クエリーを 使用してページを生成できます。

```js:title=gatsby-node.js
exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const results = await graphql(`
    {
      allProductsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  results.data.allProductsJson.edges.forEach(edge => {
    const product = edge.node

    createPage({
      path: `/gql/${product.slug}/`,
      component: require.resolve("./src/templates/product-graphql.js"),
      context: {
        slug: product.slug,
      },
    })
  })
}
```

このクエリを実行するには、[`createPages` Node API](/docs/node-apis/#createPages) で利用できる `graphql` ヘルパーを使用する必要があります。続行する前にクエリーの結果が返されることを確認するには、[`async`/`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) を使用してください。

返される結果は `data/products.json` の内容にとても似ているため、その結果をループ処理して各ページを作成できます。

ただし、`context` には `slug` のみを渡すことに 気をつけてください。この `slug` をテンプレートコンポーネントで使用すれば、より多くの product データを読み込むことができます。

今まで見てきたように、引数 `context` は、 プロパティ `pageContext` のテンプレートコンポーネントで使用できるようになります。また、クエリーをより強力にするため、Gatsby は `context` のすべての 情報を GraphQL の変数として使用できるようにしています。つまり、「product と `context` に渡されたスラッグを一緒に読み込んで！」というクエリーを書くことができるのです。

実際のクエリーは次のようになります。

```jsx:title=src/templates/product-graphql.js
import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

export const query = graphql`
  query($slug: String!) {
    productsJson(slug: { eq: $slug }) {
      title
      description
      price
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const Product = ({ data }) => {
  const product = data.productsJson

  return (
    <div>
      <h1>{product.title}</h1>
      <Image
        fluid={product.image.childImageSharp.fluid}
        alt={product.title}
        style={{ float: "left", marginRight: "1rem", width: 150 }}
      />
      <p>{product.price}</p>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  )
}

export default Product
```

このファイルに関して、以下のことに気をつけてください。

1. クエリーの結果は、`data` プロパティとしてテンプレートコンポーネントに追加されます。
2. 画像パスは、Sharp トランスフォーマーによって、最適化された画像を含む「子ノード」に自動的に変換されました。
3. [GraphQL フラグメント](/packages/gatsby-image/#fragments) を使用して、最適化された画像を作成するために必要なすべてのデータを指定したクエリーを作成します。なお、GraphQL Playground では GraphQL フラグメントは動作しません。
4. `img` タグは、`Image` という名前の `gatsby-image` コンポーネントと交換されました。 `src` 属性の代わりに、最適化された画像データを持つオブジェクトを受け入れます。

このファイルを保存し、`gatsby develop` コマンドを実行して、`localhost:8000/gql/purple-hat/` を開いてみましょう。

![紫色の帽子をかぶった猫の遅延読み込み画像](./images/why-gql-images.gif)

これで画像は最適化され、遅延読み込みされました。

初期設定後、GraphQL を使用したデータの読み込みは、JSON ファイルからの直接読み込みとかなり似ています。しかし、画像を自動的に最適化し、使用される場所と同じ場所にデータを読み込めるなど、さらなる利点があります。

GraphQL は確かに必須ではありません。しかし、GraphQL を使用することの利益は大きいです。 GraphQL は、ページの構築と最適化のプロセスを簡素化するため、Gatsby アプリケーションの構築と作成のベストプラクティスと言えるでしょう。
