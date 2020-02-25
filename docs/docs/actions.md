---
title: アクション
description: Gatsbyの状態管理に役立つアクションのドキュメント
jsdoc:
  - "gatsby/src/redux/actions/public.js"
  - "gatsby/src/redux/actions/restricted.js"
contentsHeading: Functions
---

Gatsby は [Redux](http://redux.js.org) を内部的に使用して状態を管理しています。あなたのサイトで Gatsby API を実装するとアクションのコレクション（Redux の [bindActionCreators](https://redux.js.org/api/bindactioncreators/) でバインドされるアクションと同等）が渡され、状態管理に使用できます。

`actions` のオブジェクトに含まれる各関数は、ES6 のオブジェクトの分割代入で個別に抽出できます。

```javascript
// createNodeField 関数の場合
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
}
```
