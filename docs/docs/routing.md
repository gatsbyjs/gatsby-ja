---
title: ルーティング
---

Gatsby を使用しているサイトが非常に高速である理由の 1 つに、ビルド時に多くの処理を行うためサイトのほとんどが[静的なコンテンツ](/docs/adding-app-and-website-functionality/#static-pages)として実行されることが挙げられます。ビルド時に Gatsby は[ルーティング](/docs/glossary#routing)処理し、コンテンツへのパスを生成します。 Gatsby を使ったナビゲーションをするためには、パスとは何かということと、パスがどのように生成されるのかについて理解する必要があります。

場合によっては Gatsby で作ったサイトが、ビルド時またはリハイドレーション時に処理できない機能（認証や動的なコンテンツなど）を持つかもしれません。そのようなページを処理するためには Gatsby に組み込まれている [`@reach/router`](/docs/reach-router-and-gatsby/) を使用した [クライアントサイドルーティング](/docs/client-only-routes-and-user-authentication) を利用できます。

## ルートの作成

Gatsby はプログラムによるページの管理を簡単にします。ページは 3 つの方法で作成できます：

- `gatsby-node.js` ファイルに [`createPages`](/docs/node-apis/#createPages) を実装することでページを作成できます。
- Gatsby は `src/pages` ディレクトリーにある React コンポーネントを自動でページに変換します。
- プラグインでも `createPages` を実装することでページを作成できます。

詳細は[ページの作成と編集](/docs/creating-and-modifying-pages)をご覧ください。

Gatsby がページを生成したとき、そのページにアクセスするためのパスも自動で生成されます。生成されるパスはページがどのように定義されたかによって異なります。

### `src/pages` ディレクトリーによるページの作成

`src/pages` ディレクトリーに `.js` ファイルを置くことで Gatsby サイト内にページが生成されます。生成されるページのパスは `.js` ファイルがあるディレクトリー構造と一致します。

例えば `contact.js` は `yoursite.com/contact` からアクセスできます。また `home.js` は `yoursite.com/home` からアクセスできます。これはファイルがどの階層に作成されていても成立します。もし `contact.js` を `src/pages` 内の `information` ディレクトリーへ移動させた場合、今度は `yoursite.com/information/contact` からページにアクセスできます。

このルールは `index.js` という名前のファイルには当てはまりません。この名前がつけられたファイルは、ファイルが存在する場所のルートディレクトリーと一致します。つまり `src/pages` 直下にある `index.js` には `yoursite.com` からアクセスできます。もしも `index.js` が `information` ディレクトリー内にある場合は `yoursite.com/information` からアクセスできます。

`index.js` が存在せず、ルートページが設定されていないディレクトリーの場合、ルートのパスにアクセスすると [404 ページ](/docs/add-404-page/) が表示されることに注意してください。つまり `yoursite.com/information/contact` にアクセスできても `yoursite.com/information` にアクセスできる保証はありません。

### `createPage` によるページの作成

ページを作成するもう 1 つの方法は `gatsby-node.js` ファイルの中で `createPage` 関数を使用することです。この方法でページを定義するときは、パスを明示的に設定します。サンプルコード：

```js:title=gatsby-node.js
createPage({
  path: "/routing",
  component: routing,
  context: {},
})
```

詳細は [`createPage` の API ドキュメント](/docs/actions/#createPage) をご覧ください。

## ルートの重複

Gatsby にはページの作成方法が複数あるため、プラグイン、テーマ、 `gatsby-node` ファイル内のルート定義が、誤って同じパスのページを作成してしまう恐れがあります。ルートの重複が発生すると Gatsby はビルド時に警告を表示しますが、ビルドは正常に完了します。この状態では、最後にビルドされたページのみがアクセス可能となり、ルートが重複したその他のページにはアクセスできません。重複しているパスをページごとに固有の URL となるよう変更することで、この問題を解決できます。

## ネストされたルート

`/portfolio/art/item1` のように複数階層にわたるパスを定義したいときは[ルートの作成](#creating-routes)で説明されている通り、`src/pages` ディレクトリーの構造をそのままパスに反映させることができます。

また URL のパスに応じて表示するコンポーネントが異なるページを作成したいとき（ページ固有のサイドバーを表示したい場合など）、[レイアウト](/docs/layout-components/) を使うことでページ単位の表示の切り替えができます。

## ルート間のリンク

ルート同士をリンクするために [`gatsby-link`](/docs/gatsby-link/) を使用できます。 `gatsby-link` を使うことで Gatsby による[パフォーマンス向上](#performance-and-prefetching)のメリットを得られます。

一般的な `<a>` タグを使ったナビゲーションも可能ですが、その場合はプリフェッチによるパフォーマンス向上は見込めません。

## 認証つきリンクの作成

機密情報を扱う場合や、その他の動的な処理が必要なページに対して、サーバサイドでの処理を行いたいと思うかもしれません。 Gatsby では認証を必須とする [クライアントサイドルート](/docs/client-only-routes-and-user-authentication) の作成が可能で、認証されたユーザーのみが情報にアクセスできるよう制限できます。

## パフォーマンスとプリフェッチ

パフォーマンス向上のため Gatsby は表示されたページからプリフェッチ対象となるリンクを探し出します。ユーザーがリンクをクリックする前に Gatsby はリンク先のページの取得を行っています。詳細は[プリフェッチ](/docs/how-code-splitting-works/#prefetching-chunks)をご覧ください。

<GuideList slug={props.slug} />
