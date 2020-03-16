---
title: html.js をカスタマイズする
---

Gatsby は React コンポーネントを利用して、コア Gatsby アプリケーションの外部で HTML の `<head>` およびその他のパーツをサーバーレンダリングします。

ほとんどのサイトでは Gatsby に同梱されているデフォルトの `html.js` を利用するべきです。しかしサイトの html.js をカスタマイズする必要がある場合には、デフォルトのものをソースツリーにコピーします。

```shell
cp .cache/default-html.js src/html.js
```

そして、必要に応じて変更を加えます。

もしサイト各ページの `<head>` または `<footer>` にカスタム html を挿入する必要がある場合は、`html.js` が利用できます。

> `html.js` のカスタマイズは、`gatsby-ssr.js` で適切な API を利用できない場合の回避策です。上記方法の代わりに [`onRenderBody`](/docs/ssr-apis/#onRenderBody) または [`onPreRenderHTML`](/docs/ssr-apis/#onPreRenderHTML) の利用も検討してください。
> さらなる考慮事項として、Gatsby テーマ内での `html.js` のカスタマイズはサポートされていません。先述の API メソッドを利用してください。

## 必須のプロップス

ヒント： 例えば `headComponents` や `preBodyComponents`、`body`、`postBodyComponents` _など_、ページにレンダリングされる様々なプロップスが必要です。

## `<head>` に html を挿入する

`html.js` コンポーネントでレンダリングしたものは、他のコンポーネントのようにクライアントで動的に更新されることは*ありません*。もし `<head>` を動的に更新したいときは、[React Helmet](/packages/gatsby-plugin-react-helmet/)の利用を推奨します。

## `<footer>` に html を挿入する

もしカスタム html をフッターに挿入したいときは、html.js の利用を推奨します。独自のプラグインを作成している場合は、[Gatsby SSR API](/docs/ssr-apis/) の `setPostBodyComponents` プロップの利用を検討してください。

## ターゲットコンテナ

エラー： `Uncaught Error: _registerComponent(...): Target container is not a DOM element.` が表示される場合、`html.js` に必要な "ターゲットコンテナ" が存在しないことを意味します。`<body>` 内に以下のような `___gatsby` の id を持つ div を必要とします。

```jsx:title=src/html.js
<div
  key={`body`}
  id="___gatsby"
  dangerouslySetInnerHTML={{ __html: this.props.body }}
/>
```

## カスタム JavaScript の追加

React の [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) 属性を利用して、HTML ドキュメントにカスタム JavaScript を追加できます。

```jsx:title=src/html.js
<script
  dangerouslySetInnerHTML={{
    __html: `
            var name = 'world';
            console.log('Hello ' + name);
        `,
  }}
/>
```
