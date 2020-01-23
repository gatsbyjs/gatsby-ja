---
title: "Recipes: Querying Data"
---

Gatsby から GraphQL のインターフェースで様々なデータソースにアクセスできます。

## Page Query を使ってデータの参照

`graphql` タグを使って Gatsby サイトのページの中でデータを参照できます。これを使うことで、サイトメタデータ、ソースプラグイン、画像など Gatsby のデータレイヤーにアクセスできます。

### 使い方

1. `gatsby` から `graphql` をインポート。

2. 定数の `query` をエクスポートして、`graphql` テンプレートのクエリをふたつのバックティック（`)の中の値にセットします。

3. `data` をコンポーネントの prop として渡します。

4. この `data` 変数の中に参照されたデータが入り、 JSX の中から参照でき HTML で出力されます。

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

### 追加リソース

- [GraphQL と Gatsby](/docs/graphql/): 期待されたデータの形を理解
- [GraphQL でページ内のデータ参照についてさらに](/docs/page-query/)
- [MDN で Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) GraphQL で使われるものと同様

## StaticQuery コンポーネントを使ってのデータの参照

`StaticQuery` はヘッダー、ナビゲーション、その他の子コンポーネントなどの [ページでないコンポーネント](/docs/static-query/) Gatsby のデータレイヤーからデータを取得できるコンポーネントです。

### 使い方

1. `StaticQuery` コンポーネントには `query` と `render` というつの render props が必要です。

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

2. このコンポーネントを JSX コンポーネントや　 HTML 　マークアップの入ったより大きなページにインポートして [他のどの様なコンポーネント](/docs/building-with-components#non-page-components) のようにも使うことができます。

## useStaticQuery フックを使ってデータ参照

Gatsby v2.1.0 から `useStaticQuery` hook を使ってコンポーネントの代わりに Javascript の関数を使ってデータの参照ができます。この文法を使うことで `<StaticQuery>` コンポーネントで全てを包む必要が無くなるのでさらにシンプルに書けると思う人もいます。

この `useStaticQuery` hook は GraphQL クエリを使い、リクエストされたデータを返します。これは変数に保存され、後で JSX のテンプレート内で使うことができます。

### 前提条件

- React and ReactDOM 16.8.0 以降のバーション（最新版の Gatsby を使えばこれは自動的に行われます）
- おすすめの記事： [React Hooks のルール](https://reactjs.org/docs/hooks-rules.html)

### 使い方

1. `gatsby` から `useStaticQuery` と `graphql` をインポートして hook を使ってデータを参照できるようにします。

2. ステートレスの関数コンポーネントをはじめる際には、`useStaticQuery` の値に `graphql` のクエリを引数として渡します。

3. コンポーネントから返ってくる JSX コードで、返ってくるデータを処理する際に先程の変数が参照できます。

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
      NonPageComponent からタイトルを参照: {data.site.siteMetadata.title}{" "}
      //highlight-line
    </h1>
  )
}

export default NonPageComponent
```

### 追加リソース

- [コンポーネント内のデータを参照するための静的クエリ](/docs/static-query/)
- [静的クエリとページクエリの違い](/docs/static-query/#how-staticquery-differs-from-page-query)
- [useStaticQuery hook の詳細](/docs/use-static-query/)
- [GraphiQL でデータを視覚化する](/docs/introducing-graphiql/)

## GraphQL でのデータの制限

GraphQL でデータを参照する場合は、番号を指定して返すデータの制限を行い、一部のデータだけ取りだす際や[データのページ付け](/docs/adding-pagination/) でこの機能を使うことができます。

データ制限を行うには、 GraphQL のデータレイヤーにいくつかのノードを持っている GraphQL サイトが必要です。全てのサイトには `allSitePage` や `sitePage` などのノードが自動的に作成されます。`gatsby-config.js` の `gatsby-source-filesystem` などのソースプラグインをインストールすることで追加できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start/)

### 使い方

1. `gatsby develop` を実行して、開発サーバーを起動します。
2. Open a tab in your browser at: `http://localhost:8000/___graphql` をブラウザーのタブ内で開きます。
3. エディターで `allSitePage` 内の項目にあるクエリを追加して始めます：

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

4. allSitePage`の項目の`limit`の引数に`3` などの整数を入れます。

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

5. GraphiQL の再生ボタンを押して、`edges` 項目内のデータが指定された数字でデータが制限されます。

### 追加リソース

- [Gatsby の GraphQL データ API のノード](/docs/node-interface/) について学ぶ
- [Gatsby GraphQL の制限に関するリファレンス](/docs/graphql-reference/#limit)
- 動いている例：

<iframe
  title="Limiting returned data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allSitePage(limit%3A%203)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL のソート

結果のソートの順番は GraphQL の `sort` 引数で指定できます。どの項目をどの順番でソートするかを指定できます。

このレシピでは GraphQL のデータレイヤーに複数のノードが付いている Gatsby サイトが必要です。どのサイトにも `allSitePage` の様なノードが自動的に作られています。ソースプラグインをインストールすることで、追加できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start)
- `all` が先についた参照できる項目、例 `allSitePage`

### 使い方

1. `gatsby develop` を実行して、開発サーバーを起動します。
2. `http://localhost:8000/___graphql` から GraphiQL エクスプローラーで開きます。
3. エディターを使って `allSitePage` の中に参照する項目を追加します。

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

4. `sort` 引数を `allSitePage` の項目に追加して、`fields` や `order` 属性にオブジェクトを指定します。`fields` への値はソートしたの項目か項目の配列を指定します。（この例では `path` フィールドが使われています）`order` は `ASC` か `DESC` を指定して昇り順か降り順を指定します。

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

5. GraphiQL の再生ボタンを押して `path` の項目に指定されている昇り順でデータが返されます。

### 追加リソース

- [Gatsby GraphQL ソートのリファレンス](/docs/graphql-reference/#sort)
- [Gatsby の GraphQL data API のノード](/docs/node-interface/) について学ぶ
- 動いている例：

<iframe
  title="Sorting data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allSitePage(sort%3A%20%7Bfields%3A%20path%2C%20order%3A%20ASC%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL でのフィルター

参照された結果には `eq`（イコール）, `ne`（イコールでは無い）, `in` や `regex` などのオペレーターでフィルターをかける事ができます。

このレシピではフィルターをかける GraphQL のデータレイヤーに複数のノードが付いている Gatsby サイトが必要です。どのサイトにも `allSitePage` の様なノードが自動的に作られています。`gatsby-config.js` の `gatsby-source-filesystem` や `gatsby-transformer-remark` から `allMarkdownRemark` を作ってソースやトランスフォーマープラグインをインストールすることで、追加できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start)
- `all` が先についた参照できるフィールド、例 `allSitePage` や `allMarkdownRemark`

### 使い方

1. `gatsby develop` を実行して開発サーバーを起動します。
2. `http://localhost:8000/___graphql` から GraphiQL エクスプローラーをブラウザーで開きます。
3. `all` が先に付いたフィールドをクエリに追加します、例 `allMarkdownRemark`（全てのノードを返します）

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

4. `filter` 引数を `allMarkdownRemark` フィールドに追加して、フィルターをかけたいフィールドのオブジェクトを指定します。この例では Markdown のコンテンツがフォーマッタメタデータの `categories` の属性でフィルターされます。次の値はオペレーターです。この例では `eq`, イコールが 'magical creatures' の値で指定されています。

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

5. GraphiQL の再生ボタンを押します。パラメーターにあったデータが返されます。この例では Markdown ファイルで 'magical creatures' をカテゴリーにもったものだけです。

### 追加リソース

- [Gatsby GraphQL フィルターリファレンス](/docs/graphql-reference/#filter)
- [オペレーターの完全リスト](/docs/graphql-reference/#complete-list-of-possible-operators)
- [Gatsby の GraphQL data API](/docs/node-interface/) について学ぶ
- 動いている例：

<iframe
  title="Filtering data"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20allMarkdownRemark(filter%3A%20%7Bfrontmatter%3A%20%7Bcategories%3A%20%7Beq%3A%20%22magical%20creatures%22%7D%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20categories%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL クエリエイリアス

GraphQL クエリをエイリアスで名前を変えることができます。

同じデータソースにふたつのクエリを実行したい場合は同じ名前の衝突を防ぐためにエイリアスを使うことができます。

### 使い方

1. `gatsby develop` を実行して開発サーバーを起動します。
2. `http://localhost:8000/___graphql` から GraphiQL エクスプローラーをブラウザーで開きます。
3. エディターで `allFile` の様な名前を付けてクエリを追加します。

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

4. GraphQL スキーマのフィールドで使いたい名前を追加します。(例 `[alias-name]: [original-name]`)

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

5. GraphiQL ページの再生ボタンを押してふたつのエイリアスの名前で指定したオブジェクトが出力されます。

### 追加リソース

- [Gatsby GraphQL のエイリアスのリファレンス](/docs/graphql-reference/#aliasing)
- 動いている例：

<iframe
  title="Using aliases"
  src="https://711808k40x.sse.codesandbox.io/___graphql?query=%7B%0A%20%20fileCount%3A%20allFile%20%7B%20%0A%20%20%20%20totalCount%0A%20%20%7D%0A%20%20filePageInfo%3A%20allFile%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20currentPage%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&explorerIsOpen=false"
  width="600"
  height="300"
/>

## GraphQL クエリのフラグメント

GraphQL フラグメントは再利用できる共有可能なクエリの固まりです。

クエリ間で複数のフィールドを共有したり、複数コンポーネントでデータを使う場合に使えます。

### 使い方

1. フラグメントの入った `graphql` テンプレートストリングを宣言します。フラグメントには `fragment` キーワード、名前、 GraphQL タイプ（ここでは `on Site` にあるような `Site` タイプ`）、フラグメントを構成するフィールドが必要にです。

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

2. フラグメントで指定されたタイプにあるフィールドの入ったフラグメントをクエリに含めます。ひとつひとつ宣言しなくてもいいフィールドも含めます。

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

**注意**: フラグメントは Gatsby にインポートされる必要はありません。クエリをフラグメントと一緒にエクスポートすることでプロジェクト内の _全ての_ クエリでフラグメントが使えるようになります。

フラグメントは他のフラグメント内にネストでき、同じクエリ内で複数のフラグメントを使うことができます。

### 追加リソース

- [フラグメントのシンプルな例の入ったレポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-fragments)
- [Gatsby GraphQL フラグメントリファレンス](/docs/graphql-reference/#fragments)
- [Gatsby 画像リファレンス](/docs/gatsby-image/#image-query-fragments)
- [複数存在するデータの例の入ったレポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/gatsbygram)

## `fetch` を使ってクライアントサイドでのデータの参照

データはビルドに参照される必要はなく静的である事ができます。普通の React アプリのようにデータを実行時に参照できます。

### 前提条件

- [Gatsby サイト](/docs/quick-start/)
- `index.js` などのページコンポーネント

### 使い方

1. `src/pages` ページやレイアウトコンポーネントなど React コンポーネントが定義されたファイル内で React hook の `useState` と `useEffect` をインポートします。

```jsx:title=src/pages/index.js
import React, { useState, useEffect } from "react"
```

2. コンポーネントの中で `useEffect` hook からデータを取得するため関数で囲み、ブラウザークライアント内でコンポーネントがマウント時に非同期でデータを取得します。その後 `fetch` API の `await` で結果を取得し、`useState` hook のセット関数を呼び (ここでは `setStarsCount`) ステートの変数 (`starsCount`) を `fetch` で返ってくるデータに保存します。

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

### 追加リソース

- [クライアントデータの取得](/docs/data-fetching/) のガイド
- この例の [動いている例](https://gatsby-data-fetching.netlify.com/)
