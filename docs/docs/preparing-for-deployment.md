---
title: ウェブサイトをデプロイする準備
---

## 新しい Gatsby プロジェクトを作成する

まず、デプロイのためにあなたの Gatsby プロジェクトを作成して設定します。
もし、あなたがまだ[クイックスタート](/docs/quick-start)を実施していない場合、まずは Gatsby をグローバルインストールしてください。

```shell
npm install --global gatsby-cli
```

そして、以下のコマンドで新しいプロジェクトを作成します。

```shell
gatsby new your-new-project
```

最後に新しいディレクトリに移動します。

```shell
cd your-new-project
```

## あなたのウェブサイトをビルドする

Gatsby でウェブサイト用の静的ファイルを生成する方法は非常に簡単です。以下のコマンドを実行してください。

```shell
gatsby build
```

`public` ディレクトリーにサーバーへコピーするための静的ファイルが出力されます。

## パスのプレフィックスを追加する

もし、あなたが特定のパスにデプロイしたい場合、[パスの接頭辞を追加する](/docs/path-prefix)を読んでください。
（例）`example.com/` の代わりに `example.com/blog/` にデプロイしたい

## ホスティングサービスへデプロイする

あなたの使っているホスティングサービスによっては、追加の作業が必要になるかもしれません。
もし下記のサービスのどれかを使っているなら、それぞれのデプロイ用ドキュメントを読むと良いでしょう。

- [AWS Amplify](/docs/deploying-to-aws-amplify)
- [S3/Cloudfront](/docs/deploying-to-s3-cloudfront)
- [Aerobatic](/docs/deploying-to-aerobatic)
- [Heroku](/docs/deploying-to-heroku)
- [ZEIT Now](/docs/deploying-to-zeit-now)
- [GitLab Pages](/docs/deploying-to-gitlab-pages)
- [Netlify](/docs/deploying-to-netlify)
- [Render](/docs/deploying-to-render)
- [Surge](/docs/deploying-to-surge)
- [GitHub Pages](/docs/how-gatsby-works-with-github-pages)
- [Microsoft Internet Information Server (IIS)](/docs/deploying-to-iis)
- [Firebase Hosting](/docs/deploying-to-firebase)
- [KintoHub](/docs/deploying-to-kintohub)

もし、あなたのホスティングサービスがリストにない場合は、ドキュメントを追加できます！[ドキュメントの作成に参加する](/contributing/docs-contributions)を参照してください。
