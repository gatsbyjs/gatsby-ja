---
title: テーマ構成
---

テーマを構築するとき、テーマが他の人とどのように構成できるかを考慮することはしばしば価値があります。
場合によっては、 `gatsby-theme-blog` や `gatsby-theme-ecommerce` のように、テーマをモジュラーパーツに分割できます。

テーマはまだ初期段階なので、よりモノリシックなテーマを作成することから始めることをお勧めします。
開始するのにかかるオーバーヘッドは小さく、テーマは後からいつでも小さなテーマに分割できます。

## レイアウト

Gatsby テーマでは、 [`wrapRootElement`](/docs/browser-apis/#wrapRootElement) または [`wrapPageElement`](/docs/browser-apis/#wrapPageElement) を使用してグローバルレイアウトを適用できます。
テーマの構成を改善するには、この機能を控えめに使用することをお勧めします。
必要な [React Context](https://reactjs.org/docs/context.html) プロバイダーをセットアップするのに最適です。
また、通常、ヘッダーやフッターなどのレイアウトコンポーネントは追加しないでください。グローバルに適用されるため他のテーマで問題を引き起こす可能性があります。

[レイアウトと Gatsby テーマの詳細](https://www.christopherbiscardi.com/post/layouts-in-gatsby-themes)
