---
title: GraphQL を使わない Gatsby について
---

ほとんどの Gatsby に関するドキュメントやウェブ上の例では、ソースプラグインの活用方法やサイトのデータ管理についてフォーカスしています。 しかし、データを Gatsby に取り込む際、ソースプラグイン（や Gatsby ノード）は必ずしも必要ないのです！GraphQL を使わなくとも Gatsby だけで「非構造化データ」を取り扱えます。

> ヒント：ここでは、「非構造化データ」を「Gatsby のデータ層の外側で加工されたデータ」のことをいいます。(Gatsby のノードに変換せずに直接取得されたデータを使います)

## アプローチ： Gatsby の `createPages` API を使いデータを取得する

> _ヒント_：下記サンプルコードは、ここでいう「非構造化データ」によるアプローチを確かめるために作られたリポジトリです。[完全版はこちら](https://github.com/jlengstorf/gatsby-with-unstructured-data)

Gatsby プロジェクト内の `gatsby-node.js` ファイルにて、必要なデータを取得し `createPages` API の中の `createPage` アクションに記述してください。

```javascript:title=gatsby-node.js
exports.createPages = async ({ actions: { createPage } }) => {
  // `getPokemonData` はデータ取得の関数です。
  const allPokemon = await getPokemonData(["pikachu", "charizard", "squirtle"])

  // 全ポケモンリストを表示するページを生成します。
  createPage({
    path: `/`,
    component: require.resolve("./src/templates/all-pokemon.js"),
    context: { allPokemon }, // highlight-line
  })

  // 個別のポケモンを表示するページを生成します。
  allPokemon.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}/`, // highlight-line
      component: require.resolve("./src/templates/pokemon.js"),
      context: { pokemon }, // highlight-line
    })
  })
}
```

- `createPages` は [Gatsby Node API](/docs/node-apis/#createPages) です。 [Gatsby の起動手順](/docs/gatsby-lifecycle-apis/#bootstrap-sequence) の中で読み込まれます。
- [`createPage` アクション](/docs/actions/#createPage)は実際のページを組み立てる場所です。

ハイライトした行にあるように、データはテンプレートに埋め込まれ、props としてアクセスできます。

```jsx:title=/src/templates/pokemon.js
// highlight-next-line
export default ({ pageContext: { pokemon } }) => (
  <div style={{ width: 960, margin: "4rem auto" }}>
    {/* highlight-start */}
    <h1>{pokemon.name}</h1>
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    {/* highlight-end */}
    <h2>Abilities</h2>
    <ul>
      {/* highlight-start */}
      {pokemon.abilities.map(ability => (
        <li key={ability.name}>
          <Link to={`./pokemon/${pokemon.name}/ability/${ability.name}`}>
            {ability.name}
            {/* highlight-end */}
          </Link>
        </li>
      ))}
    </ul>
    <Link to="/">Back to all Pokémon</Link>
  </div>
)
```

## どのような時に「非構造化データ」によるアプローチを用いるとよいでしょうか？

GraphQL によるデータ層を用いることがプロジェクトの規模に対して大げさだと感じた時に、このアプローチを検討すると良いかもしれません。

## 「非構造化データ」によるアプローチのメリット

- 馴染みやすくとっつきやすい — GraphQL に慣れていない場合は特に、このアプローチは馴染みやすいかもしれません。
- 余計な処理をはさまない — 取得したデータをストレートに渡し画面を生成します。

## GraphQL によるデータ層を導入する場合のメリット

一方で、GraphQL によるデータ層を導入した場合のメリットもみてみましょう。

- コンポーネント自体に必要なデータを宣言的に記述できる
- フロントエンド側のデータ取得に関する似たようなコードを排除できる — データ取得の細かいところを気にする必要がありません。 GraphQL クエリに問い合わせるだけで必要なデータがうまく表示されようにしてくれます。
- フロントエンド側の複雑な部分をクエリの中にまとめることができる — たいていのデータ加工は GraphQL クエリのビルド時に完了します。
- 階層の入り組んだ複雑なデータを扱うようなモダンなアプリケーションにとって最適なデータクエリ言語
- データの肥大化をなくすことでパフォーマンスを改善できる — GraphQL はビューで必要とされるデータを遅延読み込みしているため Gatsby は高速に動作します。
- 開発環境でのホットリロードが可能 — "ポケモン"のウェブサイトの例でいうと、「他のポケモンをみる」機能を詳細ページに追加するような場合、すべての”ポケモン”が表示されるように `gatsby-node.js` を改修してから、開発環境サーバーの再起動が必要です。しかし GraphQL を利用するとホットリロードにより即座に追加したクエリが反映されます。

> GraphQL についてより深く知りたい場合は [GraphQL in Gatsby](/docs/querying-with-graphql/) を参照。

データ層の外側で処理をすることによって、下記リンクに示すようにトランスフォーマープラグインで提供されるような最適化が得られます。

- [`gatsby-image`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image)（画像読み込みの最適化）
- [`gatsby-transformer-sharp`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-sharp)（リサイズ、切り取り、レスポンシブな画像の生成といった、いろいろな画像処理の方法を選択できるフィールドを提供します）
- Gatsby エコシステムにおける公式のもの、あるいはコミュニティーによるものすべての [トランスフォーマープラグイン](/plugins/?=transformer)、、、など

その他「非構造データ」を用いた場合のデメリットとして、たくさんのソースから直接データを取得すればするほど、コードが発散してしまうことがあげられます。

## Gatsby にとっておすすめは？

もしあなたが作ろうとしているサイトの規模が小さいものでしたら、このガイドで説明したように `createPages` API を使って「非構造データ」を取り込むことが効率的でしょう。あとでもしサイトが大きくなったり、より複雑なサイトの構築やデータを加工したくなった場合は下記のような手順を実施してください。

1.  ほしいソース取得プラグインとトランスフォームプラグインが [Plugin Library](/plugins/) に存在するかを確認ください。
2.  もしなければ [Plugin Authoring](/docs/creating-plugins/) をお読みいただきご自身で作ることをご検討ください！

## 参考

- Amberley Romo さんのガイド [using Gatsby without GraphQL](/blog/2018-10-25-using-gatsby-without-graphql/)
- [Why Gatsby Uses GraphQL](/docs/why-gatsby-uses-graphql/)
