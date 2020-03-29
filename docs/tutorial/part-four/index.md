---
title: Gatsby におけるデータ
typora-copy-images-to: ./
disableTableOfContents: true
---

チュートリアルの第 4 章へようこそ！まだ道半ばです！Gatsby を快適に感じ始められることを願っています。

## チュートリアルの前半のまとめ

ここまで、React の使い方と、ウェブサイトを構築する部品として機能する _独自の_ コンポーネントを作成できる強力さについて学んできました。

また、CSS Modules によるコンポーネントのスタイル付けについても調査しました。

## このチュートリアルでは何をするの？

この章を含めた次の 4 つのチュートリアルでは、Markdown、WordPress、ヘッドレス CMS、その他データソースから簡単にサイトをビルドすることを可能にするという Gatsby の強力な特徴である、データ層について学んでいきます。

**ヒント**: Gatsby のデータ層には GraphQL が用いられています。GraphQL について深く学びたい場合は [How to GraphQL](https://www.howtographql.com/) をおすすめします。

## Gatsby におけるデータ

ウェブサイトは HTML、CSS、JavaScript、そしてデータによって構成されています。チュートリアルの前半ではそれらの最初の 3 つにフォーカスしました。今回はデータを Gatsby のサイトでどのように使うかを学びましょう。

**データとは？**

コンピュータサイエンス的な答えはこうでしょう。「データとは `"文字列"` 、
整数値 (`42`)、 オブジェクト (`{ pizza: true }`) などのこと」。

しかし Gatsby で使われるという目的において、より適切な答えは「React のコンポーネントの外にある全てのもの」となります。

ここまで、あなたはコンポーネントの中に*直接*テキストを書いたり、画像を追加したりしてきました。たくさんのウェブサイトを構築する素晴らしい方法です。
しかし、多くの場合は、それらのデータをコンポーネントの*外側*に置いて必要に応じてコンポーネントの*内側*に持ってくることが望まれるでしょう。

もしあなたのウェブサイトが複数人で編集やメンテナンスするために WordPress と Gatsby によって構築されている場合、ページや投稿などのサイトのデータを WordPress 上から*取り込ん*で、それらを必要に応じて Gatsby 上のコンポーネントに渡すような運用が行えます。

データは Markdown や CSV などの形式はもちろん、あらゆる種類のデータベースや API が使用可能です。

**Gatsby のデータ層はこれらの（そしてそれ以外の）データソースからコンポーネントに直接、** あなたの欲しい形や形式でデータを取り込むことを可能にします。

## 非構造化データと GraphQL を使用する

### Gatsby のサイトにデータを取り込むために GraphQL とデータソースごとのプラグインを使用しなければならないのですか？

そんなことはありません！GraphQL データ層を使わずに、 `createPages` API を使用して非構造化データを Gatsby のサイトに直接取り込むこともできます。これは小規模なサイトに適した選択であると同時に、さらに複雑なサイトにおいて時間を節約するために GraphQL とデータソースごとのプラグインを使用することもできます。

[Using Gatsby without GraphQL](/docs/using-gatsby-without-graphql/) で `createPages` API を使用して Gatsby のウェブサイトにデータを取り込む方法を学んだり、デモサイトを見たりできます。

### 非構造化データと GraphQL をいつ使用するか？

小規模なウェブサイトを構築する場合、このガイドにあるような非構造化データを取り込む効率的なやり方のひとつは、`createPages` API を使用することです。のちにサイトがさらに複雑になった場合、より複雑なサイトを構築する場合、もしくはデータを変換したい場合には以下のステップを実行しましょう。

1.  [プラグインライブラリ](/plugins/)をチェックして、使いたいソースプラグインやトランスフォーマープラグインがすでに存在するかチェックします。
2.  存在しなかった場合、[プラグインの作成](/docs/creating-plugins/) ガイドを読んで独自のプラグインの作成を検討します。

### GraphQL を用いた Gatsby のデータ層でコンポーネントにデータを取り込む方法

<<<<<<< HEAD
React コンポーネントにデータを取り込む方法にはさまざまな選択肢があります。そのうちのもっとも人気でパワフルな技術のひとつに [GraphQL](http://graphql.org/) があります。
=======
There are many options for loading data into React components. One of the most
popular and powerful of these is a technology called
[GraphQL](https://graphql.org/).
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

GraphQL は、必要なデータをプロダクトエンジニアがコンポーネントに取り込むのを助けるために Facebook によって開発されました。

GraphQL は **q**uery **l**anguage です（名前の _QL_ の部分）。もし SQL に慣れていれば、とても似たように使うことができます。専用の構文を使用し、コンポーネントでどんなデータ欲しいか記述すればその通りにデータが提供されます。

Gatsby は GraphQL を使ってコンポーネントが必要なデータを宣言できるようにします。

## 新しいデモサイトを作る

この章ではもうひとつ新しいサイトを作成します。「Pandas Eating Lots」という Markdown のブログです。パンダが食べ物をたくさん食べている最高の写真とビデオを披露することに専念します。途中で、Gatsby の Markdown サポートと GraphQL に足を踏み入れることになります。

新しいターミナルのウィンドウを開いて以下のコマンドを実行し、`tutorial-part-four` という名前のディレクトリに Gatsby の新規サイトを作成します。
新しいディレクトリに移動したら以下を実行します。

```shell
gatsby new tutorial-part-four https://github.com/gatsbyjs/gatsby-starter-hello-world
cd tutorial-part-four
```

次に必要な依存ライブラリをプロジェクトルートにインストールします。タイポグラフィーテーマの "Kirkham" を使用し、["Emotion"](https://emotion.sh/) という CSS-in-JS ライブラリを試します。

```shell
npm install --save gatsby-plugin-typography typography react-typography typography-theme-kirkham gatsby-plugin-emotion @emotion/core
```

チュートリアルの[3 章](/tutorial/part-three)で終えたものと同様のサイトをセットアップします。このサイトには 1 つのレイアウトコンポーネントと 2 つのページコンポーネントがあります。

```jsx:title=src/components/layout.js
import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

export default ({ children }) => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
  >
    <Link to={`/`}>
      <h3
        css={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          font-style: normal;
        `}
      >
        Pandas Eating Lots
      </h3>
    </Link>
    <Link
      to={`/about/`}
      css={css`
        float: right;
      `}
    >
      About
    </Link>
    {children}
  </div>
)
```

```jsx:title=src/pages/index.js
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Amazing Pandas Eating Things</h1>
    <div>
      <img
        src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
        alt="Group of pandas eating bamboo"
      />
    </div>
  </Layout>
)
```

```jsx:title=src/pages/about.js
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>About Pandas Eating Lots</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
)
```

```javascript:title=src/utils/typography.js
import Typography from "typography"
import kirkhamTheme from "typography-theme-kirkham"

const typography = new Typography(kirkhamTheme)

export default typography
export const rhythm = typography.rhythm
```

`gatsby-config.js`（`src/` 以下ではなくプロジェクトルートにある必要があります）

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

上記のファイルを追加し、いつも通り `gatsby develop` を実行すると以下のものが表示されるでしょう。

![start](start.png)

レイアウトと 2 つのページをもつもうひとつのサイトがあります。

これでクエリを使い始める準備が整いました。

## はじめての GraphQL query

サイトを構築するとき、例えば _サイトのタイトル_ のようなデータを再利用したくなることがあるでしょう。 `/about/` ページを見てください。 レイアウトコンポーネント（サイトヘッダー）と `about.js`（ページヘッダー）の `<h1 />` の両方にサイトタイトル（`Pandas Eating Lots`）があることに気付きます。

しかし、将来サイトのタイトルを変更したくなった場合はどうでしょうか？全てのコンポーネントのタイトルを検索してそれぞれの中身を書き換える必要があります。特に大規模で複雑なサイトであれば、面倒な上エラーが発生しやすくなります。代わりに、タイトルを一箇所に保管して他のファイルから参照できます。一箇所のタイトルを変更すれば、Gatsby はそれを参照しているファイルに更新されたタイトルを _取り込み_ ます。

これらの一般的なデータの場所は、`gatsby-config.js` ファイル内の `siteMetadata` オブジェクトです。サイトのタイトルを `gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
module.exports = {
  // highlight-start
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  // highlight-end
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

開発用サーバーを再起動します。

### ページクエリを使用する

サイトのタイトルのクエリでの取得が可能になりました。[page query](/docs/page-query) を使用してそれを `about.js` ファイルに追加します。

```jsx:title=src/pages/about.js
import React from "react"
import { graphql } from "gatsby" // highlight-line
import Layout from "../components/layout"

// highlight-next-line
export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1> {/* highlight-line */}
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
)

// highlight-start
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
// highlight-end
```

うまくいきました。

![siteMetadataから取得したページタイトル](site-metadata-title.png)

上記の `about.js` の変更で `title` を取得する基礎的な GraphQL クエリは次のとおりです。

```graphql:title=src/pages/about.js
{
  site {
    siteMetadata {
      title
    }
  }
}
```

> 💡[part five](/tutorial/part-five/#introducing-graphiql) では、GraphQL を介して利用可能なデータをインタラクティブに調査し、上記のようなクエリを作成するのに役立つツールを使用します。

ページクエリは、コンポーネント定義の外側に存在し（ページコンポーネントファイルの最後に記述する慣習があります）、ページコンポーネントでのみ使用可能です。

### StaticQuery を使用する

StaticQuery は Gatsby v2 で導入された新しい API で、ページコンポーネント以外のコンポーネント（`layout.js`コンポーネントなど）が GraphQL クエリでデータを取得できるようにします。
新しく導入された hook 版（[`useStaticQuery`](/docs/use-static-query/)）を使用しましょう。

先に進みましょう。`useStaticQuery` hook を使用し、 `{data.site.siteMetadata.title}` が使用するそれらのデータを参照するために `src/components/layout.js` へいくらかの修正を加えましょう。完了したら、ファイルは次のようになります。

```jsx:title=src/components/layout.js
import React from "react"
import { css } from "@emotion/core"
// highlight-next-line
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
// highlight-start
export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    // highlight-end
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title} {/* highlight-line */}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
      {children}
    </div>
    // highlight-start
  )
}
// highlight-end
```

おめでとうございます。

![siteMetadataから取得したページタイトルとレイアウトタイトル](site-metadata-two-titles.png)

ふたつの異なるクエリを使用したのはなぜでしょうか？これらの例は、クエリの種類、形式、および使用できる場所を簡単に紹介したものです。今のところ、ページのみがページクエリを実行できることに注意してください。レイアウトのようなページコンポーネント以外のコンポーネントは、StaticQuery を使用できます。チュートリアルの 7 章では、これらについて詳しく説明しています。

では、本来のタイトルに戻しましょう。

Gatsby の基本原則のひとつに、*クリエイターは自分が作ったものとすぐに繋がる必要がある*というものがあります ([hat tip to Bret Victor](http://blog.ezyang.com/2012/02/transcript-of-inventing-on-principle/))。つまり、コードを変更すればその変更の効果がすぐにわかるはずです。 Gatsby の入力を操作すれば、画面に新しい出力が表示されます。

そのため、加えた変更がほとんどすべての場所ですぐに有効になります。 `gatsby-config.js` ファイルを再度編集し、今回は `title` を「Pandas Eating Lots」に戻します。変更はサイトのページにすぐに表示されるはずです。

![どちらのタイトルも「Pandas Eating Lots」](pandas-eating-lots-titles.png)

## 次は何を？

チュートリアルの [5 章](/tutorial/part-five/)では、ソースプラグインを使用した GraphQL を使用して Gatsby サイトにデータを取り込む方法について学習します。
