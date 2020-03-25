---
title: プラグインライブラリに送信する
---

## ライブラリにプラグインを公開する

[プラグインライブラリ](/plugins/)にプラグインを追加するためには、以下を行う必要があります。

1. パッケージを npm に公開してください（[npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages) の方法をご覧ください）。
2. プラグインのコードに[必要なファイル](/docs/files-gatsby-looks-for-in-a-plugin/)を含めてください。
3. プラグインの `package.json` に `gatsby` と `gatsby-plugin` を含めた **`keyword` フィールドを含めてください**。プラグインがテーマの場合は、`gatsby-theme` も含めてください。
4. プラグインを README で文書化してください。参考として使用できる[プラグインテンプレート](/contributing/docs-templates/#plugin-readme-template)があります。

そうすると、Algolia はそれをライブラリ検索インデックスに追加するのに最大 12 時間（正確な時間はまだ不明）かかるので、https://gatsbyjs.org の毎日の再構築によってプラグインページが自動でウェブサイトに追加されるのを待ってください。その後、素晴らしいプラグインをコミュニティと共有しましょう！

## ヒント

### キーワード

他の _関連_ キーワードを `package.json` ファイルに含めて、関心のあるユーザが見つけやすくできます。例として、Markdown MathJax transformer には次のものが含まれます。

```json:title=package.json
"keywords": [
  "gatsby",
  "gatsby-plugin",
  "gatsby-transformer-plugin",
  "mathjax",
  "markdown",
]
```

### 画像

プラグインリポジトリの README に画像を含める場合は、プラグインページに画像を表示するために、絶対 URL を使用して画像を参照していることを確認してください。
