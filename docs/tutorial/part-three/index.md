---
title: ネストしたレイアウトコンポーネントの作成
typora-copy-images-to: ./
disableTableOfContents: true
---

パート 3 へようこそ！

## このチュートリアルの内容は？

このパートでは、Gatsby プラグインと「レイアウト」コンポーネントの作成について学びます。

Gatsby プラグインは、Gatsby サイトに機能を追加するのに役立つ JavaScript パッケージです。Gatsby は拡張可能に設計されています。つまり、プラグインは Gatsby が行うほぼすべてを拡張および変更できます。

レイアウトコンポーネントは、複数のページで共有するサイトためのセクションです。たとえば、サイトには通常、共有ヘッダーとフッターを持つレイアウトコンポーネントがあります。その他に、レイアウトに追加する一般的なものとして、サイドバーやナビゲーションメニューがあります。例として、このページの上部のヘッダーは、gatsbyjs.org のレイアウトコンポーネントの一部です。

それでは、パート 3 を詳しくみていきましょう。

## プラグインの使用

おそらく、あなたはプラグインの概念には馴染みがあることでしょう。多くのソフトウェアシステムでは、カスタムプラグインを追加して、新しい機能を追加したり、ソフトウェアのコア機能を変更したりできます。Gatsby プラグインも同じように機能します。

コミュニティメンバー(あなたのような！)は、他の人が Gatsby サイトを構築するためのプラグイン（少量の JavaScript コード）を提供できます。

> すでに何百ものプラグインがあります！Gatsby [プラグインライブラリ](/plugins/)をご覧ください。

プラグインの目標は、簡単にインストールして使用できるようにすることです。おそらく、構築するほとんどすべての Gatsby サイトでプラグインを使用することになります。このチュートリアルの残りの部分の作業を通じて、プラグインをインストールして使うための練習をたくさんできます。

プラグインを使う最初の紹介として、Typography.js の Gatsby プラグインをインストールして実装します。

[Typography.js](https://kyleamathews.github.io/typography.js/) は、サイトのタイポグラフィ向けに全体の基本となるスタイルを生成する JavaScript ライブラリーです。ライブラリーには、Gatsby サイトで効率よく使用できるように[対応する Gatsby プラグイン](/packages/gatsby-plugin-typography/)があります。

### ✋ 新しい Gatsby サイトの作成

[パート 2](/tutorial/part-two/) で述べたように、この時点で、前のチュートリアルで使用したターミナルウィンドウとプロジェクトファイルを閉じて、デスクトップをクリアに保つことをお勧めします。次に、新しいターミナルウィンドウを開き、次のコマンドを実行して、`tutorial-part-three` というディレクトリーに新しい Gatsby サイトを作成し、この新しいディレクトリーに移動します。

```shell
gatsby new tutorial-part-three https://github.com/gatsbyjs/gatsby-starter-hello-world
cd tutorial-part-three
```

### ✋ `gatsby-plugin-typography` をインストールして設定する

プラグインを使用するには、インストールして、設定するという 2 つの主な手順があります。

1. `gatsby-plugin-typography` NPM パッケージをインストールします。

```shell
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```

> ヒント: Typography.js にはいくつかの追加パッケージが必要なため、それらの手順も含まれます。このような追加の必要なものは、それぞれのプラグインの「インストール」手順に記載されています。

2. プロジェクトのルートにあるファイル `gatsby-config.js` を次のように編集します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

`gatsby-config.js` は、Gatsby が自動的に認識するもう 1 つの特別なファイルです。これのファイルには、プラグインや他のサイト設定を追加します。

> [gatsby-config.js のドキュメント](/docs/gatsby-config/)を参照して、詳細は必要に応じてお読みください。

3. Typography.js には設定ファイルが必要です。`src` ディレクトリーに `utils` という新しいディレクトリーを作成します。次に、`typography.js` という新しいファイルを `utils` に追加し、次の内容をファイルにコピーします。

```javascript:title=src/utils/typography.js
import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography(fairyGateTheme)

export const { scale, rhythm, options } = typography
export default typography
```

4. 開発サーバーを起動します。

```shell
gatsby develop
```

サイトを読み込んだ後、Chrome 開発者ツールを使用して生成された HTML を検証すると、タイポグラフィプラグインで生成した CSS と一緒に `<head>` エレメント内の `<style>` に追加されていることを確認できます。

![typography-styles](typography-styles.png)

### ✋ コンテンツとスタイルに変更を加える

Typography.js によって生成された CSS の効果をよりよく確認できるように、以下を `src/pages/index.js` にコピーします。

```jsx:title=src/pages/index.js
import React from "react"

export default () => (
  <div>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </div>
)
```

サイトは次のようになります。

![no-layout](no-layout.png)

手早く改良してみましょう。多くのサイトでは、ページの真ん中に中央よせしたテキストが一列になっています。これを作成するには、`src/pages/index.js` 内の `<div>` に次のスタイルを追加します。

```jsx:title=src/pages/index.js
import React from "react"

export default () => (
  // highlight-next-line
  <div style={{ margin: `3rem auto`, maxWidth: 600 }}>
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </div>
)
```

![with-layout2](with-layout2.png)

すばらしい。初めての Gatsby プラグインをインストールして設定しました！

## レイアウトコンポーネントの作成

次に、レイアウトコンポーネントについて学習します。このパートの準備をするために、プロジェクトにいくつかの新しいページを追加します。about ページと contact ページを追加します。

```jsx:title=src/pages/about.js
import React from "react"

export default () => (
  <div>
    <h1>About me</h1>
    <p>I’m good enough, I’m smart enough, and gosh darn it, people like me!</p>
  </div>
)
```

```jsx:title=src/pages/contact.js
import React from "react"

export default () => (
  <div>
    <h1>I'd love to talk! Email me at the address below</h1>
    <p>
      <a href="mailto:me@example.com">me@example.com</a>
    </p>
  </div>
)
```

新しい about ページがどのように見えるか見てみましょう。

![about-uncentered](about-uncentered.png)

うーん。2 つの新しいページのコンテンツがインデックスページのように中央寄せされていると便利です。また、訪問者が各サブページを簡単に見つけてアクセスできるように、何らかのグローバルナビゲーションを用意しておくと便利です。

はじめてのレイアウトコンポーネントを作成して、これらの変更に取り組んできいきましょう。

### ✋ はじめてのレイアウトコンポーネントの作成

1. `src/components` に新しいディレクトリーを作成します。

2. `src/components/layout.js` に非常に基本的なレイアウトコンポーネントを作成します。

```jsx:title=src/components/layout.js
import React from "react"

export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    {children}
  </div>
)
```

3. この新しいレイアウトコンポーネントを `src/pages/index.js` ページコンポーネントにインポートします。

```jsx:title=src/pages/index.js
import React from "react"
import Layout from "../components/layout" // highlight-line

export default () => (
  <Layout> {/* highlight-line */}
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </Layout> {/* highlight-line */}
)
```

![with-layout2](with-layout2.png)

すばらしい、レイアウトが機能しています！インデックスページのコンテンツは中央寄せされたままです。

しかし、`/about/` または `/contact/` に移動してみてください。これらのページのコンテンツはまだ中央寄せされません。

4. レイアウトコンポーネントを `about.js` と `contact.js` にインポートします（前のステップで `index.js` に対して行ったように）。

この 1 つの共有レイアウトコンポーネントにより、すべての 3 つのページのコンテンツが中央に寄せられてます。

### ✋ サイトタイトルを追加する

1. 新しいレイアウトコンポーネントに次の行を追加します。

```jsx:title=src/components/layout.js
import React from "react"

export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    <h3>MySweetSite</h3> {/* highlight-line */}
    {children}
  </div>
)
```

3 つのページのいずれかにアクセスすると、同じタイトルが追加されます。たとえば、`/about/` ページは以下のようになります。

![with-title](with-title.png)

### ✋ ページ間にナビゲーションリンクを追加する

1. 以下をレイアウトコンポーネントファイルにコピーします。

```jsx:title=src/components/layout.js
import React from "react"
// highlight-start
import { Link } from "gatsby"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)
// highlight-end

export default ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    {/* highlight-start */}
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>MySweetSite</h3>
      </Link>
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </header>
    {/* highlight-end */}
    {children}
  </div>
)
```

![with-navigation2](with-navigation2.png)

これで、できあがりです！基本的なグローバルナビゲーションを備えた 3 ページのサイトができました。

_チャレンジ:_ 新しい「レイアウトコンポーネント」機能を使用して、ヘッダー、フッター、グローバルナビゲーション、サイドバーなどを Gatsby サイトに追加してみてください！

## 次は何ですか？

[チュートリアルのパート 4](/tutorial/part-four/) に進み、Gatsby のデータレイヤーについて学習し、プログラムによってページを作成します。
