---
title: "レシピ集: テーマを使う"
---

[Gatsby テーマ](/docs/themes/what-are-gatsby-themes) は Gatsby を構成するもの（共有の機能、データの取得、デザイン）をインストール可能なパッケージとして抽象化したものです。つまり、テーマの設定や機能は直接あなたのプロジェクト内に書かれるのではなく、一元的にバージョン管理された依存パッケージという形でインストールされるということです。テーマをシームレスに更新したり、まとめて作成したり、あるいは互換性のあるテーマを別のものに交換したりすることもできます。

## テーマスターターを使用して新しくサイトを作成する

テーマを利用するスターターでサイトを作る手順は、テーマを**利用しない**スターターでサイトを作る手順と同じです。今回の例では [Gatsby 公式ブログのテーマから新しいサイトを作成するスターター](https://github.com/gatsbyjs/gatsby-starter-blog-theme) を使います。

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

- [短い基本的なガイド](/docs/themes/using-a-gatsby-theme) またはより詳しい [段階的なチュートリアル](/tutorial/using-a-theme) で既存の Gatsby テーマの使い方を学ぶことができます。

## 新しくテーマを作成する

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-the-gatsby-theme-workspace-starter-to-begin-building-a-new-theme"
  lessonTitle="Use the Gatsby Theme Workspace Starter to Begin Building a New Theme"
/>

### 前提条件

- [Gatsby CLI](/docs/gatsby-cli) がインストールされていること。
- [Yarn](https://yarnpkg.com/ja/docs/install#mac-stable) がインストールされていること。

### 進め方

1. [Gatsby テーマワークスペーススターター](https://github.com/gatsbyjs/gatsby-starter-theme-workspace) を利用して新しいテーマワークスペースを作成します。

```shell
gatsby new {your-project-name} https://github.com/gatsbyjs/gatsby-starter-theme-workspace
```

2. ワークスペース内でサンプルサイトを立ち上げます。

```shell
yarn workspace example develop
```

### 追加の資料

- Gatsby テーマワークスペーススターターの使い方については [より詳しいガイド](/docs/themes/building-themes/) をご覧ください。
- [Egghead のテーマ開発動画コース](https://egghead.io/courses/gatsby-theme-authoring) または [動画に沿った形でより補足的に詳しく書かれたチュートリアル](/tutorial/building-a-theme) にて、独自のテーマの作り方を学ぶことができます。
