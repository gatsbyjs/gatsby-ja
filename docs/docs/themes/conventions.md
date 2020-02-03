---
title: テーマの規則
---

Gatsby テーマを作成する方法が定式化および標準化されるようになるとドキュメントがここに追記されます。これらは、守らなければならないただ 1 つの方法という意図ではなく、推奨のアプローチ方法であるということです。他のアイデアやベストプラクティスがある場合は、Pull Request を開いてこのページを更新してください。

## 命名

テーマのプレフィックスとして `gatsby-theme-` をつける必要があります。したがって、テーマに「awesome」という名前を付けたい場合、`gatsby-theme-awesome` と命名し、`package.json` の `name` キーに配置します。`gatsby-theme` で始まるテーマ名を付けることで、Gatsby がコンパイルするテーマパッケージを識別できます。

## 必要なディレクトリーの初期化

新しく作るテーマが `posts` や `gatsby-source-filesystem` などの特定のディレクトリーに依存している場合、初期化するときに `onPreBootstrap` フックを使うことで、Gatsby がサイトのビルド時にクラッシュするのを防ぐことができます。

```js:title=gatsby-node.js
exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()

  const dirs = [
    path.join(program.directory, "posts"),
    path.join(program.directory, "src/pages"),
    path.join(program.directory, "src/data"),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}
```

## クエリーとプレゼンテーショナルコンポーネントの分離

テーマの作成者として、データの収集とデータをレンダリングするコンポーネントは分離することが望ましいです。これにより、エンドユーザーは [PageQuery](/docs/page-query) や [StaticQuery](/docs/static-query) を記述することなく、`PostList` や `AuthorCard` といったコンポーネントを簡単にオーバーライドできます。

### PageQuery

`PostList` コンポーネントにデータを渡す PageQuery で、トップレベルのデータ収集用テンプレートを使用できます。

```jsx:title=src/templates/post-list.js
import React from "react"
import { graphql } from "gatsby"

import PostList from "../components/PostList"

export default props => <PostList posts={props.allMdx.edges} />

export const query = graphql`
  query {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          id
          parent {
            ... on File {
              name
              sourceInstanceName
            }
          }
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
```

### StaticQuery

最上位のテンプレートでも StaticQuery を使用し、`props` として別のプレゼンテーショナルコンポーネントにデータを渡すことができます。

```jsx:title=src/components/layout.js
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "../header.js"
import Footer from "../footer.js"

const Layout = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            social {
              twitter
              github
            }
          }
        }
      }
    `
  )

  const { title, social } = siteMetadata

  return (
    <>
      <Header title={title} />
      <main>{children}</main>
      <Footer {...social} />
    </>
  )
}

export default Layout
```

## サイトのメタデータ

サイトのタイトルやソーシャルメディアのハンドル名などの一般的にカスタマイズされたものについては、`gatsby-config.js` 内でユーザーにサイトメタデータを設定させることができます。そして、次のようにしてテーマ全体でメタデータにアクセスするための StaticQuery を作成できます。

```js:title=src/hooks/use-site-metadata.js
import { graphql, useStaticQuery } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          social {
            twitter
            github
            instagram
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
```

次に、ヘッダーなどのコンポーネントで利用する例です。

```jsx:title=src/components/header.js
import React from "react"
import { Link } from "gatsby"

import useSiteMetadata from "../hooks/use-site-metadata"

export default () => {
  const { title, social } = useSiteMetadata()

  return (
    <header>
      <Link to="/">{title}</Link>
      <nav>
        <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        <a href={`https://github.com/${social.github}`}>GitHub</a>
        <a href={`https://instagram.com/${social.instagram}`}>Instagram</a>
      </nav>
    </header>
  )
}
```

## 重要な変更

テーマは通常、npm からエンドユーザーによってインストールされるため、一般に semver とよばれる[セマンティックバージョニング](https://semver.org/)に従うことが重要です。

これにより、ユーザーは依存関係の更新がユーザーにどのような影響を与える可能性があるかをすばやく識別できます。パッチおよびマイナーバージョンは重大な変更とはみなされませんが、メジャーバージョンは重大な変更とみなされます。

### パッチ _(0.0.X)_

パッチは、下位互換性のある方法で行われるバグ修正として定義されます。これは、公開 API が影響を受けないということを意味します。

#### パッチバージョンの例

- ワーニングの修正やフォールバック値の追加といった、コンポーネント内での**バグ修正**
- 最新のマイナーバージョン、パッチバージョンへの**依存関係のアップグレード**

### マイナー _(0.X.0)_

マイナーバージョンは、下位互換性のある方法で追加される新しい機能として定義されます。これは、**既存の**公開 API が影響を受けないことを意味します。

#### マイナーバージョンの例

- テーマへの**新しいページまたはクエリーの追加**。例：ブログにタグページを追加
- テーマをさらにカスタマイズするための**新しい構成オプションの追加**
- **追加データの表示**。例：投稿リストへの抜粋表示
- 新しい機能のための **props やコンポーネントの追加**
- ユーザーがオプトインできる**新しい MDX ショートコードの追加**

### メジャー _(X.0.0)_

メジャーバージョンは、完全に下位互換性なしに追加されたバグ修正または新機能です。これらはしばしば「重大な変更」とよばれます。

これらの変更には、ユーザーがテーマのアップグレードを実行するために、参照することのできる移行ガイドが必要です。

#### メジャーバージョンの例

- シャドウイングにより常に重大な変更になる **`src` 内のファイル名変更**
  - クエリーが発生する場所の移動
  - コンポーネントの名前変更
  - ディレクトリーの名前変更
- コンポーネントの拡張に影響する**コンポーネントが受け入れる props の削除や変更**
- ユーザーがシャドウコンポーネントの元のデータを使用している可能性がある**クエリーの変更**
- テーマ構成の**動作の削除または変更**
- エンドユーザークエリーを壊す可能性がある**スキーマ定義の属性の削除**
- **デフォルトデータの削除**。ユーザーのサイトが生成されたスキーマの一部に依存している場合、生成されるスキーマが変更され、ユーザーのサイトが壊れるかもしれません。
- **プラグインまたはプラグイン構成の変更**。例：注釈プラグインの変更は MD/MDX レンダリングの動作が変更されます。
