---
title: Babel
---

<<<<<<< HEAD
Gatsby は [Babel](https://babeljs.io/) という素晴らしいプロジェクトを使っており、モダンな JavaScript をサポートしていない古いブラウザーへのサポートをしつつ、モダンな JavaScript の記述が可能です。
=======
Gatsby uses the phenomenal project [Babel](https://babeljs.io/) to enable support for writing modern JavaScript — while still supporting older browsers.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

## サポートするブラウザーをどのように指定するのか

<<<<<<< HEAD
Gatsby はデフォルトでメジャーなブラウザーの最新の 2 つのバージョンと IE9 以上 、そして 1% 以上のシェアがあるブラウザーをサポートしています。

つまり JavaScript は自動的にコンパイルされ、古いブラウザー上でも動作が保証されているということです。
ポリフィルも自動的に追加されるため、コードが古いブラウザー上で不可解に壊れることはもうありません！

もし、新しいブラウザーのみの対応で良いなら、[サポートするブラウザー](/docs/browser-support/)のページをご覧ください。
どのように Gatsby を設定すれば 、あなたがサポートしたいブラウザーのみを Babel がコンパイルしてくれるのか記載しています。
=======
Gatsby supports by default the last two versions of major browsers, IE 9+, as well as any browser that still has 1%+ browser share.

This means that your JavaScript is automatically compiled to ensure it works on older browsers. Polyfills are also automatically added — no more shipping code which mysteriously breaks on older browsers!

If you only target newer browsers, see the [Browser Support](/docs/browser-support/) docs page for how to instruct Gatsby on which browsers you support and then Babel will start compiling for only these browsers.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

## どのようにカスタム .babelrc ファイルを使うか

<<<<<<< HEAD
Gatsby には、ほとんどのサイトで動くようなデフォルトの .babelrc ファイルがセットアップされています。
もしあなたが Babel のプリセットやプラグインをカスタムしたい場合、ご自身専用の `.babelrc` をサイトのルートに作成してください。
そして [`babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby) をインポートし、
プラグインやプリセットを追加後、例えば `babel-preset-gatsby` へ `targets` のように値を設定してください。
=======
Gatsby ships with a default .babelrc setup that should work for most sites. If you'd like to add custom Babel presets or plugins, you can create your own `.babelrc` at the root of your site, import [`babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby), and add additional plugins, presets, and pass options to `babel-preset-gatsby`, e.g. `targets`.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

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

より高度な設定をしたければ、 [`babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby) からデフォルト値をコピーし、必要に応じてカスタマイズすることも出来ます。
