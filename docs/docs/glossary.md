---
title: 用語集
disableTableOfContents: true
---

import HorizontalNavList from "../../www/src/components/horizontal-nav-list.js"

Gatsby をはじめたばかりの時は、覚えるべき用語がたくさんあって大変でしょう。この用語集ではよく使われる用語の意味と、Gatsby のサイト上でどのように使われているかを説明します。

<HorizontalNavList
items={"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}
slug={props.slug}
/>

## A

### 抽象構文木 (AST)

抽象構文木 (Abstract Syntax Tree、AST) とは、言語から別の言語へ[コンパイル](#compiler)する際、その中間を繋ぎ、ソースコードを木構造で表現したものです。例えば、[gatsby-transformer-remark](/packages/gatsby-transformer-remark/) プラグインは [Remark](#remark) パーサーを使用し、 [Markdown](#markdown) からその内容を表す AST を作成します。

### API

API とは Application Programming Interface の略で、アプリ間の連絡を可能とするメソッドです。例えば、[ソースプラグイン](#source-plugin)は API を使って自身のデータを取得します。

### アクセシビリティ (Accessibility)

The inclusive practice of removing barriers that prevent interaction with, or access to websites, by people with disabilities. When sites are correctly designed, developed and edited for accessibility, generally all users have equal access to information and functionality. Read about [Gatsby's Commitment to Accessibility](/blog/2019-04-18-gatsby-commitment-to-accessibility/).

## B

### Babel

最新の [JavaScript](#javascript) をかけるようにするためのツールです。[ビルド時](#build) にほとんどの Web ブラウザーが読めるように[コンパイル](#compiler)されます。

### バックエンド (Backend)

The behind the scenes that the [表](#public) does not see. This often refers to the control panel of your [CMS](#cms). These are often powered by server-side programming languages such as Node.js, PHP, Go, ASP.net, Ruby, or Java.

### ビルド (Build)

Gatsby では、ビルドはあなたのコードやコンテンツを this is the process of taking your code and content and packaging it into a website that can be hosted and accessed. Commonly referred to as _build time_. 参照： [バックエンド](#backend)、[サーバサイド](#server-side)。

## C

### キャッシュ (Cache)

一度読み込んだ情報を、再利用するためローカルに保存されたもの。保存される事によって、次回の計算や検索結果をより早く提供できるようになります。 Gatsby はキャッシュを使ってあなたのサイトのビルドを高速で行うために使用しています。

### CLI

Command Line Interface (コマンドラインインターフェース）: あなたのパソコンの[コマンドライン](#command-line)上で動作し、あなたのキーボードと Interact するアプリ。

Gatsby には 2 つのコマンドラインインターフェースがあります。 One, [`gatsby`](/docs/gatsby-cli/), for day-to-day development with Gatsby and another, [`gatsby-dev`](/contributing/setting-up-your-local-dev-environment/#gatsby-repo-install-instructions), for those who contribute to the Gatsby project.

### クライアントサイド (Client-side)

Client-side refers to operations that are performed by the user's browser in a [client–server relationship](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) in a computer network. In Gatsby, this is important when [working with packages](/docs/using-client-side-only-packages/) that rely on objects in the [browser DOM](#dom), such as `window` or `navigator`. See also: [server-side](#server-side), [frontend](#frontend), and [backend](#backend).

### CMS

Content Management System: an application where you can manage your content and have it saved to a database or file for accessing later. Examples of Content Management Systems include WordPress, Drupal, Contentful, and Netlify CMS.

### コマンドライン (Command Line)

A text-based interface to run commands on your computer. The default Command Line applications for Mac and Windows are `Terminal` and `Command Prompt` respectively.

### コンパイラー (Compiler)

A compiler is a program that translates code written in one language to another language. 例えば、 [Gatsby](#gatsby) は [React](#react) のアプリを静的 [HTML](#html) ファイルにコンパイルできます。

### コンポーネント (Component)

コンポーネントとは [React](#react) で作成された、再利用可能な独立したコード。コンポーネントを組み合わせることであなたのウェブサイトやアプリが構成されます。

コンポーネントは他のコンポーネントを含むことができます。例えば、[ページ](#page)や[テンプレート](#template)はコンポーネントの 1 つです。

### コンフィグ (Config)

設定ファイルのこと。Gatsby では `gatsby-config.js` を使って Gatsby にあなたのサイトの設定を行います。よく使われる設定はサイトの metadata を設定してあなたのサイトの SEO を向上するための設定です。

### CSS

[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) は Cascading Style Sheets の事を指します。[HTML](#html) と [JavaScript](#javascript) と共に、サイトを構成する主戦物です。 CSS is a language for styling webpages designed to be highly backwards-compatible. As new features are rolled out to end users, [CSS parsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#CSS_parsing) can safely ignore unsupported features and enhance with the properties they do support. CSS accomplishes this with its _cascading_ design, fundamental to styling with new techniques like [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement) while providing fallbacks for older browsers. Gatsby supports multiple [approaches to styling](/docs/styling/), including regular CSS files, CSS modules, and CSS-in-JS.

## D

### データソース (Data Source)

Content and data's origin point, typically integrated into Gatsby with [source plugins](#source-plugin). A data source is often a [Headless CMS](#headless-cms), but it could also include Markdown, JSON, or YAML files.

### データベース (Database)

データベースとは is a structured collection of data or content. Often a [CMS](#cms) will save to a database using [backend technologies](#backend). They're often accessed in Gatsby via a [source plugin](#source-plugin)

### Decoupled

Decoupling describes the separation of different concerns. With [Gatsby](#gatsby) this most commonly means decoupling the [frontend](#frontend) from the [backend](#backend), like with [Decoupled Drupal](https://dri.es/how-to-decouple-drupal-in-2019) or [Headless WordPress](https://www.smashingmagazine.com/2018/10/headless-wordpress-decoupled/).

### デプロイ (Deploy)

あなたのウェブサイトを[ビルド](#build)し、[ホストプロバイダ](#hosting)にアップロードする一連の動作のこと。

### 開発環境 (Development Environment)

The [環境](#environment) when you're developing your code. It's accessed through the [CLI](#cli) using `gatsby develop`, and provides extra error reporting and things to help you debug before building for [production](#production-environment).

### DOM

The Document Object Model, commonly referred to as "the DOM", is a standard browser API that connects web pages to scripts or programming languages by representing the structure of an HTML document in memory. Developers commonly interact with the DOM through [HTML](#html) markup (written in [JSX](#jsx) in Gatsby), as well as both [React](https://reactjs.org/docs/react-dom.html) and [vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#DOM_and_JavaScript) code. Another important aspect of utilizing the DOM to its full potential is writing [accessible](#accessibility) HTML markup to expose a page's structure to assistive technology.

## E

### ECMAScript

ECMAScript (often referred to as ES) is a specification for scripting languages. [JavaScript](#javascript) is an implementation of ECMAScript. Often developers will use [Babel](#babel) to [compile](#compiler) the latest ECMAScript code into more widely supported JavaScript.

### 環境 (Environment)

Gatsby が動作するうための環境のこと。例えば、when you are writing your code you probably want as much debugging as possible, but that's undesirable on the live website or app. As such, Gatsby can change its behavior depending on the environment it's in。

Gatsby ではデフォルトで 2 つの環境を提供しています。[開発環境](#development-environment)と[本番環境](#production-environment)です。

### 環境変数 (Environment Variables)

[環境変数](/docs/environment-variables/)は[環境](#environment)によってあなたのアプリの動作を変更するためのもの。例えば、 For instance, you may wish to get content from a staging CMS during development and connect to your production CMS when you [build](#build) your site. With environment variables you can set a different URL for each environment.

## F

### ファイルシステム (Filesystem)

ファイルがどのように構成されているかのこと。Gatsby では、 it means having files in the same place as your website's or app's code instead of pulling data from an external [source](#data-source). Common filesystem usage in Gatsby includes Markdown content, images, data files, and other assets.

### フロントエンド (Frontend)

The [public-facing](#public) interface for your website or app, delivered using web technologies: HTML, CSS, and JavaScript. For more insight into how the Web Platform brings these technologies together, check out this article on [How Browsers Work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/).

## G

### Gatsby

Gatsby はモダンなウェブサイト作成のフレームワーク。 a modern website framework that builds performance into every website or app by leveraging the latest web technologies such as [React](#react), [GraphQL](#graphql), and modern [JavaScript](#javascript). Gatsby makes it easy to create blazing fast, compelling web experiences without needing to become a performance expert.

### [GraphQL](/docs/glossary/graphql)

あなたのウェブサイトやアプリに使うためのデータを取得するための[クエリ](#query)言語。Gatsby がサイトのデータを管理するための[インターフェース](/docs/graphql/)。

## H

### HTML

すべてのブラウザーが理解可能なマークアップ言語。Hypertext Markup Language の略。 [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) gives your web content a universal informational structure, defining things like headings, paragraphs, and more. It is also key to providing an accessible website.

### Headless CMS

[バックエンド](#backend)と[フロントエンド](#frontend)の両方を管理するのではなく、バックエンドのコンテンツ管理だけを行うための [CMS](#cms)。このセットアップは [Decoupled](#decoupled) とも呼ばれる。

### ホスティング (Hosting)

ホスティング プロバイダーはあなたの ウェブサイトやアプリのコピーを持ち、世の中に[公開](#public)ための場所を提供しています。 [Gatsby のサイトをホストできる主なホスティングプロバイダ](/docs/deploying-and-hosting/)は Netlify, AWS, S3, Surge, Heroku 等です。

### ホット・モジュール・リプレイスメント

`gatsby develop` を起動したときに走る機能で、テキストエディタでコードを保存した時に開いているブラウザーのモジュールやコードを置き換えて即時にサイトをアップデートする機能です。

### Hydration

Once a site has been [built](#build) by Gatsby and loaded in a web browser, [client-side](#client-side) JavaScript assets will download and turn the site into a full React application that can manipulate the [DOM](#dom). This process is often called re-hydration as it runs some of the same JavaScript code used to generate Gatsby pages, but this time with browser DOM APIs like `window` available.

## I

### インターフェース (Inference)

As part of its data layer and [build](#build) process, Gatsby will automatically **infer** a [schema](#schema), or type-based structure, based on available data sources (e.g. Markdown file nodes, WordPress posts, etc.). More control can be gained over this structure by using Gatsby's [Schema Customization API](/docs/schema-customization/).

## J

### JAMStack

JAMStack refers to a modern web architecture using [JavaScript](#javascript), [APIs](#api), and ([HTML](#html)) markup. From [JAMStack.org](https://jamstack.org): "It’s a new way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience."

### JavaScript

ウェブサイトに動きを追加し、インタラクティブなコンテンツを作成するためのプログラミング言語。 [JavaScript](https://developer.mozilla.org/en-US/docs/Web/Javascript) はブラウザーに幅広く使われている Web 技術です。[Node.js](#node) を用いてサーバーサイドでも使用されています。[ECMAScript](#ECMAScript) の仕様を実装したもの。

### JSX

JSX は JavaScript が拡張されたもので、同じコードに HTML やカスタムコンポーネントを含める事ができる拡張子です。 JSX は [UI](#UI) を表現する為に [React チームが使うことを推奨](https://reactjs.org/docs/introducing-jsx.html)しています。 JSX は他のテンプレート言語を想起するかもしれませんが、JavaScript をフル活用できる機能です。JSX を使うにあたって重要なのは、JSX は JavaScript を使うため、HTML で使用する一部の attributes は JavaScript の予約語を避けるために他の単語に置き換えられていると言う事です (例えば `htmlFor` や `className` 等）。

## K

## L

### Linting

Linting はコードを解析し、構文エラー等を検出するためのプロセスです。 Gatsby プロジェクトは [prettier](https://prettier.io/) を使ってよくあるスタイルミスを識別し、修正しています。ほかの React プロジェクトでよく使われている linter の 1 つは [eslint-jsx-plugin-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) を使ったもので、よくある[アクセシビリティ](#accessibility)対応されてない箇所を検出されるのに使われています。

## M

### MDX

[React](#react) の[コンポーネント](#component)を [Markdown](#markdown) 上でそのまま使用できるようにするための拡張機能。

### Markdown

A way of writing HTML content with plain text, using special characters to denote content types such as hash symbols for [headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), and underscores and asterisks for text emphasis.

## N

### NPM

[Node](#node) [Package](#package) Manager のこと。プロジェクトが依存する他のパッケージのインストールやアップデートを可能とします。[Gatsby](#gatsby) や [React](#react) はプロジェクトが依存するパッケージの一例です。 参照：[Yarn](#yarn)。

### ノード (Node)

Gatsby は 1 つのデータを表す[データノード](/docs/node-interface/) to represent a single piece of data. A [data source](#data-source) will create multiple nodes.

### [Node.js](/docs/glossary/node)

A program that lets you run [JavaScript](#javascript) on your computer. Gatsby は Node によって実装されています。

## O

## P

### パッケージ (Package)

A package usually describes a [JavaScript](#javascript) program that has additional information about how it should be distributed and used, such as its version number. [NPM](#npm) and [Yarn](#yarn) manages and installs the packages your project uses. [Gatsby](#gatsby) itself is a package.

### ページ (Page)

An [HTML](#html) page.

This also often refers to [components](#component) that live in `/src/pages/` and are converted to pages by [Gatsby](#gatsby), as well as [pages created dynamically](/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs) in your `gatsby-node.js` file.

### プラグイン (Plugin)

Additional code that adds functionality to Gatsby that wasn't included out-of-the-box. Common [Gatsby plugins](/plugins/) include [source](#source-plugins) and [transformer](#transformer) plugins for pulling in and manipulating data, respectively.

### 本番環境 (Production Environment)

The [environment](#environment) for the [built](#build) website or app that users will experience when [deployed](#deploy). It can be accessed through the [CLI](#cli) using `gatsby build` or `gatsby serve`.

### Programmatically

Something that automatically happens based on your code and configuration. For example, you might [configure](#config) your project to create a [page](#page) for every blog post written, or read and display the current year as part of a copyright in your site footer.

### Progressive enhancement

Progressive enhancement is a strategy for the web that emphasizes core page content is loaded from a server before anything else, without [JavaScript](#javascript) as a requirement to load. This strategy then progressively adds more complex layers of presentation and features on top of the content as the end user's browser/network connection allow. Gatsby's default approach to [building](#build) pages ahead-of-time means content will load first and enhance as scripts download and execute.

### パブリック (Public)

This usually refers to either a member of the public (as opposed to your team) or the folder[ビルド](#build)されたウェブサイトやアプリが保存された `/public` フォルダーの事を指します。

## Q

### クエリ (Query)

The process of requesting specific data from somewhere. With Gatsby you normally query with [GraphQL](#graphql).

## R

### [React](/docs/glossary/react)

A code library (written with [JavaScript](#javascript)) for building user interfaces. It’s the framework that [Gatsby](#gatsby) uses to build pages and structure content.

### Remark

[Markdown](#markdown) を [HTML](#html) や [React](#react) のコードに変換するためのパーサーライブラリ。

### ランタイム (Runtime)

Runtime is when a program is running (or being executable); it can refer to a few things. [Node.js](#nodejs) is a [server-side](#server-side) runtime that executes JavaScript code. [Client-side JavaScript](#client-side), on the other hand, refers to the browser runtime where traditional JavaScript code executes. Gatsby compiles your site at [build time](#build) and [rehydrates with a React runtime](#hydration) to provide a fast, interactive, and dynamic user experience.

### ルーティング (Routing)

Routing is the mechanism for loading the correct content in a website or app based on a network request - usually a URL. For example, it allows for routing URLs like `/about-us` to the appropriate [page](#page), [template](#template), or [component](#component).

## S

### スキーマ (Schema)

An exact representation of how data is stored in a system, such as tables and fields in a database or a JSON file structure. In Gatsby, the GraphQL schema expresses all queryable data - or data that components can ask about as part of Gatsby's data layer.

### サーバーサイド (Server-side)

The server-side part of the [client-server relationship](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) refers to operations performed by a computer program which manages access to a centralized resource or service in a computer network. Gatsby uses the server-side technology [Node.js](#nodejs) to compile pages at build time, as opposed to serving them at [browser runtime](#runtime) with [client-side](#client-side) JavaScript. See also: [frontend](#frontend) and [backend](#backend).

### ソースコード (Source Code)

ソースコードは `/src/` フォルダーに保管される、あなたのサイトやアプリを構成するためのコードです。主に [JavaScript](#javascript) で書かれたコードで構成されています。and sometimes [CSS](#css) and other files.

The source code gets [built](#build) into the site the [public](#public) will see.

### ソースプラグイン (Source Plugin)

A [plugin](#plugin) that adds additional [data sources](#data-source) to Gatsby that can then be [queried](#query) by your [pages](#page) and [components](#component).

### スターター (Starter)

A pre-configured Gatsby project that can be used as a starting point for your project. They can be discovered using the [Gatsby Starter Library](/starters/) and installed using the [Gatsby CLI](/docs/starters/).

### 静的 (Static)

Gatsby はあなたのサイトを静的に[ビルド](#build)し、コマンド 1 つで[ホスト](#hosting)できます。これは、その場でページを生成する動的なシステムと違うところです。静的であるということは各コンテンツやコード変更の度に一度の読み込みしか必要がなくなるので、良いパフォーマンスを見込む事ができます。

このサイトでは、他に Gatsby のプロジェクトで用意される `/static` フォルダーのことを指します。これは、[ビルド時](#build)に `/public` フォルダーへと自動的にコピーされるフォルダーのことで、Gatsby によって変換する必要は無いが、[public](#public) フォルダーにある必要があるファイル群を入れるフォルダーです。

## T

### テンプレート (Template)

A [component](#component) that is [programmatically](#programmatically) turned into a page by Gatsby.

### テーマ (Theme)

Gatsby のテーマは組み合わせ可能、拡張可能、置き換え可能 ([shadowing](/blog/2019-04-29-component-shadowing/)) な WordPress のテーマのようなものです。Gatsby テーマは Gatsby アプリのどんな側面もパッケージ可能であり、テーマ内で使いたい機能やオフにしたい機能の切り替えが可能です。

### トランスフォーマー (Transformer)

特定のタイプのデータを他のタイプのデータに変換するための[プラグイン](#plugin)。例えば、 spreadsheet 内のデータを [JavaScript](#javascript) の配列へと変換する際に使用します。

## U

### UI

UI とはユーザーインターフェースの事を指します。In the field of human-computer interaction, a UI is a space where interactions between humans and machines occur. The goal of this interaction is to allow effective operation and control of the machine from the human end, while the machine simultaneously feeds back information that aids the user's decision-making process (such as error messages or notifications)。

## V

## W

### [webpack](/docs/glossary/webpack)

Gatsby が使用する [JavaScript](#javascript) アプリで、ウェブサイトのコードをバンドルするのに使われます。これは[ビルド時](#build)に自動的に行われます。

## X

## Y

### Yarn

[NPM](#npm) と同じような[パッケージマネージャ](#package)で、一部の人は NPM より好んで使っています。 [Gatsby 自体の開発](/contributing/setting-up-your-local-dev-environment/#using-yarn)にも必要になります。

## Z
