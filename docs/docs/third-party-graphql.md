---
title: サードパーティー GraphQL APIの使用
---

Gatsby v2 では、プラグイン 1 つでどんな GraphQL API でも Gatsby の GraphQL に統合できます。これは、GitHub などのサードパーティー API、GraphCMS などのサービスの API、あるいは独自の GraphQL API なども含みます。

## 基本的な例

最初に、プラグインをインストールします。

```shell
npm install gatsby-source-graphql
```

`url` の下に GraphQL API がある場合、それを API に追加するには以下を設定に追加するだけです。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // このタイプには、リモートスキーマのクエリタイプが含まれます
        typeName: "SWAPI",
        // これはアクセス可能なフィールドです
        fieldName: "swapi",
        // クエリ元の URL です
        url: "https://api.graphcms.com/simple/v1/swapi",
      },
    },
  ],
}
```

すべての設定ファイルのオプションは[プラグインドキュメント](/packages/gatsby-source-graphql)をご覧ください。

サードパーティーの API は、指定された `fieldName` で使用できるため、通常どおりクエリを実行できます。

```graphql
{
  # フィールド名パラメーターは、サードパーティーの API にアクセスする方法を指定します
  swapi {
    allSpecies {
      name
    }
  }
}
```

サードパーティー API のタイプには、`${typeName}_` という接頭辞が付きます。変数またはフラグメントを使用する場合などにも、接頭辞が必要です。

```graphql
{
  # フィールド名パラメーターは、サードパーティー API にアクセスする方法を指定します
  swapi {
    allSpecies {
      ... on SWAPI_Species {
        name
      }
    }
  }
}
```

## サードパーティー API を使用してページを動的に作成する

`gatsby-node.js` に `createPages` コールバックを追加して、ページを動的に作成することもできます。たとえば、下記の例ではスターウォーズに登場する全ての種族のページを作成できます。

```js:title=gatsby-node.js
const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      swapi {
        allSpecies {
          id
          name
        }
      }
    }
  `)

  data.swapi.allSpecies.forEach(({ id, name }) => {
    actions.createPage({
      path: name,
      component: path.resolve(`./src/components/Species.js`),
      context: {
        speciesId: id,
      },
    })
  })
}
```

## もっと詳しく

- [gatsby-source-graphql ドキュメント](/packages/gatsby-source-graphql)
- [GitHub API を使用した例](https://github.com/freiksenet/gatsby-github-displayer)
- [GraphCMS を使用した例](https://github.com/freiksenet/gatsby-graphcms)
- [Hasura を使用した例](https://github.com/hasura/graphql-engine/tree/master/community/sample-apps/gatsby-postgres-graphql)
- [AWS AppSync を使用した例](https://github.com/aws-samples/aws-appsync-gatsby-sample)
