---
title: ページのメタデータを追加する
---

[Lighthouse による評価](/docs/audit-with-lighthouse/) を実施したときに、SEO カテゴリのスコアが良くないことに気づいたかもしれません。ここではスコアを上げる方法について紹介します。

ページにメタデータ（タイトルや説明など）を追加することは、Google などの検索エンジンにコンテンツを理解させ、検索結果で上位表示をするために重要です。

[React Helmet](https://github.com/nfl/react-helmet) は、[ドキュメントヘッド](https://developer.mozilla.org/ja-JP/docs/Web/HTML/Element/head)を管理するための React コンポーネントインターフェイスを提供するパッケージです。

Gatsby の [React Helmet プラグイン](/packages/gatsby-plugin-react-helmet/)は、React Helmet で追加されたサーバーレンダリングデータのドロップインサポートを提供します。プラグインを使用すると、React Helmet に追加した属性が Gatsby がビルドする静的 HTML ページに追加されます。

## `React Helmet` と `gatsby-plugin-react-helmet` を使用する

1. 両方のパッケージをインストールします。

```shell
npm install --save gatsby-plugin-react-helmet react-helmet
```

2. プラグインを `gatsby-config.js` ファイルの `plugins` 配列に追加します。

```javascript:title=gatsby-config.js
{
  plugins: [`gatsby-plugin-react-helmet`]
}
```

3. ページ内に `React Helmet` を追加します。

```jsx
import React from "react"
import { Helmet } from "react-helmet"

class Application extends React.Component {
  render() {
    return (
      <div className="application">
        {/* highlight-start */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {/* highlight-end */}
      </div>
    )
  }
}
```

> 💡 上の例は [React Helmet ドキュメント](https://github.com/nfl/react-helmet#example) からのものです。詳細をご覧ください！

また、[SEO コンポーネントを追加](/docs/add-seo-component/) も参考になるでしょう。
