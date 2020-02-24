---
title: フォームの追加
---

Gatsby は React 上に作られています。そのため、React フォームで可能なことは全て Gatsby でも実現出来ます。 React フォームの作成方法に関する詳細は、[React フォームのドキュメント](https://ja.reactjs.org/docs/forms.html)で見つけられます（このドキュメントは Gatsby で作られています！）。

次のページから始めます。

```jsx:title=src/pages/index.js
import React from "react"

export default () => <div>Hello world!</div>
```

この Gatsby ページは React コンポーネントです。フォームを作りたい場合は、ユーザーが入力したフォームの状態を保存する必要があります。そのため、ステートレスな関数コンポーネントをステートフルなクラスコンポーネントに変換します。

```jsx:title=src/pages/index.js
import React from "react"

export default class IndexPage extends React.Component {
  render() {
    return <div>Hello world!</div>
  }
}
```

クラスコンポーネントを作成したので、`state` をコンポーネントに追加します。

```jsx:title=src/pages/index.js
import React from "react"

export default class IndexPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  render() {
    return <div>Hello world!</div>
  }
}
```

いくつかの入力フィールドを追加します。

```jsx:title=src/pages/index.js
import React from "react"

export default class IndexPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  render() {
    return (
      <form>
        <label>
          First name
          <input type="text" name="firstName" />
        </label>
        <label>
          Last name
          <input type="text" name="lastName" />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

ユーザーが入力ボックスに入力すると、状態が更新されます。`onChange` プロパティを追加して状態を更新し、`value` プロパティを追加して入力の状態を最新に保ちます。

```jsx:title=src/pages/index.js
import React from "react"

export default class IndexPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

これで入力が機能するようになったので、フォームの送信に応じて何かを起動したくなるでしょう。`onSubmit` プロパティをフォーム要素に追加して、 `handleSubmit` でユーザーが送信ボタンを押した時にアラートが表示されるようにしましょう。

```jsx:title=src/pages/index.js
import React from "react"

export default class IndexPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    alert(`Welcome ${this.state.firstName} ${this.state.lastName}!`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

このフォームは、入力されたユーザー情報を表示する以外は何もしません。この時点で、このフォームをコンポーネントに移動したり、フォームの状態をバックエンドサーバーに送信したり、堅牢なバリデーションを追加したり出来ます。また、[Formik](https://github.com/jaredpalmer/formik) や、[Final Form](https://github.com/final-form/react-final-form) などの素晴らしい React ライブラリーを使用して開発プロセスをスピードアップすることも出来ます。

Gatsby のパワーと React のエコシステムを活用することで、これらすべてが実現可能です！
