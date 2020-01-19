---
title: Preparing a Site to Go Live サイトを公開する準備
typora-copy-images-to: ./
disableTableOfContents: true
---

ああ！長い道のりでしたね！あなたは以下の内容を学びました。

- 新しい Gatsby サイトの作成
- ページとコンポーネントの作成
- スタイルコンポーネントについて
- サイトにプラグインを追加
- ソースと変換データ
- use GraphQL to query data for pages
- GraphQL をページ用データを照会するために使うこと
- データからプログラム的にページを作成すること

この最終章では、 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) と呼ばれる強力なサイト公開ツールを導入することで、サイトの公開準備の一般的な手順をいくつか説明します。途中で、Gatsby サイトでよく使用するプラグインをいくつか紹介します。

## Lighthouse による検証

[Lighthouse web サイト](https://developers.google.com/web/tools/lighthouse/)からの引用。

> Lighthouse は、Web ページの品質を改善するためのオープンソースの自動化ツールです。パブリックまたは認証を必要とする任意の Web ページに対して実施できます。パフォーマンス、アクセシビリティ、プログレッシブ Web アプリ（PWA）などを検証します。

Lighthouse は Chrome DevTools に含まれています。検証を実施し、検出されたエラーに対処し、提案された改善を実装することは、サイトを運用するための優れた方法です。これにより、サイトが可能な限り高速でアクセスしやすいという自信が得られます。

やってみましょう！

まず、 Gatsby サイトのプロダクションビルドを作成する必要があります。Gatsby 開発用サーバーは、開発を高速化するために最適化されています。しかし、それが生成するサイトは、サイトのプロダクションバージョンに非常に似ていますが、最適化されていません。

### ✋ プロダクション用ビルドを作成する

1.  開発サーバーを停止し（実行中の場合）、次のコマンドを実行します:

```shell
gatsby build
```

> 💡 [パート 1](/tutorial/part-one/)で学習したように、これによりサイトのプロダクション用ビルドが実行され、ビルドされた静的ファイルが `public` ディレクトリに出力されます。

2.  プロダクションサイトをローカルで表示します。実行:

```shell
gatsby serve
```

これが開始されると、[`localhost:9000`](http://localhost:9000) でサイトを表示できます。

### Lighthouse の監査を実行する

次に、Lighthouse の最初の検証を実施してみましょう。

1.  まだ行っていない場合は、Chrome シークレットモードでサイトを開き、拡張機能が検証へ干渉しないようにします。そして、Chrome DevTools を開きます。

2.  "Audit" タブをクリックすると、次のような画面が表示されます。

![Lighthouse audit start](./lighthouse-audit.png)

3.  "Perform an audit..." をクリックします（デフォルトでは、使用可能なすべての検証タイプを選択する必要があります）。次に、"Run audit" をクリックします。（検証の実行には 1 分ほどかかります）。検証が完了すると、次のような結果が表示されます。

![Lighthouse audit results](./lighthouse-audit-results.png)

ご覧のとおり、Gatsby のパフォーマンスはすぐに優れていますが、スコアを改善する PWA 、アクセシビリティ、ベストプラクティス、および SEO のいくつかの要素が欠けています。（そしてそのプロセスはあなたのサイトの訪問者と検索エンジンに親切です）

## マニフェストファイルを追加する

「プログレッシブ Web アプリ」カテゴリのスコアがかなり低いようです。それに対処しましょう。

しかし、そもそも、PWA とは正確には何でしょうか？

これらは通常の Web サイトであり、最新のブラウザー機能を利用して、アプリのような機能と利点で Web エクスペリエンスを強化しています。PWA エクスペリエンスにおける [Google の概要](https://developers.google.com/web/progressive-web-apps/)を確認してください。

Web アプリマニフェストを含めることは、一般に受け入れられている [PWA の 3 つのベースライン要件](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1)の 1 つです。

[Google](https://developers.google.com/web/fundamentals/web-app-manifest/) からの引用。

> Web アプリマニフェストは、Web アプリケーションと、ユーザーのモバイルデバイスまたはデスクトップに「インストール」されたときの Web アプリケーションの動作をブラウザーに伝える単純な JSON ファイルです。

[Gatsby のマニフェストプラグイン](/packages/gatsby-plugin-manifest/)は manifest.webmanifest、すべてのサイトビルドで `manifest.webmanifest` ファイルを作成するように Gatsby を構成します。

### ✋ `gatsby-plugin-manifest` を使用する

1.  プラグインをインストールします:

```shell
npm install --save gatsby-plugin-manifest
```

2. `src/images/icon.png` の下にアプリのファビコンを追加します。このチュートリアルの目的で、使用可能なアイコンがない場合は、[このサンプルアイコン](https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/tutorial/part-eight/icon.png)を使用できます。このアイコンは、マニフェストのすべての画像を作成するために必要です。詳細については、[`gatsby-plugin-manifest`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-manifest/README.md) のドキュメントをご覧ください。

3. プラグインを `gatsby-config.js` ファイルの `plugins` 配列に追加します。

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ]
}
```

Gatsby サイトへの Web マニフェストの追加を開始するために必要なのはそれだけです。示されている例は、基本構成を反映しています。その他のオプションについては、[プラグインリファレンス](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode)をご覧ください。

## オフラインサポートを追加する

Web サイトが PWA として認定されるためのもう 1 つの要件は、サービスワーカーの使用です。サービスワーカーはバックグラウンドで実行され、接続に基づいてネットワークコンテンツまたはキャッシュコンテンツを提供することを決定し、シームレスな管理されたオフラインエクスペリエンスを可能にします。

[Gatsby のオフラインプラグイン](/packages/gatsby-plugin-offline/)は、サイトのサービスワーカーを作成することにより、Gatsby サイトをオフラインで動作させ、悪いネットワーク状態に対する耐性を高めます。

### ✋ `gatsby-plugin-offline` を使用する

1.  プラグインをインストールします:

```shell
npm install --save gatsby-plugin-offline
```

2.  `gatsby-config.js` ファイルの `plugins` 配列に追加します。

```javascript:title=gatsby-config.js
{
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // highlight-next-line
    `gatsby-plugin-offline`,
  ]
}
```

Gatsby でサービスワーカーを使い始めるために必要なのはそれだけです。

> manifest オフラインプラグインは、作成された `manifest.webmanifest` をキャッシュできるように、マニフェストプラグインの後にリストする必要があります。

## ページのメタデータを追加する

ページにメタデータ（タイトルや説明など）を追加することは、Google などの検索エンジンがコンテンツを理解し、検索結果に表示するタイミングを決定する上で重要です。

[React Helmet](https://github.com/nfl/react-helmet) は、[ドキュメントヘッド](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)を管理するための React コンポーネントインターフェイスを提供するパッケージです。

Gatsby の [React Helmet プラグイン](/packages/gatsby-plugin-react-helmet/)は、React Helmet で追加されたサーバーレンダリングデータのドロップインサポートを提供します。プラグインを使用すると、React Helmet に追加した属性が Gatsby が構築する静的 HTML ページに追加されます。

### ✋ `React Helmet` と `gatsby-plugin-react-helmet` を使用する

1.  両方のパッケージをインストールする:

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

2.  オブジェクト内に `description` および `author` が `siteMetadata` オブジェクトへ設定されていることを確認してください。また、 `gatsby-config.js` ファイル内の `plugins` 配列に `gatsby-plugin-react-helmet` プラグインを追加します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
    // highlight-start
    description: `A simple description about pandas eating lots...`,
    author: `gatsbyjs`,
    // highlight-end
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    // highlight-next-line
    `gatsby-plugin-react-helmet`,
  ],
}
```

3. `src/components` ディレクトリー内に、 `seo.js` 名のファイルを作成し、次の行を追加します:

```jsx:title=src/components/seo.js
import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
```

上記のコードは、もっとも一般的なメタデータタグのデフォルトを設定し、プロジェクトの残りの部分で動作する `<SEO>` コンポーネントを提供します。かなりクールですよね？

4.  これで、テンプレートとページで `<SEO>` コンポーネントを使用し、 props を渡すことができます。たとえば、次の `blog-post.js` のようにテンプレートに追加します:

```jsx:title=src/templates/blog-post.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// highlight-next-line
import SEO from "../components/seo"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      // highlight-start
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      // highlight-end
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      // highlight-next-line
      excerpt
    }
  }
`
```

上記の例は [Gatsby スターターブログ](/starters/gatsbyjs/gatsby-starter-blog/) に基づいています。`<SEO>` コンポーネントに props を渡すことで、投稿のメタデータを動的に変更できます。この場合、`siteMetadatagatsby-config.js` ファイルのデフォルトの `siteMetadata` プロパティの代わりに、投稿ブログの `title` と `excerpt`（投稿ブログのマークダウンファイルに存在する場合）が使用されます。

さて、上記のように Lighthouse の検証を再度実施すると、完全ではないにしてもスコア 100 に近づくはずです！

> 💡 さらに読むと例については、[SEO コンポーネントの追加](/docs/add-seo-component/)と [React Helmet のドキュメント](https://github.com/nfl/react-helmet#example) をご覧ください！

## 改善し続ける

このセクションでは、サイトのパフォーマンスを改善し、運用を開始するための Gatsby 固有のツールをいくつか紹介しました。

Lighthouse は、サイトの改善と学習に最適なツールです。Lighthouse が提供する詳細なフィードバックを引き続き確認し、サイトの改善を続けてください。

## 次のステップ

### 公式ドキュメント

- [公式ドキュメント](https://www.gatsbyjs.org/docs/): _[クイックスタート](https://www.gatsbyjs.org/docs/quick-start/)_, _[詳細ガイド](https://www.gatsbyjs.org/docs/preparing-your-environment/)_, _[API リファレンス](https://www.gatsbyjs.org/docs/gatsby-link/)_, など、公式ドキュメントをご覧ください。

### 公式プラグイン

- [公式プラグイン](https://github.com/gatsbyjs/gatsby/tree/master/packages): Gatsby が管理しているすべての公式プラグインの完全な一覧。

### 公式スターター

1.  [Gatsby のデフォルトスターター]](https://github.com/gatsbyjs/gatsby-starter-default)：デフォルトの定型文でプロジェクトを開始します。この必要最小限のスターターには、必要なメイン Gatsby 構成ファイルが付属しています。_[実施例](http://gatsbyjs.github.io/gatsby-starter-default/)_
2.  [Gatsby のブログスターター](https://github.com/gatsbyjs/gatsby-starter-blog): 驚くほど高速なブログを作成するための Gatsby スターター。 _[実施例](http://gatsbyjs.github.io/gatsby-starter-blog/)_
3.  [Gatsby のハローワールドスターター](https://github.com/gatsbyjs/gatsby-starter-hello-world): Gatsby サイトに必要な最低限の要素を備えた Gatsby スターター。 _[実施例](https://gatsby-starter-hello-world-demo.netlify.com/)_

## 以上です、みなさん

まあ、まったくそうではありません。このチュートリアルのためだけに。ガイド付きのユースケースを確認するには、[追加のチュートリアル（/tutorial/additional-tutorials/)があります。

これは始まりにすぎなません。立ち止まらないで！

- クールなものを作りましたか？Twitter で共有し、 [#buildwithgatsby](https://twitter.com/search?q=%23buildwithgatsby)にタグを付けて、[@mention us](https://twitter.com/gatsbyjs)！

- 学んだことについてのクールなブログ記事を書きましたか？それも共有してください！
- 貢献しましょう！Gatsby リポジトリに[Issue をあげましょう]](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)、そして[貢献者になります](/contributing/how-to-contribute/)。

さらなるアイデアについては、「[貢献方法](/contributing/how-to-contribute/)」のドキュメントをご覧ください。

私たちはあなたが何をするのか楽しみです 😄。
