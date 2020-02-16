---
title: 単体テスト
---

単体テストは、デプロイ前のコードをエラーから守る素晴らしい手段です。Gatsby は形式にとらわれず単体テストのサポートを含んでいませんが、少しの手順で単体テストを実行できます。しかし、 Gatsby のビルドプロセスの特徴により、一般的な Jest のセットアップ方法ではうまくいきません。このガイドでは、 Jest を設定する方法を紹介しています。

## 自分の環境を構築する

もっとも人気のある React 向けのテスト用フレームワークは Facebook 製の [Jest](https://jestjs.io/ja/) です。 Jest は汎用的な JavaScript 単体テストフレームワークである一方、特に React と相性のいい特徴を数多く備えています。

_ヒント: このガイドでは、 `gatsby-starter-default` を使用しています。しかし、コンセプト自体はあなたのサイトと同じか、とてもよく似ているでしょう。_

### 1. 依存関係をインストールする

まず、 Jest といくつか必要なパッケージをインストールしましょう。 あなたの Gatsby のサイトで内部的に利用しているものと babel のプリセットが対応することを確認するために、`babel-jest` と `babel-preset-gatsby` をインストールします。

```shell
npm install --save-dev jest babel-jest react-test-renderer babel-preset-gatsby identity-obj-proxy
```

### 2. Jest 用の設定ファイルを作成する

Gatsby は自分自身の Babel の設定を扱っているので、あなたは自分で Jest に `babel-jest` を利用することを伝える必要があります。一番簡単な方法は、`jest.config.js` を追加することです。それと同時に、以下のような便利なデフォルトの設定ができます。

```js:title=jest.config.js
module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
}
```

この設定ファイルの中身を見てみましょう。

- `transform` オプションでは、プロジェクトのルートにある `jest-preprocess.js` を使って全ての `js` または `jsx` ファイルを変換することを Jest に伝えます。`jest-preprocess.js` を作成しましょう。これは Babel の構成を設定するところです。以下のような最小の構成から初めてみましょう。

```js:title=jest-preprocess.js
const babelOptions = {
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
```

- 次のオプションは `moduleNameMapper` です。このオプションは、webpack のルールのように機能し、Jest にインポートを処理する方法を伝えます。Jest が扱えない静的ファイルのインポートをモックすることが、ここでの主な関心事です。モックとは、テスト内部で実際のモジュールの代わりに使用されるダミーのモジュールです。テストをしたくなかったりテストができないものをモックにすることは良いことです。どんなものでもモックにできます。ここでは、コードよりアセットをモックにしています。CSS 用に `identity-obj-proxy` というパッケージを利用する必要があります。その他全てのアセット用には、 `file-mock.js` というマニュアルのモックを利用する必要があります。これは自分自身で作成できます。`__mocks__` というディレクトリをプロジェクトルートに作成するのが慣習です。名前の前後にアンダースコアを 2 つ付与することに注意してください。

```js:title=__mocks__/file-mock.js
module.exports = "test-file-stub"
```

- 次は `testPathIgnorePatterns` という設定です。 `node_modules` または `.cache` ディレクトリーのあらゆるテストを無視するよう Jest に伝えます。

- その次のオプションはとても重要で、他の Jest の導入ガイドの内容とは異なるものです。`transformIgnorePatterns` が必要な理由は、Gatsby がトランスパイルされていない ES6 のコードを含んでいるからです。デフォルトでは、Jest は `node_modules` 内のコードを変換しようとしません。このため、以下のようなエラーが出力されます。

```text
/my-app/node_modules/gatsby/cache-dir/gatsby-browser-entry.js:1
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import React from "react"
                                                                                            ^^^^^^
SyntaxError: Unexpected token import
```

これは、`gatsby-browser-entry.js` が Jest を実行する前にトランスパイルされていないからです。この解決方法は、`gatsby` のモジュールを除外するために、デフォルトの `transformIgnorePatterns` を変更することです。

- `globals` オプションは、`__PATH_PREFIX__` を設定しています。これは、普段は Gatsby によって設定されるもので、いくつかのコンポーネントが必要とするものです。

- `testURL` では、有効な URL を設定しましょう。 `localStorage` のような、いくつかの DOM API はデフォルト（`about:blank`)の設定では嬉しくありません。

> ヒント: あなたの Jest のバージョンが 23.5.0 以降であれば、 `testURL` のデフォルトは `http://localhost` であるので、この設定をスキップできます。

> Note: if you're using Jest 23.5.0 or later, `testURL` will default to `http://localhost` so you can skip this setting.

- グローバルはもう 1 つ設定する必要があります。しかし、それは関数であるため、 JSON の中で設定できません。`setupFiles` の配列には、全てのテストが実行される前に読み込まれるファイルを列挙できます。これで完璧です。

```js:title=loadershim.js
global.___loader = {
  enqueue: jest.fn(),
}
```

### 3. テスト環境を完成させるための便利なモック

#### `gatsby` をモックする

最終的に、`gatsby` モジュール自身をモックにすることは良い考えです。最初からそうする必要はないでしょう。しかし、もしあなたが `Link` や GraphQL を使っているコンポーネントをテストしたいのであれば、`gatsby` モジュールをモックにすることで、もっと簡単にテストできるようになります。

```js:title=__mocks__/gatsby.js
const React = require("react")
const gatsby = jest.requireActual("gatsby")

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
}
```

これは `graphql()` 関数、`Link` コンポーネント、そして `StaticQuery` コンポーネントをモックしています。

## テストを記述する

単体テストの完全なガイドはこのガイドの範囲外です。しかし、全部が動いていることを確認するためにシンプルなスナップショットテストから始めることができます。

まず、テスト用のファイルを作成します。テスト用のファイルは `__tests__` ディレクトリーに配置することもできますし、その他の場所（普通はコンポーネントの隣）に置くこともできます。テスト用のファイルの拡張子は `.spec.js` or `.test.js` にします。好みで決めて構いません。このガイドでは、慣習に沿って `__tests__` というフォルダーを利用します。 header コンポーネントをテストするためには、`header.js` ファイルを `src/components/__tests__/` に作成します。

```js:title=src/components/__tests__/header.js
import React from "react"
import renderer from "react-test-renderer"

import Header from "../header"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

これはとてもシンプルなスナップショットテストです。`react-test-renderer` を使ってコンポーネントをレンダーし、初回の実行でコンポーネントのスナップショットを生成します。これを将来のスナップショットと比較することで、前のバージョンになかった不具合をすぐにチェックできます。他に記述できるテストを学びたい場合は、[Jestのドキュメント](https://jestjs.io/docs/ja/getting-started) をチェックしてください。

## テストを実行する

`package.json` の中を見てみると、`test` というスクリプトはすでに存在することがわかるでしょう。これはただエラーメッセージを吐くだけです。以下のように変更し、`jest` を実行可能にしましょう。

```json:title=package.json
  "scripts": {
    "test": "jest"
  }
```

これで `npm test` を入力するとテストを実行できます。`npm test -- --watch`のように、ファイルを監視し、変更があればテストを実行する watch mode を開始するフラグを渡すこともできます。

今一度テストを実行してみましょう。全てうまくいくはずです！記述されたスナップショットについてのメッセージを取得しても構いません。これはテストの隣にある `__snapshots__` ディレクトリー内で作成されます。中を見てみると、 `<Header />` コンポーネントが JSON で表現されていることがわかります。過去のあらゆる変更を辿るために、スナップショットのファイルをソースコード管理システム（例：GitHub リポジトリー）に置くべきです。テストを実行するにあたり Travis や CircleCI といった CI システムを使っているのであれば、この点は特に覚えていてください。スナップショットがソース管理されていなければ、CI が落ちてしまうからです。

もしスナップショットを更新する必要があるような変更を加えるのであれば、 `npm test -- -u` を実行してください。

## TypeScript を使う

もし TypeScript を使っているなら、設定を 2 点変更する必要があります。

自分のプロジェクトのルートディレクトリー内のファイルに `jest-preprocess` を実行するために、`jest.config.js` の transform を更新してください。

**注意:** `<rootDir>` は Jest によってプロジェクトのルートディレクトリーに書き換えられるので、ここは変更しないでください。

```js:title=jest.config.js
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
```

また、`jest.preprocess.js` を以下のような Babel プリセットに更新してください。

```js:title=jest-preprocess.js
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}
```

一度このように変更すれば、拡張子 `.ts` または `.tsx` の TypeScript でテストを記述できます。

## その他のリソース

もしあなた自身の Babel の設定に変更を加える必要があるなら、 `jest-preprocess.js` にある設定を編集できます。 Gatsby によって使われているいくつかのプラグインをオンにする必要があるでしょう。しかし、 Babel のバージョン 7 系をインストールする必要があることを覚えていてください。 [the Gatsby Babel config guide](/docs/babel) にサンプルがいくつかあります。

Jest を使ったテストをもっと知りたいのであれば、[Jestのウェブサイト](https://jestjs.io/docs/ja/getting-started)をご覧ください。

これら全てのテクニックを隠蔽する例として、そして [@testing-library/react][react-testing-library] を使った完全な単体テスト一式の例としては、 [using-jest][using-jest] のサンプルをチェックしてください。

[using-jest]: https://github.com/gatsbyjs/gatsby/tree/master/examples/using-jest
[react-testing-library]: https://github.com/testing-library/react-testing-library
