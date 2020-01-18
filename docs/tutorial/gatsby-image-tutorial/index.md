---
タイトル:　Gatsby-Image をサイトで使う
---

##このチュートリアルには何が含まれていますか？

このチュートリアルを終わりには、以下のことが出来るようになります：

- レスポンシブ画像に対応した　`gatsby-image` の使い方について学ぶ。
- GraphQLを用いて単一の画像を照会する。
- YAMLファイルを通して複数の画像を取得する。
- 一般的なエラーのトラブルシューティングの方法について学ぶ。

## 前提条件

このチュートリアルはすでにGatsbyのプロジェクトが実行されていて、そのページにレンダリングしたい画像があることを前提としています。Gatsbyサイトをセットアップする方法は [メインチュートリアル](/tutorial/) または [クイックスタート](/docs/quick-start/) をご覧ください。

このチュートリアルでは、`gatsby-image` 、GraphQLやGatsbyのデータレイヤーを用いてレスポンシブ画像を最適化するReactコンポーネントをセットアップする方法を学びます。

> _ノート: このチュートリアルでは、YAMLファイルに保存されている静的なコンテンツを使用していますが、同様の方法がマークダウンファイルでも使用することが出来ます。_

## 入門

Gatsbyの画像最適化は信じられないパフォーマンスの `gatsby-image` と呼ばれるプラグインによって提供されます。

### ステップ 1

npmを使って、 `gatsby-image` プラグインとその依存関係にあるプラグインをインストールします。


```bash
npm install gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

### Step 2
### ステップ　2

新たにインストールしたプラグインを　`gatsby-config.js` ファイルに追加します。ファイルは最終的に以下のようになります（すでに使用されている他のプラグインは簡単にするために省略しています）。

> ＿ノート;  `gatsby-image` はインストールしたら、`gatsby-config.js` に追加する必要はありません。

```javascript:title=gatsby-config.js
plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`]
```

## Gatsby-image configuration
## Gatsby-image の構成

これで、`gatsby-image` を使えるように設定されました。

### ステップ　3

画像ファイルを置く場所を決めてください。この例では、`src/data` に置いてあります。

もし、プロジェクトがこのディレクトリ内のコンテンツを表示させる設定をまだ行なっていない場合は、次の2つを実行してください:


1.  `gatsby-source-filesystem` をインストールしてください。　ノート: プロジェクトを　`gatsby new <name>` を使用して作成した場合は、この最初の手順はすでにデフォルトスターターを経由して実行されています。

```bash
npm install gatsby-source-filesystem
```

2. 次に　`gatsby-config.js` で正しくフォルダの指定がされているかを確認してください。この例では、以下のようになります:

```javascript:title=gatsby-config.js
plugins: [
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  { resolve: `gatsby-source-filesystem`, options: { path: `./src/data/` } },
]
```

これで、 `gatsby-image` を使って作業を始める準備が整いました!

## ステップ 4

次のステップはあなたが達成しようとしていることによって異なります。

## 単一画像のデータのクエリ

画像ファイルを直接クエリするために　`graphql` を使用します。画像ファイルを相対パスに含めることで、 `gatsby-image` によってそのファイルを処理する方法を指定することが出来ます。

```jsx:title=src/pages/index.js
export const query = graphql`
  query {
    file(relativePath: { eq: "headers/headshot.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

ここで注意することがいくつかあります。


### 相対画像パスと　`gatsby-config.js`

あなたは相対パスと聞いて、コードが置かれているファイルに対応する相対パス（この場合はindex.js）であると予想するかもしれません。しかし、それは違います。相対パスは実際には `gatsby-source-filesystem` に配置したコードの設定に基づき、ここでは `src/data` を指します。

### 画像のフラグメント

このクエリについてもう1つ注意すべき点は、固定されたwidthとheightを持つ画像を返すフラグメント　`GatsbyImageSharpFluid` の使い方についてです。この特定の大きさに合わせる方法の代わりに、コンテナを埋めるスケーラブルな画像を作るフラグメント　`GatsbyImageSharpFluid` を使う事が出来ます。`gatsby-image` では、_fluid_ な画像は、_fixed_ な画像が固定されているのに対して、画面に応じたサイズを持っていない画像を意味します。

クエリは、`gatsby-image` コンポーネントで利用可能な形式に処理された画像を含むデータオブジェクトを返します。その結果は自動的にコンポーネントに渡され、`data` propに添付されます。それから、JSXを用いて画像を表示し、レスポンシブで高いパフォーマンスのHTMLを自動的に出力します。

画像を表示するためには　まず、`gatsby-image` が提供するコンポーネントをインポートします。

```jsx
import Img from "gatsby-image"
```

これで使用する事が出来ます。画像のキーは、画像が処理された方法と一致させることに注意してください。この例では `fixed`を用いています。


```jsx
<Img
  className="headshot"
  fixed={data.file.childImageSharp.fixed}
  alt="headshot"
/>
```

こちらはクエリと使用方法を全てまとめたものです:

```jsx:title=src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Img
        className="headshot"
        fixed={data.file.childImageSharp.fixed}
        alt=""
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "headers/headshot.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
export default HomePage
```

## Querying for multiple images from YAML data

Another way to source images is through YAML (or Markdown). This example uses the `gatsby-transformer-yaml` plugin to query the YAML files. More information about that plugin can be found in the [Gatsby plugin library](/packages/gatsby-transformer-yaml/?=gatsby-transformer-yaml).

Here's an example of a query from a list of conferences in a YAML file with an image for each one:

```graphql
{
  allSpeakingYaml {
    edges {
      node {
        conference
        year
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
```

In this case the query starts with `allSpeakingYaml` to direct `graphql` to look for this data in the `speaking.yaml` file in your `src/data` folder referenced in `gatsby-config.js`. If you want to query a file named `blog.yaml`, for example, you'd start the query with `allBlogYaml`.

## Rendering images sourced from YAML

In order to reference your images in YAML make sure that the relative paths are accurate. The path to each image should be relative to the location of the `.yaml` file pointing to it. And all of these files need to be in a directory visible to the `gatsby-source-filesystem` plugin configured in `gatsby-config.js`.

The inside of the YAML file would look something like this:

```yaml
- image: speaking/kcdc.jpg
```

Now, you can create the query. Similar to the single use example above, you can use `gatsby-image` features inside the query. When the query runs, the relative path will point to the location of the image file and the resulting query processes the file as an image for display.

```graphql
{
  allSpeakingYaml {
    edges {
      node {
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
```

Since the images are stored as part of an array, they can be accessed using the JavaScript `map` function in JSX. As with the single image example, the actual processed image is at the `...GatsbyImageSharpFluid` level in the returned data structure.

```jsx
<Img
  className="selfie"
  fluid={node.image.childImageSharp.fluid}
  alt={node.conference}
/>
```

## Using Static Query

If your query is part of a reusable component you may want to use a Static Query hook. The code necessary to do this is almost the same as the single image use case above.

```jsx:title=src/components/header-image.js
export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "headers/default.jpg" }) {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <Img fixed={data.file.childImageSharp.fixed} />
}
```

Instead of a query constant and data that references the result like in the first section above, you can put the `useStaticQuery` hook directly in the JSX code and then reference it in the `Img` component. Note that the query language didn’t change and neither did the `Img` tag syntax; the only change was the location of the query and the usage of the `useStaticQuery` function to wrap it.

## Multiple queries and aliasing

The last use case you may come across is how to handle a situation where you have multiple queries in the same file/page.

This example is attempting to query for all the data in `speaking.yaml` and the direct file query in the first example. In order to do this you want to use aliasing in GraphQL.

The first thing to know is that an alias is assigning a name to a query. The second thing to know is that aliases are optional, but they can make your life easier! Below is an example.

```graphql
talks: allSpeakingYaml {
        edges {
            node {
                image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
}
```

When you do that, you’ve changed the reference to the query object available in your JSX code. While it was previously referenced as this:

```jsx
{
  data.allSpeakingYaml.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

Giving it an alias does not add a level of complexity to the response object, it just replaces it. So you end up with the same structure, referenced like this (note the alias `talks` in place of the longer `allSpeakingYaml`):

```jsx
{
  data.talks.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

The top-level object name of `data` is implicit. This is important because when you conduct multiple queries as part of a single component, Gatsby still passes the entire result to the component.

Here's an example of data flowing into a component:

```jsx
const SpeakingPage = ({ data }) => {}
```

Everything else gets referenced from that top-level return name.

With that understanding, you can combine two queries referencing images and use aliasing to distinguish between them.

```graphql
{
  allSpeakingYaml {
    edges {
      node {
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
  banner: file(relativePath: { eq: "headers/default.jpg" }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
```

Notice that this example uses aliasing for one query and not the other. This is allowed; there is no requirement that all your queries use aliasing. In this case, the JSX would look like this to access the `speaking.yaml` content.

```jsx
{
  data.allSpeakingYaml.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

And then like this to access the image using the alias name `banner`.

```jsx
<Img fluid={data.banner.childImageSharp.fluid} />
```

These examples should handle a fair number of use cases. A couple bonus things:

## Aspect ratio

`gatsby-image` has a feature that gives you the ability to set an aspect ratio to constrain image proportions. This can be used for fixed or fluid processed images; it doesn't matter.

```jsx
<Img sizes={{ ...data.banner.childImageSharp.fluid, aspectRatio: 21 / 9 }} />
```

This example uses the `sizes` option on the `Img` component to specify the `aspectRatio` option along with the fluid image data. This processing is made possible by `gatsby-plugin-sharp`.

## Bonus Error

Now for errors to watch out for. If you change your image processing from `fixed` to `fluid` you may see this error.

![In image cache error message.](./ErrorMessage.png)

Despite its appearance, solving this doesn't actually require flushing any kind of cache. In reality, it has to do with incompatible references. You likely triggered it because you changed the query to process the image as `fluid` but the JSX key was still set to `fixed`, or vice versa.

## The end

So that's it. This post included a number of different possible use cases, so don't feel as if you need to explore them all. Pick the examples and tips that apply to your implementation.

## Other resources

- [Gatsby Image API docs](/docs/gatsby-image/)
- [Using Gatsby Image](/docs/using-gatsby-image/)
- [Other image and media techniques in Gatsby](/docs/images-and-files/)
