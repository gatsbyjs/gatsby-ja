---
<<<<<<< HEAD
title: "Gatsby eコマースチュートリアル"
=======
title: "Gatsby E-commerce Tutorial"
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097
---

# 目次

<<<<<<< HEAD
- [目次](#目次)
- [なぜ e コマースサイトで Gatsby を使うのか](#なぜeコマースサイトでGatsbyを使うのか)
- [前提条件](#前提条件)
  - [Stripe と Gatsby はどのように連携させるのか](#StripeとGatsbyはどのように連携させるのか)
- [Gatsby サイトの設定](#Gatsbyサイトの設定)
- [StripeJS プラグインのインストール](#StripeJSプラグインのインストール)
  - [ブラウザでホットリロードされることを確認しよう](#ブラウザでホットリロードされることを確認しよう)
  - [StripeJS プラグインはどのように動作するか](#StripeJプラグインはどのように動作するか)
  - [Stripe のテストキーを取得する](#Stripeのテストキーを取得する)
- [例](#例)
  - [簡単:ボタン 1 つ](#簡単:ボタン1つ)
  - [発展:ソースプラグインを通じて SKU をインポートする](#発展:ソースプラグインを通じてSKUをインポートする)
- [支払いテスト](#支払いテスト)

この発展的なチュートリアルでは、Gatsby を用いて支払いができる基本的な e コマースサイトの UI を構築を学ぶことができます。[Stripe](https://stripe.com)は支払い処理のバックエンドとして用います。

## なぜ e コマースサイトで Gatsby を使うのか

Gatsby を e コマースのサイトに使うメリットは以下のとおりです。
=======
- Demo running [on Netlify](https://gatsby-ecommerce-stripe.netlify.com/)
- Code hosted [on GitHub](https://github.com/gatsbyjs/gatsby/tree/master/examples/ecommerce-tutorial-with-stripe)

## Why use Gatsby for an E-commerce site?

Benefits of using Gatsby for e-commerce sites include the following:

- Security inherent in static sites.
- Blazing fast performance when your pages are converted from React into static files.
- No server component required with Stripe's [client-only Checkout](https://stripe.com/docs/payments/checkout/client-only).
- Cost-efficient hosting of static sites.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

- 静的サイト固有のセキュリティ
- ページを React から静的ファイルに変換する際の超高速パフォーマンス
- 簡単にホストできる

こちらからホストされたデモを見れます： https://gatsby-ecommerce-stripe.netlify.com/

## 前提条件

<<<<<<< HEAD
- これはより高度なチュートリアルなので、以前に Gatsby でサイトを構築したことがある場合は、このチュートリアルの時間が短縮できそうです。([基本チュートリアルはこちら](/tutorial/))
- Stripe アカウント： [アカウント登録はこちら](https://dashboard.stripe.com/register)

### Stripe と Gatsby はどのように連携させるのか

Stripe は顧客から情報を安全に収集して処理できる支払い処理サービスです。Stripe を試すにはこちらにアクセスしてください。[Stripe クイックスタートガイド](https://stripe.com/docs/payments/checkout#tryout)
=======
Stripe is a payment processing service that allows you to securely collect and process payment information from your customers. To try out Stripe for yourself, go to [Stripe’s Quick Start Guide](https://stripe.com/docs/payments/checkout#try-now).

Stripe offers a [hosted checkout](https://stripe.com/docs/payments/checkout) that doesn't require any backend component. You can configure products, SKUs, and subscription plans in the [Stripe Dashboard](https://stripe.com/docs/payments/checkout#configure). If you're selling a single product or subscription (like an eBook) you can hardcode the product's SKU ID in your Gatsby site. If you're selling multiple products, you can use the [Stripe source plugin](/packages/gatsby-source-stripe/) to retrieve all SKUs at build time. If you want your Gatsby site to automatically update, you can use the Stripe webhook event to [trigger a redeploy](https://www.netlify.com/docs/webhooks/) when a new product or SKU is added.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

Stripe の代わりとしては、Square や Braintree などがあります。これらの仕組みは Stripe と非常に似ています。

Stripe はバックエンドコンポーネントを必要としない[hosted checkout](https://stripe.com/docs/payments/checkout)を提供します。製品や SKU、サブスクリプションプランの設定を[Stripe Dashboard](https://stripe.com/docs/payments/checkout#configure)で行うことができます。1 つの製品やサブスクリプション（電子書籍）を販売している場合、Gatsby サイトで商品の SKU ID をハードコーディングできます。複数の商品を販売している場合、[Stripe ソースプラグイン](https://www.gatsbyjs.org/packages/gatsby-source-stripe/)を利用して、ビルド時に全ての SKU を取得できます。Gatsby のサイトを自動的に更新する場合は、Stripe webhook イベントを利用して新しい商品や SKU が追加されたときに再デプロイをトリガー[trigger a redeploy](https://www.netlify.com/docs/)できます。

# Gatsby サイトの設定

ターミナルで `gatsby new` を実行して新しい Gatsby のプロジェクトを作成し、ディレクトリーを先程作成した新しいプロジェクトに変更します。

```shell
<<<<<<< HEAD
gatsby new ecommerce-gatsby-tutorial
cd ecommerce-gatsby-tutorial
```

## StripeJS プラグインのインストール

プラグインを利用してこのデフォルトのスターターの機能を拡張できます。そのようなプラグインの 1 つが `gatsby-plugin-stripe`で、このプロジェクトにインストールします。

```shell
npm install gatsby-plugin-stripe
```

テキストエディタでルートサイトディレクトリーを開き、`gatsby-config.js`に移動します。そして、`gatsby-config.js`の plugins のところに StripeJS プラグインを追加します。`gatsby-config.js`は次のコード例のようになります。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby e-Commerce Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-stripe`,
  ],
}
=======
gatsby new e-commerce-gatsby-tutorial
cd e-commerce-gatsby-tutorial
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097
```

### ブラウザでホットリロードされることを確認しよう

<<<<<<< HEAD
ターミナルで `npm run develop` を実行しましす。これにより、開発サーバーが起動し、サイトに加えた変更がリロードされるので、ブラウザーで変更がプレビューできます。ブラウザを[localhost:8000](http://localhost:8000/)で開くと、デフォルトのホームページが表示されます。

> **ヒント**:もし、すでに Gatsby の開発サーバを `npm run develop` で起動していた場合、コマンドを実行したターミナルで CTRL + C を押してサーバを再起動し、`npm run develop` コマンドを再度実行することで[localhost:8000](http://localhost:8000/)に反映された `gatsby-config.js` の変更を確認できます。

### StripeJS プラグインはどのように動作するか

Stripe は JavaScript ライブラリーを提供します。これにより、Stripe がホストする支払いページに顧客を安全にリダイレクトできます。Gatsby プラグインの `gatsby-plugin-stripe` は全てのページで `<body>` タグの末尾に次のスニペットを追加します：
=======
Run `gatsby develop` in the terminal, which starts a development server and reloads changes you make to your site so you can preview them in the browser. Open up your browser to `http://localhost:8000/` and you should see a default homepage.

### Loading Stripe.js

Stripe provides a JavaScript library that allows you to securely redirect your customer to the Stripe hosted checkout page. Due to [PCI compliance requirements](https://stripe.com/docs/security), the Stripe.js library has to be loaded from Stripe's servers. Stripe provides a [loading wrapper](https://github.com/stripe/stripe-js) that allows you to import Stripe.js like an ES module:

```js
import { loadStripe } from "@stripe/stripe-js"
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

const stripe = await loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")
```

<<<<<<< HEAD
これにより、Stripe の[不正検出](https://stripe.com/docs/stripe-js/reference#including-stripejs)]が容易になります
もし支払い処理をさらにカスタマイズしたり Srtipe のデータをサイトに引いてくる場合は、[Gatsby のプラグインライブラリで Stripe プラグインを確認](https://www.gatsbyjs.org/plugins/?=stripe)してください。

### Stripe のテストキーを取得する
=======
Stripe.js is loaded as a side effect of the `import '@stripe/stripe-js';` statement. To best leverage Stripe’s advanced fraud functionality, ensure that Stripe.js is loaded on every page of your customer's checkout journey, not just your checkout page. This allows Stripe to detect anomalous behavior that may be indicative of fraud as customers browse your website.

To make use of this, install the `stripe-js` module:

```shell
npm install @stripe/stripe-js
```
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

Stripe アカウントにログインして API 資格情報を表示し、[開発者] > [API キー]に移動します。

![Stripe public test key location in Stripe account](stripe-public-test-key.png)

テストモードと本番モードの 2 つのキーがあります。

- 公開可能キー
- シークレットキー

テスト中は _test_.という文字が含まれたキーを使い、本番のコードではライブキーを使う必要があります。名前が示すように、公開可能キーは公開するコード(フロントエンドや GitHub など)に含まれているな愛がありますが、シークレットキーは誰とも共有したり、公開レポジトリにコミットしたりしないでください。このシークレットキーへのアクセスを制限することは重要です。このシークレットキーを持っている人は誰でも Stripe アカウントからリクエストを読み取ったり送信したり、請求や購入に関する情報を見たり、顧客に送信したりする可能性があるからです。

### Stripe アカウントの"クライアント専用組み込み"を有効にします

<<<<<<< HEAD
このチュートリアルでは Stripe の"クライアント専用組み込み"を利用します。この組み込みを利用するには Stipe ダッシュボードの対応する[チェックアウトの設定](https://dashboard.stripe.com/account/checkout/settings)でアクティブにする必要があります。
=======
In this tutorial you will be using Stripe Checkout in client-only mode. You need to enable client-only mode in the [Checkout settings](https://dashboard.stripe.com/account/checkout/settings).
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

![Stripe control to enable the Checkout client-side only integration highlighted](stripe-checkout-clientside-functionality.png)

> 💡 この変更により、製品を管理するために Stripe が提供するインターフェースも変更されます。以前にこのツールを利用したことがある場合は、このことに留意してください。今までに製品管理を利用したことがない場合、心配する必要はありません。

<<<<<<< HEAD
さらに、この組み込みを利用するには、[アカウント設定](https://dashboard.stripe.com/account)で Stripe アカウントの名前を設定する必要があります。

この組み込みの詳細については[Stripe docs](https://stripe.com/docs/payments/checkout#configure)を参照すると良いでしょう。
=======
Additionally, you need to set a name for your Stripe account in your [Account settings](https://dashboard.stripe.com/account). You can find more configuration details in the [Stripe docs](https://stripe.com/docs/payments/checkout#configure).
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

## 例

<<<<<<< HEAD
これらの例の実装は[GitHub](https://github.com/thorsten-stripe/ecommerce-gatsby-tutorial)で見ることができます。

### 簡単:ボタン 1 つ

例えば電子書籍などのシンプルな製品を売っている場合、Stripe の支払いページへのリダイレクトを実行するボタンを 1 つ作成できます。
=======
You can find an implementation of these examples [on GitHub](https://github.com/gatsbyjs/gatsby/tree/master/examples/ecommerce-tutorial-with-stripe).

### Example 1: One Button

If you're selling a single product, like an eBook for example, you can create a single button that will perform a redirect to the Stripe Checkout page:
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

#### 商品と SKU の作成

<<<<<<< HEAD
商品を販売するためにはまず、[Stripe ダッシュボード](https://dashboard.stripe.com/products)または[Stripe API](https://stripe.com/docs/api/products/create)を利用して、Stripe で商品を作成する必要があります。これは、Stripe がフロントエンドからのリクエストが正当であることを検証し、選択された製品/SKU に適切な金額を請求するために必要です。Stripe では、Stripe の支払いで使用する全ての SKU に名前を付ける必要があります。全ての SKU に必ず 1 つ追加してください。

Stripe ダッシュボードでテスト SKU と本番 SKU の両方を作成する必要があります。「テストデータの表示」に切り替えてから、ローカル開発用の製品を作成してください。

#### StripeJS をロードして支払いコンポーネントを作成する
=======
To sell your products, you need to create them in your Stripe account using the [Stripe Dashboard](https://dashboard.stripe.com/products) or the [Stripe API](https://stripe.com/docs/api/products/create). This is required for Stripe to validate that the request coming from the frontend is legitimate and to charge the correct amount for the selected product/SKU. Stripe requires every SKU used with Stripe Checkout to have a name: be sure to add one to all of your SKUs.

You will need to create both test and live product SKUs separately in the Stripe Dashboard. Make sure you toggle to "Viewing test data", then create your products for local development.

#### Create a checkout component that loads Stripe.js and redirects to the checkout
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

`src/components/checkout.js` に新しいファイルを作成します。作成した `checkout.js` は以下のようになります:

```jsx:title=src/components/checkout.js
import React from "react"
import { loadStripe } from "@stripe/stripe-js"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

<<<<<<< HEAD
const Checkout = class extends React.Component {
  // Stripe.jsを公開可能キーで初期化します
  // こちらのダッシュボードからキーを確認できます。
  // https://dashboard.stripe.com/account/apikeys
  componentDidMount() {
    this.stripe = window.Stripe("pk_test_jG9s3XMdSjZF9Kdm5g59zlYd")
  }
=======
const stripePromise = loadStripe("pk_test_jG9s3XMdSjZF9Kdm5g59zlYd")
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

const redirectToCheckout = async event => {
  event.preventDefault()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    items: [{ sku: "sku_DjQJN2HJ1kkvI3", quantity: 1 }],
    successUrl: `http://localhost:8000/page-2/`,
    cancelUrl: `http://localhost:8000/`,
  })

  if (error) {
    console.warn("Error:", error)
  }
}

const Checkout = () => {
  return (
    <button style={buttonStyles} onClick={redirectToCheckout}>
      BUY MY BOOK
    </button>
  )
}

export default Checkout
```

#### 何が起こったの？

<<<<<<< HEAD
React をインポートし、いくつかの style のボタンを追加し、React 関数を導入しました。`componentDidMount()`や、`redirectToCheckout()` といった関数は Stripe の機能の中で最も重要です。`componentDidMount()` 関数はコンポーネントが最初に DOM にマウントされた時に起動する React のライフサイクルメソッドであり、Stripe.js クライアントを初期化するのに適した場所です。コードは以下のようになります。
=======
You imported React, created a function component that returns a button with some styles, and added a `redirectToCheckout` handler that is executed when the button is clicked. The `loadStripe` function returns a Promise that resolves with a newly created Stripe object once Stripe.js has loaded.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

```jsx:title=src/components/checkout.js
const stripePromise = loadStripe("pk_test_jG9s3XMdSjZF9Kdm5g59zlYd")
```

これによって Stripe プラットフォームが識別され、製品とセキュリティの設定に対して支払いリクエストが検証され、Stripe アカウントの支払いが処理されます。

```jsx:title=src/components/checkout.js
const redirectToCheckout = async event => {
  event.preventDefault()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    items: [{ sku: "sku_DjQJN2HJ1kkvI3", quantity: 1 }],
    successUrl: `http://localhost:8000/page-2/`,
    cancelUrl: `http://localhost:8000/`,
  })

  if (error) {
    console.warn("Error:", error)
  }
}
```

`redirectToCheckout()` 関数は支払いのリクエストを検証し、Stripe がホストする支払いページにリダイレクトするか、エラーオブジェクトで解決します。`successUrl` と `cancelUrl` を適切な URL に置き換えてください。

```jsx:title=src/components/checkout.js
return (
  <button style={buttonStyles} onClick={redirectToCheckout}>
    BUY MY BOOK
  </button>
)
```

<<<<<<< HEAD
`render()` 関数は style をボタンに適用し、`redirectToCheckout()` 関数をボタンの onclick イベントにバインドします。

#### 支払いコンポーネントをホームページにインポートする
=======
#### Importing the checkout component into the homepage
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

`src/pages/index.js` ファイルに移動しましょう。ここがルート URL に表示されるホームページです。他の import の下にあるファイルに新しい支払いコンポーネントを import し、`<Layout>` 要素内に `<Checkout />` コンポーネントを追加します。`index.js` ファイルは以下のようになります。

```jsx:title=src/pages/index.js
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Checkout from "../components/checkout" // highlight-line

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Checkout /> {/* highlight-line */}
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
```

<<<<<<< HEAD
ブラウザで[localhost:8000](http://localhost:8000/)に戻り、`npm run develop` を実行している場合は、大きくて魅力的な"BUY MY BOOK"ボタンが表示されます。さあ、クリックしてみましょう！

### 発展：ソースプラグインを通じて SKU をインポートする

SKU の ID をハードコーディングする代わりに、ビルド時に[gatsby-source-stripe plugin](https://www.gatsbyjs.org/packages/gatsby-source-stripe/)を使用して SKU を取得できます。
=======
If you go back to `http://localhost:8000/` in your browser and you have `gatsby develop` running, you should now see a big, enticing "BUY MY BOOK" button. C'mon and give it a click!

### Example 2: Import SKUs via source plugin

Instead of hardcoding the SKU IDs, you can use the [gatsby-source-stripe plugin](/packages/gatsby-source-stripe/) to retrieve your SKUs at build time.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

#### Stripe ソースプラグインの追加

<<<<<<< HEAD
Stripe アカウントから SKU を取得するために使える[gatsby-source-stripe plugin](https://www.gatsbyjs.org/packages/gatsby-source-stripe/)プラグインを追加しましょう。
=======
Add the [gatsby-source-stripe plugin](/packages/gatsby-source-stripe/) which you can use to pull in the SKUs from your Stripe account.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

```shell
npm install gatsby-source-stripe
```

これで、`gatsby-config` ファイルにプラグイン設定を追加できます。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby E-commerce Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Sku"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
  ],
}
```

Stripe アカウントから SKU を取得するにはシークレット API キーを提供する必要があります。シークレットキーは秘密にしておく必要があるので、フロントエンドや GitHub で絶対に共有しないでください。したがって、環境変数を設定して秘密鍵を保存する必要があります。[Gatsby docs](/docs/environment-variables/)で環境変数の使用法について詳しく読むことができます。
プロジェクトのルートディレクトリに `.env.development` ファイルを追加してください。

```text:title=.env.development
# Stripe secret API key
STRIPE_SECRET_KEY=sk_test_xxx
```

定義された環境変数を利用するには `gatsby-config.js` または `gatsby-node.js` で以下のように環境変数を要求する必要があります。

```js:title=gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

最後に、`.gitignore` ファイルで全ての `.env.*` ファイルが除外されていることを確認してください。

```text:title=.gitignore
# dotenv environment variables files
.env
.env.development
.env.production
```

#### SKU を一覧するコンポーネントを作成する

components ディレクトリーに新しく `Products` ファイルを追加します。このファイルには Stripe の SKU と対話するコンポーネントが含まれます。まず第一に、SKU を照会および一覧するコンポーネントが必要です。

```jsx:title=src/components/Products/Skus.js
import React from "react"
import { graphql, StaticQuery } from "gatsby"

export default props => (
  <StaticQuery
    query={graphql`
      query SkusForProduct {
        skus: allStripeSku {
          edges {
            node {
              id
              currency
              price
              attributes {
                name
              }
            }
          }
        }
      }
    `}
    render={({ skus }) => (
      <div>
        {skus.edges.map(({ node: sku }) => (
          <p key={sku.id}>{sku.attributes.name}</p>
        ))}
      </div>
    )}
  />
)
```

<<<<<<< HEAD
クエリを検証し、GraphQL で返されるデータを確認できます。GraphiQL は `npm run develop` を実行した際にhttp://localhost:8000/___graphql にて確認できます。
=======
You can validate your query and see what data is being returned in GraphiQL, which is available at `http://localhost:8000/___graphql` when running `gatsby develop`.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

クエリに満足したら、新しく作成した SKU コンポーネントをインポートできる新しいページを作成しましょう。

```jsx:title=src/pages/advanced.js
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Skus from "../components/Products/Skus" // highlight-line

const AdvancedExamplePage = () => (
  <Layout>
    <SEO title="Advanced Example" />
    <h1>This is the advanced example</h1>
    <Skus /> {/* highlight-line */}
  </Layout>
)

export default AdvancedExamplePage
```

http://localhost:8000/advanced/ に移動すると SKU 名を含む段落の一覧が確認できます。

#### 単一の SKU を提示するコンポーネントの作成

SKU を魅力的でインタラクティブにするため、`Products`ディレクトリに `SkuCard` を新たに作成します。

```jsx:title=src/components/Products/SkuCard.js
import React from "react"

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "300px",
}
const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

const SkuCard = ({ sku, stripePromise }) => {
  const redirectToCheckout = async (event, sku, quantity = 1) => {
    event.preventDefault()
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku, quantity }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

<<<<<<< HEAD
  render() {
    const sku = this.props.sku
    return (
      <div style={cardStyles}>
        <h4>{sku.attributes.name}</h4>
        <p>Price: {formatPrice(sku.price, sku.currency)}</p>
        <button
          style={buttonStyles}
          onClick={event => this.redirectToCheckout(event, sku.id)}
        >
          購入
        </button>
      </div>
    )
  }
=======
  return (
    <div style={cardStyles}>
      <h4>{sku.attributes.name}</h4>
      <p>Price: {formatPrice(sku.price, sku.currency)}</p>
      <button
        style={buttonStyles}
        onClick={event => redirectToCheckout(event, sku.id)}
      >
        BUY ME
      </button>
    </div>
  )
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097
}

export default SkuCard
```

<<<<<<< HEAD
このコンポーネントは SKU 名、適切にフォーマットされた価格設定、および「購入」ボタンを利用して、個々の SKU ごとに適切なカードをレンダリングします。「購入」ボタンは対応する SKU ID で `redirectToCheckout()` 関数をトリガーします。
最後に、`Skus` コンポーネントをリファクタリングして Stripe.js クライアントを初期化し、`props` で Stripe.js クライアントを伝えながら `SkuCards` をレンダリングする必要があります。
=======
This component renders a neat card for each individual SKU, with the SKU name, nicely formatted pricing, and a "BUY ME" button. The button triggers the `redirectToCheckout` function with the corresponding SKU ID.

Lastly, you need to refactor your `Skus` component to `loadStripe`, and render `SkuCards` while handing down the Stripe promise in the `props`:
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

```jsx:title=src/components/Products/Skus.js
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import SkuCard from "./SkuCard"
import { loadStripe } from "@stripe/stripe-js"

const containerStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "1rem 0 1rem 0",
}

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const Skus = () => {
  return (
    <StaticQuery
      query={graphql`
        query SkusForProduct {
          skus: allStripeSku(sort: { fields: [price] }) {
            edges {
              node {
                id
                currency
                price
                attributes {
                  name
                }
              }
            }
          }
        }
      `}
      render={({ skus }) => (
        <div style={containerStyles}>
          {skus.edges.map(({ node: sku }) => (
            <SkuCard key={sku.id} sku={sku} stripePromise={stripePromise} />
          ))}
        </div>
      )}
    />
  )
}

export default Skus
```

#### カートコンポーネントの追加

`redirectToCheckout()` 関数を呼び出して、SKU とその量の配列を提供し、複数のアイテムを同時に請求できます。したがって、支払いページにリダイレクトするそれぞれの「購入」ボタンの代わりに、カートコンポーネントの状態を利用する主要な「支払いに進む」ボタンを提供できます。この例に必要な変更は[GitHub](https://github.com/thorsten-stripe/ecommerce-gatsby-tutorial/tree/cart-example)で確認できます。

# 支払いテスト

テストモード（_test_ という文字列を含む API キーを利用する場合）では、Stripe は様々な支払いシナリオをテストするための[テストカード](https://stripe.com/docs/testing#cards)を提供します。
