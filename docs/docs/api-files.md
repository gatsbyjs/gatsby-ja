---
title: APIファイル
---

Gatsby は、プロジェクトのルート下にある 4 つのファイルを使用して、サイトを構成し、その動作を制御します。これらのファイルはすべて無くても構いません。

- [gatsby-config.js](/docs/api-files-gatsby-config) - プラグインの有効化、一般的なサイトデータの定義、 Gatsby の GraphQL データレイヤーに関する他のサイト構成を含みます。
- [gatsby-browser.js](/docs/api-files-gatsby-browser) - ブラウザーでの Gatsby の動作を制御できます。 たとえば、ユーザーがルートを変更したタイミングで割り込んだり、ユーザーが最初にページを開いたときに関数を呼びだすことができます。
- [gatsby-node.js](/docs/api-files-gatsby-node) - Gatsby ビルドサイクルのイベントに反応した処理が書けます。 たとえば、動的なページの追加、作成時に GraphQL ノードを編集、ビルドが完了した後にアクションを実行したりできます。
- [gatsby-ssr.js](/docs/api-files-gatsby-ssr) - Gatsby のサーバーサイドレンダリングプロセスを公開し、 HTML ページの作成方法を制御できるようにします。
