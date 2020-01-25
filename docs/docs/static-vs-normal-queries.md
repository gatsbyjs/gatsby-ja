---
title: 静的クエリーと通常クエリー
---

Gatsby は、次の 3 種類の GraphQL クエリーを取り扱っています。ページクエリー（簡単のため、「通常クエリー」と呼ぶこともあります）、`<StaticQuery />` コンポーネントを使用する静的クエリー、そして `useStaticQuery` フックを使用する静的クエリーです。

## それぞれの GraphQL クエリーの違い

静的クエリーは、いくつかの点で　 Gatsby 　ページクエリーと異なります。ページクエリーの場合、Gatsby はページコンテキストを認識しているため、変数を含むクエリーを処理できます。**ただし、ページクエリーはトップレベルのページコンポーネントでのみ作成できます。**

これに対して、静的クエリーは変数を処理できません。これは、静的クエリーが特定のコンポーネント内で使用され、そのコンポーネントツリーの下位に表示されることがあるためです。静的クエリーでフェッチされたデータは、動的ではありませんが（つまり、**変数を使用できない**ため、「静的」クエリーという名前です）、コンポーネントツリーのどのレベルでも呼びだすことができます。

_静的クエリーと通常クエリーの実際の使用法の違いに関する詳細は、[静的クエリー](/docs/static-query/#how-staticquery-differs-from-page-query)に関するガイドをご覧ください。このガイドでは、Gatsby が内部で処理する方法の違いについて説明しています。_

## Redux Store でのビルド中のサイトクエリーの追跡

Gatsby は `components` や `staticQueryComponents` と呼ばれる Redux Store 内でサイトのクエリーを保持します。このプロセスとそれを説明するフローチャートは、[クエリー抽出](/docs/query-extraction/#store-queries-in-redux)ガイドで説明されています。

Redux では、`staticQueryComponents` は `Map` であり、`jsonName` コンポーネントから `StaticQueryObject` までを扱います。そのデータ構造はたとえば次のようなものです。

```javascript
{
  `blog-2018-07-17-announcing-gatsby-preview-995` : {
    name: `/path/to/component/file`,
    componentPath: `/path/to/component/file`,
    id: `blog-2018-07-17-announcing-gatsby-preview-995`,
    jsonName: `blog-2018-07-17-announcing-gatsby-preview-995`,
    query: `raw GraphQL Query text including fragments`,
    hash: `hash of graphql text`
  }
}
```

上記の例では、`Map` の `blog-2018-07-17-announcing-gatsby-preview-995` は key であり、value としてオブジェクトを持っています。

`staticQueryComponents` という Redux の名前空間は、開発中のクエリーの更新を監視し、クエリーが変更されるとキャッシュに新しいデータを追加します。

## クエリーの JSON インポートへの置き換え

最終ビルドでは、データを参照するために起動中の GraphQL サーバーはありません。Gatsby はすでにクエリーを[抽出](/docs/query-extraction/)して[実行](/docs/query-execution/)し、`/public/static/d/<hash>.json` のハッシュに基づいてファイルに[保存](/docs/query-execution/#save-query-results-to-redux-and-disk)しています。データがすでに利用できる状態にあるため、GraphQL クエリーは削除できます。

### 静的クエリーと通常クエリーの区別

Babel はすべてのソースコードを走査して、クエリー抽出中に対象となるクエリーを探します。Gatsby が静的クエリーと通常クエリーを異なる方法で処理するために、[`babel-plugin-remove-graphql-queries`](https://github.com/gatsbyjs/gatsby/blob/master/packages/babel-plugin-remove-graphql-queries/src/index.js) にあるように次の 3 つの特定のケースを探します。

1. `StaticQuery` という名前を持つ JSX ノード
2. `useStaticQuery` という名前を持つ関数の呼び出し
3. `gql` タグが使用されているタグ付けされたテンプレート表現

### ページデータのインポートの追加

GraphQL サーバーへ問い合わせるためビルド時に設定していた特定のコードは、この時点で関係なくなり、それぞれのクエリーで抽出された JSON データに置き換えることができます。

GraphQL とクエリー宣言に関連するインポートは、クエリーが実行されたときに Gatsby が見つけたクエリー結果に対応する JSON のインポートに置き換えられます。`useStaticQuery` フックを使用して記述された静的クエリーを持つ次のコンポーネントを考えてみます。

```jsx
import { useStaticQuery, graphql } from "gatsby"

export () => {
  const data = useStaticQuery(graphql`
      siteMetadata {
        site {
            title
        }
      }
  `)
  return (
    <h1>
        {data.siteMetadata.site.title}
    </h1>
  )
}
```

このコンポーネントでは、クエリー文字列が削除され、特定のハッシュ名で作成された JSON ファイルのインポートに置き換えられます。Redux Store は、クエリーを追跡して、正しいデータを対応するページにリンクします。

上記のコンポーネントは次のように書き換えられます。

```diff
- import { useStaticQuery, graphql } from "gatsby"
+ import dataJson from `/d/<hash>.json`

export () => {
- const data = useStaticQuery(graphql`
-     siteMetadata {
-       site {
-           title
-       }
-     }
- `)
+ const data = dataJson

  return (
    <h1>
        {data.siteMetadata.site.title}
    </h1>
  )
}
```

ページクエリーも同様の方法で更新されます。変更されたものの厳密な特徴は異なりますが、考え方は同じです。

```diff
- import { graphql } from "gatsby"
+ import dataJson from `/d/<hash>.json`

- export const query = graphql`
-   query HomePageQuery {
-     site {
-       siteMetadata {
-         description
-       }
-     }
-   }
- `

- export ({ data }) => {
+ export ({ data = dataJson }) => {
    return (
      <h1>
          {data.siteMetadata.site.title}
      </h1>
    )
  }
```

Gatsby はクエリーを含む文字列とともに、ページから `useStaticQuery` や `graphql` といったインポートも削除します。
