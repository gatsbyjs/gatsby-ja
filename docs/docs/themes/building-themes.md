---
title: テーマの作成
---

テーマを作成するためにワークスペースを立ち上げて運用するもっとも手軽な方法は、公式の [`gatsby-starter-theme-workspace`](https://github.com/gatsbyjs/gatsby-starter-theme-workspace) スターターを使用することです。

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-the-gatsby-theme-workspace-starter-to-begin-building-a-new-theme"
  lessonTitle="Use the Gatsby Theme Workspace Starter to Begin Building a New Theme"
/>

始めるためには以下のコマンドを実行します。

```shell
gatsby new gatsby-theme-my-theme gatsbyjs/gatsby-starter-theme-workspace
```

このコマンドは新しいプロジェクトを作成します。ファイルツリーは以下のような構成になります。

```text
.
├── example
│   ├── src
│   │   └── pages
│   │       └── index.js
│   ├── gatsby-config.js
│   ├── package.json
│   └── README.md
├── gatsby-theme-minimal
│   ├── gatsby-config.js
│   ├── index.js
│   ├── package.json
│   └── README.md
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

Yarn ワークスペースはテーマの開発プロジェクトを設定するための便利な方法です。単一の親ディレクトリー内に複数のパッケージを収容し、それらをリンクさせることができます。

Gatsby テーマを開発することは、あなたが複数のテーマとサンプルサイトを単一のプロジェクト内に保有し、それらをローカルで開発することを意味します。

> 💡 もし必要であれば、テーマを [ローカルプラグイン](https://www.gatsbyjs.org/docs/creating-a-local-plugin/) として開発できます。その代わりに `yarn link` もしくは `npm link` を使うことも可能です。一般的に Gatsby はテーマ作成のために yarn ワークスペースを使用することを推奨しており、スターターやこのチュートリアルでも使用しています。

> 💡 スターターは yarn ワークスペースを使用し、てテーマ開発のためのすべての設定を管理しています。もし詳細を知りたい場合は[こちらのブログ記事](/blog/2019-05-22-setting-up-yarn-workspaces-for-theme-development/)をご覧ください。

### `package.json`

新規プロジェクトのルートにある `package.json` は、主に yarn ワークスペースをセットアップする役割を持ちます。以下の例の場合は `gatsby-theme-minimal` と `example` の 2 つのワークスペースが存在することになります。

```json:title=my-theme/package.json
{
  "name": "gatsby-starter-theme-workspace",
  "private": true,
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "yarn workspace example build"
  },
  // highlight-start
  "workspaces": ["gatsby-theme-minimal", "example"]
  // highlight-end
}
```

### `/gatsby-theme-minimal`

`/gatsby-theme-minimal` ディレクトリーは、あなたが開発する新しいテーマの始点となります。

ディレクトリー内には以下のファイルがあります。

- `gatsby-config.js`: テーマに機能を持たせるための、空の設定ファイル。
- `index.js`: Gatsby がテーマをプラグインとして使用するために必要となる空のファイル（テーマはプラグインとしても機能します）
- `package.json`: 他の人があなたのテーマをインストールした時に、同時にインストールされる依存関係が記述されたファイル。

### `/example`

`/example` ディレクトリーは `gatsby-theme-minimal` ローカルテーマを使用した Gatsby のサンプルサイトです。

ディレクトリー内には以下のファイルがあります。

- `gatsby-config.js`: サイトが使用するテーマやその他の一度限りの設定を記述したファイル
- `/src`: ユーザーのサイト上で動作するカスタムページやコンポーネントが格納されたディレクトリー

## テーマの公開

テーマを作成した際に、それを Gatsby コミュニティー上で公開したくなるかもしれません。その場合は、プラグインを[プラグイン・ライブラリー上で公開](/contributing/submit-to-plugin-library/#publishing-a-plugin-to-the-library)してください。

## その他の参考サイト

### Gatsby Theme Authoring（動画コース）

最新の [Gatsby テーマの開発についての Egghead コース](https://egghead.io/courses/gatsby-theme-authoring)をご覧ください。

### Building a Gatsby Theme（チュートリアル）

[Gatsby テーマの構築チュートリアル](/tutorial/building-a-theme)をご覧ください。ステップ・バイ・ステップでこのドキュメントよりもずっと詳細に解説しています。これは [Egghead のテーマ開発コース](https://egghead.io/courses/gatsby-theme-authoring)に沿うように書かれているので、どちらも参考にできます。

### テーマ API リファレンス

[テーマ API のドキュメント](/docs/theme-api/)をご覧ください。

### アクセシビリティ

Gatsby テーマは Gatsby サイトでもあるため、アクセシビリティを意識した開発が必要です。[あなたのサイト（テーマ）をアクセシブルにするための tips](/docs/making-your-site-accessible/)をご覧ください。

### ソースコードを読み解く

どのように既存のテーマが開発されたかを見るには、以下のサイトを参考にしてください。

- 公式の [Gatsby blog テーマ](https://github.com/gatsbyjs/gatsby-starter-blog-theme)
- 公式の [Gatsby notes テーマ](https://github.com/gatsbyjs/gatsby-starter-notes-theme)
- [Apollo テーマ](https://github.com/apollographql/gatsby-theme-apollo/tree/master/packages)（_興味がありましたら、[Apollo のテーマについてのケーススタディ](https://www.gatsbyjs.org/blog/2019-07-03-using-themes-for-distributed-docs/)もご覧ください。_)
