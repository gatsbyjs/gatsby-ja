---
title: GatsbyにおけるSEO
---

Gatsby は、検索エンジンでの表示順位やパフォーマンスの向上に役立ちます。Gatsby を使用するとサイトが高速かつ効率的になります。Googlebot などの検索エンジンのクローラーがサイトをクロールしてページをインデックスしてくれるためです。いくつかの機能は設定が必要ですが、サイトの表示速度アップなどは設定なしでそのまま利用できます。

## サーバーレンダリング

Gatsby ページはサーバー側でレンダリングされるため、Googlebot やその他の検索エンジンクローラーはすべてのページコンテンツを解釈できます。
ブラウザーであなたのサイトを開き、`右クリック => ページのソースを表示`を選択することで、ページ全体の HTML ドキュメントを確認できます。

もし[`gatsby-plugin-offline`](/packages/gatsby-plugin-offline/)をインストールしている場合は、一部の HTML のみが表示され、期待したような HTML ドキュメントとならないかもしれません。 `gatsby-plugin-offline` を使用すると、ネットワーク帯域の消費を抑え、ユーザーに不要なデータをダウンロードさせないようにします。そのため、一部の HTML ドキュメントのみが表示されるのです。`gatsby-plugin-offline` は、2 ページ目以降のロード時にのみ機能します。Google などの検索エンジンに対しては常にページ全体の HTML ドキュメントを返します。検索エンジンは、サンドボックスモードという、常に 1 ページ目の訪問となるようなモードでページを巡回しているためです。

サイトの管理者として、`gatsby-plugin-offline` を使用している場合にどのように自分のサイトをテストすれば良いのでしょうか？ターミナルを利用して、自分のサイトを確認するのがベストでしょう。次のコマンドで、自分のサイトをクロールできます。

**Windows の場合 (powershell を使用します）:**

```shell
Invoke-WebRequest https://www.gatsbyjs.org/docs/seo | Select -ExpandProperty Content
```

**Mac OS または Linux の場合：**

```shell
curl https://www.gatsbyjs.org/docs/seo
```

## スピードの向上

静的ファイルへのレンダリング、プログレッシブ画像の読み込み、[PRPL pattern](/docs/prpl-pattern/)など、Gatsby には標準で数多くのパフォーマンス最適化の仕組みが取り入れられています。これらの仕組みにより、Gatsby を使うだけでサイトを高速化できます。

2018 年 7 月、「Speed Update」とよばれるアルゴリズムについて、[Google はサイトの表示速度について新しいランキングの考え方を発表しました](https://webmaster-ja.googleblog.com/2018/01/using-page-speed-in-mobile-search.html) 。 これにより、ローディングが速いページを上位にランク付けする可能性があります。しかし、検索クエリの目的は依然として非常に関連性が高く、コンテンツの関連性が高い場合は低速ページでも上位にランク付けされることがあります。

## ページのメタデータ

サイトにページタイトル、メタ説明、代替テキスト、JSON-LD を使用した構造化データなどのメタデータを追加すると、検索結果にあなたのページを表示する際に、検索エンジンがよりあなたのページのコンテンツを理解しやすくなります。

ページにメタデータを追加する一般的な方法は、あなたのページに[react-helmet]（https://github.com/nfl/react-helmet）コンポーネントを追加することです（SSR をサポートするために[Gatsby React Helmet プラグイン](/packages/gatsby-plugin-react-helmet)と一緒に利用できます）。あなたの Gatsby のアプリケーションに SEO 用のコンポーネントを追加する方法は[こちら](https://www.gatsbyjs.org/docs/add-seo-component/)です。

React-helmet を使用した例：

- [GatsbyJS.org 公式](https://github.com/gatsbyjs/gatsby/blob/87ad6e81b9bd78b25d089434600750f5903baaee/www/src/components/package-readme.js#L16-L25)
- [GatsbyJS 公式 デフォルトスターター](https://github.com/gatsbyjs/gatsby/blob/776dc1d6fe8d5ce7b5ea6d884736bb3c76280975/starters/default/src/components/seo.js)
- [Gatsby Mail](https://github.com/DSchau/gatsby-mail/blob/89b467e5654619ffe3073133ef0ae48b4d7502e3/src/components/meta.js)
- [Jason Lengstorf 氏のブログ](https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/e6d25ca927afdc75c759e611d4ba6ba086452bb8/src/components/SEO/SEO.js)

## 構造化データを使用して検索エンジンでリッチスニペットを生成する

Google は、あらゆる Web や世界中の情報を収集するのはもちろん、ページのコンテンツを理解するために、Web 上で見つけた構造化データを使用しています。

たとえば、以下は[JSON-LD 形式](https://developers.google.com/search/docs/guides/intro-structured-data)（リンクデータの JavaScript オブジェクト表記）の構造化データスニペットです。 Spooky Technologies という会社の連絡先ページに、連絡先情報が記載されています。

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "http://www.spookytech.com",
    "name": "Spooky technologies",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+5-601-785-8543",
      "contactType": "Customer Support"
    }
  }
</script>
```

構造化データを使用する場合、開発中にテストする必要があります。Google の[構造化データテストツール]（https://search.google.com/structured-data/testing-tool）は、Googleが推奨する方法の1つです。

デプロイ後に[リッチリザルトのステータス レポート](https://support.google.com/webmasters/answer/7552505?hl=ja)を確認することで、ページの状態を監視しやすくなり、テンプレートエンジンや配信で発生している問題を解消しやすくなります。

## その他の資料

より詳しく知りたい場合は、[Gatsby における SEO についての記事](/blog/tags/seo/)をご覧ください。
