---
title: クイックスタート
---

クイックスタートガイドは中上級者向けに書かれています。より易しい入門ガイドが必要であれば、[チュートリアル](/tutorial/)に進んでください！

## Gatsby CLI の使い方

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-quick-start-with-gatsby-create-develop-and-build-gatsby-sites-from-the-command-line"
  lessonTitle="Quick Start with Gatsby: Create, Develop, and Build Gatsby Sites From the Command Line"
/>

**注意**: このビデオでは`npx`を利用して、npm パッケージをインストールすることなく Gatsby サイトを作成しています。`npx gatsby new`を実行することは、gatsby-cli をコンピュータにインストールしてから`gatsby new`を実行することと同じです。

### Gatsby CLI をインストールする

```shell
npm install -g gatsby-cli
```

### 新しいサイトを作成する

```shell
gatsby new gatsby-site
```

### 生成されたディレクトリーに移動する

```shell
cd gatsby-site
```

### 開発サーバーを起動する

```shell
gatsby develop
```

Gatsby はホットリロード対応の開発環境を`localhost:8000`に立ち上げます。

`src/pages`の中にある JavaScript で書かれたページを編集してみてください。保存された変更はブラウザー上でリアルタイムに反映されます。

### プロダクションビルドを作成する

```shell
gatsby build
```

最適化されたプロダクションビルドを作成します。静的 HTML に加えて、ルートごとにバンドルされた JavaScript コードを生成します。

### プロダクションビルドをローカルで確認する

```shell
gatsby serve
```

生成されたサイトのテスト用に、ローカルで動く Web サーバーを立ち上げます。このコマンドを使う前に、`gatsby build`でサイトをビルドしておきましょう。

### CLI コマンドのドキュメント

ターミナル上で`gatsby --help`を実行すると、詳細な CLI ドキュメントを読むことができます。

特定のコマンドについて知りたい場合は、`gatsby COMMAND_NAME --help`を実行してください（例：`gatsby new --help`）。

Gatsby CLI についてより詳しく知りたい場合は、[CLI リファレンス](/docs/gatsby-cli/)を参照してください。
