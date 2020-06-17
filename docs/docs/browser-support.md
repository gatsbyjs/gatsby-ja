---
title: ブラウザーサポート
---

Gatsby は[現在の安定バージョンの React.js と同じブラウザー](https://ja.reactjs.org/docs/react-dom.html#browser-support)をサポートしています。それらは現在では IE9+ およびその他の有名ブラウザーの最新バージョンとなります。

## ポリフィル

Gatsby は Babel 7 を利用して自動的にあなたの対象ブラウザーへのポリフィルを追加します。

新しいブラウザーは古いブラウザーより多くの JavaScript API をサポートしています。古いバージョンに対応するため、 Gatsby は（Babel によって）自動的にあなたのコードがそれらのブラウザーで動くために必要最小限の "ポリフィル" を追加します。

もし対象ブラウザーでサポートされていない新しい JavaScript API（たとえば `[].includes` など）を使った場合でも、Babel が必要なポリフィル `core-js/modules/es7.array.includes` を自動的に追加するため、古いブラウザーを壊してしまう心配はありません。

## "Browserslist" を使ってあなたのプロジェクトでサポートするブラウザーを指定する

`package.json` 内で [`"browserslist"`](https://github.com/ai/browserslist) キーを宣言することで、サポートしたいブラウザーバージョンの一覧を指定できます。それらの値を変えることで（[`babel-preset-env`](https://github.com/babel/babel-preset-env#targetsbrowsers) によって）JavaScript と（[`autoprefixer`](https://github.com/postcss/autoprefixer) によって）CSS の出力を変えることができます。

この記事は Browserslist を取り巻くツールに関する成長中のコミュニティーへの良い導入です —— https://css-tricks.com/browserlist-good-idea/ 。

Gatsby はデフォルトで下記の設定を行います。

```json:title=package.json
{
  "browserslist": [">0.25%", "not dead"]
}
```

もしあなたが新しいブラウザーのみをサポートしたいなら、`package.json` を上記のように設定することを忘れないでください。この設定によって、ほとんどの場合より小さな JavaScript ファイルが生成されます。
