---
title: ZEIT Now へのデプロイ
---

[ZEIT Now](https://zeit.co/now) はウェブサイトとサーバーレス API のためのクラウドプラットフォームであり、Gatsby のプロジェクトを独自ドメイン（または無料の `.now.sh` がついた URL）にデプロイできます。

このガイドでは、少ないステップではじめる方法を紹介します。

## ステップ 1：Now CLI のインストール

[npm](https://www.npmjs.com/) を使って Now CLI をインストールするには、つぎのコマンドを実行します。

```shell
npm install -g now
```

## ステップ 2：デプロイ

プロジェクトのルートディレクトリーでつぎのコマンドを実行すると、アプリケーションをデプロイできます。

```shell
now
```

これで完了です！

これでサイトがデプロイされ、このようなリンクが表示されます：https://gatsby-functions.now-examples.now.sh

## 関連資料

- [プロジェクト例](https://github.com/zeit/now/tree/master/examples/gatsby)
