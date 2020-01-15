---
title: サイトでプラグインを利用する
---

Gatsby プラグインは、Node.js パッケージです。 NPM を利用して他の node パッケージと同様にインストールできます。

例えば、`gatsby-transformer-json` は JSON ファイルのサポートを Gatsby データレイヤーに追加するパッケージです。

インストールするには、サイトのルートディレクトリーで下記のコマンドを実行します。

```shell
npm install --save gatsby-transformer-json
```

Then in your site's `gatsby-config.js` you add `gatsby-transformer-json` to the plugins array like:

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-transformer-json`],
}
```

Plugins can take options. For example:

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    // Shortcut for adding plugins without options.
    "gatsby-plugin-react-helmet",
    {
      // Standard plugin with options example
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: "data",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      // Blank options, equivalent to string-only plugin
      options: {
        plugins: [],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // plugins inside plugins
        plugins: [`gatsby-remark-smartypants`],
      },
    },
  ],
}
```

Note that plugin options will be stringified by Gatsby, so they cannot be functions.
