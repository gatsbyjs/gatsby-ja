---
title: Themes API リファレンス
---

## コアとなる Gatsby の API

テーマとは、プラグインとして公開されているパッケージ化された Gatsby サイトのことです。デフォルトの設定や機能を編集するための Gatsby の全ての API を使うことができます。

- [Gatsby Config](https://www.gatsbyjs.org/docs/gatsby-config/)
- [Actions](https://www.gatsbyjs.org/docs/actions/)
- [Node Interface](https://www.gatsbyjs.org/docs/node-interface/)
- ... [もっと知りたい方向け](https://www.gatsbyjs.org/docs/api-specification/)

Gatsby が初めての方は、サイトを構築するためのガイドから始めてみてください。テーマはもともと含まれている Gatsby のサイトなので、一度作ったサイトをテーマに変換することは後で容易にできます。

## 設定

プラグインは、他の `gatsby-*` の形式で命名されたファイルなどと一緒に `gatsby-config` を含むことができるようになりました。通常、`gatsby-config.js` を含むプラグインのことをテーマと呼びます（もっと知りたい方は[theme composition](#theme-composition)`gatsby-config.js`をご覧ください）。典型的なユーザーサイトの `gatsby-config.js` の中身は次のようになります。 ここで、`gatsby-theme-name` には、2 つのオプション `postsPath` と `colors` が渡されています。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme-name",
      options: {
        postsPath: "/blog",
        colors: {
          primary: "tomato",
        },
      },
    },
  ],
}
```

`gatsby-config` では、テーマへ渡されるオプションにアクセスできます。オプションを使うことで、ファイルシステムのソース管理を設定できるようになったり、異なる nav manu を使えるようになったり、ブランドカラーをデフォルトから変更したり、とにかくしたいと思うものなら何でも設定を変えられるようにできます。

あなたのテーマを使うユーザーが、テーマの設定を変更するためのオプションを渡せるように、テーマの `gatsby-config.js` で関数を返すようにしてください。関数の引数は、ユーザーが指定するオプションです。

```js:title=gatsby-config.js
module.exports = themeOptions => {
  console.log(themeOptions)
  // `postsPath` と `colors` を標準出力します

  return {
    plugins: [
      // ...
    ],
  }
}
```

もしあなたのテーマで、よくあるオブジェクトのエクスポート（`module.exports = {}`）を使っているときは、そのテーマをスタンドアローンで動作させることができます。 Yarn ワークスペースでそれをどのように実現するのか知りたい方は、[theme authoring starter](https://github.com/gatsbyjs/gatsby-starter-theme-workspace)をご覧ください。

### 他の場所でオプションにアクセスする方法

テーマはあくまでプラグインなので、これまで使ってきたライフサイクルに関する全てのメソッドのオプションを利用できます。例えば、テーマの `gatsby-node.js` で、`createPages` の第 2 引数としてオプションを利用できます。

```js:title=gatsby-node.js
exports.createPages = async ({ graphql, actions }, themeOptions) => {
  console.log(themeOptions)
}
```

## シャドーイング

テーマは通常、他の人も利用可能なパッケージとしてデプロイされるため、テーマそれ自体のコードに変更を加えることなく、（React コンポーネントのような）特定のファイルを編集する方法が必要になるでしょう。これを実現するのが、_シャドーイング_という方法です。

シャドーイングとは、filesystem をベースとする API であり、これを使うことでビルド時に特定のファイルを置き換えることができます。例えば、`Header` コンポーネントを含むようなテーマがあるとします。 `Header` をあなた独自のものに置き換えるには、新しいファイルを作り、これを適切な場所に配置し、シャドーイング機能がそれを関知できるようにします。

### オーバーライド

`Header` の例に着目してみましょう。例えば、`gatsby-theme-amazing` というテーマを作ったとします。このテーマでは、ナビゲーションや他の諸々のアイテムを表示するために `Header` コンポーネントを利用します。 npm パッケージのルートからコンポーネントまでのパスは、`gatsby-theme-amazing/src/components/header.js` のようになります。

ときには `Header` コンポーネントに何か違うことをさせたいこともあるでしょう。例えば、色を変えたり、さらにナビゲーションアイテムを追加したりといったことです。これを実現するために、ウェブサイトの次のパスにファイルを作ります： `src/gatsby-theme-amazing/components/header.js` 。これで、どんな React コンポーネントもこのファイルからエクスポートでき、Gatsby はテーマのコンポーネントではなく、こちらのファイルを参照するようになります。

> 💡 ヒント: 他のテーマから同じメソッドを使うことで、コンポーネントをシャドーイングすることもできます。シャドーイングの高度な使い方については、[latent shadowing](https://johno.com/latent-component-shadowing)で紹介しています。

### 拡張

前のセクションでは、コンポーネントを全く新しく置き換える方法についてお話ししました。では、テーマ全体をコピー&ペーストすることなしに、ちょっとした変更を加えたいときにはどうすれば良いでしょうか。そんな時は、コンポーネントを拡張しましょう。

前に取り上げた `Header` コンポーネントの例を見てみましょう。シャドーイングしたファイルは、`src/gatsby-theme-amazing/components/header.js` にあります。ここで、独自にオーバーライドした prop をコンポーネントに付与することで、元のコンポーネントをインポートして再度エクスポートするなどといったことができます。

```js
import Header from "gatsby-theme-amazing/src/components/header"

// 以下の props は、もとのコンポーネントが受け取るものと同じです
export default props => <Header {...props} myProp="true" />
```

このアプローチをとるということはつまり、テーマをアップグレードしたくなったときに、`Header` コンポーネントに適用された全てのアップデートを活用できるということを意味します。なぜなら、`Header` コンポーネントを全て置き換えたわけでなく、インポートしたものを修正しただけだからです。

### ファイルをシャドーイングする際に使うべきパスは？

Gatsby がシャドーイング機能を全て自動でやってくれるようになるまでは、手動でテーマ内のパスを見つけて、サイト内に正しいシャドーイング用のパスを作成する必要があります。

幸いにも、これはそこまで手間ではありません。テーマ内にある、シャドーイングしたいファイルが `<theme-name>/src/<any-sub-dir>/<file>` のようなパスになっているとしたら、自分のサイトの `src` 直下で `<theme-name>/<any-sub-dir>/<file>` の形式でファイルを作ればよいのです。 `Header` の例で言えば、これはテーマにおけるコンポーネントへのパスのことです：

```text
gatsby-theme-amazing/src/components/header.js
```

そして、下記のパスがサイト内でシャドーイングする場所です：

```text
<your-site>/src/gatsby-theme-amazing/components/header.js
```

シャドーイングは `src` ディレクトリーの、インポートされたファイルにおいてのみ機能します。これは、シャドーイングが Webpack 上で構築されるため、モジュールグラフがシャドーイング可能なファイルを含める必要があるからです。

ひとつのサイトで複数のテーマを利用できるため、ファイルがシャドーイングされうる場所はたくさんあります（ひとつのファイルが複数のテーマに利用されたり、あるいはユーザーのサイトで利用されたりします）。複数のテーマが `gatsby-theme-amazing/src/components/header.js` をシャドーイングしようとするとき、プラグインの配列の最後のテーマが選ばれます。サイトそれ自体は、シャドーイングにおいてもっとも高い優先権を持ちます。

## テーマの構成

Gatsby のテーマは、水平的・垂直的に構成可能です。垂直的な構成とは、古典的な"parent/child"という形式の縦の関係を意味します。子テーマは、子テーマのプラグインの配列の中で親テーマを宣言します。

```js:title=gatsby-theme-child/gatsby-config.js
module.exports = {
  plugins: [`gatsby-theme-parent`],
}
```

水平的な構成とは、例えば `gatsby-theme-blog` と `gatsby-theme-notes` のような、2 つの異なるテーマが同時に使われるようなときのことを言います。

```js:title=my-site/gatsby-config.js
module.exports = {
  plugins: [`gatsby-theme-blog`, `gatsby-theme-notes`],
}
```

テーマとは、根本的には複数の `gatsby-config.js` ファイルを 1 つの設定ファイルにマージするアルゴリズムです。そしてマージされたファイルをもとに、サイトのビルドが行われます。これがただしく行われるように、2 つの `gatsby-config.js` をどのように組み合わせるのか定義する必要があります。その前に、"parent/chile" の階層関係を、1 次元の配列にしておきましょう。これによって、複数のシャドーイングされたファイルが利用可能なときに、どのファイルを優先的に参照するのかという順序を定義できます。

上で最初に示した例では、`['gatsby-theme-parent', 'gatsby-theme-child']` の順番で参照されます（親テーマは常に、その子テーマより先に参照されます。そうすることで、子テーマが機能をオーバーライドできます）。 2 つ目に示した例では、`['gatsby-theme-blog', 'gatsby-theme-notes']` の順になります。

一度このテーマの順序を定義したら、reduce 関数を使ってテーマをマージします。[reduce 関数](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/merge-gatsby-config.js)では、`gatsby-config.js` におけるそれぞれのキーをマージする方法が定義されています。この関数が呼び出された後に他の値を指定しない限り、キーの値は順番的に最後に指定したものが入ります。

- `siteMetadata` と `mapping` は lodash の `merge` 関数を使って深い階層までマージします。つまり、テーマはデフォルトの `siteMetadata` の値を定義可能であり、`gatsby-config.js` における一般的な `siteMetadata` オブジェクトでオーバーライドできます。
- `plugins` は、重複を取り除いて正規化されたあと、マージされます。
