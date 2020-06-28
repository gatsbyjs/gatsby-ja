---
title: Gatsby Config API
---

Gatsby におけるウェブサイトの設定オプションは、プロジェクトのルートにある `gatsby-config.js` で行います。

_Note: このページに、設定の違いを確認するための有用なサンプルがあります。[Gatsby Example Websites](https://github.com/gatsbyjs/gatsby/tree/master/examples)._

## 設定オプション

`gatsby-config.js` において利用可能なオプションは以下を含みます。

1.  [siteMetadata](#sitemetadata) (object)
2.  [plugins](#plugins) (array)
3.  [pathPrefix](#pathprefix) (string)
4.  [polyfill](#polyfill) (boolean)
5.  [mapping](#mapping-node-types) (object)
6.  [proxy](#proxy) (object)
7.  [developMiddleware](#advanced-proxying-with-developmiddleware) (function)

## siteMetadata

あなたがサイト全体を横断して再利用したいデータ（サイト名など）は `siteMetadata` に保存します。

```javascript:title=gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Gatsby`,
    siteUrl: `https://www.gatsbyjs.org`,
    description: `Blazing fast modern site generator for React`,
  },
}
```

ここにデータを保管すると、あなたの使いたい場所でこれらのデータを利用できます。データを更新したい場合はこの設定ファイルを更新するだけです。

すべての説明は [Gatsby.js Tutorial Part Four](/tutorial/part-four/#data-in-gatsby) を参照してください。

## Plugins

プラグインは、Gastby の API を利用して作られる Node.js のパッケージです。設定ファイルはプラグインの配列で記述します。いくつかのプラグインはプラグイン名を記述するだけで利用でき、その他のプラグインはいくつかのオプションを明記します。（オプションについてはそれぞれのプラグインのドキュメントを参照してください）

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/../docs/`,
      },
    },
  ],
}
```

プラグインの利用についてさらに知りたい場合は、[Plugins](/docs/plugins/)　を参照してください。公式プラグインとコミュニティーによって作成されたプラグインが利用できます。

## pathPrefix

ウェブサイトがドメインのルート以外の URL でホストされることは一般的です（例：  `example.com/blog/`）。この場合、プレフィックスとして `/blog` を追加することで、サイト内のすべてのパスにプレフィックスパスを追加することが出来ます。

```javascript:title=gatsby-config.js
module.exports = {
  pathPrefix: `/blog`,
}
```

詳細は [パスの接頭辞を追加する](/docs/path-prefix/) を参照してください。

## Polyfill

Gatsby は ES6 Promise API を利用します。いくつかのブラウザーは ES6 構文をサポートしていないため、Gatsby はデフォルトで polyfill を含めています。

もし、デフォルト以外の Promise polyfill を使いたい場合は `polyfill` を false に設定してください。

```javascript:title=gatsby-config.js
module.exports = {
  polyfill: false,
}
```

詳細は [ブラウザーサポート](/docs/browser-support/#polyfills) を参照してください。

## node タイプマッピング

Gatsby には、上級者向け機能として node タイプのマッピングを作成する機能があります。

> ヒント: Gatsby v2.2 以降では node タイプにおけるは外部キーリレーションを提供します。 [`@link` GraphQL 拡張](/docs/schema-customization/#foreign-key-fields).

例えば、複数の編集者で作成する Markdown 製のブログがあり、各ブログの投稿から著者情報にアクセスしたいとします。著者ごとの情報は `author.yaml` に記載されているものとします。

```markdown
---
title: A blog post
author: Kyle Mathews
---

A treatise on the efficacy of bezoar for treating agricultural pesticide poisoning.
```

```yaml:title=author.yaml
- id: Kyle Mathews
  bio: Founder @ GatsbyJS. Likes tech, reading/writing, founding things. Blogs at bricolage.io.
  twitter: "@kylemathews"
```

このようなデータを作成して、Markdown ファイルの frontmatter に記載されている `author` フィールドと `author.yaml` の id にリレーションをもたせます。キーのマッピングは `gatsby-config.js` に以下のように記載します。

```javascript
module.exports = {
  plugins: [...],
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
}
```

この機能を利用する場合、適切な file trasformer の拡張機能をインストーする必要があります。 ( YAML を利用してマッピングを行う場合は [gatsby-transformer-yaml](/packages/gatsby-transformer-yaml/)) と [gatsby-source-filesystem](/packages/gatsby-source-filesystem/) をインストールします。 後に説明する他のファイルタイプによるマッピングの場合は、そのファイルに対応した拡張機能をインストールしてください。

マッピングを設定すると、Gatsby は、GraphQL スキーマを作成するときにこのマッピングを使用して、両方のソースからデータをクエリできるようにします。

```graphql
query($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    fields {
      slug
    }
    frontmatter {
      title
      author {
        # 以下はリンクされた author.yaml のデータ
        id
        bio
        twitter
      }
    }
  }
}
```

マッピング機能は、id の一覧を使って他のデータコレクションとマッピングを行うことも出来ます。例として、2 つの json ファイルをリンクする場合を示します。
下記のような `experience.json` と `tech.json` のデータをマッピングします。

```json:title=experience.json
[
  {
    "id": "companyA",
    "company": "Company A",
    "position": "Unicorn Developer",
    "from": "Dec 2016",
    "to": "Present",
    "items": [
      {
        "label": "Responsibility",
        "description": "Being an unicorn"
      },
      {
        "label": "Hands on",
        "tech": ["REACT", "NODE"]
      }
    ]
  }
]
```

```json:title=tech.json
[
  {
    "id": "REACT",
    "icon": "facebook",
    "color": "teal",
    "label": "React"
  },
  {
    "id": "NODE",
    "icon": "server",
    "color": "green",
    "label": "NodeJS"
  }
]
```

前の例と同じく、`gatsby-config.js` にリレーションを記述します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [...],
  mapping: {
    'ExperienceJson.items.tech': `TechJson`
  },
}
```

この設定により、`tech` の内容を `experience` からクエリできるようになります。

```graphql
query {
  experience: allExperienceJson {
    edges {
      node {
        company
        position
        from
        to
        items {
          label
          description
          link
          tech {
            label
            color
            icon
          }
        }
      }
    }
  }
}
```

また、マッピング機能は Markdown ファイル同士でもマッピングを行うことが出来ます。例として、すべての著者情報を YAML ファイルへ含める代わりに、各著者に関する情報を個別の Markdown ファイルに含める場合を示します。

```markdown
---
author_id: Kyle Mathews
twitter: "@kylemathews"
---

Founder @ GatsbyJS. Likes tech, reading/writing, founding things. Blogs at bricolage.io.
```

今回も、`gatsby-config.js` にリレーションを記述します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [...],
  mapping: {
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.author_id`
  },
}
```

YAML および JSON ファイルと同様に、Markdown ファイル間のマッピングも、ID の配列をマッピングのために使用できます。

## Proxy

Proxy オプションを設定すると、開発サーバーに不明なリクエストが来た場合に、特定のサイトへ通信をプロキシできます、下記は一例です。

```javascript:title=gatsby-config.js
module.exports = {
  proxy: {
    prefix: "/api",
    url: "http://examplesite.com/api/",
  },
}
```

より詳しく知りたい場合は [Proxying API Requests in Develop](/docs/api-proxy/) を参照してください。

## `developMiddleware` を利用した、詳細なプロキシ設定

より詳しく知りたい場合は [adding develop middleware](/docs/api-proxy/#advanced-proxying) を参照してください。
