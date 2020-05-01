---
title: スターターをテーマに変換する
---

Gatsby のテーマは、スターターから簡単に作成できます。このガイドでは、スターターをテーマに変換する方法を説明します。

## スターターとは？　テーマとは？

スターターは、ユーザーがコピーして[カスタマイズ](/docs/modifying-a-starter/)できる Gatsby の雛形です。一度修正すると、元のスターターのソースとの繋がりを維持しなくなります。

テーマは `gatsby-config.js` などを含むプラグインの一種で、あらかじめ設定された機能、データのソース、UI のコードを Gatsby サイトに追加します。テーマはスターターと違い、パッケージ化して、npm などのレジストリーを通して配布できます。それらのバージョンは `package.json` で管理できます。

スターターをテーマにする理由は、ユーザーにとって更新が簡単になるためです。スターターの場合、ユーザーはスターター元のリポジトリーからコードを更新する必要があり、変更の一部を上書きするリスクを伴います。テーマを使用すれば、開発者がパッケージマネージャーを通してコードを更新したり、カスタマイズ可能なテーマ API に依存することがとても簡単になります。

## `package.json` の準備

スターターの変換をはじめるには、まず `package.json` のパッケージ名を `gatsby-theme-*` の命名規則に変更します。例えばスターターのパッケージ名が `gatsby-starter-awesome-blog` の場合、`gatsby-theme-awesome-blog` に変更します（名前が [npm](https://npmjs.com) で利用できるか確認しましょう）。

次に `gatsby` 、`react` 、`react-dom` を `devDependencies` に指定します。これらを `peerDependencies` に追加することも推奨します。どのバージョンが求められるのかをユーザーが判断するのに役立ち、それらを npm や yarn が適切に解決してくれるためです。

依存関係を更新したら、`index.js` をプロジェクトのルートに作成する必要があります。Node が自動で `index.js` を探し、Gatsby がテーマを解決できます。

## パスを解決する

テーマはスターターと違い dependency で、Gatsby CLI の起動時に実行されません。これはユーザーのディレクトリーを参照するため、コンテンツの取得やテンプレートの参照でエラーが発生する原因になります。

これを解決するために、スターターで機能する、次のようなコードを考えてみましょう。

```js
const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    // ...

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}
```

このコードでは `path.resolve` を使用しているため、スターターは `node_modules/gatsby-theme-awesome-blog/src/templates/post.js` ではなく `src/templates/post.js` を解決しようとします。これを修正するには、`require.resolve` を使用し、テーマからの相対的なパスを見て、正しいテンプレートを見つけられるようにします。

```js
const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    // ...

    createPage({
      path: pagePath,
      component: require.resolve(`./src/templates/post.js`), // highlight-line
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}
```

他にも `gatsby-config` などのファイルで、パスの解決を更新する必要があるかもしれません。

## ページをソースに含める

テーマが投稿の一覧やホームなどのページを提供する場合、それらをソースに含める必要があります。
Gatsby は `gatsby develop` で動作する時のみ、`src/pages`　の相対パスを見ます。
[`gatsby-plugin-page-creator`](/packages/gatsby-plugin-page-creator/) を使用します。

```shell
npm install --save gatsby-plugin-page-creator
```

これで、プラグインに、テーマの `src/pages` ディレクトリーを見るように伝えられます。

```js:title=gatsby-config.js
{
  resolve: `gatsby-plugin-page-creator`,
  options: {
    path: path.join(__dirname, `src`, `pages`),
  },
},
```

## npm に公開する

ユーザーがテーマをインストールできるように、npm に公開する必要があります。公開が初めての場合は、[npm にパッケージを公開する方法](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)を参考にしてください。

新しく作成したテーマのルートフォルダーで、`npm publish` を実行します。

テーマが公開されれば、あなたのスターターへインストールできるようになります。

```shell
npm install --save gatsby-theme-NAME
```

## 詳しい説明

- [Jason Lengstorf converts an existing Gatsby site to a theme](https://www.youtube.com/watch?v=NkW06HK9-aY)
