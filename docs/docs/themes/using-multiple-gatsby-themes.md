---
title: 複数のGatsbyテーマを利用する
---

Gatsby テーマは組み合わせて利用されることを想定しています。つまり、複数のテーマを同時にインストール可能ということです。

例えば、 `gatsby-starter-theme` は 2 つの Gatsby テーマ（`gatsby-theme-blog` と `gatsby-theme-notes`）から成ります。

```shell
gatsby new my-notes-blog https://github.com/gatsbyjs/gatsby-starter-theme
```

`gatsby-config.js` 内に複数のテーマパッケージを記述できます。 `gatsby-starter-theme` は `gatsby-theme-blog` と `gatsby-theme-notes` 両方のテーマパッケージを含んでいます。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-notes`,
      options: {
        mdx: true,
        basePath: `/notes`,
      },
    },
    // gatsby-plugin-theme-ui を用いる場合、設定内の最後のテーマによって
    // 他のテーマの theme-ui の記述がオーバーライドされることがあります
    { resolve: `gatsby-theme-blog` },
  ],
  siteMetadata: {
    title: `Shadowed Site Title`,
  },
}
```

デフォルトの設定では、ブログはルートパス（`/`）から配信され、ノートの内容は `/notes`から配信されます。

ローカル開発サーバーを起動し、サイトを確認するには `gatsby develop` を実行します。

![The homepage of the site created by gatsby-theme-starter](../images/gatsby-theme-starter-home.png)

![The `notes` route of a site created by gatsby-theme starter](../images/gatsby-theme-starter-notes.png)

## チュートリアル

順を追ったチュートリアルを確認するには、["複数のテーマを同時に利用する" チュートリアル](/tutorial/using-multiple-themes-together)を見ましょう。
