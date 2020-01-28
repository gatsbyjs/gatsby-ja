---
title: S3/Cloudfront へのデプロイ
---

このガイドでは、[S3](https://aws.amazon.com/jp/s3/) を使用して、Gatsby サイトを AWS にホストし、公開する方法を順を追って説明します。
オプションとして（ただし、非常に推奨）、グローバル CDN である CloudFront を追加することで、あなたのサイトを _さらに高速化_ できます。

## はじめに：AWS CLI

管理者権限を持つ [IAM アカウント](https://console.aws.amazon.com/iam/home?#)を作成し、そのアカウントに対するアクセスキー ID とシークレットアクセスキーを作成します。
これらのアクセスキーは次のステップで必要となります。

AWS CLI をインストールして設定を行います（以下のコマンドを実行する前に Python がインストールされていることを確認してください）：

```shell
pip install awscli
aws configure
```

AWS CLI でアクセスキー ID とシークレットアクセスキーの入力が求められるので、それらを追加します。

## セットアップ：S3

Gatsby サイトが起動・動作し、AWS へのアクセスが設定できたので、次に、あなたのサイトをホストし、AWS で公開する必要があります。

まず、Gatsby S3 プラグインをインストールします：

```shell
npm i gatsby-plugin-s3
```

`gatsby-config.js` に以下を追加してください：（バケット名を変更することを忘れないでください）

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-s3`,
    options: {
      bucketName: "my-website-bucket",
    },
  },
]
```

そして最後に、`package.json` にデプロイ用のスクリプトを追加します。

```json:title=package.json
"scripts": {
   ...
   "deploy": "gatsby-plugin-s3 deploy"
}
```

設定は以上になります！
`npm run build && npm run deploy` を実行してビルドを行うと、あなたのサイトが速やかに S3 にデプロイされます！

## `.env` 変数を使用してデプロイする

デプロイによっては、環境変数を渡す必要があります。環境変数を使用してデプロイするには、`package.json` 内のデプロイ用のスクリプトを次のように更新します。

```json:title=package.json
"scripts" : {
    ...
    "deploy": "npm run -n \"-r dotenv/config\" && npm run build && gatsby-plugin-s3 deploy"
}
```

このコマンドは、最初に `dotenv` を必要とし、次にビルドを実行し、最後に S3 へデプロイします。`dotenv` は、直接インストールする必要のない Gatsby の依存パッケージであり、環境変数をロードし、グローバルで使用できるようにする機能を持っています。

あなたの環境に複数の AWS プロファイルがある場合、デプロイ用のスクリプトの前に `AWS_PROFILE` を宣言することでデプロイできます：

```shell
AWS_PROFILE=yourprofilename npm run deploy
```

## セットアップ：CloudFront

CloudFront はグローバル CDN であり、特に初めての訪問者に対して、もともと非常に高速な Gatsby サイトのロードを _さらに高速化_ できます。さらに、CloudFront は、S3 バケットにカスタムドメイン名と HTTPS サポートを手軽に実現する方法を提供してくれます。

gatsby-plugin-s3 を使用して CloudFront を使ったサイトをデプロイする際に考慮すべき点がいくつかあります。

CloudFront を S3 オリジンに接続するには 2 つの方法があります。もっとも明快な方法は、AWS コンソールを使用する方法であり、Origin Domain Name フィールドにバケット名をコンソールから直接入力します。これにより、S3 オリジンがセットアップされ、IAM を使用してバケットにアクセスするように CloudFront を設定できます。残念ながら、この方法では、サーバーサイド（301/302）リダイレクトの実行が不可能になります。また、これはディレクトリインデックス（ディレクトリにアクセスした場合、index.html が返される）がルートディレクトリーでしか機能しないことを意味します。Gatsby のクライアントサイド JavaScript が後者の問題を補完し、`gatsby-plugin-meta-redirect` などのプラグインが前者の問題を補完できるため、最初はこれらの問題に気付かないかもしれません。しかし、これらの問題が露見しないからといって、それが検索エンジンに影響を与えないわけではありません。

あなたのサイトのすべての機能が正しく機能するためには、代わりに S3 バケットの静的ウェブサイトホスティングのエンドポイントを CloudFront オリジンとして使用する必要があります。残念ながらこの方法では、CloudFront がオリジンとして S3 静的ウェブサイトホスティングのエンドポイントアドレスを使用することで、IAM を介した認証ができないため、バケットをパブリック読み取りとして設定する必要があります。

### gatsby-plugin-s3 の設定

gatsby-plugin-s3 設定ファイルには、通常は空白のままにできるオプションのパラメーター`protocol` と `hostname` があります。ただし、CloudFront を使用している場合、これらのパラメーターはリダイレクトを正しく機能させるために不可欠です。これらのパラメーターを省略すると、リダイレクトは S3 静的ウェブホスティングのエンドポイントに対して実行されます。つまり、ユーザーが CloudFront の URL 経由でサイトにアクセスし、リダイレクトが実行された場合、代わりに S3 静的ウェブホスティングのエンドポイントにリダイレクトされます。これにより、HTTPS が無効になり、（さらに重要なことに）ユーザーのアドレスバーに見苦しくてプロフェッショナルでない URL が表示されてしまいます。

`protocol` と `hostname` パラメーターを指定することで、選択したドメインに対してリダイレクトを適用できます。

```javascript:title=gatsby-config.js
{
    resolve: `gatsby-plugin-s3`,
    options: {
        bucketName: "my-example-bucket",
        protocol: "https",
        hostname: "www.example.com",
    },
}
```

サイトの URL を gatsby-config.js 内の他の場所で使用する場合、設定ファイルのトップに URL をたった一行で定義できます。

```javascript:title=gatsby-config.js
const siteAddress = new URL("https://www.example.com")
```

そして、Gatsby の設定で次のように参照できます。

```javascript:title=gatsby-config.js
{
    resolve: `gatsby-plugin-s3`,
    options: {
        bucketName: "my-example-bucket",
        protocol: siteAddress.protocol.slice(0, -1),
        hostname: siteAddress.hostname,
    },
}
```

設定ファイル内の別の場所で絶対アドレスが必要な場合は、`siteAddress.href` からアクセスできます。

## 関連資料：

- [AWS で Gatsby をただしく使う方法](https://blog.joshwalsh.me/aws-gatsby/)
- [gatsby-plugin-s3 を利用した CloudFront の使用方法](https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/with-cloudfront.md)
- [AWS Amplify を使用して Gatsby サイトを AWS に公開する](/blog/2018-08-24-gatsby-aws-hosting/)
- [Escalade Sports：Gatsby のホスティングで月額 5000 ドルから 5 ドルへ](/blog/2018-06-14-escalade-sports-from-5000-to-5-in-hosting/)
- [Gatsby サイトを AWS S3 にデプロイする](https://benenewton.com/deploy-your-gatsby-js-site-to-aws-s-3)
