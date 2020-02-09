---
title: "レシピ: CSSによるスタイリング"
---

ウェブサイトにスタイルを適用する方法はとてもたくさんありますが、 Gatsby では公式や非公式のプラグインによってほぼ全ての方法がサポートされています。

## レイアウトコンポーネントなしでグローバル CSS ファイルを使う

### 必要事項

- インデックスページコンポーネントを含む既存の [Gatsby で作られたサイト](/docs/quick-start/)
- `gatsby-browser.js` ファイル

### やり方

1. `src/styles/global.css` という名前のグローバル CSS ファイルを作成し、 以下の内容をペーストします。

```css:title=src/styles/global.css
html {
  background-color: lavenderblush;
}

p {
  color: maroon;
}
```

2. 次に示すような形で、`gatsby-browser.js` にグローバル CSS ファイルをインポートします。

```javascript:title=gatsby-browser.js
import "./src/styles/global.css"
```

> **ヒント:** `gatsby-config.js` の中で `require('./src/styles/global.css')` を使ってグローバル CSS ファイルをインポートすることもできます。

3. `gatsby develop` を実行して、グローバルのスタイルがあなたのサイトに適用されたことを確認してみましょう。

> **注意:** あなたのサイトのスタイル手法として CSS-in-JS を使っている場合、この方法はベストではありません。その場合はレイアウトページと shared コンポーネント全てが使われるべきです。これについては次のレシピで説明します。

### 追加のリソース

- より詳細な [レイアウトコンポーネントを使わずにグローバルスタイルを追加する方法について](/docs/global-css/#adding-global-styles-without-a-layout-component)

## レイアウトコンポーネントでグローバルスタイルを使う

### 必要事項

- インデックスページコンポーネントを含む既存の [Gatsby で作られたサイト](/docs/quick-start/)

### やり方

グローバルなスタイルを [shared レイアウトコンポーネント](/tutorial/part-three/#your-first-layout-component)に追加できます。このコンポーネントはサイト全体を通して共通のもの、例えばヘッダーやフッターなどに使われます。

1. まだなければ、新たに `/src/components` というディレクトリーを作成します。

2. components ディレクトリー内で、次の 2 つのファイルを作成します： `layout.css` と `layout.js`

3. 以下の内容を `layout.css` に追加します。

```css:title=/src/components/layout.css
body {
  background: red;
}
```

4. CSS をインポートし、マークアップを出力するように `layout.js` を編集します。

```jsx:title=/src/components/layout.js
import React from "react"
import "./layout.css"

export default ({ children }) => <div>{children}</div>
```

5. それでは、あなたのサイトのホームページである `/src/pages/index.js` を編集して、新しく作成したレイアウトコンポーネントを使ってみましょう！

```jsx:title=/src/pages/index.js
import React from "react"
import Layout from "../components/layout"

export default () => <Layout>Hello world!</Layout>
```

### 追加のリソース

- [グローバル CSS ファイルを使ったスタンダードなスタイリング](/docs/global-css/)
- [レイアウトコンポーネントについてもっと詳しく](/tutorial/part-three)

## Styled Components を使う

### 必要事項

- インデックスページコンポーネントを含む既存の [Gatsby で作られたサイト](/docs/quick-start/)
- [gatsby-plugin-styled-components, styled-components, そして babel-plugin-styled-components](/packages/gatsby-plugin-styled-components/) が `package.json` にインストールされていること

### やり方

1. `gatsby-config.js` ファイルの中で `gatsby-plugin-styled-components` を追加します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
}
```

2. インデックスページコンポーネントを開き (`src/pages/index.js`) `styled-components` パッケージをインポートします。

3. スタイルブロックを各要素タイプ毎に作成することでコンポーネントをスタイルします。

4. JSX に styled components を含めることでページに適用します。

```jsx:title=src/pages/index.js
import React from "react"
import styled from "styled-components" //highlight-line

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Avatar = styled.img`
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
`

const Username = styled.h2`
  margin: 0 0 12px 0;
  padding: 0;
`

const User = props => (
  <>
    <Avatar src={props.avatar} alt={props.username} />
    <Username>{props.username}</Username>
  </>
)

export default () => (
  <Container>
    <h1>About Styled Components</h1>
    <p>Styled Components is cool</p>
    <User
      username="Jane Doe"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
    />
    <User
      username="Bob Smith"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
    />
  </Container>
)
```

5. `gatsby develop` を実行し、変更を確認してみましょう。

### 追加のリソース

- [Styled Components についてより詳しく](/docs/styled-components/)
- [Egghead のレッスン](https://egghead.io/lessons/gatsby-style-gatsby-sites-with-styled-components)

## CSS モジュールを使う

### 必要事項

- インデックスページコンポーネントを含む既存の [Gatsby で作られたサイト](/docs/quick-start/)

### やり方

1. CSS モジュールを `src/pages/index.module.css` という形で作成し以下の内容をモジュールにペーストします。

```css:title=src/pages/index.module.css
.feature {
  margin: 2rem auto;
  max-width: 500px;
}
```

2. `index.js` ファイルのページを編集することによって CSS モジュールを `style` という JSX オブジェクトとしてファイルにインポートします。以下のようになります。

```jsx:title=src/pages/index.js
import React from "react"

// highlight-start
import style from "./index.module.css"

export default () => (
  <section className={style.feature}>
    <h1>Using CSS Modules</h1>
  </section>
)
// highlight-end
```

3. `gatsby develop` を実行して変更を確認します。

**注意：**
ファイルの拡張子が `.css` ではなく `.module.css` であることに気をつけてください。これによって Gatsby にこのファイルが CSS モジュールであることを伝えています。

### 追加のリソース

- より詳細な [CSS モジュールの使用について](/tutorial/part-two/#css-modules)
- [CSS モジュールの実際の使用例](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-css-modules)

## Sass/SCSS を使う

Sass とは CSS の拡張であり、ネストしたルール、変数、ミックスイン、その他にもさまざまな高度な機能を提供します。

Sass には二種類の記法があります。もっとも普及しているのが "SCSS" 記法で、CSS のスーパーセットです。これは CSS として正しい記法のもの全てが SCSS 記法としても正しいことを意味します。 SCSS ファイルは拡張子に .scss を使います。

Sass は .scss と .sass ファイルを .css ファイルにコンパイルしてくれるので、あなたはスタイルシートでより高度な機能を使うことができます。

### 必要事項

- [Gatsby で作られたサイト](/docs/quick-start/)

### やり方

1. Gatsby のプラグイン [gatsby-plugin-sass](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/) と `node-sass` をインストールします。

`npm install --save node-sass gatsby-plugin-sass`

2. `gatsby-config.js` ファイルにプラグインを追加します。

```javascript:title=gatsby-config.js
plugins: [`gatsby-plugin-sass`],
```

3. `.sass` または `.scss` ファイルとしてスタイルシートを書き、インポートします。スタイルをインポートする方法がわからない場合は、[CSS によるスタイリング](/docs/recipes/#2-styling-with-css)を確認してください。

```css:title=styles.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

```css:title=styles.sass
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

```javascript
import "./styles.scss"
import "./styles.sass"
```

_ヒント: .css のかわりに拡張子を .scss または .sass にしなければならないという違いがありますが、前の CSS モジュールのレシピで言及したように Sass/SCSS ファイルをモジュールとして使うこともできます。_

### 追加のリソース

- [.sass と .scss の違いについて](https://responsivedesign.is/articles/difference-between-sass-and-scss/)
- [Sass 公式サイトによる Sass ガイド](https://sass-lang.com/guide)
- [より詳細な解説とリソースを含んだ、より完全な Sass の導入チュートリアル](https://www.gatsbyjs.org/docs/sass/)

## ローカルフォントを追加する

### 必要事項

- [Gatsby で作られたサイト](/docs/quick-start/)
- フォントファイル 1 つ： `.woff2`, `.ttf`, など。

### やり方

1. フォントファイルを Gatsby のプロジェクトにコピーします。例： `src/fonts/fontname.woff2`

```text
src/fonts/fontname.woff2
```

2. Gatsby のサイトにバンドルするため、CSS ファイルにフォントのアセットをインポートします。

```css:title=src/css/typography.css
@font-face {
  font-family: "Font Name";
  src: url("../fonts/fontname.woff2");
}
```

**注意：** 次の例のように、関連する CSS ファイルからフォント名が参照されていることを確認してください。

```css:title=src/components/layout.css
body {
  font-family: "Font Name", sans-serif;
}
```

HTML の `body` 要素を対象にすることで、 あなたのフォントはほとんどのテキストに適用されます。追加の CSS で `button` や `textarea` といった他の要素を対象にできます。

上記の手順でフォントが反映されない場合、関連する CSS で既存の `font-family` が置き換えられているか確認してください。

### 追加のリソース

- より詳細な [ファイルへのアセットのインポートについて](/docs/importing-assets-into-files/)

## Emotion を使う

[Emotion](https://emotion.sh) とは強力な CSS-in-JS のライブラリーでインライン CSS スタイルに加え、 styled components もサポートします。同じファイルで各々の機能をバラバラに使うことも、一緒に使うこともできます。

### 必要事項

- [Gatsby で作られたサイト](/docs/quick-start/)

### やり方

1. [Gatsby Emotion plugin](/packages/gatsby-plugin-emotion/) と Emotion のパッケージをインストールします。

```shell
npm install --save gatsby-plugin-emotion @emotion/core @emotion/styled
```

2. `gatsby-plugin-emotion` プラグインを `gatsby-config.js` ファイルに追加します。:

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```

3. もしまだなければ、あなたの Gatsby サイトの `src/pages/emotion-sample.js` に新しいページを作成します。

Emotion の `css` コアパッケージをインポートします。そうすることで `css` prop を使って [Emotion の object styles](https://emotion.sh/docs/object-styles) をコンポーネント内のどんな要素にも追加できるようになります。

```jsx:title=src/pages/emotion-sample.js
import React from "react"
import { css } from "@emotion/core"

export default () => (
  <div>
    <p
      css={{
        background: "pink",
        color: "blue",
      }}
    >
      This page is using Emotion.
    </p>
  </div>
)
```

4. Emotion の [styled components](https://emotion.sh/docs/styled) を使うには、パッケージをインポートし `styled` 関数を使って定義します。

```jsx:title=src/pages/emotion-sample.js
import React from "react"
import styled from "@emotion/styled"

const Content = styled.div`
  text-align: center;
  margin-top: 10px;
  p {
    font-weight: bold;
  }
`

export default () => (
  <Content>
    <p>This page is using Emotion.</p>
  </Content>
)
```

### 追加のリソース

- [Gatsby で Emotion を使う](/docs/emotion/)
- [Emotion のウェブサイト](https://emotion.sh)
- [Emotion と Gatsby 入門](https://egghead.io/lessons/gatsby-getting-started-with-emotion-and-gatsby)

## Google Fonts を使う

独自の [Google Fonts](https://fonts.google.com/) をプロジェクト内でローカルにホスティングするということは、サイトのロード時にネットワークを越えてフォントを取得してくる必要がないということを意味し、あなたのサイトの Speed Index をデスクトップで ~300 ミリ秒まで、3G で 1+ 秒ほど向上させます。また、パフォーマンスのためにカスタムフォントの使用を本当に必要なものだけに絞ることが推奨されます。

### 必要事項

- [Gatsby で作られたサイト](/docs/quick-start)
- [Gatsby CLI](/docs/gatsby-cli/) がインストール済みであること
- [the typefaces project](https://github.com/KyleAMathews/typefaces) からフォントを選択済みであること

### やり方

1. `npm install --save typeface-your-chosen-font` を実行します。 `your-chosen-font` の部分を [the typefaces project](https://github.com/KyleAMathews/typefaces) から選んだインストールしたいフォントに置き換えます。

人気のある 'Source Sans Pro' フォントの場合の例： `npm install --save typeface-source-sans-pro`.

2. `import "typeface-your-chosen-font"` をレイアウトテンプレート、ページコンポーネント、または `gatsby-browser.js` に追加します。

```jsx:title=src/components/layout.js
import "typeface-your-chosen-font"
```

3. フォントがインポートされた後は、CSS スタイルシート、 CSS モジュール、または CSS-in-JS からフォント名を参照できます。

```css:title=src/components/layout.css
body {
  font-family: "Your Chosen Font";
}
```

_ヒント: 上記の例の場合、ふさわしい CSS の宣言は `font-family: 'Source Sans Pro';` のようになります。_

### 追加のリソース

- [Typography.js](/docs/typography-js/) - Google fonts を Gatsby 製のサイトで使う他のオプション
- [The Typefaces Project ドキュメント](https://github.com/KyleAMathews/typefaces/blob/master/README.md)
- [Kyle Mathews' blog による実例](https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/)
