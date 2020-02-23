---
title: Storybook を使用した Visual Testing
---

[Storybook](https://storybook.js.org/) は、コンポーネントの UI 開発環境です。 Storybook の機能により、コンポーネントがどのような組み合わせでも意図したとおりであると確認できることは、視覚的なテストを行う最適な方法であるだけでなく、「生きたドキュメント」の提供を可能にします。これにより、チームは次のことが容易になります。

1. プロジェクトで利用可能なコンポーネントの確認
2. コンポーネントが受け取れる props と、状態の確認

プロジェクトが時間とともに成長するにつれて、この情報を利用できることは非常に貴重です。 Storybook は、コンポーネントのさまざまな状態を視覚化し、インタラクティブに開発できます。

## 環境を設定する

Storybook をセットアップするには、依存関係をインストールし、カスタム設定を行う必要があります。最初に、 Storybook CLI をインストールします。

```shell
npm install -g @storybook/cli
```

CLI をインストールして次にやるべきことは、 Gatsby プロジェクトのルートディレクトリーから `sb init` コマンドを実行することです。

```shell
npx -p @storybook/cli sb init
```

> `npm` (5.2.0+) の最新バージョンで実行する場合、代わりに `npx -p @storybook/cli sb init` コマンドを実行できます。マシンに CLI がインストールされないので、常に最新バージョンの CLI を実行できます。 Storybook も推奨する方法です。

この `sb init` コマンドは、 React プロジェクトの Storybook を実行するために必要な基本設定を作成します。ただし、ストーリー内で Gatsby 固有のコンポーネントを使用しようとした場合にエラーが発生しないように、Gatsby プロジェクト用に、デフォルトの Storybook の設定を少し更新する必要があります。

Storybook の設定を更新するには、 `.storybook/config.js` を開いて以下のように内容を変更します。

```js:title=.storybook/config.js
import { configure } from "@storybook/react"
import { action } from "@storybook/addon-actions"

// automatically import all files ending in *.stories.js
// highlight-next-line
configure(require.context("../src", true, /\.stories\.js$/), module)

// highlight-start
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}
// highlight-end
```

> プロジェクトのルートから `stories` フォルダーを削除するか、 `src` フォルダー内に移動することできます。

次に、 Gatsby ソースファイルをトランスパイルできるように Storybook のデフォルトの `webpack` 設定を調整し、 Gatsby コンポーネントをトランスパイルするために必要な `babel` プラグインがあることを確認します。

Storybook CLI で作成された `.storybook` フォルダーに `webpack.config.js` ファイルを作成します。そして、そのファイルに以下のコードを配置します (使用している Storybook のバージョンによって異なります）。

**Storybook v5 の場合**

```js:title=.storybook/webpack.config.js
module.exports = ({ config }) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader")

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]

  config.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve("@babel/plugin-proposal-class-properties"),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve("babel-plugin-remove-graphql-queries"),
  ]

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ["browser", "module", "main"]

  return config
}
```

> コンポーネントで [StaticQuery](/docs/static-query/) を使用している場合、 Storybook でレンダリングするために `babel-plugin-remove-graphql-queries` が必要であることに注意してください。これはクエリが、 Gatsby のビルド時には実行され、コンポーネントを直接レンダリングするときには実行されないようにするためです。

> TypeScript を使用する場合、以下のルールを追加します。

```diff:title=.storybook/webpack.config.js
// Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
config.resolve.mainFields = ["browser", "module", "main"]
+
+   config.module.rules.push({
+     test: /\.(ts|tsx)$/,
+     loader: require.resolve('babel-loader'),
+     options: {
+       presets: [['react-app', {flow: false, typescript: true}]],
+       plugins: [
+         require.resolve('@babel/plugin-proposal-class-properties'),
+         // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
+         require.resolve('babel-plugin-remove-graphql-queries'),
+       ],
+     },
+   });
+
+   config.resolve.extensions.push('.ts', '.tsx');
+
return config
```

**Storybook v4 の場合**

```js:title=.storybook/webpack.config.js
module.exports = (baseConfig, env, defaultConfig) => {
  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  defaultConfig.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  defaultConfig.module.rules[0].use[0].loader = require.resolve("babel-loader")

  // use @babel/preset-react for JSX and env (instead of staged presets)
  defaultConfig.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]

  defaultConfig.module.rules[0].use[0].options.plugins = [
    // use @babel/plugin-proposal-class-properties for class arrow functions
    require.resolve("@babel/plugin-proposal-class-properties"),
    // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    require.resolve("babel-plugin-remove-graphql-queries"),
  ]

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  defaultConfig.resolve.mainFields = ["browser", "module", "main"]

  return defaultConfig
}
```

設定が完了したら、それが適切に起動でき、 CLI によってインストールされたデフォルトのストーリーが立ち上がるかを確認するために Storybook を実行してみましょう。 Storybook を実行するには以下のコマンドを実行します。

```shell
npm run storybook
```

Storybook CLI はこのコマンドを `package.json` に追加してくれるので、コマンドを実行する以外に何もする必要はありません。Storybook がビルドに成功すれば、`http://localhost:6006` に移動して、Storybook CLI によって提供されたデフォルトのストーリーを表示できるはずです。

ただし、`StaticQuery` または `useStaticQuery` をプロジェクトで使用する場合、 Storybook は `NODE_ENV` を `production` に設定して実行する必要があります (Storybook はデフォルトで `development` に設定するため）。そうしなければ `babel-plugin-remove-graphql-queries` は実行されません。さらに、 Storybook は Gatsby の `StaticQuery` によって生成された [static files](https://storybook.js.org/docs/configurations/serving-static-files/#2-via-a-directory) について知る必要があります。スクリプトは以下のようになります。

```json:title=package.json
{
  "scripts": {
    "storybook": "NODE_ENV=production start-storybook -s public",
    "build-storybook": "NODE_ENV=production build-storybook -s public"
  }
}
```

## ストーリーを書く

ストーリーを書くための完全なガイドはこのガイドの範囲外ですが、ストーリーの作成について見ていきましょう。

まず、ストーリーファイルを作成します。 Storybook は、 `.stories.js` 拡張子を持つすべてのファイルを検索し、 Storybook にロードします。通常、ストーリーはコンポーネントが定義されている場所の近くに配置しますが、 Gatsby で、ページのストーリーが必要な場合は、 `pages` ディレクトリーの外部にこれらのファイルを作成する必要があります。

> 良い解決策は、 `pages` ディレクトリの隣に `__stories__` ディレクトリを作成し、そこにページストーリーを配置することです。

```jsx:title=src/components/example.stories.js
import React from "react"
import { storiesOf } from "@storybook/react"

storiesOf(`Dashboard/Header`, module).add(`default`, () => (
  <div style={{ padding: `16px`, backgroundColor: `#eeeeee` }}>
    <h1 style={{ color: "rebeccapurple" }}>Hello from Storybook and Gatsby!</h1>
  </div>
))
```

これは非常にシンプルなストーリーですが、 Gatsby に関連して他に変更点はありません。Storybook の仕組みと、それを使って何ができるかについて詳しく知りたい場合は、以下のリソースをご覧ください。

## その他の資料

- Storybook の詳細については、[the Storybook site](https://storybook.js.org/) をご覧ください。
- [Jest and Storybook starter](https://github.com/Mathspy/gatsby-storybook-jest-starter) を始めましょう。
