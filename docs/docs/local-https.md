---
title: ローカル HTTPS
---

Gatsby は [devcert](https://github.com/davewasmer/devcert) で開発中にローカル HTTPS サーバーを使用する簡易な方法を提供します。あなたが `https` オプションを有効にすると、プロジェクト用に秘密鍵と証明書ファイルが生成され、開発用サーバーによって使用されます。

## 使用方法 (自動 HTTPS)

通常通り、 `npm run develop` で開発サーバーを起動し、 `-S` もしくは `--https` フラグを追加してください。

    $ npm run develop -- --https

## セットアップ

あなたが初めて SSL 証明書を設定する場合、開発環境の起動後にパスワードの入力を求められる事があります：

    info setting up SSL certificate (may require sudo)

    Password:

これは、最初にマシンで Gatsby の HTTPS 機能を使用するときのみ必要です。その後、証明書はその場で作成されます。

パスワード入力後、 `devcert` は Firefox と Chrome、Linux のみ）にあなたの開発証明書を信頼するように指示するために必要ないくつかのソフトウェアをインストールしようとします。

    Unable to automatically install SSL certificate - please follow the
    prompts at http://localhost:52175 in Firefox to trust the root certificate
    See https://github.com/davewasmer/devcert#how-it-works for more details
    -- Press <Enter> once you finish the Firefox prompts --

Firefox(または Linux の Chrome)をサポートしたい場合は、Firefox の `http://localhost:52175` にアクセスし、ポイントアンドクリックウィザードにしたがってください。
それ以外の場合は、プロンプトに従わず Enter キーを押しても構いません。  
**注意： この操作は 1 台のマシンにつき、1 回だけ必要になります。**

あとは開発サーバーを `https://localhost:8000` で開いて、HTTPS の良さを堪能してください ✨。もちろん、設定に応じてポートを変更しても構いません。

詳細はこちらを参照してください [how devcert works](https://github.com/davewasmer/devcert#how-it-works)

## カスタムキーと証明書ファイル

あなたが開発に複数のマシンを使用している場合（または開発環境が Docker でコンテナ化されている場合）、https 用のカスタムキーと証明書ファイルが必要になることがあるかもしれません。

カスタム https 設定を使用する必要がある場合は、`--https`, `--key-file` および
`--cert-file` フラグを `npm run develop` に加えてください。

- `--cert-file` [ssl 証明書ファイルへの相対パス]
- `--key-file` [ssl 鍵ファイルへの相対パス]

例のコマンドを参照してください：

```shell
gatsby develop --https --key-file ../relative/path/to/key.key --cert-file ../relative/path/to/cert.crt
```

ほとんどの場合、`--https`を渡すこと自体は、ローカルの https を取得するためにより簡単で便利です。

---

`https` フラグによって発行される自動証明書は明示的に `localhost` に発行され、そこでのみ受け入れられることを覚えておいてください。このフラグを `--host` オプションと併用すると、ブラウザーの警告が高い確率で表示されます。
