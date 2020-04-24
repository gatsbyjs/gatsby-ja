---
title: コンポーネントをカスタマイズする
---

MDX を使えば、Markdown でレンダリングできる全ての HTML 要素をカスタマイズした実装に置き換えることが可能です。
これによって、デザインシステムで定義されたコンポーネントを利用できるようになります。

```jsx:title=src/components/layout.js
import { MDXProvider } from "@mdx-js/react"
import * as DesignSystem from "your-design-system"

export default function Layout({ children }) {
  return (
    <MDXProvider
      components={{
        // HTML 要素のタグを、React コンポーネントにマッピングする
        h1: DesignSystem.H1,
        h2: DesignSystem.H2,
        h3: DesignSystem.H3,
        // あるいは、インラインでもコンポーネントを定義できます
        p: props => <p {...props} style={{ color: "rebeccapurple" }} />,
      }}
    >
      {children}
    </MDXProvider>
  )
}
```

以下の表は、MDXProvider を用いてカスタマイズできるコンポーネントの一覧です。

| Tag             | Name                                                                 | Syntax                                              |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| `p`             | [Paragraph](https://github.com/syntax-tree/mdast#paragraph)          |                                                     |
| `h1`            | [Heading 1](https://github.com/syntax-tree/mdast#heading)            | `#`                                                 |
| `h2`            | [Heading 2](https://github.com/syntax-tree/mdast#heading)            | `##`                                                |
| `h3`            | [Heading 3](https://github.com/syntax-tree/mdast#heading)            | `###`                                               |
| `h4`            | [Heading 4](https://github.com/syntax-tree/mdast#heading)            | `####`                                              |
| `h5`            | [Heading 5](https://github.com/syntax-tree/mdast#heading)            | `#####`                                             |
| `h6`            | [Heading 6](https://github.com/syntax-tree/mdast#heading)            | `######`                                            |
| `thematicBreak` | [Thematic break](https://github.com/syntax-tree/mdast#thematicbreak) | `***`                                               |
| `blockquote`    | [Blockquote](https://github.com/syntax-tree/mdast#blockquote)        | `>`                                                 |
| `ul`            | [List](https://github.com/syntax-tree/mdast#list)                    | `-`                                                 |
| `ol`            | [Ordered list](https://github.com/syntax-tree/mdast#list)            | `1.`                                                |
| `li`            | [List item](https://github.com/syntax-tree/mdast#listitem)           |                                                     |
| `table`         | [Table](https://github.com/syntax-tree/mdast#table)                  | `--- \| --- \| --- \| ---`                          |
| `tr`            | [Table row](https://github.com/syntax-tree/mdast#tablerow)           | `This \| is \| a \| table row`                      |
| `td`/`th`       | [Table cell](https://github.com/syntax-tree/mdast#tablecell)         |                                                     |
| `pre`           | [Pre](https://github.com/syntax-tree/mdast#code)                     | ` ```js console.log()``` `                          |
| `code`          | [Code](https://github.com/syntax-tree/mdast#code)                    | `` `console.log()` ``                               |
| `em`            | [Emphasis](https://github.com/syntax-tree/mdast#emphasis)            | `_emphasis_`                                        |
| `strong`        | [Strong](https://github.com/syntax-tree/mdast#strong)                | `**strong**`                                        |
| `delete`        | [Delete](https://github.com/syntax-tree/mdast#delete)                | `~~strikethrough~~`                                 |
| `code`          | [InlineCode](https://github.com/syntax-tree/mdast#inlinecode)        | `` `console.log()` ``                               |
| `hr`            | [Break](https://github.com/syntax-tree/mdast#break)                  | `---`                                               |
| `a`             | [Link](https://github.com/syntax-tree/mdast#link)                    | `<https://mdxjs.com>` or `[MDX](https://mdxjs.com)` |
| `img`           | [Image](https://github.com/syntax-tree/mdast#image)                  | `![alt](https://mdx-logo.now.sh)`                   |

## これはどうやって実現されているのか？

MDXProvider で変換されたコンポーネントは、Markdown が生成する HTML 要素をレンダリングする目的で使用されます。
この過程では、[React's Context API](https://reactjs.org/docs/context.html)を用いています。

## 関連ドキュメント

- [MDX components](https://mdxjs.com/getting-started/)
