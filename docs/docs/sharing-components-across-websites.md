---
title: ウェブサイト間でコンポーネントを共有する
issue: https://github.com/gatsbyjs/gatsby/issues/14042
---

組織内の複数のチームで Gatsby を使う利点の 1 つは、異なる Web サイト間で React コンポーネントを共有できることです。

共有する方法はいくつかあります。

**コンポーネントライブラリー**は明確で純粋なやり方です。しかし、しばしば追加のツールや変更によって複数のサイトへプルリクエストが必要となります。

あるいは、サイトごとに [Storybook](https://github.com/storybookjs/storybook) や [Styleguidist](https://github.com/styleguidist/react-styleguidist) などの**コンポーネントを見つけやすくするツール**を導入することで、リポジトリーをまたがって簡単に目的のコードをコピー＆ペーストできます。

[Bit](https://github.com/teambit/bit) などの**コンポーネント共有ツール**を使うことで、コピー＆ペーストせずに Web サイト間でコンポーネントの再利用と同期を行えます。

<GuideList slug={props.slug} />

--

**ヒント:** この他に、 Web サイト間でコンポーネントを共有するアイデアをご存知ですか？　 Gatsby ドキュメントへの貢献をお待ちしています。[貢献する方法](/contributing/docs-contributions/)をご覧ください。
