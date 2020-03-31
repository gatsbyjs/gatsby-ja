---
title: 翻訳スタイルガイド
---

各言語の翻訳には、文の口調や句読点の使い方など、Gatsby の英語のドキュメントとはまた異なるアドバイスやスタイルガイドがあるでしょう。各言語の翻訳チームはドキュメントの統一性を保つために、それぞれのスタイルガイドを設け、リポジトリの[スタイルガイド](https://github.com/gatsbyjs/gatsby-i18n-source/blob/master/style-guide.md)に記載することで、コントリビューターが貢献しやすくなるでしょう。[原文のスタイルガイド](/contributing/gatsby-style-guide/)を参考にして、各言語のスタイルガイドを定めてください。

いかなる言語の翻訳でも、Gatsby プロジェクト全体のゴール、およびバリューとして次のガイドラインに沿ってください。**技術レベル、経験レベル問わず、Gatsby を学ぶすべての人に対して友好的なコミュニティを提供すること。どんなコントリビューターも安心して貢献できる環境であること。** 翻訳されたドキュメントやチュートリアルは[これらのバリュー](/blog/2019-04-19-gatsby-why-we-write/)を守りつつ、**品質の高い文法**、正確な情報、統一された構成や目的を保つことを目指しましょう。ガイドラインに関して質問があるばあい、Gatsby チームに気軽に[お声がけ](/contributing/how-to-contribute/#not-sure-how-to-start-contributing)ください。

### 用語集

スタイルガイドには[用語集](https://github.com/gatsbyjs/gatsby-i18n-source/blob/master/style-guide.md#glossary)が用意されています。翻訳をする上で共通の単語は、用語集を参考にしてください。翻訳する際に便利な単語に関しては原文の[用語集](/docs/glossary/)を参考にすると良いでしょう。

### 共通スタイルガイド

以下のルールは各言語のスタイルガイドのベースとして、すべての言語の翻訳スタイルガイドで適用しましょう。

#### 原文に忠実に

原文がわかりにくかったり、タイポがあったとしても、基本的に原文に忠実に訳してください。もし、原文に間違いがあり、それが修正可能であれば、[Gatsby 本家のリポジトリ](https://github.com/gatsbyjs/gatsby)に Issue や Pull Request を立ててください。そうすれば、全ての翻訳版がその修正の恩恵を受けることができます。

### コードブロック内のテキスト

コードブロック内に関しては、基本的にコメント以外を翻訳しないでください。任意で文字列リテラルの中身を翻訳することはできますが、コード自体はそのままにしてください！

✅ 良い：

```js
// 例
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ 良い：

```js
// 例
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 悪い：

```js
// 例
import React from "react"
export default () => (
  // 'purple' はCSSのキーワード
  <div style={{ color: `紫`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 絶対にしないで：

```js
インポート リアクト フロム "リアクト"
エクスポート デフォルト () => (
   <div スタイル={{color: `紫`, fontSize:` 72px`}}>こんにちは、Gatsby！</div>
)
```

#### 内部リンク

サイト内部の別のページにリンクする文章は翻訳して構いません。しかし、リンク先の URL は原文と同じ URL を使うので、そのままにしておいてください。

✅ 良い：

```markdown
- [開発環境のセットアップ](/tutorial/set-up-your-development-environment)
```

❌ 悪い：

```markdown
- [開発環境のセットアップ](/tutorial/開発環境のセットアップ)
```

### 外部リンク

もし外部リンクが[MDN]や[Wikipedia]のような記事の場合であって、かつ十分なクオリティの日本語版が存在する場合は、翻訳版へのリンクを貼りましょう。

[mdn]: https://developer.mozilla.org/en-US/
[wikipedia]: https://en.wikipedia.org/wiki/Main_Page

✅ 良い：

```md
React エレメントは[イミュータブル](https://ja.wikipedia.org/wiki/イミュータブル)です。
```

同等のリンクが存在しない場合（Stack Overflow、YouTube 等）、英語リンクをそのまま使用してください。
