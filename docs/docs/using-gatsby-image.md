---
title: Gatsby Image を使用して画像の膨張を防ぎましょう。
---

`gatsby-image` ([gatsby-image プラグインの README](/packages/gatsby-image/))は Gatsby の GraphQL クエリーとシームレスに連携するように設計された React コンポーネントです。 [Gatsby のネイティブ画像処理機能](https://image-processing.gatsbyjs.org/) と高度な画像の読み込み技術を組み合わせて、サイトの画像の読み込みを簡単かつ完全に最適化してくれます。 `gatsby-image` は [gatsby-plugin-sharp（画像圧縮ライブラリ）](/packages/gatsby-plugin-sharp/) を使用して強力に画像を変換します。

> _警告: gatsby-image は `<img />` と**完全に互換性があるわけではありません**。 gatsby-image は 固定された幅/高さの画像および、コンテナの幅全体に広がる画像に最適化されています。 `<img />` で使用できるいくつかの方法は gatsby-image では機能しません。_

[デモ](https://using-gatsby-image.gatsbyjs.org/)

`gatsby-image` には最新の画像コンポーネントに期待される以下のような仕組みが含まれています。

- [IntersectionObserver API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) を使用して画像の遅延読み込みを行います。
- 画像の読み込み時にページが飛び回らないように画像の位置を保持します。
- 画像の読み込み中に表示する灰色の背景や、ぼかし効果のある画像のプレースホルダーを簡単に追加できます。

_より完全な API 情報については、 [Gatsby Image API](/docs/gatsby-image/) のドキュメントをご覧ください。_

## 問題

最適化されていない大きなサイズの画像は、サイトの速度を劇的に低下させてしまいます。

しかし、ウェブサイト向けに最適化された画像を作成することは、長い間、厄介な問題とされてきました。理想的なことを言えば以下のようになります。

- 大きなサイズの画像をデザインに必要なサイズへ変更します。
- スマートフォンやタブレットがデスクトップサイズの画像をダウンロードしないように、複数の小さな画像を生成します。
- 不要なメタデータをすべて取り除き、JPEG および PNG 圧縮を最適化します。
- 初期ページの読み込みを高速化し、帯域幅を節約するために効率的な画像の遅延読み込みを行います。
- ぼかし効果やトレースされたプレースホルダー SVG を使用して、読み込み中に画像のプレビューを表示します。
- 画像の読み込み中にページが飛び回らないように画像の位置を保持します。

画像を手動で最適化してから、読み込みの直前で画像の差し替えを行ったり、デザインを微調整して画像の幅を 100px 削る、といった作業をサイト全体で一貫して行うことは、徒労のように感じられます。

ほとんどのソリューションでは、すべての画像が最適化されるようにするためには多くの手作業を必要とします。

これは理想的な状況ではありません。画像の最適化は簡単かつ、デフォルトである必要があります。

## 解決策

Gatsby を使用することで、画像に関する作業体験を大幅に改善できます。

`gatsby-image` は GraphQL と Sharp を搭載した Gatsby のネイティブ画像処理機能とシームレスに連携するように設計されています。以下の手順を実行することで、最小限の労力で完璧な画像を作成できます。

1. `gatsby-image` と依存関係にあるプラグイン（`gatsby-plugin-sharp` と `gatsby-transformer-sharp`）をインストールします。

```shell
  npm install --save gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

2. `gatsby-config.js` に新しくインストールしたプラグインを追記します。

```js:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-sharp`, `gatsby-transformer-sharp`],
}
```

3. `gatsby-source-filesystem` がフォルダーから画像を読み込めるように構成します。 GraphQL を使用して画像ファイルを取得するためには、 Gatsby の認識している場所に画像ファイルが置かれている必要があります。 プラグインを構成するには、 `gatsby-config.js` の更新が必要です。 プロジェクト内の画像を参照できるように `path` を書き換えてください。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // highlight-start
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    // highlight-end
  ],
}
```

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-install-gatsby-image-and-source-local-images-from-the-filesystem"
  lessonTitle="Install gatsby-image and source local images from the filesystem"
/>

4. [GraphQL フラグメント](/packages/gatsby-image/#fragments) のいずれかを使用して GraphQL クエリーを作成します。これは `gatsby-image` がレスポンシブで最適化された画像を作成するために必要なフィールドを指定します。この例では、 `GatsbyImageSharpFluid` フラグメントを使用して、 `gatsby-source-filesystem` オプションで指定された場所に相対パスで画像を取得しています。

```jsx:title=src/pages/my-dogs.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby" // highlight-line
import Layout from "../components/layout"

export default () => {
  // highlight-start
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "images/corgi.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  // highlight-end
  return (
    <Layout>
      <h1>I love my corgi!</h1>
    </Layout>
  )
}
```

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-gatsby-image-with-an-image-from-a-relative-path"
  lessonTitle="Use gatsby-image with an image from a relative path"
/>

5. `Img` をインポートして、JSX に追加します。この `Img` タグには、アクセシビリティのための `alt` 属性などの追加機能も利用できます。

```jsx:title=src/pages/my-dogs.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image" // highlight-line

export default () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "images/corgi.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          fluid {
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

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-gatsby-image-s-graphql-fragments-for-blurred-up-and-traced-svg-images"
  lessonTitle="Use gatsby-image's GraphQL fragments for blurred-up and traced SVG images"
/>

この GraphQL クエリーは、複数のサイズの画像を作成し、ページがレンダリングされるときに、現在の画面解像度（デスクトップからモバイルまで全て）に適した画像を使用します。 `gatsby-image` コンポーネントは自動的にぼかし効果と、現在画面上にない画像の遅延読み込みを有効にします。

これらの機能は全てにおいて非常に優れています。したがって、npm から `gatsby-image` を使用する方が、自分で実装したり、いくつかのスタンドアロンライブラリーを組み合わせて使うよりも遥かに優れています。

### 追加のリソース

- [Gatsby Image API ドキュメント](/docs/gatsby-image/)
- [gatsby-image プラグインの README ファイル](/packages/gatsby-image/)
- [gatsby-image を使用したサンプルサイトのソースコード](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-gatsby-image)
- [gatsby-image に関するブログ記事](/blog/tags/gatsby-image/)
- [gatsby-image を使用するスターター](/starters/?d=gatsby-image&v=2)
- [その他の画像プラグイン](/plugins/?=image)
- [カイル・ギルによる「gatsby-image を使用した非常に簡単な画像の最適化」　](https://medium.com/@kyle.robert.gill/ridiculously-easy-image-optimization-with-gatsby-js-59d48e15db6e)
