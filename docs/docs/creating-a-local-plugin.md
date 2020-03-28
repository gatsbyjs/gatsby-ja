---
titie: ローカルプラグインの作成
---

もしプラグインを特定の用途で使うときや、簡単なやりかたでプラグインを開発したいときは、ローカルに定義されたプラグインを使うことで作成および管理が便利になります。

## ローカルプラグインのプロジェクト構成

このように、コードをプロジェクトルートの `plugins` フォルダーの中に配置します。

```
/my-gatsby-site
└── gatsby-config.js
└── /src
└── /plugins
    └── /my-own-plugin
        └── package.json
```

また、プラグインは自動的に検知されないので、 `gatsby-config.js` に追加する必要があります。すでに、設定ファイルに含まれているサードパーティー Gatsby プラグインと同じように追加できます。

`gatsby develop` を実行するとき、プラグインを検知するため、プラグインのルートフォルダーの名前は `gatsby-config.js` で使用しているもの（`package.json` で使用している名前**ではありません**）と同じにする必要があります。上記の構成では、プラグインを読み込む正しい方法は以下のようになります。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-third-party-plugin`,
    `my-own-plugin`, // highlight-line
  ],
}
```

その後、プラグインは [Node](/docs/node-apis/) や [SSR](/docs/ssr-apis/) API を介して Gatsby に接続されます。

## プロジェクト外部のローカルプラグインを開発する

プラグインを動作させたりテストするために、必ずプロジェクトに含めないといけないわけではありません。もしプラグインをサイトから [分離](/docs/glossary#decoupled) させたいなら、以下の方法が使えます。これはプラグインをパッケージとして公開したいときや、コミュニティーが作成したプラグインをフォークしたものをテスト、開発するときに便利です。

### `require.resolve` とファイルパスを使う

`plugins` フォルダーがローカルプラグインを参照する唯一の方法ではありません。ほかに `gatsby-config.js` ファイルで、 `require` を使い直接パス（`gatsby-config.js` からの相対パス）を指定して、プラグインを含めることができます。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    // highlight-start
    {
      // plugins フォルダ外のプラグインを使うためにパスを指定
      resolve: require.resolve(`../path/to/gatsby-local-plugin`),
    },
    // highlight-end
  ],
}
```

### `npm link` または `yarn link` を使う

あなたのマシン内の別の場所にあるパッケージを参照するときは、[`npm link`](https://docs.npmjs.com/cli/link.html) や [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) が使えます。

Gatsby サイトのルートで `npm link ../path/to/my-plugin` を実行すると、パッケージへのシンボリックリンクが作られます。

これは、Gatsby テーマ開発の yarn ワークスペースを作成するときと同じ工程（テーマを開発する際に推奨される方法）です。[テーマ作成ガイド](/tutorial/buidling-a-theme/#set-up-yarn-workspaces) でサイトを設定する方法を読むことができます。

**ヒント**： `require.resolve` や `npm link` を使って、plugins フォルダーからローカルプラグインを使う例として、[こちらのサンプルリポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-multiple-local-plugins) をご覧ください。

## Babel を使ってコンパイルする

`gatsby-*` ファイルと同じように、Babel によるコンパイルは行われません。もし使用している Node.js のバージョンではサポートされていない JavsScript 構文を使いたいときは、ファイルを `src` サブフォルダーに置き、プラグインフォルダーのルートへビルドされるようにしてください。