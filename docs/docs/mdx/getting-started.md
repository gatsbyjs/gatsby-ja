---
title: MDX 入門
---

Gatsby で MDX を使い始めるいちばん早い方法は [MDX starter](https://github.com/ChristopherBiscardi/gatsby-starter-mdx-basic) を利用することです。`src/pages`に作った .mdx ファイルから、ウェブサイトの新しいページを作ることができます。

## 🚀 クイックスタート

1. Gatsby CLI を使って **MDX スターターを初期化する**

   ```shell
   gatsby new my-mdx-starter https://github.com/ChristopherBiscardi/gatsby-starter-mdx-basic
   ```

1. 構築されたサイトのディレクトリーに移動して依存パッケージをインストールし、**開発サーバーを起動する**

   ```shell
   cd my-mdx-starter/
   gatsby develop
   ```

1. `http://localhost:8000` **で動作しているウェブサイトを開く**

1. **MDX コンテンツを編集** するために、テキストエディターで `my-mdx-starter` ディレクトリーを開いて `src/pages/index.mdx` を編集してみてください。ファイルを保存すると、リアルタイムで更新が反映されます！

## Gatsby サイトに MDX を追加する

MDX を追加したい Gatsby サイトがあるなら、以下の手順で [gatsby-plugin-mdx](/packages/gatsby-plugin-mdx/) プラグインを設定するとよいでしょう。

また、既存のブログを MDX を使うように変更することもできます。[こちらのブログ記事(英語)](/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/) で詳しい手順を解説しています。

1. MDX と **`gatsby-plugin-mdx` を依存関係に追加する**

   ```shell
   npm install gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react
   ```

   > **ヒント:** バージョン 0 からアップグレードする場合は、加えてこの [MDX アップグレードガイド](https://mdxjs.com/migrating/v1)もご覧ください。

1. `gatsby-plugin-mdx` を使うように **`gatsby-config.js` を編集する**

   ```javascript:title=gatsby-config.js
   module.exports = {
     plugins: [
       // ....
       `gatsby-plugin-mdx`,
     ],
   }
   ```

1. **`gatsby develop` を実行し直し**、`.mdx` ファイルを `src/pages` に追加する

> **ヒント:** Frontmatter や エクスポート、`tableOfContents` といったフィールドのデータを取得したいなら、`src/pages` を読み込むよう設定した `gatsby-source-filesystem` をプロジェクトに追加しておくとよいでしょう。

## 次は？

[MDX の書き方](/docs/mdx/writing-pages) に進み、Gatsby と MDX で他にどんなことができるのか見てみましょう！
