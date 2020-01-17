---
title: Gatsbyテーマを利用する
---

[Gatsby テーマスターターを使えば簡単に開始できます](/docs/themes/getting-started/)が、Gatsby テーマはプラグインなので、[他のプラグインと同様に既存の Gatsby サイトに直接インストールする](/docs/using-a-plugin-in-your-site/)こともできます。

## テーマのインストール

他の Gatsby プラグインと同様に、Gatsby テーマは Node.js パッケージです。そのため、Node.js で書かれた他の公開パッケージのように、npm または[ローカルワークスペースを含む yarn](#Yarn-ワークスペースを利用する)でインストールできます。

例えば、`gatsby-theme-blog`は、ブログ作成のための公式 Gatsby テーマです。

インストールするためには、サイトのルートで以下を実行します。

```shell
npm install --save gatsby-theme-blog
```

## テーマオプション

テーマによっては、`gatsby-config.js`でテーマオプションを設定できます。

例えば、`gatsby-theme-blog`は、4 つのオプションを指定できます: `basePath`、`contentPath`、`assetPath`、`mdx`。これらのオプションは、[テーマの README](/packages/gatsby-theme-blog/)にも記載されています。

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        /*
        - basePathのデフォルト値は、`/`
        - contentPathのデフォルト値は、`content/posts`
        - assetPathのデフォルト値は、`content/assets`
        - mdxのデフォルト値は、`true`
        */
        basePath: `/blog`,
        contentPath: `content/blogPosts`,
        assetPath: `content/blogAssets`,
        mdx: false,
      },
    },
  ],
}
```

テーマのカスタマイズ方法をさらに学ぶには、[Gatsby テーマシャドーイング](/docs/themes/shadowing/)を確認しましょう。

## 公開されたテーマ

パブリックな Gatsby テーマは、誰でも使えるように npm などに公開されています。組織で利用するプライベートなテーマを公開することもできます。プライベートなテーマパッケージは、例えば、[npm レジストリ](https://docs.npmjs.com/about-private-packages)や[GitHub パッケージレジストリ](https://help.github.com/en/github/managing-packages-with-github-package-registry/about-github-package-registry)にホスティングされます。

## Yarn ワークスペースを利用する

公開せずにテーマを使いたい場合、npm の代わりに、[テーマ開発のための Yarn ワークスペース設定](/blog/2019-05-22-setting-up-yarn-workspaces-for-theme-development/)や[Yarn の利用](/docs/gatsby-cli/#how-to-change-your-default-package-manager-for-your-next-project)を検討しましょう。
