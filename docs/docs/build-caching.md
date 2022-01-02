---
title: ビルドキャッシュ
---

プラグインはデータを JSON オブジェクトとしてキャッシュし、後続のビルドの際にこれを取得できます。

このキャッシュ機構は、すでにいくつかのプラグインと Gatsby 本体によって利用されています。

- プラグイン `source/transformer` によって作成された node は全てキャッシュされます
- `gatsby-plugin-sharp` はビルドしたサムネイルをキャッシュします

ビルド出力は、ルートディレクトリー以下の `.cache` と `public` に保存されます。

## キャッシュ API

キャッシュ API は [Gatsby's Node APIs](/docs/node-apis/) に渡され、通常プラグインによって実装されます。

```js
exports.onPostBootstrap = async function ({ cache, store, graphql }) {}
```

キャッシュのやり取りには、以下の 2 つの関数を利用します。

### `set`

キャッシュの埋め込み。

`cache.set(key: string, value: any) => Promise<any>`

### `get`

キャッシュの取り出し。

`cache.get(key: string) => Promise<any>`

この API のより詳細な情報は、[Node API helpers](/docs/node-api-helpers/#cache) を参照してください。

## プラグインの例

プラグインの `gatsby-node.js` ファイルでは、以下のように `cache` 引数にアクセス出来ます。

```js:title=gatsby-node.js
exports.onPostBuild = async function ({ cache, store, graphql }, { query }) {
  const cacheKey = "some-key-name"
  let obj = await cache.get(cacheKey)

  if (!obj) {
    obj = { created: Date.now() }
    const data = await graphql(query)
    obj.data = data
  } else if (Date.now() > obj.lastChecked + 3600000) {
    /* 一日後にリロード */
    const data = await graphql(query)
    obj.data = data
  }

  obj.lastChecked = Date.now()

  await cache.set(cacheKey, obj)

  /* データにより処理を行う ... */
}
```

## キャッシュの消去

キャッシュは `.cache` ディレクトリーに格納されているため、このディレクトリーを削除することで消去可能です。[`gatsby clean`](/docs/gatsby-cli/#clean) を用いて、`.cache` と `public` を削除しても、同様にキャッシュを削除できます。
また Gatsby は、以下に示すようにいくつかのケースでキャッシュを無効化しています。

- `package.json` に変更がある場合、具体的には依存関係に更新や追加など
- `gatsby-config.js` に変更がある場合、具体的にはプラグインの追加や変更など
- `gatsby-node.js` に変更がある場合、具体的には新しい Node API の呼び出し、createPage 呼び出しの変更など

## Conclusion

キャッシュ API を用いることで、ビルド間でデータを使い回すことが出来ます。これは `gatsby develop` を頻繁に再実行する、Gatsby を用いたサイト開発では非常に便利です。パフォーマンスの高い操作（画像変換など）やデータのダウンロードは、Gatsby の起動を大幅に遅くする可能性があるため、キャッシュによるビルドプロセスの最適化は、エンドユーザーにとって大幅な速度改善効果が期待できます。キャッシュ API を実装した例は以下を参考にしてください。[gatsby-source-contentful](https://github.com/gatsbyjs/gatsby/blob/7f5b262d7b5323f1a387b8b7278d9a81ee227258/packages/gatsby-source-contentful/src/download-contentful-assets.js), [gatsby-source-shopify](https://github.com/gatsbyjs/gatsby/blob/7f5b262d7b5323f1a387b8b7278d9a81ee227258/packages/gatsby-source-shopify/src/nodes.js#L23-L54), [gatsby-source-wordpress](https://github.com/gatsbyjs/gatsby/blob/7f5b262d7b5323f1a387b8b7278d9a81ee227258/packages/gatsby-source-wordpress/src/normalize.js#L471-L537), [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/blob/7f5b262d7b5323f1a387b8b7278d9a81ee227258/packages/gatsby-transformer-remark/src/extend-node-type.js), [gatsby-source-tmdb](https://github.com/LekoArts/gatsby-source-tmdb/blob/e12c19af5e7053bfb7737e072db9e24acfa77f49/src/add-local-image.js).
