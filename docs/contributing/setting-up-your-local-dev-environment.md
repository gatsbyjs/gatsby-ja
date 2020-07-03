---
title: ローカル開発環境を構築する
---

このページでは Gatsby のコアとそのエコシステムに貢献するためのセットアップ方法の概要を説明します。
ドキュメントへの作業手順は[ドキュメントの貢献](/contributing/docs-contributions/)ページを見てください。ブログとウェブサイトのセットアップ手順は[ブログ・ウェブサイトへの貢献](/contributing/blog-and-website-contributions/)ページをご覧ください。

> Gatsby は多くの依存関係を管理するために 「モノレポ」パターンを使用し、アクティブな開発とドキュメントの基盤の変更のためにリポジトリを設定するために Lerna と Yarn に依存しています。

## Yarn の利用

Yarn は[NPM](https://www.npmjs.com/)と似たコードのパッケージマネージャーです。NPM は CLI を使って Gatsby サイトの開発に使われますが、Gatsby リポジトリーへの貢献には次の理由から Yarn を必要とします。
私たちはモノレポにとても便利な Yarn の[workspaces](https://yarnpkg.com/lang/ja/docs/workspaces/)という機能を利用しています。それによって、サブフォルダー内にある複数の `package.json` から依存関係をインストールでき、より早く軽いインストール過程を実現します。

```json:title=package.json
{
  "workspaces": ["workspace-a", "workspace-b"]
}
```

## Gatsby リポジトリのインストール手順

### Node と Yarn のインストール

- インストールされている Node.js が最新の LTS バージョンになっているか確認してください。 `node --version`
- Yarn パッケージマネージャーを[インストールしてください。](https://yarnpkg.com/en/docs/install)
- Yarn の最新版がインストールされていることを確認してください。（>= 1.0.2）`yarn --version`

### リポジトリのフォーク、クローン、ブランチ

- [公式の `gatsbyjs/gatsby` リポジトリ](https://github.com/gatsbyjs/gatsby)を[フォークしてください。](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).
- フォークしたものをクローンしてください： `git clone --depth=1 https://github.com/<your-username>/gatsby.git`
- リポジトリのセットアップを行い、依存関係をインストールしてください。: `yarn run bootstrap`
- テストが通るか確認してください。: `yarn test`
- トピックブランチを作ってください。: `git checkout -b topics/new-feature-name`

### ドキュメントのみの変更

- ドキュメントのみの変更は[ドキュメントのセットアップ手順](/contributing/docs-contributions#docs-site-setup-instructions)をご覧ください。
- リポジトリのルートで `yarn run watch` を実行し、パッケージのソースコードの変更を監視し、それらの変更を即時にコンパイルします。

  - watch コマンドはリソースを激しく使用する可能性があるので注意してください。作業しているパッケージに限定するには、`yarn run watch --scope={gatsby,gatsby-cli}`のように scope フラッグを追加します。
  - ひとつのパッケージのみを監視する場合は、`yarn run watch --scope=gatsby`を実行します。

### Gatsby の機能的な変更

- [gatsby-cli](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli)をインストールしてください。
  - `gatsby -v`を実行し Gatsby CLI がインストールされているか確認してください。
  - 確認できなかった場合は、グローバルにインストールします。`yarn global add gatsby-cli`
- [gatsby-dev-cli](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-dev-cli)をインストールしてください。
  - `gatsby-dev -v`を実行し Gatsby Dev CLI がインストールされているか確認してください。
  - 確認できなかった場合は、グローバルにインストールします。`yarn global add gatsby-dev-cli`
- テストする各サイトで `yarn install` を実行します。
- テストする各サイトで、テストサイトのディレクトリー内で `gatsby-dev` コマンドを実行し、Gatsby のクローンコピーからビルドされたファイルをコピーします。Gatsby パッケージの変更を監視し、それらをサイトにコピーします。詳細な手順については、[gatsby-dev-cli の README](https://www.npmjs.com/package/gatsby-dev-cli)を確認し、[gatsby-dev-cli のデモ映像](https://www.youtube.com/watch?v=D0SwX1MSuas)をご覧ください。

  - 注意：`gatsby` から直接エクスポートされたパッケージを変更する場合は、それらを手動でテストサイトに追加して package.json に記述するか (例： `yarn add gatsby-link`)、明示的に `gatsby-dev --packages gatsby-link` で指定する必要があります。

### テストの追加

- 変更に対して、テストとコードを追加してください。
- 完了したら、テストが通ることを確認してください。: `yarn test`

  - 1 つのパッケージのテストを実行する場合、次のコマンドを実行してください。 `yarn jest <package-name>`
  - 1 つのファイルファイルを実行する場合、次のコマンドを実行してください。 `yarn jest <file-path>`

### コミットとプルリクエスト

- コミットし、フォークに対してプッシュしてください。
- ブランチからプルリクエストを作成してください。

### フォークの同期

- GitHub ヘルプページ [フォークを同期する](https://help.github.com/ja/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
- GitHub ヘルプページ [上流リポジトリをフォークにマージする](https://help.github.com/ja/github/collaborating-with-issues-and-pull-requests/merging-an-upstream-repository-into-your-fork)
