---
title: `gatsby new` コマンドを使わずに Gatsby でサイトを構築する
---

セキュリティーを担保するために、NPM レジストリーを内部でクローンして利用する企業は多く存在します。もしあなたがそのような企業で働いているとすれば、 `npm install -g gatsby-cli` を実行することはできますが、 GitHub のパブリックリポジトリをクローンする `gatsby new <project-source>` を実行することはできないでしょう。多くの企業は GitHub のパブリックリポジトリをブロックしており、そのような状況下では `gatsby new` は失敗してしまいます。しかし心配にはおよびません。いくつかの手順を踏めば `gatsby new` コマンドを使わずとも Gatsby でサイトを構築できます。

## 環境の準備

Gatsby を使うためには、以下のツールがインストールされている必要があります。

1. [Node.js](/tutorial/part-zero/#install-nodejs)
1. [npm CLI](/tutorial/part-zero/#familiarize-with-npm)
1. [Gatsby CLI](/tutorial/part-zero/#install-the-gatsby-cli)

これらのソフトウェアとそのインストールについての詳細な説明は、[チュートリアル](/tutorial/part-zero/)にて確認してください。

環境構築が終わったら、新しいプロジェクトとなるフォルダーを作成しましょう。

```shell
mkdir my-new-gatsby-site
cd my-new-gatsby-site
```

次に、プロジェクト内で NPM を初期化しましょう。

```shell
npm init
```

それぞれのプロンプトに答え、`package.json` の生成に必要とされる情報を入力しましょう。もしプロンプトをスキップしたければ、 `npm init -y` を実行すると最低限の項目があらかじめ入力されたデフォルトの `package.json` を生成できます。

NPM の初期化が終わったら、必要なパッケージをインストールしましょう。

```shell
npm install --save gatsby react react-dom
```

次に、プロジェクト内に `src` フォルダーを、そしてその中に `pages` ディレクトリーを作成してください。

```shell
mkdir src
cd src
mkdir pages
```

作成した `pages` ディレクトリーの中に、 React コンポーネントを export する `index.js` ファイルを作成します。

```shell
cd pages
touch index.js
```

そうしたらあなたのプロジェクトのスタート点となる React のコードを `index.js` ファイルに追加しましょう。

```jsx:title=src/pages/index.js
import React from "react"

export default () => <h1>こんにちは Gatsby!</h1>
```

最後に、プロジェクトのルートディレクトリーに戻って `gatsby develop` コマンドを実行し、開発サーバーを起動して開発を始めましょう。

```shell
cd ../../
gatsby develop
```

それだけです！初期ページが `localhost:8000` で、GraphiQL IDE が `localhost:8000/___graphql` で起動しているはずです。ここからは[チュートリアル](/tutorial/part-zero/#set-up-a-code-editor)を、 Gatsby が提供する機能をフルに体験するためのコードエディターの設定を手始めとしてご覧ください。
