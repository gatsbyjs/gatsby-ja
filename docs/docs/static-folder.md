---
title: staticフォルダーを使う
---

通常、すべてのウェブサイトにはアセット（画像・スタイルシート・スクリプトなど）が必要です。Gatsby を使うときは、JavaScript ファイルで[アセットを直接インポートする](/docs/importing-assets-into-files/)ことをおすすめします。それは次のような利点があるためです。

- スクリプトやスタイルシートが最小化されバンドルされます。これにより、余分なネットワークリクエストを防ぐことができます。
- 存在しないファイルはコンパイルエラーを引き起こすので、ユーザーに 404 エラーを引き起こしません。
- ファイル名にハッシュが付加されるので、ブラウザーの古いバージョンのキャッシュについて心配する必要がなくなります。

しかし、モジュールシステムを使わずにアセットを追加することもできます。

## モジュールシステムを使わずにアセットを追加する

あなたのプロジェクトのルートに`static`という名前のフォルダーを作成すると、その中のすべてのファイルは`public`フォルダーにコピーされます。例えば、`sun.jpg`というファイルを static フォルダーに追加すると、それは`public/sun.jpg`にコピーされます。

### static アセットを参照する

`static`フォルダーのアセットは簡単に参照できます。

```jsx
render() {
  // 注意: これは非推奨の方法なので、節度を持って利用されるべきです。
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

この方法には以下のようなデメリットがあることを念頭に置いてください。

- `static`フォルダーの中のファイルは後処理されたり最小化されることはありません。
- 存在しないファイルはコンパイルエラーを起こすことなく、ユーザーに対して 404 エラーを発生させます。
- 最終的なファイル名には内容に基づくハッシュが含まれないので、中身が変わるたびにクエリ引数を加えたり、ファイル名を変更する必要があります。

## いつ `static` フォルダーを使うべきか

通常、私たちは [スタイルシート・画像・フォントアセット](/docs/importing-assets-into-files/)を JavaScript からインポートすることを推奨します。
しかし、`static`フォルダーは多くのあまり典型的でないケースにおいて、抜け道として有効です。

- ビルド出力に特定の名前のファイル、例えば[`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest)が必要なとき。
- 数千の画像があり、それらを動的に参照しなければならないとき。
- 小さなスクリプト（[`pace.js`](http://github.hubspot.com/pace/docs/welcome/)など）をバンドル外で含めたいとき。
- Webpack と互換性のないライブラリーを使用しており、`<script>`タグを使用して読み込む以外の方法がないとき。
- GraphQL で扱うのが難しい一貫性のないスキーマを持つ JSON ファイル（[TopoJSON files](https://en.wikipedia.org/wiki/GeoJSON#TopoJSON)など）をインポートしたいとき。JSON ファイルを`import`文を用いてページ、テンプレート、コンポーネント内に直接インポートすると、そのファイルがバンドルに追加されるので、全てのページのサイズが増加することに注意してください。代わりに、JSON ファイルを`staic`フォルダーに置いて、`componentDidMount`ライフサイクルや`useEffect` hook 内で動的 import 文（`import('/static/myjson.json')`)を用いると良いでしょう。
