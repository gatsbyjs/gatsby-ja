---
title: "WordPress サイトに画像を追加する"
---

### 概要

このチュートリアルでは、WordPress アカウントにある画像を自分の Gatsby サイトに取り込み、表示させるために、いくつかの画像プラグインとコンポーネントをインストールします。[Gatsby + WordPress デモサイト](https://using-wordpress.gatsbyjs.org/sample-post-1)では、チュートリアルを通して作ることができるサンプルを示しますが、このチュートリアルでは画像の追加に焦点を当てています。

### なぜこのチュートリアルを行うのですか？

画像は、人とコミュニケーションをとるためのもっとも美しく印象的な方法の 1 つであり、そして効果的で前向きなユーザーエクスペリエンスを作成するための重要な鍵になります。同時に、高品質の画像の読み込みは遅くなることがあり、それによってテキストボックスが飛び回って見えることもあります。どちらの場合も、訪問者はあなたのサイトへアクセスすることに抵抗を覚えてしまいます。

画像を生成する Gatsby Way™ は、画像のパフォーマンスと応答性を最適化して、サイトの速度を低下させることなく画像の持つ素晴らしいメリットを得るための、一連のベストプラクティスを提供します。この[Gatsbygram サイト](https://gatsbygram.gatsbyjs.org/)（Gatsby を介して表示される Instagram フィード）は、svg 画像へのベクトル化の例を示しています。[画像処理デモサイト](https://image-processing.gatsbyjs.org/)では、Gatsby サイトで画像を楽しむ方法を探すことができます。

### `gatsby-source-wordpress` プラグインのインストール

はじめに、サイトに画像を取り込む準備ができている画像を含む `gatsby-source-wordpress` プラグインをインストールする必要があります。

新しい Gatsby プロジェクトを作成し、作成したディレクトリーに移動します。

```shell
gatsby new images-tutorial-site
cd images-tutorial-site
```

`gatsby-source-wordpress` プラグインをインストールします。このチュートリアルに含まれていない GraphQL クエリのプラグインの機能と使用例に関する情報は、[`gatsby-source-wordpress` プラグインの README ファイル](/packages/gatsby-source-wordpress/?=wordpress)を参照してください。

```shell
npm install --save gatsby-source-wordpress
```

次のコードを使用して、`gatsby-config.js` に `gatsby-source-wordpress` を追加します。このコードは、[デモサイトのソースコード](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-wordpress/gatsby-config.js)にもあります。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Gatsby WordPress Tutorial",
  },
  plugins: [
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Gatsby のデータ処理レイヤープラグインは、「source」という文字で始まります。
     * ここでは、WordPress からデータを取得しています。
     */
    // highlight-start
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * ベースとなるURLは、プロトコルと末尾のスラッシュを省略してください。これは必須です。
         * 例：'dev-gatbsyjswp.pantheonsite.io' あるいは 'www.example-site.com'
         */
        baseUrl: `dev-gatbsyjswp.pantheonsite.io`,
        // プロトコル。http もしくは https が可能です。
        protocol: `http`,
        // サイトがwordpress.comでホストされているかを示します。
        // false の場合、サイトは自ホストであると想定されます。
        // true の場合、プラグインは JSON REST API V2 を使用してwordpress.comから取得します。
        // もし、あなたのサイトが wordpress.org でホストされている場合、false を選択してください。
        hostingWPCOM: false,
        // useACFがtrueの場合、ソースプラグインは WordPress ACF プラグインのコンテンツをインポートしようとします。
        // この機能は、wordpress.com でホストされているサイトではテストされていません。
        useACF: true,
      },
    },
    // highlight-end
  ],
}
```

### 画像に役立つプラグインのインストール

次に、`gatsby-config.js`に`gatsby-transformer-sharp`と`gatsby-plugin-sharp`プラグインをインストールして、GraphQL クエリをページに追加し、ページに画像を追加してから、ブラウザーで結果を表示する必要があります。

はじめに、いくつかのプラグインとその依存関係をインストールする必要があります。

```shell
npm install --save gatsby-transformer-sharp gatsby-plugin-sharp gatsby-image
```

これらのプラグインを次の`gatsby-config.js`のように記述します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: "Gatsby WordPress Tutorial",
  },
  plugins: [
    // https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
    /*
     * Gatsby のデータ処理レイヤープラグインは、「source」という文字で始まります。
     * ここでは、WordPress からデータを取得しています。
     */
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * ベースとなるURLは、プロトコルと末尾のスラッシュを省略してください。これは必須です。
         * 例： 'dev-gatbsyjswp.pantheonsite.io' あるいは 'www.example-site.com'
         */
        baseUrl: `dev-gatbsyjswp.pantheonsite.io`,
        // プロトコル。http もしくは https が可能です。
        protocol: `http`,
        // サイトが wordpress.com でホストされているかを示します。
        // false の場合、サイトは自ホストであると想定されます。
        // true の場合、プラグインは JSON REST API V2 を使用して wordpress.com から取得します。
        // もし、あなたのサイトが wordpress.org でホストされている場合、falseを選択してください。
        hostingWPCOM: false,
        // useACF が true の場合、ソースプラグインは WordPress ACF プラグインのコンテンツをインポートしようとします。
        // この機能は、wordpress.com でホストされているサイトではテストされていません。
        useACF: true,
      },
    },
    // highlight-start
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    // highlight-end
  ],
}
```

### WordPress から画像を取り込む GraphQL クエリを作成する

これで、GraphPress クエリを作成して、WordPress サイトから画像を取り込む準備ができました。

起動：

```shell
npm run develop
```

localhost:8000 と localhost:8000/\_\_\_graphql を開いてください。

特定の幅と高さの画像を生成する例を次に示します。

```graphql
{
  allWordpressPost {
    edges {
      node {
        childWordPressAcfPostPhoto {
          photo {
            localFile {
              childImageSharp {
                # 「width」と「height」の値を変更してみてください。
                resolutions(width: 200, height: 200) {
                  # GraphQL エクスプローラーでは、「src」のようなフィールド名を
                  # 使用してください。あなたのサイトのコードでは、それらは削除し、
                  # Gatsby から提供されているフラグメントを使用してください。
                  src

                  # このフラグメントは GraphQL エクスプローラーでは動きませんが、
                  # あなたのサイトでは利用することができます。
                  # ...GatsbyImageSharpResolutions_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
}
```

さまざまなサイズの画像を生成するためのクエリの例を次に示します。

```graphql
{
  allWordpressPost {
    edges {
      node {
        childWordPressAcfPostPhoto {
          photo {
            localFile {
              childImageSharp {
                # サイズが変更された画像を生成するために、「maxWidth」の値を編集してみてください。
                fluid(maxWidth: 500) {
                  # GraphQL エクスプローラーでは、「src」のようなフィールド名を
                  # 使用してください。あなたのサイトのコードでは、それらは削除し、
                  # Gatsby から提供されているフラグメントを使用してください。
                  src

                  # このフラグメントは GraphQL エクスプローラーでは動きませんが、
                  # あなたのサイトでは利用することができます。
                  # ...GatsbyImageSharpResolutions_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
}
```

どちらの場合でも、それぞれのフラグメントの末尾に`_tracedSVG`を追加することで、ベクトル化された SVG サポートを追加できます。_これは GraphQL エクスプローラーでは機能しないことに注意してください。_

### `index.js`に画像を表示させる

`index.js`に次のようにクエリを追加します。

```jsx:title=src/pages/index.js
import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const IndexPage = ({ data }) => {
  const imagesResolutions = data.allWordpressPost.edges.map(
    edge =>
      edge.node.childWordPressAcfPostPhoto.photo.localFile.childImageSharp
        .resolutions
  )
  return (
    <div>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {imagesResolutions.map(imageRes => (
        <Img resolutions={imageRes} key={imageRes.src} />
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          childWordPressAcfPostPhoto {
            photo {
              localFile {
                childImageSharp {
                  # サイズが変更された画像を生成するために「maxWidth」の値を編集してください。
                  resolutions(width: 500, height: 500) {
                    ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
```

デモサイトは次のようになります。

![デモサイトの例](./images/wordpress-image-tutorial.gif)

### 画像の読み込み速度とエフェクトをテストする

ブラウザーを意図的に遅くして、イメージエフェクトのアニメーションをよりゆっくりと表示するのは便利で面白い場合があります。

ブラウザーコンソールを開き、ネットワーク速度をより遅い速度に変更します。Chrome では、「Network」タブをクリックして、「Online」という文字の横にあるドロップダウンアイコンをクリックします。次に「Slow 3G」をクリックします。Network タブには、各イメージがロードされた時間とロードにかかった時間に関する統計も表示されます。

![Network](./images/network.png)

![Slow 3G](./images/slow-3g.png)
