---
title: サイトでプラグインを利用する
---

Gatsby プラグインは、Node.js パッケージです。 NPM を利用して他の node パッケージと同様にインストールできます。

例えば、`gatsby-transformer-json` は JSON ファイルのサポートを Gatsby データレイヤーに追加するパッケージです。

インストールするには、サイトのルートディレクトリーで下記のコマンドを実行します。

```shell
npm install --save gatsby-transformer-json
```

次にサイトの `gatsby-config.js` にある plugins というキーの配列に `gatsby-transformer-json` を追加します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-transformer-json`],
}
```

プラグインはオプションを取ることができます。例を記載します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    // オプションなしでプラグインを追加するためのショートカット
    "gatsby-plugin-react-helmet",
    {
      // オプション付きで標準的なプラグインを追加するための例
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: "data",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      // options が空の場合、文字列だけでプラグインを指定したときと同等です
      options: {
        plugins: [],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // プラグイン内のプラグイン
        plugins: [`gatsby-remark-smartypants`],
      },
    },
  ],
}
```

プラグインのオプションは Gatsby によって文字列化されるため、関数にすることはできません。
