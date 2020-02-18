---
<<<<<<< HEAD
title: "レシピ集: データの変換"
=======
title: "Recipes: Transforming Data"
tableOfContentsDepth: 1
>>>>>>> 22a3fb4d3155774ddc223a249897020b0ee18db1
---

Gatsby でのデータ変換はプラグインによって実現されています。トランスフォーマープラグインは source プラグインを通じてデータを取得し、実際に使う形式へ変換します（例：JSON を JavaScript オブジェクトにする等）。

## Markdown を HTML に変換する

`gatsby-transformer-remark`プラグインは、Markdown ファイルを HTML に変換できます。

### 前提条件

- `gatsby-config.js`と `index.js` ページがある。
- `src`ディレクトリーに Markdown ファイルが保存されている。
- `gatsby-source-filesystem` のようなソースプラグインがインストールされている。
- `gatsby-transformer-remark`プラグインがインストールされている。

### 進め方

1. トランスフォーマープラグインを `gatsby-config.js` に追加します。

```js:title=gatsby-config.js
plugins: [
  // gatsby-source-filesystem を省略: 変換するノードを作成するため
  `gatsby-transformer-remark`
],
```

2. `MarkdownRemark` ノードを取得するため、`index.js` に GraphQL クエリーを追加します。

```jsx:title=src/pages/index.js
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
          excerpt
        }
      }
    }
  }
`
```

3. 開発用サーバーを再起動して、`http://localhost:8000/___graphql` で GraphiQL を開きます。`MarkdownRemark` ノードで使用できるフィールドを探します。

### 追加の資料

<<<<<<< HEAD
- `gatsby-transformer-remark` を使用して、[Markdown を HTML に変換するチュートリアル](/tutorial/part-six/#transformer-plugins)。
- [Gatsby プラグインライブラリ](/plugins/?=transformer)で利用できるトランスフォーマープラグインを探す。
=======
- [Tutorial on transforming Markdown to HTML](/tutorial/part-six/#transformer-plugins) using `gatsby-transformer-remark`
- Browse available transformer plugins in the [Gatsby plugin library](/plugins/?=transformer)

## Transforming images into grayscale using GraphQL

### Prerequisites

- A [Gatsby site](/docs/quick-start) with a `gatsby-config.js` file and an `index.js` page
- The `gatsby-image`, `gatsby-transformer-sharp`, and `gatsby-plugin-sharp` packages installed
- A source plugin installed, such as `gatsby-source-filesystem`
- An image (`.jpg`, `.png`, `.gif`, `.svg`, etc.) in the `src/images` folder

### Directions

1. Edit your `gatsby-config.js` file to source images and configure plugins for Gatsby's GraphQL data layer. A common approach is to source them from an images directory using the `gatsby-source-filesystem` plugin:

```javascript:title=gatsby-config.js

 plugins: [
   {
     resolve: `gatsby-source-filesystem`,
     options: {
       name: `images`,
       path: `${__dirname}/src/images`,
     },
   },
   `gatsby-transformer-sharp`,
   `gatsby-plugin-sharp`,
 ],
```

2.  Query your image using GraphQL and apply a grayscale transformation to the image inline. The `relativePath` should be relative to the path you configured in `gatsby-source-filesystem`.

```graphql
  query {
     file(relativePath: { eq: "corgi.jpg" }) {
       childImageSharp {
         // highlight-next-line
         fluid(grayscale: true) {
           ...GatsbyImageSharpFluid
         }
       }
     }
   }
```

Note: You can find these and other parameters in your GraphQL playground located at `http://localhost:8000/__graphql`

3. Next import the `Img` component from "gatsby-image". You'll use this inside your JSX to display the image.

```jsx:title=src/pages/index.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
// highlight-next-line
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
     file(relativePath: { eq: "corgi.jpg" }) {
       childImageSharp {
         // highlight-next-line
         fluid(grayscale: true) {
           ...GatsbyImageSharpFluid
         }
       }
     }
   }
  `)
  return (
    <Layout>
      <h1>I love my corgi!</h1>
      // highlight-start
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt="A corgi smiling happily"
      />
      // highlight-end
    </Layout>
  )
}
```

4. Run `gatsby develop` to start the development server.

5. View your image in the browser: `http://localhost:8000/`

### Additional resources

- [API docs, including grayscale and duotone query tips](/docs/gatsby-image/#shared-query-parameters)
- [Gatsby Image docs](/docs/gatsby-image/)
- [Image processing examples](https://github.com/gatsbyjs/gatsby/tree/master/examples/image-processing)
>>>>>>> 22a3fb4d3155774ddc223a249897020b0ee18db1
