---
title: GraphQL API
tableOfContentsDepth: 2
---

import { GraphqlApiQuery } from "../../www/src/components/api-reference/doc-static-queries"
import APIReference from "../../www/src/components/api-reference"

Gatsby を使う大きな利点は、標準機能としてのデータレイヤーがあり、あなた自身が設定可能な全てのデータソースを含んでいることです。データは[ビルド時](/docs/glossary#build)に集められ、サイト上でデータをどのように処理するかを定義する[スキーマ](/docs/glossary#schema) として組み立てられます。

このページでは Gatsby で使用される GraphQL の特長について、クエリーやデータをソースする方法・サイトごとに合わせた GraphQL カスタマイズ方法などについて説明します。

## GraphQL を使う

Gatsby で GraphQL を使うさい、特別なインストールは必要ありません。`gatsby develop` か `gatsby build` コマンドを使ったとき、スキーマは自動的に統合・作成されます。サイトがコンパイルしたあと、データレイヤーは `http://localhost:8000/___graphql` で [確認できます](/docs/running-queries-with-graphiql/)。

## データをソースする

GraphQL でリクエストしたデータをページに読み込むためには、データを[ソース](/docs/content-and-data/)するか、もしくは GraphQL スキーマに追加する必要があります。Gatsby はデータを取得するために、[ソースプラグイン](/plugins/?=gatsby-source)を使っています。

**注意**: GraphQL の使用が必須ということはありません。Gatsby を [GraphQL 無しで使う](/docs/using-gatsby-without-graphql/)こともできます。

データを既存のプラグインを使ってソースするには、まず全ての必要なパッケージをインストールします。さらに、そのプラグインは `gatsby-config` 内のプラグイン欄に設定とともに追加する必要があります。あなたがもし、Markdown ファイルや画像などファイルシステムデータを GraphQL でソースしたければ、[ファイルシステムからデータをソースする](/docs/sourcing-from-the-filesystem/) と [レシピ集](/docs/recipes/sourcing-data)をご覧ください。

npm からプラグインをインストールする方法については、[プラグインを使う](/docs/using-a-plugin-in-your-site/)ドキュメント内の指示をご覧ください。

また、あなたのプロジェクトにより合ったやり方でデータを取得したければ、[カスタムプラグインを作成](/docs/creating-plugins/)することもできます。

## クエリーコンポーネントとフック

以下のいずれかの方法を使うことで、ページ内・コンポーネント内・もしくは `gatsby-node.js` ファイル内でデータをクエリーできます。

- `pageQuery` コンポーネント
- `StaticQuery` コンポーネント
- `useStaticQuery` フック

**注意**: Gatsby が GraphQL クエリーをどのように処理するかの流れ上、ページクエリーと静的クエリーを同じファイル内で併用することはできません。また、1 つのファイル内で複数のページクエリーや静的クエリーを使うこともできません。

クエリーに関連したページコンポーネントもしくは非ページコンポーネントについては、[コンポーネントを使う](/docs/building-with-components/#how-does-gatsby-use-react-components)ドキュメントのガイドをご覧ください。

### `pageQuery`

`pageQuery`は、Gatsby ページ内のデータレイヤーから情報を取得するための標準コンポーネントです。1 ページごとに 1 クエリー持つことができます。GraphQL の引数をクエリー内の変数に使うことができます。

`src/pages` フォルダー内の React コンポーネントを使い [Gatsby で作成されたページ](/docs/page-creation/)、または `createPage` アクションによって `createPage` オプション内のコンポーネントを使用して作成されたページでは、`pageQuery` はどのコンポーネント内でも使えないことになり、上記の制約内のみでしか使えません。

[ページクエリーを使ったページ内でのデータクエリーガイド](/docs/page-query/)もご覧ください。

#### Params

ページクエリーはメソッドではなく、`graphql` 文字列と有効なクエリーブロックを入れてエクスポートされた変数です。

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

**注意**: `const` でエクスポートされるクエリーの変数名が `pageQuery` である必要はありません。重要なのは、Gatsby は `graphql` 文字列をファイルから探すということです。

#### Returns

`pageQuery` がページコンポーネントファイルに含まれている場合、ページクエリーは、そのコンポーネントにプロパティとして自動的に渡されたデータオブジェクトを返します。

```jsx
// highlight-start
const HomePage = ({ data }) => {
  // highlight-end
  return (
    <div>
      こんにちは！
      {data.site.siteMetadata.description} // highlight-line
    </div>
  )
}
```

### `StaticQuery`

StaticQuery は Gatsby の標準コンポーネントで、例えばヘッダー・ナビゲーション・その他の子コンポーネントなど非ページコンポーネント内のデータレイヤーからデータを取得するのに使います。

1 ページごとに 1 度だけ `StaticQuery` を使うことが出来ます。複数のソースからのデータが必要な時、複数の[ルートフィールド](/docs/graphql-concepts/#query-fields)を含んだ 1 つのクエリーを使用できます。そのさい引数としての変数を取ることはできません。

[コンポーネント内で StaticQuery を使うためのガイド](/docs/static-query/)もあわせてご覧ください。

#### Params

`StaticQuery` コンポーネントは、2 つの値を JSX 内でプロパティとして取ります。

- `query`: `graphql` クエリー文字列
- `render`: 返されたデータを参照できるコンポーネント

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

StaticQuery コンポーネントは、`render` プロパティ内の `data` を返します。

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

`useStaticQuery` フックは、どのコンポーネント内・ページ内でも `StaticQuery` と同じように使えますが、そのさいコンポーネントやレンダープロパティを使う必要はありません。

`useStaticQuery` は React フックなので、[フックのルール](https://reactjs.org/docs/hooks-rules.html)が適用され、`useStaticQuery` を使うには 16.8.0 かそれ以降のバージョンの React ・ ReactDOM が必要です。Gatsby でのクエリーの仕様上、`useStaticQuery` インスタンスは 1 ファイルにつき 1 つだけ使うことができます。

あわせて[コンポーネント内で useStaticQuery を使いデータをクエリーするためのガイド](/docs/use-static-query/)もご覧ください。

#### Params

`useStaticQuery` フックは引数を 1 つ取ります。

- `query`: `graphql` クエリー文字列

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

`useStaticQuery` フックはオブジェクト内のデータを返します。

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

## クエリーの構造

クエリーは、あなたが戻り値としてほしいデータ形式と同じように記述されます。データがどうソースされるかによって、GraphQL スキーマへ追加されたノードを基に、クエリーを実行できるフィールド名が決まります。

クエリーの各パートについてより詳しく知りたければ、[コンセプトガイド](/docs/graphql-concepts/#understanding-the-parts-of-a-query)をご覧ください。

### GraphQL クエリー引数

GraphQL クエリーは、どのようにデータが返されるかを変更する引数を持つことができます。この引数のロジックは、Gatsby 内部で管理されています。引数は、フィールド内クエリーのどの階層にも渡すことができます。

異なるノードは、そのノードの性質に合わせて異なる引数を取ることができます。

コレクション (配列や長い一覧など。例： `allFile`、`allMdx`) に渡すことができる引数：

- [`filter`](/docs/graphql-reference#filter)
- [`limit`](/docs/graphql-reference#limit)
- [`sort`](/docs/graphql-reference#sort)
- [`skip`](/docs/graphql-reference#skip)

`date` フィールドに渡すことができる引数：

- [`formatString`](/docs/graphql-reference#dates)
- [`locale`](/docs/graphql-reference#dates)

`excerpt` フィールドに渡すことができる引数：

- [`pruneLength`](/docs/graphql-reference#excerpt)
- [`truncate`](/docs/graphql-reference#excerpt)

### GraphQL のクエリー操作

その他、クエリー内で使用できる標準設定：

- [`Alias`](/docs/graphql-reference#alias)
- [`Group`](/docs/graphql-reference#group)

使用例は、[クエリーレシピ集](/docs/recipes/querying-data) と [GraphQL クエリーオプション参考ガイド](/docs/graphql-reference/)で確認できます。

## Query フラグメント

GraphQL クエリーは、部分ごとにフラグメントとして再利用できます。複雑なクエリーを小さくパーツ分けして、コンポーネントの構造をより分かりやすくするのにも役立ちます。

詳しい内容については、[Gatsby でフラグメントを使う](/docs/using-graphql-fragments/)ガイドをご覧ください。

### Gatsby フラグメント一覧

Gatsby プラグインにもともと含まれているフラグメントもあり、`gatsby-image` や `gatsby-transformer-sharp` により様々なフォーマットで最適化された画像データを返すためのフラグメントや、`gatsby-source-contentful` のデータフラグメントなどがあります。

#### Image sharp フラグメント

以下のフラグメントは `gatsby-transformer-sharp` がインストールされて `gatsby-config.js` に記述されていれば、どのサイトでも使うことができます。

これらのフラグメントによるクエリーについては、画像のリサイズや色の変更なども含めて [Gatsby 画像 API ドキュメント](/docs/gatsby-image/)に詳しくまとめられています。

<GraphqlApiQuery>
  {data => (
    <APIReference
      relativeFilePath={data.transformerSharp.nodes[0].relativePath}
      docs={data.transformerSharp.nodes[0].childrenDocumentationJs}
    />
  )}
</GraphqlApiQuery>

#### コンテントフルフラグメント

以下のフラグメントは `gatsby-source-contentful` がインストールされ `gatsby-config.js` に記述されていれば、どのサイトでも使うことができます。これらのフラグメントは基本的に `gatsby-transformer-sharp` パッケージ内で記述されたフラグメントを反映します。

<GraphqlApiQuery>
  {data => (
    <APIReference
      relativeFilePath={data.contentfulFragments.nodes[0].relativePath}
      docs={data.contentfulFragments.nodes[0].childrenDocumentationJs}
    />
  )}
</GraphqlApiQuery>

**注意**: 上記のフラグメントは、公式に管理された Gatsby テンプレートからの引用です。`gatsby-source-datocms` や `gatsby-source-sanity` といった他のプラグインは、そのプラグイン自体のフラグメントも内包しています。そのようなプラグインの一覧は [`gatsby-image` README](/packages/gatsby-image#fragments) で確認できます。

## さらにカスタマイズする

ソースされたデータは GraphQL のデータレイヤーでカスタマイズでき、ノード間の関係性を [Gatsby Node APIs](/docs/node-apis/) で構築できます。

GraphQL のスキーマはさらに複雑なケースにおいてもカスタマイズできます。そちらに関しては[カスタマイズスキーマ API ドキュメント](/docs/schema-customization/)をご覧ください。
