---
title: JAMStack
disableTableOfContents: true
---

JAMStack を備えたウェブサイトを構築するために Gatsby の使用方法を学びます。JAMStack は、（本来、両立可能ですが）データベース、サーバサイドプログラミング言語の使用を必要としない、JavaScript、API、マークアップを使用するモダンなアーキテクチャです。

## JAMStack とは何ですか？

JAMStack とは、ウェブサイトやアプリケーションを構築するためのモダンなアーキテクチャです。JAMStack の _<abbr>JAM</abbr>_ は [JavaScript](/docs/glossary#javascript)、API、(HTML) Markup の略です。JAMStack サイトは、WordPress や Drupal を使ったウェブサイト構築と違ってデータベースを必要としません。ウェブサーバーすら省略でき、ウェブサイトをオブジェクトストレージサービスや CDN（コンテンツデリバリーネットワーク）にホストすることも選択可能です。

例えば、WordPress や Drupal を使って構築するような、より伝統的なウェブサイトでは、コンテンツはデータベースに保存されます。これらには、HTML マークアップとテンプレートタグを組み合わせた、テンプレートファイルのプレゼンテーション層もあります。テンプレートタグは対応するコンテンツデータを出力する為のプレースホルダーです。例：ページのタイトル `{{ title }}`

ソフトウェア層をまとめると：データベースからコンテンツデータを読み込み、テンプレートタグを適切なコンテンツの塊に置き換え、そしてブラウザーに全てを返すことです。サーバーが URL リクエストを受け取るたび、1 つのページが再作成されます。

このタイプのアーキテクチャでは、[フロントエンド](/docs/glossary#フロントエンド (Frontend))（ブラウザーで見えるモノ）と[バックエンド](/docs/glossary#バックエンド (Backend))（データベースやソフトウェア層）が**密結合されています**。コンテンツデータと、それをどう表示するかの両方が同一コード上に存在します。&mdash; 時々、**モノリシックアーキテクチャ（一枚岩な機能）**と呼ばれます。コンテンツデータは HTML としてのみ利用可能です。また、HTML を解析できるクライアント（例：ウェブブラウザー）でのみ読み取り可能です。

しかし、JAMStack アーキテクチャにおいて、フロントエンドとバックエンドは[分離](/docs/glossary#分離 (Decoupled))されています。JAMStack フロントエンドは JavaScript、HTML、そして CSS から構成されています。Gatsby は[ビルド](/docs/glossary#ビルド (Build）)する過程の中で、これらのファイルを生成します。

JAMStack バックエンドは JSON や XML を返すコンテンツ API です。この API を [ホストされたデータストア](/docs/sourcing-from-hosted-services/)、[ヘッドレス CMS](/docs/headless-cms/) あるいは、カスタムアプリケーションにできます。このことは、JSON や XML を提供することのみ関係があります。すなわち、Gatsby サイトとネイティブアプリケーションで同じ API が使えることを意味します。

### JAMStack アーキテクチャの利点

Gatsby で作成されたような JAMStack サイトは、その他のウェブサイトアーキテクチャと比較して、極めて重要な 4 つの利点を提供します。

- **スピード**： JAMStack サイトはソフトウェア層、データベース層によって引き起こされるオーバーヘッドがありません。結果、レンダリングとロードはモノリシックアーキテクチャを使ったサイトよりも高速です。
- **ホスティングの柔軟性**： JAMStack サイトは静的ファイルなので、どこにでもホストできます。Apache や Nginx など従来のウェブサーバーソフトウェアを使うこともできます。ベストパフォーマンス、セキュリティーのためにオブジェクトストレージサービスや、[Netlify](/docs/deploying-to-netlify)、[Render](/docs/deploying-to-render) あるいは、Amazon Web Services の [S3 + Cloudfront](/docs/deploying-to-s3-cloudfront) などの CDN を使用できます。
- **DX（開発者体験）の向上**： フロントエンド開発者たちはサーバーサイド言語の知識を必要とせずサイトを構築できます。バックエンド開発者は API 構築に集中できます。分業された開発チームは平行作業を可能にし、チームがもっとも得意とする領域に集中できます。サードパーティ [CMS](/docs/glossary#cms) サービスを使うということは、開発者と運用チームがばらばらの技術スタックでコンテンツを管理する必要がないことを意味します。
- **より良いセキュリティ**： JAMStack サイトにデータベース、ソフトウェア層がないということは、[SQL インジェクション](https://www.owasp.org/index.php/SQL_Injection)やサーバーサイド [コード インジェクション](https://www.owasp.org/index.php/Code_Injection) 攻撃による脆弱性を持たないということです。ページは事前にコンパイルされるので、[SSI（サーバーサイド インクルード）インジェクション](<https://www.owasp.org/index.php/Server-Side_Includes_(SSI)_Injection>) 攻撃のリスクがありません。サイトを CDN にホスティングすると [DoS（Denial of Service）](https://www.owasp.org/index.php/Denial_of_Service) 攻撃から保護されます。JAMStack アーキテクチャへの移行は、あらゆる種類の脆弱性を制限、排除します。

> **ヒント：** それでも、Gatsby や他の JAMStack サイトには [XSS（クロスサイトスクリプティング）](https://www.owasp.org/index.php/Types_of_Cross-Site_Scripting) 攻撃を受ける可能性が残っています。もし、API 側の安全性が損なわれていれば、API 利用側も侵害される可能性があります。

Gatsby を使うと、SEO（検索エンジン最適化）とアクセシビリティの機能が施された、より高速で、より安全なウェブサイトを構築できます。Gatsby を他のフレームワークと[比較](/features/)している様子をご覧ください。

### JAMStack アーキテクチャについてもっと学ぶ

- [JAMStack.org](https://jamstack.org/) 公式ウェブサイト
- [JAMstack WTF](https://jamstack.wtf/)（Gatsby で構築されています）
- Gatsby ドキュメントより[デプロイとホスティング](/docs/deploying-and-hosting/)
