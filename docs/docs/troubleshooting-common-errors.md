---
title: 一般的なエラーのトラブルシューティング
---

Gatsby での開発中に発生したエラーは、すでに他のユーザーが遭遇したものかもしれません。一部のエラーは Gatsby のコアプロセスの修正が必要で、その場合は [issues](/contributing/how-to-file-an-issue/) を作成するのがベストです。多くのエラーでは、プラグインや API の調整が必要になります。

このガイドは、他の Gatsby ユーザーが躓いた一般的なエラーのリファレンスです。

## キャッシュによる問題

`gatsby develop` を実行すると、 [ホット・モジュール・リプレイスメント](/docs/glossary#hot-module-replacement) などの機能がローカルのサーバーに設定されます。 Gatsby はサイトのルートフォルダーで、データやレンダーされたアセットを `.chache` フォルダーに保持するので、リソースの最適化を繰り返し処理する必要がありません。もしキャッシュのリソースが見つからないというエラーなら、キャッシュを削除してサーバーを再起動すれば解決できるかもしれません。以下のコマンドを実行することで、キャッシュを削除できます。

```shell
gatsby clean
```

これで `.cache` フォルダーと `public` フォルダーが削除されます。 `gatsby develop` を実行すると、再びリソースの処理とキャッシュ化が始まります。

[キャッシュの問題のデバッグ]](/docs/debugging-cache-Issues/)も参照してください。

> キャッシュと永続化についての更なる議論が必要であれば、 次の Issue を参照してください。 [umbrella issue](https://github.com/gatsbyjs/gatsby/issues/11747).

## プラグインの設定によるエラー

プラグインは [Gatsby の機能を拡張します](/docs/what-is-a-plugin/)が、インストールすることで新しいふるまいを追加するため、エラーを発生させる可能性があります。

### CSS スタイル用のプラグインをインストールしたら、 SSR バンドルの生成に失敗した

プラグインをインストールして `gatsby develop` または `gatsby build` コマンドを実行し、 webpack が `Generating SSR bundle failed` エラーを出力した場合、プラグインに必要なパッケージがインストールされていない可能性があります。

emotion, styled-components, SASS などのプラグインは、依存ライブラリーのインストールが必要です。公式のガイドでは、必要な全てのライブラリーをインストールするための手順が書かれていますが、ブログの記事やチュートリアルなど、他所に記載されたものはそうでないかもしれません。

以下は、他ライブラリーのインストールが必要なプラグインの例です。

- [gatsby-plugin-emotion](/packages/gatsby-plugin-emotion/): `@emotion/core` と `@emotion/styled`
- [gatsby-plugin-styled-components](/packages/gatsby-plugin-styled-components/): `styled-components` と `babel-plugin-styled-components`
- [gatsby-plugin-sass](/packages/gatsby-plugin-sass/): `node-sass` か `dart-sass`
- [gatsby-plugin-material-ui](/packages/gatsby-plugin-material-ui/): `@material-ui/styles`
- [gatsby-image](/packages/gatsby-image/): `gatsby-transformer-sharp` と `gatsby-plugin-sharp`

プラグインと一緒に他の依存ライブラリーをパッケージ化せず、公開時にサイズを削減して、代わりの実装に依存させることもできます。例えば `gatsby-plugin-sass` は、 SASS を Node.js か　 Dart の実装に使用できます。

このようなエラーを解決するために、インストールされていないパッケージを調べます。エラーメッセージが以下のようなものだとします。

```shell
...
success run queries - 0.095s - 8/8 84.63/s

 ERROR #98123  WEBPACK

Generating SSR bundle failed

Can't resolve '@emotion/core' in '/Users/you/tmp/gatsby-site/.cache' // highlight-line

File: .cache/develop-static-entry.js
```

このエラーは Gatsby が `@emotion/core` を見つけられなかったものです。原因は emotion をインストールせずに `gatsby-plugin-emotion` をインストールし、 `gatsby-config` に追加したためです。以下のように emotion をインストールします。

```shell
npm install --save @emotion/core
```

見つからなかったライブラリーが `@emotion/core` 以外の場合でも、プラグインと関連するライブラリーをインストールし、 `gatsby-config` に追加することでエラーが解消されます。

## スタイリングによるエラー

次のようなエラーは、CSS やプリプロセッサー、 CSS-in-JS を使用したサイトのスタイリングで起こることがあります。

### styled-components または emotion で、 develop と build のスタイルが異なる

styled-components や emotion を使用し始めたユーザーを躓かせる一般的な問題は、設定に依存プラグインが含まれていないことです。 `gatsby develop` コマンドはサーバーサイドレンダリングを実行しないので、 CSS-in-JS をサーバー側で解決するためのプラグインが含まれていないと、ビルド時にスタイルが異なって見えてしまうことがあります。

使用するライブラリーが styled-components の場合は `gatsby-plugin-styled-components` を、 emotion の場合は `gatsby-plugin-emotion` を `gatsby-config.js` に追加すると、 Gatsby にサーバー側でのスタイルを処理するよう伝えられ、最終的なビルドでまさしく表示されるようになります。

## GraphQL のエラー

Gatsby の GraphQL のデータレイヤーは、ビルド時のデータへのアクセスを提供しています。スキーマからデータを取得したり、ノードを追加するようなプラグインを実装する時、エラーとなる可能性があります。

### Unknown field 'A' on type 'B'

GraphQL スキーマのソースと異なる GraphQL クエリーを要求すると、 `Unknown field 'A' on type 'B'` のようなエラーに遭遇することがあります。エラーが示す通り、要求するフィールドがタイプの中で定義されていません。サイトが正常に動作していれば、 `http://localhost:8000/___graphql` を開いて、エラーの対象となるタイプが有しているフィールドを確認できます。これはどのフィールドが作成されていないのかを調べたり、プラグインやコードの中で、フィールドを作成すべき場所を発見するのに役立ちます。

エラーが `Unknown field 'X' on type 'Query'` のように示している場合は、取得しようとしているコンテンツが正しく処理されていません。 `Query` は GraphQL スキーマに含まれる最上位のルートクエリーです。ソースプラグインは多くの場合、`mdx`(`gatsby-plugin-mdx` から作られます）のようなクエリ可能なルートノードや、`allFile`(`gatsby-source-filesystem` から作られます）のようなルートノードのコレクションを作成します。

エラーのデバッグや検証には、いくつかの方法が考えられます。

- `gatsby-transformer-yaml` のような変換プラグインを使用している場合、 必要なデータは `gatsby-source-filesystem` のようなソースプラグインから取り込まれています。

```javascript:title=gatsby-config.js
{
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`, // yaml ファイルの場所
      },
    },
  ]
}
```

- コンテンツの構造は、GraphQL スキーマとデータの取得方法に一致します。

クエリーを `http://localhost:8000/___graphql` のスキーマや、データの取得に使われるプラグインまたはコードと比較するのは、どれも同じ sharp でデータを表現する必要があるため、エラーを検出するのに良い方法です。

- ソースプラグインと[ソースノード API](/docs/node-apis/#sourceNodes)のどちらもまさしく設定されていません。

## gatsby-image と sharp のエラー

Gatsby の画像処理は、画像を最適化したバージョンに変換する必要があるため、それぞれ異なるパッケージに分割されます。
これらのパッケージを連携させる際に、以下のようなエラーとなることがあります。

### Field "image" must not have a selection since type "String" has no subfields

`Field "image" must not have a selection since type "String" has no subfields.` は、GraphQL がサブフィールドでフィールドを取得しようとしたが、存在しなかった時のエラーです。これは関連プラグインが `gatsby-config` に追加されていないか、間違った順番で追加されている場合に起こります。

クエリーはビルド時に設定されていないフィールドにアクセスしようとしています。以下のコードは、クエリーが `image` のサブフィールドである `childImageSharp` を見つけようとしている、エラー例のような状態です。問題の GraphQL スキーマはこの通りです。

```graphql
allMdx {
  nodes {
    id
    title
    image
  }
}
```

期待される GraphQL スキーマは以下のとおりです。

```graphql
allMdx {
  nodes {
    id
    title
    image {
      childImageSharp {
        fluid {
          srcSet
        }
      }
    }
  }
}
```

最初の例では、サブフィールドを追加するためのプラグインによって `image` が変換（_修正_)されていないので、文字列だけが返りました。`gatsby-plugin-sharp` と `gatsby-transformer-sharp` は、画像ノードを制御または作成する他のプラグイン（`gatsby-source-filesystem` や `gatsby-source-contentful` など）より前に含めることで、Gatsby がそれらを修正し、`childImageSharp` を追加する前に、フィールドの存在を確認できます。

GraphQL スキーマに画像を追加する詳細な方法については、[外部の画像を処理する](/docs/preprocessing-external-images/)で知ることができます。

考えられる他の原因は、空の文字列がサイト内の画像パスに使用されていることです。その場合は Gatsby が GraphQL スキーマを構築する際に空の文字列がファイル名と認識できず、間違ったタイプを[推論](/docs/glossary#inference)している可能性があります。

### `gatsby-plugin-sharp` で `sharp` をインストールする時のエラー - gyp ERR! build error

`gyp ERR! build error` や `npm ERR! Failed at the sharp@x.x.x install script` のように、sharp に関する依存関係のインストール中にエラーが発生した場合、プロジェクトのルートフォルダーにある `node_modules` フォルダーを削除して、再度インストールすると解決できます。

```shell
# このコマンドは、指定したフォルダー内の全てのファイルを再帰的に削除するので注意してください。
# この例では node_modules フォルダーです。
rm -rf node_modules

# このコマンドは package.json からライブラリーをインストールして、
# node_modules フォルダーに設置します。
npm install
```

sharp のインストールと実行に使用する Node.js のバージョンは同じでなければならないので、`node_modules` フォルダーを削除して再度インストールすると、大抵は問題が解決します。

> sharp のインストールと画像処理の問題についての意見がさらに必要な時は、 [こちらの Issue](https://github.com/gatsbyjs/gatsby/issues/10841) を参照してください。

### Incompatible library version: sharp.node requires version X or later, but Y provides version Z

`Incompatible library version: sharp.node requires version X or later, but Y provides version Z` エラーは、`node_modules` にインストールされている `sharp` パッケージと互換性のないバージョンが複数存在する時に発生します。メッセージは以下のように表示されます。

```shell
Something went wrong installing the "sharp" module
dlopen(/Users/you/gatsby-site/node_modules/sharp/build/Release/sharp.node, 1): Library not loaded: @rpath/libglib-2.0.dylib
  Referenced from: /Users/you/gatsby-site/node_modules/sharp/build/Release/sharp.node
  Reason: Incompatible library version: sharp.node requires version 6001.0.0 or later, but libglib-2.0.dylib provides version 5801.0.0
```

修正するには、`sharp` パッケージに依存する全ての Gatsby プラグインを更新する必要があります。その必要があるプラグインは以下のとおりです。

- `gatsby-plugin-sharp`
- `gatsby-plugin-manifest`
- `gatsby-remark-images-contentful`
- `gatsby-source-contentful`
- `gatsby-transformer-sharp`
- `gatsby-transformer-sqip`

パッケージをアップデートしたら、以下のコマンドを実行します。

```shell
npm install gatsby-plugin-sharp gatsby-plugin-manifest gatsby-remark-images-contentful gatsby-source-contentful gatsby-transformer-sharp gatsby-transformer-sqip
```

それでも問題が解決しない場合、他のプラグインが、バージョン違いの `sharp` パッケージに依存しているかもしれません。`npm list sharp` や `yarn why sharp` を実行して `sharp` を使用するパッケージを確認し、それらを更新してみてください。

## ビルド、デプロイ中のエラー

サイトのビルドプロセスは、[開発プロセスとは若干異なります](/docs/overview-of-the-gatsby-build-process/)。ビルド時には、ブラウザーを参照する時にエラーとなることがありますが、ほとんどの問題は `develop` モードで捉えることができます。

サイトのビルド時に発生する問題については、[HTML ビルドのデバッグ](/docs/debugging-html-builds/)を参照してください。

### エラー: ReferenceError: window is not defined when running `gatsby build`

ブラウザーのグローバルである `window` や `document` を参照すると、開発時にはなかった `Error: ReferenceError: window is not defined` のようなエラーをあります。ビルドはブラウザーで実行されず、`window` などのオブジェクトが定義されないためです。

この問題を解決するためには、[`window` が定義されているかを確認する](/docs/debugging-html-builds/#how-to-check-if-window-is-defined)を参照してください。

### ビルド時の問題： Field 'browser' doesn't contain a valid alias configuration

以下のようなエラーを表示することがあります。

```shell
Module not found: Error: Can't resolve `../..SomeFile.svg`
  Field 'browser' doesn't contain a valid alias configuration
  ...
```

ビルド中に `../..SomeFile.svg` を見つけるのに失敗しているエラーです。もしローカル環境で `gatsby develop` や `gatsby build` や `gatsby serve` が実行できる場合、この問題はあなたをイライラさせるかもしれません。考えられる原因としては、ローカル環境とデプロイ環境の OS が異なることです。大抵のデプロイ先は Linux のディストリビューションやフレーバーで動作しています。

一般的なエラーの原因は、ファイルパスの大文字と小文字が混ざっていることです。例えば上記のようなエラーであれば、実際のファイル名が　`SomeFile.svg` で、 `Somefile.svg` や `somefile.svg` でないか確認してみてください。一部の OS はこの不一致を認識してくれますが、あなたの環境はそうでないかもしれません。

ログに出力されるファイルパスの大文字小文字を確認し、デプロイし直すことが最良のステップです。
