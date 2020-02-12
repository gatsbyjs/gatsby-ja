---
title: GraphiQLの紹介
---

このガイドでは、正しい構成の GraphQL クエリーを作ることができる GraphiQL というツールの使用方法を学習します。

## GraphiQL とは？

GraphiQL は、GraphQL の統合開発環境（IDE）です。GraphiQL は強力な（そして万能な）ツールです。
Gatsby サイトを構築する際に、頻繁に使用することになるでしょう。

<<<<<<< HEAD
開発環境のサーバーを実行中に、GraphiQL へアクセスできます。
通常、以下の URL になります。
<http://localhost:8000/___graphql>.
=======
You can access it when your site's development server is running--normally at
`http://localhost:8000/___graphql`.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

## GraphiQL の使用例

<<<<<<< HEAD
<http://localhost:8000/___graphql>を開くと、以下の動画のように表示されます。ビルドインの `Site` "type" を突っつくと、`siteMetadata`オブジェクトを含んだ、どのフィールドを利用できるかを確認することができます。
=======
When you have `http://localhost:8000/___graphql` open, it will look something like what this video shows. In the video below, watch someone poke around the built-in `Site` "type" and see what fields are available
on it—including the `siteMetadata` object.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

<video controls="controls" autoplay="true" loop="true">
  <source type="video/mp4" src="/graphiql-explore.mp4" />
  <p>お使いのブラウザは、video要素をサポートしていません。</p>
</video>

## GraphiQL の使用方法

<<<<<<< HEAD
Gatsby サイトで開発環境のサーバーを実行中に、<http://localhost:8000/___graphql>で GraphiQL を開き、データを操作します！ <kbd> Ctrl +Space</kbd>を押して（または<kbd> Shift + Space</kbd>を別のショートカットに登録し使用して）オートコンプリートウィンドウを表示し、<kbd> Ctrl + Enter </kbd>で GraphQL クエリーを実行します。
=======
When the development server is running for one of your Gatsby sites, open GraphiQL at `http://localhost:8000/___graphql` and play with your data! Press <kbd>Ctrl + Space</kbd> (or use <kbd>Shift + Space</kbd> as an alternate keyboard shortcut) to bring up the autocomplete window and <kbd>Ctrl + Enter</kbd> to run the GraphQL query.
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

IDE の右上の端にある GraphiQL のドキュメントを読んでみてください。スルーしてしまいがちですが、読んで見る価値はあります！

![GraphiQlドキュメントの場所を示す図](./images/graphiql-docs.png)

## GraphiQL Explorer の使用

GraphiQL Explorer を使用すれば、使用可能なフィールドと入力をクリックすることで、クエリーを手作業で何度も入力することなく、相互補完的にクエリーを完成させることができます。

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-build-a-graphql-query-using-gatsby-s-graphiql-explorer"
  lessonTitle="Build a GraphQL Query using Gatsby's GraphiQL Explorer"
/>

GraphiQL Explorer についてもっと知りたい場合は、Gatsby ブログの[GraphiQL Explorer についての記事](/blog/2019-06-03-integrating-graphiql-explorer/)をご覧ください。

## その他のリソース

- GraphiQL の使用例については [Tutorial Part 5: Source Plugins](/tutorial/part-five/) をご覧ください。
- [GraphiQL の README](https://github.com/graphql/graphiql)をご覧ください。
- GraphQL IDE の他の使用例については、[Using GraphQL Playground](/docs/using-graphql-playground/)をご覧ください。
