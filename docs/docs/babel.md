---
title: Babel
---

Gatsby は [Babel](https://babeljs.io/) というすばらしいプロジェクトを使っており、
モダンな JavaScript をサポートしていない古いブラウザーへのサポートをしつつもモダンな JavaScript の記述が可能です。

## サポートするブラウザーをどのように指定するのか

Gatsby は基本的に、メジャーなブラウザーの最新 2 つのバージョン、 IE 9 以上 、
そして 1% 以上のシェアがあればどのようなブラウザーもサポートしています。

つまり JavaScript は自動的にコンパイルされ、古いブラウザー上でも動作が保証されているということです。
Polyfills も自動的に追加されますので、古いブラウザー上で謎の動きをするコードはもうありません！

もし最新のブラウザーのみの対応で良いなら、 [Browser Support](/docs/browser-support/) のページをご覧ください。
どのように Gatsby を設定すれば 、あなたがサポートしたいブラウザーのみを Babel がコンパイルしてくれるか記載しています。

## .babelrc ファイルをどのようにカスタムして使うか

Gatsby には、ほとんどのサイトで動くようなデフォルトの .babelrc ファイルがセットアップされています。
もしあなたが Babel のプリセットやプラグインをカスタムしたい場合、ご自身専用の `.babelrc` をサイトのルートに作成してください。
そして `babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby) をインポートし、
プラグインやプリセットを追加後、例えば `babel-preset-gatsby` へ `targets` のように値を設定してください。

```shell
npm install --save-dev babel-preset-gatsby
```

<!-- prettier-ignore-start -->
```json:title=.babelrc
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"],
  "presets": [
    [
      "babel-preset-gatsby",
      {
        "targets": {
          "browsers": [">0.25%", "not dead"]
        }
      }
    ]
  ]
}
```
<!-- prettier-ignore-end -->

より上級な設定をしたければ、 [`babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby) からデフォルト値をコピーし
必要に応じてカスタマイズするのも良いでしょう。
