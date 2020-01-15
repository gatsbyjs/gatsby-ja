---
title: ユーザー認証を使用したサイトの作成
---

往々にして、認証されたユーザーのみが閲覧可能なコンテンツを含むサイトを構築しないといけないことがあります。Gatsby なら、[クライアントサイドルーティング](/docs/client-only-routes-and-user-authentication/)を用いてユーザーがログイン後にのみ閲覧できるページを作成できます。

## 前提条件

事前に `gatsby-cli` を使用できるように環境を設定しておく必要があります。設定の仕方に関しては、[メインチュートリアル](/tutorial)を参照しましょう。

## セキュリティー通知

プロダクション環境では、テスト済みで堅牢な認証ソリューションを使用すべきでしょう。[Auth0](https://www.auth0.com)、[Firebase](https://firebase.google.com)、[Passport.js](http://passportjs.org) は良い例です。このチュートリアルでは認証ワークフローのみを扱いますが、アプリのセキュリティーに関してはできる限り慎重に取り扱う必要があります。

## Gatsby アプリの構築

`hello-world` スターターを使用して新しい Gatsby プロジェクトを作成することから始めましょう。

```shell
gatsby new gatsby-auth gatsbyjs/gatsby-starter-hello-world
cd gatsby-auth
```

まずはリンクを含む新しいコンポーネントを作成します。この段階では、プレースホルダーとして振る舞います。

```jsx:title=src/components/nav-bar.js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <span>ログインしていません</span>

    <nav>
      <Link to="/">ホーム</Link>
      {` `}
      <Link to="/">プロフィール</Link>
      {` `}
      <Link to="/">ログアウト</Link>
    </nav>
  </div>
)
```

次に、すべてのページをラップしてナビゲーションバーを表示するレイアウトコンポーネントを作成します。

```jsx:title=src/components/layout.js
import React from "react"

import NavBar from "./nav-bar"

const Layout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

export default Layout
```

最後に、レイアウトコンポーネントを使用するようにインデックスページを変更します。

```jsx:title=src/pages/index.js
import React from "react"

import Layout from "../components/layout" // highlight-line

// highlight-start
export default () => (
  <Layout>
    <h1>Hello world!</h1>
  </Layout>
)
// highlight-end
```

## 認証サービス

このチュートリアルでは、ハードコーディングされたユーザー/パスワードを使用します。`src/services`フォルダーを作成し、`auth.js` ファイルに次のコードを追加しましょう。

```javascript:title=src/services/auth.js
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `ジョニー`,
      email: `johnny@example.org`,
    })
  }

  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
```

_Gatsby を外部サービスに接続する方法については、[認証の追加](/docs/building-a-site-with-authentication/)に関するガイドを参照してください。_

## クライアントサイドルーティングの作成

このチュートリアルの最初に、"hello world" Gatsby サイトを作成しました。これには、`@reach/router` ライブラリーが含まれています。ここでは、[@reach/router](https://reach.tech/router/) ライブラリーを使用して、ログインユーザーのみが利用できるルートを作成しましょう。このライブラリーは Gatsby 内部で使用されているので、インストールする必要はありません。

最初に、プロジェクトのルートディレクトリーに `gatsby-node.js` を作成します。`/app/` で始まるルートのページが制限され、クライアントサイドで動的に生成されるよう定義します。

```javascript:title=gatsby-node.js
// Gatsby の “onCreatePage” API を実装します。
// この API はすべてのページが生成されたあとに呼び出されます。
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath は特別なキーで、
  // マッチしたページはクライアントサイドのみで生成されます。
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // ページの更新
    createPage(page)
  }
}
```

> ヒント: 上記と同等の機能を提供してくれる便利なプラグインがあります: [gatsby-plugin-create-client-paths](/packages/gatsby-plugin-create-client-paths)

続いて、制限されたコンテンツを生成するページを作成しましょう。

```jsx:title=src/pages/app.js
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      <Profile path="/app/profile" />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
```

次に、これらの新しいルートに対応するコンポーネントを追加します。まずはユーザーデータを表示するプロフィールコンポーネントを追加しましょう。

```jsx:title=src/components/profile.js
import React from "react"

const Profile = () => (
  <>
    <h1>あなたのプロフィール</h1>
    <ul>
      <li>名前: あなたの名前がここに表示されます</li>
      <li>メールアドレス: あなたのメールアドレスがここに表示されます</li>
    </ul>
  </>
)

export default Profile
```

続いて追加するログインコンポーネントは、ご想像のとおり、ログインプロセスを処理します。

```jsx:title=src/components/login.js
import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }

    return (
      <>
        <h1>ログイン</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >
          <label>
            ユーザー名
            <input type="text" name="username" onChange={this.handleUpdate} />
          </label>
          <label>
            パスワード
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login
```

この段階においてルーティングは機能していますが、制限なしですべてのルートにアクセスできてしまいます。

## プライベートルートの制御

ユーザーがコンテンツにアクセスできるかどうかをチェックするためには、制限するコンテンツを PrivateRoute コンポーネントでラップします。

```jsx:title=src/components/privateRoute.js
import React, { Component } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
```

PrivateRoute コンポーネントを使用するようにルーターを変更しましょう。

```jsx:title=src/pages/app.js
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute" // highlight-line
import Profile from "../components/profile"
import Login from "../components/login"

const App = () => (
  <Layout>
    <Router>
      {/* highlight-next-line */}
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)

export default App
```

## 新しいルートとユーザーデータを使用するためのリファクタリング

ユーザーデータを利用するように、クライアントサイドルーティングを定義しているファイルをリファクタリングしましょう。

ナビゲーションバーには、ユーザー名とログアウトのリンクが表示されます。

```jsx:title=src/components/nav-bar.js
import React from "react"
import { Link, navigate } from "gatsby" // highlight-line
import { getUser, isLoggedIn, logout } from "../services/auth" // highlight-line

// highlight-start
export default () => {
  const content = { message: "", login: true }
  if (isLoggedIn()) {
    content.message = `こんにちは、${getUser().name}さん`
  } else {
    content.message = "ログインしていません。"
  }
  return (
    // highlight-end
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{content.message}</span> {/* highlight-line */}
      <nav>
        <Link to="/">ホーム</Link>
        {` `}
        <Link to="/app/profile">プロフィール</Link> {/* highlight-line */}
        {` `}
        {/* highlight-start */}
        {isLoggedIn() ? (
          <a
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/app/login`))
            }}
          >
            ログアウト
          </a>
        ) : null}
        {/* highlight-end */}
      </nav>
    </div>
  )
} // highlight-line
```

インデックスページは、ログイン状態に応じてログインまたはプロフィールページへのリンクを表示します。

```jsx:title=src/pages/index.js
import React from "react"
import { Link } from "gatsby" // highlight-line
import { getUser, isLoggedIn } from "../services/auth" // highlight-line

import Layout from "../components/layout"

export default () => (
  <Layout>
    {/* highlight-start */}
    <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
    <p>
      {isLoggedIn() ? (
        <>
          あなたはログインしています。
          <Link to="/app/profile">プロフィール</Link>をチェックしましょう。
        </>
      ) : (
        <>
          制限されたコンテンツを閲覧するには、
          <Link to="/app/login">ログイン</Link>してください。
        </>
      )}
    </p>
    {/* highlight-end */}
  </Layout>
)
```

また、プロフィールにはユーザーデータが表示されます。

```jsx:title=src/components/profile.js
import React from "react"
import { getUser } from "../services/auth" // highlight-line

const Profile = () => (
  <>
    <h1>あなたのプロフィール</h1>
    <ul>
      {/* highlight-start */}
      <li>名前: {getUser().name}</li>
      <li>メールアドレス: {getUser().email}</li>
      {/* highlight-end */}
    </ul>
  </>
)

export default Profile
```

これで、ログインとユーザー制限エリアを持った認証ワークフローができました！

## 関連する記事

プロダクション利用可能な認証ソリューションの使用についてさらに学びたい場合は、以下のリンクが役立つでしょう。

- [Gatsby リポジトリのシンプルな認証サンプル](https://github.com/gatsbyjs/gatsby/tree/master/examples/simple-auth)
- React Context API を使用して認証処理を行う [Gatsby メール _アプリケーション_](https://github.com/DSchau/gatsby-mail)
- [景品や Gatsby グッズの Gatsby ストア](https://github.com/gatsbyjs/store.gatsbyjs.org)
- [Gatsby、React、Webtask.io でブログを構築しよう！](https://auth0.com/blog/building-a-blog-with-gatsby-react-and-webtask/)
- [JAMstack PWA — Gatsby.js、Firebase、Styled-components で投票アプリをつくろう パート 2](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-2-9044534ea6bc)
- [JAMstack Hackathon Starter - Netlify Identity を使用した認証機能付き Gatsby アプリスターター](/starters/sw-yx/jamstack-hackathon-starter)
- [Learn With Jason Livestream: Netlify Identity および Netlify Functions の使い方 (with Shawn Wang)](https://www.youtube.com/watch?v=vrSoLMmQ46k&feature=youtu.be)
