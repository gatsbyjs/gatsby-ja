---
titie: ローカルプラグインを作る
title: Creating a Local Plugin
---

もしプラグインを特定の用途で使うときや、簡単なやりかたでプラグインを開発したいときは、ローカルに定義されたプラグインは作成および管理する便利な方法です。
If a plugin is only relevant to your specific use-case, or if you’re developing a plugin and want a simpler workflow, a locally defined plugin is a convenient way to create and manage your plugin code.

## ローカルプラグインのプロジェクト構成
## Project structure for a local plugin

このように、コードをプロジェクトルートの `plugins` フォルダの中に配置します。
Place the code in the `plugins` folder in the root of your project like this:

```
/my-gatsby-site
└── gatsby-config.js
└── /src
└── /plugins
    └── /my-own-plugin
        └── package.json
```

また、プラグインは自動的に検知されないので、 `gatsby-config.js` に追加する必要があります。すでに、設定ファイルに含まれているサードパーティー Gatsby プラグインと同じように追加できます。
The plugin also needs to be added to your `gatsby-config.js`, because there is no auto-detection of plugins. It can be added alongside any other 3rd party Gatsby plugins already included in your config.

`gatsby develop` を実行するとき、プラグインを検知するため、プラグインのルートフォルダーの名前は `gatsby-config.js` で使用しているもの（ `package.json` で使用している名前**ではありません**）と同じにする必要があります。上記の構成では、プラグインを読み込む正しい方法は以下のようになります。
For the plugin to be discovered when you run `gatsby develop`, the plugin's root folder name needs to match the name used in the `gatsby-config.js` (_not_ the _name_ it goes by in your `package.json` file). For example, in the above structure, the correct way to load the plugin is:

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-third-party-plugin`,
    `my-own-plugin`, // highlight-line
  ],
}
```

その後、プラグインは [Node](/docs/node-apis/) や [SSR](/docs/ssr-apis/) API を介して Gatsby に接続します。
Then the plugin can begin to hook into Gatsby through [Node](/docs/node-apis/) and [SSR](/docs/ssr-apis/) APIs.

## プロジェクト外部のローカルプラグインを開発する
## Developing a local plugin that is outside your project

プラグインを動作させたりテストするために、プロジェクトに含めないといけないわけではありません。もしプラグインをサイトから [分離](/docs/glossary#decoupled) させたいなら、以下の方法を使用することができます。これはプラグインをパッケージとして公開したいときや、コミュニティが作成したプラグインをフォークしたものをテスト、開発するときに便利です。
Your plugin doesn't have to be in your project in order to be tested or worked on. If you'd like to [decouple](/docs/glossary#decoupled) your plugin from your site you can follow one of the methods described below. This is a useful thing to do if you want to publish the plugin as its own package, or test/develop a forked version of a community authored plugin.

### `require.resolve` とファイルパスを使う
### Using `require.resolve` and a filepath

`plugins` フォルダがローカルプラグインを参照する唯一の方法ではありません。ほかに `gatsby-config.js` ファイルで、 `require` を使い直接パス（`gatsby-config.js` からの相対パス）を指定して、プラグインを含めることができます。
Including a `plugins` folder is not the only way to reference a local plugin. Alternatively, you can include a plugin in your `gatsby-config.js` file by directly referencing its path (relative to the `gatsby-config.js` file) with `require`.

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    // highlight-start
    {
      // plugins フォルダ外のプラグインを使うためにパスを指定
      // including a plugin from outside the plugins folder needs the path to it
      resolve: require.resolve(`../path/to/gatsby-local-plugin`),
    },
    // highlight-end
  ],
}
```

### `npm link` または `yarn link` を使う
### Using `npm link` or `yarn link`

あなたのマシン内の別の場所にあるパッケージを参照するときは、[`npm link`](https://docs.npmjs.com/cli/link.html) や [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) が使えます。
You can use [`npm link`](https://docs.npmjs.com/cli/link.html) or [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) to reference a package from another location on your machine.

Gatsby サイトのルートで `npm link ../path/to/my-plugin` を実行すると、パッケージへのシンボリックリンクが作られます。
By running `npm link ../path/to/my-plugin` in the root of your Gatsby site, your computer will create a symlink to your package.

これは、Gatsby テーマ開発の yarn ワークスペースを作成するときと同じ工程（テーマを開発する際に推奨される方法）です。[テーマ作成ガイド](/tutorial/buidling-a-theme/#set-up-yarn-workspaces) でサイトを設定する方法を読むことができます。
This is a similar process to setting up yarn workspaces for development with Gatsby themes (which is the recommended approach for developing themes). You can read how to setup a site in this manner in the [Building a Theme guide](/tutorial/building-a-theme/#set-up-yarn-workspaces).

**ヒント**： `require.resolve` や `npm link` を使って、plugins フォルダからローカルプラグインを使う例として、[こちらのサンプルリポジトリ](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-multiple-local-plugins) をご覧ください。
**Note**: See an example of using a local plugin from the plugins folder, with `require.resolve`, and `npm link` in [this example repository](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-multiple-local-plugins).

## Babel を使ってコンパイルする
## Compilation and processing with Babel

`gatsby-*` ファイルと同じように、Babel によるコンパイルは行われません。もし使用している Node.js のバージョンではサポートされていな JavsScript 構文を使いたいときは、ファイルを `src` サブフォルダーに置き、プラグインフォルダーのルートへビルドされるようにしてください。
Like all `gatsby-*` files, the code is not processed by Babel. If you want
to use JavaScript syntax which isn't supported by your version of Node.js, you
can place the files in a `src` subfolder and build them to the plugin folder
root.
