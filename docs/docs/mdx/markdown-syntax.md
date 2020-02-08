---
title: Markdown 構文
---

Markdown は Gatsby でウェブサイトにページやポストを書くための標準的な方法です。この便利なガイドは Markdown 構文とフォーマットについての知識を解説します！

## 見出し s

```markdown
# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

##### 見出し 5

###### 見出し 6
```

Here's how those tags render in HTML:

# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

##### 見出し 5

###### 見出し 6

- それぞれの見出し行は等価となる HTML に変換されます
  - i.e. `# 見出し 1` は `<h1>見出し 1</h1>` に変換されます
- それぞれの見出しレベルの正しい使い方については次の資料を参照してください。
  [accessibility guidelines](https://www.w3.org/WAI/tutorials/page-structure/headings/) by the World Wide Web Consortium (W3C)
  _Note: [Gatsby のドキュメント](/contributing/docs-contributions#headings) によると、H1 は Markdown の Frontmatter における `title` 要素をレンダリングする際、すでに使用されています。そのため、Markdown 本文に見出しを記載する際には H2 タグ(つまり `##` )から始めてください。_

## テキストの強調

- 斜体（イタリック）
  - 1 文字のアスタリスクか、アンダースコア
    - `*斜体*` or `_斜体_`
    - _斜体_
- 太字（ボールド）
  - 二文字のアスタリスクか、アンダースコア
    - `**太字**` or `__太字__`
    - **太字**
- 斜体かつ太字

  - 三文字のアスタリスクか、アンダースコア
    - `***斜体かつ太字***` or `___斜体かつ太字___`
    - **_斜体かつ太字_**

## 箇条書き

### 番号なし箇条書き

- `*`, `-`, もしくは `+` をそれぞれの箇条書き要素の頭に付加しましょう。

<!-- prettier-ignore-start -->
```markdown
* Gatsby
  * ドキュメント
- Gatsby
  - ドキュメント
+ Gatsby
  + ドキュメント
```
<!-- prettier-ignore-end -->

HTML では下記のように表現されます。

- Gatsby
  - docs

* Gatsby
  - docs

- Gatsby
  - docs

### 番号付き箇条書き

- 数字とピリオドをそれぞれの箇条書き要素の頭に付加しましょう
- `1.` を全てのアイテムの頭に付加すれば、番号は自動的に増加します

```markdown
1. 壱
1. 弐
1. 参
```

1. 壱
1. 弐
1. 参

## リンクと画像

### リンク

リンクは Markdown において下記のように表記します。URL は絶対パス・相対パスどちらでも構いません。

```markdown
[Text](url)
```

HTML では下記のように表現されます

[Gatsby site](https://www.gatsbyjs.org/)

### イメージと代替テキスト

```markdown
![alt text](path-to-image)
```

### 代替テキストのないイメージ

この表記方法は、装飾または反復的な画像に適しています。（参考： [decorative or repetitive images](https://www.w3.org/WAI/tutorials/images/decision-tree/)）

```markdown
![](path-to-image)
```

## 引用ブロック

- `>` を引用する行頭に付与します
- 複数の `>` を使うことでネストされた引用を表現できます
- `>` を引用全ての行頭に使うことを推奨します
- 引用ブロックの中でも他の Markdown 構文は有効です

```markdown
> 引用文前半
>
> > ネストされた引用
>
> > **ここは太字！**
>
> 引用文後半
```

> 引用文前半
>
> > ネストされた引用
>
> > **ここは太字！**
>
> 引用文後半

## コードコメント

### 行内コード

- コード部分をバッククオートで囲みます \`code\`
- このように表示されます `code`

### コードブロック

- コード部分を全てスペース 4 つでインデントします

## MD vs MDX

- MDX は Markdown の上位互換です。 JSX 構文を Markdown 内に記載することができます。つまり React コンポーネントを内部に記載できます！

## Gatsby における Markdown と MDX の処理

- Gatsby で Markdown または MDX を使うためには [gatsby-source-filesystem](/docs/sourcing-from-the-filesystem) プラグインを利用しましょう
- プラグインの [README](/packages/gatsby-source-filesystem) により詳しい動作説明が記載されています

## Frontmatter

- Markdown ファイルのメタデータを記載します
- Variables that can later be injected into your components
- 必須要件
  - ファイルの最初に記載すること
  - 正しい YAML 構文であること
  - 3 つのハイフンで囲むこと
  ```
  ---
  title: Frontmatterで定義したタイトル
  example_boolean: true
  ---
  ```

## Frontmatter + MDX の例

```mdx
---
description: frontmatterのdescription例
---

import { Chart } from "../components/chart"

# チャート

Chart コンポーネントを MDX 内にレンダリングすることができます

<Chart description={description} />
```

## 参考情報

- https://daringfireball.net/projects/markdown/syntax
- https://www.markdownguide.org/basic-syntax
