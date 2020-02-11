---
title: Emotion
---

このガイドでは、CSS-in-JS のライブラリーである [Emotion](https://emotion.sh) をサイトに導入する方法を学びます。

Emotion は高パフォーマンスで柔軟性のある CSS-in-JS のライブラリーです。他の多くの CSS-in-JS のライブラリーに影響を受けており、文字列でもオブジェクトでも簡単にスタイルをあてられます。また、CSS 特有の問題を解決するために、分かりやすい構成にできます。Emotion はソースマップとラベルの機能によってとても開発がしやすく、キャッシュの有効活用によって運用時も高いパフォーマンスを発揮します。

Emotion は[サーバーサイドレンダリング](https://emotion.sh/docs/ssr)でも動作します。追加の設定なしに React の `renderToString` 関数や `renderToNodeStream` 関数を直接使用できます。Emotion の `extractCritical` 機能は使用されていないスタイルを削除しページの読み込みを高速化します。

まず、新しいターミナルウィンドウを開き、次のコマンドを実行して新しいサイトを作成します。

```shell
gatsby new emotion-tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
```

次に、Emotion と Gatsby に必要なプラグインをインストールします。

```shell
npm install --save gatsby-plugin-emotion @emotion/core @emotion/styled
```

さらに、インストールしたプラグインを `gatsby-config.js` に追加します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```

ターミナルで `npm start` を実行し、Gatsby の開発サーバーを起動してください。

`src/pages/index.js` に Emotion を使用したサンプルページを作成します。

```jsx:title=src/pages/index.js
import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 12px;
  margin-left: auto;
  &:last-child {
    margin-bottom: 0;
  }
`

const Avatar = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 96px;
  width: 96px;
  height: 96px;
  margin: 0;
`

const Description = styled.div`
  flex: 1;
  margin-left: 18px;
  padding: 12px;
`

const Username = styled.h2`
  margin: 0 0 12px 0;
  padding: 0;
`

const Excerpt = styled.p`
  margin: 0;
`
// css prop を使うと、簡潔かつ柔軟にコンポーネントにスタイルをあてられます。 //
const underline = css`
  text-decoration: underline;
`

const User = props => (
  <UserWrapper>
    <Avatar src={props.avatar} alt="" />
    <Description>
      <Username>{props.username}</Username>
      <Excerpt>{props.excerpt}</Excerpt>
    </Description>
  </UserWrapper>
)

export default () => (
  <Container>
    <h1 css={underline}>About Emotion</h1>
    <p>Emotion is uber cool</p>
    <User
      username="Jane Doe"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
      excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
    <User
      username="Bob Smith"
      avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
      excerpt="I'm Bob smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    />
  </Container>
)
```

## Emotion でグローバルスタイルを定義する

まず、[hello world starter](https://github.com/gatsbyjs/gatsby-starter-hello-world) を使用して新たに Gatsby のサイトを作成し、[`gatsby-plugin-emotion`](/packages/gatsby-plugin-emotion/) とその依存関係をインストールします。

```shell
gatsby new global-styles https://github.com/gatsbyjs/gatsby-starter-hello-world
cd global-styles
npm install --save gatsby-plugin-emotion @emotion/core @emotion/styled
```

次に、`gatsby-config.js` を作成し、Emotion のプラグインを追加します。

```js:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```

さらに、`src/components/layout.js` にレイアウトコンポーネントを作成します。

```jsx:title=src/components/layout.js
import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

const Wrapper = styled("div")`
  border: 2px solid green;
  padding: 10px;
`

export default ({ children }) => (
  <Wrapper>
    <Global
      styles={css`
        div {
          background: red;
          color: white;
        }
      `}
    />
    {children}
  </Wrapper>
)
```

そして、`src/pages/index.js` でレイアウトコンポーネントを使用するように変更します。

```jsx:title=src/pages/index.js
import React from "react"
import Layout from "../components/layout"

export default () => <Layout>Hello world!</Layout>
```

`npm run build` を実行すると、先ほどグローバルにインラインで定義したスタイルが `public/index.html` で確認できるはずです。
