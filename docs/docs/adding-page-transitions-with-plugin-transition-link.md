---
title: gatsby-plugin-transition-link によるページ遷移の追加
---

このガイドでは、`gatsby-plugin-transition-link` を使用して、Gatsby サイトのページ遷移をアニメーション化する方法を説明します。

## 概要

`TransitionLink` コンポーネントは、Link コンポーネントのプロパティを介して、ページ遷移を記述する方法を提供します。これは [react-pose](https://popmotion.io/pose/)、[gsap](https://greensock.com/)、[animejs](https://animejs.com/) などの多くのアニメーションライブラリーで動作します。

現在のところ、プラグインはリンクナビゲーションをベースにしているため、ブラウザボタンでの遷移はサポートされていません。

その他のページ遷移オプションについては、[ページアニメーションの追加に関する概要](/docs/adding-page-transitions)をご覧ください。

## はじめに

まず、プラグインをインストールします。

```shell
npm install --save gatsby-plugin-transition-link
```

そして、`gatsby-config.js` にプラグインを追加します。

```javascript:title=gatsby-config.js
module.exports = {
    plugins: [
      `gatsby-plugin-transition-link`
    ]
];
```

最後に、`TransitionLink` を使用するコンポーネントにインポートします。

```javascript
import TransitionLink from "gatsby-plugin-transition-link"
```

## 定義済みの遷移

`AniLink` コンポーネントを使用することで、独自のカスタム遷移を定義することなく、ページ遷移を追加できます。これは `TransitionLink` のラッパーで、`fade`、`swipe`、`cover`、`paintDrip`といった 4 つのあらかじめ定義された遷移を提供します。[こちらのデモサイト](https://gatsby-plugin-transition-link.netlify.com/)でプレビューできます。

AniLink を利用するためには、 `gsap` アニメーションライブラリをインストールする必要があります。

```shell
npm install --save gsap
```

次に、AniLink コンポーネントをインポートします。

```jsx
import AniLink from "gatsby-plugin-transition-link/AniLink"
```

最後に、利用したいアニメーション名を空のプロパティとして `AniLink` に指定してください。

```jsx
<AniLink paintDrip to="page-4">
  Go to Page 4
</AniLink>
```

遷移に掛かる時間や遷移の方向などのオプションはプロパティによりカスタマイズできます。詳細は[AniLink のドキュメント](https://transitionlink.tylerbarnes.ca/docs/anilink/)をご覧ください。

## カスタム遷移

ページ遷移を作成する方法は、次の 2 つがあります。

1. `exit`/`entry` プロパティに定義された `trigger` 関数を使用します。詳細は「[`trigger` 関数を使う](#using-the-trigger-function)」のサブセクションをご覧ください。

2. `TransitionLink` から渡されたプロパティを使用して遷移を定義します。詳細は「[渡されたプロパティを使う](#using-passed-props)」のサブセクションをご覧ください。

さらに、`TransitionLink` コンポーネントでは `length` や `delay` のような様々なプロパティやオプションを指定できます。オプションの詳細は [TransitionLink のドキュメント](https://transitionlink.tylerbarnes.ca/docs/transitionlink/)をご覧ください。その他の使用例は [プラグインの GitHub リポジトリー](https://github.com/TylerBarnes/gatsby-plugin-transition-link)をご覧ください。

### トリガー関数を使う

アニメーションを処理する `trigger` 関数を指定できます。これは、[animejs](https://animejs.com/) や [GSAP](https://greensock.com/gsap)といった関数呼び出しでアニメーションを指定する _命令型_ アニメーションライブラリーに役立ちます。

```jsx
<TransitionLink
  exit={{
    length: length,
    // highlight-next-line
    trigger: ({ exit, node }) =>
      this.someCustomDefinedAnimation({ exit, node, direction: "out" }),
  }}
  entry={{
    length: 0,
    // highlight-next-line
    trigger: ({ exit, node }) =>
      this.someCustomDefinedAnimation({ exit, node, direction: "in" }),
  }}
  {...props}
>
  {props.children}
</TransitionLink>
```

### 渡されたプロパティを使う

遷移に関する開始と終了のページ／テンプレートでは、現在の遷移状態を示すプロパティーと `TransitionLink` で定義された `enter` または `exit`プロパティーを受け取ります。

```jsx
const PageOrTemplate = ({ children, transitionStatus, entry, exit }) => {
  console.log(transitionStatus, entry, exit)
  return <div className={transitionStatus}>{children}</div>
}
```

これらのプロパティを [react-pose](https://popmotion.io/pose/) や [react-spring](http://react-spring.surge.sh/) のような _宣言的_ ステートベースのアニメーションライブラリーと組み合わせることで、ページ遷移の開始や終了を指定できます。

ページ／テンプレートの代わりに、コンポーネントでこれらのプロパティにアクセスする場合は、 `TransitionState` コンポーネントでコンポーネントをラップする必要があります。このコンポーネントは上記と同じプロパティにアクセスするための関数を受けとり、使用することができます。

ここでは `TransitionState` と `react-pose` を使用して `Box` コンポーネントに遷移の開始／終了をトリガーする例を示します。

```jsx
import { TransitionState } from "gatsby-plugin-transition-link"

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

<TransitionState>
      {({ transitionStatus, exit, enter, mount }) => {
        console.log("current page's transition status is", transitionStatus)
        console.log("exit object is", exit)
        console.log("enter object is", enter)

        return (
            <Box
              className="box"
              pose={
                mount // this is true while the page is mounting or has mounted
                  ? 'visible'
                  : 'hidden'
              }
            />
        )
      }}
</TransitionState>
```

これで、`Box` コンポーネントは、子ページのマウント／アンマウントに応じてフェードイン／フェードアウトします。

## ページ遷移から要素を除外する

ページ遷移の全体を通して持続する要素（たとえば、サイト全体のヘッダー）が必要な場合もあります。これは、 `gatsby-config.js` で次のプラグインオプションを使用して、持続的なレイアウトコンポーネントの要素をラップすることで実現できます。

```javascript
module.exports = {
    plugins: [
       {
          resolve: "gatsby-plugin-transition-link",
          options: {
              layout: require.resolve(`./src/components/Layout.js`)
            }
       }
    ]
];
```

いつものように、詳細は[インストールのドキュメント](https://transitionlink.tylerbarnes.ca/docs/transitionportal/)をご覧ください。

## 参考文献

- [公式ドキュメント](https://transitionlink.tylerbarnes.ca/docs/)
- [プラグインのソースコード](https://github.com/TylerBarnes/gatsby-plugin-transition-link)
- [デモサイト](https://gatsby-plugin-transition-link.netlify.com/)
- [ブログ記事: 「TransitionLink を用いたリンクごとの Gatsby のページ遷移」](/blog/2018-12-04-per-link-gatsby-page-transitions-with-transitionlink/)
- [react-spring を用いた transition-link の使用](https://github.com/TylerBarnes/gatsby-plugin-transition-link/issues/34)
