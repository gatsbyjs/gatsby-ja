---
title: Pull Request を作成する
---

オープンソースプロジェクトへの貢献をする中で、大きな割合を占めるのが、変更部分の提出です。例えば、ソースコードやテストコードの改善、ドキュメントの更新、文字の打ち間違いやリンク切れの修正などです。このドキュメントでは、Gatsby で **Pull Request を作成する**ために知るべきことをお伝えします。

## Pull Request (PR) とは？

もしもあなたが Pull Request についてよく知らない場合、以下が GitHub での [Pull Request の定義](https://help.github.com/ja/articles/about-pull-requests)になります。

> Pull Request を作成することで、GitHub リポジトリーのブランチに Push したあなたの変更点について、他のユーザーに通知できます。Pull Request が作成されれば、考えうる変更点についてコラボレーター達と議論やレビューを行うことができ、最初の変更部分を元のブランチにマージする前に、更なる変更も追加できます。

Gatsby では、変更部分を Gatsby リポジトリーにマージする前段階のレビュー＆テストとして、この PR プロセスを使用しています。Pull Request は誰でも作成できます。あなたが初めてオープンソースに貢献する場合でも、あなたが Gatsby チームのコアメンバーである場合でも、この PR プロセスは同じです。

Gatsby に貢献したい場合、まず変更したコードを Gatsby リポジトリーに*プル*してもらうためのリクエストを作成します。変更内容のタイプによって、PR は以下のように分類されます。

- [Documentation](#documentation-prs)
- [Code](#code-changes)
- [Starters or Site Showcase](#starters-or-site-showcase)
- [Blog posts](#blog-posts)

それぞれのタイプでの推奨事項については、以上のドキュメントと Contributing ドキュメント全般の中で記述されています。

## PR を作成する前に知るべきこと

Gatsby では、同じ問題に関する Issue がまだ無い場合、Pull Request を作成する前に [Issue を作成する](/contributing/how-to-file-an-issue/)ことが推奨されています。どのような変更を実装するかについて、議論する場を設けるためです。

文字の打ち間違えやリンク切れなどの修正については、Issue を作成せず PR 作成だけで良いこともあります。こちらに関しては個人の判断になりがちなので、もしもよく分からない場合は[お気軽にご質問ください](/contributing/how-to-contribute/#not-sure-how-to-start-contributing)。

Gatsby コアチームは、[Pull Request を管理](/contributing/managing-pull-requests/)の中で定められた優先順位に基づいて PR プロセスを進めるので、PR プロセスについて気になる場合は一度ご確認ください。

## Gatsby で PR を作成する

Gatsby リポジトリーに変更を行うときは、どんな変更内容であっても以下の手順を踏みます。ドキュメントの変更・ブログの投稿・テンプレート・コードの改善やテストなどへの貢献について、追加のヒントがこのページで後ほど説明されているので、そちらも必ずご確認ください。

README ファイルやドキュメントの変更など、一部の PR は [GitHub UI](https://help.github.com/ja/articles/creating-a-pull-request) 上で完結できます。

Gatsby [サイトファイルとプロジェクトファイル](https://github.com/gatsbyjs/gatsby)への変更を自身のローカル環境でテストするには、まずリポジトリーをフォークし、その一部をインストールしてからローカル環境で実行します。

- [Gatsby リポジトリーをフォークしてクローン](/contributing/setting-up-your-local-dev-environment/#gatsby-repo-install-instructions)します。
- 全ての依存関係を読み込んでプロジェクトを立ち上げるために、[yarn](https://yarnpkg.com/) をインストールします。
- 下記のセクションからあなたが変更したいカテゴリーを探し、記述されている指示にしたがってください。
- あなた専用のブランチを作るために、以下のコードをコマンドライン上で実行して [Git ブランチを作成](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) します。

  ```shell
  git checkout -b some-change
  ```

- 内容の変更を行い Git からプッシュしたいと思ったら、[変更を追加してコミットを作成](https://help.github.com/ja/articles/adding-a-file-to-a-repository-using-the-command-line)します。コミットをどのように構築するかについては、[PR を管理する](/contributing/managing-pull-requests/#commit-and-pr-title)をご確認ください。
  - ドット `.` を使えば、現ディレクトリー・サブディレクトリー内の全ての未追跡ファイルを Git に追加できます。
  ```shell
  git add .
  ```
  - [GitHub Desktop](https://desktop.github.com/) や [GitX](https://rowanj.github.io/gitx/) のようなビジュアルツールを使えば、どのファイルや行をコミットするべきか選ぶのに役立ちます。
- コードをコミットする際、[Prettier](https://prettier.io) を使った自動校正が行われます。この校正を手動で行いたい場合、プロジェクトのベースディレクトリー内で以下の npm スクリプトを実行します。
  ```shell
  npm run format
  ```
- プッシュをする前に、[1 つ前のコミットを変更 (amend)](https://help.github.com/ja/articles/changing-a-commit-message) して校正に関する変更をコミットするか、もしくはそれ自体を新たなコミットとして作成します。校正とテストに関して詳しく知りたければ、[PR を管理する](/contributing/managing-pull-requests/#automated-checks)をご確認ください。
  ```shell
  git commit --amend
  ```
- あなたのフォークリポジトリーが [`origin`](https://www.git-tower.com/learn/git/glossary/origin) として登録されている場合、以下のコマンドで変更をプッシュします。
  ```shell
  git push origin head
  ```
- Gatsby リポジトリーに変更した内容の PR を作成するには、[GitHub Pull Request UI](https://help.github.com/ja/articles/creating-a-pull-request) を使います。他の方法としてコマンドラインから PR を送ることもでき、その場合は [hub](https://github.com/github/hub) の使用が推奨されています。

### Documentation PRs

Gatsby のドキュメントサイトは、ドキュメントとチュートリアルを含めてほぼ Github 上の [www](https://github.com/gatsbyjs/gatsby/tree/master/www) ディレクトリーと [docs](https://github.com/gatsbyjs/gatsby/tree/master/docs) ディレクトリー内にあります。また、これらのドキュメントから参照される形で、[サンプル集](https://github.com/gatsbyjs/gatsby/tree/master/examples)も存在します。

以下は、追加ドキュメントの PR 手順です。

- ドキュメントのみの変更の場合、`git checkout -b docs/some-change` か `git checkout -b docs-some-change` を使うことで、CI プロセスを減らし文字校正のみを行う事ができます。

より詳しい指示については、[ドキュメントに貢献](/contributing/docs-contributions/)ページをご覧ください。

### Code changes

Gatsby のソースコード・テスト・内部構造・API・パッケージなどの変更に関する指示については、Contributing ドキュメントの[ローカル開発環境を構築する](/contributing/setting-up-your-local-dev-environment/)内に記載されています。更なる説明については、[コードを貢献する](/contributing/code-contributions/)ページもご覧ください。

### Starters or Site Showcase

Gatsby エコシステム内の様々な部分への貢献については、それら専用に記載されたページがあります。

- [サイト・ショーケースに提出](/contributing/site-showcase-submissions/)
- [スターターライブラリ](/contributing/submit-to-starter-library/)

### Blog posts

<<<<<<< HEAD
Gatsby ブログに投稿をする場合、記事を投稿する前に、記事のアイデアについて Gatsby チームから承認される必要があります。アイデアの提案方法や、ローカルでブログを走らせる方法など、詳しい説明は[ブログとウェブサイトへの貢献](/contributing/blog-and-website-contributions/)をご覧ください。
=======
For the Gatsby blog, it's necessary to run your content idea by the Gatsby team before submitting it. For more information, refer to the page on [blog contributions](/contributing/blog-contributions/), including how to propose an idea and setting up the blog to run locally.
>>>>>>> 8ff6bb09c23261662f47e79a041a92855d517097

## レビュー・提案によるフォローアップ

あなたが Gatsyby の GitHub リポジトリーで PR 作成をした後、あなたの変更内容について、Gatsby のコアチームとコミュニティーメンバーが改善提案をすることがあります。

Gatsby のコアチーム・ラーニングチームは、コミュニティーで作成された全ての PR に対して、その内容が貢献ガイドラインを満たしているか・その PR 内容がさらに改善できるかのレビューをし、承認します。

これらの提案は GitHub の UI 上で「request changes」とも呼ばれます。ある提案があなたの PR に追加されたら、以降の提案もあなたの GitHub の PR ページ上で表示され続けます。このページからは、以下のことができます。

- 「View changes」ボタンを使用し、提案された内容をレビューする
- 提案内容を[コミットする](https://help.github.com/ja/articles/incorporating-feedback-in-your-pull-request#applying-suggested-changes)
- 提案された変更について質問するために[話し合う](https://help.github.com/ja/articles/about-conversations-on-github)
- 1 つのコミットとしてプッシュするために、[バッチに提案を追加する](https://help.github.com/ja/articles/incorporating-feedback-in-your-pull-request#applying-suggested-changes)

GitHub UI で解決できない提案があっても、PR がマージされる前に関連するコミットをあなたの PR に追加でき、それらのコミットもあなたの PR の一部と見なされます。

あなたの疑問点が無くなり、全ての変更提案がコミットされたら、その [conversation を solved としてマーキング](https://help.github.com/ja/articles/commenting-on-a-pull-request#resolving-conversations)できます。

Gatsby チームとコミュニティー双方のため、これらのプロセスを行うことで、Gatsby の GitHub リポジトリーへマージする前にあなたの変更内容を改善できます。

## Gatsby リポジトリーでの更新を、自身のフォークリポジトリーに反映する

Gatsby の GitHub リポジトリーは頻繁に更新されているため、自身の変更を Gatsby リポジトリーにマージするためにも、最新の変更をあなたのフォークリポジトリーに反映させる必要が出てきます。そのためには、Gatsby を[上流リモート](https://help.github.com/ja/articles/configuring-a-remote-for-a-fork)として追加します。

- Gatsby のリポジトリー URL をリモートとして設定します。リモートとして設定する名前は何でも構いません。以下の例では "upstream" としています。
  ```shell
  git remote add upstream git@github.com:gatsbyjs/gatsby.git
  ```
  - _注意: この構文は [SSH キーを利用していますが、あなたのユーザーネームとパスワードを使用して `https` 接続をする事もできます。](https://help.github.com/ja/articles/which-remote-url-should-i-use)_
- リモート名とその URL を確認
  ```shell
  git remote -v
  ```
- Gatsby での最新の変更を取得
  ```shell
  git fetch upstream master
  ```
- 自身の更新したい[ブランチ上](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)で、Gatsby での更新を全て自身のフォークリポジトリーにマージ
  ```shell
  git merge upstream/master
  ```
  - [マージコンフリクト](https://help.github.com/ja/articles/resolving-a-merge-conflict-on-github)があった場合は、クリーンマージを行うために、どこでコンフリクトが起こっているのか確認しましょう。
- あなたのブランチで特に問題が起きていなければ、変更した内容をフォークリポジトリーにプッシュします。
  ```shell
  git push origin head
  ```

上流リポジトリーについてさらに知りたい場合は、[GitHub ドキュメントをご覧ください](https://help.github.com/ja/articles/configuring-a-remote-for-a-fork)。

_**ヒント:** Gatsby リポジトリーのメンバーは、上流リモートリポジトリーをフォークする代わりに、リポジトリーを直接クローンできます。クローンしたリポジトリー内で変更をしたあと、PR を作成するために[フィーチャーブランチ](https://git-scm.com/book/en/v1/Git-Branching-Branching-Workflows)へプッシュします。_

## 追加資料

- CSS Tricks: [オープンソースプロジェクトに貢献する方法](https://css-tricks.com/how-to-contribute-to-an-open-source-project/)
- GitHub で [Pull Request を作成する](https://help.github.com/ja/articles/creating-a-pull-request)
- [フォークリポジトリーのリモートを設定する](https://help.github.com/ja/articles/configuring-a-remote-for-a-fork)
- [どのリモート URL を使うべき？](https://help.github.com/ja/articles/which-remote-url-should-i-use)
- [Git でのブランチとマージ](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [フィーチャーブランチとワークフロー](https://git-scm.com/book/en/v1/Git-Branching-Branching-Workflows)
- [マージコンフリクトを解消する](https://help.github.com/ja/articles/resolving-a-merge-conflict-on-github)
- Gatsby コアチーム内で [Pull Request を管理する](/contributing/managing-pull-requests/)
- [マークダウン構文ガイド](/docs/mdx/markdown-syntax/)
