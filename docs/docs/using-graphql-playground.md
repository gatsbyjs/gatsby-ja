---
title: GraphQL Playgroundの利用
---

## はじめに

このページでは、現在あなたが GraphQL クエリのために使用している IDE の代替となる、[GraphQL Playground](https://github.com/prisma/graphql-playground)を紹介します。

## Prisma's GraphQL Playground とは？

GraphQL Playground は、ソースコードやプラグインがスキーマとして与えたデータを取り扱う場所です。あなたは今後そのようなデータをたくさん探索することになります。その際に Playground は大きな助けとなるでしょう。

## GraphQL Playground へのアクセス

Gatsby で GraphQL Playground にアクセスするためには、以下のように `GATSBY_GRAPHQL_IDE` を `package.json` の `develop` スクリプトに追加します。

```json
"develop": "GATSBY_GRAPHQL_IDE=playground gatsby develop",
```

<<<<<<< HEAD
`gatsby develop` の代わりに `npm run develop` を使用し、立ち上がったサーバー <https://localhost:8000/___graphql> へアクセスすることで利用できます。
=======
If you are on **Windows** then you should use:

```
"develop": "cross-env GATSBY_GRAPHQL_IDE=playground gatsby develop",
```

If you haven't installed **cross-env**, you can do it with:

```
npm install --save-dev cross-env
```

Use `npm run develop` instead of `gatsby develop` and access it when the development server is running on `http://localhost:8000/___graphql`
>>>>>>> 22a3fb4d3155774ddc223a249897020b0ee18db1

`gatsby develop` を引き続き使用するためには、gatsby-config.js で dotenv パッケージを使用する必要があります。`.env.development` といった名前で[environment variable](/docs/environment-variables/)ファイルを作成し、`.env.development` へ `GATSBY_GRAPHQL_IDE=playground` と記入します。

![GraphQLスキーマの場所を示す画像](./images/playground-schema.png)
