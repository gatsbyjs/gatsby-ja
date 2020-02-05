---
title: "SEO コンポーネントを追加する"
---

Web 上の全てのサイトは、ページのタイトル、説明文、ファビコンなどの基本的なメタタグを `<head>` 要素に持たせています。これらの情報はブラウザや Twitter などのサイトでシェアした際に表示されます。サイトの開発者はユーザーや他のサイトにより多くの情報を提供できます。そこで参考にしていただきたいのがこのガイドです。このガイドでは、スマートフォンユや検索エンジンでリッチなプレビューを表示するコンポーネントをレイアウトファイルに追加します。

ヒント： このガイドでは StaticQuery を使います。もしそれがなんのことかわからなければ、[StaticQuery のドキュメント](/docs/static-query/)に目を通してみてください。また、`react-helmet` をインストールする必要もあるのでそちらも[このドキュメント](/docs/add-page-metadata)で確認してみてください。

## gatsby-config.js

Gatsby は、`gatsby-config` の `siteMetadata` 欄に記載された情報を自動的に GraphQL で簡単に取得できるようにするので、そこに記載するのがいいでしょう。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Severus Snape",
    titleTemplate: "%s · The Real Hero",
    description:
      "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
    url: "https://www.doe.com", // No trailing slash allowed!
    image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@occlumency",
  },
}
```

## SEO コンポーネント

この雛形をもとに新しいコンポーネントを作成してください。

```jsx:title=src/components/SEO.js
import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article }) => ()

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}
```

**ヒント：** この例では必要な情報を取得し、プロップスとして利用するにあたってわかりやすくするために `propTypes` を使っています。

テンプレートファイルなど他のファイルでもこのコンポーネントを利用できるようにするために、`SEO.defaultProps` にてデフォルト値を設定しています。こうしておけば、プロパティを明示的に定義しないかぎりは `siteMetadata` の情報が使われます。

そうしたらクエリを定義し、StaticQuery に渡しましょう（クエリそのものは定数として定義することもできます）。`title` が `defaultTitle` と改名されているように、クエリの各アイテムにはエイリアスを設定できます。

```jsx:title=src/components/SEO.js
const SEO = ({ title, description, image, pathname, article }) => (
  <StaticQuery query={query} render={} />
)

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
```

次はクエリから取得した情報を、プロップが使われているかチェックするオブジェクトに分割代入しましょう。命名衝突を防いでくれるので、このような場面でエイリアスは便利です。

```jsx:title=src/components/SEO.js
const SEO = ({ title, description, image, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
        }
      }
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
      }

      return ()
    }}
  />
)

export default SEO
```

最後に `Helmet` を使ってこの情報を返します。完成した SEO コンポーネントはこのようになっているはずです。

```jsx:title=src/components/SEO.js
import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
          twitterUsername,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || "/"}`,
      }

      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && (
              <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && (
              <meta name="twitter:creator" content={twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
              <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
```

## Examples

このようにして、Facebook や Twitter のメタタグを独自のコンポーネントに持たせることもできますし、`static` フォルダーにお好きなファビコンを用意したり、[schema.org](https://schema.org/)に準じた情報（Google はこれを利用し構造化データを生成します）を追加することもできます。より詳しくはこれらの例を参考にしてみてください。

- [marisamorby.com](https://github.com/marisamorby/marisamorby.com/blob/master/packages/gatsby-theme-blog-sanity/src/components/seo.js)
- [gatsby-starter-prismic](https://github.com/LeKoArts/gatsby-starter-prismic/blob/master/src/components/SEO/SEO.jsx)

冒頭でも述べたように、これらのコンポーネントを[この例のように](https://github.com/jlengstorf/marisamorby.com/blob/6e86f845185f9650ff95316d3475bb8ac86b15bf/src/templates/post.js#L12-L18)テンプレートとして利用することもできます。
