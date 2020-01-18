---
title: Gatsby スターター
---

Gatsby CLI ツールでは、**スターター**をインストールできます。これは、コミュニティーによってメンテナンスされ、迅速に開発を開始することを目的とした雛形の Gatsby サイトです。

## スターターのインストール

`gatsby new` コマンドを実行して、雛形のスターターをクローンし、依存関係のインストールして、Git 履歴をクリアします。

### Git リポジトリー URL の使用

新しい Gatsby サイトを作成する場合、オプションで、新しいサイトのベースとなるスターターを指定できます。GitHub、GitLab、Bitbucket といった、Git 公開リポジトリーから取得できます。`[URL_OF_STARTER_GIT_REPO]` から直接取り込むことができます。

```shell
gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GIT_REPO]
```

たとえば、Gatsby スターターブログのある GitHub URL から直接 `blog` ディレクトリーにサイトを作成するには、次のようにします。

```shell
gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
```

これにより、ファイルがダウンロードされ、`npm install` を実行することでサイトの初期化が行われます。

### URL ではなく GitHub ユーザー名とリポジトリーの使用

その他の方法として、GitHub ユーザー名とリポジトリーを指定することもできます。

```shell
gatsby new [SITE_DIRECTORY] [GITHUB_USER_NAME/REPO]
```

`[GITHUB_USER_NAME/REPO]` の使用例を次に示します。

```shell
gatsby new blog gatsbyjs/gatsby-starter-blog
```

ここでまた、ファイルがダウンロードされ、`npm install` を実行することでサイトの初期化が行われます。

カスタムスターターを仕様しない場合、サイトは[デフォルトスターター](https://github.com/gatsbyjs/gatsby-starter-default)から生成されます。

> **ヒント：** GitHub 公開レポジトリから Pull できないエンタープライズレベルの会社で働いている場合でも Gatsby をセットアップできます。詳細については[ドキュメント](/docs/setting-up-gatsby-without-gatsby-new/)を御覧ください。

### ローカルスターターの使用

もう 1 つのオプションは、スターターを含むローカルフォルダーへのパス（相対または絶対パス）を指定することです。

```shell
gatsby new [SITE_DIRECTORY] [LOCAL_PATH_TO_STARTER]
```

`./Code/my-local-starter` というパスが存在することを前提として、例を次に示します。

```shell
gatsby new blog ./Code/my-local-starter
```

## 公式スターター

公式スターターは Gatsby によってメンテナンスされています。

| スターター                                                                                   | デモ/ドキュメント                                            | 使用例               | 特徴                         |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------- | ---------------------------- |
| [gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default)                 | [デモ](https://gatsby-starter-default-demo.netlify.com/)     | ほとんどの場合で適切 | 一般的な Gatsby サイト       |
| [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)                       | [デモ](https://gatsby-starter-blog-demo.netlify.com/)        | 基本的なブログの作成 | ブログ投稿ページとリスト     |
| [gatsby-starter-hello-world](https://github.com/gatsbyjs/gatsby-starter-hello-world)         | [デモ](https://gatsby-starter-hello-world-demo.netlify.com/) | Gatsby を学ぶ        | Gatsby の必須事項            |
| [gatsby-starter-blog-theme](https://github.com/gatsbyjs/gatsby-starter-blog-theme)           | [ドキュメント](/docs/themes/getting-started/)                | ブログの投稿とページ | Gatsby テーマ                |
| [gatsby-starter-theme-workspace](https://github.com/gatsbyjs/gatsby-starter-theme-workspace) | [ドキュメント](/docs/themes/building-themes/)                | Gatsby テーマの構築  | 最小限のテーマワークスペース |

## スターターの変更

Gatsby ドキュメントで[スターターを変更する方法](/docs/modifying-a-starter/)を学んでください。公式およびコミュニティのスターターをそのまま使用できますが、スタイルと機能をカスタマイズすることもできます。

## スターターの作成

Gatsby ドキュメントで[スターターを作成する方法](/docs/creating-a-starter/)を学んでください。スターターはあなたのチーム専用に作成することもできますし、より広くのコミュニティーに配布することもできます。どのようにするかはあなた次第です！

## コミュニティースターター

コミュニティースターターは、Gatsby コミュニティーメンバーによって作成およびメンテナンスされます。

- 特定の目的のスターターをお探しですか？[スターターライブラリー](/starters/)に投稿されたスターターを参照してください。
- 作成したスターターを共有したいですか？スターターライブラリーに[スターターを投稿する手順](/contributing/submit-to-starter-library/)を参照してください。
