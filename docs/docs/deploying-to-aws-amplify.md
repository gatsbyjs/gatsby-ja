---
title: AWS Amplify へのデプロイ
---

このガイドでは [AWS Amplify Console](https://aws.amazon.com/jp/amplify/console/) を使って Gatsby サイトをデプロイしてホストする方法を順を追って説明します。

AWS Amplify はクライアントのライブラリー、CLI ツールチェーン、継続的なデプロイとホスティングを行うコンソールの詰め合わせです。開発者は Amplify CLI とライブラリーにより、認証、ストレージ、サーバレス GraphQL/REST API、分析、Lambda 関数などの機能を備えたフルスタックなクラウド・アプリケーションの起動と実行が可能です。Amplify Console はモダンなウェブアプリ（シングルページアプリケーションや静的サイトジェネレーター）の為の継続的なデプロイとホスティングを提供します。継続的デプロイにより、開発者は Git リポジトリにコードをコミットするごとにウェブアプリの更新を反映できます。ホスティングにはグローバルで利用可能な CDN、簡単な独自ドメイン構築と HTTPS 化、feature branch デプロイ、そしてパスワード保護などの機能が含まれます。

## 前提条件

1. [AWS Account に登録する](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation)。AWS account を作成するために初期費用や期間契約はありません。また、登録後すぐに AWS 無料枠へアクセスできます。

1. このガイドは Gatsby プロジェクトがセットアップされていることを前提としています。プロジェクトをセットアップする必要がある場合、[Gatsby Auth starter with AWS Amplify](https://github.com/dabit3/gatsby-auth-starter-aws-amplify) を参照してください。スターターは保護されたクライアント側のルーティングに加え、ユーザー登録とログインのために基本的な認証フローを実装します。

![Gatsby Amplify](./images/amplify-gatsby-auth.gif)

## デプロイ

1. [AWS Amplify Console](https://console.aws.amazon.com/amplify/home) にログインし、「Deploy」の下にある「Get Started」を選択します。
   ![Gatsby Amplify2](./images/amplify-gettingstarted.png)

1. GitHub、Bitbucket、GitLab、あるいは AWS CodeCommit リポジトリーからブランチに接続します。リポジトリーに接続されると、Amplify はブランチにコードをコミットするごとに更新を反映できるようになります。
   ![Gatsby Amplify2](./images/amplify-connect-repo.gif)

1. デフォルトのビルド設定を承認します。サービスロールを持つフロントエンドでバックエンドリソースを反映する権限を Amplify Console に与えます。これによりコンソールは、コードをコミットするごとにバックエンドとフロントエンドの両方の変更を察知し、更新を行います。もし、サービスロールがなければ誘導に従い 1 つ作成し、作成したらコンソールに戻り、ドロップダウンから作成したサービスロールを選択します。
   ![Gatsby Amplify2](./images/amplify-build-settings.gif)

1. 変更内容を吟味し、**Save and deploy** を選択します。Amplify Console はリポジトリーからコードを pull して、バックエンドとフロントエンドの変更をビルドし、ビルド成果物を `https://master.unique-id.amplifyapp.com` にデプロイします。おまけ：様々なデバイスでレイアウトの問題を見つけるためのアプリのスクリーンショット 🔥 
   ![Gatsby Amplify2](./images/amplify-gatsby-deploy.gif)

## 参考資料：

- [AWS Amplify で AWS に次の Gatsby サイトを公開する](/blog/2018-08-24-gatsby-aws-hosting/)。
- もし、あなたが AWS 上のホスティングをさらに管理したいのであれば [AWS S3 に Gatsby.js サイトをデプロイする](/docs/deploying-to-s3-cloudfront/) ことも可能です。

### 追加資料

Jason Lengstorf と Nader Dabit の AWS Amplify を用いたサイトビルドとデプロイのライブストリーム：

https://youtu.be/i9HG8CV-_dQ
