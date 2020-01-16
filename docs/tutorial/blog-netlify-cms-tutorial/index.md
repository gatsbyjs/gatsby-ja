---
title: Netlify CMS で Gatsby ブログを作成する
---

https://youtu.be/JeTqxCJC56Q

このチュートリアルでは、公式の [gatsby-starter-blog](/starters/gatsbyjs/gatsby-starter-blog/) をベースとした [gatsby-personal-starter-blog](http://t.wang.sh/gatsby-personal-starter-blog) スターターを使用します。`gatsby-personal-starter-blog` は `/blog` サブディレクトリーでブログを動作させるように設定されているという点と、コンテンツ編集のために [Netlify CMS](https://www.netlifycms.org/) があらかじめインストールされているという点が異なります。

## 前提条件

- GitHub アカウントを持っていること
- [Gatsby CLI](/docs/gatsby-cli) をインストールしていること

## 5 ステップで Netlify CMS で管理された Gatsby サイトを設定する:

### ステップ 1

ターミナルを開き、以下の Gatsby CLI コマンドを実行して [gatsby-personal-starter-blog](http://t.wang.sh/gatsby-personal-starter-blog) を使用したサイトを新規作成します。

```shell
gatsby new [your-project-name] https://github.com/thomaswangio/gatsby-personal-starter-blog
```

### ステップ 2

Gatsby サイトのパッケージや依存関係がすべてインストールされたら、作成されたディレクトリーに移動し、サイトをローカルで実行します。

```shell
cd [your-project-name]
gatsby develop
```

これであなたは [`localhost:8000`](http://localhost:8000) から作成されたサイトを見ることができるようになるだけでなく、Netlify CMS がプリインストールされ、[`localhost:8000/admin`](http://localhost:8000/admin) からアクセスできるようになりました。

コンテンツマネジメントシステム（CMS）は便利です。あなたは Markdown を使い手動でブログポストなどのコンテンツを追加する代わりに、それらをサイト上のダッシュボードから追加できます。もしかすると、あなたは CMS をローカルだけでなく開発したウェブサイト上からも使いたくなるかもしれません。それを実現するためには、GitHub を通して Netlify にデプロイし、継続的デプロイを設定し、いくつかの設定を変更する必要があります。こちらについては [ステップ 5](#ステップ-5) をご覧ください。

### ステップ 3

コードエディターでプロジェクトを開き、 `static/admin/config.yml` を開いてください。 `your-username/your-repo-name` をあなたの GitHub のユーザー名とプロジェクト名に置き換えてください。このステップは Netlify CMS インターフェースを管理・デプロイするために重要です。

```diff
backend:
-  name: test-repo

+  name: github
+  repo: your-username/your-repo-name
```

#### あなたのサイトをカスタマイズする

`gatsby-config.js` を変更することで、サイトのメタデータ、Google アナリティクスのトラッキング ID や icon/favicon を設定できます。編集がビルドに与える変更を確認するためには、開発サーバーを終了し、 `gatsby build && gatsby serve` を実行してください。

また、 `README.md` や `package.json` を編集することでプロジェクトの詳細情報を含めることもできます。

### ステップ 4

[github.com](http://github.com) にアクセスし、あなたのプロジェクトと同じ名前のリポジトリーを作成してください。以下のコマンドを使い、あなたの Gatsby サイトのコードを GitHub に push してください。

```shell
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/[your-username]/[your-repo-name].git
git push -u origin master
```

その後 [app.netlify.com](http://app.netlify.com) にアクセスし、"New site from Git" ボタンをクリックしてください。先ほど作成したリポジトリーを選択し、デフォルトの開発設定のまま "Deploy site" をクリックしてください。

> \_Note: もしあなたのリポジトリーがリストに現れない場合、GitHub 上の Netlify アプリケーションをインストールもしくは再設定する必要があるかもしれません。

![Netlify Dashboard for Creating a new site](netlify-dashboard.png)

### ステップ 5

Netlify CMS が GitHub リポジトリーにアクセスできることを確認するためには、GitHub 上で OAuth アプリケーションを設定する必要があります。手順については [Netlify's Using an Authorization Provider](https://www.netlify.com/docs/authentication-providers/#using-an-authentication-provider) を参照してください。

"Homepage URL" について - あなたは自分の Netlify のサブドメイン（`[name-of-your-site].netlify.com`）を使用するか、カスタムドメインを使用することが出来ます。サブドメインをカスタマイズするためには、[Netlify app](https://app.netlify.com) 上のプロジェクト内の "Domain Management" 内にある "Edit site name" から行います。サブドメインの代わりにカスタムドメインを Netlify サイトと結びつける方法については [Netlify’s instructions on custom domains](https://www.netlify.com/docs/custom-domains/) を参照してください。

一度認証プロバイダーの設定を完了すれば、デプロイされたサイト上で Netlify CMS を使用して新しい記事を追加できるようになります。

![Netlify and GitHub Authorization](https://cdn.netlify.com/67edd5b656c432888d736cd40125cb61376905bb/c1cba/img/docs/github-oauth-config.png)

[GitHub OAuth Apps](https://github.com/settings/developers) のリストからあなたのアプリの資格情報をコピーし、それを使って認証プロバイダーを Netlify 上に作成してください。

![Setting up access control](netlify-install-oauth-provider.png)

#### Netlify CMS や GitHub、Netlify Workflow を使用する利点

おめでとうございます！これで Netlify CMS がプロジェクトに正しく設定されました。Netlify CMS は Git をベースとしているため、新しい記事を作成するたびに、そのコンテンツは GitHub 上のリポジトリーに保存されます。また、 [Netlify's Continuous Deployment](https://www.netlify.com/docs/continuous-deployment/) のおかげで、あなたが記事を追加したり編集したりするたびに、最新のバージョンが自動でデプロイされることになります。

Netlify CMS の詳しい情報と設定方法については、[Netlify CMS documentation](https://www.netlifycms.org/docs/intro/) で学ぶことができます。
