---
title: Gatsbyの構成要素を理解する
typora-copy-images-to: ./
disableTableOfContents: true
---

[**前のセクション**](/tutorial/part-zero/)で、必要なソフトウェアをインストールしてローカル開発環境を準備し、[**"hello world"スターター**](https://github.com/gatsbyjs/gatsby-starter-hello-world)を使って、最初の Gatsby サイトを作成しました。次に、そのスターターが生成したコードをさらに深く掘り下げていきましょう。

## Gatsby スターターの使用

[**チュートリアル・パート 0**](/tutorial/part-zero/)で、次のコマンドを使用して"hello world""スターターに基づいて新しいサイトを作成しました。

```shell
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

新しい Gatsby サイトを作成する場合、次のコマンド構成を使用して、すでにある Gatsby スターターに基づいて新しいサイトを作成できます。

```shell
gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]
```

末尾の URL_OF_STARTER_GITHUB_REPO（スターターの GitHub リポジトリー URL）を省略すると、Gatsby は[**デフォルトスターター**](https://github.com/gatsbyjs/gatsby-starter-default)に基づいてサイトを自動的に生成します。チュートリアルのこのセクションでは、チュートリアル・パート 0 ですでに作成した"Hello World"サイトを引き続き使用します。詳細については、[スターターの変更](/docs/modifying-a-starter)のドキュメントをご覧ください。

### ✋ コードを読む

コードエディターで、"Hello World" サイト用に生成されたコードを開き、"hello-world" ディレクトリーに含まれるさまざまなディレクトリとファイルを確認します。次のようになっていることでしょう。

![VS Code 上での Hello World プロジェクト](01-hello-world-vscode.png)

_ヒント: 繰り返しますが、ここに示すエディターは Visual Studio Code です。別のエディターを使用している場合は、外観が少し異なります。_

ホームページを動かしているコードを見ていきましょう。

> 💡 前のセクションで `gatsby develop` を実行した後、開発サーバを止めている場合はもう一度立ち上げてください。それでは、hello-word サイトに変更を加えていきましょう！

## Gatsby ページに慣れる

コードエディターで `/src` ディレクトリーを開きます。中に `/pages` というディレクトリーが 1 つあります。

`src/pages/index.js` ファイルを開きます。このファイルのコードは、ひとつの div といくつかのテキスト（"Hello world!" という文字列）を含んだコンポーネントを作成します。

### ✋ "Hello World" ホームページに変更を加える

1. "Hello World!" という文字列を "Hello Gatsby!" に変更して、ファイルを保存します。ウィンドウを横に並べている場合、ファイルを保存すると、コードとコンテンツの変更がブラウザーへほぼ即座に反映されることがわかります。

<video controls="controls" autoplay="true" loop="true">
  <source type="video/mp4" src="./02-demo-hot-reloading.mp4"></source>
  <p>ごめんなさい！お使いのブラウザはこのビデオには対応していません。</p>
</video>

> 💡 Gatsby は**ホットリローディング**を使用して開発プロセスをスピードアップします。基本的に、Gatsby 開発サーバーを実行している場合、Gatsby サイトのファイルをバックグラウンドで「監視」しています。ファイルを保存すると、変更がすぐにブラウザへ反映されます。ページをハードリフレッシュしたり、開発サーバーを再起動したりする必要はありません。変更はすぐに表示されます。

2. 変更した内容をもう少し見やすくすることができます。`src/pages/index.js` のコードを以下のコードに置き換えて、もう一度保存してください。変更されたテキストが表示されます。テキストの色が紫色になり、フォントサイズが大きくなります。

```jsx:title=src/pages/index.js
import React from "react"

export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

> 💡 Gatsby のスタイルについてはこのチュートリアルの[**パート 2**](/tutorial/part-two/) で詳しく説明します。

3. フォントサイズのスタイルを削除し、"Hello Gatsby!" テキストをレベル 1 のヘッダーに変更し、ヘッダーの下に段落を追加します。

```jsx:title=src/pages/index.js
import React from "react"

export default () => (
  {/* highlight-start */}
  <div style={{ color: `purple` }}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
  {/* highlight-end */}
  </div>
)
```

![ホットリロードによるその他の変更](03-more-hot-reloading.png)

4. 画像を追加します。(ここでは、Unsplash の画像をランダムで表示します)。

```jsx:title=src/pages/index.js
import React from "react"

export default () => (
  <div style={{ color: `purple` }}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    {/* highlight-next-line */}
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
)
```

![画像を追加](04-add-image.png)

### ちょっと待って… JavaScript に HTML？

\_React と JSX に精通している場合は、このセクションをスキップしてください。\_React フレームワークを使用したことがない場合、JavaScript 関数の中で HTML が何をしているのか疑問に思うかもしれません。また、最初の行で "react" をインポートしているのに、どこでも使用していないのはなぜでしょう。このハイブリッドな "HTML-in-JS" は、実際には JSX と呼ばれる React 用の JavaScript の構文拡張です。React を使用した経験がなくても、このチュートリアルを進めることはできますが、興味がある方のために、簡単な解説をしましょう。

`src/pages/index.js` ファイルの元の内容をみてみましょう。

```jsx:title=src/pages/index.js
import React from "react"

export default () => Hello world!
```

純粋な JavaScript では、次のようになります。

```javascript:title=src/pages/index.js
import React from "react"

export default () => React.createElement("div", null, "Hello world!")
```

これで、 `'react'` のインポートが使われているのを見つけることができます！でも、ちょっと待って。あなたは純粋な HTML や JavaScript ではなく、JSX を書いています。ブラウザーはそれをどのように読み込むのでしょうか？短い答えとしては、読み込みません。Gatsby サイトには、ソースコードをブラウザーが解釈できるものに変換するためのツールがすでに設定されているのです。

## コンポーネントを使用して構築

編集をしたばかりのホームページは、ページコンポーネントを定義して作成しました。「コンポーネント」とは正確には何なのでしょうか？

大まかに定義すると、コンポーネントはサイトを構成する要素です。 UI（ユーザーインターフェイス）部分を記述する自己完結型なコードです。

Gatsby は React 上に構築されています。本文書の中で**コンポーネント**という言葉を使用したり定義する場合、私たちは **React コンポーネント**のことを指します。React コンポーネントとは、入力を受け付けて、UI 部分を記述する React エレメントを返す自己完結型のコード（通常 JSX で記述）のことです。

特にあなたが開発者であるならば、コンポーネントを使用して構築しはじめる際に、CSS、HTML、JavaScript が密結合（時には 1 つのファイルにさえ）されることに大きな心理的変化を経験するでしょう。

一見単純な変更ですが、これはウェブサイトを構築する上での考え方に深い意味を持ちます。

カスタムしたボタンを作成する例を見てみましょう。この前までは、CSS クラス（例えば `.primary-button`）を作成しスタイルをカスタムし、それらのスタイルを適用したいときにカスタムしたスタイルを使用していました。以下が例です。

```html
<button class="primary-button">Click me</button>
```

コンポーネントの世界では、ボタンのスタイルの代わりに `PrimaryButton` コンポーネントを作成し、サイト全体で次のように使用します。

<!-- prettier-ignore -->
```jsx
<PrimaryButton>Click me</PrimaryButton>
```

コンポーネントは、サイトの基本的な構成要素になります。ブラウザーが提供する制限されたブロック要素（例: `<button />`）に限定されず、プロジェクトのニーズをエレガントに満たす新しい構成要素を簡単に作成できます。

### ✋ ページコンポーネントの使用

`src/pages/*.js` で定義した React コンポーネントは自動的にページになります。これを実際に見てみましょう。

すでに "Hello World" スターターに付属する `src/pages/index.js` ファイルがあります。about ページを作成しましょう。

1. `src/pages/about.js` に新しいファイルを作成し、次のコードを新しいファイルにコピーして保存します。

```jsx:title=src/pages/about.js
import React from "react"

export default () => (
  <div style={{ color: `teal` }}>
    <h1>About Gatsby</h1>
    <p>Such wow. Very React.</p>
  </div>
)
```

2. http://localhost:8000/about/ に移動します。

![新しい about ページ](05-about-page.png)

React コンポーネントを 'src/pages/about.js`ファイルに配置するだけで、`/about` でアクセス可能なページを作成します。

### ✋ サブコンポーネントの使用

ホームページと about ページの両方が非常に大きくなってくると、多くのことを書き直す必要があります。サブコンポーネントを使用して、UI を再利用可能なパーツに分割できます。どちらのページにも `<h1>` があるので、それらを `Header` というコンポーネントとして作成しましょう。

1. `src/components` に新しいディレクトリーを作成し、そのディレクトリー内に `header.js` というファイルを作成します。
2. 次のコードを新しい `src/components/header.js` ファイルに追加します。

```jsx:title=src/components/header.js
import React from "react"

export default () => <h1>This is a header.</h1>
```

3. `about.js` ファイルを変更して、`Header` コンポーネントをインポートします。`h1` のマークアップを `<Header />' に置き換えます。

```jsx:title=src/pages/about.js
import React from "react"
import Header from "../components/header" // highlight-line

export default () => (
  <div style={{ color: `teal` }}>
    <Header /> {/* highlight-line */}
    <p>Such wow. Very React.</p>
  </div>
)
```

![Header コンポーネントの追加](06-header-component.png)

ブラウザーでは、"About Gatsby" となっていたヘッダーテキストが "This is a header" に置き換えられます。ただし、"About" ページでは、"This is a header" と表示するのではなく、"About Gatsby" と表示したいことでしょう。

4. `src/components/header.js` に戻り、次の変更を行います。

```jsx:title=src/components/header.js
import React from "react"

export default props => <h1>{props.headerText}</h1> {/* highlight-line */}
```

5. `src/pages/about.js` に戻り、次の変更を行います。

```jsx:title=src/pages/about.js
import React from "react"
import Header from "../components/header"

export default () => (
  <div style={{ color: `teal` }}>
    <Header headerText="About Gatsby" /> {/* highlight-line */}
    <p>Such wow. Very React.</p>
  </div>
)
```

![Header にデータを渡す](07-pass-data-header.png)

また、ヘッダーテキストに "About Gatsby" が表示されました！

### "props" とは何ですか？

先ほど、UI を描写する再利用可能なコードとして React コンポーネントを定義しました。これらの再利用可能な部品を動的にするには、それらに異なるデータを与えられるようにする必要があります。"props" と呼ばれる入力でそれを行います。Props は、React コンポーネントにプロパティを与えるためのものです。

`about.js` では、インポートした `Header` サブコンポーネントに `"About Gatsby"` の値を持つ `headerText` 属性を渡しました。

```jsx:title=src/pages/about.js
<Header headerText="About Gatsby" />
```

`header.js` で、Header コンポーネントは `headerText` 属性を受け取ることを期待しています（それを期待するように記述しているので）。そのため、次のようにアクセスできます。

```jsx:title=src/components/header.js
<h1>{props.headerText}</h1>
```

> 💡 JSX では、`{}`で囲むことでどのような JavaScript の構文も埋めこむことができます。これにより "props" オブジェクトから `headerText` 属性にアクセスすることができるようになります。

`<Header />` コンポーネントに別の属性を渡した場合、以下のようになります。

```jsx:title=src/pages/about.js
<Header headerText="About Gatsby" arbitraryPhrase="is arbitrary" />
```

`arbitraryPhrase` 属性には `{props.arbitraryPhrase}` でアクセスできます。

6. これまで述べてきたことにより、コンポーネントが再利用可能になることを強調するにため、追加の `<Header />` コンポーネントを about ページに追加し、次のコードを `src/pages/about.js` ファイルに追加して保存します。

```jsx:title=src/pages/about.js
import React from "react"
import Header from "../components/header"

export default () => (
  <div style={{ color: `teal` }}>
    <Header headerText="About Gatsby" />
    <Header headerText="It's pretty cool" /> {/* highlight-line */}
    <p>Such wow. Very React.</p>
  </div>
)
```

![再利用性を示すために Header を複製](08-duplicate-header.png)

props を使用して異なるデータを渡すことで、コードを一切書き換えることなく、2 番目のヘッダーを得ることができました。

### レイアウトコンポーネントの使用

レイアウトコンポーネントは、サイト内で複数のページで共有するためのセクションです。たとえば、Gatsby サイトには通常、共有ヘッダーとフッターを持つレイアウトコンポーネントがあります。その他、一般的にレイアウトへ追加するものとして、サイドバーやナビゲーションメニューがあります。

[**パート 3**](/tutorial/part-three/) でレイアウトコンポーネントについて詳しく掘り下げます。

## ページ間のリンク

多くの場合、ページ間をリンクする必要があります。Gatsby サイトでのルーティングを見てみましょう。

### ✋ `<Link />` コンポーネントの使用

1. インデックスページコンポーネント（`src/pages/index.js`)を開き、Gatsby の `<Link />` コンポーネントをインポートし、ヘッダーの上に追加し、パス名として `"/contact/"` の値を持つ `to` 属性を指定します。

```jsx:title=src/pages/index.js
import React from "react"
import { Link } from "gatsby" // highlight-line
import Header from "../components/header"

export default () => (
  <div style={{ color: `purple` }}>
    <Link to="/contact/">Contact</Link> {/* highlight-line */}
    <Header headerText="Hello Gatsby!" />
    <p>What a world.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
)
```

ホームページで新しく追加した "Contact" リンクをクリックすると、次が表示されるはずです。

![Gatsby dev 404 page](09-dev-404.png)

Gatsby development 404 page。どうして？まだ存在しないページにリンクしようとしているからです。

2. ここで、新しく "Contact" ページ用に `src/pages/contact.js` としてページコンポーネントを作成し、ホームページにリンクする必要があります。

```jsx:title=src/pages/contact.js
import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ color: `teal` }}>
    <Link to="/">Home</Link>
    <Header headerText="Contact" />
    <p>Send us a message!</p>
  </div>
)
```

ファイルを保存すると、"Contact" ページを表示し、ホームページへのリンクをたどることができます。

<video controls="controls" loop="true">
  <source type="video/mp4" src="./10-linking-between-pages.mp4"></source>
  <p>ごめんなさい！あなたのブラウザはこのビデオをサポートしていません。</p>
</video>

Gatsby の `<Link />` コンポーネントは、サイト内のページ間をリンクするためのものです。Gatsby サイトで処理しない外部へのリンクは、通常の HTML の `<a>` タグを使用します。

## Gatsby サイトのデプロイ

Gatsby は**モダンなサイトジェネレーター**です。つまり、デプロイするためにセットアップするサーバーや複雑なデータベースは必要ありません。代わりに、Gatsby の `build` コマンドで、静的なサイトホスティングサービスにデプロイできるように、静的な HTML および JavaScript ファイルのディレクトリーを生成します。

もし Gatsby でつくったウェブサイトをはじめてデプロイするなら、[Surge](http://surge.sh/) を試してみてください。Surge は、Gatsby サイトをデプロイするための数ある「静的サイトホスティングサービス」の 1 つです。

以前 Surge をセットアップしたことがない場合は、新しいターミナルウィンドウを開いてコマンドラインツールをインストールします。

```shell
npm install --global surge

# 次に、アカウント（無料）を作成します
surge login
```

次に、ターミナルで次のコマンドをサイトのルート上で実行してサイトをビルドします（ヒント： このコマンドをサイトのルート、この場合は hello-world フォルダーで実行していることを確認してください。`gatsby develop` を実行するために使用したのと同じウィンドウで新しいタブを開くことによって行うことができます）。

```shell
gatsby build
```

ビルドには 15〜30 秒かかります。ビルドが終了したら、`gatsby build` コマンドでデプロイするための準備ができたばかりのファイルを見てみるのもいいでしょう。

サイトのルートに次のターミナルコマンドを入力して、生成されたファイルのリストを確認します。これにより、`public`ディレクトリーを確認できます。

```shell
ls public
```

最後に、生成したファイルを surge.sh に公開して、サイトをデプロイします。

```shell
surge public/
```

実行が終了すると、ターミナルに次のように表示されます。

![Surge を使用して Gatsby サイトを公開したスクリーンショット](surge-deployment.png)

一番下の行にリストしている Web アドレス（この場合 `lowly-pain.surge.sh`)を開いて、新しく公開したサイトを見ることができます！すばらしい！

## ➡️ 次は？

このセクションでは次の事を学びました。

- Gatsby スターターと、それらを使用して新しいプロジェクトを作成する方法
- JSX 構文について
- コンポーネントについて
- Gatsby ページのコンポーネントとサブコンポーネントについて
- React の "props" と React コンポーネントの再利用について

それでは、[**サイトにスタイルを追加**](/tutorial/part-two/)へ進みましょう！
