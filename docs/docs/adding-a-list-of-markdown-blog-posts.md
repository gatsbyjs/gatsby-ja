---
title: Markdownのブログ投稿一覧を追加する
---
Markdown のページをサイトに追加すると、専用のインデックスページに投稿を一覧表示できるようになります。

## 投稿を作成
[ここ](/docs/adding-markdown-pages) で説明しているように, Markdown ファイルに投稿を作成する必要があります。それは次のようになります。

```markdown
---
path: "/blog/my-first-post"
date: "2017-11-07"
title: "初めてのブログ投稿"
---

GatsbyJS って聞いたことある？
```

## ページの作成

最初の手順は投稿を表示するページを `src/pages/` に作成することです。例えば `index.js` を利用できます。

```jsx:title=src/pages/index.js
import React from "react"
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // いくつかの基準に基づいて投稿をフィルタリングできます
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div>{Posts}</div>
}

export default IndexPage
```

## GraphQL のクエリを作成

次に、 GraphQL クエリを利用してコンポーネントにデータを提供する必要があります。 `index.js` に以下のように追加します。

```jsx:title=src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // いくつかの基準に基づいて投稿をフィルタリングできます
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <div>{Posts}</div>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
```

## Creating the `PostLink` component

The only thing left to do is to add the `PostLink` component. Create a new file `post-link.js` in `src/components/` and add the following:

```jsx:title=src/components/post-link.js
import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link>
  </div>
)

export default PostLink
```

This should get you a page with your posts sorted by descending date. You can further customize the `frontmatter` and the page and `PostLink` components to get your desired effects!
