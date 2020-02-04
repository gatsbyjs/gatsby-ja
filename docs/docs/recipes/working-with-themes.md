---
title: "レシピ集: テーマを使用する"
---

[Gatsby テーマ](/docs/themes/what-are-gatsby-themes)は Gatsby を構成するもの（共有の機能、データの取得、デザイン）をインストール可能なパッケージとして抽象化したものです。つまり、テーマの設定や機能は直接あなたのプロジェクト内に書かれるのではなく、一元的にバージョン管理された依存パッケージという形でインストールされるということです。テーマをシームレスに更新したり、まとめて作成したり、あるいは互換性のあるテーマを別のものに交換したりすることもできます。

<<<<<<< HEAD
## テーマスターターを使用して新しくサイトを作成する
=======
## Creating a new site using a theme

Found a theme you'd like to use on your project? Awesome! You can configure it for use by following the steps below.

> If you'd like to take a look at more theme options, check out [list of themes](https://www.npmjs.com/search?q=gatsby-theme).

### Prerequisites

- Make sure you have the [Gatsby CLI](/docs/gatsby-cli) installed

### Directions

1. Create a gatsby site

```shell
gatsby new {your-project-name}
```

2. Change directory and install theme

In this example, our theme is `gatsby-theme-blog`. You can replace that reference with whatever your theme is named.

```shell
cd {your-project-name}
npm install gatsby-theme-blog
```

3. Add theme to `gatsby.config.js`

Follow the instructions found in the README of the theme you're using to determine what configuration it requires.

```shell
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        /*
        - basePath defaults to `/`
        - contentPath defaults to `content/posts`
        - assetPath defaults to `content/assets`
        - mdx defaults to `true`
        */
        basePath: `/blog`,
      },
    },
  ],
}
```

4. Run `gatsby develop` , the theme should be available at `http://localhost:8000/{basePath}`

> To learn how to further customize a theme, check out the available paths on [Gatsby-theme-blog Documentation](https://www.npmjs.com/package/gatsby-theme-blog).

### Additional resources

- To learn how to further customize a theme, check out the docs on [Gatsby theme shadowing.](https://www.gatsbyjs.org/docs/themes/shadowing/)

- You can also [use multiple themes](https://www.gatsbyjs.org/docs/themes/using-multiple-gatsby-themes/) on a project.

## Creating a new site using a theme starter
>>>>>>> 9df3cf44052398d936d607e319857a9e33083b10

テーマを利用するスターターでサイトを作る手順は、テーマを**利用しない**スターターでサイトを作る手順と同じです。今回の例では [Gatsby 公式ブログのテーマから新しいサイトを作成するスターター](https://github.com/gatsbyjs/gatsby-starter-blog-theme)を使います。

### 前提条件

<<<<<<< HEAD
- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること。
=======
- Make sure you have the [Gatsby CLI](/docs/gatsby-cli) installed
>>>>>>> 9df3cf44052398d936d607e319857a9e33083b10

### 進め方

1. ブログテーマスターターを元に新しいサイトを作成します。

```shell
gatsby new {your-project-name} https://github.com/gatsbyjs/gatsby-starter-blog-theme
```

2. サイトを立ち上げます。

```shell
cd {your-project-name}
gatsby develop
```

### 追加の資料

- [基本的なガイド](/docs/themes/using-a-gatsby-theme)、またはより詳しい[ステップ・バイ・ステップで行うチュートリアル](/tutorial/using-a-theme)にて既存の Gatsby テーマの使い方を学ぶことができます。

## 新しくテーマを作成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-the-gatsby-theme-workspace-starter-to-begin-building-a-new-theme"
  lessonTitle="Use the Gatsby Theme Workspace Starter to Begin Building a New Theme"
/>

### 前提条件

- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること。
- [Yarn](https://yarnpkg.com/ja/docs/install#mac-stable) がインストールされていること。

### 進め方

1. [Gatsby テーマワークスペーススターター](https://github.com/gatsbyjs/gatsby-starter-theme-workspace)を利用して新しいテーマワークスペースを作成します。

```shell
gatsby new {your-project-name} https://github.com/gatsbyjs/gatsby-starter-theme-workspace
```

2. ワークスペース内でサンプルサイトを立ち上げます。

```shell
yarn workspace example develop
```

### 追加の資料

- Gatsby テーマワークスペーススターターの使い方については[より詳しいガイド](/docs/themes/building-themes/)をご覧ください。
- [Egghead のテーマ開発動画コース](https://egghead.io/courses/gatsby-theme-authoring)
  または[動画に沿った形でより補足的に詳しく書かれたチュートリアル](/tutorial/building-a-theme)にて、独自のテーマの作り方を学ぶことができます。
