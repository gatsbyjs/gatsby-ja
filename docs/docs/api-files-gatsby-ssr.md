---
title: gatsby-ssr.js API ファイル
---

`gatsby-ssr.js` ファイルを使用すると、Gatsby と Node.js によってサーバーサイドレンダリング（SSR）される静的 HTML ファイルの内容を変更できます。[Gatsby SSR APIs](/docs/ssr-apis/) を使用するためには、あなたのサイトのルートに `gatsby-ssr.js`というファイルを作成します。あなたが使用したい API をこのファイルでエクスポートしてください。

`wrapPageElement` と `wrapRootElement` API は SSR API と[ブラウザー API](/docs/browser-apis) の両方に存在します。それらのいずれかを使用する場合、Node.js が SSR して生成されたページが、ブラウザーの JavaScript で[ハイドレートされた](/docs/glossary#hydration)後も同じ内容になるように、`gatsby-ssr.js` と `gatsby-browser.js` の両方で実装すべきかどうかを検討してください。

```jsx:title=gatsby-ssr.js
const React = require("react")
const Layout = require("./src/components/layout")

// body 要素にクラス名を追加する
exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
  setBodyAttributes({
    className: "my-body-class",
  })
}

// すべてのページをコンポーネントでラップする
exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
```
