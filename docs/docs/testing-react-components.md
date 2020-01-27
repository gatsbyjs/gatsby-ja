---
title: Reactコンポーネントのテスト
---

_推奨されるテストレームワークは [Jest](https://jestjs.io/) です。このガイドでは、[ユニットテスト](/docs/unit-testing)のガイドに従って Jest がセットアップ済みであることを前提としています。_

Kent C. Dodds により作成された [@testing-library/react](https://github.com/testing-library/react-testing-library) はリリース以降人気が高まっており、[enzyme](https://github.com/airbnb/enzyme) に代わる優れた代替ライブラリーです。ユニットテストと結合テストを作成できます。また、ユーザーと同じ方法で DOM 要素の指定をすることを推奨しています。したがって、指針となる原則は：

> あなたのテストがソフトウェアの使用方法に似ているほど、テストの信頼性が高まる。

`react-dom` と `react-dom/test-utils` の上に軽量のユーティリティー関数を提供し、（機能ではなく）実装に関するコンポーネントのリファクタリングでテストが壊れないようにしてくれます。

## インストール

テストライブラリをプロジェクトの `devDependencies` の 1 つとしてインストールします。オプションで、`jest-dom` をインストールし、[カスタム jest マッチャー](https://github.com/testing-library/jest-dom#custom-matchers)として使用することもできます。

```shell
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

プロジェクトのルートに `setup-test-env.js` ファイルを作成します。下記のコードを挿入します：

```js:title=setup-test-env.js
import "@testing-library/jest-dom/extend-expect"
```

このファイルは、各テストが実行される前に Jest によって自動的に実行されるため、すべてのテストファイルに上記のインポートを追加する必要はありません。

最後に、Jest にこのファイルの場所を設定する必要があります。`jest.config.js` を開き、`setupFiles` の下に設定を追加します。

```js:title=jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
}
```

## 使い方

新しく追加されたライブラリーを使用して、小さなサンプルテストを作成しましょう。[ユニットテストのガイド](/docs/unit-testing)をまだ読んでいない場合は、原則的には `react-test-renderer` の代わりに `@testing-library/react` を使用するようにしましょう。セレクターに関しては多くのオプションがあります。この例では、`getByTestId` をセレクターとして選択します。また、`jest-dom` の `toHaveTextContent` を利用します。

```js
import React from "react"
import { render } from "@testing-library/react"

// You have to write data-testid
const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

test("Displays the correct title", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})
```
