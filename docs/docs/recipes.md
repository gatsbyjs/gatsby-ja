---
title: レシピ集
tableOfContentsDepth: 2
---

<!-- Gatsbyレシピのための基本テンプレート:

## 達成したいタスク
1-2行の説明。簡潔でまとまっているほど良いです。

### 必要条件
- システム要件
- セットアップに必要なあらゆるもの
- Netlifyアカウントなど、セットアップに必要な外部アカウントの作成も含む
- フォーマットについて詳しくは[ドキュメントテンプレート](/docs/docs-templates/)を参照

### やり方
ステップ・バイ・ステップのガイド。各ステップは明解かつ再現性が担保されているべきです。直接タスクに関係のないものは何であれ取り除きましょう。

#### 動くデモ (任意)
実際に動作するデモはレシピの構成によっては不可能な場合があります。その際はデモを用意しなくても大丈夫です。

### 追加のリソース
- チュートリアル
- ドキュメント
- プラグインのREADME
- その他

より詳しくは[ドキュメントテンプレート](/docs/docs-templates/)を見てください。
-->

[フルサイズのチュートリアル](/tutorial/)を踏破するのでもなく、大量の[ドキュメント](/docs/)の海に潜るのでもなく、その中間に位置する"ちょうど良い"リソースが必要ですか？
ここには、Gatsby スタイルやその他つくりたいものに合わせた様々なレシピが揃っています。

## [1. ページとレイアウト](/docs/recipes/pages-layouts)

あなたの Gatsby サイトにページを追加し、レイアウト機能を使って共通するページ要素を管理しましょう。

- [プロジェクトの構造](/docs/recipes/pages-layouts#project-structure)
- [ページの自動生成](/docs/recipes/pages-layouts#creating-pages-automatically)
- [ページ間のリンク](/docs/recipes/pages-layouts#linking-between-pages)
- [レイアウトコンポーネントの作成](/docs/recipes/pages-layouts#creating-a-layout-component)
- [createPage を用いたページの自動生成](/docs/recipes/pages-layouts#creating-pages-programmatically-with-createpage)

## [2. CSS によるスタイリング](/docs/recipes/styling-css)

あなたのウェブサイトにスタイルを追加する手段はたくさんあります。公式チームとコミュニティーが提供するプラグインのおかげで、ほとんどすべての方法が Gatsby で使えます。

- [Using global CSS files without a Layout component](/docs/recipes/styling-css#using-global-css-files-without-a-layout-component)
- [Using global styles in a layout component](/docs/recipes/styling-css#using-global-styles-in-a-layout-component)
- [Styled Components](/docs/recipes/styling-css#using-styled-components)
- [CSS Modules](/docs/recipes/styling-css#using-css-modules)
- [Sass/SCSS](/docs/recipes/styling-css#using-sassscss)
- [ローカルフォントの追加](/docs/recipes/styling-css#adding-a-local-font)
- [Emotion](/docs/recipes/styling-css#using-emotion)
- [Google Fonts](/docs/recipes/styling-css#using-google-fonts)

## [3. スターターを活用する](/docs/recipes/working-with-starters)

[スターター](/docs/starters/) は公式チームやコミュニティーによってメンテナンスされている、Gatsby サイトの雛形です。

- [スターターを使う](/docs/recipes/working-with-starters#using-a-starter)

## [4. テーマを使う](/docs/recipes/working-with-themes)

A Gatsby theme lets you centralize the look-and-feel of your site. You can seamlessly update a theme, compose themes together, and even swap out one compatible theme for another.

- [テーマスターターを使って新しいサイトをつくる](/docs/recipes/working-with-themes#creating-a-new-site-using-a-theme-starter)
- [新しいテーマをつくる](/docs/recipes/working-with-themes#building-a-new-theme)

## [5. データの取得](/docs/recipes/sourcing-data)

ファイルシステムやデータベースなど複数の場所からデータを取得し、Gatsby サイトに取り込みます。

- [GraphQL にデータを追加する](/docs/recipes/sourcing-data#adding-data-to-graphql)
- [Sourcing Markdown data for blog posts and pages with GraphQL](/docs/recipes/sourcing-data#sourcing-markdown-data-for-blog-posts-and-pages-with-graphql)
- [WordPress からデータを取得する](/docs/recipes/sourcing-data#sourcing-from-wordpress)
- [Contentful からデータを取得する](/docs/recipes/sourcing-data#sourcing-data-from-contentful)
- [GraphQL を使わずに外部からデータを取得しページを作成する](/docs/recipes/sourcing-data#pulling-data-from-an-external-source-and-creating-pages-without-graphql)
- [Drupal からデータを取得する](/docs/recipes/sourcing-data#sourcing-content-from-drupal)

## [6. データを要求する](/docs/recipes/querying-data)

Gatsby では、単一の GraphQL インターフェイスを通じて、あらゆるソースからデータにアクセスできます。

- [Page Query を使ってデータを要求する](/docs/recipes/querying-data#querying-data-with-a-page-query)
- [StaticQuery Component を使ってデータを要求する](/docs/recipes/querying-data#querying-data-with-the-staticquery-component)
- [useStaticQuery hook を使ってデータを要求する](/docs/recipes/querying-data/#querying-data-with-the-usestaticquery-hook)
- [GraphQL で数に制限をかける](/docs/recipes/querying-data#limiting-with-graphql)
- [GraphQL でソートする](/docs/recipes/querying-data#sorting-with-graphql)
- [GraphQL でフィルターをかける](/docs/recipes/querying-data#filtering-with-graphql)
- [GraphQL Query Aliases](/docs/recipes/querying-data#graphql-query-aliases)
- [GraphQL Query Fragments](/docs/recipes/querying-data#graphql-query-fragments)
- [fetch によるクライアントサイドクエリ](/docs/recipes/querying-data#querying-data-client-side-with-fetch)

## [7. 画像を取り扱う](/docs/recipes/working-with-images)

Access images as static resources, or automate the process of optimizing them through powerful plugins.
イメージを静的なリソースとして使う。あるいはプラグインを通じて最適化プロセスを自動化する。

- [webpack を使って画像をコンポーネントに埋め込む](/docs/recipes/working-with-images#import-an-image-into-a-component-with-webpack)
- [静的フォルダにある画像を参照する](/docs/recipes/working-with-images#reference-an-image-from-the-static-folder)
- [gatsby-image を使って画像を最適化するクエリを書く](/docs/recipes/working-with-images#optimizing-and-querying-local-images-with-gatsby-image)
- [Front-matter で gatsby-image による最適化を指示する](/docs/recipes/working-with-images#optimizing-and-querying-images-in-post-frontmatter-with-gatsby-image)

## [8. データの変換](/docs/recipes/transforming-data)

Gatsby でのデータ変換はプラグインによって実現されています。Transformer プラグインは source プラグインを通じてデータを取得し、実際に使う形式へ変換します（例：JSON を JavaScript オブジェクトにする等）。

- [Markdown を HTML に変換する](/docs/recipes/transforming-data#transforming-markdown-into-html)

## [9. サイトのデプロイ](/docs/recipes/deploying-your-site)

お披露目の時間です。サイトの出来栄えに満足したら、全世界に公開しましょう！

- [デプロイの準備](/docs/recipes/deploying-your-site#preparing-for-deployment)
- [Netlify でデプロイ](/docs/recipes/deploying-your-site#deploying-to-netlify)
- [ZEIT Now でデプロイ](/docs/recipes/deploying-your-site#deploying-to-zeit-now)
