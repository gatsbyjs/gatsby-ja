---
title: staticフォルダを使う
---

通常、すべてのウェブサイトにはアセット（画像・スタイルシート・スクリプトなど）が必要です。Gatsby を使うときは、JavaScript フィイルで[アセットを直接インポートする](/docs/importing-assets-into-files/)ことをおすすめします。それは次のような利点があるからです。

- スクリプトやスタイルシートが最小化されバンドルされます。これにより、余分なリクエストを防ぐことができます。
- 存在しないファイルがユーザーに 404 エラーを引き起こすのではなく、コンパイルエラーを引き起こします。
- ファイル名に中身に基づくハッシュが付加されるので、ブラウザの古いバージョンのキャッシュについて心配する必要がなくなります。

しかし、モジュールシステムを使わずにアセットを追加することもできます。

## モジュールシステムを使わずにアセットを追加する

あなたのプロジェクトのルートに`static`という名前のフォルダを作ると、その中のすべてのファイルは`public`フォルダにコピーされます。例えば、あなたが`sun.jpg`というファイルを static フォルダに追加したなら、それは`public/sun.jpg`にコピーされます。

### static アセットを参照する

`static`フォルダのアセットは簡単に参照できます:

```jsx
render() {
  // 注意: これは非推奨の方法で、節度を持って利用されるべきです。
  // 通常は、`import`を利用してアセットURLを取得することをおすすめします。
  // その方法は、"アセットをファイルに直接インポートする"ページで説明されています。
  return <img src={'/logo.png'} alt="Logo" />;
}
```

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-use-a-local-image-from-the-static-folder-in-a-gatsby-component"
  lessonTitle="Use a local image from the static folder in a Gatsby component"
/>

### デメリット

この方法には以下のようなデメリットがあることを念頭に置いてください:

- `static`フォルダの中のファイルは後処理されたり最小化されることはありません。
- 存在しないファイルはコンパイルエラーを起こすことなく、ユーザーに対して 404 エラーを発生させます。
- 最終的なファイル名には内容に基づくハッシュが含まれないので、中身が変わるたびにクエリ引数を加えたり、ファイル名を変更する必要があります。

## いつ `static` フォルダを使うべきか

通常、私たちは [スタイルシート・画像・フォントアセット](/docs/importing-assets-into-files/)を JavaScript からインポートすることを推奨します。`static`フォルダは多くのあまり典型的でないケースにおいて、抜け道として有効です。

- ビルド出力に特定の名前のファイルが必要なとき。例えば、[`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- 数千の画像があり動的に参照しなければならないとき。
- 小さいスクリプト（[`pace.js`](http://github.hubspot.com/pace/docs/welcome/)など）をバンドルされたコードの外で含めたいとき。
- Webpack と互換性のないライブラリを使用しており、`<script>`タグを使用して読み込む以外の方法がないとき
- 一貫性のないスキーマを持つ JSON ファイル（[TopoJSON files](https://en.wikipedia.org/wiki/GeoJSON#TopoJSON)）をインポートしたいとき
  You need to import JSON file that doesn't have a consistent schema, like [TopoJSON files](https://en.wikipedia.org/wiki/GeoJSON#TopoJSON), which is difficult to handle with GraphQL. Note that importing JSON files directly inside a page, a template, or a component using `import` syntax results in adding that file to the app bundle and increasing the size of all site's pages. Instead, it's better to place your JSON file inside the `static` folder and use the dynamic import syntax (`import('/static/myjson.json')`) within the `componentDidMount` lifecycle or the `useEffect` hook.
