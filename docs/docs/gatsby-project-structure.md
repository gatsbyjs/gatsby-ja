---
title: Gatsbyのプロジェクト構造
---

Gatsby のプロジェクトは、主に以下のファイルとフォルダーで構成されています。

```text
/
|-- /.cache
|-- /plugins
|-- /public
|-- /src
    |-- /pages
    |-- /templates
    |-- html.js
|-- /static
|-- gatsby-config.js
|-- gatsby-node.js
|-- gatsby-ssr.js
|-- gatsby-browser.js
```

## フォルダー

- **`/.cache`** _自動生成_ このフォルダーは Gatsby によって自動的に生成された内部キャッシュが入っています。このフォルダー内のファイルは編集対象ではありません。`.gitignore` ファイルに追加しておくことを推奨します。

- **`/plugins`** このフォルダーはプロジェクト特有の `npm` パッケージとは別に管理されているローカルプラグインが含まれます。詳細は[プラグインのドキュメント](/docs/plugins/)を参照してください。

- **`/public`** _自動生成_ ビルドプロセスによってアウトプットされたファイルが含まれるフォルダーです。`.gitignore` ファイルに追加しておくことを推奨します。

- **`/src`** このディレクトリーはあなたのウェブサイトのフロントエンドの（ブラウザーで見える）コード全てを含みます。サイトのヘッダーやページのテンプレートなどです。 “Src” は “source code” の略称です

  - **`/pages`** src/pages 以下に配置されたコンポーネントは、ファイル名とパスにしたがって自動的にページとして生成されます。詳細は [pages recipes](/docs/recipes/pages-layouts) を参照してください。
  - **`/templates`** プログラマブルにページを生成するテンプレートが含まれます。詳細は[コンポーネントを利用してビルドする](/docs/building-with-components/#page-template-components) を参照してください。
  - **`html.js`** 標準的な `.cache/default_html.js` のためのカスタム設定です。詳細は [html.js をカスタマイズする](/docs/custom-html/)を参照してください。

- **`/static`** このフォルダーに配置したファイルは、Webpack によってビルドされません。その代わり `public` フォルダーに直接コピーされます。詳細は [static フォルダーーを使う](/docs/static-folder/#adding-assets-outside-of-the-module-system) を参照してください。

## 設定ファイル

- **`gatsby-browser.js`**: このファイルは Gatsby がどのように [Gatsby browser APIs](/docs/browser-apis/) を利用するか記述します。このファイルにより、ブラウザー上で実行するプログラムの設定を行えます。

- **`gatsby-config.js`**: このファイルは、Gatsby で構築するウェブサイトの主要な設定ファイルです。あなたのウェブサイトにおけるタイトルや説明などのメタデータや、Gatsby プラグインの設定などが含まれます。 詳しくは [config docs](/docs/gatsby-config/) を参照してください。

- **`gatsby-node.js`**: このファイルには、Gatsby がどのように [Gatsby node APIs](/docs/node-apis/) を利用するか記述します。このファイルにより、どのようにウェブサイトをビルドするか設定できます。

- **`gatsby-ssr.js`**: このファイルには、Gatsby がどのように [Gatsby server-side rendering APIs](/docs/ssr-apis/)を利用するか記述します。このファイルにより、どのようにサーバーサイドレンダリングを行うか設定できます。

## その他のフォルダー・ファイル

これらのファイル・フォルダー構成は全て Gatsby プロジェクト固有のものです。そして、Gatsby ウェブサイトは React アプリでもあります、React アプリのプロジェクト構造パターン、 `/components` 、`/utils` が `/src` の中に含まれています。 これらのフォルダーについては [React のドキュメント](https://reactjs.org/docs/faq-structure.html) に代表的な使用例が記載されています。
