---
title: Tailwind CSS
---

Tailwind CSS はカスタムユーザーインターフェースを早く構築するためのユーティリティファーストな CSS フレームワークです。このガイドでは、Gatsby と [Tailwind CSS](https://tailwindcss.com/) を組み合わせて使用する場合の手順をご紹介します。

## 概要

Tailwind と Gatsby を組み合わせて使用する方法は 3 つあります。

1. 通常： Tailwind のクラスを生成するために PostCSS を使用してください。そうすると `className` を使ってそれらのクラスを反映できます。
2. CSS-in-JS: Tailwind のクラスを Styled Components に統合してください。
3. SCSS: SCSS ファイルで Tailwind のクラスをサポートする[gatsby-plugin-sass](/packages/gatsby-plugin-sass)を使用してください。

これらの方法を使用するために Tailwind のインストールと設定をしなければいけません。このガイトではまずその手順を説明するので、PostCSS、CSS-in-JS、SCSS それぞれの指示にしたがってください。

## Tailwind のインストールと設定

このガイドでは Gatsby プロジェクトをセットアップしている必要があります。もしまだプロジェクトをセットアップしていないなら、まず [**Quick Start guide**](/docs/quick-start)を読んでから戻ってきてください。

1. Tailwind のインストール

```shell
npm install tailwindcss --save-dev
```

2. Tailwind 設定ファイルの生成（オプション）

**ヒント：** Tailwind 1.0.0+では設定ファイルは不要です。

Tailwind を設定するためには Tailwind 設定ファイルを追加する必要があるでしょう。幸運なことに Tailwind はそれを行うためのビルド用スクリプトがあります。次のコマンドを実行するだけです。

```shell
npx tailwindcss init
```

### オプション #1: PostCSS

1.  Gatsby PostCSS プラグイン [**gatsby-plugin-postcss**](/packages/gatsby-plugin-postcss)をインストールしてください。

```shell
npm install --save gatsby-plugin-postcss
```

2.  `gatsby-config.js` ファイルにプラグインを記載してください。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-postcss`],
```

3. Tailwind を使用するために必要な PostCSS を設定してください。

プロジェクトのルートフォルダーに `postcss.config.js` を作成し、次の内容を記載します。

```javascript:title=postcss.config.js
module.exports = () => ({
  plugins: [require("tailwindcss")],
})
```

4. CSS ファイルで Tailwind ディレクティブを使用してください

これで `@tailwind` ディレクティブを使用して、CSS ファイルに Tailwind のユーティリティ、プリフライト、コンポーネントを追加出来ます。また `@apply` やその他すべての Tailwind ディレクティブも使用できるようになります！

もっと Tailwind CSS の使い方をもう少し学びたいなら、[Tailwind Documentation](https://tailwindcss.com/docs/installation#3-use-tailwind-in-your-css)を訪問してみてください。

### オプション #2: CSS-in-JS

次の手順は CSS-in-JS ライブラリーがすでにインストールされていることを前提としており、Styled Components を例としています。

1. Tailwind Babel Macro をインストール

**ヒント**: 現在 `tailwind.macro` は Tailwind 1.0.0+と互換性がありません。しかし、新しいフォークされたプロジェクトが `twin.macro` にあり、Tailwindcss v1.2 クラスをサポートしています。 現在はプレリリース中なので、本記事の記載時点ではすべてのプラグインのサポートは保証できません。あるいは、Tailwind 0.7.4 に戻しての使用もできます。

**オプション 1**: `twin.macro` をインストールし、Tailwind 1.2.0+を使用する。

1. Twin と Emotion をインストール

```shell
npm install -D twin.macro @emotion/core @emotion/styled gatsby-plugin-emotion
```

2. Tailwind base styles をインポート

```javascript:title=gatsby-browser.js
import "tailwindcss/dist/base.css"
```

3. Gatsby emotion プラグインを使用可能にする

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```

**オプション 2**: 安定版 `tailwind.macro` をインストールし、Tailwind 0.7.4 を使用する。

```bash
// もしインストール済みならtailwind 1.0.0+を削除
npm uninstall tailwindcss

// tailwind 0.7.4と安定版tailwind.macroをインストール
npm install tailwindcss@0.7.4
npm install tailwind.macro
```

2. styled component で Babel Macro (`tailwind.macro`)を使用する

```javascript
import styled from "styled-components"
import tw from "tailwind.macro"

// All versions
const Button = styled.button`
  ${tw`bg-blue hover:bg-blue-dark text-white p-2 rounded`};
`

// tailwind.macro@next
const Button = tw.button`
  bg-blue hover:bg-blue-dark text-white p-2 rounded
`
```

### オプション #3: SCSS

1. Gatsby SCSS プラグイン [**gatsby-plugin-sass**](/packages/gatsby-plugin-sass) と `node-sass` をインストールしてください。

```shell
npm install --save node-sass gatsby-plugin-sass
```

2. SCSS ファイルで Tailwind クラスを使用できるようにするため、`postCSSPlugins` パラメーターに `tailwindcss` パッケージを `gatsby-config.js` で追加してください。

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      postCssPlugins: [
        require("tailwindcss"),
        require("./tailwind.config.js"), // オプション： Tailwind CSS カスタム設定を読み込む
      ],
    },
  },
],
```

**ヒント：** 場合によっては、対応設定ファイルの追加もできます（デフォルトでは `tailwind.config.js` というファイル名になります）。
もしカスタム設定を追加しているなら、`tailwindcss` の後に読む込む必要があります。

## その他の資料

- [PostCSS イントロダクション](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
- [Tailwind ドキュメント](https://tailwindcss.com/)
- [Tailwind を使用した Gatsby スターター集](/starters/?c=Styling%3ATailwind&v=2)
