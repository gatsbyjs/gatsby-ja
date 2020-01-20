---
title: "レシピ: サイトをデプロイする"
---

ショータイム。満足ゆくサイトができたら、あとはそれをデプロイするだけです。

## デプロイの準備

### 前提条件

- [Gatsby サイト](/docs/quick-start)
- [Gatsby CLI](/docs/gatsby-cli)がインストールされていること

### 手順

1. 開発サーバーが起動している場合は停止します。（多くの場合はコマンドラインで `Ctrl + C`）

2. ルートディレクトリー（`/`）の標準のサイトパスをビルドするには、Gatsby CLI の `gatsby build` を使います。ビルドされたファイルは `public` フォルダーに置かれます。

```shell
gatsby build
```

3. `/` 以外のサイトパス（`/site-name/` など）をビルドするには、`gatsby-config.js` に次のようにパスのプレフィックスを追記してください。

```js:title=gatsby-config.js
module.exports = {
  // `/yourpathprefix`を任意のパスに置換
  pathPrefix: `/yourpathprefix`,
}
```

これにはいくつかの用途があります -- 例えば、Gatsby 製のブログサイトを Gatsby 製でないサイトと同じドメインでホストする場合です。サイト本体を `example.com` で動かし、パスプレフィックスを設定した Gatsby サイトは `example.com/blog` 以下に置くことができます。

4. パスのプレフィクスを `gatsby-config.js` に設定した後、`gatsby build` を `--prefix-paths` フラグをつけて実行することで、Gatsby サイトの URL と `<Link>` タグのはじめに設定したプレフィクスを自動的に追加できます。

```shell
gatsby build --prefix-paths
```

5. `gatsby build` でビルドした時と `gatsby develop` で動作させた時とでサイトの見た目が変わらないことを確認しましょう。ビルド後に `gatsby serve` をすることで、本番環境へデプロイする前にビルド成果物を確認（またはデバッグ）できます。

```shell
gatsby build && gatsby serve
```

### 追加資料

- サイトを作成しデプロイするまでの一連の[チュートリアル（その 1）](/tutorial/part-one/#deploying-a-gatsby-site)
- [パフォーマンス最適化](/docs/performance/)について学ぶ
- [他のデプロイ関連のトピックス](/docs/preparing-for-deployment/)について読む
- その他ホスティングサービスへのデプロイ方法についての[ドキュメント](/docs/deploying-and-hosting/)

## Netlify にデプロイする

[`netlify-cli`](https://www.netlify.com/docs/cli/) を使って Gatsby アプリケーションをコマンドラインからデプロイできます。

### 前提条件

- `index.js` コンポーネントを持った [Gatsby サイト](/docs/quick-start)
- [netlify-cli](https://www.npmjs.com/package/netlify-cli)パッケージがインストールされていること
- [Gatsby CLI](/docs/gatsby-cli)がインストールされていること

### 手順

1. `gatsby build` で Gatsby アプリケーションをビルドします。

2. `netlify login` で Netlify にログインします。

3. `netlify init` を実行し、"Create & configure a new site"（新規サイトを作成/設定）オプションを選択します。

4. あなたのサイト名を入力します。あるいは空欄のまま Enter を押すとランダムな名前が付けられます。

5. [チーム](https://www.netlify.com/docs/teams/)を選択します。

6. デプロイパスを `public/` に変更します。

7. 正常に動作していることを確認できたら `netlify deploy --prod` で本番環境にデプロイします。

### 追加資料

- [Netlify でホストする](/docs/hosting-on-netlify)
- [gatsby-plugin-netlify](/packages/gatsby-plugin-netlify)

## ZEIT Now にデプロイする

[Now CLI](https://zeit.co/download)を使って Gatsby アプリケーションをコマンドラインからデプロイできます。

### 前提条件

- [ZEIT Now](https://zeit.co/signup)アカウント
- `index.js` コンポーネントを持った [Gatsby サイト](/docs/quick-start)
- [Now CLI](https://zeit.co/download)パッケージがインストールされていること
- [Gatsby CLI](/docs/gatsby-cli)がインストールされていること

### 手順

1. `now login` で Now CLI にログインします。

2. Gatsby アプリケーションディレクトリーに移動します。

3. `now` でデプロイします。

### 追加資料

- [ZEIT Now にデプロイする](/docs/deploying-to-zeit-now/)
