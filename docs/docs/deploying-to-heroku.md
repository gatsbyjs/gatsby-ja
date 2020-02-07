---
title: Heroku へのデプロイ
---

[heroku buildpack static](https://github.com/heroku/heroku-buildpack-static) を使うことで、サイトを構成する静的ファイルを扱うことができます。

`heroku/node.js` と `heroku-buildpack-static` ビルドパックをアプリケーションに設定してください。

```shell
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
```

[heroku platform api](https://devcenter.heroku.com/articles/setting-up-apps-using-the-heroku-platform-api) を利用したい場合には、ビルドパックを `app.json` に記述することも可能です。

```json:title=app.json
{
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    },
    {
      "url": "https://github.com/heroku/heroku-buildpack-static"
    }
  ]
}
```

Heroku は以下のような記述のある `package.json` から、自動的に `build` スクリプトを見つけ出し、実行します。

```json:title=package.json
{
  "scripts": {
    "build": "gatsby build"
  }
}
```

最後に、静的ファイル群をどのディレクトリーに配置するかを定義するために、プロジェクトのルートディレクトリーに `static.json` ファイルを追加してください。このファイルに設定可能な全てのオプションは [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static#configuration) にて確認できます。

Gatsby が[推奨するキャッシングの方法](/docs/caching/)に従うためには、以下の設定が良い出発点となるでしょう。

```json:title=static.json
{
  "root": "public/",
  "headers": {
    "/**": {
      "Cache-Control": "public, max-age=0, must-revalidate"
    },
    "/**.css": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/**.js": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/static/**": {
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    "/icons/*.png": {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  },
  "https_only": true,
  "error_page": "404.html"
}
```
