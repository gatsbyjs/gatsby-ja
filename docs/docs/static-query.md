---
title: StaticQueryを使用したコンポーネントでのデータ取得
---

Gatsby v2 では、`StaticQuery` という GraphQL クエリーを介して、コンポーネントがデータを取得できる新しい API が導入されました。

このガイドでは、`StaticQuery` を使用した例を参照し、[StaticQuery とページクエリーの違い](#how-staticquery-differs-from-page-query)について学習します。

## コンポーネントでの `StaticQuery` の使用例

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-load-data-using-graphql-queries-directly-in-a-gatsby-v2-component-with-staticquery"
  lessonTitle="Load Data using GraphQL Queries Directly in a Gatsby v2 Component with StaticQuery（英語版）"
/>

### 基本的な例

`StaticQuery` を使用した `Header` コンポーネントの例を次に示します。

```jsx:title=src/components/header.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
      </header>
    )}
  />
)
```

`StaticQuery` を使用することで、コンポーネントとそのデータを同じ場所に配置できます。たとえば、`Layout` から `Header` にデータを渡す必要はなくなります。

### useStaticQuery

StaticQuery には React Hooks バージョンもあります。詳しくは、[`useStaticQuery`](/docs/use-static-query/) をご覧ください。

### 型チェック

With the above pattern, you lose the ability to typecheck with PropTypes. To regain typechecking while achieving the same result, you can change the component to:
上記のパターンを使用すると、PropTypes で型チェックする機能が失われます。同じ結果を得ながら型チェックを行うには、コンポーネントを次のように変更します。

```jsx:title=src/components/header.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const Header = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
```

## StaticQuery とページクエリーの違い

StaticQuery は（フラグメントを含む）ページクエリーが行えることのほとんどを行えます。主な違いは次のとおりです。

- ページクエリーは（`pageContext` を介して）変数を受け入れることができますが、追加できるのは**ページ**コンポーネントだけです。
- StaticQuery は変数を受け入れません（そのため「static」という名前です）が、ページを含む**任意の**コンポーネントで使用できます。
- StaticQuery は、そのままの React.createElement 呼び出しでは機能しません。たとえば、JSX を使用してください。例：`<StaticQuery />`
