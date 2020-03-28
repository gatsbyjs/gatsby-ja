---
title: ESLint を利用する
---

ESLint とは JavaScript の静的解析に使われるオープンソースのツールです。一般的にリントと呼ばれ、問題のあるコードを検出するのに使われます。多くのプログラミング言語にはリントツールが存在し、言語によってはコンパイラーがコンパイルプロセスの一環としてリント機能を内包していることもあります。

動的で型規約が希薄な JavaScript は、エラーが生まれやすい言語です。コンパイルというプロセスの恩恵を受けられない中、JavaScript はシンタックス等のエラーを見つけるために実行されることがしばしばあります。ESLint のようなリントツールを使うと、実際にコードを実行することなく問題を発見できます。

## ESLint の使い方

Gatsby は [ESLint](https://eslint.org) をデフォルトで組み込んでいます。ほとんどのユーザーにとってはそのままの設定で十分でしょう。もしあなたが ESLint の設定をさらにカスタマイズ（例えば組織特有の設定など）したいのであれば、このガイドを参考にしてください。

<<<<<<< HEAD
Gatsby にあらかじめ用意されている [ESLint config](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.js)を応用して、お好みのルールやプラグインを追加してください。
=======
You'll replicate (mostly) the [ESLint config Gatsby ships with](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts) so you can then add additional presets, plugins, and rules.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

```shell

# 必要となるパッケージをインストールします
npm install --save-dev eslint-config-react-app
```

インストールが完了したら、プロジェクトのルートディレクトリーに `.eslintrc.js` というファイルを以下のコマンドを使って作成しましょう。

```shell
# ESLint の設定ファイルを作成する
touch .eslintrc.js
```

### ESLint の設定

以下のスニペットを、作成した `.eslintrc.js` にコピーしてください。その後お好きなプリセット、プラグイン、もしくはルールを追加することもできます。

```js:title=.eslintrc.js
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
}
```

<<<<<<< HEAD
ヒント： ESLint ファイルが存在しない場合、Gatsby は ESLint ローダーを追加します。このローダーは ESLint の実行結果を、Gatsby が実行されているターミナル画面と、ブラウザーの開発コンソールに表示させます。これにより新たに保存したファイルに対しての分析結果をいちはやく確認できます。カスタマイズされた `.eslintrc` ファイルが存在する場合、Gatsby は開発者に ESLint の管理を完全にまかせます。したがって `eslint-loader` はオーバーライドされ、ルールを変更するには開発者が全てを管理する必要があります。これを実現するひとつの手段として、[`gatsby-eslint-plugin`](/packages/gatsby-plugin-eslint/)が用意されているのでそちらも参考にしてみてください。これを使う場合もあらかじめ Gatsby に用意されている [ESLint config](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.js)は完全にオーバーライドされます。もしこれらの設定を活用したければ、作成される設定ファイルにコピーする必要があります。
=======
Note: When there is no ESLint file Gatsby implicitly adds a barebones ESLint loader. This loader pipes ESLint feedback into the terminal window where you are running or building Gatsby and also to the console in your browser developer tools. This gives you consolidated, immediate feedback on newly-saved files. When you include a custom `.eslintrc` file, Gatsby gives you full control over the ESLint configuration. This means that it will override the built-in `eslint-loader` and you need to enable any and all rules yourself. One way to do this is to use the Community plugin [`gatsby-eslint-plugin`](/packages/gatsby-plugin-eslint/). This also means that the default [ESLint config Gatsby ships with](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.ts) will be entirely overwritten. If you would still like to take advantage of those rules, you'll need to copy them to your local file.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

### ESLint を無効にする

ESLint を使わない場合は、空の `.eslintrc` ファイルをルートディレクトリーに用意してください。Gatsby が設定ファイルの有無で `eslint-loader` を有効化するか判断するため、空ファイルがあるだけで ESLint は無効化されます。
