---
title: Gatsbyテーマの使い方
---

あらかじめテーマが設定されているスターターを使うことで、Gatsby テーマをすぐに使い始めることができます。

例えば、`gatsby-starter-blog-theme`は `gatsby-theme-blog` パッケージのテーマスターターです。

**通常の Gatsby スターター**は特定の用途に合わせて設定してある Gatsby サイトを新規に作成します。出来上がったサイトはスターターからフォークされるため、スターターへの接続は維持されません。

**Gatsby テーマスターター**は Gatsby テーマが 1 つ以上インストールされた Gatsby サイトを新規に作成します。スターターがテーマをインストールする際、スタンドアローンの npm パッケージとしてテーマへの接続が維持されます。

Gatsby ブログテーマスターターのインストール手順は通常の Gatsby スターターと同様です。

```shell
gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog-theme
```

## テーマスターターは何をする？

公式の Gatsby ブログテーマ用スターターは以下を実行します。

### 1. テーマをインストールし設定する

テーマを使用して作られたスターターの `gatsby-config.js` は最初軽く見えることが多くあります。テーマは `plugins` 配列からインストールされたときに真価を発揮します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-blog",
      options: {},
    },
  ],
  // 自サイトのメタデータをカスタマイズ:
  siteMetadata: {
    title: "My Blog Title",
    author: "My Name",
    description: "My site description...",
    siteUrl: "https://www.gatsbyjs.org/",
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "github",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
}
```

### 2. サンプルのブログ記事を組み立てる

```mdx:title=/content/posts/hello-world.mdx
---
title: Hello, world!
path: /hello-world
---

I'm an example post!
```

ファイルに変更を加えたら、`gatsby develop`を実行して開発サーバーを起動し、変更された箇所をブラウザーで見てみましょう。

## テーマをアップデートする

自分のサイトの `package.json` 内にある `gatsby-theme-blog` のバージョンをアップデートすることで、テーマを最新のものにできます。

`npm install --save gatsby-theme-blog`を再度実行することによりアップデートが行なえます。
