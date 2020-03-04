---
title: コメントの追加
---

Gatsby でブログを動かしていて、いくつかのコンテンツを追加した場合、次に考えるのは訪問者のエンゲージメントを高めることです。それを実現する素晴らしい方法は、あなたの記事に対して訪問者が質問したり、意見したりできるようにすることです。これにより、あなたのブログは訪問者にとってより活気のあるものになります。

コメントを追加する機能にはたくさんの選択肢がありますが、その中のいくつかは特に静的サイトを対象にしています。このリストが全てを網羅しているわけではありませんが、何が利用可能なのかを説明するための出発点として役に立ちます。

- [Disqus](https://disqus.com)
- [Commento](https://commento.io)
- [Facebook Comments](https://www.npmjs.com/package/react-facebook)
- [Staticman](https://staticman.net)
- [JustComments](https://just-comments.com) \([Gatsby の公式プラグイン](https://www.gatsbyjs.org/packages/gatsby-plugin-just-comments/)\)
- [TalkYard](https://www.talkyard.io)
- [Gitalk](https://gitalk.github.io)

Tania Rascia が Gatsby ブログで書いたように[独自のコメントシステムを展開する](/blog/2019-08-27-roll-your-own-comment-system/)こともできます。

## コメントに Disqus を使用する

このガイドでは、ブログに Disqus を実装する方法を学びます。Disqus には、次のような多くの優れた機能があります。

- [コメントの管理とフォーラムの維持](https://help.disqus.com/moderation/moderating-101)に手間がかかりません。
- 公式の[React サポート](https://github.com/disqus/disqus-react)を提供します。
- [寛大な無料枠](https://disqus.com/pricing)を提供します。
- [もっとも広く使用されているサービス](https://www.datanyze.com/market-share/comment-systems/disqus-market-share)のようです。
- コメントが簡単です。 Disqus には大規模なユーザー基盤があり、新規ユーザーが慣れるまでがとても早いです。Google、Facebook、Twitter のアカウントを登録でき、これらのチャンネルを介して書いたコメントをシームレスに連携できます。
- Disqus のユーザーインターフェースは多くのユーザーが認識できる落ち着いた見た目をしています。
- すべての Disqus コンポーネントは遅延読み込みされるので、投稿の読み込み時間に悪影響を与えません。

ただし、Disqus を選択することでトレードオフが発生することも留意しておいてください。もはや、完全な静的サイトではなくなり、埋め込まれた `iframe` を介して即座にコメントを配信するために、外部のプラットフォームに依存しています。さらに、第三者が訪問者のコメントを保存し、潜在的に閲覧行動を追跡することへのプライバシーの影響を考慮する必要があります。[Disqus のプライバシーポリシー](https://help.disqus.com/terms-and-policies/disqus-privacy-policy)、[プライバシーの FAQ](https://help.disqus.com/terms-and-policies/privacy-faq) (特に GDPR コンプライアンスに関する最後の質問）を参照して、ユーザーに[データの共有設定を編集する方法](https://help.disqus.com/terms-and-policies/how-to-edit-your-data-sharing-settings)を通知してください。

これらの懸念が Disqus の利点を上回る場合、上に記載した他の選択肢を調べてみてください。このガイドを他のサービスのセットアップ手順で拡張するためのプルリクエストを歓迎します。

## Disqus の実装

![Disqus のロゴ](./images/disqus-logo.svg)

自身のブログに Disqus コメントを追加する手順は次の通りです。

1. [Disqus にサインアップ](https://disqus.com/profile/signup)します。サインアップ処理の間にサイトの短縮名を選択する必要があります。これは Disqus がサイトからのコメントを識別するのに使われます。後ほどコピーして使用します。
2. Disqus の React パッケージをインストールします。

```shell
npm install disqus-react
```

3. ステップ 1 で選択した短縮名（ここでは仮に `GATSBY_DISQUS_NAME`）を `.env` ファイルと `.env.example` ファイルに追加して、リポジトリをフォークしている人がコメントを機能させるためには、この値が必要であることを認識できるようにします。([クライアント側のコードで環境変数を使用可能にするためには](https://www.gatsbyjs.org/docs/environment-variables/#client-side-javascript)、環境変数の先頭に `GATSBY_` を付ける必要があります）

```text:title=.env.example
# enables Disqus comments for blog posts
GATSBY_DISQUS_NAME=insertValue
```

```text:title=.env
GATSBY_DISQUS_NAME=yourSiteShortname
```

4. ブログ投稿テンプレート（通常は `src/templates/post.js` )で `DiscussionEmbed` コンポーネントをインポートします。

```js:title=src/templates/post.js
import React from "react"
import { graphql } from "gatsby"
// highlight-next-line
import { DiscussionEmbed } from "disqus-react"
```

それから Disqus 構成オブジェクトを定義します。

```js
const disqusConfig = {
  shortname: process.env.GATSBY_DISQUS_NAME,
  config: { identifier: slug, title },
}
```

`identifier`は投稿を一意に識別する文字列か数値（例えば、投稿のスラッグやタイトル、または何らかの ID）である必要があります。最後に、`DiscussionEmbed`コンポーネントを投稿テンプレートの JSX に追加します。

```jsx:title=src/templates/post.js
return (
  <Global>
    <PageBody>
      {/* highlight-next-line */}
      <DiscussionEmbed {...disqusConfig} />
    </PageBody>
  </Global>
)
```

これで完了です。ブログ投稿の下に Disqus のコメントが[このように](https://janosh.io/blog/disqus-comments#disqus_thread)。ハッピーブログ！

[![Disqus のコメント](./images/disqus-comments.png)](https://janosh.io/blog/disqus-comments#disqus_thread)
