---
title: CA証明書の設定
---

もしあなたが CA（認証局）による証明書が必要となるプライベートな（典型的には企業の）パッケージレジストリーを使っている場合、あなたは `npm`、`yarn`、そして `node` の設定で証明書のセットアップをする必要があるかもしれません。

## 証明書の設定ミスが原因のよくあるエラー

もしあなたが Gatsby プラグインをインストールする際にコンソール出力で `unable to get local issuer certificate` のようなエラーを見たなら、証明書の設定ミスが原因かもしれません。これは特にネイティブ Node.js モジュールとしてビルドされる必要のあるプラグインやテーマ（例えば　`gatsby-plugin-sharp`）でよく起きます。このエラーは設定ファイルで証明書を適切にセットアップせずにプライベートレジストリーから（`npm install` や `yarn install` によって）パッケージをインストールしようとしたときに発生します。

## cafile 設定オプション

[npm](https://docs.npmjs.com/misc/config#cafile) と [yarn](https://yarnpkg.com/ja/docs/cli/config/) は両方とも、`cafile` 設定オプションをサポートしています。あなたは `cafile` をキーとして追加し、あなたの証明書へのパスを値として設定する必要があります。

### npm を使って cafile を設定する

```shell
npm config set cafile "path-to-my-cert.pem"
```

`cafile` キーに設定されている証明書へのパスの値を確認するために、次のコマンドを使ってあなたの npm config のすべてのキーの一覧を表示してください：

```shell
npm config ls -l
```

### yarn を使って cafile を設定する

```shell
yarn config set cafile "path-to-my-cert.pem"
```

次のコマンドを使ってあなたの yarn config の値を確認できます：

```shell
yarn config list
```

### Node.js を使う

代わりに、あなたのマシンの Node.js を使ってもこれを設定できます。`NODE_EXTRA_CA_CERTS` 変数であなたの証明書へのパスを export してください。

```shell
export NODE_EXTRA_CA_CERTS=["path-to-my-cert.pem"]
```
