---
title: トランスフォーマープラグイン
typora-copy-images-to: ./
disableTableOfContents: true
---

> このチュートリアルは Gatsby のデータ層に関する解説の一部です。先に [part 4](/tutorial/part-four/) と [part 5](/tutorial/part-five/) の内容を完了してください。

## 概要

前回はソースプラグインを使って Gatsby のデータシステムにデータを**取り込む**方法を説明しました。今回はソースプラグインが取得したデータを、トランスフォーマープラグインで**変換**する方法を学びます。ソースプラグインとトランスフォーマープラグインの組み合わせによって、Gatsby でサイトを構築するために必要なすべてのデータ取得と変換を処理できます。

## トランスフォーマープラグイン

多くの場合、ソースプラグインで取得したデータ形式はウェブサイトの構築に使用されるものではありません。ファイルシステムソースプラグインを使用すればファイルの**メタデータ**を取得できますが、ファイル内に**入力されているデータ**は取得できません。

Gatsby はトランスフォーマープラグインを利用して、ソースプラグインで取得したデータをブログで表示する形式へ**変換**します。

ここでは Markdown を例とします。Markdown は簡潔に記述できますがウェブページとして表示する場合は HTML へ変換する必要があります。

`src/pages/sweet-pandas-eating-sweets.md`に以下の Markdown ファイルを追加して、トランスフォーマープラグインと GraphQL を使って HTML へ**変換**する方法を学びましょう。

```markdown:title=src/pages/sweet-pandas-eating-sweets.md
---
title: "Sweet Pandas Eating Sweets"
date: "2017-08-10"
---

Pandas are really sweet.

Here's a video of a panda eating sweets.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4n0xNbfJLR8" frameborder="0" allowfullscreen></iframe>
```

ファイルを保存して `/my-files/` を確認します。表に新しい Markdown が追加されています。これは Gatsby の非常に便利な機能です。先程の `siteMetadata` の例のように、ソースプラグインはデータをライブリロードします。`gatsby-source-filesystem`はファイルを常に監視して、ファイルが追加されるとクエリを再実行します。

Markdown を変換できるトランスフォーマープラグインを追加します。

```shell
npm install --save gatsby-transformer-remark
```

次にプラグインを `gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`, // highlight-line
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

サーバーを再起動し GraphiQL を新しく開いてオートコンプリートを確認します。

![markdown-autocomplete](markdown-autocomplete.png)

`allMarkdownRemark`を選択し、`allFile`のときと同様にクエリを実行します。先程追加した Markdown が表示されるはずです。`MarkdownRemark`ノードで使用可能なフィールドを探します。

![markdown-query](markdown-query.png)

Gatsby の基本的な設定ができ始めています。ソースプラグインはデータを Gatsby のデータシステムに**取り込み**、トランスフォーマープラグインはソースプラグインが取得したデータを**変換**します。このパターンは Gatsby でサイトを構築するために必要なすべてのデータ取得と変換を処理できます。

## Markdown の一覧を `src/pages/index.js` に作成する

次に、フロントページに Markdown の一覧を作成します。多くのブログのように、各投稿へのリンクを一覧にしてフロントページに表示します。GraphQL を利用すれば Markdown の投稿を**取得**できるため、手動で一覧を管理する必要はありません。

`src/pages/index.js` に GraphQL クエリと HTML とスタイルを追加して次のように書き換えます。`src/pages/my-files.js`と同様です。

```jsx:title=src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
```

これでフロントページは次のようになります。

![frontpage](frontpage.png)

しかし、投稿が 1 件のみでは一覧とは呼べません。`src/pages/pandas-and-bananas.md`にもう 1 件投稿を追加しましょう。

```markdown:title=src/pages/pandas-and-bananas.md
---
title: "Pandas and Bananas"
date: "2017-08-21"
---

Do Pandas eat bananas? Check out this short video that shows that yes! pandas do
seem to really enjoy bananas!

<iframe width="560" height="315" src="https://www.youtube.com/embed/4SZl1r2O_bY" frameborder="0" allowfullscreen></iframe>
```

![two-posts](two-posts.png)

良い感じです！しかし、投稿の表示順が間違っています。

修正は簡単です。クエリでデータを取得する時、GraphQL クエリにさまざまな引数を渡すことができます。例えば、ノードの `sort` や `filter` 、数を指定した `skip` 、`limit`で数の制限などができます。この強力な演算子を利用して必要なデータを必要な形式で選択できます。

index ページの GraphQL クエリで `allMarkdownRemark` を `allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC })` に変更します。
これを保存すればソート順が修正されます。  
_注: frontmatter と date の間はアンダースコアが 3 つです。_

GraphiQL を開いていろいろな sort オプションを試しましょう。`allFile`コネクションに加えて他のコネクションでも並び替えることができます。

クエリ演算子の詳細について知りたい場合は、[GraphQL reference guide.](/docs/graphql-reference/)をご確認ください。

## やってみよう

新しい投稿ページを作成して、フロントページの投稿一覧がどう変わるか確認してみましょう。

## 次は？

よくできました！あなたは Markdown を取得し、投稿のタイトルと抜粋を一覧にして表示する index ページを作成しました。しかし、抜粋ではなく Markdown の内容を表示するページが必要です。

React コンポーネントを `src/pages`に配置することで引き続きページを作成できます。次は**プログラム**によって**データ**からページを生成する方法を学びます。
Gatsby は多くの静的サイトジェネレーターと異なり、ファイルからのページ作成に**限定されません**。
Gatsby はビルド時に GraphQL を使用してデータを取得し、クエリのすべての**結果**を**ページ**へ**マッピング**します。
これはとても強力なアイデアです。次のチュートリアルではその意味と使い方を説明し、[データからプログラムによるページ作成](/tutorial/part-seven/)を学びます。
