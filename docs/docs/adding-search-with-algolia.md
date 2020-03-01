---
title: Algolia を使用した検索機能の追加
---

あなたのサイトにコンテンツを追加したら、訪問者が探しているものを簡単に見つけられるようにする必要があります。このガイドでは、Gatsby サイトで [Algolia](https://www.algolia.com) を使用したカスタム検索エクスペリエンスをセットアップするプロセスを説明します。React Hooks に依存するファンクショナルコンポーネントを作成するため、このガイドに従うには [React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0) 以降のバージョンを使用する必要があります。

読み始める前に、以下の 2 点をご確認ください：

1. このガイド以外にも、Algolia の [React を使用した開始方法に関するドキュメント](https://www.algolia.com/doc/guides/building-search-ui/getting-started/react)で幅広い情報を確認してください
2. ドキュメントサイトに検索機能を追加する場合は、 [Docsearch](https://community.algolia.com/docsearch) 機能を使用して、以下で説明する手順のほとんどを Algolia に処理させることができます。他の種類のサイトや、インデックスを作成するデータをよりきめ細かく制御する場合は、続きをご覧ください。

## なぜ Algolia を使うのですか？

Algolia はページインデックス情報をホストするサイト検索ホスティングプラットフォームであり、あなたのサイト内のサイト検索機能の設置場所に検索結果を返します。Algolia に、所有しているページ、ページの場所、ページへの移動方法を伝えると、Algolia は、ページが使用する検索ワードに基づいて、検索結果をユーザーに返します。

あなたの Gatsby サイトに Algolia による検索機能を実装するには、プラグインのインストール、クエリの対象となる情報の指定、Algolia のクレデンシャルの提供、そして、その他のいくつかの構成手順を実行する必要があります。これは `gatsby build` 時にクエリが実行された後、Algolia はサイトのインデックス全体を利用可能にし、とても迅速にユーザーに対して結果を提供できることを意味します。Algolia を使用する利点について詳しく知るには、[最近サイト検索を Algolia に切り替えた Netlify のブログ記事をご覧ください](https://www.netlify.com/blog/2017/10/10/replacing-our-search-with-algolia/)。

## Algolia プラグインの構成

まず、 [`gatsby-plugin-algolia`](https://github.com/algolia/gatsby-plugin-algolia) と [`react-instantsearch-dom`](https://github.com/algolia/react-instantsearch) をあなたのプロジェクトに追加する必要があります。`react-instantsearch` は多くの作業を節約するためにインポートできる既製の React コンポーネントを含む Algolia のライブラリーです。また、デフォルトで Gatsby に同梱される `dotenv` を使用します。これは、Algolia のアプリ ID と検索 API キーおよび管理 API のキーの両方をバージョン管理システムへコミットすることなく指定するために必要となります。

```shell
npm install --save gatsby-plugin-algolia react-instantsearch-dom algoliasearch dotenv
```

このガイドでは検索 UI をデザインするため、 `styled-components` を使用しますが、あなたの好みの CSS ソリューションも使用できます。同様に `styled-components` の使用を開始したい場合は、インストールする必要があります。

```shell
npm install --save styled-components gatsby-plugin-styled-components
```

次に、 `gatsby-plugin-algolia` と `gatsby-plugin-styled-components` をあなたの `gatsby-config.js` に追加します。

```js:title=gatsby-config.js
const queries = require("./src/utils/algolia")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gatsby+Algolia`,
    description: `How to setup Algolia search in Gatsby`,
    author: `<your name>`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // デフォルト: 1000
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
```

`./src/utils/algolia.js` ファイルから `queries` をロードし（もちろん、好きな場所に配置できます）、Algolia ID と API キーを `.env` からロードしているので、それらのファイルを追加します。

このためには、[あなたの Algolia のプロフィールページの「API キー」セクション](https://www.algolia.com/api-keys)に移動する必要があります。あなたがすでにアカウントをお持ちの場合は、ここで API キーを取得できます。そうでない場合は、サインアップしてからこのリンクに移動する必要があります。スクリーンショットのような表示になります。黒塗りされた箇所に実際の番号が表示されます：

![Algolia の API キーのスクリーンショット](./images/algolia-api-keys.png)

あなたの App ID、Search-Only API Key、および Admin API Key を取得したら、次のコードを `.env`ファイルに配置し、プレースホルダーキーをあなたのキーに置き換えます。

```text:title=.env
GATSBY_ALGOLIA_APP_ID=KA4OJA9KAS
GATSBY_ALGOLIA_SEARCH_KEY=lkjas987ef923ohli9asj213k12n59ad
ALGOLIA_ADMIN_KEY=lksa09sadkj1230asd09dfvj12309ajl
```

上記のコードスニペットのプレースホルダーキーはランダムな文字列ですが、Algolia のプロフィールページからコピーするキーは、プレースホルダーキーと同じ長さでなければなりません。API キーを照会する方法を採用する利点の 1 つは、それらがすべてサーバー上の 1 つのファイルに格納され、クライアント側に公開されないため、セキュリティーが向上することです。

.env ファイルには実際の秘密鍵が含まれているため、実際の `.env` ファイルをコミットすることはセキュリティー上のリスクと見なされます。誰かがリポジトリをフォークした場合に、秘密鍵をコミットすることなく、どの環境変数を提供する必要があるかを知らせるため、 `.env.example` を git または他のバージョン管理システムにコミットすることをおすすめします。

```text:title=.env.example
# このファイルの名前を .env に変更し、以下に列挙されている値を指定します。
# また、ビルドツールで使用できることを確認してください（例： Netlify）
# 警告： GATSBY_ で始まる変数は、クライアント側のコードで利用可能になります
# 機密データを公開しないように注意してください（この場合は Algolia 管理キー）

GATSBY_ALGOLIA_APP_ID=insertValue
GATSBY_ALGOLIA_SEARCH_KEY=insertValue
ALGOLIA_ADMIN_KEY=insertValue
```

`queries` は `src/utils/algolia.js` からエクスポートされる、必須の GraphQL クエリと、任意のインデックス名、 トランスフォーマー関数、設定オブジェクトを含むオブジェクトの配列によって、Gatsby の GraphQL レイヤーから Algolia に直接インデックスしてほしいデータを取得できるようにします。

```js:title=src/utils/algolia.js
const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/pages/" },
      frontmatter: {purpose: {eq: "page"}}
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          slug
          date(formatString: "MMM D, YYYY")
          tags
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries
```

最初は少し怖いかもしれませんが、基本的には `gatsby-plugin-algolia` に、サーバーにインデックスを設定するためのデータ取得方法を知らせるだけです。上記の例では、ページとブログ投稿のインデックスを分けるためにデータを渡す個別のクエリを使用しています。

トランスフォーマーはクエリで返されたデータを変更して、検索可能な形式へ変換できるようにします。ここで行っていることは、投稿とページを「フラット化」して frontmatter フィールド（`author` 、 `date` 、 `tags` など）の「ネスト解除」をすることだけですが、必要に応じてトランスフォーマーはずっと多くのことができます。これにより、データのインデックス作成プロセス全体が非常に柔軟で強力になります。たとえば、クエリの結果のフィルタリング、フィールドの書式設定、追加またはマージなどに使用できます。

ここまで来たら、「バックエンド」は完了です。これで、 `gatsby build` を実行して、Algolia の Web インターフェースのインデックスがあなたのデータであふれているのを確認できるはずです。

## サイトへの検索インターフェースの追加

次に、あなたのサイトのユーザー向けの検索インターフェイスを構築します。ユーザーが検索文字列を入力し、その文字列を Algolia に送信し、インデックスから一致する結果（Algolia では _hits_ と呼びます）を受信し、最終的にそれらをユーザーに表示する方法が必要です。

あなたのサイト上でユーザーが検索できるようにする任意の場所から呼びだす React の `Search` コンポーネントにあなたが必要なものをすべて集めます。デザインはサイトごとに大きく異なりますが、このガイドではユーザーがクリックすると検索フィールドがスライドアウトするように CSS トランジションを機能させるため、 [`styled-components`](https://styled-components.com) でスタイルを実装していることと、Algolia が一致箇所を返すと表示される結果ペインの表示に少し時間がかかることに注意してください。

`Search` コンポーネントは以下のファイルで構成されています：

- **`index.js`**: メインのコンポーネント
- **`input.js`**: テキスト入力フィールド
- **`hitComps.js`**: 一致する投稿/ページをレンダリングするコンポーネント
- **`styles.js`**: スタイル付きコンポーネント

これらのファイルでは非常に多くのことが起きているので、ファイルを 1 つずつ分割します。

### `index.js`

```jsx:title=src/components/search/index.js
import React, { useState, useEffect, createRef } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import { Root, HitsWrapper, PoweredBy } from "./styles"
import Input from "./Input"
import * as hitComps from "./hitComps"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>
            <Results>
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
```

上部で、`InstantSearch` を [`react-instantsearch-dom`](https://community.algolia.com/react-instantsearch) からインポートします。これは、検索エクスペリエンス全体が Algolia のサービスへ接続できるようにするルートコンポーネントです。名前が示唆するように、`Index` はあなたが個々のインデックスを利用できるようにし、`Hits` はユーザーの検索入力に対して返されるデータを提供します。最後に、[`connectStateResults`](https://community.algolia.com/react-instantsearch/connectors/connectStateResults.html) はカスタム React コンポーネントをラップし、クエリ、結果の数、取得にかかった時間など、現在の検索状態に関する高レベルの統計情報を提供します。

次に、UI を構成するスタイル付きコンポーネントと、ユーザーがクエリを入力する `Input` コンポーネントをインポートします。

```jsx:title=src/components/search/index.js
import { Root, SearchBox, HitsWrapper, PoweredBy } from "./styles"
import Input from "./Input"
```

`PoweredBy` は、「Powered by Algolia」という文字列を小さなロゴとリンクと共にレンダリングします。 Algolia の寛大な無料利用枠を使用している場合は、検索結果の下でこのように表示するよう求められます。`react-instantsearch-dom` はこの目的のために、[`PoweredBy` コンポーネント](https://community.algolia.com/react-instantsearch/widgets/PoweredBy.html)も提供しますが、独自に構築することもできます。`index.js` について読み終えたら、これらのスタイル付きコンポーネントの説明に戻ります。

`Search` コンポーネントが機能するため、最後に必要なのは、あなたがユーザーに表示したいすべての種類の結果を表示するためのヒットコンポーネントです。ヒットコンポーネントは、一致する結果の属性（ブログ投稿の場合は作成者、日付、タグ、タイトルなど）をユーザーに表示する方法を決定します。

```jsx:title=src/components/search/index.js
import * as hitComps from "./hitComps"
```

次に、2 つの接続されたコンポーネントを定義します。`Results` は、ヒット数が正の数でない限り、つまり `searchResults.nbHits> 0` である場合、クエリに一致するものが見つからないことをユーザーに通知します。`Stats` は `searchResults.nbHits` を表示するだけです。

```jsx:title=src/components/search/index.js
const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for ${state.query}`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
```

さて、実際の `Search` コンポーネントが登場します。状態の初期化から始まり、ハンドラー関数とそれらをトリガーするイベントリスナーを定義します。ユーザーが検索アイコンをクリックすると検索入力がスライドアウトし、ユーザーがどこかをクリックまたはタッチ（モバイルの場合）すると再び非表示になります。

```jsx:title=src/components/search/index.js
export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  const handleClickOutside = event =>
    !ref.current.contains(event.target) && setFocus(false)

  useEffect(() => {
    [`mousedown`, `touchstart`].forEach(event =>
      document.addEventListener(event, handleClickOutside)
    )
    return () =>
      [`mousedown`, `touchstart`].forEach(event =>
        document.removeEventListener(event, handleClickOutside)
      )
  })
```

`Search` は、引数として渡される `indices` の動的配列をレンダリングする JSX を返します。配列の各要素は、あなたの Algolia アカウントの中でクエリ対象となるインデックスの名前、ユーザーに表示する結果の上に表示するタイトル、および一致箇所ごとに返されるデータをレンダリングするコンポーネント `hitComp` を指定するキー、それぞれ `name`、`title`、 `hitComp` を持つオブジェクトである必要があります。

```jsx:title=src/components/search/index.js
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>
            <Results>
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
```

この `indices` 配列を引数として渡すことで、サイトのさまざまな部分で同じ `Search` コンポーネントを再利用し、それぞれに異なるインデックスを照会させることができます。例として、ページや投稿の検索に使用されるヘッダーのプライマリー検索ボックスに加えて、サイトにウィキがあり、訪問者にウィキ記事のみを表示する 2 番目の検索ボックスを提供したい場合があります。

`.env` ファイルで指定し、`src/utils/algolia.js` で使用されているものと同じアプリケーション ID とバックエンドと接続する検索クライアントを生成するための検索専用 API キーを `algoliasearch` へ提供することに注意してください。_ここに Algolia 管理 API キーを貼り付けないでください！_ `algoliasearch` はインデックスを _read_ する必要があるだけです。ここに管理キーを貼り付けると、サイトがデプロイされた後、他人がそれを取得できるようになります。すると、Algolia のインデックスデータを改ざんされる可能性があります。

### `input.js`

```jsx:title=src/components/search/input.js
import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import { SearchIcon, Form, Input } from "./styles"

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
```

`Input` コンポーネントは、ユーザーが検索文字列を入力する場所です。単調な作業は Algolia の [`connectSearchBox`](https://community.algolia.com/react-instantsearch/connectors/connectSearchBox.html) 関数によって行われるため、かなり短いです。

次に、スタイル付きコンポーネント `SearchIcon`、`Form`、`Input`、および `index.js` にインポートされたスタイル付きコンポーネントを確認します。

### `styles.js`

```js:title=src/components/search/styles.js
import React from "react"
import styled, { css } from "styled-components"
import { Search } from "styled-icons/fa-solid/Search"
import { Algolia } from "styled-icons/fa-brands/Algolia"

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`

const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`

const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  {highlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: ${props => props.theme.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${props => props.theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`

export const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
```

もちろん、スタイルはサイトごとに異なるため、完全を期すため、および検索インターフェイスの動的な動作を実装するため、つまり、ユーザーが `SearchIcon`（拡大鏡）をクリックすると入力フィールドがスライドアウトし、検索結果を表示するペイン（`HitsWrapper`）を Algolia のサーバーが一致箇所を返した後にのみ表示するため、これらのコンポーネントを並べています。

これでほぼ完了です。2 つの小さなステップが残っています。最初に、表示するすべての種類の結果のヒットコンポーネントをまとめる必要があります。この例では、これらはブログの投稿とページです。次に、サイトのどこかで `Search` コンポーネントを呼びだす必要があります。ヒットコンポーネントは次のとおりです。

### `hitComps.js`

```jsx:title=src/components/search/hitComps.js
import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import { Calendar } from "styled-icons/octicons/Calendar"
import { Tags } from "styled-icons/fa-solid/Tags"

export const PageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const PostHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/blog` + hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div>
      <Calendar size="1em" />
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
      &emsp;
      <Tags size="1em" />
      &nbsp;
      {hit.tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && `, `}
          {tag}
        </Fragment>
      ))}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)
```

`react-instantsearch-dom` からインポートされた `Highlight` と `Snippet` は両方とも、一致する検索結果の属性をユーザーに表示します。それらの違いは、前者はそれを完全にレンダリングする（例えば、タイトル、日付またはタグのリスト）のに対し、後者はスニペット、つまり一致する文字列を囲む特定の長さのテキスト部分（例えば、本文テキスト）のみを表示することです。それぞれの場合、 `attribute` 引数は、`src/utils/algolia.js` で割り当てられたプロパティ名と、Aloglia インデックスに表示されるプロパティ名である必要があります。

## Usage

これで、`Search` をどこかにインポートするだけです。一目瞭然な場所は `Header` コンポーネントなので、そこに追加します。

```jsx:title=src/components/Header/index.js
import React from "react"

import { Container, Logo } from "./styles"
import Nav from "../Nav"
import Search from "../Search"

const searchIndices = [
  { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]

const Header = ({ site, transparent }) => (
  <Container transparent={transparent}>
    <Logo to="/" title={site.title} rel="home" />
    <Nav />
    <Search collapse indices={searchIndices} />
  </Container>
)

export default Header
```

ここで検索インデックスの配列を定義し、それを `Search` の引数として渡すことに注意してください。

すべてが期待どおりに機能する場合、`gatsby developer` を実行すると、以下のビデオのようなインスタント検索マジックが得られます！また、[こちら](https://janosh.io/blog)で試してみることもできます。

https://youtu.be/Amsub4xJ3Jc

## Additional Resources

問題がある場合、または検索に Algolia を使用する方法について詳しく知りたい場合は、Jason Lengstorf のこのチュートリアルをご覧ください。

https://youtu.be/VSkXyuXzwlc

また、Gatsby + Algolia を一緒に使用している企業のストーリーを[ブログの Algolia セクションで](/blog/tags/algolia)ご覧いただくこともできます。
