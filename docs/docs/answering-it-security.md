---
title: ITとセキュリティ質問への回答
---

Fortune500 のような大企業においては、社内で利用する新技術について監査を行うセキュリティチームが会社内にいます。

もしセキュリティエンジニアがあなたのプロジェクトに興味を持った場合、これらのポイントがあなたの回答を助けるでしょう。

- Gatsby はウェブサイトをフラットファイルでコンパイルしているため、アプリケーションサーバーとデータベースを実行することに比べ、外部からの攻撃対象を減らすことができます。
- Gatsby は間接的に CMS を覆い隠すレイヤーを提供します -- そのため、もし CMS _が_ 脆弱性を持っていた場合でも、攻撃者はそれを発見できません。これは、攻撃者が `/wp-admin` のような管理ダッシュボードを簡単に探り当ててハッキングできるようなシステムとの大きな違いです。
- Gatsby はグローバルな CDN からウェブサイトをホストできます。おそらく、あなたの会社が利用している CDN (Akamai, Cloudflare, Fastly など）が効果的に DDoS アタックのリスクから防いでくれるでしょう。

It's helpful to emphasize to security personnel that these benefits were a factor in why Gatsby was selected for the project. You chose Gatsby, in part, because it is _more_ secure.

Read about security in Gatsby: [https://www.gatsbyjs.org/blog/2019-04-06-security-for-modern-web-frameworks/](/blog/2019-04-06-security-for-modern-web-frameworks/)

--

**Note:** do you have additional ideas on how to answer IT and security questions for Gatsby projects? We welcome contributions to the Gatsby docs. Find out [how to contribute](/contributing/docs-contributions/).
