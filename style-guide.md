# 翻訳スタイルガイド

ドキュメントを日本語へ翻訳する際に参照すべきスタイルガイドです。内容の改定を提案したい場合は、Issue を立てるか、あるいは Discord で議論してください。

## 心構え

原文をなるべく忠実に翻訳したいという気持ちが先行してしまい、直訳のような文章になってしまうことがあります。意訳を恐れず、日本語として自然な文章を心掛けましょう。

- 翻訳した文章を音読してみましょう。明らかに不自然な表現を見つけやすくなります。
- 表現で迷ったら Discord で相談してみましょう！

## ガイドライン

### コードブロック内のテキスト

コードブロック内に関しては、基本的にコメント以外を翻訳しないでください。任意で文字列リテラルの中身を翻訳することはできますが、コード自体はそのままにしてください！

例：

```js
// Example
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ 良い：

```js
// 例
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>Hello Gatsby!</div>
)
```

✅ 良い：

```js
// 例
import React from "react"
export default () => (
  <div style={{ color: `purple`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 悪い：

```js
// 例
import React from "react"
export default () => (
  // 'purple' はCSSのキーワード
  <div style={{ color: `紫`, fontSize: `72px` }}>こんにちは、Gatsby！</div>
)
```

❌ 絶対にしないで：

```js
インポート リアクト フロム "リアクト"
エクスポート デフォルト () => (
   <div スタイル={{color: `紫`, fontSize:` 72px`}}>こんにちは、Gatsby！</div>
)
```

### 外部リンク

もし外部リンクが[MDN]や[Wikipedia]のような記事の場合であって、かつ十分なクオリティの日本語版が存在する場合は、翻訳版へのリンクを貼りましょう。

[mdn]: https://developer.mozilla.org/en-US/
[wikipedia]: https://en.wikipedia.org/wiki/Main_Page

例：

```md
React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object).
```

✅ 良い：

```md
React エレメントは[イミュータブル](https://ja.wikipedia.org/wiki/イミュータブル)です。
```

同等のリンクが存在しない場合（Stack Overflow、YouTube 等）、英語リンクをそのまま使用してください。

### 文体

敬体（ですます調）を使って、読者に一対一で語りかけるように書いてください。

✅ 良い：

```md
もし React について詳しくなければ、まずは[こちらのガイド](https://reactjs.org)をご覧ください。
```

❌ ダメかも：

```md
React について詳しくない方は、まず[こちらのガイド](https://reactjs.org)を参照してください。
```

#### 箇条書き

ある程度まとまった文章になっている場合は「敬体」、それ以外は「体言止め」を使用します。体言止めの場合は文末の句点を省略します。

✅ 良い：

```md
Homebrew をインストールするには:

1. ターミナルを開きます。
1. `brew -v`を実行して Homebrew がインストールされているか確認します。"Homebrew"という文字列とバージョン番号が表示されるはずです。
1. もし表示されない場合は、[Homebrew の指示](https://docs.brew.sh/Installation)に従って、ダウンロードしてインストールします。
1. Homebrew をインストールしたら、手順 2 を繰り返して確認します。
```

✅ 良い：

```md
たとえば、プラグインを使うことで以下のようなことができます。

- 外部データまたはコンテンツの取得
- データの変換
```

## 機械翻訳の利用について

Google 翻訳など、機械翻訳サービスを利用して得られた文章をそのまま、あるいはマイナーな変更を加えて流用してはいけません。機械翻訳は一見すると文法構造的に正しく見えますが、文脈的には誤った翻訳になっていることが多いためです。また、翻訳サービスによっては成果物を私的利用以外に禁止しているものがあります。そのようなサービスを用いた翻訳がコミットに含まれていることを Gatsby チームが発見した場合、過去のコミットを全て精査した上で、状況によっては revert する可能性があります。

✅ 良い：

- 自分で書き上げた文章と機械翻訳した内容を比べて、翻訳が大筋間違っていないかをチェックする。
- 機械翻訳を下訳にして、そのすべてを自分の言葉で組み立て直す。
- 単語のみの機械翻訳にとどめ、文章全体は自分で組み立てる。

❌ 悪い：

- 文章を機械翻訳サービスにそのまま入力し、出力された内容をそのまま、あるいは文体を変えるなどマイナーな変更を加えて提出する。
- 部分的に翻訳した内容を、文法的・文脈的正しさを検証することなく自分の翻訳に組み込む。

## 翻訳の助けになるリソース

翻訳の助けになるツールやリソースの一覧：

- [Grammarly](https://www.grammarly.com/): 機械校正ツール
- [Cambridge Dictionary](https://dictionary.cambridge.org/us/): 英語辞書
- [Thesaurus](https://www.thesaurus.com/): 類語辞典
- [Hyper Collocation](https://hypcol.marutank.net/): 共起表現検索エンジン（学術論文ベース）
- [Do People Say](https://dopeoplesay.com/): 共起表現検索エンジン（オンライン掲示板ベース）

## 用語集

頻出する用語は合意を得た上でリストに加えてください。さらに[prh.yml](/prh.yml)にルールを追加することで、CI にチェックを任せることができます。

<!-- textlint-disable -->

| 用語                     | 和訳         |
| ------------------------ | ------------ |
| Gatsby.js, GatsbyJS      | Gatsby       |
| Plugin                   | プラグイン   |
| Theme                    | テーマ       |
| Query                    | クエリー     |
| contribute, contribution | 貢献         |
| swag                     | 景品         |
| issue                    | Issue        |
| pull request             | Pull Request |
| intro, introduction      | はじめに     |
| boilerplate              | 雛形         |

<!-- textlint-enable -->

## 校正

`gatsby-ja`では文章の校正に textlint を活用しています。どのようなルールがあるのか知りたい場合は[.textlintrc.js](/.textlintrc.js)を見てください。

### ローカルで校正する

`yarn lint` を実行して、ローカルで textlint による校正を受けることができます。ほとんどのエラーは `yarn format` を実行することで自動修正できますが、すべてのエラーが修正されるわけではありません。必ず `yarn lint` を再度実行して残りのエラーを確認し、修正しましょう。

### 最新のルールにアップデートする

校正ルールをアップデートすることで、最新の基準で校正を行うことができるようになります。

`git remote add` を使用して `gatsbyjs/gatsby-ja` を `upstream` リモートとして登録します。このコマンドは一度だけ実行します。`git remote` を実行して `upstream` が表示された場合は、このコマンドを実行する必要はありません。

```shell
git remote add upstream https://github.com/gatsbyjs/gatsby-ja.git
```

以下のコマンドを実行して、現在の作業ブランチを `gatsbyjs/gatsby-ja` の `master` ブランチに「接ぎ木」します。これにより最新のルール、ドキュメント、設定ファイルを手に入れることができます。

```shell
# コミットしていない変更がある場合は `git stash` で一旦退避させる。
git fetch --prune upstream
git rebase upstream/master
git push -f
# `git stash` を実行していた場合は、`git stash pop` を実行して作業データを元に戻す。
```

## よくある質問

### 画像のリンクが切れている

各言語版のリポジトリーには画像アセットが含まれていないため表示されない仕様になっています。

### 他の Markdown 記事へのリンクが切れている

Gatsby でプレビューをする前提で書かれているため、生の Markdown から飛ぶと 404 が表示されます。ブラウザー上で URL の末尾に `.md` をつけることで正しい記事に移動できます。
