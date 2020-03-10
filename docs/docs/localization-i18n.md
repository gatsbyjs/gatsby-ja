---
title: Gatsby のローカライゼーションと国際化対応（i18n）
---

言語と文化に合わせてユーザーコンテンツを提供することは、優れたユーザーエクスペリエンスのための 1 つの手段です。Web コンテンツをユーザーのロケーションに合わせる努力をするとき、それを実践することを国際化対応（i18n）と呼びます。

実際に、i18n ではユーザーのいるロケーションに基づき、テキストを変換したり、日付や数値、文字列をフォーマットしたりすることが含まれます。たとえば、米国のユーザーに表示する日付は mm/dd/year の日付フォーマットに従いますが、英国のユーザーの日付形式は dd/mm/year に変更されます。

このガイドでは、国際化対応のために Gatsby プロジェクトを強化するオプションについて簡単に説明します。

## パッケージの選択

React には i18n 用パッケージがいくつかあります。そのオプションとして、[react-intl](https://github.com/yahoo/react-intl)、コミュニティーの作成した [Gatsby plugin](https://www.npmjs.com/package/gatsby-plugin-i18n) および [react-i18next](https://github.com/i18next/react-i18next/) があります。パッケージを選択するにあたり、考慮すべき要点がいくつかあります：別のプロジェクトで同様のパッケージをすでに使用したことがありますか？パッケージはユーザーのニーズをどの程度満たしますか？あなたもしくはあなたのチームは、すでに特定のパッケージに精通していますか？そのパッケージは適切にドキュメント化され、メンテナンスされていますか？

### gatsby-plugin-i18n

このプラグインは、Gatsby で `react-intl`、`i18next`、または他の i18n ライブラリーを使用する際に役立ちます。このプラグインはコンテンツを翻訳したりフォーマットしたりするのではなく、各言語へのルーティングを作成し、Google がサイトの正しいバージョンをより簡単に見つけられるようにし、必要に応じて、代わりとなる UI レイアウトを指定します。

命名フォーマットは、ファイルの場合は .**languageKey**.js、URL の場合は /**languageKey**/path/fileName に従います。

**例：**

File - src/pages/about.**en**.js

URL - /**en**/about

[gatsby-plugin-i18n の GitHub](https://github.com/angeloocana/gatsby-plugin-i18n)

### react-intl

React-intl は i18n 用ライブラリーの FormatJS セットの 1 つであり、150 以上の言語のサポートを提供します。JavaScript の [Internationalization API](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl) をもとに構築されており、強化された API とコンポーネントを提供します。React-intl は、React context と HOC（高階コンポーネント）を使用して翻訳機能を提供し、必要に応じて言語モジュールを動的にロードできるようにします。また、基本的な JavaScript i18n API をサポートしていない古いブラウザーで使用可能なポリフィルのオプションもあります。

react-intl の [APIs](https://github.com/formatjs/react-intl/blob/master/docs/API.md) および、[デモ](https://github.com/formatjs/react-intl/tree/master/examples)を含む[コンポーネント](https://github.com/formatjs/react-intl/blob/master/docs/Components.md)に関するより詳細な情報は、[ドキュメント](https://github.com/formatjs/react-intl/tree/master/docs)から入手できます。

### react-i18next

React-i18next は、i18next フレームワーク上に構築された i18n 用ライブラリーです。このライブラリーでは、翻訳内容をただしくレンダリングするために、もしくはユーザーが使用言語を変更したときにコンテンツを再レンダリングするためにコンポーネントを使用します。

React-i18next は、さまざまなプラグイン、ユーティリティー、設定を備えており、他のライブラリーよりも拡張性があります。共通プラグインを使用すると、ユーザーの言語を検出したり、ローカルキャッシュの追加レイヤーを追加したりできます。その他のオプションには、キャッシュ、サーバーから翻訳内容をロードするバックエンドプラグイン、または Webpack を使った翻訳内容のバンドルなどがあります。

このフレームワークには、React Suspense API および React Hook に対する実験的なサポートもあります。

## その他の参考資料

- [Gatsby で国際化対応を行う](https://www.gatsbyjs.org/blog/2017-10-17-building-i18n-with-gatsby/)

- [GatsbyJS + Contentful で Eviction Free NYC を作成](https://www.gatsbyjs.org/blog/2018-04-27-building-eviction-free-nyc-with-gatsbyjs-and-contentful/)

- [Gatsby i18n パッケージ](https://www.gatsbyjs.org/packages/gatsby-plugin-i18n/?=i18)

- [Gatsby i18n に関する記事](https://www.gatsbyjs.org/blog/tags/i-18-n/)
- [W3C の i18n 参考資料](http://w3c.github.io/i18n-drafts/getting-started/contentdev.en#reference)
