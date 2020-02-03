---
title: Node.js のバージョンを更新する
---

## Gatsby の Node.js サポートポリシー

Gatsby は _Current_、_Active_、_Maintenance_ のいずれのリリースステータスの Node.js もサポートすることを目指しています。Node.js のメジャーバージョンが _End of Life_ に達すると、Gatsby はそのメジャーバージョンのサポートを終了します。

マイナーバージョンが _End of Life_ になると、そのバージョンのサポートを終了します。

現在のリリースステータスを確認したい場合は [Node.js のリリースノート](https://github.com/nodejs/Release#nodejs-release-working-group) をご覧ください。

## 私はどのバージョンの Node.js を使っているのでしょうか？

ターミナル上で `node -v` を実行すると、現在使用している Node.js のバージョンを確認できます。

```shell
node -v
v10.18.0
```

上記の例では Node.js 10 を、具体的には v10.18.0 を使っていることが分かります。

## Node.js のバージョンを 8 より上にアップグレードする

Node.js 8 は 2019 年 12 月 31 日にステータスが _End-of-life_ に達しました。Gatsby の依存モジュールの多くは Node.js のバージョンを 10 以上にアップグレードしているところです。Gatsby も新機能やバグ修正をより迅速に提供するためにアップデートする必要があります。

一般的には、[リリースステータスが _Active LTS_ になっているバージョンの Node.js](https://github.com/nodejs/Release#nodejs-release-working-group) を使うことが推奨されます（このドキュメントの執筆時点では Node.js 10 です）。

> Node.js 9 はどこへ行ったのでしょうか？ 実は Node.js の安定したバージョンはリリース番号が偶数なのです— Node.js 6、Node.js 8、Node.js 10 というように。奇数番号の Node.js を使うのは最先端の実験的な機能を試したい場合のみにしましょう。

Node.js のバージョンを更新する方法は、最初に Node.js をインストールした方法に応じて複数あります。これを読んで、あなたにとってもっとも適切な方法を見つけてください。

### Homebrew を使う

新しいバージョンの Node.js をインストールするおすすめの方法です。

? もし [チュートリアルの Part 0](https://www.gatsbyjs.org/tutorial/part-zero/#-install-nodejs-and-npm) にしたがっていれば、すでに Homebrew をインストールしているはずです。Homebrew は Node.js（およびその他のソフトウェア）の特定のバージョンをインストールできるプログラムです。

Node.js 8 から 10 に更新するためには、ターミナルを起動して以下のコマンドを実行してください。

```shell
brew search node
```

すると以下のような出力が表示されるはずです。

```shell
brew search node
==> Formulae
heroku/brew/heroku-node ✔        llnode                           node@10                          nodebrew
leafnode                         node ✔                           node@8                           nodeenv
libbitcoin-node                  node-build                       node_exporter                    nodenv
```

あなたが Node.js 8 より新しい安定バージョンの Node.js 10 を使いたいとします。Homebrew では `node@10` という名前のパッケージをインストールすることで利用可能になります。以下を実行してください。

```shell
brew install node@10
```

インストールが完了したら以下を実行してください。

```shell
node -v
```

これで、Node.js 8 から 10 への更新が完了したことを確認できます。

### バージョン管理ツールを使う

There are two popular packages used for managing multiple versions of Node.js on your system. Use one of these to update to a newer version of Node.js if they're already available on your computer.

複数の Node.js のバージョンをシステム上で管理するために使用される人気のツールが 2 つあります。もしすでにコンピュータがバージョン管理ツールを使える状態にあるなら、それを使って新しいバージョンの Node.js に更新しましょう。

このようなバージョン管理ツールは、日常的に様々なバージョンの Node.js を使って作業をする人にとって非常に便利です。

#### nvm

```shell
nvm
```

このコマンドを実行して、nvm がインストール済みかどうかを確認します。もしインストールされていれば、以下のコマンドを実行できます。

```shell
nvm install 10
nvm alias default 10
```

これで、Node.js 10 をインストールし、使うことができるようになります。

詳細な手順は [nvm のドキュメント](https://github.com/nvm-sh/nvm) をご覧ください。

#### n

Run:

```shell
n
```

このコマンドを実行して、n がインストール済みかどうかを確認します。もしインストールされていれば、`n 10` を実行することで Node.js 10 をインストールし、使うことができるようになります。

詳細な手順は [n のドキュメント](https://github.com/tj/n) をご覧ください。

### nodejs.org からインストールする

ここまで紹介したインストール手段のいずれも使っていない場合、[nodejs.org から直接 Node.js のインストーラをダウンロードする](https://nodejs.org/en/) ことができます。

Gatsby が推奨するのは Homebrew を使って Node.js をインストールする方法です。詳しくは、[すでに説明した Homebrew のセクション](#using-homebrew) を参照してください。

## まとめ

Gatsby は後方互換性を重視しており、可能な限り古いバージョンの Node.js をサポートすることを目指しています。私たちは、異なるバージョンのソフトウェアに翻弄されるのは生産的な過ごし方ではないことを理解しています。

また、Gatsby は JavaScript の依存モジュール関係からなる巨大なエコシステムにも依存しています。そのようなエコシステムが、過去のサポートされていない Node.js のバージョンから離れていくのに合わせて、Gatsby 自身もアップデートしていくことで、バグを修正し、新機能をリリースできるようにする必要があります。

このドキュメントでは（すでにステータスが _End of Life_ に達した）Node.js 8 から Node.js 10 へとアップグレードする方法を紹介しました。
