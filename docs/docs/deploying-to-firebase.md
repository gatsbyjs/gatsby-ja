---
title: Firebase Hosting へのデプロイ
---

このガイドでは、Firebase Hosting へサイトをデプロイする方法を学びます。

[Firebase Hosting](https://firebase.google.com/docs/hosting) は無料で利用できる開発者向けのウェブホスティングプラットフォームです。コマンドひとつでウェブアプリケーションをすばやくデプロイし、静的コンテンツと動的コンテンツをグローバル CDN（コンテンツ配信ネットワーク）経由で提供できます。

## 前提条件

1. 以下を準備してください。

   - ローカルマシンに [Node.js](https://nodejs.org/ja/download/) がインストールされていること
   - [Firebase アカウント](https://console.firebase.google.com)を取得していること
   - [Firebase プロジェクト](https://firebase.google.com/docs/web/setup#create-firebase-project)が作成されていること

1. このガイドはローカルマシン上に Gatsby のプロジェクトが作成されていることを前提としています。

## デプロイ

1. `npm` コマンドで Firebase CLI をインストールします。

   ```shell
   npm install -g firebase-tools
   ```

1. つぎのコマンドを実行後、Google アカウントで Firebase にログインしてください。

   ```shell
   firebase login
   ```

   Firebase プロジェクトの一覧を表示する `firebase projects:list` コマンドを実行することで、Firebase CLI がインストールできているか確認できます。

1. Gatsby のプロジェクトディレクトリーに移動して Firebase をセットアップします。

   ```shell
   firebase init
   ```

   コマンドを実行後、プロンプトでプロジェクトの設定をします。

   - Firebase のプロダクトを選択する際、**Firebase Hosting** を選択してください。
   - 使用したい Firebase プロジェクトを選択するか、まだ作成してない場合は新しくプロジェクトを作成してください。

   公開するディレクトリーの選択を求められたら、そのまま <kbd>enter</kbd> キーを押してください。デフォルトでは `public` ディレクトリーが設定されますが、Gatsby でビルドしたときのデフォルトも `public` ディレクトリーになります。

<<<<<<< HEAD
1. サイトをデプロイする準備を整えるために `gatsby build` コマンドを実行してください。このコマンドは `public` ディレクトリーに公開用のコンテンツを生成します。
=======
1. Update the `firebase.json` with the following cache settings

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [
      {
        "source": "**/*",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "static/**",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          {
            "key": "cache-control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "page-data/**",
        "headers": [
          {
            "key": "cache-control",
            "value": "cache-control: public, max-age=0, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

1. Prepare your site for deployment by running `gatsby build`. This generates a publishable version of your site in the `public` folder.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

1. つぎのコマンドでサイトをデプロイします。

   ```shell
   firebase deploy
   ```

これで完了です！デプロイが終わると、`firebaseProjectId.firebaseapp.com` または `firebaseProjectId.web.app` にアクセスできます。

デプロイをさらにカスタマイズする方法については [Firebase のドキュメント](https://firebase.google.com/docs/hosting/full-config)を確認してください。サイトをデプロイしなおす際には、デプロイの前に `gatsby build` コマンドを実行するのを忘れないでください。

## 関連資料

- [Firebase CLI リファレンス](https://firebase.google.com/docs/cli)
- [Firebase Hosting を使ってみる](https://firebase.google.com/docs/hosting/quickstart)
- [カスタムドメインを接続する](https://firebase.google.com/docs/hosting/custom-domain)
