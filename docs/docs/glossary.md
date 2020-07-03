---
title: 用語集
disableTableOfContents: true
---

Gatsby をはじめたばかりの時は、覚えるべき用語がたくさんあって大変でしょう。この用語集ではよく使われる用語の意味と、Gatsby のサイト上でどのように使われているかを説明します。

<HorizontalNavList
  items={"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}
  slug={props.slug}
/>

## A

### 抽象構文木 (AST)

抽象構文木 (Abstract Syntax Tree、AST) とは、言語から別の言語へ[コンパイル](#compiler)する際、その中間を繋ぎ、ソースコードを木構造で表現したものです。例えば、[gatsby-transformer-remark](/packages/gatsby-transformer-remark/) プラグインは [Remark](#remark) パーサーを使用し、[Markdown](#markdown) からその内容を表す AST を作成します。

### API

API とは Application Programming Interface の略で、アプリ間の連絡を可能とするメソッドです。例えば、[ソースプラグイン](#source-plugin)は API を使って自身のデータを取得します。

### アクセシビリティ (Accessibility)

障がいを持つ人などを含むすべての人がアクセス、インタラクションを可能とするウェブサイトの構築方法。ウェブサイトがアクセシビリティを意識してデザイン、実装、編集されている場合、全てのユーザーが等しく情報や機能へのアクセスが可能となります。詳しくは [Gatsby のアクセシビリティへの注力](/blog/2019-04-18-gatsby-commitment-to-accessibility/)に関する記事を参照。

## B

### Babel

最新の [JavaScript](#javascript) をかけるようにするためのツールです。[ビルド時](#build)にほとんどの Web ブラウザーが読めるように[コンパイル](#compiler)されます。

### バックエンド (Backend)

サイトの[表](#public)には出ない、裏で走っている機能のことです。このサイトでは、主に [CMS](#cms) のコントロールパネルのことを指します。これらは、Node.js, PHP, Go, ASP.net, Ruby, Java 等のサーバーサイド言語によって実装されています。

### ビルド (Build)

Gatsby では、ビルドとはあなたのコードやコンテンツを 1 つのパッケージとして、ホストしてアクセスるウェブサイトに仕上げる行為を指します。「_ビルド時_」とも呼ばれます。参照：[バックエンド](#backend)、[サーバサイド](#server-side)。

## C

### キャッシュ (Cache)

一度読み込んだ情報を、再利用するためローカルに保存されたもの。保存される事によって、次回の計算や検索結果をより早く提供できるようになります。Gatsby はあなたのサイトを高速でビルドするためにキャッシュを使用しています。

### CLI

Command Line Interface (コマンドラインインターフェース）の略で、あなたのパソコンの[コマンドライン](#command-line)上で動作し、あなたのキーボードで操作するアプリのことを指します。

Gatsby には 2 つのコマンドラインインターフェースがあります。 1 つは [`gatsby`](/docs/gatsby-cli/)、Gatsby の開発時に使います。もう 1 つは [`gatsby-dev`](/contributing/setting-up-your-local-dev-environment/#gatsby-repo-install-instructions)、こちらは Gatsby 本体の開発をする時に使います。

### クライアントサイド (Client-side)

[クライアント・サーバモデル](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%B5%E3%83%BC%E3%83%90%E3%83%A2%E3%83%87%E3%83%AB)におけるクライアントサイドとは、ユーザーのブラウザー上で行われる操作のことを指します。Gatsby では、これは `window` or `navigator` などの[ブラウザ DOM](#dom) に依存する[パッケージの開発](/docs/using-client-side-only-packages/)に置いて重要です。参照：[サーバーサイド](#server-side)、[フロントエンド](#frontend)、[バックエンド](#backend)。

### CMS

CMS とはコンテンツ・マネジメント・システム (Content Management System) の略です。CMS はサイト上のコンテンツをデータベースやファイルに保存して、アクセス可能にするためのアプリケーションです。ワードプレス、Drupal、Contentful、Netlify CMS などが CMS の一例です。

### コマンドライン (Command Line)

コンピューター上でコマンドを実行するためのテキストベースのインターフェースです。デフォルトで設定されているコマンドラインアプリは、Mac では `Terminal`、Windows では `Command Prompt` です。

### コンパイラー (Compiler)

コンパイラーとは、1 つの言語で書かれたコードを、他のコードに変換するものです。例えば、[Gatsby](#gatsby) は [React](#react) のアプリを静的 [HTML](#html) ファイルにコンパイルできます。

### コンポーネント (Component)

コンポーネントとは [React](#react) で作成された、再利用可能な独立したコードです。コンポーネントを組み合わせることであなたのウェブサイトやアプリが構成されます。

コンポーネントは他のコンポーネントを含むことができます。例えば、[ページ](#page)や[テンプレート](#template)はコンポーネントの 1 つです。

### コンフィグ (Config)

設定ファイルのこと。Gatsby では `gatsby-config.js` を使って Gatsby にあなたのサイトの設定を行います。よく使われる設定としては、サイトの metadata を設定してあなたのサイトの SEO を向上させるものがあります。

### [継続的デプロイ (Continuous Deployment)](/docs/glossary/continuous-deployment)

継続的デプロイ (Continuout Deployment, CD) とは、あなたのプロジェクトのリリースプロセスを自動化するものです。継続的デプロイワークフローは自動的にあなたのプロジェクトのテスト、およびビルドを行い、差分に問題が無いと判断されたら自動的に公開されます。

### CSS

[CSS](https://developer.mozilla.org/ja/docs/Web/CSS) は Cascading Style Sheets の略であり、[HTML](#html) と [JavaScript](#javascript) と共に、サイトを構成する主戦物です。CSS はウェブサイトのデザインを変更する為に設計された言語です。後方互換性の保守に優れており、新しい機能が実装されても、[CSS パーサー](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#CSS_parsing)はサポートされていない機能を安全に無視して、サポートしている機能だけを提供できます。[CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement) のような新しい技術をブラウザーに提供しつつ、古いブラウザーにはフォールバックを提供しています。Gatsby では様々な[スタイリングに対するアプローチ](/docs/styling/)に対応しています。これは、通常の CSS ファイルや、CSS modules、CSS-in-JS を含みます。

## D

### データソース (Data Source)

コンテンツやデータの元となるもので、多くの場合、[ソースプラグイン](#source-plugin)を用いて Gatsby に組み込まれます。データソースは、多くの場合は[ヘッドレス CMS](#headless-cms) のことを指しますが、Markdown、JSON、YAML 等のファイルを指す場合もあります。

### データベース (Database)

データベースとは構造化されたデータやコンテンツのこと。多くの場合、[CMS](#cms) が[バックエンドの技術](#backend)を用いることでコンテンツはデータベースに保存されます。これらは[ソースプラグイン](#source-plugin)を用いて Gatsby からアクセスされます。

### 分離 (Decoupled)

[Gatsby](#gatsby) において、分離とは関心の分離のことを指します。多くの場合、[フロントエンド](#frontend)と[バックエンド](#backend)を分離することを指しています。例として、[Decoupled Drupal](https://dri.es/how-to-decouple-drupal-in-2019) や [Headless WordPress](https://www.smashingmagazine.com/2018/10/headless-wordpress-decoupled/) が挙げられます。

### [Decoupled Drupal](/docs/glossary/decoupled-drupal)

Decoupled Drupal とは、Drupal のサービスを[ヘッドレス CMS](#headless-cms) として活用することを指します。ヘッドレス CMS としての Drupal インスタンスはコンテンツ API として機能し、[フロントエンド](#frontend)側で表示させる情報を JSON として返します。

### デプロイ (Deploy)

あなたのウェブサイトを[ビルド](#build)し、[ホストプロバイダー](#hosting)にアップロードする一連の動作のこと。

### 開発環境 (Development Environment)

コードを開発するための[環境](#environment)。[CLI](#cli) から `gatsby develop` を叩いてアクセスし、エラー報告や、[本番環境](#production-environment)をビルドするために必要なデバッグ情報について伝えます。

### DOM

Document Object Model の略。DOM とは、HTML の構造をメモリーに持たせる事によって、ウェブページとスクリプトやプログラム言語を繋げる為のスタンダードなブラウザーの API です。開発者は主に、[HTML](#html) マークアップ（Gatsby では [JSX](#jsx) で書かれる）や [React](https://ja.reactjs.org/docs/react-dom.html)、[バニラな JavaScript](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction#DOM_and_JavaScript) を通して DOM を操作します。DOM をフル活用する上でもう 1 つ大事なことは、[アクセシブル](#accessibility)な HTML マークアップを書いて、ページの構造をアシスト技術に対応させることです。

## E

### ECMAScript

ECMAScript（ES と略されることが多い）はスクリプト言語の仕様です。[JavaScript](#javascript) は ECMAScript の仕様を実装したものです。開発者は [Babel](#babel) を使って最新の ECMAScript をどの環境でも動作する JavaScript に[コンパイル](#compiler)することが多いです。

### 環境 (Environment)

Gatsby が動作する環境のこと。例えば、開発中は多くのデバッグをしたくなるでしょう。ただ、公開中のウェブサイトやアプリ上でデバッグは行いたくありません。そういう時の為に Gatsby はそれぞれのケースの環境を用意しています。

Gatsby ではデフォルトで 2 つの環境を提供しています。[開発環境](#development-environment)と[本番環境](#production-environment)です。

### 環境変数 (Environment Variables)

[環境変数](/docs/environment-variables/)は[環境](#environment)によってあなたのアプリの動作を変更するためのもの。例えば、開発中には staging に上がっている CMS からコンテンツを受け取りたくて、[ビルド](#build)された本番環境では本番の CMS からコンテンツを受け取りたい場合、環境変数を使って、それぞれの環境で別々の URL を設定できます。

## F

### ファイルシステム (Filesystem)

ファイルの構成を管理する方法。Gatsby では、あなたのウェブサイトやアプリのコードと同じ箇所に含まれている、外部の[ソース](#data-source)とは別にあるファイルのことを指します。Gatby においてファイルシステムに含まれている主なものは Markdown コンテンツ、画像、データファイル、その他のアセットなどです。

### フロントエンド (Frontend)

フロントエンドとは、あなたのウェブサイトやアプリの[表に見える部分](#public)を作成する技術、HTML や CSS、JavaScript のことを指します。ウェブプラットフォームがこれらの技術をどう組み合わせているかについては[ブラウザーの仕組み](https://www.html5rocks.com/ja/tutorials/internals/howbrowserswork/)という記事を参照してください。

## G

### Gatsby

Gatsby は [React](#react)、[GraphQL](#graphql)、モダンな [JavaScript](#javascript) など、最新のウェブ技術を取り入れたウェブサイトやウェブアプリ制作のためのフレームワークです。Gatsby はパフォーマンスの達人でなくとも、素早い Web 体験をユーザーに届けることが可能です。

### [GraphQL](/docs/glossary/graphql)

あなたのウェブサイトやアプリに使うためのデータを取得するための[クエリ](#query)言語。Gatsby がサイトのデータを管理するための[インターフェース](/docs/graphql/)。

## H

### HTML

すべてのブラウザーが理解可能なマークアップ言語。Hypertext Markup Language の略。[HTML](https://developer.mozilla.org/ja/docs/Web/HTML) はウェブコンテンツに見出しや段落などを定義して、ユニバーサルな構造を与えます。アクセシビリティ対応のウェブサイトを構築する上でも大事です。

### [Headless CMS](/docs/glossary/headless-cms)

[バックエンド](#backend)と[フロントエンド](#frontend)の両方を管理するのではなく、バックエンドのコンテンツ管理だけを行うための [CMS](#cms)。このセットアップは [Decoupled](#decoupled) とも呼ばれます。

### [Headless WordPress](/docs/glossary/headless-wordpress)

WordPress の REST API から返ってくる JSON を [Headless CMS](#headless-cms) として活用する方法です。JSON をパースできるクライアントにて WordPress を使ってコンテンツの追加や編集を行うことを可能とします。

### ホスティング (Hosting)

ホスティング・プロバイダーはあなたのウェブサイトやアプリのコピーを持ち、世の中に[公開](#public)ための場所を提供しているサービスです。 [Gatsby のサイトをホストできる主なホスティング・プロバイダ・サービス](/docs/deploying-and-hosting/)は Netlify, AWS, S3, Surge, Heroku 等があります。

### ホット・モジュール・リプレイスメント

`gatsby develop` を起動したときに走る機能で、テキストエディタでコードを保存した時に開いているブラウザーのモジュールやコードを置き換えて即時にサイトをアップデートします。

### ハイドレーション (Hydration)

Gatsby によってサイトが[ビルド](#build)され、ブラウザー上に読み込まれた際、[クライアントサイド](#client-side)の JavaScript のコードはあなたのサイトを [DOM](#dom) 操作が行える完全なる React のアプリケーションとして立ち上げます。このプロセスはよくリハイドレーション（re-hydration)と呼ばれます。Gatsby のページを生成するのと同じコードを使われており、その上に `window` のようなブラウザーの DOM API を追加しています。

## I

### インターフェース (Inference)

データ層と[ビルド](#build)プロセスの一部として、Gatsby はデータソース（例：Markdown ファイル、ワードプレス記事など）から自動的に[スキーマ](#schema)を**推論**できます。Gatsby の[カスタムスキーマ API](/docs/schema-customization/) を使うことで、この構造にさらなるコントロールを付与できます。

## J

### [JAMStack](/docs/glossary/jamstack)

JAMStack とは [JavaScript](#javascript)、[APIs](#api)、そして（[HTML](#html) の）Markup から構成されたモダンなウェブアーキテクチャのことです。 [JAMStack.org](https://jamstack.org) から引用。"JAM Stack とは、優れたパフォーマンス、セキュリティ、スケーリングのコスト、開発体験を提供するウェブサイトやアプリを構築する新しい手法です"。

### JavaScript

ウェブサイトに動きを追加し、インタラクティブなコンテンツを作成するためのプログラミング言語。 [JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript) はブラウザーに幅広く使われている Web 技術です。[Node.js](#node) を用いてサーバーサイドでも使用されています。[ECMAScript](#ECMAScript) の仕様を実装したものです。

### JSX

JSX は JavaScript が拡張されたもので、同じコードに HTML やカスタムコンポーネントを含める事ができる拡張子です。JSX は [UI](#UI) を表現する為に [React チームが使うことを推奨](https://ja.reactjs.org/docs/introducing-jsx.html)しています。 JSX は他のテンプレート言語を想起するかもしれませんが、JavaScript をフル活用できる機能です。JSX を使うにあたって重要なのは、JavaScript を使っているため、HTML で使用する一部の attributes は JavaScript の予約語を避けるために他の単語に置き換えられていると言う事です (例えば `htmlFor` や `className` など）。

## K

## L

### Linting

Linting はコードを解析し、構文エラー等を検出するためのプロセスです。Gatsby プロジェクトは [prettier](https://prettier.io/) を使ってよくあるスタイルミスを識別し、修正しています。ほかの React プロジェクトでよく使われている linter の 1 つは [eslint-jsx-plugin-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) を使ったもので、[アクセシビリティ](#accessibility)対応されてない箇所を検出するのに使われています。

## M

### [MDX](/docs/glossary/mdx/)

[React](#react) の[コンポーネント](#component)を [Markdown](#markdown) 上でそのまま使用するための拡張機能。

### [Markdown](/docs/glossary/markdown/)

HTML のコンテンツをプレーンテキストで書くための手法です。コンテンツのタイプを特別な文字列を使って表します。例えば、ハッシュ（#)を使って[見出し](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Heading_Elements)を表したり、下線（\_)やアスタリスク（\*)を使ってテキストの強調を表したりします。

## N

### NPM

[Node](#node) [Package](#package) Manager の略で、プロジェクトが依存する他のパッケージのインストールやアップデートを可能とするツールです。[Gatsby](#gatsby) や [React](#react) もプロジェクトが依存するパッケージの一例です。参照：[Yarn](#yarn)。

### ノード (Node)

Gatsby は[データノード](/docs/node-interface/)を 1 つのデータを表すのに使います。[データソース](#data-source)は複数のデータノードを作成します。

### [Node.js](/docs/glossary/node)

[JavaScript](#javascript) をコンピューター上で実行するためのプログラムです。Gatsby は Node.js によって実装されています。

## O

## P

### パッケージ (Package)

パッケージは多くの場合、使い方の説明が含まれていてバージョン管理されている、配布されている [JavaScript](#javascript) のプログラムです。[NPM](#npm) や [Yarn](#yarn) を使うことでプロジェクトが使うパッケージのインストール、管理が行えます。[Gatsby](#gatsby) もまたパッケージの 1 つです。

### ページ (Page)

[HTML](#html) のページ。

[Gatsby](#gatsby) では `/src/pages/` フォルダーに含まれる、ビルド時にページへと変換される[コンポーネント](#component)のことや、`gatsby-node.js` ファイルから[動的に作成されるページ](/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs)のことを指します。

### プラグイン (Plugin)

Gatsby に元から用意されてなかった機能を追加するためのコード。よく使われる [Gatsby プラグイン](/plugins/)はデータを取得するための[ソースプラグイン](#source-plugins)、およびデータの変換を行うための[トランスフォーマープラグイン](#transformer)などがあります。

### 本番環境 (Production Environment)

[ビルド](#build)されたウェブサイトやアプリが動作している[環境](#environment)のことを指し、[デプロイ](#deploy)された時にユーザーが体験するのはこの環境となります。[CLI](#cli) からは `gatsby build` や `gatsby serve` を実行することでアクセスできます。

### プログラム (Programmatically)

プログラムされていることとは、あなたのコードと設定を元として自動的に実行されることを指します。例えば、あなたがすべてのブログ記事に対してページを作成するようプロジェクトに[設定](#config)してあったり、サイトのフッターに著作権と現在の年を表示するように設定している場合、Gatsby はそれを実行するようにプログラムされています。

### プログレッシブ・エンハンスメント (Progressive enhancement)

プログレッシブ・エンハンスメントとは、ウェブ上に置いてページのコアとなるコンテンツをサーバーから何よりも先に読み込むための設計哲学です。その後、段階的により複雑なプレゼンテーション層や機能をユーザーのブラウザやネットワークが可能な限りコンテンツの上に重ねていきます。Gatsby がページを[ビルド](#build)する上で活用するデフォルトのアプローチは、AOT (ahead-of-time) で読み込むこと、つまり、コンテンツは先に読み込まれ、その後スクリプトが読み込まれて実行されていきます。

### パブリック (Public)

パブリックと言う単語は、主に（あなたのチームとは別の）一般人のことか、[ビルド](#build)されたウェブサイトやアプリが保存されている `/public` フォルダーのことを指します。

## Q

### クエリー (Query)

データをどこかからリクエストするための行為。Gatsby では通常 [GraphQL](#graphql) を用いてクエリーを行います。

## R

### [React](/docs/glossary/react)

[JavaScript](#javascript) によって書かれた、ユーザーインターフェースを作成するためのライブラリーで、[Gatsby](#gatsby) がページをビルドしてコンテンツを構造するために使用するフレームワークです。

### Remark

[Markdown](#markdown) を [HTML](#html) や [React](#react) のコードに変換するためのパーサーライブラリー。

### ランタイム (Runtime)

ランタイムとはプログラムが実行されている時、もしくは実行可能なもののことを指します。これは複数の事象に当てはまります。例えば、[Node.js](#nodejs) は JavaScript のコードを実行するための[サーバーサイド](#server-side)のランタイムです。逆に、[クライアントサイド JavaScript](#client-side) は、従来の JavaScript が実行されるブラウザー上のランタイムです。さらに、Gatsby はユーザーに素早く、インタラクティブで動的な体験を与えるために、[ビルド時](#build)にあなたのサイトをコンパイルし、[React ランタイムによってリハイドレーション](#hydration)しています。

### ルーティング (Routing)

ルーティングとは受け取ったネットワークリクエストから正しいコンテンツをウェブサイトやアプリ上に読み込むためのメカニズムです。主に URL が使われます。例えば、`/about-us` という URL にアクセスしたとき、対応した[ページ](#page)、[テンプレート](#template)、もしくは[コンポーネント](#component)を表示するための仕組みです。

## S

### スキーマ (Schema)

スキーマとは、データがシステム上でどのように保管されているかをデータベースのテーブルやフィールド、または JSON で表現したものです。Gatsby では、GraphQL のスキーマがすべてのクエリ可能なデータ、もしくは Gatsby のデータ層の一部としてコンポーネントが取得できるデータを表現しています。

### サーバーサイド (Server-side)

[クライアント・サーバモデル](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%B5%E3%83%BC%E3%83%90%E3%83%A2%E3%83%87%E3%83%AB)におけるサーバーサイドとは、ネットワーク上のサービスやリソースへとアクセスする為にプログラムによって実行された操作のことです。Gatsby では [Node.js](#nodejs) というサーバーサイドの技術を使ってビルド時にページをコンパイルしています。他のサービスでは[クライアントサイド](#client-side) JavaScript を用いて[ブラウザーのランタイム](#runtime)でページを提供しているサービスもあります。参照：[フロントエンド](#frontend)、[バックエンド](#backend).

### ソースコード (Source Code)

ソースコードは `/src/` フォルダーに保管される、あなたのサイトやアプリを構成するためのコードです。主に [JavaScript](#javascript) で書かれたコードで構成されており、時には [CSS](#css) や他の言語で書かれたファイルも含まれています。

The source code gets [built](#build) into the site the [public](#public) will see.

### ソースプラグイン (Source Plugin)

Gatsby に新たな[データソース](#data-source)を加えるための[プラグイン](#plugin)。これによって、新たなデータをあなたの[ページ](#page)や [コンポーネント](#component)によって[クエリー](#query)可能となります。

### スターター (Starter)

Gatsby のスターターとは、あなたのプロジェクトを始めるのに必要なものがあらかじめ設定された雛形です。[Gatsby スターター集](/starters/)に一覧が用意されており、[Gatsby CLI](/docs/starters/) を使ってインストール可能です。

### 静的 (Static)

Gatsby はあなたのサイトを静的に[ビルド](#build)し、コマンド 1 つで[ホスト](#hosting)できます。これは、その場でページを生成する動的なシステムと違うところです。静的であるということは各コンテンツやコード変更の度に一度の読み込みしか必要がなくなるので、良いパフォーマンスを見込む事ができます。

このサイトでは、他に Gatsby のプロジェクトで用意される `/static` フォルダーのことを指します。これは、[ビルド時](#build)に `/public` フォルダーへと自動的にコピーされるフォルダーのことです。Gatsby によって変換する必要はない一方で [public](#public) フォルダーに入れる必要があるファイル群を入れるフォルダーです。

### [静的サイトジェネレーター(Static Site Generator)](/docs/glossary/static-site-generator)

テンプレートや[コンポーネント](#component)とコンテンツを使って HTML のページを作成するためのソフトウェアです。

## T

### テンプレート (Template)

Gatsby において、[プログラムを用いて](#programmatically)ページに変換される[コンポーネント](#component)のこと。

### テーマ (Theme)

Gatsby のテーマは組み合わせ可能、拡張可能、置き換え可能 ([shadowing](/blog/2019-04-29-component-shadowing/)) なワードプレスのテーマのようなものです。Gatsby テーマは Gatsby アプリのどんな側面もパッケージ可能であり、テーマ内で使いたい機能やオフにしたい機能の切り替えが可能です。

### トランスフォーマー (Transformer)

特定のタイプのデータを他のタイプのデータに変換するための[プラグイン](#plugin)。例えば、スプレッドシート内のデータを [JavaScript](#javascript) の配列へと変換する際に使用します。

## U

### UI

UI とはユーザーインターフェースの事を指します。HCI (Human Computer Interaction) の分野では、UI は人間と機械間のインタラクションが発生する場です。このインタラクションの目的は、ユーザーが機械を効果的に活用可能とし、同時に機械がメッセージや通知など、ユーザーが判断するのに必要な情報をフィードバックすることです。

## V

## W

### [webpack](/docs/glossary/webpack)

Gatsby が使用する [JavaScript](#javascript) アプリで、ウェブサイトのコードをバンドルするのに使われます。これは[ビルド時](#build)に自動的に行われます。

### [WPGraphQL](/docs/glossary/wpgraphql)

A WordPress plugin that adds [GraphQL](#graphql) capabilities to WordPress. It's another way that you can use WordPress as a content source for Gatsby.

## X

## Y

### Yarn

[NPM](#npm) と同じような[パッケージマネージャ](#package)で、一部の人は NPM より好んで使っています。[Gatsby 自体の開発](/contributing/setting-up-your-local-dev-environment/#using-yarn)にも必要になります。

## Z
