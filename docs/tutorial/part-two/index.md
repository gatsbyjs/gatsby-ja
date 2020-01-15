---
title: Gatsby のスタイリング入門
typora-copy-images-to: ./
disableTableOfContents: true
---

<!-- アイデア: 参照する用語集を作成します。これらの用語の多くは混乱します -->

<!--
  - グローバルスタイル
  - コンポーネント css
  - CSS-in-JS
  - CSS Modules

-->

Gatsby チュートリアルのパート 2 へようこそ！

## このチュートリアルの内容は？

このパートでは、Gatsby Web サイトのスタイリングのオプションを詳しくみていき、React コンポーネントを使用してサイトを構築する方法について詳しく説明していきます。

## グローバルスタイルの使用

すべてのサイトには、ある種のグローバルなスタイルがあります。これには、サイトのタイポグラフィや背景色などを含みます。これらのスタイルは、サイト全体の雰囲気を設定します。壁の色や質感が部屋の全体的な雰囲気を設定するのに似ています。

### 標準的な CSS ファイルを使用してグローバルスタイルを作成する

グローバルなスタイルをサイトに追加するもっとも簡単な方法の 1 つは、グローバルな `.css`スタイルシートを使用することです。

#### ✋ 新しい Gatsby サイトの作成

新しい Gatsby サイトを作成することから始めます。[パート 1](/tutorial/part-one/)で使用したターミナルウィンドウを閉じて、パート 2 の新しいターミナルセッションを開始するのがよいでしょう（特にコマンドラインを初めて使う方の場合）。

新しいターミナルウィンドウを開き、新しい"hello world"という gatsby サイトを作成して、開発サーバーを起動します。

```shell
gatsby new tutorial-part-two https://github.com/gatsbyjs/gatsby-starter-hello-world
cd tutorial-part-two
```

次の構成の新しい Gatsby サイト（Gatsby の"hello world"スターターに基づいた）が作成されました。

```text
├── package.json
├── src
│└── pages
│└── index.js
```

#### ✋ CSS ファイルにスタイルを追加する

1. 新しいプロジェクトに`.css`ファイルを作成します。

```shell
cd src
mkdir styles
cd styles
touch global.css
```

> ヒント: 必要に応じて、コードエディターを使用してこれらのディレクトリーとファイルを作成してください。

これで、次のような構造になります。

```text
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
```

2. `global.css`ファイルにいくつかのスタイルを定義します。

```css:title=src/styles/global.css
html {
  background-color: lavenderblush;
}
```

> ヒント: 例の css ファイルを `/src/styles/` フォルダーに配置するのは任意です。

#### ✋️ `gatsby-browser.js`にスタイルシートをインクルード

1. `gatsby-browser.js`を作成

```shell
cd ../..
touch gatsby-browser.js
```

プロジェクトのファイル構造は次のようになります。

```text
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
├── gatsby-browser.js
```

> 💡 `gatsby-browser.js`とは何でしょうか？まだこのファイルについてあまり気にする必要はありません。今のところ、`gatsby-browser.js`は（存在する場合）Gatsby が探して使用するいくつかの特別なファイルの 1 つであるということだけ留意しておいてください。ここでは、ファイルの命名が**重要**です。もっと詳しく知りたい場合は、[ドキュメント](/docs/browser-apis/)をご覧ください。

2. 先ほど作成したスタイルシートを`gatsby-browser.js`ファイルにインポートします。

```javascript:title=gatsby-browser.js
import "./src/styles/global.css"

// or:
// require('./src/styles/global.css')
```

> ヒント: CommonJS（`require`）と ES モジュール（`import`）の両方の構文がここで機能します。どちらを選択するかわからない場合は、通常、 `import`がデフォルトとして適切です。ただし、Node.js 環境でのみ実行するファイル（`gatsby-node.js`など）を使用する場合は、`require`を使用する必要があります。

3. 開発サーバーを起動します。

```shell
gatsby develop
```

ブラウザーでプロジェクトを表示すると、ラベンダーの背景が適用された"hello world"スターターを確認できます。

![Lavender Hello World!](global-css.png)

> Tip: チュートリアルのこのパートでは、Gatsby サイトのスタイリングを開始するためにもっとも早く、もっとも簡単な方法に焦点を当てています。つまり、 `gatsby-browser.js`を使用して標準 CSS ファイルを直接インポートします。ほとんどの場合、グローバルスタイルを追加する最良の方法は、共有レイアウトコンポーネントを使用します。そのアプローチの詳細について[ドキュメントをご覧ください](/docs/global-css/)。

## コンポーネントスコープの CSS の使用

これまで、標準的な CSS スタイルシートを使用して、より伝統的なアプローチについて説明してきました。次に、CSS をモジュール化してコンポーネント指向の方法でスタイリングに取り組むさまざまな方法について説明します。

### CSS Modules

**CSS Modules**を詳細にみてみましょう。以下から引用します。
[CSS Modules のホームページ](https://github.com/css-modules/):

> **CSS Module モジュール**は、すべてのクラス名とアニメーション名を含む CSS ファイルで、
> デフォルトでスコープをローカルにします。

CSS Modules は非常に人気があります。CSS Modules を使用すると、CSS を通常どおり作成でき、はるかに安全性が高いからです。このツールは、一意のクラス名とアニメーション名を自動的に生成するため、セレクター名の衝突を心配する必要がありません。

Gatsby は、CSS Modules をすぐに使用できます。このアプローチは、はじめて Gatsby（および React 全般）を使用して構築する方に強くお勧めします。

#### ✋ CSS Modules を使用して新しいページを作成

このセクションでは、CSS Modules を使用して、新しいページコンポーネントを作成し、そのページコンポーネントのスタイルを設定します。

最初に、新しい`Container`コンポーネントを作成します。

1. `src/components`に新しいディレクトリーを作成し、この新しいディレクトリーに`container.js`という名前のファイルを作成して、次を貼り付けます。

```jsx:title=src/components/container.js
import React from "react"
import containerStyles from "./container.module.css"

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
```

`container.module.css`という名前の css module ファイルをインポートしていることに気づいたことでしょう。そのファイルを作成しましょう。

2. 同じディレクトリ（`src/components`）で、`container.module.css`ファイルを作成し、以下をコピーして貼り付けします。

```css:title=src/components/container.module.css
.container {
  margin: 3rem auto;
  max-width: 600px;
}
```

ファイル名が通常の`.css`ではなく`.module.css`で終わっていることに気付いたことでしょう。これは、この CSS ファイルをプレーンな CSS ではなく CSS module として処理する必要があることを Gatsby に伝えます。

3. 次のファイルに新しいページコンポーネント作成します。
   `src/pages/about-css-modules.js`:

```jsx:title=src/pages/about-css-modules.js
import React from "react"

import Container from "../components/container"

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
  </Container>
)
```

これで、`http://localhost:8000/about-css-modules/`にアクセスすると、ページは次のようになります。

![CSS module スタイルのページ](css-modules-basic.png)

#### ✋ CSS Modules を使用してコンポーネントのスタイルを設定

このセクションでは、名前、アバターと短いラテン語の経歴（Lorem Ipsum - ダミーテキスト）を含む人々のリストを作成します。`<User />`コンポーネントと CSS モジュールを使用したスタイルを作成します。

1. `src/pages/about-css-modules.module.css`という CSS のファイルを作成します。

2. 新しいファイルに次を貼り付けます。

```css:title=src/pages/about-css-modules.module.css
.user {
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
}

.user:last-child {
  margin-bottom: 0;
}

.avatar {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
}

.description {
  flex: 1;
  margin-left: 18px;
  padding: 12px;
}

.username {
  margin: 0 0 12px 0;
  padding: 0;
}

.excerpt {
  margin: 0;
}
```

3. ファイルの最初の数行を次のように編集して、以前作成した`about-css-modules.js`ページに新しく`src/pages/about-css-modules.module.css`ファイルをインポートします。

```javascript:title=src/pages/about-css-modules.js
import React from "react"
// highlight-next-line
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

// highlight-next-line
console.log(styles)
```

`console.log(styles)`コードはインポートした結果をログ出力するので、`./about-css-modules.module.css`ファイルの処理結果を見ることができます。ブラウザーで開発者コンソール（Firefox や Chrome のデベロッパーツールを使用）を開くと、次のように表示されます。

![コンソールでの CSS Module のインポート結果](css-modules-console.png)

これを CSS ファイルと比較すると、それぞれのクラス名がインポートしたオブジェクトの長い文字列になっていることがわかります。例えば、`avatar`は`src-pages----about-css-modules-module---avatar---2lRF7`になっています。これらは、CSS Modules が生成するクラス名です。サイト全体で一意になることを保証しています。また、クラスを使用するのに、それらをインポートする必要があるため、CSS がどこで使用されているかが明白になります。

4. `about-css-modules.js`ページコンポーネントにインラインで`<User />`コンポーネントを新しく作成します。`about-css-modules.js`を次のように変更します。

```jsx:title=src/pages/about-css-modules.js
import React from "react"
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

console.log(styles)

// highlight-start
const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)
// highlight-end

export default () => (
  <Container>
    <h1>About CSS Modules</h1>
    <p>CSS Modules are cool</p>
    {/* highlight-start */}
    <User
      username="Jane Doe"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    <User
      username="Bob Smith"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
      excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    {/* highlight-end */}
  </Container>
)
```

> Tip: 一般に、サイト内の複数箇所でコンポーネントを使用する場合、 `components`ディレクトリに独自のモジュールファイルを配置する必要があります。ただし、1 つのファイルでのみ使用する場合は、インラインで作成します。

完成したページは次のようになります。

![CSS Modules を含むユーザーリストページ](css-modules-userlist.png)

### CSS-in-JS

CSS-in-JS は、コンポーネント指向なスタイリングのためのアプローチです。もっとも一般的なのは、[JavaScript を使用して CSS をインラインで構成](https://reactjs.org/docs/faq-styling.html#what-is-css-in-js)するパターンです。

#### Gatsby で CSS-in-JS を使用する

多くの様々な CSS-in-JS ライブラリーがあり、それらの多くにはすでに Gatsby プラグインがあります。この最初のチュートリアルでは CSS-in-JS の例を取り上げませんが、コミュニティーが提供しているドキュメントの[詳細をみる](/docs/styling/)ことをお勧めします。その中に、[Emotion](/docs/emotion/)と[Styled Components](/docs/styled-components/)の 2 つのライブラリのミニチュートリアルがあります。

#### CSS-in-JS に関するお勧めの読み物

さらに詳しものを読んでみたい場合は、[このムーブメントを引き起こした Christopher "vjeux" Chedeau の 2014 年のプレゼンテーション](https://speakerdeck.com/vjeux/react-css-in-js)と[Mark Dalgleish の最近の投稿"A Unified Styling Language"](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)を参考にしてください。

### その他の CSS の選択肢

Gatsby は、CSS スタイリングのための選択肢をほぼすべてサポートしています（もしお気に入りの CSS スタイリングのプラグインがまだない場合は、[貢献してください！](/contributing/how-to-contribute/))

- [Typography.js](/packages/gatsby-plugin-typography/)
- [Sass](/packages/gatsby-plugin-sass/)
- [JSS](/packages/gatsby-plugin-jss/)
- [Stylus](/packages/gatsby-plugin-stylus/)
- [PostCSS](/packages/gatsby-plugin-postcss/)

さらにもっとあります！

## 次は何ですか？

[チュートリアルのパート 3](/tutorial/part-three/)に進み、Gatsby プラグインとレイアウトコンポーネントについて学びます。
