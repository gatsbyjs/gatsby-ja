---
title: CSS-in-JS でのスタイル実装
overview: true
---

CSS-in-JS とは外部 CSS ファイルを使わず、JavaScript の中でスタイルを記述するアプローチのことを指します。これはコンポーネント内のスタイルを簡単にスコープしたり、不要コード除去、パフォーマンス高速化、動的スタイリングなどをもたらします。

CSS-in-JS は CSS と JavaScript の架け橋になります：

1. **コンポーネント**: コンポーネントでサイトのスタイルを設定します。これは、React の「すべてがコンポートである」という思想とうまく融合します。
2. **スコープ**: これは 1 つめの副作用です。 [CSS Modules](/docs/css-modules/) 同様、CSS-in-JS はデフォルトでコンポーネントにスコープされます。
3. **動的**: JavaScript 変数の活用によりコンポーネントの状態に連動して動的にサイトをスタイリングします。
4. **おまけ**: CSS-in-JS には豊富なライブラリーがあります。キャッシュを支援する一意なクラス名の生成、ベンダープリフィックスの自動付与、クリティカル CSS の最適化ローディング、その他多くの機能をライブラリー追加できます。

CSS-in-JS は Gatsby において必須という訳ではありませんが、上記の理由により多くの JavaScript 開発者に人気があります。詳しく知りたい場合は、Max Stoiber（CSS-in-JS ライブラリー styled-components の作者の一人）の記事 [_Why I write CSS in JavaScript_](https://mxstbr.com/thoughts/css-in-js/) をご覧ください。しかしながら、CSS-in-JS が必要か、依存せずに包括的なフロントエンドのスキルセットで推しすすめることが可能どうかも熟慮しなければなりません。また、JSX から CSS への移植はかなりの労力を伴います。

**これは React や Gatsby の機能の一部ではなく、幾つかの[サードパーティ CSS-in-JS ライブラリー](https://github.com/MicheleBertoli/css-in-js#css-in-js)を使用することでもたらされます。**

> CSS-in-JS で JSX マークアップに 不変な CSS クラスを追加することは エンドユーザがアクセシビリティのために [User Stylesheets](https://www.viget.com/articles/inline-styles-user-style-sheets-and-accessibility/) を追加することの助けになります。[Styled Components](/docs/styled-components#enabling-user-stylesheets-with-a-stable-class-name) での例をご覧くだい。

JavaScript が読み込まれるまでスタイルが適用されない事に留意すべきです。したがって、FOUC(Flash Of Unstyled Content) という CSS 適用前が表示されてしまう現象を防ぐためにスタイルを抽出するプラグインが必要になります。この問題を解決するために、すべての CSS-in-JS ライブラリーはスタイルを抽出する為の Gatsby プラグインを持ちます。そして、抽出したスタイルをビルド時に HTML へ挿入し、これにより FOUC を防ぎます。

このセクションでは、特に人気の高い CSS-in-JS ライブラリーによるグローバルスタイルの設定方法が収録されています。

<GuideList slug={props.slug} />
