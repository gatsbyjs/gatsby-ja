---
title: React コンポーネントを追加する
---

このガイドは、あなたの Gatsby サイトに React コンポーネントを追加する方法を解説します。

## React コンポーネント

React コンポーネントは、あなたのユーザーインターフェース (UI) を独立した再利用可能な部品として分割するために使えるすでに構築された要素、もしくは要素の集合です。React コンポーネントで書くことができるコンポーネントの種類は多くあるのですが、このガイドでは、関数コンポーネントを使用します。クラスコンポーネントを含む React コンポーネントの書き方について詳細を知りたい場合は、こちらの [React ドキュメント](https://ja.reactjs.org/docs/components-and-props.html)をご覧ください。

コンポーネントは、"props" (プロパティ）として知られる入力を用いてカスタマイズされる機能も提供されています。 Props は、ブーリアンや文字列、オブジェクト、配列など、考えられるほぼすべての JavaScript の型になりえます。

例えば、あなたのサイト上のボタンに対してコンポーネントを使えます。これで、毎回異なるラベルやアクションを持つページを越えて、複数回使用できます。

## React コンポーネントをインポートする

Gatsby で React コンポーネントを使うときは、React アプリケーションと同じようにしてインポートして使用できます。ここでは、動作している [Gatsby Link](/docs/gatsby-link/) を例にします。そして、パフォーマンスのための追加機能をもたらします。

```jsx
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <Link to="/contact/">Contact</Link>
  </div>
)
```

### サードパーティコンポーネントをインポートする

React と同様にして、Gatsby でもサードパーティコンポーネントとライブラリはサポートしています。あなたは、パッケージマネジャ経由でサードパーティコンポーネントやライブラリをインストールできます。私たちは、 npm を好んで使用する傾向にあるので、 npm を例にしています。

ここでは、あなたのサイトにサードパーティコンポーネントを追加する一例を挙げています。

はじめに、パッケージマネジャでコンポーネントやライブラリのパッケージをインストールしなければなりません。パッケージマネジャを組み合わせることはおすすめしません。だから、もしあなたが npm を使用するなら別のものは使用しないでください。また逆もまた然りです。

```shell
npm install @material-ui/core
```

パッケージのインストールが完了したら、あなたのページのソースコード上でインポートして使用します。

```jsx:title=my-page.jsx
import React from "react"

// わたしの素敵なサードパーティコンポーネントをインポートする
import Button from "@material-ui/core/Button"

export default () => (
  <div>
    <p>これは、わたしの超すごい Gatsby でできたページです!</p>

    {/* わたしの素敵なサードパーティコンポーネントを使用する */}
    <Button>素敵なボタン!</Button>
  </div>
)
```

## Things to watch out for

Since Gatsby uses Server-Side Rendering (SSR) to generate your site's pages, the JSX code you write is usually compiled before the browser loads the page. Because of this, certain features are not available at compile time and can cause a build error.

### Use of browser globals

Some components or code reference browser globals such as `window`, `document` or `localStorage`. These objects are not available at [build](/docs/glossary#build) time and can result in a webpack error when compiling:

```text
WebpackError: ReferenceError: window is not defined
```

To learn more about solutions for supporting SSR and client-side libraries, check out the related section on the [Porting from Create React App documentation](/docs/porting-from-create-react-app-to-gatsby#server-side-rendering-and-browser-apis).

#### Fixing third-party modules

Some packages expect `window` or another browser global to be defined. These packages will have to be patched.

You can learn how to patch these packages on the [Debugging HTML Builds documentation](/docs/debugging-html-builds/#fixing-third-party-modules).

### Components without server-side rendering

Server-side rendering means pages and content are built out by the Node.js server and then sent to a browser ready to go. It’s like your pages are constructed before even being sent to the user. Gatsby is server-side rendered at build time, meaning that the code that gets to your browser has already been run to build pages and content, but this doesn’t mean you can’t still have dynamic pages.

Some React components don't have server-side rendering support (SSR) out-of-the-box so you might have to add SSR yourself.
