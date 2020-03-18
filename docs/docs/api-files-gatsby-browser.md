---
title: gatsby-browser.js API ファイル
---

`gatsby-browser.js` ファイルを使用すると、ブラウザー内のアクションに応答し、追加のコンポーネントであなたのサイトをラップできます。[Gatsby Browser API](/docs/browser-apis) は Gatsby の[クライアントサイド](/docs/glossary#client-side)と対話するための多くのオプションを提供します。

`wrapPageElement` と `wrapRootElement` API はブラウザー API と[サーバーサイドレンダリング (Server-Side Rendering、SSR) API](/docs/ssr-apis) の両方に存在します。それらのいずれかを使用する場合、Node.js が SSR して生成されたページが、ブラウザーの JavaScript で[ハイドレートされた](/docs/glossary#hydration)後も同じ内容になるように、`gatsby-ssr.js` と `gatsby-browser.js` の両方で実装すべきかどうかを検討してください。

ブラウザー API を使用するためには、あなたのサイトのルートに `gatsby-browser.js` ファイルを作成します。あなたが使用したい各 API をこのファイルからエクスポートしてください。

```jsx:title=gatsby-browser.js
const React = require("react")
const Layout = require("./src/components/layout")

// クライアントのルートが変更されたときにログを記録する
exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname)
  console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

// すべてのページをコンポーネントでラップする
exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
```
