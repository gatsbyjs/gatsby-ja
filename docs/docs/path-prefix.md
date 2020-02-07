---
title: パスの接頭辞を追加する
---

多くのアプリケーションは、ドメインルート（`/`)以外の場所にホストされています。

例えば、Gatsby で作成したブログを `example.com/blog/` 配下に置くこともあれば、GitHub Pages を利用して `example.github.io/my-gatsby-site/` にサイトをホストすることも出来ます。

これらのサイトでは、サイト上の全てのパスに接頭辞を追加する必要があります。例えば、`/my-sweet-blog-post/`は `/blog/my-sweet-blog-post` とするべきです。

加えて、様々なリソース（JavaScript ファイル、 CSS ファイル、 画像ファイル、 その他の静的なコンテンツなど）へのリンクパスも、同じ接頭辞を追加する必要があります。接頭辞を追加した際に、サイトを問題なく機能させるためです。

接頭辞を追加する手順は、以下の 2 ステップになります。

## `gatsby-config.js`に記述する

まず、`pathPrefix`の値を `gatsby-config.js` ファイル内に記述します。

```js:title=gatsby-config.js
module.exports = {
  pathPrefix: `/blog`,
}
```

## ビルドする

次に、以下のように `--prefix-paths` フラグを付けて、アプリケーションをビルドします。

```shell
gatsby build --prefix-paths
```

もし `--prefix-paths` フラグが無い場合、Gatsby はあなたの `pathPrefix` を無視し、ルートドメインにサイトをホストする前提でビルドします。

## アプリケーション内・サイト内リンク

Gatsby には、アプリケーション内・サイト内リンクをスムーズに行う為の API とライブラリーがあります。[`Link`](/docs/gatsby-link/)コンポーネントが、パス接頭辞を扱う為の標準機能です。

例えば、もしもあなたが `/page-2` をリンクさせたいけれど、実際のリンクには接頭辞が付いていた（例： `/blog/page-2`)場合、接頭辞を手打ちで追加する必要はありません。Gatsby の `Link` コンポーネントを使うことで、`gatsby-config.js`ファイル内の `pathPrefix` に記述した接頭辞が自動的に追加されます。もしも後でサイトを移動させる際に接頭辞が必要無くなっても、特に追加作業をすることなく、サイト移動が出来ます。

例えば、以下にある `Link` コンポーネントを `page-2` にリンクさせる場合、`page-2`には自動的に `pathPrefix` で設定した接頭辞が追加されます。

```jsx:title=src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

function Index() {
  return (
    <Layout>
      {/* highlight-next-line */}
      <Link to="page-2">Page 2</Link>
    </Layout>
  )
}
```

また、Gatsby の `navigate` 補助機能を使えば、動的に生成されるリンクへのパス接頭辞追加も自動で行えます。

```jsx:title=src/pages/index.js
import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"

export default function Index() {
  return (
    <Layout>
      {/* highlight-next-line */}
      <button onClick={() => navigate("/page-2")}>Page 2</button>
    </Layout>
  )
}
```

## `withPrefix`でパス接頭辞を追加する

すでに自身で接頭辞を追加したパス名がある場合、[`withPrefix`](/docs/gatsby-link/#add-the-path-prefix-to-paths-using-withprefix)という補助機能を使うことで、接頭辞をプロダクションの際に追加できます。（ただし、接頭辞が必要ない開発環境では、追加されません）
For pathnames you construct manually, there’s a helper function, [`withPrefix`](/docs/gatsby-link/#add-the-path-prefix-to-paths-using-withprefix) that prepends your path prefix in production (but doesn’t during development where paths don’t need to be prefixed).

### Additional considerations

[`assetPrefix`](/docs/asset-prefix/)は[`withPrefix`](/docs/gatsby-link/#add-the-path-prefix-to-paths-using-withprefix)に
(HTML でないファイル、例えば画像ファイルや JavaScript ファイルなど）
The [`assetPrefix`](/docs/asset-prefix/) feature can be thought of as semi-related to this feature. That feature allows your assets (non-HTML files, e.g. images, JavaScript, etc.) to be hosted on a separate domain, for example a CDN.

This feature works seamlessly with `assetPrefix`. Build out your application with the `--prefix-paths` flag and you'll be well on your way to hosting an application with its assets hosted on a CDN, and its core functionality available behind a path prefix.
