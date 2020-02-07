---
title: Netlifyにデプロイする
---

このガイドはあなたの Gatsby サイトを[Netlify](https://www.netlify.com/)にデプロイし、公開するまでの手順を示したものです。

Netlify は Gatsby サイトをデプロイするための素晴らしい手段です。Netlify はあなたのコードを簡単にメンテナンスでき、
かつ性能も良いウェブサイトもしくはウェブアプリとして公開するための統合された
自動化プラットフォームで、Git をトリガーとした継続的デプロイをはじめ、
インテリジェントなグローバル CDN、DNS 機能、自動 HTTPS 化、コンテンツの高速配信など
多くの機能を提供します。

無料版には無制限の個人・商業プロジェクトと HTTPS 化、公開・非公開リポジトリーからの
継続的デプロイなどが含まれます。

## 公開設定

公開には 2 つの方法があります。

1.) [Git リポジトリー設定](#Gitリポジトリー設定)

2.) [フォルダのアップロード](#フォルダのアップロード)

### Git リポジトリー設定

Netlify は現在[GitHub](https://github.com/), [GitLab](https://about.gitlab.com/) , [Bitbucket](https://bitbucket.org/)を利用したビルドをサポートしています。この場合、あなたはウェブサイトをあなたが指定した過去のバージョンにロールバックすることが可能となります。また、コードをリポジトリにプッシュするだけでウェブサイトを再度デプロイできます。コードの変更ごとに手動でウェブサイトのビルドと公開を行う必要はなくなります。あなたのリポジトリはプライベートでもパブリック、どちらでも構いません。

Netlify にログインすると、トップ画面に `New site from git` と書かれたボタンがありますね？これをクリックして、 ウェブサイトに使われている Git プロバイダーを選択肢ます。そしてあなたのウェブサイトが含まれるリポジトリーを選択すると、下のデプロイ設定を入力する画面が出てきます。

- Branch to deploy: Netlify が監視するブランチを指定します。ここで入力したブランチにコードをプッシュすると、Netlify はウェブサイトのビルドとデプロイを行います。デフォルト値は `master` です。
- Build Command: 上記のブランチにコードをプッシュした際に、Netlify がビルドを行うためのコマンドを指定します。 デフォルト値は `npm run build` です。
- Publish directory: Netlify がウェブサイトの公開に利用するフォルダーを指定します。（例：public, dist, build）デフォルト値は `public`です。
- Advanced build settings: もし、あなたのウェブサイトが環境変数をビルドに用いる場合、設定します。 `Show advanced` をクリックして、 `New Variable` ボタンから指定します。

`Deploy site` ボタンをクリックすると、Netlify はあなたの入力した設定に応じてビルドを開始します。 `Deploys` タブに移動して、 `Deploy log` にデプロイプロセスが表示されていることを確認しましょう。しばらく待つと、公開ウェブサイトの URL が `random-name.netlify.com` の形で表示されます！

### フォルダーのアップロード

もう 1 つの手段として、あなたのウェブサイトに関するフォルダーを Git を介さずに Netlify へアップロードする方法があります。

[ビルド](/docs/glossary#ビルド)に従い、 `gatsby build` コマンドを実行しましょう。Gatsby は公開用のウェブサイトファイルを `public` フォルダーに出力します。 ビルドプロセスによって CSS ・ Javascript ・ HTML と画像ファイルは最適化され、このフォルダーに配置されています。

```shell
gatsby build
```

一度ビルドが完了すれば、Netlify にアップロードする準備は終わりです。 [Netlify](https://app.netlify.com/) へアクセスし、ログインか会員登録を実施します。ログインが完了したら次の文章が現れるはずです。

```text
    Want to deploy a new site without connecting to Git?
          Drag and drop your site folder here
```

デプロイ作業を始めるために、あなたがすべきことは `public` フォルダーをこのエリアにドラッグ＆ドロップするだけです。 Netlify はランダムな名前で新しいサイトを作成し、ファイルのアップロードと公開を開始します。しばらく待つと、公開ウェブサイトの URL が `random-name.netlify.com` の形で表示されます！

![alt text](./images/gatsby-default-starter.png "Gatsby Default Starter")

## 継続的デプロイ

すでにあなたのリポジトリーとウェブサイトは接続済みです！Netlify はリポジトリーにコードがプッシュされるたび、公開用のウェブサイトをビルドして公開します。

## ドメイン設定

Netlify の site にある `Overview` から `Domain Settings` に移動します。 カスタムドメインにあなたのドメインを追加して、Netlify プロジェクト URL を `CNAME` レコードとしてあなたの DNS プロバイダーに設定しましょう。 あなたの持っているドメインで Netlify のウェブサイトを表示できるようになります。

## その他のリソース

- [A Step-by-Step Guide: Gatsby on Netlify](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)
- More [blog posts on Gatsby + Netlify](/blog/tags/netlify)
- [Gatsby Netlify CMS](/packages/gatsby-plugin-netlify-cms)
- [Gatsby + Netlify CMS Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms)
