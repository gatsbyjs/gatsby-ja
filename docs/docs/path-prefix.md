---
title: パスの接頭辞を追加する
---

多くのアプリケーションは、ドメインルート（`/`) 以外の場所にホスティングされています。

例えば、Gatsby で作成したブログを `example.com/blog/` に置くこともあれば、GitHub Pages を利用して `example.github.io/my-gatsby-site/` にサイトをホスティングすることも出来ます。

これらのサイトでは、サイト内の全てのパスに接頭辞を追加する必要があります。例えば、 `/my-sweet-blog-post/` へのリンクパスは `/blog/my-sweet-blog-post` とするなど。

加えて、様々なリソース（JavaScript ファイル・ CSS ファイル・画像ファイル・その他の静的なコンテンツなど）へのリンクパスも、同じ接頭辞を追加する必要があります。接頭辞を追加した際に、サイトを問題なく機能させるためです。

接頭辞を追加する手順は、以下の 2 ステップになります。

## `gatsby-config.js` に記述する

まず、 `pathPrefix` の値を `gatsby-config.js` ファイル内に記述します。

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

Gatsby には、アプリケーション内・サイト内リンクをシームレスに行う為の API とライブラリーがあります。特に [`Link`](/docs/gatsby-link/) コンポーネントには、パス接頭辞を扱う為の標準機能があります。

例えば、もしもあなたが `/page-2` にリンクさせたいけれど、実際のパスには接頭辞が付いていた（例： `/blog/page-2`) 場合、接頭辞を手打ちで追加する必要はありません。Gatsby の `Link` コンポーネントを使うことで、`gatsby-config.js` ファイル内の `pathPrefix` に記述した接頭辞が自動的に追加されます。もしも後でサイトを移動させる際に接頭辞が必要無くなっても、特に追加作業をすることなく、サイト移動が出来ます。

例えば、以下にある `Link` コンポーネントを `page-2` にリンクさせる場合、`page-2` には自動的に `pathPrefix` で設定した接頭辞が追加されます。

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

また、Gatsby の [`navigate`](/docs/gatsby-link/#how-to-use-the-navigate-helper-function) 補助機能を使えば、フォーム送信後のページ遷移など、動的ナビゲーションのパス接頭辞追加も自動で行えます。

```jsx:title=src/pages/index.js
import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"

export default function Index() {
  return (
    <Layout>
      {/* 注意: 以下のコードは現実的な例ではありませんが、考え方としてはわかるはずです。 */}
      {/* highlight-next-line */}
      <button onClick={() => navigate("/page-2")}>
        Page 2 へ動的に移動
      </button>
    </Layout>
  )
}
```

## `withPrefix` でパス接頭辞を追加する

接頭辞をプロダクション時にのみ追加したい場合は、[`withPrefix`](/docs/gatsby-link/#add-the-path-prefix-to-paths-using-withprefix) という補助機能を使います。この場合、開発環境では接頭辞は追加されません。

### 追加考察

[`assetPrefix`](/docs/asset-prefix/) は、[`withPrefix`](/docs/gatsby-link/#add-the-path-prefix-to-paths-using-withprefix) に関連する機能であり、この機能を使えば、CDN など別ドメインにホスティングされた HTML 以外のファイル（例：画像ファイルや JavaScript ファイルなど）へのパスを自動で追加できます。

`withPrefix` と `assetPrefix` は問題なく併用できます。この 2 つの機能を利用し、`--prefix-paths` のフラグを付けてアプリケーションをビルドすれば、パス接頭辞追加と CDN ドメインパス追加の両方が行えます。
