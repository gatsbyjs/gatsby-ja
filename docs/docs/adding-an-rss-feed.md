---
title: RSS フィードを追加する
---

## RSS フィードとは？

[RSS フィード](https://ja.wikipedia.org/wiki/RSS)は、ウェブサイトのコンテンツを購読用の形式で掲載する標準的な XML ファイルのことで、読者がニュースアグリゲーターまたはフィードリーダーとも呼ばれるアプリでコンテンツを消費できるようにします。

あなたのサイトのコンテンツを同時配給するための流通機構として考えてみてください。

## インストール

RSS フィードを生成するには、[`gatsby-plugin-feed`](/packages/gatsby-plugin-feed/) パッケージを使えます。このパッケージをインストールするには、次のコマンドを実行します。

```shell
npm install --save gatsby-plugin-feed
```

## [gatsby-plugin-feed](/packages/gatsby-plugin-feed/) の使い方

インストールが完了したら、このように、このプラグインをサイトの設定ファイルに追加できます。

```js:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.example.com`,
  },
  plugins: [`gatsby-plugin-feed`],
}
```

これは、このプラグインを Markdown で実行する例ですが、他のソースについては、コンテンツを一意に特定する方法（典型的には URL やスラグ）が必要になります。

```js:title=gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // highlight-next-line
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

RSS フィードはプロダクションビルドでのみ作られるので、次にビルドを実行します（`npm run build`）。デフォルトでは、生成された RSS フィードのパスは `/rss.xml` ですが、このデフォルト値を変更するオプションが用意されています。

[gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) のような Markdown コンテンツでの基本的なセットアップについては、以上ですべてです！　ですが、`gatsby-node.js` や `gatsby-config.js` ファイルでカスタムコードを使うことでカスタムの RSS フィードスキーマを作れます。

## RSS フィードプラグインのカスタマイズ

あなたのコンテンツは、以下のようなさまざまな理由で、blog-starter シナリオにぴったり当てはまらないかもしれません。

- コンテンツが Markdown ではないので、プラグインが対応していない
- Markdown ファイルのファイル名に日付が含まれており、スラグ URL が 404 を引き起こす

良いニュースは、こういったシナリオは `gatsby-config.js` や `gatsby-node.js` で調整できるのです。

プラグインによるデフォルトのフィードスキーマ（またの名を構造）出力をウェブサイトのコンテンツに合わせてカスタマイズするには、以下のコードから始められます：

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            /* highlight-start */
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                /* highlight-end */
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                // highlight-next-line
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
  ],
}
```

このスニペットは、あなたのサイトのメタデータ `title` や `siteUrl` などを問い合わせるために、`gatsby-config.js` にカスタムの `gatsby-plugin-feed` 設定を含んでいます。また、GraphQL クエリと `serialize` メソッドを含む 1 つ以上のオブジェクトの `feeds` 配列を含んでおり、カスタム RSS フィード構造の出力を可能にしています。この例では、RSS コンテンツはあなたのサイトより調達された Markdown ファイルから来ており、`allMarkdownRemark` というキー、関連するフィルター、フィールドで問い合わせされています。

フィードオブジェクトの `output` フィールドは RSS フィードのファイル名、`title` はサイトの RSS フィードの名前をカスタマイズできるようにします。

デフォルトでは、フィードはすべてのページから参照されます。この挙動は追加の `string` 型のフィールド `match` を与えることでカスタマイズできます。この文字列は `RegExp` の構築に使われ、この正規表現は現在ページの `pathname` をテストするのに使われます。その正規表現を満たすページだけがフィードへの参照を含むでしょう。

動いてるフィードを確認するには、`gatsby build && gatsby serve` を実行することで、`http://localhost:9000/rss.xml` にある RSS ファイルのコンテンツや URL を調査できます。

> ヒント: あなたのブログがカスタムパーマリンク、例えば日付を含んでいたりいなかったりするリンクを使っているなら、RSS フィードに正しい URL を出力するよう [`gatsby-node.js` をカスタマイズする](https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/gatsby-node.js#L57)必要があるかもしれません。困ったときは[私達にご連絡ください](/contributing/how-to-contribute/)!

## iTunes RSS ブロックの構文

もしポッドキャストのために RSS フィードを作るなら、iTunes RSS ブロックを含めたいでしょう。それらは GraphQL が読み込めない `itunes:author` のフォーマットを受け取ります。以下は、このプラグインを使って iTunes RSS ブロックを実装する例です。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        /* highlight-start */
        setup: options => ({
          ...options,
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:author': 'Michael Scott' },
            { 'itunes:explicit': 'clean' },
          ],
        }),
        /* highlight-end */
        feeds: [
          {
            ...
          },
        ],
      },
    },
  ],
}
```

## 楽しくブログしよう！

[Gatsby フィードプラグイン](/packages/gatsby-plugin-feed/)によって、Feedly や RSS Feed Reader のような RSS リーダーを使って購読している人々に、あなたの書いたものを簡単にシェアできます。

## さらなるリソース

[Jason Lengstorf と Amberley Romo が RSS フィードを備えたポッドキャストの作り方を配信しています](https://www.youtube.com/watch?v=0hGlvyuQiKQ)。
