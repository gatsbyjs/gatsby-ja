---
title: WebpackとSSR
---

Bootstrap が完了しました！そしてディスクに[結果ページが書き込まれました](/docs/write-pages/)。次のステップでは、これらのページを HTML へレンダリングします。またページナビゲーションを即座に読み込むため、HTML が読み込まれたら引き継ぐ JavaScript ランタイムをビルドする必要があります。

ビルドの次のステージは、Webpack のコード最適化とコード分割に強く依存しています。まだ読んでいないのであれば、[Webpack のドキュメント](https://webpack.js.org/guides/)から Webpack がどのように動いているか学習すると良いでしょう。

## /.cache/

Webpack が必要とする全てのファイルは、`.cache`ディレクトリーの中にあります。このディレクトリーはプロジェクトの初期化時に空であり、安全に削除できます。Gatsby はビルドの過程でディレクトリーとそこに含まれるファイルを生成します。

Gatsby はビルドの開始時、[gatsby/cache-dir](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby/cache-dir)に含まれる[全てのファイルのコピー](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/bootstrap/index.js#L191)を、`.cache`ディレクトリーに生成します。この中には、次のセクションで説明する[static-entry.js](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/cache-dir/static-entry.js)や[production-app.js](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/cache-dir/production-app.js)といったものが含まれています。基本的に、Gatsby がブラウザーでの実行か HTML の生成に必要とするファイルは全て、`cache-dir`に含まれます。

Webpack が Redux を認識しないため、Bootstrap 中に構築された全てのページデータを含むファイルを生成する必要があります。そして、これらのファイルもすべて`.cache`に格納する必要があります。これは 1 つ前の[ページの書き出し](/docs/write-pages/)セクションで扱ったものです。
