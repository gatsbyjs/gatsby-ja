---
title: ソースプラグイン
typora-copy-images-to: ./
disableTableOfContents: true
---

> このチュートリアルは Gatsby のデータ層に関する解説の一部です。先に [part 4](/tutorial/part-four/) の内容を完了してください。

## 概要

このチュートリアルでは、GraphQL とソースプラグインを使ってサイトにデータを取り込む方法を学びます。ただし、これらのプラグインについて学ぶ前に、クエリを正しく作成するのに役立つ GraphiQL というツールの使い方を知っておく必要があります。

## GraphiQL について

GraphiQL は GraphQL の統合開発環境（IDE）です。強力で万能なツールであり、Gatsby でサイトを構築する際には頻繁に使用します。

開発サーバーが起動しているときは <http://localhost:8000/___graphql> にアクセスできます。

<video controls="controls" autoplay="true" loop="true">
  <source type="video/mp4" src="/graphiql-explore.mp4"></source>
  <p>お使いのブラウザはこのビデオには対応していません。</p>
</video>

`Site` を展開して使用できるフィールドを確認します。ここには以前のチュートリアルで使用した `siteMetadata` オブジェクトも含まれています。GraphiQL でデータを操作してみてください！<kbd>Ctrl + Space</kbd>（または <kbd>Shift + Space</kbd>）でオートコンプリートのウィンドウを表示することができ、<kbd>Ctrl + Enter</kbd> で GraphQL クエリを実行することができます。残りのチュートリアルでは、GraphiQL をさらに使用していきます。

## GraphiQL Explorer の使い方

GraphiQL Explorer を使うと、クエリを手作業で入力することなく、フィールドやインプットをクリックしていくことによってインタラクティブにクエリを作成することができます。

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-build-a-graphql-query-using-gatsby-s-graphiql-explorer"
  lessonTitle="Build a GraphQL Query using Gatsby’s GraphiQL Explorer"
/>

## ソースプラグイン

サイトのデータは、API、データベース、CMS、ローカルファイルなど、どこからでも取得できます。

ソースプラグインはソースの種類ごとに分かれています。例えば、ファイルシステムのソースプラグインはファイルシステムからデータを取得ために使用され、WordPress プラグインは WordPress API からデータを取得するために使用されます。

[`gatsby-source-filesystem`](/packages/gatsby-source-filesystem/) を追加して、どのように動作するか見てみましょう。

まず、プロジェクトのルートにプラグインをインストールします。

```shell
npm install --save gatsby-source-filesystem
```

次に、`gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    // highlight-start
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    // highlight-end
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

ファイルを保存し、開発サーバーを再起動します。そして再度 GraphiQL を開くと、Explorer に `allFile` と `file` が表示されているはずです。

![graphiql-filesystem](graphiql-filesystem.png)

`allFile` のドロップダウンをクリックしてください。カーソルをクエリエリアの `allFile` の後に合わせて、 <kbd>Ctrl + Enter</kbd> を入力すると、各ファイルの `id` がクエリに入力されます。実行ボタンを押してクエリを実行します。

![filesystem-query](filesystem-query.png)

Explorer では `id` フィールドが自動的に選択されています。他のフィールドのチェックボックスもオンにして、いくつかのフィールドを選択し、もう一度実行ボタンを押してください。

![filesystem-explorer-options](filesystem-explorer-options.png)

また、オートコンプリートのショートカット（<kbd>Ctrl + Space</kbd>）を使うことで、`File` の nodes 上に追加可能なフィールドを選択できます。

![filesystem-autocomplete](filesystem-autocomplete.png)

クエリにいくつかのフィールドを追加してみて、その都度 <kbd>Ctrl + Enter</kbd> を押してクエリを再実行してください。クエリ結果が更新されます。

![allfile-query](allfile-query.png)

クエリ結果は `File` の「nodes」配列です。node は「graph」内のオブジェクトの仮名です。各 `File` の node オブジェクトはクエリで指定したフィールドをもっています。

## GraphQL クエリを使ってページを作成

Gatsby を使用したページの作成は多くの場合 GraphiQL から始まります。まずは GraphiQL 内で必要なデータのクエリを作成し、これを React のページコンポーネントにコピーして UI の構築を開始します。

やってみましょう。

新規ファイルとして `src/pages/my-files.js` を作成し、そこに先ほど作った `allFile` の GraphQL クエリを貼り付けます。

```jsx:title=src/pages/my-files.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data) // highlight-line
  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
```

上記のコードでは `console.log(data)` をハイライト表示しています。このように、新しいコンポーネントを作るときに GraphQL クエリで取得したデータをコンソール出力するようにすると、ブラウザのコンソール上でデータを確認しながら UI 構築を進められるため、とても便利です。

`/my-files/` の新しいページにアクセスしてブラウザのコンソールを開くと、次のようなものが表示されるはずです。

![data-in-console](data-in-console.png)

データの構造は GraphQL クエリの構造と一致します。

コンポーネントにコードを追加して、ファイルの情報を表示させます。

```jsx:title=src/pages/my-files.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      {/* highlight-start */}
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* highlight-end */}
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
```

そして [http://localhost:8000/my-files](http://localhost:8000/my-files) にアクセスすると… 😲。

![my-files-page](my-files-page.png)

## 次は？

これであなたはソースプラグインを使って Gatsby のシステムにデータを**取り込む**方法を学びました。次のチュートリアルでは、ソースプラグインが取得したデータをトランスフォーマープラグインで**変換**する方法を学びます。ソースプラグインとトランスフォーマープラグインの組み合わせによって、Gatsby でサイトを構築するために必要なすべてのデータ取得と変換を処理できます。[チュートリアル part 6](/tutorial/part-six/) に進んでトランスフォーマープラグインについて学びましょう。
