---
title: プライベート API からデータを取得する
---

Gatsby は、ヘッドレス CMS、データベース、SaaS サービス、パブリック API、プライベート API からデータを取得できます。

Gatsby の視点からすると、パブリック API とプライベート API のどちらからの取得にも違いはありません。Gatsby がその API へアクセスできる事こそが重要です。

プライベート API からデータを取得するために使用できる 3 つの方法があります：

<<<<<<< HEAD
1. プライベート API が GraphQL API である場合、 [`gatsby-source-graphql`](/packages/gatsby-source-graphql/) が利用できます。
2. プライベート API が GraphQL API ではなく、また GraphQL を利用するのが初めてであれば、ガイド「[GraphQL 外から Gatsby を使用する](/docs/using-gatsby-without-graphql/)」で説明されているように、データを非構造化データとして扱い、ビルドする際に取得します。ただし、ガイドでも強調されているように、この方法にはいくつかのトレードオフが伴います。
3. チュートリアル「[ソースプラグインチュートリアル](/docs/pixabay-source-plugin-tutorial/)」にしたがって、ソースプラグインを作成します。
=======
1. If your private API is a GraphQL API, you can use [`gatsby-source-graphql`](/packages/gatsby-source-graphql/).
2. If your private API is not a GraphQL API and you are new to GraphQL, treat the data as unstructured data and fetch it during build time, as described by the guide "[Using Gatsby without GraphQL](/docs/using-gatsby-without-graphql/)". However, as highlighted in the guide, this approach comes with some tradeoffs.
3. Create a source plugin, as described in the tutorial "[Source plugin tutorial](/tutorial/pixabay-source-plugin-tutorial/)".
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

## その他の考慮事項

1. プライベート API のデータがとても頻繁に更新される場合や、サイトがリアルタイムで更新されると期待する場合、実行時にデータを直接クエリーする方が理にかなっている場合があります。

2. もしプラグインを介してデータを取得できる場合は、API を介した取得の代替として考えてください。 例えば、データを保管する MongoDB データベースにアクセスできる場合は、[`gatsby-source-mongodb`](/packages/gatsby-source-mongodb/) が便利です。[Gatsby プラグインライブラリー](/plugins/) を参照して、使用できるプラグインを確認してください。

3. ビルドプロセスやプライベート API の状況に応じて、他の調整が必要になる場合があります。

   - もしプライベート API が社内ネットワーク内でのみ使用可能な場合、ビルドを実行する CI サーバーにプライベート API を公開する必要があります。そうでなければ、あなたのコンピューターで Gatsby ビルドを実行する必要があります。
   - 開発環境と本番環境に別々の API エンドポイントの構成が必要な場合もあります。方法については [環境変数](/docs/environment-variables/) ガイドを参照してください。

4. サイトに古いデータが表示されないようにするには、データが更新される度にサイトを再ビルドするプロセスをトリガーする自動プロセスをセットアップできます。例えば、サイトを Netlify でホストしている場合、[webhook にリクエストを作成して新しいビルドをトリガー](https://www.netlify.com/docs/webhooks/)できます。
