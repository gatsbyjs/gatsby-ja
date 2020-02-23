---
title: Issue にラベルを付ける方法
---

## Issue ラベルとは何ですか？

Issue ラベルは Issue を 1 つ以上のカテゴリーへ分類するために使用される GitHub のツールです。

[Gatsby のラベル（およびその説明）をご覧ください](https://github.com/gatsbyjs/gatsby/issues/labels)

## なぜ Issue にラベルを付けるのですか？

Gatsby は毎日たくさんの新しい Issue が公開される非常に活発なプロジェクトです。Issue にラベルを付けることは以下を識別することに役立ちます。

- 新しい貢献者が取り組むべき Issue
- 報告や確認がされたバグ
- 機能のリクエスト
- 重複する Issue
- 停止またはブロックされている Issue

## 誰が Issue にラベルを付けることができますか？

[Gatsby メンテナチーム](https://github.com/orgs/gatsbyjs/teams/maintainers)のメンバーであれば誰でも Issue にラベルを付けることができます。

Pull Request が Gatsby プロジェクトにマージされるとチームに招待されます。開始するには [`help wanted`](https://github.com/gatsbyjs/gatsby/labels/%F0%9F%93%8D%20status%3A%20help%20wanted) タグがついた Issue 一覧と[貢献ガイド](/contributing/how-to-contribute/)をご覧ください。

**ヒント** Pull Request がすでにマージされていて、メンテナチームに招待されて_いない_場合は、[ダッシュボード](https://store.gatsbyjs.org/) にアクセスして割引コードをリクエストしてください。チームに招待されるはずです。— _そして Gatsby の景品が無料で手に入ります！_ それでも解決しない場合は、team@gatsbyjs.com にメールを送ってください。招待します。

## Issue にラベルを付ける方法

全ての Issue に単一の `type:` ラベルが付けられているのが理想的です。必要に応じて `status:` ラベルまたは他のラベルを付けることもできます。

続ける前に、[Gatsby の Issue ラベルおよびその説明](https://github.com/gatsbyjs/gatsby/issues/labels)をよく理解してください。

Issue にラベルを付けるための広範な手順は次のとおりです。

- Issue を読んでください。
- Issue に付けるラベルを選択してください。
- それだけです。 - 座ってリラックスして、 少し時間をとって作業の満足度を楽しみましょう。

このドキュメントの残りの部分では、Issue に適切なラベルを選択する方法について説明します。

### 興味のある Issue を探してください

[Gatsby の Issue リスト](https://github.com/gatsbyjs/gatsby/issues)を開いて、最近の興味のあるものが見つかるまでスクロールしてください。または、[ラベルのない Issue リスト](https://github.com/gatsbyjs/gatsby/issues?q=is%3Aopen+is%3Aissue+no%3Alabel)も見ることができます。

### Issue を読んでください

Issue やコメントを読んで、Issue について理解してください。

### ラベルの `type:` を 1 つ選択してください

Issue の右側にある _labels_ のドロップダウンから type ラベルを選択してください。

![GitHub の label ドロップダウン](./images/github-label-list.png)

各ラベルの詳細については、[ラベルの説明](https://github.com/gatsbyjs/gatsby/issues/labels)を確認してください。

もっとも一般的な Issue の type は `type: question or discussion` です。通常これは自由に討論する、または明確な次の手段がない Issue に付けることができます。

詳細が明確になったら Issue の type を変更しても構いません。`type: question or discussion` で始まるものは、後で `type: bug` に変更する必要があるかもしれません。

ラベルの変更はすぐ簡単に元に戻すことができるため、「間違った」ラベルを付けることについてあまり心配する必要はありません。

適切な `type:` ラベルを選択すると、次のステップに進む準備が整います。

### ラベルの `status:` を選択してください（任意）

[`status:` ラベル（およびその説明）](https://github.com/gatsbyjs/gatsby/issues/labels)を確認して、Issue に該当する場合は必要に応じてラベルを付けてください。

`status:` ラベルを付ける例は次の通りです。

- 変更される外部の依存性に依存する Issue には `status: blocked`

- 解決する方法について明確な記述がある Issue には `status: help wanted`

- 作成者を助けるために必要な情報が欠けている Issue には `status: needs more info`

- 明確な再現手順が欠けているバグ報告の Issue には `status: needs reproduction`

- バグの明確な再現手順が書かれていて、コードをローカルで動かしてエラーを確認できたバグ報告の Issue には `status: confirmed`

### 他のラベルを選択してください

Issue に付けられるラベルは他にもいくつかあります。それらを使う場合の例をいくつか示します。

- `good first issue` は Gatsby とその仕組みのついて深い知識がなくても完了できる、明確に定義された小さな Issue で使用できます。これらの Issue は初めてオープンソースへ取り組む人々に特に適しています。

- `stale?` は作成者が少なくとも 20 日以内に詳細な情報のリクエストに返信していない Issue で使用できます。

### 最後に

これで完了です！これで終わりにするか、最初のステップに戻って他の Issue にラベルを付けましょう。

## まとめ

Issue へのラベル付けは経験度合いに関係なく Gatsby プロジェクトへ貢献できる素晴らしい方法です。
