---
title: Tailwind CSS
---

Tailwind は、カスタムユーザーインターフェイスを迅速に構築するためのユーティリティー初の CSS フレームワークです。このガイドでは、 Gatsby と[Tailwind CSS]（https://tailwindcss.com/）の使用方法を紹介します。

## 概要

Tailwind を Gatsby で使用するには、次の 3 つの方法があります：

1. 標準: PostCSS を使用して Tailwind クラスを生成し、 `className`を使用してそれらのクラスを適用できます。
2. CSS-in-JS: Tailwind クラスを Styled Components に統合します。
3. SCSS: [gatsby-plugin-sass](/packages/gatsby-plugin-sass) を使用して、 SCSS ファイルで Tailwind クラスをサポートします。

これらのすべての方法に対して Tailwind をインストールおよび構成する必要があるため、このガイドでは最初にその手順を説明し、その後、PostCSS、CSS-in-JS、または SCSS の解説をします。

## Tailwind のインストールと設定

このガイドでは、Gatsby プロジェクトがセットアップされていることを前提としています。プロジェクトをセットアップする必要がある場合は、[**クイックスタートガイド**]（/ docs / quick-start）に進んでから戻ってください。

1. Tailwind のインストール

```shell
npm install tailwindcss --save-dev
```

2. Tailwind の設定ファイル生成（オプション）

**Note**: Tailwind 1.0.0+ には設定ファイルは必要ありません。

Tailwind を構成するには、Tailwind 設定ファイルを追加する必要があります。幸いなことに、Tailwind にはこれを行うための組み込みスクリプトがあります。次のコマンドを実行するだけです：

```shell
npx tailwind init
```

### オプション #1: PostCSS

1.  Gatsby の PostCSS プラグインをインストール [**gatsby-plugin-postcss**](/packages/gatsby-plugin-postcss)。

```shell
npm install --save gatsby-plugin-postcss
```

2. `gatsby-config.js` ファイルにプラグインを追加する。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-postcss`],
```

3. Tailwind を使用するように PostCSS を設定する。

プロジェクトのルートフォルダーに次の内容の postcss.config.js を作成します。

```javascript:title=postcss.config.js
module.exports = () => ({
  plugins: [require("tailwindcss")],
})
```

4. CSS で Tailwind ディレクティブを使用する

これで、 `@tailwind` ディレクティブを使用して、 Tailwind のユーティリティ、プリフライト、やコンポーネントを CSS に追加できます。また、 `@apply` を使用すると Tailwind の他のすべてのディレクティブと関数を使用することもできます！

CSS で Tailwind を使用する方法の詳細については、[Tailwind ドキュメント](https://tailwindcss.com/docs/installation#3-use-tailwind-in-your-css)をご覧ください。

### オプション #2: CSS-in-JS

これらの手順は、CSS-in-JS ライブラリーがすでにインストールされており、コンポーネントが Styled Components に基づいていることを前提としています。

1. Tailwind Babel Macro のインストール

**注**： `tailwind.macro` は現在 Tailwind 1.0.0+ と互換性がありません。しかし、互換性のあるベータ版は　`tailwind.macro@next` で入手できます。ベータ版を使用するか、 Tailwind 0.7.4 に戻してください。

**オプション 1**: `tailwind.macro@next` をインストールし、 Tailwind 1.0.0+ を使う。

```shell
npm install --save tailwind.macro@next
```

**オプション 2**: `tailwind.macro` の安定版をインストールし、 Tailwind 0.7.4 を使う。

```bash
// Remove tailwind 1.0.0+ if you've already installed it
npm uninstall tailwindcss

// Install tailwind 0.7.4 and stable tailwind.macro
npm install tailwindcss@0.7.4
npm install tailwind.macro
```

2. styled component で Babel Macro (tailwind.macro) を使う

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

1. Gatsby の SCSS プラグイン [**gatsby-plugin-sass**](/packages/gatsby-plugin-sass) と `node-sass` をインストールする。

```shell
npm install --save node-sass gatsby-plugin-sass
```

2. SCSS ファイルで Tailwind クラスを使用できるようにするには、 `tailwindcss` パッケージを `gatsby-config.js` の `postCSSPlugins` パラメーターに追加します。

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      postCssPlugins: [
        require("tailwindcss"),
        require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
      ],
    },
  },
],
```

**注：**オプションで、対応する構成ファイルを追加できます（デフォルトでは、 `tailwind.config.js` です）。
カスタム設定を追加する場合、 `tailwindcss` の後に読み込む必要があります。

## その他の資料

- [PostCSS の概要](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
- [Tailwind のドキュメント](https://tailwindcss.com/)
- [Tailwind を使用する Gatsby スターター](/starters/?c=Styling%3ATailwind&v=2)
