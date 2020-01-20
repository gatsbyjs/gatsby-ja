---
title: クライアントサイドでしか実行できないパッケージの利用
---

場合によっては、クライアントサイドでしか実行できない処理やライブラリーを使う必要があるでしょう。そのような事は大抵、その処理あるいはライブラリーが [ブラウザー DOM](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model) のメソッドなどの、サーバーサイドレンダリング（SSR）を実行する際には利用できないものを扱おうとするために生じます。

もし `gatsby develop` や `gatsby build` といったコマンドで以下のようなエラーが出力されてコンパイルに失敗したのであれば、以下で概説されている諸々の回避策の内のどれかを打つ必要があるでしょう。

```bash
Reference error: Window is not Defined
```

## 1 つ目の回避策: 別のライブラリー、手法を用いる

問題そのものを回避してしまうということは、時にもっとも簡潔なアプローチとなります。もし SSR をエラーによって失敗させてしまうことの**ない**プラグインを用いてコンポーネントを再実装できるのであれば、それが最善の策でしょう。

## 2 つ目の回避策: クライアントサイドのパッケージを CDN を介して読み込む

クライアントサイドで実行するパッケージが求められるコンポーネントの中で、そのパッケージを [`<script />`](https://developer.mozilla.org/ja/docs/Web/HTML/Element/script) タグを使って CDN を介して読み込みましょう。

このようにスクリプトを埋め込みたければ、以下の方法で埋め込めます。

- [`react-helmet`](https://github.com/nfl/react-helmet) を用いてパッケージが求められるコンポーネントのなかに `<script />` タグを含める
- Gatsby の [html.js](/docs/custom-html/) を用いて `<script />` タグをベースとなる HTML に直接足す

この時、 React とその使用しているライブラリーとの間のやり取りのために、[他のライブラリーとのインテグレーション](https://ja.reactjs.org/docs/integrating-with-other-libraries.html#integrating-with-dom-manipulation-plugins)のための React のガイドラインに則って [React Component Lifecycle](https://ja.reactjs.org/docs/react-component.html#the-component-lifecycle) の中の利用可能なメソッドを利用しましょう。

```jsx
import React, { Component } from "react"
import { Helmet } from "react-helmet"

class MyComponent extends Component {
  componentDidMount() {
    // set up and use external package as needed
    window.externalLibrary.method()
  }

  render(props) {
    return (
      <React.Fragment>
        <Helmet>
          <script src="https://cdn.example/path-to-external-library.js" />
        </Helmet>

        <h1>Hello World</h1>
        {/* etc */}
      </React.Fragment>
    )
  }
}
```

## 3 つ目の回避策: react-loadable を用いてクライアントサイドに依存するコンポーネントを読み込む

[loadable-components](https://github.com/smooth-code/loadable-components) をインストールして、クライアントサイドでしか実行できないパッケージを利用したいコンポーネントをラップしましょう。

```bash
npm install @loadable/component
# or use yarn
yarn add @loadable/component
```

```jsx
import React, { Component } from "react"
import PropTypes from "prop-types"

import Loadable from "@loadable/component"

// these two libraries are client-side only
import Client from "shopify-buy"
import ShopifyBuy from "@shopify/buy-button-js"

const ShopifyBuyButton = props => {
  // custom component using shopify client-side libraries
  return <div>etc</div>
}

const LoadableBuyButton = Loadable(() => import("./ShopifyBuyButton"))

export default LoadableBuyButton
```

## 4 つ目の回避策: クライアントサイドのみで実行される React.lazy と Suspense を用いる

React.lazy と Suspense はサーバーサイドレンダリングではまだ利用できませんが、コードがクライアントサイドでのみ実行されているかどうかの確認に利用できます。
この解決法はサーバーサイド、クライアントサイドの双方で働く `loadable-components` に劣ったものでありますが、依存関係を追加することなしにクライアントサイドでのみ実行されるパッケージを処理するための代替手段を提供してくれます。
以下のコードは、 `isSSR` 変数によって window の存在の担保をしないまま実行しようとすると、エラーが起こるということを忘れないでください。

```jsx
import React from "react"

const ClientSideOnlyLazy = React.lazy(() =>
  import("../components/ClientSideOnly")
)
const MyPage = () => {
  const isSSR = typeof window === "undefined"

  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <ClientSideOnlyLazy />
        </React.Suspense>
      )}
    </>
  )
}
```

> **ヒント:** このページで紹介したものとは別の回避策も存在しえます。もし他の上手く行く回避策を見つけた時は、 [ドキュメントに貢献する](/contributing/docs-contributions/) を確認してその回避策をここに追加してください！

もしそれでもダメなら、[HTML のビルドにおいてのデバッグ](/docs/debugging-html-builds/)に関してのドキュメントを参照してみてください。
