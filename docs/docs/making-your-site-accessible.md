---
title: アクセシブルなサイトを作る方法
---

Gatsby チームは、Web アクセシビリティとパフォーマンスの最適化を考慮した便利なデフォルト設定を使用して、誰もが利用できる Web サイトを作成するお手伝いをします。障害を持つ人々のために Web サイトをアクセシブルにすることで、インターネット上のより多くの人々の障壁をなくして、より包括的なサイトを作ることができます。

## アクセシビリティとは何ですか？

Web 草創期に、ワールド・ワイド・ウェブを発明したティム・バーナーズ=リー氏は[次のように語る](https://www.w3.org/Press/IPO-announce)。

> 「ウェブの力はその普遍性にある。
> 障害の有無にかかわらず、誰もが利用できることは不可欠な要素である。」

今日の Web は、医療、教育、商業など、生活の多くの側面において重要な資源となっています。アクセシビリティは、そんな Web を構築する際の重要な考慮事項です。

[Web アクセシビリティ](https://www.w3.org/WAI/fundamentals/accessibility-intro/#what)とは、Web サイト、ツール、およびテクノロジーによって、障害を持つユーザーが利用できるように設計および開発されていることを意味します。しかし、恒久的な障害を持つ人々だけがその恩恵を受けるものではありません。アクセシビリティは一時的な障害を持つ人々にも恩恵をもたらします。たとえば、音声を聴くことができない環境や、腕が折れてコンピューターを使用できない環境を想像してみてください。

アクセシビリティは[すべての人のための包摂的な社会](https://www.w3.org/standards/webdesign/accessibility#case)をサポートし、強力な[ビジネス・ケース](https://www.w3.org/WAI/business-case/)も持っています。

## Gatsby はアクセシビリティの構築をサポートします

アクセシビリティを念頭に置いてサイトを開発するかどうかは最終的にはあなた次第ですが、Gatsby では可能な限り多くサポートすることを目指しています。

### アクセシブルなルーティング

すべてのサイトで、もっとも一般的な機能の 1 つはナビゲーションです。ユーザーは、直感的でアクセスしやすい方法でページやコンテンツ間を移動できる必要があります。

だから、すべての Gatsby のサイトでは、デフォルトでアクセシブルなナビゲーション体験を提供することを目指しています。React.js のルーティングライブラリーである[@reach/router](https://reach.tech/router)のおかげで、Gatsby はページ変更時のスクリーンリーダーへのページ通知を処理しています。私たちは積極的にこの使用感について改善しており、[あなたのフィードバックを歓迎しています](/accessibility-statement/)。

[2 度目のメジャーリリース](/blog/2018-09-17-gatsby-v2/)以降、Gatsby のサイトは内部で`@reach/router`を使用しています。常に Z アクセシビリティテストを追加することはよい考えですが、[Gatsby のリンクコンポーネント](/docs/gatsby-link/)では[@reach/router のリンクコンポーネント](https://reach.tech/router/api/Link)をラップしているので、アクセシビリティテストのことを考えずともアクセシビリティを向上させられます。

### Gatsby はデフォルトで HTML ページを作成する

Web サイトでは、[静的な HTML](/docs/glossary#static)ページをレンダリングするということは、JavaScript でコンテンツにアクセスしたりナビゲーションする必要がなくなりますことを意味します。Gatsby はデフォルトで、[Node.js](/docs/glossary#nodejs)を使用して React コンポーネントを HTML ページにコンパイルしています。つまり、[プログレッシブ・エンハンスメント](/docs/glossary#progressive-enhancement)に対応するため、自分でサーバー・レンダリングを準備する必要はありません。Gatsby の静的サポートを使うと、[クライアントサイド](/docs/glossary#client-side)のスクリプトを生成することなく、ユーザーがアクセスできる動的サイトを構築できます。

### eslint-plugin-jsx-a11y による静的解析

Gatsby は、`eslint-plugin-jsx-a11y`パッケージとともにリリースされ、すべてのルールに対する警告がデフォルトで有効になっています。[eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)は、コードのアクセシビリティ[静的解析](/docs/glossary#linting)ツールで、アクセシビリティのエラーを検出する時間を短縮することで、より包括的な Gatsby プロジェクトの開発を支援してくれます。このプラグインは、画像タグに代替テキストを含めることを推奨し、[ARIA](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA) props を検証し、重複するロールプロパティを排除します。

サポートされているルールの詳細については、[`eslint-plugin-jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y)のドキュメントを参照してください。これらのルールは、[`.eslintrc`](/docs/eslint/#configuring-eslint)でカスタマイズできます。

```json:title=.eslintrc
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/rule-name": "warning"
  }
}
```

注釈: ローカルの `.eslintrc` ファイルを読み込むと、Gatsby のデフォルトの静的解析がすべて[上書き](/docs/eslint/#configuring-eslint)され、内蔵の `eslint-loader` が無効になります。つまり、変更されたルールはブラウザーの開発コンソールやターミナルウィンドウには反映されませんが、IDE で ESLint プラグインが有効になっている場合は表示されます。この挙動を変更し、`eslint-loader` のカスタマイズを反映するようにするには、ローダーを自分で有効にする必要があります。これを実行する 1 つの方法は、コミュニティプラグインにある [`gatsby-plugin-eslint`](https://www.gatsbyjs.org/packages/gatsby-plugin-eslint/) を使用することです。さらに、[Gatsby に同梱されているデフォルトの ESLint 設定](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/utils/eslint-config.js)の一部サブセットを利用する場合は、ローカルの `.eslintrc` ファイルに手動でコピーする必要があります。

これは、アクセシビリティテストをするためのスタート地点です。[その他の推奨事項](#アクセシビリティを向上させるには?)については、以下を参照してください。

## アクセシビリティを向上させるには？

アクセシビリティがデフォルトであることは、誰にとってもメリットがあります。以下は、Gatsby のサイトやテーマを作成するときのアクセシビリティテストの開始点です。

- [キーボードを使用して](https://webaim.org/techniques/keyboard/)タブでページを移動します。すべてのインタラクティブなコントロール（リンク、ボタン、フォーム入力など）をキーボードだけで操作できたり、フォーカスインジケーターを表示できますか？
- 開発において[Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=ja)、[axe](https://www.deque.com/axe/)、もしくは、[Accessibility Insights](https://accessibilityinsights.io/)を用いてよくあるアクセシビリティの問題を検出して修正
- [Chrome 開発者ツールのアクセシビリティカラーピッカー](https://developers.google.com/web/updates/2018/01/devtools?hl=ja#contrast)を用いて、[適切なカラーコントラスト比](https://dequeuniversity.com/tips/color-contrast)を検証
- 包括的で[アクセシブルなフォーム](/docs/building-a-contact-form#creating-an-accessible-form)の作成
- アクセシブルな[見出し、ランドマーク、セマンティックな構造](https://webaim.org/techniques/semanticstructure/)を作成
- [画像、映像、音声にテキストによる代替手段](https://a11y-style-guide.com/style-guide/section-media.html)を
- [画面の拡大とズーム](https://axesslab.com/make-site-accessible-screen-magnifiers/)のテスト
- [インタラクティブなメニュー、モーダル、カスタム・ウィジェット](https://developer.mozilla.org/ja/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)のアクセシビリティ担保
- 安全な[アニメーションやモーション](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)の作成
- サイトやアプリケーションのための [Cypress アクセシビリティテスト](/docs/end-to-end-testing/#writing-tests)の記述

## アクセシビリティの参考資料

- [アクセシビリティ - React](https://ja.reactjs.org/docs/accessibility.html)
- [Gatsby によるアクセシビリティの取り組み](/blog/2019-04-18-gatsby-commitment-to-accessibility/)
- Google Web Fundamentals による[アクセシビリティレビューをする方法](https://developers.google.com/web/fundamentals/accessibility/how-to-review)
- [アクセシビリティプロジェクトのクイックテスト](https://a11yproject.com/#Quick-tests)
- Smashing Magazine による[手動でするアクセシビリティテストの重要性](https://www.smashingmagazine.com/2018/09/importance-manual-accessibility-testing/)
- [アクセシビリティのための自動テストの記述](https://www.24a11y.com/2017/writing-automated-tests-accessibility/)
- Google と Udacity の[無料の Web アクセシビリティコース](https://www.udacity.com/course/web-accessibility--ud891)
- [WebAIM - Web アクセシビリティの概要](https://webaim.org/intro/)
- 障害者のための無料オンライン・アクセシビリティ・トレーニングを提供する[Deque University](https://dequeuniversity.com)
- [Web.dev のアクセシビリティドキュメント](https://web.dev/accessible)
- [Gatsby のすべてのアクセシビリティブログ記事](/blog/tags/accessibility/)
