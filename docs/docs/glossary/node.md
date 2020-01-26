---
title: Node.js
disableTableOfContents: true
---

Gatsby に必要なソフトウェアの 1 つである Node.js について学びましょう。

## Node.js とは？

Node.js は JavaScript のランタイムで、Google Chrome でも同様のエンジンが使われています。Node.js を使うと、JavaScript アプリケーションをブラウザーなしで実行できます。

2000 年代初頭、Gmail や Flickr などのサービスは JavaScript でロバストなアプリケーションを開発できることを示してくれました。そしてそれらのアプリケーションは、ウェブブラウザーとインターネット接続があれば誰でも利用できるものでした。

しかし、それらの JavaScript アプリケーションは、ランタイムの下でしか実行できないという、大きな制約がありました。
2009 年まで、ランタイムと言えばほぼブラウザーしかありませんでした。
そこで Google によって、部分的にはより高速なブラウザーを開発するために、Chromium プロジェクトが発足しました。その成果が 2008 年にリリースされた Google Chrome と、その新しい JavaScript エンジンである [V8](https://v8.dev/) です。

1 年後、V8 エンジンを使用した Node.js というスタンドアロン JavaScript ランタイムが公開されました。

Node.js をインストールすると、JavaScript を[コマンドライン](/docs/glossary#command-line)
から実行できます。
コマンドラインで `node` と入力すると Node.js のシェルが立ち上がります。スクリプトを実行するには JavaScript ファイルへのパスを含めて入力します。例： `node /Users/gatsbyfan/hello-world.js`

Gatsby を使用する前にまず、[Node.js をインストール](/tutorial/part-zero/#-install-nodejs-and-npm)
する必要があります。

Node.js をインストールすると、Node.js の **パッケージマネージャー** である [npm](/docs/glossary#npm) もあわせてインストールされます。パッケージマネージャーとはモジュールやパッケージをあなたのプロジェクトにインストールしたり更新したりするための特別なソフトウェアです。

Gatsby とその依存パッケージをインストールするためには npm を使います。Gatsby CLI をインストールするにはコマンドラインに `npm install -g gatsby-cli` と入力してください。`-g` フラグを付けると Gatsby がグローバルにインストールされ、コマンドラインで `gatsby` と入力することで Gatsby を使用できるようになります。
例えば `gatsby new` と入力すると新規の Gatsby サイトを作成できます。

## Node.js についてもっと知るには

- [Node.js](https://nodejs.org/en/) 公式ウェブサイト

- [Introduction to Node.js](https://nodejs.dev)

- [NodeSchool](https://nodeschool.io/) オンラインや対面の Node.js のワークショップを提供しています

- [V8](https://v8.dev/) 開発者ブログ
