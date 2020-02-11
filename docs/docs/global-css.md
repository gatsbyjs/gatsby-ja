---
title: グローバル CSS ファイルを用いた標準的なスタイリング
---

古くよりウェブサイトはグローバル CSS ファイルによってスタイリングが行われてきました。

グローバルスコープ CSS ルールは外部 `.css` ファイルの中で宣言され、[詳細度](https://developer.mozilla.org/ja/docs/Web/CSS/Specificity)と[カスケード処理](https://developer.mozilla.org/ja/docs/Web/CSS/Cascade)によってスタイルの優先順位が決められ、スタイルが適用されます。

## レイアウトコンポーネントにグローバルスタイルを追加する

グローバルスタイルを追加する最善の方法は[共通レイアウトコンポーネント](/tutorial/part-three/#はじめてのレイアウトコンポーネントの作成)を利用することです。レイアウトコンポーネントはサイト共通の部品として使用されます。たとえば、スタイルやヘッダーコンポーネント、そのほか共通で使われる部品が該当します。

> **ヒント:** このパターンは Gatsby の [the default starter](https://github.com/gatsbyjs/gatsby-starter-default/blob/02324e5b04ea0a66d91c7fe7408b46d0a7eac868/src/layouts/index.js#L6) の中でデフォルトレイアウトとして実装されています。

グローバルスタイルを使った共通レイアウトを学ぶために、 まず [hello world starter](https://github.com/gatsbyjs/gatsby-starter-hello-world) を使った新しい Gatsby サイトを作成してください。

```shell
gatsby new global-styles https://github.com/gatsbyjs/gatsby-starter-hello-world
```

新規作成したサイトをコードエディターで開きます。 `/src/components` ディレクトリーを作成し、新規ファイルを 2 つ作成します：

```diff
  global-styles/
  └───src/
      └───components/
+     │   │─  layout.js
+     │   └─  layout.css
      │
      └───pages/
          └─  index.js
```

`src/components/layout.css` の中にグローバルスタイルを追加します：

```css:title=src/components/layout.css
div {
  background: red;
  color: white;
}
```

`src/components/layout.js` の中でスタイルシートを読み込み、レイアウトコンポーネントをエクスポートします：

```jsx:title=src/components/layout.js
import React from "react"
import "./layout.css"

export default ({ children }) => <div>{children}</div>
```

最後に `src/pages/index.js` を更新して、作成したレイアウトコンポーネントを使用します。

```jsx:title=src/pages/index.js
import React from "react"
import Layout from "../components/layout"

export default () => <Layout>Hello world!</Layout>
```

`npm run develop` を実行するとグローバルスタイルが適用されていることを確認できます。

![Global styles](./images/global-styles.png)

## レイアウトコンポーネントを使わずにグローバルスタイルを追加する

場合によっては、共通レイアウトコンポーネント使うことは好ましくありません。このような場合では `gatsby-browser.js` を使ってグローバルスタイルを読み込むこともできます。

> **ヒント:** このアプローチは CSS-in-JS と同時には動作しません。 共通コンポーネントを使って、CSS-in-JS の中でスタイルを割り当ててください。

はじめに、新しいターミナルウィンドウを開き、下記コマンドを実行して新規に Gatsby サイトを作成し、開発サーバーを起動してください。

```shell
gatsby new global-style-tutorial https://github.com/gatsbyjs/gatsby-starter-default
cd global-style-tutorial
npm run develop
```

次に、CSS ファイルを作成し、任意の CSS を定義してください。例：

```css:title=src/styles/global.css
html {
  background-color: peachpuff;
}

a {
  color: rebeccapurple;
}
```

そして、`gatsby-browser.js` の中で CSS ファイルを読み込みます。

> **ヒント:** この方法は CSS を読み込んだときに実行され、読み込んだスタイルは JavaScript ビルド時に出力されます。 CSS-in-JS のための JavaScript ビルドは行われません。
> レイアウトコンポーネントまたは global-styles.js の中で CSS ファイルを読み込むことが最善策になります。

```javascript:title=gatsby-browser.js
import "./src/styles/global.css"

// or:
// require('./src/styles/global.css')
```

> _ヒント: Node.js の require, import 構文を使うことができます。さらにつけ加えると、 `src/styles` フォルダの中に置く実例 CSS ファイルの配置は任意です。_

グローバルスタイルがサイト全体に反映されているはずです：

![Global styles example site](./images/global-styles-example.png)

### コンポーネントの中で CSS を読み込む

チームメンバーが従来の CSS (非 CSS-in-JS)を使用している場合でも、 個別の CSS ファイルに分割し、独立した作業が行えます。[import files directly](/docs/importing-assets-into-files/) を使ってページやテンプレート、コンポーネントの中で CSS を取り込むことで可能にします。

```css:title=menu.css
.menu {
  background-color: black;
  color: #fff;
  display: flex;
}
```

```javascript:title=components/menu.js
import "css/menu.css"
```

このアプローチではチームメンバーがより伝統的に使われてきたクラスベースの CSS を使って記述することが可能になり、Gatsby サイトの中で CSS や Sass 記法の統合が簡単に実現できます。ただし、ウェブパフォーマンスや不要になったコードの除去を忘れる事について考えなければならなくなるトレードオフがあります。

### コンポーネントに CSS クラスを追加する

`class` は JavaScript において予約語なので、代わりに `className` 属性を使わなければなりません。 HTML に出力されるとブラウザサポートされた `class` 属性としてレンダリングされます。

```jsx
<button className="primary">Click me</button>
```

```css
.primary {
  background: orangered;
}
```

### 問題解決の限界

グローバル CSS ファイルのもっとも大きな問題は名前が衝突するリスクと、意図しない継承の影響を受けてしまうことです。

この問題を解決するための助けとして BEM のような CSS 設計がありますが、より現代的な解決策は [CSS Modules](/docs/css-modules/) や [CSS-in-JS](/docs/css-in-js/) を使用したローカルスコープの CSS を記述することです。
