# Gatsby Japanese Translation

このリポジトリーでは Gatsby 公式ドキュメントの日本語版を作成しています。

翻訳の進捗は [Translation Progress Issue](https://github.com/gatsbyjs/gatsby-ja/issues/1) を確認してください。

日本語訳や日本語版特有の問題を見つけた場合はこのリポジトリーの Issue / Pull Request を使って報告ないし改善を提案してください。

## 翻訳・修正等に興味がある方へ

ドキュメントに誤字を見つけたり、まだ翻訳されていないページがあって、翻訳・修正を手伝いたいと言う方は、以下の手順に沿ってください。

### 作業の重複を防ぐための宣言

未翻訳記事を翻訳したい場合は、他の人との作業の重複を防ぐため、[この Issue](https://github.com/gatsbyjs/gatsby-ja/issues/1) での宣言をお願いします。

### 環境構築

1. このページの右上にある Fork ボタンからこのリポジトリーを Fork してください。
1. Git, Node.js, Yarn をそれぞれ準備して、 Fork したリポジトリーをクローンしてください。
   1. `git clone https://github.com/<yourname>/gatsby-ja`
   1. `cd gatsby-ja`
   1. `git switch -c docs/accessibility-statement`（`docs/accessibility-statement.md`を翻訳する場合）
1. `yarn` を使って dependency のインストールを行ってください。
   1. `yarn install`
1. これで準備は完了です！ `docs` の中身の Markdown を好みのテキストエディターで編集してください。

### 翻訳の手引

コードスニペットなど、どう翻訳していいかわからない部分があった場合は、[翻訳スタイルガイド](/style-guide.md)を参照してください。

[Gatsby Discord](https://gatsby.dev/discord) の `#translation-ja` チャンネルで質問していただいても構いません。

### 提出

1. 翻訳を終えたら校正します
   1. `yarn lint`（チェックマークが付いているエラーは自動修正できます）
   1. `yarn format`（すべてのエラーが自動修正されるわけではありません）
1. 原稿をコミットしてプッシュします。
   1. `git add .`
   1. `git commit -m "docs: translate docs/accessibility-statement"`（`docs/accessibility-statement.md`を翻訳する場合）
   1. `git push`
1. GitHub の画面から Pull Request を作成してください。

## 参考リンク

- [Japanese Translation Progress](https://github.com/gatsbyjs/gatsby-ja/issues/1)
- [翻訳スタイルガイド](/style-guide.md)
- [Gatsby 翻訳ガイド](https://www.gatsbyjs.org/contributing/gatsby-docs-translation-guide/)
- [Gatsby Discord](https://gatsby.dev/discord)

## メンテナー

- [**@hirotaka**](https://github.com/hirotaka)
- [**@Naturalclar**](https://github.com/Naturalclar)
- [**@uetchy**](https://github.com/uetchy)
