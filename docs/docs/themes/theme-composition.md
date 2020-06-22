---
title: テーマ構成
---

テーマを作成する際、あなたのテーマがどのように他のテーマと構成されるのかを検討するのは一考に値します。
場合によっては `gatsby-theme-blog` や `gatsby-theme-ecommerce` のように、テーマをモジュール化したいこともあるでしょう。

テーマはまだ始まったばかりですので、分割数の少ないモノリシックなテーマの構築からスタートすることをおすすめします。始めるハードルも低いですし、後からでもテーマをより小さいテーマ群に分割できます。

## レイアウト

Gatsby テーマでは、[`wrapRootElement`](/docs/browser-apis/#wrapRootElement)もしくは [`wrapPageElement`](/docs/browser-apis/#wrapPageElement) を利用することでグローバルレイアウトに適用できます。より良いテーマ構成のためにはこの機能の利用を控えめにすることをおすすめします。必要となるあらゆる [React Context](https://reactjs.org/docs/context.html) プロバイダーの設定に最適でしょう。ヘッダーやフッターといったレイアウトコンポーネントは通常追加しない方が良いです。なぜならグローバルに適用され、他のテーマとの間に問題を引き起こす恐れがあるからです。

[レイアウトや Gatsby テーマについてもっと読む](https://www.christopherbiscardi.com/post/layouts-in-gatsby-themes)
