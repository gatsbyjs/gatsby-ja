---
title: Markdown で書かれているコンテンツで画像を扱う
---

Markdown を利用してコンテンツを作成する際に、画像を挿入することでより魅力的なコンテンツを作成できます。Markdown で画像を挿入する方法をいくつか紹介します。

## Frontmatter メタデータを利用した見出し画像の表示

ブログを作成する際に、記事の見出し画像を設定したい場合があります。frontmatter に画像のファイル名を設定し、GraphQL のクエリに `gatsby-plugin-sharp` を利用して画像を読み込む方法があります。

この方法は `gatsby-transformer-remark` か `gatsby-plugin-mdx` を利用して、 すでに Markdown を変換してコンテンツとして利用できるよう設定してある場合を想定しています。もし設定をしていない場合は [Programmatically create pages from data](/tutorial/part-seven/) を参照してください。チュートリアルは `gatsby-transformer-remark` を利用しています。

> NOTE: [MDX](/docs/mdx/) を利用した場合も、GraphQL のクエリ内の `markdownRemark` を `Mdx` へ置き換えるだけで動作します。

まずは [Using gatsby-image](/docs/using-gatsby-image/) で紹介されている画像を扱うために必要なプラグインをインストールしましょう。

```shell
npm install --save gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

`gatsby-source-filesystem` も必要なのでインストールをしましょう。次にインストールしたプラグインの設定を `gatsby-config` に記述していきます。

### Markdown と画像を同じディレクトリーで管理する場合の設定

Markdown と画像が同じディレクトリーにある場合は、Markdown と画像の設定がひとつのオプションにまとめることができます。例えば Markdown と画像が `/pages` ディレクトリー以下に格納されている場合、両方のコンテンツが Gatsby のデータ構造として自動的に GraphQL で取得できます。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`, // highlight-line
      },
    },
  ],
}
```

次に Markdown に `featuredImage` というフィールドを追加しましょう。

```markdown:title=src/pages/my-favorite-dogs.md
---
title: 私の好きな犬
featuredImage: shiba-inu.png
---

以下 Markdown コンテンツを記述
```

次のステップとして GraphQL のクエリを利用してテンプレートに見出し画像を設定する必要がありますが、このページ下部で説明します。

### Markdown と画像を別のディレクトリーで管理する場合の設定

設定する画像を Markdown とは別の `/images` のようなディレクトリーで管理したい場合があると思います。このような場合は別々のソースとして設定する必要があります。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`, // highlight-line
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`, // highlight-line
      },
    },
  ],
}
```

次に Markdown に `featuredImage` のパスを相対パスで指定します。この例では Markdown ファイルの親階層に `/images` フォルダーがある場合を想定しています。

```markdown:title=src/pages/about.md
---
title: About
featuredImage: ../images/team-cat.png
---

以下 Markdown コンテンツを記述
```

### Frontmatter から画像を取得する

ここまでで Markdown での記述と画像の指定方法を理解できたと思います。次に GraphQL のクエリで見出し画像を取得する方法を説明します。ファイルパスに実際の画像が存在するパスを指定している場合、画像は GraphQL の `File` node に格納されます。そして画像のデータを `childImageSharp` から参照します。

Markdown のテンプレートファイルに GraphQL のクエリを追加します。以下は [Fluid query](/docs/gatsby-image#images-that-stretch-across-a-fluid-container) を利用してレスポンシブな画像を取得する例です。

```jsx:title=src/templates/blog-post.js
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        // highlight-start
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        // highlight-end
      }
    }
  }
`
```

また Markdown のテンプレート内で `gatsby-image` パッケージを import して、 GraphQL で取得したものを `<Img />` コンポーネントへ渡すことで画像を表示できます。

```jsx:title=src/templates/blog-post.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// highlight-start
import Img from "gatsby-image"
// highlight-end

export default ({ data }) => {
  let post = data.markdownRemark

  // highlight-start
  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
  // highlight-end

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        // highlight-start
        <Img fluid={featuredImgFluid} />
        // highlight-end
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
```

見出し画像が生成されたページのメインヘッダーに表示されたと思います。

## `gatsby-remark-images` を利用してインラインに画像を表示する

Markdown の body に画像を表示したい場合の説明をします。[gatsby-remark-images](/packages/gatsby-remark-images) プラグインを使うと簡単に実現できます。

まずは　`gatsby-remark-images` と `gatsby-plugin-sharp` をインストールしましょう。

```shell
npm install --save gatsby-remark-images gatsby-plugin-sharp
```

また `gatsby-source-filesystem` がインストールされていることと設定で画像のあるフォルダーが指定されていることを確認してください。

`gatsby-config` でプラグインの設定をしましょう。先述したように `Remark` か `MDX` を利用します。

### MDX プラグインを使う

`gatsby-plugin-mdx` の使い方を紹介します。 `gatsby-plugin-mdx` の `gatsbyRemarkPlugins` の設定の中に `gatsby-remark-images` の設定を追加します。

> Note: この例では Markdown と画像が同じディレクトリーにある場合を想定しています。詳しくは[Markdown と画像を別のディレクトリーで管理する場合の設定](#configuring-for-images-and-posts-in-different-directories)を確認してください。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
  ],
}
```

### Transformer Remark Plugin を使う

`gatsby-plugin-mdx` の代わりに `gatsby-transformer-remark` plugin を利用した場合の例です。`gatsby-transformer-remark` の `plugins` の中に `gatsby-remark-images` プラグインの設定をします。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
  ],
}
```

このような設定をすることによっての Markdown の書式で画像を表示できます。 `Sharp` により処理されたものを `gatsby-image` コンポーネントを使うことにより表示できます。

```markdown
![Hopper The Rabbit](./rabbit-friend.png)
```
