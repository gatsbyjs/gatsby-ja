---
title: GraphQL を用いたコンポーネントのテスト
---

あなたが GraphQL のクエリーを用いたテストを行おうとすると、データがないことに気づくでしょう。Jest はあなたのクエリーを実行できないので、あなたが GraphQL のデータに依存したコンポーネントのテストを行いたいのならば、データを自分自身で用意する必要があります。データを変更することでテストが壊れうる場合やテストを実行するためにネットワークアクセスを要するリモートデータを用いる場合に、これは良い方法です。

一般的に、可能な限り小さいコンポーネントでテストすることは、ベストプラクティスとされています。全てのページを一度にテストしようとするよりも、それぞれのページコンポーネントをモックデータと共にテストする方が簡単です。しかしながら、もし全てのページをテストしたいのならば、コンポーネントに対して同じデータを用意する必要があります。幸運にもあなたが必要なデータを手に入れる簡単な方法があります。

まず[単体テストの案内](/docs/unit-testing/)を読み、説明されているようにあなたのプロジェクトを準備したか確認してください。この案内では、同じブログスタータープロジェクトを用いています。それでは、index ページに簡単なスナップショットテストを書いていきましょう。

Jest は GraphQL の実行やコンパイルができないので、エラーが起きないように `graphql` 関数のモックを用意する必要があります。単体テストの案内で説明されているように、あなたが `gatsby` のモックと共にプロジェクトを用意したならば、準備はすでに完了しています。

## ページクエリーのテスト

これはページコンポーネントのテストが目的なので、Gatsby が pages へ取り込もうとしないように、テストのファイルは別のフォルダーに保存する必要があります。

```js:title=src/pages/__tests__/index.js
import React from "react"
import renderer from "react-test-renderer"
import Index from "../index"

describe("Index", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  }))
```

もしこのテストを実行した場合、エラーが起きます。`Layout` コンポーネントの StaticQuery がモックになっていないからです。これは以下のように、StaticQuery のモック化で解消できます。

```js:title=src/__tests__/index.js
import React from "react"
import renderer from "react-test-renderer"
import { StaticQuery } from "gatsby"
import Index from "../pages/index"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `Default Starter`,
        },
      },
    })
  )
})

describe("Index", () =>
  it("renders correctly", () => {
    const tree = renderer.create(<Index />).toJSON()
    expect(tree).toMatchSnapshot()
  }))
```

これで `StaticQuery` のエラーは解消されました。しかし、もっと現実世界の例に目を向けると、Gatsby の `graphql` ヘルパーも用いてページのクエリーを行っているかもしれません。この場合、コンポーネントに渡される GraphQL のデータはありません。テストの構造は少し複雑になりますが、このような場合もテストできます。幸運にも、このような場合に適したデータを取得する方法があるのです。GraphQL IDE を起動するために、`npm run develop` を実行して、`http://localhost:8000/___graphql` を見てください。あなたは今、ページで用いられているのと同じクエリーで同じデータを取得できます。もしそのクエリーがフラグメントを含まないシンプルなものならば、直接コピーすることもできます。ここでは、index ページからコピーしたこのクエリー実行します。

```graphql
query IndexQuery {
  site {
    siteMetadata {
      author
    }
  }
}
```

出力結果は、クエリーの結果と共に、JSON オブジェクトをあなたに与えてくれます。
ここでは簡潔に表すために 1 つのノードに整えました。

```json
{
  "data": {
    "site": {
      "siteMetadata": {
        "author": "Your Name Here"
      }
    }
  }
}
```

GraphiQL は、Gatsby によって定義されたフラグメントについて一切知りません。したがって、もしあなたのクエリーがフラグメントを使用しているのならば、フラグメントの内容と置き換える必要があります。もしあなたが `gatsby-transformer-sharp` を使用しているのならば、[gatsby-transformer-sharp/src/fragments.js](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js) にてフラグメントを見つけることができます。
例えば、あなたのクエリーが以下を含んでいるとします。

```graphql
    image {
        childImageSharp {
            fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
            }
        }
    }
```

それが、こうなります。

```graphql
    image {
        childImageSharp {
            fluid(maxWidth: 1024) {
                base64
                aspectRatio
                src
                srcSet
                sizes
            }
        }
    }
```

クエリーの結果がある時、出力から `data` の値をコピーしてください。グッドプラクティスは、フィクスチャとして別ファイルに保存することです。しかし、ここでは簡潔にテストファイルの中に直接定義してしまいましょう。

```js:title=src/pages/__tests__/index.js
import React from "react"
import renderer from "react-test-renderer"
import Index from "../index"

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `Default Starter`,
        },
      },
    })
  )
})

describe("Index", () => {
  it("renders correctly", () => {
    const data = {
      site: {
        siteMetadata: {
          author: "Your name",
        },
      },
    }

    const tree = renderer.create(<Index data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

テストを実行してみてください。通過するはずです。テスト結果を確認するために、`__snapshots__` を見てみましょう。

## StaticQuery をテストする

上記の方法は、コンポーネントに直接データを渡すため、ページのクエリーでは機能します。しかし、これは `StaticQuery` を使用しているコンポーネントでは機能しません。なぜならば、`StaticQuery`は `props` ではなく `context` を使用しているためです。このようなタイプのコンポーネントをテストするには少々違った方法が必要となります。

`StaticQuery` は、pages だけではなくいかなるコンポーネントでもクエリーを作ることを可能にします。
これは、多くの面で柔軟性を与えてくれますし、深くネストされたコンポーネントに props を渡さなくてもよくなります。ドキュメントで説明されたタイプチェックを有効にするパターンは、コンポーネントをテスト可能にする良いスタートラインとなります。なぜならば、コンポーネントそのものの定義とクエリーが別れているからです。しかしながら、この例では、テストする必要のある内部の純粋なコンポーネントをエクスポートされていません。

この Header コンポーネントの例では、Layout から渡されたデータを用いるのではなく、ページのデータそのものを問い合わせています。

```jsx:title=src/components/header.js
import React from "react"
import { StaticQuery } from "gatsby"

const Header = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Header {...props} data={data} />}
  />
)
```

これでほとんど完了です。あとは、StaticQuery に渡している純粋なコンポーネントのエクスポートだけ行う必要があります。まずは、名前の衝突を避けるために、名前を変更しましょう。

```jsx:title=src/components/header.js
import React from "react"
import { StaticQuery, graphql } from "gatsby"

export const PureHeader = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
)

export const Header = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <PureHeader {...props} data={data} />}
  />
)

export default Header
```

もしあなたが `useStaticQuery` の方を使うことが好きならば、Header コンポーネントを以下のように書き直すこともできます。

```jsx:title=src/components/header.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const PureHeader = ({ data }) => (
  <header>
    <h1>{data.site.siteMetadata.title}</h1>
  </header>
)

export const Header = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <PureHeader {...props} data={data}></PureHeader>
}

export default Header
```

`useStaticQuery` はただの関数である React Hook のため、prop として `PureHeader` へ渡される `data` に割り当てることが可能と気づいたでしょうか。これは、私たちが `Header` もまた関数コンポーネントとして作ったので可能となります。

今、あなたは 2 つのエクスポートされているコンポーネントを持っています。1 つは、デフォルトのエクスポートとなっている StaticQuery のデータを含んでいるコンポーネント、もう 1 つは、あなたがテストできるコンポーネントです。これが意味するのは、GraphQL から独立したコンポーネントがテスト可能ということです。加えて、あなたが StaticQuery と useStaticQuery のいずれを使用するにしても、あなたのテストは関数であり続けなければなりません。

これはコンポーネントを"純粋"に保つメリットの好例です。"純粋"とは、もし同じ値を入力したのならば、常に同じ結果を生成し、返り値以外の副作用は持たないということです。純粋なコンポーネントであれば、例えばもしネットワークがダウンしたりデータソースが変更したりしてもテストが失敗せず、常に再現可能であることを確実なものとしてくれます。`Header` はクエリーを生成しているため純粋ではなく、出力は props とは別のものに依存しています。`PureHeader` は、純粋です。なぜならば、返り値がコンポーネントに渡される props へ完全に依存しているからです。これは、テストが行いやすく、スナップショットが変わることはないということを意味します。

こちらがテストの例になります。

```js:title=src/components/__tests__/header.js
import React from "react"
import renderer from "react-test-renderer"

import { PureHeader as Header } from "../header"

describe("Header", () => {
  it("renders correctly", () => {
    // Created using the query from Header.js
    const data = {
      site: {
        siteMetadata: {
          title: "Gatsby Starter Blog",
        },
      },
    }
    const tree = renderer.create(<Header data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

## TypeScript を使った場合

もしあなたが TypeScript を使用しているのならば、タイプエラーはあなたがコンポーネントに渡すべきなものについて正確に教えてくれるため、ずっと簡単にテストを行いやすくなります。これが、あなたの全ての GraphQL クエリーに対して、型のインターフェイスを定義することが良いアイデアとなる理由です。
