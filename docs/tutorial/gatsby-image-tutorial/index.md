---
title: Gatsby-Image をサイトで使う
---

## このチュートリアルには何が含まれていますか？

このチュートリアルを終わりには、以下のことができるようになります：

- レスポンシブ画像に対応した `gatsby-image` の使い方について学ぶ。
- GraphQL を用いて単一の画像を照会する。
- YAML ファイルを通して複数の画像を取得する。
- 一般的なエラーのトラブルシューティングの方法について学ぶ。

## 前提条件

このチュートリアルはすでに Gatsby のプロジェクトが実行されていて、そのページにレンダリングしたい画像があることを前提としています。Gatsby サイトをセットアップする方法は[メインチュートリアル](/tutorial/)または[クイックスタート](/docs/quick-start/)をご覧ください。

このチュートリアルでは、`gatsby-image` 、GraphQL や Gatsby のデータレイヤーを用いてレスポンシブ画像を最適化する React コンポーネントをセットアップする方法を学びます。

> _ヒント: このチュートリアルでは、YAML ファイルに保存されている静的なコンテンツを使用していますが、同様の方法をマークダウンファイルでも使用できます。_

## 入門

Gatsby の画像最適化は信じられないほど良いパフォーマンスを発揮する `gatsby-image` と呼ばれるプラグインによって提供されます。

### ステップ 1

npm を使って、 `gatsby-image` プラグインとそれと依存関係にあるプラグインをインストールします。

```bash
npm install gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

### ステップ 2

新たにインストールしたプラグインを `gatsby-config.js` ファイルに追加します。ファイルは最終的に以下のようになります（すでに使用されている他のプラグインは省略しています）。

> _ヒント: `gatsby-image` はインストール後、`gatsby-config.js` に追加する必要はありません。_

```javascript:title=gatsby-config.js
plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`]
```

## Gatsby-image の構成

これで、`gatsby-image` を使えるように設定されました。

### ステップ 3

画像ファイルを置く場所を決めてください。この例では、`src/data` に置いてあります。

もし、プロジェクトがこのディレクトリー内のコンテンツを表示させる設定をまだ行なっていない場合は、次の 2 つを実行してください。

1.  `gatsby-source-filesystem` をインストールしてください。ヒント: プロジェクトを `gatsby new <name>` を使用して作成した場合は、この最初の手順はすでにデフォルトスターターを経由して実行されています。

```bash
npm install gatsby-source-filesystem
```

2. 次に `gatsby-config.js` でただしくフォルダーの指定がされているかを確認してください。この例では、以下のようになります:

```javascript:title=gatsby-config.js
plugins: [
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  { resolve: `gatsby-source-filesystem`, options: { path: `./src/data/` } },
]
```

これで、`gatsby-image` を使って作業を始める準備が整いました！

## ステップ 4

次のステップはあなたが達成しようとしていることによって異なります。

## 単一画像のデータのクエリー

画像ファイルを直接クエリーするために `graphql` を使用します。画像ファイルを相対パスに含めることで、`gatsby-image` によってそのファイルを処理する方法を指定できます。

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

### 画像の相対パスと `gatsby-config.js`

相対パスと聞いて、コードが置かれているファイルに対応する相対パス（この場合は index.js）であると予想するかもしれません。しかし、それは違います。相対パスは実際には `gatsby-source-filesystem` に配置したコードの設定に基づき、ここでは `src/data` を指します。

### 画像のフラグメント

このクエリーについてもう 1 つ注意すべき点は、固定された幅と高さを持つ画像を返すフラグメント `GatsbyImageSharpFluid` の使い方です。この特定の大きさに合わせる方法の代わりに、コンテナを埋めるスケーラブルな画像を作るフラグメント `GatsbyImageSharpFluid` を使う事ができます。`gatsby-image` では、_fluid_ な画像は、_fixed_ な画像が固定されているのに対して、画面に応じたサイズを持っていない画像を意味します。

クエリーは、`gatsby-image` コンポーネントで利用可能な形式に処理された画像を含むデータオブジェクトを返します。その結果は自動的にコンポーネントに渡され、`data` prop に添付されます。それから、JSX を用いて画像を表示し、レスポンシブで高いパフォーマンスの HTML を自動的に出力します。

画像を表示するためにはまず、`gatsby-image` が提供するコンポーネントをインポートします。

```jsx
import Img from "gatsby-image"
```

これで使用できます。画像のキーは、画像が処理された方法と一致させることに注意してください。この例では `fixed` を用いています。

```jsx
<Img
  className="headshot"
  fixed={data.file.childImageSharp.fixed}
  alt="headshot"
/>
```

こちらはクエリーと使用方法を全てまとめたものです。

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

## YAML から複数の画像をクエリーする方法

画像を参照する別の方法には YAML（やマークダウン）を使う方法があります。この例では、YAML ファイルをクエリーする `gatsby-transformer-yaml` プラグインを使用します。このプラグインについて詳しく知りたい場合は [Gatsby プラグインライブラリー]をご覧ください。

こちらは YAML ファイルにあるカンファレンスとそれぞれの画像のリストのクエリーの例です。

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

この場合、クエリーは `gatsby-config.js` に参照されている `src/data` ファイルにある `speakeing.yaml` のデータを探して `graphql` を含めるために `allSpeakingYaml` で開始しています。


## YAML をソースとする画像のレンダリング

YAML データの画像を参照するために、相対パスが正確であるかどうかを確認してください。それぞれの画像のパスは `yaml` ファイルが示している位置と相対的になっているべきです。そして、それらのファイル全ては `gatsby-config-js` に設定済みの `gatsby-source-filesystem` のディレクトリーの中にある必要があります。

YAML ファイルの中はこのようになっているでしょう。

```yaml
- image: speaking/kcdc.jpg
```

これで、クエリーを作成できます。前述した単一の画像の例と同じように、あなたはクエリーの中の `gatsby-image` の機能を使えます。クエリーを実行すると、相対パスは画像ファイルの位置を示し、結果としてクエリーは表示するための画像としてファイルを処理します。

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

画像が配列の一部として保存されるので、JSX の中で JavaScript の `map` 関数を使ってアクセスできます。

```jsx
<Img
  className="selfie"
  fluid={node.image.childImageSharp.fluid}
  alt={node.conference}
/>
```

## 静的クエリーを使う

もしあなたのクエリーが再利用可能なコンポーネントである場合、静的なクエリーフックを使うことができます。これを行うために必要なコードは前述した単一画像の使用例とほとんど同じです。

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

上記の最初のセクションのように結果を参照するクエリー定数とデータの代わりに、JSX のコードに直接 `useStaticQuery` フックを置くことで `Img` コンポーネントの結果を参照できます。クエリー言語は変更せずに `Img` タグの構文でもないことに注意してください。唯一の変更はクエリーの位置とクエリーをラップする関数 `useStaticQuery` を使用していることです。

## 複数のクエリーとエイリアス

あなたが出くわすかもしれない最後のユースケースは、同じファイル/ページに複数のクエリーがある状況を処理する方法です。

この例では、最初の例の `speaking.yaml` の全てのデータとダイレクトファイルのクエリーをクエリーすることを試みます。これを行うためには GraphQL のエイリアスを使います。

最初に知っておくべきことはエイリアスがクエリーに名前を割り当てているということです。2 つ目にエイリアスはオプションですが、あなたの人生を楽にするということです。以下に例を示します。

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

これを行うと、JSX コードの再利用可能なクエリーオブジェクトへの参照が変化します。以前はこのように参照されていました。

```jsx
{
  data.allSpeakingYaml.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

エイリアスを与えてもオブジェクトのレスポンスへの複雑さのレベルは追加されず、単に置き換わるだけです。このように参照された同じ構成になります（エイリアスは `allSpeakingYaml` ではなく、`talks` に置き換わっていることに注意してください）。

```jsx
{
  data.talks.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

トップレベルにある `data`というオブジェクトは暗黙の値です。これは単一のコンポーネントの一部として複数のクエリーを実行するとき、Gatsby は結果全体をコンポーネントに渡すため重要です。

コンポーネントのデータの流れの例を以下に示します。

```jsx
const SpeakingPage = ({ data }) => {}
```

その他の全てはトップレベルの戻り値から参照されます。

これを理解すると、あなたは画像を参照する 2 つのクエリーを組み合わせたり、エイリアスを利用してそれらを区別できます。

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

この例では一方のクエリーではエイリアスを使用し、他のクエリーでは使用していないということに注意してください。これは許可されています。全てのクエリーでエイリアスを使用する必要はありません。この場合、JSX は `speaking.yaml` のコンテンツにアクセスするため、このように見えます。

```jsx
{
  data.allSpeakingYaml.edges.map(({ node }) => (
    <Img fluid={node.image.childImageSharp.fluid} alt={node.alt} />
  ))
}
```

そしてこのように `banner` というエイリアスを使って画像にアクセスします。

```jsx
<Img fluid={data.banner.childImageSharp.fluid} />
```

これらの例はかなりの数のユースケースを処理する必要があります。以下はいつくかのボーナスです：

## アスペクト比

`gatsby-image` はアスペクト比を設定し、画像の比率を制限する機能を持っています。これは fixed や fluid に関わらず、処理された画像に使用できます。

```jsx
<Img sizes={{ ...data.banner.childImageSharp.fluid, aspectRatio: 21 / 9 }} />
```

この例では fluid の画像データとともに `aspectRatio` オプションを `Img` コンポーネントに指定して `sizes` オプションを使用しています。この処理は `gatsby-plugin-sharp` が可能にしています。

## ボーナスエラー

エラーに気をつけてください。もし画像処理を `fixed` から `fluid` に変更したら、このようなエラーが表示されるかもしれません。

![画像キャッシュエラーメッセージ](./ErrorMessage.png)

見た目に関わらず、これを解決するためには実際にキャッシュを削除する必要はありません。実際には、互換性のない参照に関係しています。これはおそらくクエリーの画像の処理を `fluid` に変更したが 、JSX のキーは `fixed` にセットされたまま、もしくはその逆だからです。

## 最後に

以上です。この投稿には多くの異なるユースケースが含まれるため、これらすべてを調査する必要があるとは思わないでください。実際に該当する例とヒントを選択してください。

## その他の資料

- [Gatsby Image API ドキュメント](/docs/gatsby-image/)
- [Gatsby Image の使用](/docs/using-gatsby-image/)
- [Gatsby のその他の画像とメディアのテクニック](/docs/images-and-files/)
