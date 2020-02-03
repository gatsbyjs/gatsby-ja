---
title: サイトを公開する準備
typora-copy-images-to: ./
disableTableOfContents: true
---

お疲れさまでした！ここまでで以下の内容を学びましたね。

- 新しい Gatsby サイトの作成
- ページとコンポーネントの作成
- スタイルコンポーネントについて
- サイトにプラグインを追加
- ソースと変換データ
- ページ用データの参照に GraphQL を使うこと
- データからプログラムでページを作成すること

この最終セクションでは、 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) と呼ばれる強力なサイト評価ツールを導入することで、サイトの公開準備の一般的な手順をいくつか説明します。途中で、 Gatsby サイトでよく使用するプラグインをいくつか紹介します。

## Lighthouse による評価

[Lighthouse web サイト](https://developers.google.com/web/tools/lighthouse/)からの引用。

> Lighthouse は、 Web ページの品質を改善するための自動化されたオープンソースツールです。パブリックまたは認証を必要とする任意の Web ページに対して実施できます。パフォーマンス、アクセシビリティ、プログレッシブ Web アプリ（PWA）などを評価します。

Lighthouse は Chrome DevTools に含まれています。評価を実施し、検知したエラーに対処することは、サイト公開前の準備として良い方法です。これにより、サイトが可能な限り高速でアクセスしやすいという自信が得られます。

やってみましょう！

まず、 Gatsby サイトのプロダクションビルドを作成する必要があります。Gatsby 開発用サーバーは、開発を高速化するために最適化されています。しかし、それが生成するサイトは、サイトのプロダクションバージョンに非常に似ていますが、最適化されていません。

### ✋ プロダクション用ビルドを作成する

1.  開発サーバーを停止し（実行中の場合）、次のコマンドを実行します。

```shell
gatsby build
```

> 💡 [パート 1](/tutorial/part-one/) で学習したように、これによりサイトのプロダクション用ビルドが実行され、ビルドされた静的ファイルが `public` ディレクトリーに出力されます。

2.  プロダクションサイトをローカルで閲覧します。次のコマンドを実行してください。

```shell
gatsby serve
```

これを実行すると、[`localhost:9000`](http://localhost:9000) でサイトを表示できます。

### Lighthouse による評価を実施する

次に、Lighthouse による最初の評価を実施してみましょう。

1.  まだ行っていない場合は、Chrome シークレットモードでサイトを開き、拡張機能が評価へ干渉しないようにします。そして、Chrome DevTools を開きます。

2.  "Audits" タブをクリックすると、次のような画面が表示されます。

![Lighthouse audit start](./lighthouse-audit.png)

3.  "Perform an audit..." をクリックします（デフォルトでは、使用可能なすべての評価タイプが選択されているはずです）。次に、"Run audits" をクリックします。（評価の実行には 1 分ほどかかります）。評価が完了すると、次のような結果が表示されます。

![Lighthouse audit results](./lighthouse-audit-results.png)

ご覧のとおり、Gatsby のパフォーマンスは驚くほど優れていますが、 まだ、PWA 、アクセシビリティ、ベストプラクティス、および SEO などのスコアに改善の余地があります。（そして、その改善を通じて、あなたのサイトは訪問者や検索エンジンに対してよりフレンドリーになるでしょう）

## マニフェストファイルを追加する

「プログレッシブ Web アプリ」カテゴリのスコアがかなり低いようです。それに対応しましょう。

しかし、そもそも、PWA とは正確には何でしょうか？

これは、最新のブラウザー機能を利用してアプリのような機能と利点で Web エクスペリエンスを拡張した通常の Web サイトです。PWA エクスペリエンスの構成要素については、 [Google の概要](https://developers.google.com/web/progressive-web-apps/)を確認してください。

Web アプリマニフェストを含めることは、一般的な[PWA の 3 つの基本的要件](https://alistapart.com/article/yes-that-web-project-should-be-a-pwa#section1)の 1 つです。

[Google](https://developers.google.com/web/fundamentals/web-app-manifest/) からの引用。

> Web アプリマニフェストとは、ユーザーのモバイルデバイスまたはデスクトップに「インストール」されたときの Web アプリケーションの動作をブラウザーに伝える単純な JSON ファイルです。

[Gatsby のマニフェストプラグイン](/packages/gatsby-plugin-manifest/)は、すべてのサイトビルドで `manifest.webmanifest` ファイルを作成するように Gatsby を設定します。

### ✋ `gatsby-plugin-manifest` を使用する

1.  プラグインをインストールします。

```shell
npm install --save gatsby-plugin-manifest
```

2. `src/images/icon.png` の下にアプリのファビコンを追加します。このチュートリアルを実施するに際して、使用できるアイコンを持っていない場合は、[サンプルアイコン](https://raw.githubusercontent.com/gatsbyjs/gatsby/master/docs/tutorial/part-eight/icon.png)を使用できます。このアイコンは、マニフェストファイルで使用されるのすべての画像の作成に必要です。詳細については、[`gatsby-plugin-manifest`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-manifest/README.md) のドキュメントをご覧ください。

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

Gatsby サイトへ Web マニフェストを追加するのに必要なのは、それだけです。示されている例は、基本設定です。その他のオプションについては、[プラグインリファレンス](/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode)をご覧ください。

## オフラインサポートを追加する

Web サイトが PWA として認定されるためのもう 1 つの要件は、サービスワーカーの使用です。サービスワーカーはバックグラウンドで実行され、接続状態に基づき、ネットワークコンテンツまたはキャッシュコンテンツを提供することを決め、シームレスに管理されたオフラインエクスペリエンスを可能にします。

[Gatsby のオフラインプラグイン](/packages/gatsby-plugin-offline/)は、サイトのサービスワーカーを作成することにより、Gatsby サイトをオフラインで動作可能にし、悪いネットワーク状態に対する耐性を高めます。

### ✋ `gatsby-plugin-offline` を使用する

1.  プラグインをインストールします。

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

> manifest オフラインプラグインは、作成された `manifest.webmanifest` をキャッシュできるように、マニフェストプラグインの後に記載する必要があります。

## ページのメタデータを追加する

ページにメタデータ（タイトルや説明など）を追加することは、Google などの検索エンジンにコンテンツを理解させ、検索結果で上位表示をするために重要です。

[React Helmet](https://github.com/nfl/react-helmet) は、[ドキュメントヘッド](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)を管理するための React コンポーネントインターフェイスを提供するパッケージです。

Gatsby の [React Helmet プラグイン](/packages/gatsby-plugin-react-helmet/)は、React Helmet で追加されたサーバーレンダリングデータのドロップインサポートを提供します。プラグインを使用すると、React Helmet に追加した属性が Gatsby がビルドする静的 HTML ページに追加されます。

### ✋ `React Helmet` と `gatsby-plugin-react-helmet` を使用する

1.  両方のパッケージをインストールします。

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

2.  `description` および `author` が `siteMetadata` オブジェクト内に設定されていることを確認してください。また、 `gatsby-config.js` ファイル内の `plugins` 配列に `gatsby-plugin-react-helmet` プラグインを追加します。

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

3. `src/components` ディレクトリー内に、 `seo.js` という名前のファイルを作成し、次の行を追加します。

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

上記のコードは、もっとも一般的なメタデータタグのデフォルトを設定し、これ以降のプロジェクトで使える `<SEO>` コンポーネントを提供します。かなりクールですよね？

4.  これで、テンプレートとページで `<SEO>` コンポーネントを使用し、 props を渡すことができます。たとえば、次の `blog-post.js` のようにテンプレートに追加します。

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

上記の例は [Gatsby スターターブログ](/starters/gatsbyjs/gatsby-starter-blog/)に基づいています。`<SEO>` コンポーネントに props を渡すことで、ブログ記事のメタデータを動的に変更できます。この場合、`siteMetadatagatsby-config.js` ファイルのデフォルトの `siteMetadata` プロパティの代わりに、投稿ブログの `title` と `excerpt`（ブログ記事のマークダウンファイルに存在する場合）が使用されます。

さて、この状態で Lighthouse の評価を再度実施すると、完全ではないにしてもスコア 100 に近づくはずです！

> 💡 さらなる例については、[SEO コンポーネントの追加](/docs/add-seo-component/)と [React Helmet のドキュメント](https://github.com/nfl/react-helmet#example) をご覧ください！

## 改善し続ける

このセクションでは、サイトのパフォーマンスを改善し、運用を開始するための Gatsby 固有のツールをいくつか紹介しました。

Lighthouse は、サイトの改善と学習に最適なツールです。Lighthouse が提供する詳細なフィードバックを引き続き確認し、サイトの改善を継続してください。

## 次のステップ

### 公式ドキュメント

- [公式ドキュメント](https://www.gatsbyjs.org/docs/): _[クイックスタート](https://www.gatsbyjs.org/docs/quick-start/)_, _[詳細ガイド](https://www.gatsbyjs.org/docs/preparing-your-environment/)_, _[API リファレンス](https://www.gatsbyjs.org/docs/gatsby-link/)_, など、公式ドキュメントをご覧ください。

### 公式プラグイン

- [公式プラグイン](https://github.com/gatsbyjs/gatsby/tree/master/packages): Gatsby が管理しているすべての公式プラグインの完全な一覧です。

### 公式スターター

? 1.  [Gatsby のデフォルトスターター]](https://github.com/gatsbyjs/gatsby-starter-default)：デフォルトの定型文でプロジェクトを開始します。この必要最小限のスターターには、必要なメイン Gatsby 構成ファイルが付属しています。_[実施例](http://gatsbyjs.github.io/gatsby-starter-default/)_
? 2.  [Gatsby のブログスターター](https://github.com/gatsbyjs/gatsby-starter-blog): 驚くほど高速なブログを作成するための Gatsby スターター。 _[実施例](http://gatsbyjs.github.io/gatsby-starter-blog/)_
? 3.  [Gatsby の"hello world"スターター](https://github.com/gatsbyjs/gatsby-starter-hello-world): Gatsby サイトに必要な最低限の要素を備えた Gatsby スターター。 _[実施例](https://gatsby-starter-hello-world-demo.netlify.com/)_

## みなさん、これで以上です！

基本的なチュートリアルはこれで終了です。その他、様々なユースケースを[追加のチュートリアル](/tutorial/additional-tutorials/)で紹介していますので、ぜひご覧ください。

これはあくまでチュートリアルです。継続して学習してください！

- クールなものを作りましたか？[#buildwithgatsby](https://twitter.com/search?q=%23buildwithgatsby)タグと[私たちへのメンションを付けて](https://twitter.com/gatsbyjs)Twitter で共有してください！

- 学んだことについて、クールな記事を書きましたか？ぜひとも共有してください！
- 貢献しましょう！Gatsby リポジトリの[Open Issues]](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)を覗き、[貢献者になりましょう](/contributing/how-to-contribute/)。

どのようにするかは「[貢献方法](/contributing/how-to-contribute/)」のドキュメントをご覧ください。

あなたの貢献をお待ちしています 😄。
