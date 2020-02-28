---
title: 検索機能の追加
overview: true
---

このセクションにおけるガイドの一覧を以下でお読みいただくか、あなたのサイトに検索機能を追加する方法の概要を引き続きお読みください。

<GuideList slug={props.slug} />

## サイト検索の概要

あなたの Gatsby サイトに検索機能を追加する手順を実行する前に、ウェブサイトに検索機能を追加するために必要なコンポーネントを確認してください。

あなたの Gatsby ウェブサイトに検索機能を追加するためには 3 つのコンポーネントが必要です。

1.  インデックス
2.  エンジン
3.  UI

## サイト検索コンポーネント

### 検索インデックス

検索インデックスは検索しやすい形式で保存されたデータのコピーです。インデックスは検索クエリを実行する際の速度とパフォーマンスを最適化するためのものです。インデックスがなければ、すべての検索はあなたのサイト内のすべてのページをスキャンする必要があり、すぐに非効率になります。

### 検索エンジン

検索エンジンは検索クエリを取得した後、検索インデックスを介して実行し、一致するドキュメントを返します。

### 検索 UI

UI コンポーネントは、検索クエリの作成と各クエリの結果を表示するためのインターフェイスをユーザーに提供します。

## サイトに検索機能を追加

3 つの必須コンポーネントがわかったので、あなたの Gatsby を使用したサイトに検索機能を追加する方法をいくつか紹介します。

### オープンソースの検索エンジンの使用

オープンソースの検索エンジンの使用は常に無料で、あなたのサイトのオフライン検索を有効にできます。オフライン検索は検索インデックス全体をクライアントに取り込む必要があるため、バンドルサイズに大きな影響を与える可能性があることに注意する必要があります。

[`elasticlunr`](https://www.npmjs.com/package/elasticlunr)、[`flexsearch`](https://github.com/nextapps-de/flexsearch)もしくは[`js-search`](https://github.com/bvaughn/js-search)のようなオープンソースライブラリーがあなたのサイトの検索機能を有効化するために使用できます。

そのためには、あなたのサイトの構築時に検索インデックスを作成する必要があります。[`elasticlunr`](https://www.npmjs.com/package/elasticlunr)には、検索インデックスを自動的に作成する[`gatsby-plugin-elasticlunr-search`](https://github.com/gatsby-contrib/gatsby-plugin-elasticlunr-search)というプラグインがあります。[`flexsearch`](https://github.com/nextapps-de/flexsearch)には、[`gatsby-plugin-flexsearch`](https://github.com/tmsss/gatsby-plugin-flexsearch)というプラグインがあります。

他のライブラリーについては、Gatsby Node API の[`onCreateNode`](/docs/node-apis/#onCreateNode)、[`setFieldsOnGraphQLNodeType`](/docs/node-apis/#setFieldsOnGraphQLNodeType)、および[`sourceNodes`](/docs/node-apis/#sourceNodes)の組み合わせを使用して、検索インデックスを作成し、GraphQL で使用できるようにします。これを行う方法の詳細については、[`gatsby-plugin-elasticlunr-search`のソースコード](https://github.com/gatsby-contrib/gatsby-plugin-elasticlunr-search/blob/master/src/gatsby-node.js#L96-L131)をご覧ください。

他の選択肢は[`onPostBuild`](/docs/node-apis/#onPostBuild) Node API を使用して、ビルドの最後に検索インデックスを生成することです。このアプローチは[`gatsby-plugin-lunr`](https://github.com/humanseelabs/gatsby-plugin-lunr)において使用されており、多言語インデックスを構築します。

検索インデックスを作成して Gatsby のデータレイヤーに含めた後、ユーザーがあなたのウェブサイトを検索できるようにする必要があります。これは通常、テキスト入力を使用して検索クエリを捕捉し、上記のライブラリーのいずれかを使用して目的のドキュメントを取得することによって行われます。

### API ベースの検索エンジンの使用

別の選択肢は外部の検索エンジンを使用することです。このソリューションは、あなたのサイトの訪問者がサイトを検索するために検索インデックス全体（あなたのサイトの成長に応じて非常に大きくなります）をダウンロードする必要がないため、はるかにスケーラブルです。トレードオフは、検索エンジンのホスティング費用または商用検索サービスの費用を支払う必要があることです。

自らホストできるオープンソースを利用するか、商用のホストを利用できます。

- [ElasticSearch](https://www.elastic.co/products/elasticsearch) — OSS および商用ホスティングが利用可能
- [Solr](http://lucene.apache.org/solr/) — OSS および商用ホスティングが利用可能
- [Algolia](https://www.algolia.com/) — 商用

あなたがドキュメントサイトを構築する場合は、[Algolia の DocSearch 機能](https://community.algolia.com/docsearch/)を使用できます。ページのコンテンツから検索インデックスが自動的に作成されます。

あなたのウェブサイトがドキュメントサイトではない場合、ビルド時に検索インデックスを収集し、[`gatsby-plugin-algolia`](https://github.com/algolia/gatsby-plugin-algolia)を使用してアップロードする必要があります。

Algolia を使用する場合、Algolia は検索インデックスと検索エンジンをホストします。検索クエリがサーバーに送信され、何らかの結果が返されます。あなたは独自の UI を実装する必要があります。Algolia が提供する[React ライブラリー](https://github.com/algolia/react-instantsearch)の中に、あなたの使用したいコンポーネントがあるかもしれません。

Elasticsearch には、検索用のいくつかの React コンポーネントライブラリーがあります。例： https://github.com/appbaseio/reactivesearch
