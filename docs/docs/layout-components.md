---
title: レイアウトコンポーネント
---

このガイドでは、Gatsby のレイアウトに対するアプローチと、レイアウトコンポーネントの作成方法と使用方法、さらにレイアウトコンポーネントのアンマウントを防ぐ方法について説明します。

## Gatsby のレイアウトに対するアプローチ

Gatsby は、デフォルトではページにレイアウトを自動的に適用しません（ただし、後のセクションで説明する通り、レイアウトを自動的に適用させる方法もあります）。その代わりに、 Gatsby は React と同じようにコンポーネントのインポートと使用ができます。これにより、例えば全ページに共通するヘッダーとフッター、そしていくつかのページに適用されるサイドバーメニューなど、複数のレベルのレイアウトを作成できます。また、レイアウトコンポーネントとページコンポーネントの間でデータを受け渡すことも簡単にできます。

## レイアウトコンポーネントとは？

レイアウトコンポーネントは、複数のページ間で共有したいサイトのセクションに使用します。例えば、 Gatsby のサイトは通常では全ページ共通のヘッダーフッターのレイアウトコンポーネントを持ちます。その他、一般的にレイアウトに追加するものといえば、サイドバーやナビゲーションメニューがあります。このページでは、一番上にあるヘッダーが gatsbyjs.org で使用するレイアウトコンポーネントです。

## レイアウトコンポーネントの作り方

レイアウトコンポーネントは、その他のコンポーネントと同じ場所にまとめて作成することをお勧めします（例：`src/components/`）。

以下は、`src/components/layout.js` に作成する一般的なコンポーネントの例です。

```jsx:title=src/components/layout.js
import React from "react"

export default ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
    {children}
  </div>
)
```

## レイアウトコンポーネントの読み込みとページへの追加方法

ページにレイアウトを適用する場合、 `Layout` コンポーネントをインポートしてラップする必要があります。以下は、フロントページにレイアウトを適用する場合の例です。

```jsx:title=src/pages/index.js
import React from "react"
import Layout from "../components/layout" // highlight-line

export default () => (
  <Layout> {/* highlight-line */}
    <h1>I’m in a layout!</h1>
  </Layout> {/* highlight-line */}
)
```

これは、このレイアウトを使用する全てのページとテンプレートに必要です。

## レイアウトコンポーネントのアンマウントを防ぐ方法

先に述べた通り、Gatsby はデフォルトではページをレイアウトコンポーネントでラップしません。「トップレベル」のコンポーネントは、そのページ自身です。その結果、ページにまたがって「トップレベル」のコンポーネントが変更されると、React はすべての子コンポーネントを再レンダリングします。これは、ナビゲーションのような共有コンポーネントがアンマウントと再マウントを繰り返してしまうということを意味します。これにより、それらの共有コンポーネント内の CSS トランジションや、コンポーネントの状態が壊されてしまいます。

ページが変更されてもマウントが解除されないようなページのラッパーコンポーネントを設定する必要がある場合は、 [ブラウザ API](/docs/browser-apis/#wrapPageElement) または [SSR equivalent](/docs/ssr-apis/#wrapPageElement) の **`wrapPageElement`** を使用します。

また、 `wrapPageElement` が実装された [gatsby-plugin-layout](/packages/gatsby-plugin-layout/) を使っても、レイアウトコンポーネントがアンマウントされることを防ぐことができます。

## その他の資料

- [Creating nested layout components in Gatsby](/tutorial/part-three/)
- [Life after layouts in Gatsby V2](/blog/2018-06-08-life-after-layouts/)
- [Migrating from v1 to v2](/docs/migrating-from-v1-to-v2/#remove-or-refactor-layout-components)
- [gatsby-plugin-layout](/packages/gatsby-plugin-layout/)
- [wrapPageElement Browser API](/docs/browser-apis/#wrapPageElement)
- [wrapPageElement SSR API](/docs/ssr-apis/#wrapPageElement)
