---
title: Gatsby on Linux
---

このガイドは、すでにあなたのマシンに Linux がネイティブインストールされていることを前提としています。以下のステップでは、Node.js および関連する依存パッケージをインストールする方法を説明します。

## Ubuntu, Debian, その他の `apt` ベースのディストロ

まずアップデートとアップグレードから始めましょう。

```shell
sudo apt update
sudo apt -y upgrade
```

データの転送および追加の依存パッケージのダウンロードをするため、cURL をインストールします。

```shell
sudo apt install curl
```

`curl` をインストールしたら、さらに `nvm` をインストールすることで `node` とその関連するすべてのバージョンを管理できるようになります。

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

> これは nvm の現時点での安定版リリースであることに注意してください。完全なインストール手順とトラブルシューティングは [nvm GitHub page](https://github.com/nvm-sh/nvm) で見つけることができます。

`nvm` がインストールされても、デフォルトでは特定の `node` バージョンにはなりません。必要なバージョンをインストールして、それを使うよう `nvm` に指示する必要があります。この例ではバージョン `10` の最新リリースを使っていますが、代わりにより新しいバージョンを使っても構いません。

```shell
nvm install 10
nvm use 10
```

以下のコマンドを使って、これが正しく動作しているかを確認できます。

```shell
node -v
```

> `npm` は `node` と一緒にパッケージ化されていることに注意してください。

最後に、`git` をインストールします。これはスターターをベースに Gatsby プロジェクトを作るために必要となります。

```shell
sudo apt install git
```

## Fedora, RedHat, その他の `dnf` ベースのディストロ

これらのディストロには `curl` が一緒にインストールされているため、それを使って `nvm` をダウンロードできます。

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

> これは nvm の現時点での安定版リリースであることに注意してください。完全なインストール手順とトラブルシューティングは [nvm GitHub page](https://github.com/nvm-sh/nvm) で見つけることができます。

`nvm` がインストールされても、デフォルトでは特定の `node` バージョンにはなりません。必要なバージョンをインストールして、それを使うよう `nvm` に指示する必要があります。この例ではバージョン `10` の最新リリースを使っていますが、代わりにより新しいバージョンを使っても構いません。

```shell
nvm install 10
nvm use 10
```

以下のコマンドを使って、これが正しく動作しているかを確認できます。

```shell
node -v
```

> `npm` は `node` と一緒にパッケージ化されていることに注意してください。

最後に、`git` をインストールします。これはスターターをベースに Gatsby プロジェクトを作るために必要となります。

```shell
sudo dnf install git
```

## Archlinux およびその他の `pacman` ベースのディストロ

まずアップデートから始めます。

```shell
sudo pacman -Sy
```

これらのディストロには `curl` が一緒にインストールされているため、それを使って `nvm` をダウンロードできます。

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

> これは nvm の現時点での安定版リリースであることに注意してください。完全なインストール手順とトラブルシューティングは [nvm GitHub page](https://github.com/nvm-sh/nvm) で見つけることができます。

`nvm` を使う前に、追加の依存パッケージをインストールする必要があります。

```shell
sudo pacman -S grep awk tar git
```

`nvm` がインストールされても、デフォルトでは特定の `node` バージョンにはなりません。必要なバージョンをインストールして、それを使うよう `nvm` に指示する必要があります。この例ではバージョン `10` の最新リリースを使っていますが、代わりにより新しいバージョンを使っても構いません。

```shell
nvm install 10
nvm use 10
```

以下のコマンドを使って、これが正しく動作しているかを確認できます。

```shell
node -v
```

> `npm` は `node` と一緒にパッケージ化されていることに注意してください。

## Windows Subsystem Linux (WSL)

このガイドは、すでにあなたのマシンに WSL が有効な Linux ディストロと一緒にインストールされていることを前提としています。もしそうでないなら、[Microsoft のサイトにあるこのガイド](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10) を読んで WSL と任意の Linux ディストロをインストールしてください。

2017 年 10 月 17 日、Windows 10 で WSL が公開され、Microsoft ストアを通じて Linux ディストリビューションを利用できるようになりました。もし複数のディストリビューションをインストールしている場合、`wslconfig` によっていくつかの異なったディストリビューションを利用するよう設定できます。

```shell
# Ubuntu をデフォルトディストリビューションに設定する
wslconfig /setdefault ubuntu
```

> もし [Gatsby on Windows](/docs/gatsby-on-windows/) によるセットアップを WSL なしで使っていた場合、あなたのプロジェクトに存在しているすべての `node_modules` フォルダを削除し、WSL 環境内ですべての依存パッケージを再インストールする必要があることに注意してください。

### Windows Subsystem Linux を利用する： Ubuntu

新しく Ubuntu をインストールした場合、アップデートとアップグレードを行ってください。

```shell
sudo apt update
sudo apt -y upgrade
```

**ビルドツール**

npm を使ってネイティブのアドオンをコンパイルしてインストールするために、さらに `node-gyp` 用のビルドツールをインストールする必要があるかもしれません。

```shell
sudo apt install -y build-essential
```

**node のインストール**

nodejs.org のインストール手順に従った場合、少し壊れたインストールになってしまいます（例えば `npm install` をしようとしたときのパーミッションエラー）。代わりに [n] を使って node バージョンをインストールしてみます。これは [n-install] を使ってインストールできます。

```shell
curl -L https://git.io/n-install | bash
```

node をバージョン管理するには [nvm] のような他の方法もありますが、これは WSL の [bash 起動] を遅くすることが知られています。

### Windows Subsystem Linux を利用する： Debian

Debian のセットアップはほとんど Ubuntu と同じですが、 `git` と `libpng-dev` を追加でインストールする必要があります。

まずアップデートとアップグレードから始めましょう。

```shell
sudo apt update
sudo apt -y upgrade
```

追加の依存パッケージもインストールする必要があります。`build-essential` は他のパッケージが Debian パッケージにコンパイルするためのパッケージです。`git` はバージョン管理をするためのパッケージをインストールします。`linbpng-dev` はプロジェクトが画像を操作するためのパッケージをインストールします。

```shell
sudo apt install build-essential
sudo apt install git
sudo apt install libpng-dev
```

もしくはすべてを同時にインストールして、すべてのインストールを承認 `(y)` してください。

```shell
sudo apt update && sudo apt -y upgrade && sudo apt install build-essential && sudo apt install git && sudo apt install libpng-dev
```

### 追加のリンクと情報

- [VSCode のドキュメントウェブサイトより、VSCode を ESL で動作させるためのとても詳細なガイド](https://code.visualstudio.com/docs/remote/wsl)
- [Windows で Ubuntu をダウンロードするための Microsoft ストアページ](https://www.microsoft.com/ja-jp/p/ubuntu/9nblggh4msv6)
- [n](https://github.com/tj/n)
- [nvm](https://github.com/creationix/nvm)
- [n-install](https://github.com/mklement0/n-install)
- [bash 起動](https://github.com/Microsoft/WSL/issues/776#issuecomment-266112578)
