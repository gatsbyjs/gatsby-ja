---
title: GraphQL
disableTableOfContents: true
---

## GraphQL とは？

GraphQL は、[API](/docs/glossary#api) から情報を要求するためのクエリ言語であり、それをサポートするサーバーのプロトコルです。GraphQL は、Gatsby コンポーネントにデータを取り込むことのできる方法の 1 つです。

Facebook は、Web アプリケーションとネイティブアプリケーションの両方をサポートできる API が必要であることに気づき、2012 年に GraphQL を作成しました。Facebook は、2015 年にオープンソースライセンスとして GraphQL をリリースしました。

従来の API では、リクエストするデータごとに個別のエンドポイントを使用します。たとえば、新聞の API には次のものが含まれます。

- 特定のニュース記事を返す `/articles/<id>` エンドポイント。
- 特定のレポーターに関する情報を返す `/reporters/<id>` エンドポイント。

1 つのニュース記事ページには、2 つのリクエストが必要になる場合があります。さらに、 `/reporters` エンドポイントは、表示するよりも多くのデータを返す場合があります。名前、メール、写真がページに必要な時、経歴やソーシャルメディアアカウントが余分に返される場合があります。

一方、GraphQL API は単一のエンドポイントを持ちます。データを取得するには、GraphQL 固有の構文を用いて 1 つのリクエストを送信します。GraphQL は、要求したデータを取得するために必要な関数を実行し、単一の JSON 応答を返します。

特定の記事とレポーターを取得するためのリクエストは、次の例のようになります。

```graphql
{
  article(id: '7fdc2787469b') {
    title
    body
    reporter(id: '64669b3f') {
      name
      email
      photo
    }
  }
}
```

そして、そのレスポンスには、リクエストしたプロパティのみが含まれます。

```json
{
  "data": {
    "article": {
      "title": "Gatsby promotes GraphQL adoption",
      "body": "...",
      "reporter": {
        "name": "Jane Gatsby",
        "email": "janereports@example.com",
        "photo": "images/reporters/janegatsby.jpg"
      }
    }
  }
}
```

Gatsby で GraphQL を使用する必要はありませんが、GraphQL には他のデータ取得方法に比べていくつかの利点があります。

- ページの表示に必要なデータのみを取得できます。
- 新しいエンドポイントを作成することなく、新しいデータ型と機能を追加できます。
- データベース、サードパーティのヘッドレス CMS、Markdown 形式のテキストファイルなど、サイトにとって適切な方法でコンテンツを保存できます。

## さらに学ぶ

- [GraphQL & Gatsby](/docs/graphql/)

- [Gatsby が GraphQL を使用する理由](/docs/why-gatsby-uses-graphql/)

- [GraphQL](https://graphql.org) 公式サイト

- [GraphQL の使い方](https://www.howtographql.com/)
