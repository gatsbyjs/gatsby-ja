---
title: PostCSS
---

PostCSS は拡張した構文と機能を、モダンで、ブラウザフレンドリーな CSS に変換します。このガイドでは、Gatsby と PostCSS をはじめる方法を紹介します。

## PostCSS のインストールと設定

このガイドは Gatsby プロジェクトがセットアップされていることを前提としています。プロジェクトをセットアップする必要がある場合、[クイックスタートガイド](/docs/quick-start/)を参照してください。

1.  Gatsby プラグイン [gatsby-plugin-postcss](/packages/gatsby-plugin-postcss/) をインストールします。

```shell
npm install --save gatsby-plugin-postcss
```

2.  `gatsby-config.js` ファイルにプラグインを追加します。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-postcss`],
```

> **ヒント**: PostCSS にオプションを渡したい場合は、プラグインオプションの中で設定します。設定可能な全てのオプションは [postcss-loader](https://github.com/postcss/postcss-loader) にて確認できます。

3.  PostCSS（`.css` ファイル）にスタイルシートを記述し、通常通り require あるいは import してください。

```css:title=styles.css
@custom-media --med (width <= 50rem);

@media (--med) {
  a {
    &:hover {
      color: color-mod(black alpha(54%));
    }
  }
}
```

```javascript
import "./styles.css"
```

### CSS modules と併用する

CSS モジュールを使用するための追加設定は不要です。拡張子に `.module` を追加するだけです。例：`App.css -> App.module.css` 。 module 拡張子を持つファイルは CSS モジュールとして処理されます。

### PostCSS プラグイン

PostCSS 出力に追加の後処理を行うプラグインを追加したい場合、プラグインオプションの中で設定可能です：

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [require(`postcss-preset-env`)({ stage: 0 })],
    },
  },
],
```

あるいは、`postcss.config.js` で追加したい PostCSS プラグインを設定可能です：

```javascript:title=postcss.config.js
const postcssPresetEnv = require(`postcss-preset-env`)

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
    }),
  ],
})
```

## その他の資料

- [Introduction to postcss](https://www.smashingmagazine.com/2015/12/introduction-to-postcss/)
