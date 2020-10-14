---
title: ヘッドレス CMS とはなにか・CMS からコンテンツを配信するには
overview: true
---

_ヘッドレス CMS_ とはコンテンツ管理ソフトで、ライターがコンテンツを作成したり、整理したりする機能を提供します。それはフロントエンド側であるウェブサイトやアプリの画面に依存しないシステムで、開発者に構造化されたデータを提供します。

伝統的で、統合された CMS ではコンテンツのバックエンドとフロントエンドの両方をも制御し、エンドユーザーへコンテンツを提供します。一方、ヘッドレス CMS はフロントエンド側からは分離されていて、開発者自身の最適な方法でエンドユーザーへ豊かな体験を提供できます。

多くのコンテンツ管理システム (CMS) は " ヘッドレス " あるいは " 分離 " モードを採用していて、 Gatsby サイトに最適です。

[ソースプラグイン](/plugins/?=source)を通して Gatsby は数十種類のヘッドレス CMS をサポートしています。コンテンツ作成チームには快適で馴染みのある管理インターフェースを使ったり、開発者チームにはフロントエンドを構築するのに、 Gatsby 、 GraphQL、 React を使ったパフォーマンス・開発体験の向上を提供します。

このセクションのガイドでは現在使用されているもっとも人気のあるヘッドレス CMS のいくつかからコンテンツ配信の設定方法を説明します。

<GuideList slug={props.slug} />

<!--
  Ordering in this section is driven by Gatsby plugin downloads (/plugins/?=gatsby-source-) & CMS vendor size/adoption.
-->

ここで CMS のより詳しいガイド、プラグイン、スターターを参照できます。

| CMS                                           | ガイド                                                                           | プラグインドキュメント                               | 公式スターター                                                      |
| --------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------- |
| [Contentful](https://www.contentful.com/)     | [guide](/docs/sourcing-from-contentful/)                                         | [docs](/packages/gatsby-source-contentful)           | [starter](/starters/contentful-userland/gatsby-contentful-starter/) |
| [NetlifyCMS](https://www.netlifycms.org/)     | [guide](/docs/sourcing-from-netlify-cms/)                                        | [docs](/packages/gatsby-plugin-netlify-cms)          | [starter](/starters/netlify-templates/gatsby-starter-netlify-cms/)  |
| [WordPress](https://www.wordpress.com/)       | [guide](/docs/sourcing-from-wordpress/)                                          | [docs](/packages/gatsby-source-wordpress)            |                                                                     |
| [Prismic](https://www.prismic.io/)            | [guide](/docs/sourcing-from-prismic/)                                            | [docs](/packages/gatsby-source-prismic)              |                                                                     |
| [Strapi](https://strapi.io/)                  | [guide](/blog/2018-1-18-strapi-and-gatsby/)                                      | [docs](/packages/gatsby-source-strapi)               |                                                                     |
| [DatoCMS](https://www.datocms.com/)           | [guide](https://www.gatsbyjs.com/guides/datocms/)                                | [docs](/packages/gatsby-source-datocms)              | [starter](/starters/datocms/gatsby-portfolio/)                      |
| [Sanity](https://www.sanity.io/)              | [guide](/docs/sourcing-from-sanity)                                              | [docs](/packages/gatsby-source-sanity/)              |                                                                     |
| [Drupal](https://www.drupal.com/)             | [guide](/docs/sourcing-from-drupal/)                                             | [docs](/packages/gatsby-source-drupal)               |                                                                     |
| [Shopify](https://www.shopify.com/)           |                                                                                  | [docs](/packages/gatsby-source-shopify)              |                                                                     |
| [CosmicJS](https://cosmicjs.com/)             | [guide](/blog/2018-06-07-build-a-gatsby-blog-using-the-cosmic-js-source-plugin/) | [docs](/packages/gatsby-source-cosmicjs)             | [starters](/starters/?s=cosmicjs&v=2)                               |
| [Contentstack](https://www.contentstack.com/) | [guide](/docs/sourcing-from-contentstack)                                        | [docs](/packages/gatsby-source-contentstack)         | [starter](/starters/contentstack/gatsby-starter-contentstack/)      |
| [ButterCMS](https://buttercms.com/)           | [guide](/docs/sourcing-from-buttercms/)                                          | [docs](/packages/gatsby-source-buttercms)            | [starter](/starters/ButterCMS/gatsby-starter-buttercms/)            |
| [Ghost](https://ghost.org/)                   | [guide](/docs/sourcing-from-ghost/)                                              | [docs](/packages/gatsby-source-ghost/)               | [starter](/starters/TryGhost/gatsby-starter-ghost/)                 |
| [Kentico Kontent](https://kontent.ai/)        | [guide](/docs/sourcing-from-kentico-kontent)                                     | [docs](/packages/@kentico/gatsby-source-kontent)     | [starter](/starters/Kentico/gatsby-starter-kontent/)                |
| [Directus](https://directus.io/)              |                                                                                  | [docs](/packages/gatsby-source-directus)             |                                                                     |
| [GraphCMS](https://graphcms.com/)             | [guide](/docs/sourcing-from-graphcms)                                            | [docs](/packages/gatsby-source-graphql)              | [starter](/starters/GraphCMS/gatsby-graphcms-tailwindcss-example/)  |
| [Storyblok](https://www.storyblok.com/)       |                                                                                  | [docs](/packages/gatsby-source-storyblok)            |                                                                     |
| [Cockpit](https://getcockpit.com/)            |                                                                                  | [docs](/packages/gatsby-plugin-cockpit)              |                                                                     |
| [CraftCMS](https://craftcms.com/)             |                                                                                  | [docs](/packages/gatsby-source-craftcms)             |                                                                     |
| [AgilityCMS](https://agilitycms.com/)         | [guide](/docs/sourcing-from-agilitycms/)                                         | [docs](/packages/@agility/gatsby-source-agilitycms/) | [starter](/starters/agility/agility-gatsby-starter/)                |
| [Forestry](https://forestry.io/)              | [guide](/docs/sourcing-from-forestry/)                                           |                                                      |                                                                     |
| [Gentics Mesh](https://getmesh.io)            | [guide](/docs/sourcing-from-gentics-mesh)                                        |                                                      |                                                                     |
| [Seams-CMS](https://seams-cms.com/)           | [guide](/docs/sourcing-from-seams-cms)                                           |                                                      |                                                                     |

## 新規のガイドを追加するには

この一覧中にあなたのお気に入りの CMS が見つからなければ、[自分自身で新規のガイドを執筆したり](/contributing/how-to-contribute/)、[Issue をリクエスト](https://github.com/gatsbyjs/gatsby/issues/new/choose)できます。

また、[自分オリジナルのプラグインを作成し](/docs/creating-a-source-plugin/)、 Gatsby へ CMS として組み込むこともできます。
