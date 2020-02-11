---
title: Gatsby の画像 API
---

Gatsby のサイトが非常に高速である理由のひとつに、私たちの推奨する画像処理手法があります。`gatsby-image` は、GaraphQL とサイトの画像読み込みを簡単かつ完璧に最適化する [gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/) によって、Gatsby の[ネイティブ画像処理](https://image-processing.gatsbyjs.org/)機能がシームレスに動作するように設計された React コンポーネントです。

> _ヒント: gatsby-image は `<img />` の互換では**ありません**。gatsby-image はレスポンシブな固定の幅/高さを持つ画像とコンテナの幅に合わせて伸縮する画像に最適化されています。GraphQL を使用せずに Gatsby で[画像を扱う](/docs/images-and-files/)他の方法もあります。_

デモ：[https://using-gatsby-image.gatsbyjs.org/](https://using-gatsby-image.gatsbyjs.org/)

## このドキュメントで取り扱うこと

- [Gatsby Image を始める準備](#setting-up-gatsby-image)
- [gatsby-image での画像タイプ](#types-of-images-with-gatsby-image)
  - [固定画像のクエリーパラメーター](#images-with-a-fixed-width-and-height)
  - [可変画像のクエリーパラメーター](#images-that-stretch-across-a-fluid-container)
  - [サイズ変更した画像](#resized-images)
  - [共用クエリーパラメーター](#shared-query-parameters)
- [画像のクエリーフラグメント](#image-query-fragments)
- [Gatsby Image プロパティ](#gatsby-image-props)

## Gatsby Image を始める準備

Gatsby Image を使用するには、`gatsby-image` と共に必要なプラグインである `gatsby-transformer-sharp` と `gatsby-plugin-sharp` をインストールします。あなたの `gatsby-config.js` ファイル内のパッケージを参照してください。また、この設定ファイルで [`gatsby-plugin-sharp`](/packages/gatsby-plugin-sharp/) にオプションを追加することもできます。

画像を使うには、`gatsby-source-filesystem` を使用してローカルファイルにアクセスする方法が一般的ですが、`gatsby-source-contentful` や `gatsby-source-datocms`、`gatsby-source-sanity` など他のソースプラグインも使用できます。

```bash
npm install --save gatsby-image gatsby-plugin-sharp gatsby-transformer-sharp
```

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
  ],
}
```

_詳細なインストール手順については [Using Gatsby Image](/docs/using-gatsby-image/) をご覧ください。_

### クエリーで始める Gatsby image

Gatsby Image にファイルデータを送るには [GraphQL クエリー](/docs/graphql-reference/)を設定して、それをコンポーネントにプロパティとして渡すか、それをコンポーネントに直接書き込みます。1 つのやり方としては、[`useStaticQuery`](/docs/use-static-query/) フックを活用する方法があります。

画像取得のための一般的な GraphQL クエリーは、[gatsby-source-filesystem](/packages/gatsby-source-filesystem/) の `file` と、[gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/) の `imageSharp` と `allImageSharp` の両方が挙げられますが、最終的に利用可能な選択肢は元データによって決まります。

> ヒント: あなたは同じタイプの複数画像をクエリーするために [GraphQL エイリアス](/docs/graphql-reference/#aliasing)も使用できます。

クエリーの例とコンポーネントでの使い方については、以下をご覧ください。

## `gatsby-image` での画像タイプ

Gatsby image オブジェクトは GraphQL メソッドを介して作成されます。画像最適化には _固定_ と _可変_ の 2 種類があり、複数サイズの画像（1x、1.5x など）を作成します。単一の画像を作成する _リサイズ_ メソッドもあります。

### _固定_ の幅と高さを持つ画像

設定した幅もしくは高さでいろいろな解像度の画像を自動的に作成します。Gatsby は 1x、1.5x、そして 2x のピクセル密度に合わせたレスポンシブ画像を作成し、それらを `<picture>` 要素で使用します。

`fixed` 画像のクエリーで画像のデータを取得したら、そのデータを `Img` コンポーネントに渡すことができます。

```jsx
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/default.jpg" }) {
        childImageSharp {
          # 固定画像とフラグメントを指定します。
          # デフォルトの幅は 400 ピクセルです。
          // highlight-start
          fixed {
            ...GatsbyImageSharpFixed
          }
          // highlight-end
        }
      }
    }
  `)
  return (
    <div>
      <h1>Hello gatsby-image</h1>
      <Img
        fixed={data.file.childImageSharp.fixed} {/* highlight-line */}
        alt="Gatsby Docs are awesome"
      />
    </div>
  )
}
```

#### 固定画像のクエリーパラメーター

クエリーでは、固定画像のオプションを指定できます。

- `width` (int, 初期値：400)
- `height` (int)
- `quality` (int, 初期値：50)

#### 返り値

- `base64` (string)
- `aspectRatio` (float)
- `width` (float)
- `height` (float)
- `src` (string)
- `srcSet` (string)

ここでは、クエリーにすべての項目を入力しなくても上記の項目を 1 行ですべて返してくれる `GatsbyImageSharpFixed` のようなフラグメントが便利です。

```graphql
file(relativePath: { eq: "images/default.jpg" }) {
  childImageSharp {
    // highlight-start
    fixed(width: 400, height: 400) {
      ...GatsbyImageSharpFixed
      // highlight-end
    }
  }
}
```

詳細については、[gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/?=#fixed) をご覧ください。

### _可変_ コンテナに合わせて伸縮する画像

1 つの画像からコンテナに合わせて伸縮するフレキシブルな画像を作成します。例えば最大幅が 800px のコンテナがあるとき、自動生成されるサイズはすべてのデバイスサイズや画面解像度に最適なサイズを提供するために 200px、400px、800px、1200px、そして 1600px となります。もしあなたが出力するサイズをさらに操作したい場合は、`srcSetBreakpoints` パラメーターを使うことができます。

`fluid` 画像のクエリーで画像のデータを取得したら、そのデータを `Img` コンポーネントに渡すことができます。

```jsx
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/default.jpg" }) {
        childImageSharp {
          # 可変画像とフラグメントを指定します。
          # デフォルトの幅は 800 ピクセルです。
          // highlight-start
          fluid {
            ...GatsbyImageSharpFluid
          }
          // highlight-end
        }
      }
    }
  `)
  return (
    <div>
      <h1>Hello gatsby-image</h1>
      <Img
        fluid={data.file.childImageSharp.fluid} {/* highlight-line */}
        alt="Gatsby Docs are awesome"
      />
    </div>
  )
}
```

#### 可変画像のクエリーパラメーター

クエリーでは、可変画像のオプションを指定できます。

- `maxWidth` (int, 初期値：800)
- `maxHeight`(int)
- `quality` (int, 初期値：50)
- `srcSetBreakpoints` (array of int, 初期値：`[]`)
- `fit` (string, 初期値：`[sharp.fit.cover][6]`)
- `background` (string, 初期値：`rgba(0,0,0,1)`)

#### 返り値

- `base64` (string)
- `src` (string)
- `width` (int)
- `height` (int)
- `aspectRatio` (float)
- `src` (string)
- `srcSet` (string)

ここでは、クエリーにすべての項目を入力しなくても上記の項目を 1 行ですべて返してくれる `GatsbyImageSharpFluid` のようなフラグメントが便利です。

```graphql
file(relativePath: { eq: "images/default.jpg" }) {
  childImageSharp {
    // highlight-start
    fluid(maxWidth: 400) {
      ...GatsbyImageSharpFluid
      // highlight-end
    }
  }
}
```

詳細については、[gatsby-plugin-sharp](/packages/gatsby-plugin-sharp/?=#fluid) をご覧ください。

### サイズ変更した画像

_固定_ 画像と _可変_ 画像に加えて、gatsby-image API では `gatsby-plugin-sharp` の `resize` メソッドを呼び出し、複数サイズではなく単一の画像を作成できます。リサイズメソッドで使用できるデフォルトのフラグメントはありません。

#### パラメーター

- `width` (int, 初期値：400)
- `height` (int)
- `quality` (int, 初期値：50)
- `jpegProgressive` (bool, 初期値：true)
- `pngCompressionLevel` (int, 初期値：9)
- `base64`(bool, 初期値：false)

#### 返り値

リサイズでは以下の項目をオブジェクトとして返します。

- `src` (string)
- `width` (int)
- `height` (int)
- `aspectRatio` (float)

```graphql
allImageSharp {
  edges {
    node {
        resize(width: 150, height: 150, grayscale: true) {
          src
        }
    }
  }
}
```

### 共用クエリーパラメーター

`gatsby-config.js` 内の `gatsby-plugin-sharp` の設定に加えて、_固定_ と _可変_ の両方に適用できる追加のクエリーオプションがあります。

- `grayscale` (bool, 初期値：false)
- `duotone` (bool|obj, 初期値：false)
- `toFormat` (string, 初期値：\`\`)
- `cropFocus` (string, 初期値：`[sharp.strategy.attention][6]`)
- `pngCompressionSpeed` (int, 初期値：4)

ここでは、`duotone` オプションを固定画像に適用してみます。

```graphql
fixed(
  width: 800,
  duotone: {
    highlight: "#f00e2e",
    shadow: "#192550"
  }
)
```

<figure>
  <img alt="Jay Gatsby holding wine class in normal color and duotone." src="./images/duotone-before-after.png" />
  <figcaption>
    デュオトーン | 適用前 - 適用後
  </figcaption>
</figure>

そして、`grayscale` オプションを固定画像に適用した例です。

```graphql
fixed(
  grayscale: true
)
```

<figure>
  <img alt="Jay Gatsby holding wine class in normal color and duotone." src="./images/grayscale-before-after.png" />
  <figcaption>
    グレースケール | 適用前 - 適用後
  </figcaption>
</figure>

詳細については、[`gatsby-plugin-sharp`](/packages/gatsby-plugin-sharp) をご覧ください。

## 画像のクエリーフラグメント

GraphQL には、「クエリーフラグメント」と呼ばれる考え方があり、これは再利用可能なクエリーの一部です。`gatsby-image` を使った構築を簡単にするため、`gatsby-image` をサポートする Gatsby 画像処理プラグインにはあなたがクエリーに簡単に含めることができるフラグメントが付属しています。

> ヒント: クエリーでフラグメントを使用するかどうかはあなたが設定したデータソースによって異なります。詳しくは [gatsby-image](/packages/gatsby-image#fragments) をご覧ください。

### `gatsby-transformer-sharp` の共通フラグメント

#### 固定画像

- `GatsbyImageSharpFixed`
- `GatsbyImageSharpFixed_noBase64`
- `GatsbyImageSharpFixed_tracedSVG`
- `GatsbyImageSharpFixed_withWebp`
- `GatsbyImageSharpFixed_withWebp_noBase64`
- `GatsbyImageSharpFixed_withWebp_tracedSVG`

#### 可変画像

- `GatsbyImageSharpFluid`
- `GatsbyImageSharpFluid_noBase64`
- `GatsbyImageSharpFluid_tracedSVG`
- `GatsbyImageSharpFluid_withWebp`
- `GatsbyImageSharpFluid_withWebp_noBase64`
- `GatsbyImageSharpFluid_withWebp_tracedSVG`

#### `noBase64` について

もしあなたが、[blur-up effect](https://using-gatsby-image.gatsbyjs.org/blur-up/)を使用したくない場合は、末尾に `noBase64` を含むフラグメントを選択してください。

#### `tracedSVG` について

もしあなたが、[traced placeholder SVGs](https://using-gatsby-image.gatsbyjs.org/traced-svg/) を使用したい場合は、末尾に `tracedSVG` を含むフラグメントを選択してください。

#### `withWebP` について

ブラウザが [WebP images](https://developers.google.com/speed/webp/) ファイル形式をサポートしているときに自動的に使用したい場合は、`withWebp` フラグメントを使用してください。もしブラウザが WebP をサポートしていない場合は、`gatsby-image` はデフォルトの画像形式にフォールバックします。

これは `gatsby-transformer-sharp` のデフォルトではないフラグメントを使用する場合の例です。目的の画像タイプ(_固定_ または _可変_)に合うものを選択してください。

```graphql
file(relativePath: { eq: "images/default.jpg" }) {
  childImageSharp {
    fluid {
      // highlight-next-line
      ...GatsbyImageSharpFluid_tracedSVG
    }
  }
}
```

これらのオプションについての詳細は、Gatsby image デモをご覧ください: [https://using-gatsby-image.gatsbyjs.org/](https://using-gatsby-image.gatsbyjs.org/)

#### 追加のプラグインフラグメント

さらに、`gatsby-image` をサポートするプラグインは、現在 [gatsby-source-contentful](/packages/gatsby-source-contentful/) や、 [gatsby-source-datocms](https://github.com/datocms/gatsby-source-datocms)、[gatsby-source-sanity](https://github.com/sanity-io/gatsby-source-sanity) があります。詳細は [gatsby-image](/packages/gatsby-image/#fragments) をご覧ください。

## Gatsby-image プロパティ

クエリーを作成した後、追加オプションを gatsby-image コンポーネントに渡すことができます。

| 名前                   | タイプ               | 説明                                                                                                                                    |
| ---------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `fixed`                | `object`            | `fixed` クエリーで返されるデータです。                                                                                                   |
| `fluid`                | `object`            | `fluid` クエリーで返されるデータです。                                                                                                   |
| `fadeIn`               | `bool`              | デフォルトでは画像読み込み時にフェードインします。                                                                                       |
| `durationFadeIn`       | `number`            | デフォルトではフェードインは 500ms に設定されています。                                                                                  |
| `title`                | `string`            | レンダリングされた `img` 要素に渡されます。                                                                                              |
| `alt`                  | `string`            | レンダリングされた `img` 要素に渡されます。デフォルトでは空文字列です。例：`alt=""`                                                      |
| `crossOrigin`          | `string`            | レンダリングされた `img` 要素に渡されます。                                                                                              |
| `className`            | `string` / `object` | ラッパーする要素に渡されます。Glamor の CSS プロパティを使用するにはオブジェクトが必要です。                                             |
| `style`                | `object`            | ラッパー要素のデフォルトスタイルに適用されます。                                                                                         |
| `imgStyle`             | `object`            | 実際の `img` 要素のデフォルトスタイルに適用されます。                                                                                    |
| `placeholderStyle`     | `object`            | `img` 要素のプレースホルダーのデフォルトスタイルに適用されます。                                                                         |
| `placeholderClassName` | `string`            | `img` 要素のプレースホルダーに渡されるクラス名です。                                                                                     |
| `backgroundColor`      | `string` / `bool`   | 色付き背景のプレースホルダーの設定です。true にすると、色に「ライトグレー」を使用します。有効な色文字列を渡すことができます。            |
| `onLoad`               | `func`              | フルサイズの画像が読み込まれたときに呼び出されるコールバックです。                                                                       |
| `onStartLoad`          | `func`              | フルサイズの画像の読み込みが開始されたときに呼び出されるコールバックで、指定された `{ wasCached: <boolean> }` パラメーターを取得します。 |
| `onError`              | `func`              | 画像の読み込みに失敗した場合に呼び出されるコールバックです。                                                                             |
| `Tag`                  | `string`            | ラッパー要素に使用される HTML タグです。デフォルトは `div` です。                                                                        |
| `objectFit`            | `string`            | `gatsby-image/withIEPolyfill` からインポートすると渡される、 `object-fit-images` のポリフィルです。デフォルトは `cover` です。           |
| `objectPosition`       | `string`            | `gatsby-image/withIEPolyfill` をインポートすると渡される `object-fit-images` のポリフィルです。デフォルトは `50% 50%` です。             |
| `loading`              | `string`            | ブラウザの遅延読み込み属性を設定します。`lazy`、`eager`、`auto`のいずれかを設定できます。デフォルトは `lazy` です。                      |
| `critical`             | `bool`              | 遅延読み込み動作のオプトアウトです。デフォルトは `false` です。この設定は非推奨ですので、代わりに `loading` を使用してください。         |

以下が使用例です。

```jsx
<Img
  fluid={data.file.childImageSharp.fluid}
  alt="Cat taking up an entire chair"
  fadeIn="false"
  className="customImg"
  placeholderStyle={{ `backgroundColor`: `black` }}
  onLoad={() => {
    // 読み込み中の処理
  }}
  onStartLoad={({ wasCached }) => {
    // 読み込み開始時の処理
    // オプションで wasCached (boolean) パラメータ
  }}
  onError={(error) => {
    // エラー時の処理
  }}
  Tag="custom-image"
  loading="eager"
/>
```
