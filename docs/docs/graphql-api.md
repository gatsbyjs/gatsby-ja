---
title: GraphQL API
tableOfContentsDepth: 2
---

import { GraphqlApiQuery } from "../../www/src/components/api-reference/doc-static-queries"
import APIReference from "../../www/src/components/api-reference"

Gatsby を使う大きな利点は、自身で設定可能な全てのデータソースのデータ層が標準であることです。データは[ビルド時](/docs/glossary#build)に集められ、データをあなたのサイト上でどのように処理するかを定義する[スキーマ](/docs/glossary#schema) として組み立てられます。
A great advantage of Gatsby is a built-in data layer that combines all data sources you configure. Data is collected at [build time](/docs/glossary#build) and automatically assembled into a [schema](/docs/glossary#schema) that defines how data can be queried throughout your site.

このページは Gatsby で使用される GraphQL の特長について、クエリーやデータソーシングのやり方や自身のサイトに合わせた GraphQL カスタマイズについてなどの説明になります。
This doc serves as a reference for GraphQL features built into Gatsby, including methods for querying and sourcing data, and customizing GraphQL for your site's needs。

## GraphQL を使う　 Getting started with GraphQL

Gatsby で GraphQL を使うために、特別なインストールは必要ありません。`gatsby develop` か `gatsby build` コマンドを使ったときに、スキーマは自動で集められて生成されます。サイトがコンパイルされたら、データレイヤーは `http://localhost:8000/___graphql` で [確認ができます](/docs/running-queries-with-graphiql/)。
GraphQL is available in Gatsby without a special install: a schema is automatically inferred and created when you run `gatsby develop` or `gatsby build`. When the site compiles, the data layer can be [explored](/docs/running-queries-with-graphiql/) at: `http://localhost:8000/___graphql`

## Sourcing data

データは GraphQL を使ってクエリーされページに引き込まれるために、[ソース](/docs/content-and-data/)するか、もしくは GraphQL スキーマに追加される必要があります。
Data needs to be [sourced](/docs/content-and-data/) — or added to the GraphQL schema — to be queried and pulled into pages using GraphQL. Gatsby uses [source plugins](/plugins/?=gatsby-source) to pull in data.

**注意**: GraphQL は必須ではありません。Gatsby は [GraphQL 無しで使う](/docs/using-gatsby-without-graphql/)ことができます。

データを既存のプラグインを使ってソースするためには、まず全ての必要なパッケージをインストールします。さらに、そのプラグインは `gatsby-config` 内のプラグイン欄に設定とともに追加する必要があります。あなたがもし、Markdown ファイルや画像など、GraphQL で使うファイルシステムやデータをソースしたければ、[ファイルシステムデータソースドキュメント](/docs/sourcing-from-the-filesystem/) と [レシピ集](/docs/recipes/sourcing-data)をご覧ください。
To source data with an existing plugin you have to install all needed packages. Furthermore you have to add the plugin to the plugins array in the `gatsby-config` with any optional configurations. If you want to source data from the filesystem for use with GraphQL, such as Markdown files, images, and more, refer to the [filesystem data sourcing docs](/docs/sourcing-from-the-filesystem/) and [recipes](/docs/recipes/sourcing-data).

npm からプラグインをインストールする方法については、[プラグインを使う](/docs/using-a-plugin-in-your-site/)ドキュメント内の指示をご覧ください。
For instructions on installing plugins from npm, take a look at the instructions in the docs on [using a plugin](/docs/using-a-plugin-in-your-site/).

また、あなたのプロジェクトにより合ったやり方でデータ取得をしたければ、[カスタムプラグインを作成](/docs/creating-plugins/)することもできます。
You can also [create custom plugins](/docs/creating-plugins/) to fit your own use cases and pull in data however you want.

## クエリーコンポーネントとフック

以下の方法を使うことで、データをページ内・コンポーネント内・もしくは `gatsby-node.js` ファイル内でクエリーできます。
Data can be queried inside pages, components, or the `gatsby-node.js` file, using one of these options:

- `pageQuery` コンポーネント
- `StaticQuery` コンポーネント
- `useStaticQuery` フック

**注意**: Gatsby が GraphQL クエリーをどのように処理するかの流れ上、ページクエリーと静的クエリーを同じファイル内で併用することはできません。また、1 つのファイル内で複数のページクエリーや静的クエリーを使うこともできません。
**Note**: Because of how Gatsby processes GraphQL queries, you can't mix page queries and static queries in the same file. You also can't have multiple page queries or static queries in one file.

クエリーに関連したページコンポーネントもしくは非ページコンポーネントについては、[コンポーネントと立ち上げる](/docs/building-with-components/#how-does-gatsby-use-react-components)ドキュメントのガイドをご覧ください。
For information on page and non-page components as they relate to queries, check out the docs guide on [building with components](/docs/building-with-components/#how-does-gatsby-use-react-components)

### `pageQuery`

`pageQuery`は、Gatsby ページ内のデータ層から情報を取得するための、標準コンポーネントです。1 ページごとに 1 クエリー持つことができます。クエリー内変数を GraphQL の引数として取ることができます。
`pageQuery` is a built-in component that retrieves information from the data layer in Gatsby pages. You can have one page query per page. It can take GraphQL arguments for variables in your queries.

A [page is made in Gatsby](/docs/page-creation/) by any React component in the `src/pages` folder, or by calling the `createPage` action and using a component in the `createPage` options -- meaning a `pageQuery` won't work in any component, only in components which meet this criteria.

Also, refer to the [guide on querying data in pages with page query](/docs/page-query/).

#### Params

A page query isn't a method, but rather an exported variable that's assigned a `graphql` string and a valid query block as its value:

```javascript
export const pageQuery = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`
```

**Note**: the query exported in a `const` doesn't need to be named `pageQuery`. More importantly, Gatsby looks for an exported `graphql` string from the file.

#### Returns

When included in a page component file, a page query returns a data object that is passed automatically to the component as a prop.

```jsx
// highlight-start
const HomePage = ({ data }) => {
  // highlight-end
  return (
    <div>
      Hello!
      {data.site.siteMetadata.description} // highlight-line
    </div>
  )
}
```

### `StaticQuery`

StaticQuery is a built-in component for retrieving data from Gatsby’s data layer in non-page components, such as a header, navigation, or any other child component.

You can only have one `StaticQuery` per page: in order to include the data you need from multiple sources, you can use one query with multiple [root fields](/docs/graphql-concepts/#query-fields). It cannot take variables as arguments.

Also, refer to the [guide on querying data in components with static query](/docs/static-query/).

#### Params

The `StaticQuery` component takes two values as props in JSX:

- `query`: a `graphql` query string
- `render`: a component with access to the data returned

```jsx
<StaticQuery
  query={graphql` //highlight-line
    query HeadingQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `}
  render={(
    data //highlight-line
  ) => (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )}
/>
```

#### Returns

StaticQuery コンポーネントは、`render` プロップ内の `data` を返します。
The StaticQuery component returns `data` in a `render` prop:

```jsx
<StaticQuery
  // ...
  // highlight-start
  render={data => (
    <header>
      <h1>{data.site.siteMetadata.title}</h1>
    </header>
  )}
  // highlight-end
/>
```

### `useStaticQuery`

`useStaticQuery` は、どのコンポーネント内・ページ内でも `StaticQuery` と同じように使えますが、そのさいコンポーネントやレンダープロップを使う必要はありません。
The `useStaticQuery` hook can be used similar to `StaticQuery` in any component or page, but doesn't require the use of a component and render prop.

`useStaticQuery` は React Hook なので、[フックのルール](https://reactjs.org/docs/hooks-rules.html)が適用され、`useStaticQuery` を使うには 16.8.0 かそれ以降のバージョンの React ・ ReactDOM が必要です。
Because it is a React hook, the [rules of hooks](https://reactjs.org/docs/hooks-rules.html) apply and you'll need to use it with React and ReactDOM version 16.8.0 or later. Because of how queries currently work in Gatsby, only one instance of `useStaticQuery` is supported in each file.

Also, refer to the [guide on querying data in components with useStaticQuery](/docs/use-static-query/).

#### Params

The `useStaticQuery` hook takes one argument:

- `query`: a `graphql` query string

```javascript
const data = useStaticQuery(graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
```

#### Returns

The `useStaticQuery` hook returns data in an object:

```jsx
const data = useStaticQuery(graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
return (
  // highlight-start
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
  // highlight-end
)
```

## クエリーの構造　 Query structure

Queries are written in the same shape you want data returned in. How you source data will determine the names of fields that you can query on, based on the nodes they add to the GraphQL schema.

For understanding the parts of a query refer to the [conceptual guide](/docs/graphql-concepts/#understanding-the-parts-of-a-query).

### GraphQL クエリー引数　 GraphQL query arguments

GraphQL クエリーは、返されたデータを変更するための引数を持つことができます。
GraphQL queries can take arguments to alter how the data is returned. The logic for these arguments is handled internally by Gatsby. Arguments can be passed into fields at any level of the query。

Different nodes can take different arguments based off of the nature of the node.

The arguments you can pass to collections (like arrays or long lists of data - ex. `allFile`, or `allMdx`) are:

- [`filter`](/docs/graphql-reference#filter)
- [`limit`](/docs/graphql-reference#limit)
- [`sort`](/docs/graphql-reference#sort)
- [`skip`](/docs/graphql-reference#skip)

`date` フィールドに渡すことができる引数：
The arguments you can pass to a `date` field are:

- [`formatString`](/docs/graphql-reference#dates)
- [`locale`](/docs/graphql-reference#dates)

`excerpt` フィールドに渡すことができる引数：
The arguments you can pass to an `excerpt` field are:

- [`pruneLength`](/docs/graphql-reference#excerpt)
- [`truncate`](/docs/graphql-reference#excerpt)

### GraphQL のクエリー操作　 Graphql query operations

その他、クエリー内で使用できる標準設定
Other built-in configurations can be used in queries

- [`Alias`](/docs/graphql-reference#alias)
- [`Group`](/docs/graphql-reference#group)

使用例は、[クエリーレシピ集](/docs/recipes/querying-data) と [GraphQL クエリーオプション参考ガイド](/docs/graphql-reference/)で確認できます。
For examples, refer to the [query recipes](/docs/recipes/querying-data) and [GraphQL query options reference guide](/docs/graphql-reference/).

## Query fragments

Fragments allow you to reuse parts of GraphQL queries. They also allow you to split up complex queries into smaller, easier to understand components.

For more information, check out the docs guide on [using fragments in Gatsby](/docs/using-graphql-fragments/).

### List of Gatsby fragments

Some fragments come included in Gatsby plugins, such as fragments for returning optimized image data in various formats with `gatsby-image` and `gatsby-transformer-sharp`, or data fragments with `gatsby-source-contentful`.

#### Image sharp fragments

The following fragments are available in any site with `gatsby-transformer-sharp` installed and included in your `gatsby-config.js`.

Information on querying with these fragments is also listed in-depth in the [Gatsby image API docs](/docs/gatsby-image/), including options like resizing and recoloring.

<GraphqlApiQuery>
  {data => (
    <APIReference
      relativeFilePath={data.transformerSharp.nodes[0].relativePath}
      docs={data.transformerSharp.nodes[0].childrenDocumentationJs}
    />
  )}
</GraphqlApiQuery>

#### Contentful fragments

The following fragments are available in any site with `gatsby-source-contentful` installed and included in your `gatsby-config.js`. These fragments generally mirror the fragments outlined in the `gatsby-transformer-sharp` package.

<GraphqlApiQuery>
  {data => (
    <APIReference
      relativeFilePath={data.contentfulFragments.nodes[0].relativePath}
      docs={data.contentfulFragments.nodes[0].childrenDocumentationJs}
    />
  )}
</GraphqlApiQuery>

**Note**: the above fragments are from officially maintained Gatsby starters; other plugins like `gatsby-source-datocms` and `gatsby-source-sanity` ship with fragments of their own. A list of those fragments can be found in the [`gatsby-image` README](/packages/gatsby-image#fragments).

## さらにカスタマイズする　 Advanced customizations

You can customize sourced data in the GraphQL layer and create relationships between nodes with the [Gatsby Node APIs](/docs/node-apis/).

The GraphQL schema can be customized for more advanced use cases: read more about it in the [schema customization API docs](/docs/schema-customization/).
