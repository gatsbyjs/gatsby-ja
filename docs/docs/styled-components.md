---
title: Styled Components
---

このガイドでは、CSS-in-JS ライブラリーである [Styled Components](https://www.styled-components.com/) を使用してサイトをセットアップする方法を学習します。

Styled Components ではコンポーネント内で実際の CSS 構文を使用できます。 Styled Components は「CSS-in-JS」の変種であり、従来の CSS の問題の多くを解決します。

Styled Components が解決するもっとも重要な問題の 1 つはセレクター名の衝突です。従来の CSS では、全ての CSS セレクターが同じグローバル名前空間に存在するため、サイト内の他の場所で使用されている CSS セレクターを上書きしないように注意する必要があります。この残念な制約により、セレクターの命名規則が複雑になります（そしてしばしば混乱を招きます）。

CSS-in-JS を使用すると、CSS セレクターがコンポーネント内に自動的にスコープされるため、CSS の問題全てを回避できます。スタイルはコンポーネントと密接に結びついています。これにより、CSS がどこでどのように使用されているかについての混乱が生じないため、コンポーネントの CSS を編集する方法がはるかに知りやすくなります。

<EggheadEmbed
  lessonLink="https://egghead.io/lessons/gatsby-style-gatsby-sites-with-styled-components"
  lessonTitle="Style Gatsby sites with styled-components"
/>

まず、新しいターミナルウィンドウを開き、次のコマンドを実行して新しいサイトを作成します。

```shell
gatsby new styled-components-tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
cd styled-components-tutorial
```

次に、Gatsby プラグインを含む `styled-components` に必要な依存関係をインストールします。

```shell
npm install --save gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

さらに、サイト内の `gatsby-config.js` にインストールしたプラグインを追記します。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
}
```

そして、ターミナルで `gatsby develop` を実行して Gatsby の開発用サーバーを起動します。

最後に、`src/pages/index.js` に Styled Components を使用してサンプルページを作成します。

```jsx:title=src/pages/index.js
import React from "react"
import styled from "styled-components"

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
  margin: 0 auto 12px auto;
  &:last-child {
    margin-bottom: 0;
  }
`

const Avatar = styled.img`
  flex: 0 0 96px;
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
    <h1>About Styled Components</h1>
    <p>Styled Components is cool</p>
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

## グローバルスタイルの作成

Styled Components は、主に他のコンポーネントから分離された単一の CSS クラスに使用されます。場合によっては、`body` 要素のデフォルトのマージンなどといったグローバルスタイルを無効したいこともあるでしょう。安心してください。Styled Components は `createGlobalStyle` を使用してグローバルスタイルを設定できます。[レイアウトコンポーネント](/docs/layout-components/) を作成する場合は `createGlobalStyle` を使用することをお勧めします。これは単一のページではなく、複数のページで共有されます。

次の例は、`styled-components` から `createGlobalStyle` をインポートして、クローバルの要素に紫色を適用する `GlobalStyle` コンポーネント（Styled Component）を作成する方法を示しています。

```jsx:title=src/components/layout.js
import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.theme === "purple" ? "purple" : "white")};
  }
`
export default ({ children }) => (
  <React.Fragment>
    <GlobalStyle theme="purple" />
  </React.Fragment>
)
```

## 不変なクラス名によるユーザースタイルシートの有効化

Styled Components に不変な CSS のクラス名（`className`）を割り当てると、ウェブサイトのエンドユーザーが、アクセシビリティ確保を目的とした[ユーザースタイルシート](https://www.viget.com/articles/inline-styles-user-style-sheets-and-accessibility/)の利用がしやすくなります。

これは、Styled Components によって動的に生成されたクラス名と、`container` クラス名が DOM に割り当てられる例です。

```jsx:title=src/components/container.js
import React from "react"
import styled from "styled-components"

const Section = styled.section`
  margin: 3rem auto;
  max-width: 600px;
`

export default ({ children }) => (
  <Section className={`container`}>{children}</Section>
)
```

サイトのエンドユーザーは、`.container` クラス名を使用して、HTML 要素に対応する[独自の CSS スタイルを記述](https://mediatemple.net/blog/tips/bend-websites-css-will-stylish-stylebot/)できます。 CSS-in-JS のスタイルを変更しても、エンドユーザーのスタイルシートには影響しません。

```css:title=user-stylesheet.css
.container {
  margin: 5rem auto;
  font-size: 1.3rem;
}
```
