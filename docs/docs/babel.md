---
title: Babel
---

? Gatsby は [Babel](https://babeljs.io/) という素晴らしいプロジェクトを使っており、モダンな JavaScript をサポートしていない古いブラウザーへのサポートをしつつ、モダンな JavaScript の記述が可能です。

## サポートするブラウザーをどのように指定するのか

? Gatsby はデフォルトでメジャーなブラウザーの最新の 2 つのバージョンと IE9 以上 、そして 1% 以上のシェアがあるブラウザーをサポートしています。

? つまり JavaScript は自動的にコンパイルされ、古いブラウザー上でも動作が保証されているということです。
? ポリフィルも自動的に追加されるため、コードが古いブラウザー上で不可解に壊れることはもうありません！

? もし、新しいブラウザーのみの対応で良いなら、[サポートするブラウザー](/docs/browser-support/)のページをご覧ください。
? どのように Gatsby を設定すれば 、あなたがサポートしたいブラウザーのみを Babel がコンパイルしてくれるのか記載しています。

## どのようにカスタム .babelrc ファイルを使うか

? Gatsby には、ほとんどのサイトで動くようなデフォルトの .babelrc ファイルがセットアップされています。
? もしあなたが Babel のプリセットやプラグインをカスタムしたい場合、ご自身専用の `.babelrc` をサイトのルートに作成してください。
? そして [`babel-preset-gatsby`](https://github.com/gatsbyjs/gatsby/tree/master/packages/babel-preset-gatsby) をインポートし、
? プラグインやプリセットを追加後、例えば `babel-preset-gatsby` へ `targets` のように値を設定してください。

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
