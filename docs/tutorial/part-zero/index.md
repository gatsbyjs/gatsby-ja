---
title: 開発環境のセットアップ
typora-copy-images-to: ./
disableTableOfContents: true
---

はじめての Gatsby サイトを構築しはじめる前に、いくつかのコアとなる Web テクノロジーに慣れて、必要なソフトウェアツールがすべてインストールされていることを確認しましょう。

## コマンドラインに慣れる

コマンドラインは、コンピュータでコマンドを実行するために使用するテキストベースのインターフェイスです。よく、ターミナルとも呼ばれます。このチュートリアルでは、両方を同じ意味で使用します。Mac で Finder、Windows で Explorer を使用するのとよく似ています。Finder と Explorer は、グラフィカルユーザーインターフェイス（GUI）の一例です。コマンドラインは、コンピュータと対話するための強力なテキストベースの方法です。

コンピュータのコマンドラインインターフェイス（CLI）を見つけて開いてみましょう。使用しているオペレーティングシステムに応じて、[**Mac の手順**](http://www.macworld.co.uk/feature/mac-software/how-use-terminal-on-mac-3608274/)、[**Windows の手順**](https://www.quora.com/How-do-I-open-terminal-in-windows)、または[**Linux の手順**](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/)を参照してください。

_コマンドラインがはじめての方へ: コマンドを「実行する」とは、与えられた一連の指示をコマンドプロンプトに入力して、エンターキーを押すことを意味します。コマンドは、`node --version`のようにハイライトしたボックスの中に記載します。しかし、ハイライトしたボックスの中のすべてがコマンドというわけではありません！実行する必要があるコマンドは、明示的にそれを実行するよう書かれています。_

## お使いの OS に適切な Node.js をインストールする

Node.js は、Web ブラウザの外部で JavaScript コードの実行ができる環境です。Gatsby は Node.js で構築されています。Gatsby を起動して実行するには、コンピュータに最新バージョンをインストールする必要があります。npm は Node.js にバンドルされているので、もし npm がない場合は、おそらく Node.js もない可能性があります。

### Mac の手順

Gatsby と Node.js をインストールするには、[Homebrew](https://brew.sh/) を使用することをお勧めします。最初に少しセットアップするだけで、後々の頭痛から解放してくれます！

#### コンピュータに Homebrew をインストールするには：

1. ターミナルを開きます。
1. `brew -v`を実行して Homebrew がインストールされているか確認します。"Homebrew"という文字列とバージョン番号が表示されるはずです。
1. もし表示されない場合は、[Homebrew の指示](https://docs.brew.sh/Installation)に従って、ダウンロードしてインストールします。
1. Homebrew をインストールしたら、手順 2 を繰り返して確認します。

#### Xcode コマンドラインツールのインストール：

1. ターミナルを開きます。
1. `xcode-select --install`を実行して Xcode コマンドラインツールをインストールします。
   - もし失敗した場合は、Apple 開発者アカウントでサインインして、[Apple のサイトから直接](https://developer.apple.com/download/more/)ダウンロードします。
1. インストール開始のプロンプトが表示された後、プロンプトが再度表示されて、ダウンロードするツールのソフトウェアライセンスに同意するように求められます。

#### Node のインストール

1. ターミナルを開きます
2. `brew install node`を実行します
   - もし Homebrew でインストールしたくない場合は、[Node.js の公式ウェブサイト](https://nodejs.org/ja/)より、最新バージョンの Node.js をダウンロードして、ダブルクリックして表示されるインストール手順に従ってください。

### Windows の手順

- [Node.js の公式ウェブサイト](https://nodejs.org/ja/)より最新バージョンの Node.js をダウンロードしてインストールします。

### Linux の手順

nvm (Node Version Manager) と必要な依存関係をインストールします。nvm は Node.js 及び、関連ツールのバージョンを管理するために使用します。

_💡 パッケージをインストールしている際、確認が求められるので、`y`を入力してエンターを押します。_

#### Ubuntu, Debian などの `apt` ベースのディストリビューションの場合：

1. 次の手順へ進む前に、`sudo apt update`を実行し、次に `sudo apt -y upgrade` を実行して、Linux ディストリビューションを万全の状態にしておきます。
2. `sudo apt-get install curl`を実行して curl をインストールします。これにより、データ転送と追加の依存関係のダウンロードができます。
3. インストールが完了したら、`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`を実行して、最新バージョンの nvm をダウンロードします。
4. 動作を確認するには、次のコマンドを使用します。 `nvm --version`。バージョン番号が出力されるはずです。
5. [デフォルトの Node.js バージョンをセットします](#set-default-nodejs-version)

#### Arch, Manjaro などの `pacman` ベースのディストリビューションの場合：

1. `sudo pacman -Sy`を実行して、環境を万全の状態にしておきます。
2. これらのディストリビューションには curl がすでにインストールされているので、それを使って nvm をダウンロードできます。
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`
3. nvm を使用する前に、`sudo pacman -S grep awk tar` を実行してさらなる依存パッケージをインストールする必要があります。
4. 動作を確認するには、次のコマンドを使用します。 `nvm --version`。バージョン番号が出力されるはずです。
5. [デフォルトの Node.js バージョンをセットする](#set-default-nodejs-version)

#### Fedora, RedHat などの `dnf` ベースのディストリビューションの場合：

1. これらのディストリビューションには curl がインストールされているので、それを使用して nvm をダウンロードできます。
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash`
2. 動作を確認するには、次のコマンドを使用します。 `nvm --version`。バージョン番号が出力されるはずです。
3. [デフォルトの Node.js バージョンをセットする](#set-default-nodejs-version)

もし、お使いの Linux ディストリビューションがリストにない場合は、web 上で手順を探してください。

#### デフォルトの Node.js バージョンをセットする

nvm をインストールしても、デフォルトでは特定の node バージョンになりません。必要なバージョンをインストールし、nvm にそれを使用するための指示を与える必要があります。この例では、現状最新のリリースであるバージョン 10 を使用していますが、もっと最新のバージョン番号があればそちらを使用することもできます。

```shell
nvm install 10
nvm use 10
```

動作を確認するには、`npm --version`と `node --version` を実行します。出力は下記のスクリーンショットのように、コマンドの応答としてバージョン番号を表示します。

![ターミナルで node と npm のバージョンを確認する](01-node-npm-versions.png)

インストール手順が一通りできて、すべてがちゃんとインストールできたことを確認できたら、次のステップに進みましょう。

## Git をインストールする

Git はフリーでオープンソースの分散バージョン管理システムです。小規模プロジェクトから大規模プロジェクトまで、すべてを迅速かつ効率的に処理するよう設計されています。Gatsby の「スターター」サイトをインストールすると、Gatsby は Git を舞台裏で使用し、スターターに必要なファイルをダウンロードしてインストールします。最初の Gatsby サイトをセットアップするには、Git をインストールする必要があります。

Git をダウンロードしてインストールする手順は、オペレーティングシステムによって異なります。それぞれのシステムのガイドに従ってください。

- [macOS に Git をインストールする](https://www.atlassian.com/git/tutorials/install-git#mac-os-x)
- [Windows に Git をインストールする](https://www.atlassian.com/git/tutorials/install-git#windows)
- [Linux に Git をインストールする](https://www.atlassian.com/git/tutorials/install-git#linux)

## Gatsby CLI の使用

Gatsby CLI ツールを使用すると、新しい Gatsby を搭載したサイトをすばやく作成し、Gatsby サイトを開発するためのコマンドを実行できます。これは npm パッケージとして公開されています。

Gatsby CLI は npm 経由で利用でき、 `npm install -g gatsby-cli`を実行してグローバルにインストールする必要があります。

_**ヒント**: Gatsby をインストールして初めて実行すると、Gatsby コマンドが収集する匿名の使用状況データについて通知する短いメッセージを表示します。そのデータをどのように取得し、使用するのかの詳細は [テレメトリドキュメント](/docs/telemetry)で確認ができます。_

利用可能なコマンドを確認するには、 `gatsby --help`を実行します。

![ターミナルでgatsbyコマンドを確認](05-gatsby-help.png)

> 💡 権限の問題のために Gatsby CLI を正常に実行できない場合は、[権限の修正に関する npm ドキュメント](https://docs.npmjs.com/getting-started/fixing-npm-permissions)、または[このガイド](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)を参照してみてください。

## Gatsby サイトを作成する

これで、Gatsby CLI ツールを使用して最初の Gatsby サイトを作成する準備ができました。このツールを使用すると、「スターター」（一部のデフォルト構成の部分的に構築されたサイト）をダウンロードして、特定のタイプのサイトの作成を迅速に進めることができます。ここで使用する"Hello World"スターターは、Gatsby サイトに必要な最低限の要素を備えたスターターです。

1. ターミナルを開きます。
2. `gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world`を実行します。（_注: ダウンロード速度に応じて、これにかかる時間は異なります。簡潔にするため、以下の gif はインストール中に一時停止しています_）。
3. `cd hello-world`を実行します。
4. `gatsby develop`を実行します。

<video controls="controls" autoplay="true" loop="true">
  <source type="video/mp4" src="./03-create-site.mp4" />
  <p>ごめんなさい! あなたのブラウザはこのビデオをサポートしていません。</p>
</video>

何が起きたの？

```shell
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

- `new`は、新しい Gatsby プロジェクトを作成する gatsby コマンドです。
- ここで、"hello-world" は任意のタイトルなので、お好みのタイトルを入力できます。CLI ツールは、新しいサイトのコードを "hello-world" という新しいフォルダーに配置します。
- 最後に、指定した GitHub の URL は、使用するスターターコードを保持するコードのリポジトリを指します。

```shell
cd hello-world
```

- これは、**"hello-world" サブフォルダにディレクトリを変更（`cd`）したい**という意味になります。サイトに対してコマンドを実行したいときはいつでも、そのサイトのコンテキスト内にいる必要があります（ようするに、ターミナルはサイトコードが存在するディレクトリを指す必要があります）。

```shell
gatsby develop
```

- このコマンドは、開発サーバーを起動します。開発環境またはローカル（コンピュータにあり、インターネットに公開されていない）で新しいサイトを表示し、やりとりができます。

### サイトをローカルに表示する

ブラウザで新しいタブを開き、[**http://localhost:8000**](http://localhost:8000/)に移動します。

![ホームページを確認する](04-home-page.png)

おめでとうございます！これが、最初の Gatsby サイトの始まりです！🎉

開発サーバーが実行されている限り、[**_http://localhost:8000_**](http://localhost:8000/)でローカルのサイトにアクセスできます。これは、`gatsby develop`コマンドを実行して開始したプロセスです。そのプロセスの実行を停止（または「開発サーバーの実行を停止」）するには、ターミナルウィンドウに戻り、「コントロール」キーを押しながら「c」(ctrl-c)を押します。もう一度起動するには、再度 `gatsby develop` を実行してください！

**ヒント：** `vagrant`のような VM を使用してセットアップしている場合、および/またはローカル IP アドレスでリッスンしたい場合は、`gatsby develop ---host=0.0.0.0`を実行します。これで、開発サーバーは"localhost"とローカル IP の両方でリッスンします。

## コードエディターを設定する

コードエディターは、コンピュータコードの編集専用に設計されたプログラムです。すばらしいものがたくさんあります。

### VS Code をダウンロードする

Gatsby のドキュメントには、VS Code で撮影したスクリーンショットが含まれている場合があります。そのため、まだお気に入りのコードエディターをお持ちでない場合、VS Code を使用すると、画面がチュートリアルやドキュメントのスクリーンショットのようになります。VS Code を使用する場合は、[VS Code サイト](https://code.visualstudio.com/#alt-downloads)にアクセスし、プラットフォームに適したバージョンをダウンロードしてください。

### Prettier プラグインをインストールする

また、エラーを回避するためにコードをフォーマットするのに役立つツールである[Prettier](https://github.com/prettier/prettier)を使用することもお勧めします。

[Prettier VS Code plugin](https://github.com/prettier/prettier-vscode)を使用して、エディターで Prettier を直接使用できます。

1. VS Code で拡張機能ビューを開きます（表示=>拡張機能）。
2. 「Prettier - Code formatter」を検索します。
3. 「インストール」をクリックします。（インストール後、VS Code を再起動して拡張機能を有効にするよう求められます。VS Code の新しいバージョンでは、ダウンロード後に拡張機能が自動的に有効になります）

> 💡 VS Code を使用していない場合は、Prettier ドキュメントの[インストール手順](https://prettier.io/docs/en/install.html)、または[他のエディタでの連携](https://prettier.io/docs/en/editors.html)をチェックしてみてください。

## ➡️ 次は？

このセクションでは以下の内容を学びました。

- コマンドラインとその使用方法について
- Node.js と npm CLI ツール、バージョン管理システムの Git、および Gatsby CLI ツールをインストール
- Gatsby CLI ツールを使用して新しい Gatsby サイトを生成しました
- Gatsby 開発サーバーを実行し、ローカルのサイトにアクセスしました
- コードエディターをダウンロードしました
- Prettier というコードフォーマッターをインストールしました

次は、[**Gatsby の構成要素を理解する**](/tutorial/part-one/)に進みましょう。

## リファレンス

### コアテクノロジーの概要

すでにこれらのエキスパートである必要はありません。そうでない場合でも心配しないでください！このチュートリアルシリーズのコースを通じて多くのことを学べます。これらは、Gatsby サイトを構築するときに使用する主な Web テクノロジーの一部です。

- **HTML**: すべての Web ブラウザが理解できるマークアップ言語。HyperText Markup Language の略です。HTML は、Web コンテンツに普遍的な情報構造を与え、見出し、段落などを定義します。
- **CSS**: Web コンテンツの外観（フォント、色、レイアウトなど）のスタイルを設定するために使用するプレゼンテーション言語。Cascading Style Sheets の略です。
- **JavaScript**: ウェブを動的かつインタラクティブにするプログラミング言語。
- **React**: ユーザーインターフェイスを構築するためのコードライブラリ（JavaScript で構築）。これは、Gatsby がページの構築とコンテンツの構造化に使用しているフレームワークです。
- **GraphQL**: データをウェブサイトに取得するためのクエリ言語。これは、Gatsby がサイトデータの管理に使用するインターフェイスです。

### ウェブサイトとは何ですか？

HTML と CSS の入門を含んだウェブサイトの概要については、「[**はじめての Web ページ作成**](https://learn.shayhowe.com/html-css/building-first-web-page/)」を参照してください。ウェブについて学び始めるのに最適なサイトです。より実践的な紹介については、[**HTML**](https://www.codecademy.com/learn/learn-html)、[**CSS**](https://www.codecademy.com /learn/learn-css)、[**JavaScript**](https://www.codecademy.com/learn/introduction-to-javascript)、などの Codecademy のチュートリアルをご覧ください。[**React**](https://reactjs.org/tutorial/tutorial.html)および[**GraphQL**](http://graphql.org/graphql-js/)にも独自の入門チュートリアルがあります。

### さらにコマンドラインを学ぶ

コマンドラインの使用に関する優れた紹介については、Mac および Linux ユーザー向けでは[**Codecademy のコマンドラインチュートリアル**](https://www.codecademy.com/courses/learn-the-command-line/lessons/navigation/exercises/your-first-command)、Windows 向けでは[**このチュートリアル**](https://www.computerhope.com/issues/chusedos.htm)をご覧ください。Windows ユーザーであっても、Codecademy チュートリアルの最初のページは読む価値があります。使い方だけではなく、コマンドラインとは何なのかを説明しています。

### さらに npm を学ぶ

npm は JavaScript のパッケージマネージャーです。パッケージとは、プロジェクトを拡張するために選択することのできるコードのモジュールです。もし、Node.js をダウンロードしてインストールしたばかりであれば、npm も一緒にインストールされています！

npm は、npm ウェブサイト、npm レジストリ、そして npm コマンドラインインターフェイス（CLI）の 3 つの異なるコンポーネントがあります。

- npm ウェブサイトで、npm レジストリで使用可能な JavaScript パッケージを参照できます。
- npm レジストリは、npm で利用可能な JavaScript パッケージに関する情報の大規模なデータベースです。
- 必要なパッケージを特定したら、npm CLI を使用してプロジェクトにインストールするか、他の CLI ツールと同様にグローバルにインストールできます。npm CLI はレジストリとやりとりするものです。通常、npm ウェブサイトまたは npm CLI のみを操作します。

> 💡 npm の紹介「[**npm とは何ですか？**](https://docs.npmjs.com/getting-started/what-is-npm)」もぜひご覧ください。

### さらに Git を学ぶ

このチュートリアルを完了するために Git を知っている必要はありませんが、非常に便利なツールです。バージョン管理、Git、および GitHub の詳細については、GitHub の[Git ハンドブック](https://guides.github.com/introduction/git-handbook/)をご覧ください。
