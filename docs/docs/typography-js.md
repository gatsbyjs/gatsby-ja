---
title: Typography.js
---

## Typography.js を Gatsby で使う

Typography.js はサイトに合うタイプデザインを調査し、カスタマイズ可能な既存の美しいテーマを設定する Javascript ライブラリーです。これを使えば、簡単にあなたのサイトのフォントを変更できます。Typography.js では現在、30 以上のテーマが使えるようにメンテナンスされています。欲しいテーマがなければ、自分でテーマを作ることもできます。Typography をプロジェクトで使うためには、[Gatsby プラグイン](https://www.gatsbyjs.org/packages/gatsby-plugin-typography/) をインストールし、Typography 用の設定を書く必要があります。

## Typography プラグインのインストール

Gatsby はプロジェクトに Typography.js を導入するため、`gatsby-plugin-typography` というプラグインを用意しています。

`npm install gatsby-plugin-typography react-typography typography --save` というコマンドを打つことで、プラグインのインストールと peer dependencies への追加を行うことができます。

インストールが完了したら、プロジェクトルートにある `gatsby-config.js` ファイルを開き、以下のようにプラグインの設定を足します。

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    // highlight-start
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // highlight-end
  ],
}
```

`gatsby-plugin-typography` には 2 つのオプションを指定できます。

- **pathToConfigModule** (string): Typography の設定ファイルへのパス
- **omitGoogleFont** (boolean, `default: false`): デフォルトでは Typography は必要なフォントを Google Font の CDN にリクエストを送るヘルパーを含んでいます。自分で用意したフォントを使いたい場合、もしくは自分でフォントを読み込む CDN を選択する場合は、`omitGoogleFont: true`, `gatsby-plugin-typography` を指定することでフォントヘルパーを追加する工程をスキップできます。その代わり、適切なフォントを自身で読み込まないといけません。[Adding a Local Font](/docs/recipes/styling-css#adding-a-local-font) を参照してください。

## Typography の設定の作成

ここまででプラグインを追加したので、もし `src/utils/` ディレクトリーがなかった場合は作成し、`typography.js` という名前のファイルを追加してください。このファイルに Typography の設定を書き、このファイルへのパスを `pathToConfigModule` オプションに設定します。

作成した `typography.js` ファイルの中には、サイトのタイプデザインの設定を書きます。基本的な設定は次のようになっています。

```js:title=src/utils/typography.js
import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Avenir Next",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Georgia", "serif"],
})

export default typography
```

もし Typography.js を自身が作成した既存の Gatsby プロジェクトにインストールしている場合は、コンフリクトしているすべての CSS フォントスタイルを Typography.js の設定に合わせて既存のコードから削除する必要があります。

Typography.js のすべての要素のフォントサイズは上記で設定した `baseFontSize` に応じて伸ばしたり縮めたりします。この値をいじってみて見た目の変化を見てください。

新たにテーマを見つけるか、作成する場合は[Typography.js](https://kyleamathews.github.io/typography.js/)のサイトにあるオプションのリストを参照してください。

## Typography テーマのインストール

Typography.js にはサイトのフォントスタイルを決める時間を節約してくれるビルトインテーマがあります。Funston というテーマは Typography によってメンテナンスされているビルトインテーマの 1 つです。この Funston を npm からインストールするには、 `npm install typography-theme-funston --save` というコマンドを打ってください。

このテーマを使うには、先程作成した `typography.js` ファイルを次のように編集します。

```diff:title=src/utils/typography.js
import Typography from "typography";
// highlight-start
+ import funstonTheme from 'typography-theme-funston'
// highlight-end
const typography = new Typography(
- {
-     baseFontSize: '18px',
-     baseLineHeight: 1.666,
-     headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
-     bodyFontFamily: ['Georgia', 'serif'],
- },
// highlight-start
+ funstonTheme
// highlight-end
);

export default typography;
```

上記の手順が終わったら、 `gatsby develop` というコマンドで開発サーバーを立ち上げ、<http://localhost:8000>にアクセスしてください。もしすべての手順が上手くいっていたら、サイトのタイプデザインが Funston テーマになっているはずです。

**注意**: もし以前のフォントが変更されずに残っている場合、CSS からすべての `font-family` を削除し、再度チェックしてください。

インストールしたいテーマをもっと探す場合は、[Typography.js](https://kyleamathews.github.io/typography.js/)の公式サイトを見てください。
