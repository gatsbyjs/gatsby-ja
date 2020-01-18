---
title: useStaticQuery フックを使ったコンポーネントからのクエリー
---

Gatsby v2.1.0 で `useStaticQuery` が導入されました。これはビルド時に [React Hook](https://reactjs.org/docs/hooks-intro.html) を使って GraphQL のクエリーを実行する新しい機能です。

React コンポーネントで、 [StaticQuery](/docs/static-query/) コンポーネントと同じように GraphQL クエリーを介したデータの取得とコンポーネントへの注入を行えます。ただし、 `useStaticQuery` はレンダープロップを受け取るコンポーネントではなく、フックです。

このガイドでは、 `useStaticQuery` を使った例を紹介します。もし Gatsby の `StaticQuery` について詳しくなければ、まずは [StaticQuery とページクエリーの違い](/docs/static-query/#how-staticquery-differs-from-page-query)をご覧ください。

## コンポーネントでの useStaticQuery の使い方

> 💡 `useStaticQuery` を使うには React と ReactDOM の 16.8.0 以上が必要です。
>
> 📦 `npm install react@^16.8.0 react-dom@^16.8.0`

`useStaticQuery` は React Hook です。[Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) のルールがすべて適用されます。

GraphQL クエリーを受け取って、要求されたデータを返します。それだけです！

### 基本の例

`gatsby-config.js` からサイトのタイトルを取得する `Header` コンポーネントを作ってみましょう。

```jsx:title=src/components/header.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )
}
```

### カスタム `useStaticQuery` フックを作る

フックのもっとも魅力的な機能のひとつは、再利用可能な機能のまとまりを作成できることです。 `useStaticQuery` はフックです。したがって、 `useStaticQuery` を使うと再利用可能な機能のまとまりを作成できます。完璧ですね！

典型的な例は、どのコンポーネントでも再利用できるように `siteMetadata` を提供する `useSiteMetadata` フックを作成することです。これは次のようになります。

```jsx:title=src/hooks/use-site-metadata.js
import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            siteUrl
            headline
            description
            image
            video
            twitter
            name
            logo
          }
        }
      }
    `
  )
  return site.siteMetadata
}
```

そして、次のように新しく作成したフックをインポートします。

```jsx:title=src/pages/index.js
import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { title, siteUrl } = useSiteMetadata()
  return <h1>welcome to {title}</h1>
}
```

## 既知の制限事項

- `useStaticQuery` は値を受け取れません（なので `static` という名前になっています）。しかし、ページを含む**どのような**コンポーネントでも使えます。
- `useStaticQuery` はファイル内で単一での使用のみをサポートしています。これは Gatsby の現状のクエリーの仕組みによる制限です。
