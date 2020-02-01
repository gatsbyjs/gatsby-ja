---
title: "Docz を用いてドキュメントを作成する"
---

プロジェクトについて最適なドキュメントを作成することは、プロジェクトの管理者にとって重要なことです（もちろん将来のあなたにとっても重要です）。[Docz](https://www.docz.site) は、非常に優れたドキュメントジェネレーターです。これを用いることで、ごくわずかな労力でプロジェクトに用いている React コンポーネントについてのドキュメントを作成できます。

Docz は mdx ファイル（Markdown for JSX の略）を活用して、**React コンポーネント**を Markdown に記述できます。また、PropTypes、Flow types、もしくは TypeScript の型情報から**コンポーネントの持つプロパティ一覧**を生成して、コンポーネントの使用方法を適切に文書化できます。さらに、**コンポーネントのサンプル実行環境**を提供して、だれでもコンポーネントの動作を確認したり、コードを変更して変更をリアルタイムで確認したり、コードをコピーして別の場所で使用したりできます。

もし、Gatsby プロジェクトをゼロから開始して、すぐに Docz を用いた優れたドキュメントが必要な場合は、[`gatsby-starter-docz`](https://github.com/pedronauck/gatsby-starter-docz) を活用できます。詳細については、このガイドの最後にある[その他のリソース](#other-resources)セクションをご覧ください。

また、以下のガイドでは、既存の Gatsby プロジェクト内で Docz を動作させる方法を知ることができます。

## 環境を構築する

まず、Gatsby プロジェクトがまだ作成されていない場合、Gatsby CLI を用いて新しいサイトを作成します。

```shell
gatsby new my-gatsby-site-with-docz
```

Docz をセットアップするには、Docz の Gatsby テーマをインストールし、いくつかの設定を追加する必要があります。まず、Gatsby プロジェクトのルートディレクトリーに移動します。

```shell
cd my-gatsby-site-with-docz
```

次に、必要なパッケージをインストールします。

```shell
npm install --save gatsby-theme-docz
```

インストール後に、 `gatsby-config.js` ファイルの `plugins` 配下に `gatsby-theme-docz` を追記します。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    //highlight-next-line
    `gatsby-theme-docz`,
    // プラグインはここに記述します。
  ],
}
```

## ドキュメントを書く

Docz はディレクトリーを検索して `mdx` ファイルを探し、それらをレンダリングします。プロジェクトのルートに `docs` フォルダーを作成します。このディレクトリー内に以下の内容の `index.mdx` ファイルを配置します。

```mdx:title=docs/index.mdx
---
name: Getting Started
route: /
---

# はじめに

## こんにちは世界！

今までで最も美しいドキュメントをここに記述してください！
```

`gatsby develop` コマンドで開発サーバーを起動すると、デフォルトの Docz レイアウトと「はじめに」という見出しが表示されます。すべてが機能することを確認した後、開発サーバーを停止します。

React コンポーネントを追加してレンダリングすることで、ドキュメントに一味添えましょう。簡単に試すために、同じ `docs` ディレクトリーにボタン要素を表示するコンポーネントを作成します。

```jsx:title=docs/button.jsx
import React from "react"
import PropTypes from "prop-types"

const scales = {
  small: {
    fontSize: "16px",
  },
  normal: {
    fontSize: "18px",
  },
  big: {
    fontSize: "22px",
  },
}

export const Button = ({ children, scale }) => (
  <button style={scales[scale]}>{children}</button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  scale: PropTypes.oneOf(["small", "normal", "big"]),
}

Button.defaultProps = {
  scale: "normal",
}
```

ボタンには親コンポーネントから渡されたテキストが表示されます。デフォルトでは `font-size` は `18px` になりますが、サイズとして `small` と `big` を渡すこともできます。これらのプロパティは、後で Docz によって表示されます。

> **ヒント:** もしコンポーネントが `StaticQuery` または `graphql` を用いている場合, 以下のように 2 つのコンポーネントに分割することを検討してください。
>
> - **UI 層**のみを処理する React コンポーネント
> - **データ層**のみを処理する React コンポーネント
>
> `mdx` ファイルには UI 層の React コンポーネントのみを記述し、データ層のコンポーネントではそれを使用して、 `StaticQuery` と `graphql` を用いて取得したデータをレンダリングできます。

`docs` ディレクトリーに新しいファイルを作成して、新しく作成したボタンのコンポーネントをドキュメント化します。以下のように記述することで、ファイル `button.mdx` を呼び出します。

```mdx:title=docs/button.mdx
---
name: Button
menu: Components
---

# ボタン

ボタンは、一般的なアクションをより明確にし、ユーザーがより簡単に操作できるようにするためのものです。ボタンに表示するラベルとアイコンにより、ユーザーがボタンに触れたときに発生するアクションがどういうものなのか伝えることができます。
```

Docz では、コンポーネントとそのプロパティを表示するための内部コンポーネントをいくつか用意しています。これらとドキュメント化するコンポーネントの両方をドキュメントにインポートして使用します。

```mdx:title=docs/button.mdx
---
name: Button
menu: Components
---

// highlight-start
import { Playground, Props } from "docz"
import { Button } from "./button"
// highlight-end

# ボタン

ボタンは、一般的なアクションをより明確にし、ユーザーがより簡単に操作できるようにするためのものです。ボタンに表示するラベルとアイコンにより、ユーザーがボタンに触れたときに発生するアクションがどういうものなのか伝えることができます。

// highlight-start

## プロパティ

<Props of={Button} />

## 一般的な使い方

<Playground>
  <Button>Click me</Button>
</Playground>

## 異なるサイズの指定

<Playground>
  <Button scale="small">Click me</Button>
  <Button scale="normal">Click me</Button>
  <Button scale="big">Click me</Button>
</Playground>
// highlight-end
```

開発サーバーを再度起動すると、プロパティ（ボタンに表示するテキスト、ボタンのサイズ）、上部のサンプル実行環境に通常のボタンが表示され、下部のサンプル実行環境に 3 つのサイズのボタンが表示されます。

## 設定を追加する

通常、 `doczrc.js` ファイルにより Docz の設定を定義できます。利用可能なすべての設定は[こちらから](https://www.docz.site/docs/project-configuration)確認できます。またはテーマのデフォルトのオプションを設定する場合は、 `gatsby-config.js` から `options` を追加することで設定できます。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    //highlight-start
    {
      resolve: `gatsby-theme-docz`,
      options: {
        // ここに設定を記述します。
      },
    },
    //highlight-end
    // プラグインはここに記述します。
  ],
}
```

> `doczrc.js` を使用して設定することを強くお勧めします。設定更新によるリアルタイムな反映は、 `doczrc.js` でのみ機能し、 `gatsby-config.js` による設定では機能しません。

## その他のリソース

- Docz の詳細については、[Docz の公式ページ](https://docz.site/)、特に [Gatsby のテーマに関する資料](https://www.docz.site/docs/gatsby-theme)をご覧ください。
- 公式の [Docz Gatsby スターター](https://github.com/pedronauck/gatsby-starter-docz)を確認してください。
