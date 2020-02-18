---
title: GraphQL と Gatsby
overview: true
---

あなたが Gatsby でページを作る時、データには [GraphQL](http://graphql.org/) という問い合わせ言語を用いてアクセスします。GraphQL によって、あなたがデータに求めるものを宣言的に表現できます。GraphQL は `クエリー` と共に実行されます。クエリーとは、あなたが必要なデータを表したものです。クエリーはこのような見た目になります。

```graphql
{
  site {
    siteMetadata {
      title
    }
  }
}
```

このクエリーは以下の JSON を返します。

```json
{
  "site": {
    "siteMetadata": {
      "title": "A Gatsby site!"
    }
  }
}
```

クエリーで書いた情報と返ってきた JSON が全く同じ形式であることに気づいたでしょうか。GraphQL では、あなたがアクセスできるデータを表現した `スキーマ` というものに対してクエリーを送るため、これが可能となります。今のところはスキーマがどこから来るのか気にしなくても大丈夫です。Gatsby はあなたのために全てのデータをまとめて面倒を見てくれますし、また Gatsby は、GraphiQL と呼ばれるツールによってあなたのデータを発見可能なものにします。GraphiQL とは、あなたに、1) ブラウザー内でデータに向けてクエリーを実行させてくれる、 2) あなたが利用可能なデータの構造をデータタイプの探索を通して調べてくれる UI です。

<<<<<<< HEAD
もしあなたがもっと GraphQL について学びたいのなら、[なぜ Gatsby は GraphQL を使用しているか](/docs/why-gatsby-uses-graphql/)でさらに学ぶことができます。また、GraphQL を用いたクエリーについては、[コンセプチュアルガイド](/docs/querying-with-graphql/)を参照してください。
=======
If you want to know more about GraphQL, you can read more about [why Gatsby uses it](/docs/why-gatsby-uses-graphql/) and check out this [conceptual guide](/docs/graphql-concepts/) on querying data with GraphQL.
>>>>>>> 22a3fb4d3155774ddc223a249897020b0ee18db1

<GuideList slug={props.slug} />
