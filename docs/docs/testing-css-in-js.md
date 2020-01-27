---
title: CSS-in-JS のテスト
---

[styled-components](https://github.com/styled-components/styled-components) や [emotion](https://github.com/emotion-js/emotion) のような人気のある CSS-in-JS ライブラリーは、それぞれ [jest-styled-components](https://github.com/styled-components/jest-styled-components) や [jest-emotion](https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion) の助けを受けてテストすることもできます。これらのパッケージは、Jest のもともと持っているスナップショットテスト機能を改善してくれます。そして、これは、あなたのウェブサイト上で起こる意図しない UI の変化を避けやすくしてくれる素晴らしい方法となります。どうぞあなたが使用しているパッケージのドキュメントを参照して、そのパッケージがテスト機能もまた提供しているか見てみてください。

`jest-styled-components` や `jest-emotion` のような*スナップショットシリアライザー*は、標準の出力をより意味があり読みやすいスナップショットに修正してくれます。例えば、不必要な情報を取り除いたり、異なるフォーマットでデータを表示してくれます。結果として、スナップショットシリアライザーは、より違いがわかりやすい効率的なスナップショットテストを導いてくれます。

デフォルトでは、あなたの styled components のスナップショットは、生成されたクラス名（あなたが決めていないもの）を見せ、スタイルに関する情報は見せてくれません。スタイルを変更した時に、あなたが確認できるのは、いくつかの暗号化された（ハッシュ化された）クラス名の変化だけです。だからこそ、あなたは上記で示した*スナップショットシリアライザー*を使用するべきなのです。スナップショットシリアライザーは、ハッシュ化されたクラス名を取り除き、スタイル要素に沿った CSS を見せてくれます。

ここでは、例として emotion を使用します。emotion と glamor のテストユーティリティーは、多くの部分が [jest-styled-components](https://github.com/styled-components/jest-styled-components) に基づいていますので、使用感は似ています。以下に続く、ライブラリのテスト部分をご覧ください。

## インストール

```shell
npm install --save-dev jest-emotion babel-plugin-emotion
```

[Gatsby's emotion plugin](/packages/gatsby-plugin-emotion/) は、内部的に `babel-plugin-emotion` を使用していますので、Jest が使えるようにこれも一緒にインストールしましよう。

もしあなたが [Unit testing guide](/docs/unit-testing) に取り組んだのならば、あなたのプロジェクトの root には `jest-preprocess.js` があるでしょう。そのファイルを開いて、プラグインを追加してください。

```diff:title=jest-preprocess.js
const babelOptions = {
  presets: ["babel-preset-gatsby"],
+  plugins: [
+    "emotion",
+  ],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
```

Jest にシリアライザーを使用するよう教えるために、あなたは `setup-test-env.js` というファイルを作る必要があります。これはテスト前に毎回自動的に実行されます。プロジェクトの root に `setup-test-env.js` を作り、以下のコードを追加してください。

```js:title=setup-test-env.js
import { createSerializer } from "jest-emotion"
import * as emotion from "@emotion/core"

expect.addSnapshotSerializer(createSerializer(emotion))
```

最後に、Jest にこのファイルがどこにあるかを教える必要があります。 `package.json` を開いて、以下のように `"jest"` の場所に追加してください。

```json:title=package.json
"jest": {
  "setupFilesAfterEnv": [`<rootDir>/setup-test-env.js`]
}
```

## 使い方

この例では、`react-test-renderer` を使いますが、 [@testing-library/react](/docs/testing-react-components) など他の適切なライブラリーも使用できます。 `setup-test-env.js` を作ったことにより、あなたの慣れた書き方と同じように単体テストを書くことができます。しかも今やスタイルの情報まで確認できます！

```js:title=src/components/Button.test.js
import React from "react"
import styled from "react-emotion"
import renderer from "react-test-renderer"

const Button = styled.div`
  color: hotpink;
`

test("Button renders correctly", () => {
  expect(
    renderer.create(<Button>This is hotpink.</Button>).toJSON()
  ).toMatchSnapshot()
})
```

スナップショットの結果はこのようになります。

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Button renders correctly 1`] = `
.emotion-0 {
  color: hotpink;
}

<div
  className="emotion-0 emotion-1"
>
  This is hotpink.
</div>
`
```

もしあなたの styled component が `ThemeProvider` を通して `theme` に依存しているなら、あなたには 2 つの選択があります。

- 全てのコンポーネントを `ThemeProvider` でラップする選択
- ライブラリーの API を使う選択（ライブラリのドキュメントを見てください。 [styled-components](https://github.com/styled-components/jest-styled-components#theming) または [emotion](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming#createbroadcast-function))

そして、これこそがスナップショットテストが本当に役立つ時なのです。もしあなたがテーマファイルの主要な色を変更しても、あなたはどのコンポーネントが影響を受けたのか分かります。これにより、コンポーネントに対する意図しないスタイルの変化を見逃すことはありません。

この例は上記の最初の選択を使用しています。

```js:title=src/components/Wrapper.test.js
import React from "react"
import { ThemeProvider } from "emotion-theming"
import renderer from "react-test-renderer"

const theme = {
  maxWidth: "1450px",
}

const Wrapper = styled.section`
  max-width: ${props => props.theme.maxWidth};
`

test("Wrapper renders correctly", () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={theme}>
          <Wrapper>Content.</Wrapper>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot()
})
```

スナップショットの結果はこのようになります。

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Wrapper renders correctly 1`] = `
.emotion-0 {
  max-width: 1450px;
}

<section
  className="emotion-0 emotion-1"
>
  Content
</div>
`
```
