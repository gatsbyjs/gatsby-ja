---
title: プラグインの作成
---

まだ存在しないプラグインをビルドして公開しようとしたり、Gatsby プラグインの構造（ファイル構造など）についてもっと知りたいということがあると思います。

## コアコンセプト

- 各 Gatsby プラグインは npm パッケージ、または[ローカルプラグイン](/docs/creating-a-local-plugin/)として作成できます。
- `package.json` が必要です。
- プラグインは[ノード](/docs/node-apis/)、[サーバーサイドレンダリング](/docs/ssr-apis/)、および[ブラウザ](/docs/browser-apis/)用の Gatsby API を実装します。

ドキュメントのこのセクションでは以下のガイドを含んでいます：

<GuideList slug={props.slug} />
