---
title: 404ページを追加する
---

<<<<<<< HEAD
404 ページは、パスの正規表現が `^\/?404\/?$`（`/404/`、`/404`、`404/`、もしくは `404`）に一致するページです。
Gatsby では、`src/pages/404.js` に React コンポーネントページを実装することで、404 ページが作成されます。

一般的な静的ホスティングプラットフォームが 404 エラーページとして使っている `404.html` と同様に、Gatsby は 404 ページをビルドします。
もしあなたが Gatsby 以外の方法でサイトをホストしている場合は、404 エラーに対してこのファイルが返されるようカスタムルールを設定する必要があるでしょう。

Gatsby は初期設定でこのページを自動的に作成するため、`gatsby-node.js` であらためて設定する必要はありません。

`gatsby develop` を使って開発しているときは、Gatsby はあなたの作成した 404 ページではなくデフォルト 404 ページを優先して表示します。
ここで、「Preview custom 404 page」をクリックすることであなたが作成した 404 ページをプレビューでき、思ったとおりに動作しているかを確認できます。
ここで使用可能なすべてのページを確認できるため、開発しているときに便利です。

次のスクリーンショットは、Gatsby が自動的に生成するデフォルト 404 ページです。
また、ここにあなたの作成したすべてのページが一覧で表示されます。
「Preview custom 404 page」ボタンをクリックすると、あなたの作成した 404 ページが表示されます。
![Gatsby デフォルト 404 ページ](./images/gatsby-default-404.png)
=======
To create a 404 page create a page whose path matches the regex `^\/?404\/?$` (`/404/`, `/404`, `404/` or `404`). Most often you'll want to create a React component page at `src/pages/404.js`.

Gatsby ensures that your 404 page is built as `404.html` as many static hosting platforms default to using this as your 404 error page. If you're hosting your site another way you'll need to set up a custom rule to serve this file for 404 errors.

Because Gatsby creates this page for you by default, there is no need to configure it in your `gatsby-node.js` file.

When developing using `gatsby develop`, Gatsby uses a default 404 page that overrides your custom 404 page. However, you can still preview your 404 page by clicking "Preview custom 404 page" to verify that it's working as expected. This is useful when you're developing so that you can see all the available pages.

The screenshot below shows the default 404 page that Gatsby creates. It also lists out all the pages on your website. Clicking the "Preview custom 404 page" button will allow you to view the 404 page you created.
![Gatsby Default 404 Page](./images/gatsby-default-404.png)
>>>>>>> 79b09bc29f133961f3d7de0f36a25ff727e6c22a

次のスクリーンショットはカスタム 404 ページです。
![Gatsby カスタム 404 ページ](./images/gatsby-custom-404.png)
