---
title: "レシピ: データのクエリ"
tableOfContentsDepth: 1
---

Gatsby では GraphQL インターフェイスを用いてあらゆるソースのデータにアクセスできます。

## ページクエリを用いたデータクエリ

`graphql` タグを用いることにより Gatsby サイトのページにてデータをクエリできます。これによりサイトメタデータやソースプラグイン、画像などの Gatsby のデータレイヤーに含まれるあらゆるデータへアクセスが可能です。

### 使い方

1. `gatsby` から `graphql` をインポートする。

2. 2 つのバッククオート間にクエリが記載された `graphql` テンプレートを値に持つ名前付き定数 `query` をエクスポートする。

3. コンポーネントの引数に `data` を渡す。

4. `data` 変数はクエリ後のデータを保持しており、そのデータを JSX にて参照して HTML を出力できます。

```jsx:title=src/pages/index.js
import React from "react"
// highlight-next-line
import { graphql } from "gatsby"

import Layout from "../components/layout"

// highlight-start
export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
// highlight-end

// highlight-next-line
const IndexPage = ({ data }) => (
  <Layout>
    // highlight-next-line
    <h1>{data.site.siteMetadata.title}</h1>
  </Layout>
)

export default IndexPage
```

### 追加資料

- [GraphQL と Gatsby](/docs/graphql/): データの予想される形を理解する
- [GraphQL によるページ内データクエリの理解を深める](/docs/page-query/)
- [GraphQL で使用されているようなタグ付きテンプレートリテラルに関する MDN 上のドキュメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 

## StaticQuery コンポーネントを用いたデータクエリ

`StaticQuery` はヘッダーやナビゲーション、その他の子コンポーネントといった[非ページコンポーネント](/docs/static-query/)内にて Gatsby のデータレイヤーからデータを取りだすためのコンポーネントです。

### 使い方

1. `StaticQuery`コンポーネントは `query` and `render` の 2 つのレンダープロップが必要です。

```jsx:title=src/components/NonPageComponent.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"

const NonPageComponent = () => (
  <StaticQuery
    query={graphql` // highlight-line
      query NonPageQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(
      data // highlight-line
    ) => (
      <h1>
        Querying title from NonPageComponent with StaticQuery:
        {data.site.siteMetadata.title}
      </h1>
    )}
  />
)

export default NonPageComponent
```

2. JSX コンポーネントと HTML マークアップのより大きなページにインポートすることで、[他のコンポーネント](/docs/building-with-components#non-page-components)同様にこのコンポーネントを使えます。

## useStaticQuery フックを用いたデータクエリ

Gatsby v2.1.0 以降では、コンポーネントの代わりに `useStaticQuery` フックを使って Javascript 関数を用いたデータクエリが可能です。この構文により `<StaticQuery>` で全てをラップする必要がなくなり、よりシンプルにコードを書けます。

`useStaticQuery`フックは GraphQL クエリを受け取り、リクエストされたデータを返します。返却されたデータは変数に格納され、JSX テンプレート内で利用できます。

### 前提条件

- React と ReactDOM 16.8.0 以降が必要です（Gatsby を更新しておけば対応できます）
- おすすめの記事： [React フックのルール](https://reactjs.org/docs/hooks-rules.html)

### 使い方

1. データをクエリするフックを使うために、`useStaticQuery` と `gatsby` から `graphql` をインポートする。

2. ステートレス関数コンポーネントの始めにて、`graphql` クエリを引数に渡した `useStaticQuery` の値に変数を用意します。

3. コンポーネントの返り値である JSX コード内では、その変数を参照してフックで得たデータを処理できます。

```jsx:title=src/components/NonPageComponent.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby" //highlight-line

const NonPageComponent = () => {
  // highlight-start
  const data = useStaticQuery(graphql`
    query NonPageQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  // highlight-end
  return (
    <h1>
      Querying title from NonPageComponent: {data.site.siteMetadata.title}{" "}
      //highlight-line
    </h1>
  )
}

export default NonPageComponent
```

### 追加資料

- [コンポーネント内での Static Query によるデータクエリの理解を深める](/docs/static-query/)
- [静的クエリとページクエリの違い](/docs/static-query/#how-staticquery-differs-from-page-query)
- [useStaticQuery フックの理解を深める](/docs/use-static-query/)
- [GraphiQL を用いてデータを可視化する](/docs/introducing-graphiql/)

## GraphQL を使った制限

GraphQL を用いてデータをクエリする際、返却されるデータ数を特定の数で制限できます。データの一部のみや[ページネーションデータ](/docs/adding-pagination/)が必要なケースでは有用です。

データ数を制限するには、GraphQL データレイヤーにていくつかのノードを持つ Gatsby サイトが必要になります。全てのサイトは自動的に生成される `allSitePage` や `sitePage` 等（`gatsby-config.js`にて `gatsby-source-filesystem` のようなソースプラグインをインストールすればより多く）のノードを持っています。

### 前提条件

- [Gatsby サイト](/docs/quick-start/)

### 使い方

1. `gatsby develop` コマンドで開発用サーバーを立ち上げます。
2. ブラウザー上で `http://localhost:8000/___graphql` にアクセスします。
3. 最初に、エディターを使って `allSitePage` に次のフィールドを持つクエリを追加します。

```graphql
{
  allSitePage {
    edges {
      node {
        id
        path
      }
    }
  }
}
```

4. `allSitePage` フィールドに引数 `limit` を追加して、整数値 `3` を渡します。

```graphql
{
  allSitePage(limit: 3) { // highlight-line
    edges {
      node {
        id
        path
      }
    }
  }
}
```

5. GraphQL ページのスタートボタンをクリックすると、`edges` フィールド内のデータ数が指定した数に制限されていることがわかります。

### 追加資料

- [Gatsby データ API におけるノード](/docs/node-interface/) を学習する
- [制限に関する Gatsby GraphQL リファレンス](/docs/graphql-reference/#limit)
- デモ例：

<iframe
  title="Limiting returned data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allSitePage(limit%3A%203)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL を使ったソート

結果の順序は GraphQL の `sort` 引数で指定できます。どのフィールドでソートするかやソートする順番を指定することもできます。

このレシピでは GraphQL データレイヤーにてソートするためのノードのコレクションを持つサイトが必要です。全てのサイトは自動的に生成された `allSitePage` のようなノードを持っています。なお、ソースプラグインをインストールすることでより多くのノードを追加できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start)
- `allSitePage` のようにプレフィックスが `all` であるクエリ可能なフィールド

### 使い方

1. `gatsby develop` コマンドにて開発用サーバーを立ち上げます。
2. ブラウザーにて `http://localhost:8000/___graphql` にアクセスします。
3. 最初に、エディターを使って `allSitePage` に次のフィールドを持つクエリを追加します。

```graphql
{
  allSitePage {
    edges {
      node {
        id
        path
      }
    }
  }
}
```

4. `allSitePage` フィールドに引数 `sort` を追加して、`fields` と `order` 属性を持つオブジェクトを渡します。`fields` の値にはソート対象のフィールドかフィールドの配列（この例では `path` フィールドを指定しています）を、`order` の値には昇順 `ASC` もしくは降順 `DESC` を指定できます。

```graphql
{
  allSitePage(sort: {fields: path, order: ASC}) { // highlight-line
    edges {
      node {
        id
        path
      }
    }
  }
}

```

5. GraphQL ページのスタートボタンをクリックすると、データが `path` フィールドの昇順でソートされていることが分かります。

### 追加資料

- [ソートに関する Gatsby GraphQL リファレンス](/docs/graphql-reference/#sort)
- [Gatsby の GraphQL データ API におけるノード](/docs/node-interface/)を学習する
- デモ例：

<iframe
  title="Sorting data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allSitePage(sort%3A%20%7Bfields%3A%20path%2C%20order%3A%20ASC%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL を使ったフィルタリング

クエリ結果は指定したフィールドにて `eq`（等号）や `ne`（不等号）、`in`、`regex` などの演算子を用いてフィルタリングができます。

このレシピでは GraphQL データレイヤーにてフィルタリングするためのノードのコレクションを持つサイトが必要です。全てのサイトは自動的に生成された `allSitePage` のようなノードを持っています。なお、`gatsby-source-filesystem`や `allMarkdownRemark` を追加するための `gatsby-config.js` における `gatsby-transformer-remark` といったソースプラグインをインストールすることでより多くのノードを追加できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start)
- `allSitePage` や `allMarkdownRemark` などのプレフィックスが `all` であるクエリ可能なフィールド

### 使い方

1. `gatsby develop` コマンドにて開発用サーバーを立ち上げます。
2. ブラウザーにて `http://localhost:8000/___graphql` にアクセスします。
3. `allMarkdownRemark` のようなプレフィックスが'all'であるフィールド（ノードの一覧を返却するフィールド）に、エディターを使ってクエリを追加します。

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          categories
        }
      }
    }
  }
}
```

4. `allMarkdownRemark` フィールドに引数 `filter` を追加し、フィルタリングしたいフィールドを有するオブジェクトを渡します。この例では、Markdown コンテンツが frontmatter メタデータの `categories` 属性でフィルタリングされます。その次の値は演算子です。例では、値が'magical creatures'と `eq`（等号）を意味します。

```graphql
{
  allMarkdownRemark(filter: {frontmatter: {categories: {eq: "magical creatures"}}}) { // highlight-line
    edges {
      node {
        frontmatter {
          title
          categories
        }
      }
    }
  }
}
```

5. GraphQL ページのスタートボタンをクリックします。すると、フィルターパラメーターと一致するデータが返ってきます。今回の例ではカテゴリーが 'magical creatures' でタグ付けされた Markdown ファイルのみ返ってきます。

### 追加資料

- [フィルタリングに関する Gatsby GraphQL リファレンス](/docs/graphql-reference/#filter)
- [使用可能な演算子の全リスト](/docs/graphql-reference/#complete-list-of-possible-operators)
- [Gatsby の GraphQL データ API におけるノード](/docs/node-interface/)を学習する
- デモ例：

<iframe
  title="Filtering data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allMarkdownRemark(filter%3A%20%7Bfrontmatter%3A%20%7Bcategories%3A%20%7Beq%3A%20%22magical%20creatures%22%7D%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20categories%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL クエリのエイリアス

エイリアスを利用して GraphQL クエリのフィールドの名前を変更できます。

同じデータソースから 2 種類のクエリを実行したい場合、2 つのクエリ名が同じによる名前の衝突を避けるためにエイリアスを利用できます。

### 使い方

1. `gatsby develop` コマンドにて開発用サーバーを立ち上げます。
2. ブラウザーにて `http://localhost:8000/___graphql` にアクセスします。
3. `allFile` のような同じ名前の 2 つのフィールドを使ったクエリをエディターで追加します。

```graphql
{
  allFile {
    totalCount
  }
  allFile {
    pageInfo {
      currentPage
    }
  }
}
```

4. GraphQL スキーマのフィールド名の前に、区切り文字にコロンを利用して任意の名前を追記してください。（例： `[alias-name]: [original-name]`）

```graphql
{
  fileCount: allFile { // highlight-line
    totalCount
  }
  filePageInfo: allFile { // highlight-line
    pageInfo {
      currentPage
    }
  }
}
```

5. GraphQL ページのスタートボタンをクリックします。すると、命名したエイリアス名を持つ 2 つのオブジェクトが出力されます。

### 追加資料

- [エイリアスに関する Gatsby GraphQL リファレンス](/docs/graphql-reference/#aliasing)
- デモ例：

<iframe
  title="Using aliases"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20fileCount%3A%20allFile%20%7B%20%0A%20%20%20%20totalCount%0A%20%20%7D%0A%20%20filePageInfo%3A%20allFile%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20currentPage%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL クエリのフラグメント

GraphQL フラグメントは再利用可能なクエリの一部分を指します。

フラグメントを利用してクエリ間で複数のフィールドを共有したり、コンポーネントとそれが利用するデータを関連付けたりしたい場合に使えます。

### 使い方

1. フラグメントを含んだ `graphql` テンプレートを宣言します。フラグメントは `fragment` キーワードと名前、関連する GraphQL タイプ（`Site` タイプの場合は `on Site`）とフィールドで構成されます。

```jsx
export const query = graphql`
  // highlight-start
  fragment SiteInformation on Site {
    title
    description
  }
  // highlight-end
`
```

2. それではフラグメントにて指定された型のフィールドに対するクエリにフラグメントを利用しましょう。これによって全てのフィールドをそれぞれ宣言しなくても、それらのフィールドを含めることができます。

```diff
export const pageQuery = graphql`
  query SiteQuery {
    site {
-     title
-     description
+   ...SiteInformation
    }
  }
`
```

**注記**: フラグメントは Gatsby でインポートする必要がありません。フラグメントを利用したクエリをエクスポートすると、プロジェクト内の _all_ クエリでそのフラグメントを利用できるようになります。

フラグメントは他のフラグメントの中で入れ子にでき、1 つのクエリ内で複数のフラグメントを利用することも可能です。

### 追加資料

- [フラグメントを利用したシンプルな例のレポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-fragments)
- [フラグメントに関する Gatsby GraphQL リファレンス](/docs/graphql-reference/#fragments)
- [Gatsby image フラグメント](/docs/gatsby-image/#image-query-fragments)
- [コロケーションデータを用いた例のレポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/gatsbygram)

## `fetch` を用いたクライアントサイドでのデータクエリ

データはビルド時にクエリされて静的に保持される必要はありません。通常の React アプリでデータを取得するのと同様に、ランタイム時にデータをクエリできます。

### 前提条件

- [Gatsby サイト](/docs/quick-start/)
- `index.js` のようなページコンポーネント

### 使い方

1. `src/pages` やレイアウトコンポーネントのような React コンポーネントとして定義されたファイルにて、`useState` と `useEffect` の React フックをインポートします。

```jsx:title=src/pages/index.js
import React, { useState, useEffect } from "react"
```

2. ブラウザでコンポーネントのマウント時に非同期でデータを取得するよう、コンポーネント内のデータを取得する関数を `useEffect` フックでラップします。次に `fetch` API を利用して得る結果を `await` し、得られたデータを状態変数（`starsCount`）に保持するため、`useState` フックで定義した状態更新用の関数（この例では `setStarsCount`）を呼び出します。

```jsx:title=src/pages/index.js
import React, { useState, useEffect } from "react"

const IndexPage = () => {
  // highlight-start
  const [starsCount, setStarsCount] = useState(0)
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setStarsCount(resultData.stargazers_count)
      }) // set data for the number of stars
  }, [])
  // highlight-end

  return (
    <section>
      // highlight-start
      <p>Runtime Data: Star count for the Gatsby repo {starsCount}</p>
      // highlight-end
    </section>
  )
}

export default IndexPage
```

### 追加資料

- [クライアントデータフェッチ](/docs/data-fetching/)に関するガイド
- 今回の例を利用したデモサイト [サイト例](https://gatsby-data-fetching.netlify.com/)
