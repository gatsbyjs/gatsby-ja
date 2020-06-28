---
title: スターターライブラリーに送信する
---

[スターターライブラリー](/starters/)に追加したい Gatsby スターターを作成しましたか？以下の手順をご覧ください。

## ステップ

あなたのサイトをスターターライブラリーに追加するには、以下の 2 つのステップをご覧ください。

1.  もしこれが Gatsby オープンソースリポジトリーへの最初の貢献であれば、[貢献ガイドライン](/contributing/code-contributions/)をご覧ください。

2.  スターター情報を一覧の最後に以下の形式で追加して、[`starters.yml`](https://github.com/gatsbyjs/gatsby/blob/master/docs/starters.yml)ファイルを編集してください。

```yaml:title=docs/starters.yml
- url: Link to a demo of your starter
  repo: Link to GitHub repo
  description: Your starter description

  # これらはライブラリーのカテゴリフィルターに対応しています。
  # 有効なタグは docs/categories.yml をご覧ください。
  tags:
    - Redux

  # サイトの機能を追加します。
  # これらはあなたのスターターの詳細ページに含まれます。
  features:
    - Blog post listing with previews (image + summary) for each blog post
```

必須項目を確実に入力するために以下のテンプレートを使用してください。

```yaml:title=docs/starters.yml
- url: (required)
  repo: (required - https://github.com/{username}/{titleofthesite})
  description: (optional)
  tags:
    - (required)
  features:
    - (required)
```

例として[`starters.yml`](https://github.com/gatsbyjs/gatsby/blob/master/docs/starters.yml)ファイルを確認してください。

Pull Request は `chore(starters): add my-starter-name-here` のような形式のタイトルが好ましいです。
もし PR のリンティングに問題があれば、`npm run format` を実行することで修正できます。

### 詳細を変更する必要がある？

もしサイトの送信内容を後で編集したければ、別の PR を送信して .yml ファイルを編集するだけです。GitHub のデータ（スターなど）は自動的にプルされて更新されますが、スターターの description、tags、および features はあなた次第です！

### 新しいタグを追加する

もしタグの一覧に不足があると思ったら、[`categories.yml`](https://github.com/gatsbyjs/gatsby/blob/master/docs/categories.yml)ファイルを更新して新しいタグを追加してください。ただし、既存のタグを利用することをお勧めしています。
