---
title: Gatsby テーマでのシャドウイング
---

Gatsby のテーマは、「シャドウイング」と呼ばれる概念を導入します。この機能により、ユーザーは webpack バンドルに含まれる `src` ディレクトリー内のファイルを独自の実装に置き換えることができます。これは、 React コンポーネント、 `src/pages` のページ、 JSON ファイル、 TypeScript ファイルやサイト内の他のインポートされたファイル（`.css` など）に対して機能します。

実際の使用例は、 `gatsby-theme-blog` をインストールし、作成者の `Bio` コンポーネントをカスタマイズして独自の伝記コンテンツを追加する場合です。シャドウイングを使用すると、テーマの元のファイル `gatsby-theme-blog/src/components/bio.js` を独自のファイルに置き換えて、必要な変更を加えることができます。

## シャドウイングの例

`gatsby-theme-blog` をインストールした場合、 `BlogPost` テンプレートで使用される `Bio` コンポーネントをレンダリングすることに気付くでしょう。 `Bio` コンポーネントを変更する場合は、シャドーイング API を使用して変更できます。

### テーマのファイル構造

`gatsby-theme-blog` のファイル構造を調べて、シャドウイングするファイルのファイルのパスを決定できます。

```text:title="tree gatsby-theme-blog"
├── gatsby-config.js
├── gatsby-node.js
└── src
    ├── components
    │   ├── bio-content.js
    │   ├── bio.js // highlight-line
    │   ├── header.js
    │   ├── headings.js
    │   ├── home-footer.js
    │   ├── layout.js
    │   ├── post-footer.js
    │   ├── post.js
    │   ├── posts.js
    │   ├── seo.js
    │   └── switch.js
    ├── gatsby-plugin-theme-ui
    │   ├── colors.js
    │   ├── components.js
    │   ├── index.js
    │   ├── prism.js
    │   ├── styles.js
    │   └── typography.js
    └── templates
        ├── post.js
        └── posts.js
```

### `Bio` コンポーネントのカスタマイズ

この場合、シャドウイングするファイルは `gatsby-theme-blog/src/components/bio.js` です。

シャドウイング API は、確定的なファイル構造を使用して、レンダリングされるコンポーネントを決定します。 `gatsby-theme-blog` の `Bio` コンポーネントをオーバーライドするには、 `user-site/src/gatsby-theme-blog/components/bio.js`という名前のファイルを作成します。

ユーザーのサイトの `src/gatsby-theme-blog`ディレクトリーにあるファイルは、テーマの src ディレクトリーである `gatsby-theme-blog/src` にある同じ名前のファイルの代わりに使用されます。これにより、ファイル全体が置き換えられます。機能やスタイリングなど、テーマの元のファイルの一部を再利用するには、このドキュメントの[extending](#extending-shadowed-files)および[importing](#importing-the-shadowed-component)のシャドウイングファイルをご覧ください。

これは、 `user-site/src/gatsby-theme-blog/components/bio.js` が `gatsby-theme-blog/src/components/bio.js` の代わりにレンダリングされることを意味します：

```jsx:title=src/gatsby-theme-blog/components/bio.js
import React from "react"
export default () => <h1>My new bio component!</h1>
```

Bio コンポーネントのシャドウが成功すると、次のディレクトリツリーが作成されます：

```text
user-site
└── src
    └── gatsby-theme-blog
        └── components
            └── bio.js // highlight-line
```

## 他のテーマのシャドウイング

`gatsby-theme-blog` を含むいくつかのテーマは、他のテーマをインストールします。 `gatsby-theme-blog` は `gatsby-plugin-theme-ui` を使用します。テーマの実装をカスタマイズする場合は、シャドウイングでカスタマイズできます。

たとえば、 `gatsby-plugin-theme-ui` から `index.js` をシャドウイングするには、 `user-site/src/gatsby-theme-blog/gatsby-plugin-theme-ui/index.js` という名前のファイルを作成します。

```js:title=src/gatsby-theme-blog/gatsby-plugin-theme-ui/index.js
export default {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  colors: {
    blue: `blue`,
    red: `tomato`,
  },
}
```

これにより、次のディレクトリツリーが作成されます：

```text
user-site
└── src
    └── gatsby-theme-blog
        └── gatsby-plugin-theme-ui
            └──index.js // highlight-line
```

## すべてのソースファイルでシャドウイング

シャドーイング API は、 React コンポーネントに限定されません。`src` ディレクトリー内の JavaScript 、 Markdown 、 MDX 、または CSS ファイルをオーバーライドできます。これにより、テーマが提供するすべての機能、コンテンツ、スタイリングをきめ細かく制御できます。

`src/styles/bio.css` にある `gatsby-theme-awesome-css` の CSS ファイルをシャドウイングしたい場合は、 `user-site/src/gatsby-theme-awesome-css/styles/bio.css` を作成することでできます。

```css:title=user-site/src/gatsby-theme-awesome-css/styles/bio.css
.bio {
  border: 10px solid tomato;
}
```

テーマの `bio.css` ファイルは、新しい CSS ファイルに置き換えられます。

## ファイル拡張子の上書き

テーマの作成者がファイル拡張子なしでコンポーネント/ファイルをインポートする限り、ユーザーはこれらを他のタイプのファイルでシャドウイングできます。たとえば、テーマ作成者は `src/components/bio.tsx` で TypeScript ファイルを作成し、別のファイルで使用します：

```jsx:title=src/components/header.tsx
import Bio from "./bio"

/* Rest of the code */
```

Bio ファイルを作成することで、ファイルの拡張子をインポートで使用されなかったため JavaScript ファイルである `src/gatsby-theme-blog/components/bio.js`　をシャドウイングできます。

## シャドウイングファイルの拡張

ファイルのオーバーライドに加えて、シャドウイング可能なファイルを _拡張_ できます。

これは、シャドウイングしているコンポーネントをインポートしてからレンダリングできることを意味します。bio をラップしカスタマイズした `Card` コンポーネントがあるシナリオを考えてみましょう。

コンポーネントを拡張せずに、テーマからコンポーネント実装全体を手動でコピーして、カスタムシャドウイングコンポーネントでラップする必要があります。次のようになります：

```jsx:title=src/gatsby-theme-blog/components/bio.js
import React from "react"
import { Avatar, MediaObject, Icon } from "gatsby-theme-blog"
import Card from "../components/card"

export default ({ name, bio, avatar, twitterUrl, githubUrl }) => (
  <Card>
    <MediaObject>
      <Avatar {...avatar} />
      <div>
        <h3>{name}</h3>
        <p>{bio}</p>
        <a href={twitterUrl}>
          <Icon name="twitter" />
        </a>
        <a href={githubUrl}>
          <Icon name="github" />
        </a>
      </div>
    </MediaObject>
  </Card>
)
```

特にこのコンポーネントは比較的単純なので、このワークフローはそれほど悪くありません。ただし、コンポーネントの内部を心配することなく、コンポーネントをラップしたり、別の小道具を渡したりするシナリオで最適化できます。

## シャドウイングコンポーネントのインポート

上記の例では、`Bio` コンポーネントをインポートして `Card` でラップできることが望ましい場合もあります。インポートするとき、代わりに次のことができます：

```jsx:title=src/gatsby-theme-blog/components/bio.js
import React from "react"
import { Author } from "gatsby-theme-blog/src/components/bio"
import Card from "../components/card"

export default props => (
  <Card>
    <Author {...props} />
  </Card>
)
```

これは、カスタマイズするコンポーネントの実装の詳細を気にする必要なく、レンダリングをカスタマイズするための迅速かつ効率的な方法です。シャドウイングコンポーネントをインポートすると、 React の優れた機能を活用して構成を使用できます。

### 新しい prop の適応

場合によっては、コンポーネントは、振る舞いを変更するための prop API を提供します。コンポーネントを拡張するには、コンポーネントをインポートしてから新しい prop を追加します。

たとえば、 `NewsletterCTA` がアクションの呼び出しの外観と色を変更する `variant`prop を受け入れる場合、コンポーネントを拡張するときに使用できます。以下では、 `NewsletterCTA` が再エクスポートされ、デフォルト値を上書きするため `variant="link"` がシャドウイングファイルに追加されます。

```jsx:title=src/gatsby-theme-blog/components/newsletter/call-to-action.js
import { NewsletterCTA } from "gatsby-theme-blog/src/components/newsletter"

export default props => <NewsletterCTA {...props} variant="link" />
```

## CSS prop の利用

拡張するコンポーネントに別の prop を渡すことに加えて、[Emotion CSS prop](/docs/emotion/)を使用して CSS を適用することもできます。これにより、機能を変更せずに特定のコンポーネントのスタイルを変更できます。

```jsx:title=src/gatsby-theme-blog/components/newsletter/call-to-action.js
import { NewsletterCTA } from "gatsby-theme-blog/src/components/newsletter"

export default props => (
  <NewsletterCTA
    css={{
      backgroundColor: "rebeccapurple",
      color: "white",
      boxShadow: "none",
    }}
    {...props}
  />
)
```

**ヒント:** このアプローチが機能するために、NewsletterCTA は、 CSS prop が Emotion babel プラグインによって変換された後、 `className` プロパティを受け入れてスタイルを適用する必要があります。

```js:title=src/gatsby-plugin-theme-ui/index.js
import theme from "gatsby-plugin-theme-ui/src"

const { colors } = theme
export default {
  ...theme,
  colors: {
    ...colors,
    primary: "tomato",
  },
}
```

これにより、いくつかの値をデフォルトから変更する場合にオブジェクトを拡張するための優れたインターフェースが提供されます。

## シャドウイングの量は多すぎますか？

特定のテーマの多数のコンポーネントをシャドウイングしていることに気付いた場合は、代わりにテーマを分岐して変更することをお勧めします。公式の Gatsby テーマは、一連の `-core` テーマを使用してこのパターンをサポートしています。
たとえば、 `gatsby-theme-blog` は `gatsby-theme-blog-core` に依存しているので、 `gatsby-theme-blog` を fork（または完全にスキップ）して、ページ作成やデータソーシングロジックのいずれかの処理を心配することなく独自のコンポーネントをレンダリングできます。
