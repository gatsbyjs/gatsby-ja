---
title: "レシピ集: テーマを使用する"
tableOfContentsDepth: 1
---

[Gatsby テーマ](/docs/themes/what-are-gatsby-themes)は Gatsby を構成するもの（共有の機能、データの取得、デザイン）をインストール可能なパッケージとして抽象化したものです。つまり、テーマの設定や機能は直接あなたのプロジェクト内に書かれるのではなく、一元的にバージョン管理された依存パッケージという形でインストールされるということです。テーマをシームレスに更新したり、まとめて作成したり、あるいは互換性のあるテーマを別のものに交換したりすることもできます。

## テーマを使用して新しくサイトを作成する

あなたのプロジェクトで使いたいテーマが見つかりましたか？すばらしい！以下の手順に沿ってテーマを適用できます。

> もっと他のテーマを探したい場合は、[テーマ一覧](https://www.npmjs.com/search?q=gatsby-theme)を参照。

### 前提条件

- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること。

### 進め方

1. CLI コマンドで Gatsby のサイトを新しく作成します。

```shell
gatsby new {your-project-name}
```

2. 作成したサイトのフォルダに移動し、テーマをインストールします。

この例では、`gatsby-theme-blog` というテーマを適用します。あなたが使いたいテーマの名前に差し替えてください。

```shell
cd {your-project-name}
npm install gatsby-theme-blog
```

3. `gatsby.config.js` にテーマを追加します。

あなたが使いたいテーマの README に沿って、必要な設定を加えてください。

```javascript:title=gatsby-config.js
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

4. `gatsby develop` を起動してください。`http://localhost:8000/{basePath}` にて、テーマが適用されたページが表示されるはずです。

> 例で使用した `gatsby-theme-blog` のテーマをさらにカスタマイズしたい場合は、[Gatsby-theme-blog Documentation](https://www.npmjs.com/package/gatsby-theme-blog) に手順が記載されています。

### 追加の資料

- テーマをさらにカスタマイズしたい場合は、[Gatsby theme shadowing](https://www.gatsbyjs.org/docs/themes/shadowing/) のドキュメントを参照。

- プロジェクトに[複数のテーマを適用](https://www.gatsbyjs.org/docs/themes/using-multiple-gatsby-themes/)することも可能です。

## テーマスターターを使用して新しくサイトを作成する

テーマを利用するスターターでサイトを作る手順は、テーマを**利用しない**スターターでサイトを作る手順と同じです。今回の例では [Gatsby 公式ブログのテーマから新しいサイトを作成するスターター](https://github.com/gatsbyjs/gatsby-starter-blog-theme)を使います。

### 前提条件

- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること。

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
