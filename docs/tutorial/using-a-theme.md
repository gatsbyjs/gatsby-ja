---
title: テーマを使う
---

このチュートリアルでは、Gatsby の公式ブログテーマを使用して新しいサイトを作成することにより、Gatsby テーマの使用方法を学習します。

## ブログテーマスターターを使用して新しいサイトを作成する

テーマスターターを使用してサイトを作成する方法は、通常の Gatsby スターターを使用する方法と同じです。

```shell
gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog-theme
```

## サイトを立ち上げる

スターターから新しいサイトを作成するとブログテーマの依存関係がすべてインストールされます。次に、サイトを立ち上げて、どのようなサイトが立ち上がったのか確認しましょう。

```shell
cd my-blog
gatsby develop
```

![Gatsbyのブログスターターを使用したプロジェクトを起動した時のデフォルト画面](./images/starter-blog-theme-default.png)

## アバターを変更する

ブログテーマスターターには、アバター用の灰色の無地の画像が付属しています。アバター画像を選び、`/content/assets/avatar.png` の画像を上書きすることで、独自のアバターに変更できます。

## サイトのメタデータを更新する

`gatsby-config.js` ファイルにあるサイトのメタデータを書き換えることにより、サイトの情報をカスタマイズできます。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-blog",
      options: {},
    },
  ],
  // 以下を変更することでサイトのメタデータをカスタマイズできます。
  {/* highlight-start */}
  siteMetadata: {
    title: "My Blog",
    author: "Amberley Romo",
    description: "A collection of my thoughts and writings.",
    siteUrl: "https://amberley.blog/",
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/amber1ey",
      },
      {
        name: "github",
        url: "https://github.com/amberleyromo",
      },
    ],
  },
  {/* highlight-end */}
}
```

## 自己紹介を変更する

Gatsby テーマを使用すると、コンポーネントシャドウイングと呼ばれるものを利用できます。これによりテーマに含まれるデフォルトのコンポーネントの内容を、作成したカスタムコンポーネントの内容で置き換えることができます。

<<<<<<< HEAD
Gatsby の公式ブログテーマのパッケージには、サイト作成者の自己紹介のコンテンツを含むコンポーネントがあります。そのコンポーネントへのファイルパス（サイトのパスではなくブログテーマ内）は、`gatsby-theme-blog/src/components/bio-content.js` です。このファイルパスは、サイトの `node_modules/gatsby-theme-blog` ディレクトリーのテーマを調べることで見つけることができます。
=======
The Gatsby blog theme package has a component that contains the content of the site author's biography. The file path to that component (in the blog theme package, not your site) is `src/gatsby-theme-blog/components/bio-content.js`. You can find this path by looking through the theme in your site's `node_modules/gatsby-theme-blog` directory.
>>>>>>> 9df3cf44052398d936d607e319857a9e33083b10

ファイルツリーを見ると、次のように表示されます。

```text
my-blog
├── content
│   ├── assets
│   │   └── avatar.png
│   └── posts
│       ├── hello-world.mdx
│       └── my-second-post.mdx
├── src
│   └── gatsby-theme-blog
│       ├── components
│       │   └── bio-content.js
│       └── gatsby-plugin-theme-ui
│           └── colors.js
├── gatsby-config.js
└── package.json
```

サイトの `src` ディレクトリーに `gatsby-theme-blog` ディレクトリーがあります。ブログテーマのディレクトリー（`node_modules/gatsby-theme-blog`）のファイルのパスと一致するパスを持つそのディレクトリーに配置されたファイルは、元のテーマより優先して読み込まれます。

> 💡 ディレクトリーの名前（ここでは `gatsby-theme-blog` ）は、公開されたテーマパッケージの名前を正確に反映する必要があります。この場合は[`gatsby-theme-blog`](https://www.npmjs.com/package/gatsby-theme-blog)になります。

`bio-content.js` ファイルを開き、コンテンツを編集します。

```jsx:title=bio-content.js
import React, { Fragment } from "react"

export default () => (
  {/* highlight-start */}
  <Fragment>
    This is my updated bio.
    <br />
    It's shadowing the content from the theme.
  </Fragment>
  {/* highlight-end */}
)
```

アバター、サイトの情報、自身の自己紹介を更新することで、以下のようなサイトの見た目になります。

![現在のチュートリアルで編集したプロジェクトのスクリーンショット](./images/starter-blog-theme-edited.png)

## 独自のブログコンテンツを追加する

以下を行うことで、スターターのデモコンテンツを削除し、最初のブログ投稿を投稿できます。

### 新しいブログ投稿を作成する

`my-blog/content/posts` に新しいファイルを作成します。 好きな名前（拡張子は `.md` または `.mdx`）を付けて、コンテンツを追加してください！

以下が例です。

```mdx:title=my-blog/content/posts/my-first-post.mdx
---
title: My first post
date: 2019-07-03
---

This will be my very first post on this blog!
```

### デモコンテンツを削除する

`/content/posts` ディレクトリーにある 2 つのデモコンテンツを削除します。

- `my-blog/content/posts/hello-world.mdx`
- `my-blog/content/posts/my-second-post.mdx`

開発環境を再起動したら、ブログコンテンツが更新されていることを確認できます。

![Screenshot of project with updated post content](./images/starter-blog-theme-updated-content.png)

## テーマの色を変更する

ブログのテーマには、Gatsby デフォルトの紫色のテーマが付属していますが、サイトのテーマを置き換えることで、心ゆくまで色をカスタマイズできます。このチュートリアルでは、いくつかの色を変更します。

`/src/gatsby-theme-blog/gatsby-plugin-theme-ui/colors.js` を開き、ファイルのコメントアウトを外します。

```javascript:title=colors.js
import merge from "deepmerge"
import defaultThemeColors from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors"

{/* highlight-start */}
const darkBlue = `#007acc`
const lightBlue = `#66E0FF`
const blueGray = `#282c35`
{/* highlight-end */}

export default merge(defaultThemeColors, {
  {/* highlight-start */}
  text: blueGray,
  primary: darkBlue,
  heading: blueGray,
  modes: {
    dark: {
      background: blueGray,
      primary: lightBlue,
      highlight: lightBlue,
    },
  },
  {/* highlight-end */}
})
```

上記の変更により、紫色のテーマの代わりに青色のテーマに変わりました。

![テーマカラーを更新下プロジェクトのスクリーンショット](./images/starter-blog-theme-updated-colors.png)

このファイルでは、デフォルトのカラーテーマ（ここでは `defaultThemeColors`）を取り込み、特定の色を使うスタイルを置き換えています。

カスタマイズできる他のテーマの色を確認するには、公式ブログテーマ（`node_modules/gatsby-theme-blog/src/gatsby-plugin-theme-ui/colors.js`)の `colors.js` ファイルを確認してください。

## まとめ

今回紹介した内容は、特定の Gatsby テーマを用いてテーマを使用するための順を追った内容でした。テーマにより異なるカスタマイズオプションが存在し、異なるテーマが異なる方法で構築されることに注意してください。さらに深く掘り下げるには、[Gatsby テーマについてのドキュメント](/docs/themes/)をご覧ください。
