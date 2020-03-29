---
title: コマンド (Gatsby CLI)
tableOfContentsDepth: 2
---

Gatsby コマンドラインツール (CLI) は Gatsby のアプリを起動して実行したり、デプロイのために Gatsby アプリをビルドして出力するなどの機能を使うためのエントリーポイントです。

_私達はこのドキュメントと同じようなドキュメントを gatsby-cli の [README](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli/README.md) や、印刷するためによく使う CLI のコマンドを[チートシート](/docs/cheat-sheet/)として提供してします。_

## gatsby-cli の使い方

Gatsby CLI (`gatsby-cli`) はグローバルにインストールして使える実行可能なプログラムです。 Gatsby CLI は [npm](https://www.npmjs.com/) から利用できます。ローカルで使用するために `npm install -g gatsby-cli` コマンドを入力してグローバルインストールしてみましょう。

`gatsby --help` を入力するとヘルプが表示されます。

ほとんどの [starters](/docs/starters/) で設定されているように、これらのコマンドを `package.json` のスクリプトフィールドで使うこともできます。例えば、もし [`gatsby develop`](#develop) コマンドがアプリで使いたい場合、`package.json` を開き、以下のようなスクリプトを追加してみてください。

```json:title=package.json
{
  "scripts": {
    "develop": "gatsby develop"
  }
}
```

## API commands

### `new`

```shell
gatsby new [<site-name> [<starter-url>]]
```

#### 引数

<<<<<<< HEAD
| 引数        | 概要                                                                                                                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| site-name   | プロジェクトのディレクトリーを作成するのに使われる Gatsby を用いて作りたいサイトの名前                                                                                                                               |
| starter-url | Gatsby スターターの URL またはローカルのファイルパス。 デフォルトは [gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default)。 詳細は [Gatsby starters](/docs/gatsby-starters/) をご覧ください。 |
=======
| Argument    | Description                                                                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| site-name   | Your Gatsby site name, which is also used to create a project directory.                                                                                                                                 |
| starter-url | A Gatsby starter URL or local file path. Defaults to [gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default); see the [Gatsby starters](/docs/starters/) docs for more information. |
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

> 注釈: `site-name` には文字と数字の組み合わせしか使えません。 もし、 `.` や `./`、 `<space>` が名前に含まれていた場合、`gatsby new` コマンドはエラーで異常終了します。

#### 具体例

- デフォルトのスターターキットを使って `my-awesome-site` という Gatsby のサイトを作ります。

```shell
gatsby new my-awesome-site
```

- [gatsby-starter-blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) を使って、`my-awesome-blog-site` という Gatsby のサイトを作ります。

```shell
gatsby new my-awesome-blog-site https://github.com/gatsbyjs/gatsby-starter-blog
```

- もし、どちらの引数もなければ、CLI は両方の入力をたずねるインタラクティブシェルとして実行されます。

```shell
gatsby new
? What is your project called? › my-gatsby-project
? What starter would you like to use? › - Use arrow-keys. Return to submit.
❯  gatsby-starter-default
   gatsby-starter-hello-world
   gatsby-starter-blog
   (Use a different starter)
```

詳細は [Gatsby starters docs](https://www.gatsbyjs.org/docs/gatsby-starters/) をご覧ください。

### `develop`

すでに Gatsby のサイトを作っていれば、プロジェクトのルートディレクトリーにて、以下のコマンドで開発用サーバーを起動できます。

`gatsby develop`

#### オプション

|   オプション    | 概要                                                    |
| :-------------: | ------------------------------------------------------- |
| `-H`, `--host`  | ホストを設定します。デフォルトは localhost。            |
| `-p`, `--port`  | ポートを設定します。デフォルトは env.PORT または 8000。 |
| `-o`, `--open`  | サイトをデフォルトブラウザーで開きます。                |
| `-S`, `--https` | HTTPS を使います。                                      |

Gatsby を使って HTTPS の開発用サーバーをセットアップする方法は [Local HTTPS guide](/docs/local-https/) をご覧ください。

#### 変更を実機で確認する

以下のように Gatsby develop コマンドへ host オプションを渡すことで、同じネットワークに存在する他の端末から開発用の環境に対してアクセスできるようになります。

```shell
gatsby develop -H 0.0.0.0
```

すると、ターミナルのログに普段と同じ情報に加えて、同じネットワークの他のクライアントからサイトがどうなっているかを確認するための URL が表示されます。

```shell
You can now view gatsbyjs.org in the browser.
⠀
  Local:            http://0.0.0.0:8000/
  On Your Network:  http://192.168.0.212:8000/ // highlight-line
```

**ヒント**: ローカルにてビルドされた Gatsby サイトには、`localhost:8000` または `On Your Network` に表示された URL からアクセスできます。

### `build`

Gatsby サイトのルートディレクトリーにて、アプリをコンパイルし、開発の準備を整えるコマンドです。

`gatsby build`

#### オプション

<<<<<<< HEAD
|          オプション          | 概要                                                                                                                 |
| :--------------------------: | -------------------------------------------------------------------------------------------------------------------- |
|       `--prefix-paths`       | リンクのパスに与えられた引数を追加して、サイトをビルドします。(config に pathPrefix の設定が必要）                   |
|        `--no-uglify`         | JS バンドルに uglify をかけずに、サイトをビルドします。（デバッグ用）                                                |
| `--open-tracing-config-file` | トレーサー設定ファイル（OpenTracing 互換）。詳細は[Performance Tracing](/docs/performance-tracing/) をご覧ください。 |
| `--no-color`, `--no-colors`  | ターミナルの出力の色付けを無効にします。                                                                             |
=======
|            Option            | Description                                                                                                                                  |
| :--------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------- |
|       `--prefix-paths`       | Build site with link paths prefixed (set pathPrefix in your config)                                                                          |
|        `--no-uglify`         | Build site without uglifying JS bundles (for debugging)                                                                                      |
|         `--profile`          | Build site with react profiling. See [Profiling Site Performance with React Profiler](/docs/profiling-site-performance-with-react-profiler/) |
| `--open-tracing-config-file` | Tracer configuration file (OpenTracing compatible). See [Performance Tracing](/docs/performance-tracing/)                                    |
| `--no-color`, `--no-colors`  | Disables colored terminal output                                                                                                             |
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

上記に加えて、ビルドを最適化するためのより高度な設定のためにいくつかの [build environment variables](/docs/environment-variables/#build-variables) があります。例えば、　`CI=true` を環境変数として設定すると[ダム端末](https://ja.wikipedia.org/wiki/%E7%AB%AF%E6%9C%AB#%E3%83%80%E3%83%A0%E7%AB%AF%E6%9C%AB)向けに出力を調整できます。

### `serve`

Gatsby サイトのルートディレクトリーにて、テストのためにプロダクションビルドをサーブするコマンドです。

`gatsby serve`

#### オプション

|    オプション    | 概要                                                                                                            |
| :--------------: | --------------------------------------------------------------------------------------------------------------- |
|  `-H`, `--host`  | ホストを設定します。デフォルトは localhost。                                                                    |
|  `-p`, `--port`  | ポートを設定します。デフォルトは 9000。                                                                         |
|  `-o`, `--open`  | サイトをデフォルトブラウザーで開きます。                                                                        |
| `--prefix-paths` | リンクのパスに引数を前置きして、サイトをサーブする。（gatsby-config.js に pathPrefix が設定されている場合のみ） |

### `info`

Gatsby サイトのルートディレクトリーにて、バグを報告するのに必要となる環境情報を出力するコマンドです。

`gatsby info`

#### オプション

|     オプション      | 概要                                             |
| :-----------------: | ------------------------------------------------ |
| `-C`, `--clipboard` | 自動的に環境情報をクリップボードにコピーします。 |

### `clean`

Gatsby サイトのルートディレクトリーにて、キャッシュ（`.cache`フォルダー）と public ディレクトリーを削除するコマンドです。

`gatsby clean`

このコマンドはローカルのプロジェクトに問題があるように思われるときや、コンテンツが更新されていないように見えるときに有効な奥の手です。以下に含まれる問題が解消できるかもしれません。

- State のデータ、 例えば、ある file/resource/etc. が表示されない
- GraphQL のエラー、例えば、ある GraphQL のリソースが存在するのに、見つからない
- 依存パッケージの問題、例えば、無効なバージョンや console に表示される不可解なエラーなど
- プラグインの問題、例えば、ローカルプラグインを開発中に、変更が反映されていない

### `plugin`

Gatsby プラグインに関連するコマンドを実行します。

#### `docs`

`gatsby plugin docs`

プラグインの使用と作成に関するドキュメントを開きます。

### Repl

Gatsby 環境のコンテキストを用いて、Node.js REPL（インタラクティブシェル）を起動するコマンドです。

`gatsby repl`

Gatsby はコマンドを入力して閲覧できるように促してくれます。REPL のときには `gatsby >` が表示されます。

次のいずれかのようなコマンドを入力できます。

`babelrc`

`components`

`dataPaths`

`getNodes()`

`nodes`

`pages`

`schema`

`siteConfig`

`staticQueries`

[GraphQL explorer](/docs/introducing-graphiql/)と組み合わせると、これらの REPL のコマンドは Gatsby サイトのデータを理解するのにとても有用です。

詳細は、[Gatsby REPL documentation](/docs/gatsby-repl/) をご覧ください。

### 出力の色付けを無効にする

`--no-color` を使う他に、`NO_COLOR` という環境変数を用いることもできます。(詳細は [no-color.org](https://no-color.org/) をご覧ください）

## デフォルトのパッケージマネージャーを次のプロジェクトで変更する方法

新しくプロジェクトを作成するときに初めて `gatsby new` コマンドを使ったときに、デフォルトのパッケージマネージャーとして yarn と npm のどちらを使うかを質問されます。

```shell
Which package manager would you like to use ? › - Use arrow-keys. Return to submit.
❯  yarn
   npm
```

一度選択してしまえば、その後のプロジェクトで設定についてもう一度質問されることはありません。

もし、パッケージマネージャーを変更したい場合は、CLI によって自動的に作成される設定ファイルを編集する必要があります。
このファイルは `~/.config/gatsby/config.json` に存在します。

設定ファイルを以下のように編集することになるでしょう。

```json:title=config.json
{
  "cli": {
    "packageManager": "yarn"
  }
}
```

`packageManager` の値を変更し、保存すると、次のプロジェクトから `gatsby new` で使用されるパッケージマネージャーが変更されています。
