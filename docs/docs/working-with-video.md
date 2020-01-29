---
title: 動画を使用する
---

- [ホストから動画を取得する](#ホストから動画を取得する)
- [ホストされた動画を Markdown に埋め込む](#ホストされた動画を-Markdown-に埋め込む)
- [ホストされた動画のためのカスタムコンポーネントを作成する](#ホストされた動画のためのカスタムコンポーネントを作成する)
- [GraphQL を使用して Markdown から動画を要求する](#GraphQL-を使用して-Markdown-から動画を要求する)
- [独自の HTML5 の動画ファイルをホスティングする](#独自の-HTML5-の動画ファイルをホスティングする)
- [カスタム動画プレイヤーを使用する](#カスタム動画プレイヤーを使用する)

## ホストから動画を取得する

Gatsby サイトに動画を含めるもっとも簡単な方法は、YouTube や Vimeo、Twitch のようなサイトにアップロードされた動画を取得することです。ホストされた動画の URL を使って、Remark のプラグインを使用するか、カスタム `<iframe>` の解決策を作成することで、Gatsby サイトに動画を埋め込むことができます。

## ホストされた動画を Markdown に埋め込む

ホストされた動画を Markdown 投稿やページから使用できるようにする、多くの Gatsby プラグインがあります。 YouTube や Vimeo などのさまざまなホストから動画を取得するには、[gatsby-remark-embed-video](/packages/gatsby-remark-embed-video/?=video)プラグインをお勧めします。

### ホストされた動画のためのカスタムコンポーネントを作成する

YouTube（または同様の）動画を Gatsby の投稿やページに埋め込む方法をさらに詳細に制御したい場合は、再利用可能なカスタム `iframe` コンポーネントを作成し、JSX テンプレートや[MDX の中](/docs/mdx/)の内容に含めます。

次の再利用可能なサンプルコンポーネントには、URL やタイトルなどの動画データのための props や、スタイル設定に必要なマークアップ、そして一般的な `iframe` 埋め込みコードが含まれています。

```jsx:title=src/components/video.js
import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <div className="video">
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </div>
)
export default Video
```

次に、このコンポーネントを、動画の URL とタイトルの props と共にテンプレートやページに含めます。URL およびタイトルなどの動画のデータは、JSON のインポートや[GraphQL を使用して Markdown から動画を要求する](#GraphQL-を使用してMarkdownから動画を要求する)など、複数の方法で取得できます。また、404 ページの中にイースターエッグとして YouTube 動画を表示するなど、動画を何か面白いもののためにハードコードすることもできます。

```jsx:title=src/pages/404.js
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: 見つかりません" />
    <section>
      <h1>見つかりません</h1>
      <p>検索されたページは存在しません...悲しい</p>
      <p>代わりに動画を提案してもいいですか？</p>
      <Video
        videoSrcURL="https://www.youtube.com/embed/dQw4w9WgXcQ"
        videoTitle="YouTubeの公式ミュージックビデオ"
      />
    </section>
  </Layout>
)

export default NotFoundPage
```

## GraphQL を使用して Markdown から動画を要求する

もし Markdown のページまたは投稿が特定の動画を含む場合は、[その序文](/docs/adding-markdown-pages＃note-on-creating-markdown-files)に動画の URL とタイトルを含めることができます。これにより、これらの値をカスタムコンポーネントに渡すことができます。

```markdown:title=my-first-post.md
---
path: "/blog/my-first-post"
date: "2019-03-27"
title: "私の最初のブログ投稿"
videoSourceURL: https://www.youtube.com/embed/dQw4w9WgXcQ
videoTitle: "Gatsbyは決してあなたをあきらめない"
---
```

動画コンポーネントをテンプレートに含めるには、次のようなことから始めることができます。

```jsx:title=vlog-template.js
import React from "react"
import { graphql } from "gatsby"

import Video from "../components/video"

export default function VlogTemplate({
  data, // この prop は下の GraphQL の Query によって注入されます。
}) {
  const { markdownRemark } = data // data.markdownRemark はあなたの投稿データを持っています
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <Video
          videoSrcURL={frontmatter.videoSrcURL}
          videoTitle={frontmatter.videoTitle}
        />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        videoSrcURL
        videoTitle
      }
    }
  }
`
```

## 独自の HTML5 の動画ファイルをホスティングする

YouTube、Twitch または Vimeo から動画を取得することは非常に一般的な方法です。しかし、もし独自の動画をホストし、さらにそれを HTML5 として含めたい場合はどうしたらいいでしょうか？

独自の動画ファイルを複数の Web ブラウザーやプラットフォームに含めるためには、動画拡張機能とコーデックについて少し学ぶ必要があります。情報源として MDN をお勧めします：[HTML の音声と動画のメディア形式](https://developer.mozilla.org/ja/docs/Web/HTML/Supported_media_formats)。さまざまなデバイスや環境をサポートするための、必要な形式（「.webm」や「.mp4」など）を生成するには、動画変換ソフトが必要になる場合があります。

HTML5 は、動画を使用するための `<video>` メディア要素を提供します。 `<video>` 要素の中では、動画プレーヤーが使用できる異なるファイル形式を複数の `<source>` 要素を使用して提供できます。各ブラウザーは、その中からサポートしている形式の動画を使用します。

もし、あなたのサイトの `src/assets/dog.mp4` に `dog.mp4` という動画がある場合、他のアセットを使用する時と同様に[webpack を使用して動画をあなたのページに含める](/docs/importing-assets-into-files)ことができます。そして、それを `<video>` 要素にラップされた `<source>` 要素で参照します。

<!-- prettier-ignore -->
```jsx:title=src/pages/index.js
import React from "react"
import DogVideo from "../assets/dog.mp4"

export default () => (
  <video controls>
    <source src={DogVideo} type="video/mp4" /> // highlight-line
  </video>
)

```

`<video>` 要素の `controls` 属性は、動画にオーバーレイされる再生/一時停止ボタンや、音量調整、全画面表示ボタンなどのデフォルトのボタンセットを提供します。また、 `muted` 属性なら、音声をミュートに設定できますし、 `poster` 属性では動画が再生されていないときに画像を表示したりできます。複数のビデオに適用したい一般的な属性は、React のカスタム動画コンポーネントで抽出できます。 `<video>` 属性の完全な一覧は[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/HTML/Element/video#Attributes)で見られます。

### 複数のブラウザーと形式のサポート

もし形式が合わず読み込みに失敗した場合、形式を加えるために source タグを加えることでブラウザーはサポートしている source の type を見つけることができます。異なるブラウザーにどの形式がサポートされているのかは[ブラウザーの互換性](https://developer.mozilla.org/ja/docs/Web/HTML/Supported_media_formats#Browser_compatibility)で見ることできます。

<!-- prettier-ignore -->
```jsx:title=src/pages/index.js
import React from "react"
import DogMp4 from "../assets/dog.mp4"
import DogOgg from "../assets/dog.ogg" // highlight-line

export default () => (
  <video controls>
    <source src={DogMp4} type="video/mp4" />
    <source src={DogOgg} type="video/ogg" /> // highlight-line
  </video>
)

```

2 つの `<source>` 要素がありますが、この中から 1 つだけが使用されます。サポートされていれば `mp4` 、 次に `.ogg` 。

**注意**: このとき、指定されたタイプの形式で動画をインポートする必要があります。つまり、 `type=video/ogg` を持つ `<source>` 要素を追加するには、 `.ogg` の形式でファイルをインポートする必要があるということです。もしくは、ローカルファイルをインポートする代わりに、動画がリモートでホストされる場所の URL を `src` として指定できます。

[`<video>` 要素を使った例のリポジトリを見てみてください](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-video/)

### カスタム動画プレイヤーに伴うアクセシビリティ

カスタムコンポーネントを独自にホストした動画と統合する利点の 1 つは、アクセシビリティを含め、動画プレーヤーをより詳細に制御できることです。アクセシビリティに関する動画と音声の要素は次のとおりです。

- 字幕：動画の音声のテキストバージョン
- 文字起こし（または字幕）：動画の重要な視覚要素の説明も含めた字幕のような音声や視覚コンテンツのテキストバージョン
- 音声解説：対話で補えない視覚情報の音声バージョン
- アクセシブルコントロール：ラベルが付けられてたり、環境やブラウザーを越えて機能する、マウスなしで操作できる動画を操作するためのボタン

字幕、文字起こし、および音声解説は、主に見ること、聞くことが困難な人を支援することを目的としていますが、聞くことよりも読むことを好む他の多くのユーザーにとって有益です。字幕は、何らかの理由で音声を有効にできない時に動画を視聴したい人々にも役立ちます。

HTML5 は、 `<track>` 要素を通してこれらのタイプの支援コンテンツのサポートを提供します。 `<track>` 要素は、空のタグとして `<video>` 要素の入れ子にします。動画での `<track>` 要素の使用例は次のようになります。

```jsx:title=src/pages/index.js
import React from "react"
import DogMp4 from "../assets/dog.mp4"
import Captions from "file-loader!../assets/captions.vtt" // highlight-line

export default () => (
  <video controls>
    <source src={DogMp4} type="video/mp4" />
    // highlight-start
    <track kind="captions" srcLang="en" src={Captions} />
    // highlight-end
  </video>
)
```

kind 属性では、 `captions` や、 `subtitles` 、 `descriptions` などのさまざまなタイプを指定できます。 `srcLang` で、この例では英語を字幕で使用される言語として定義しています。そして、インポートされた字幕ファイルがソースとして使用されます。 `<track>` 要素の詳しい属性については[track についての MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/track)で読むことができます。

**注意**: 上記のコードスニペットの字幕をインポートするファイルパスには、 `file-loader！` プレフィックスが含まれています。これは、webpack が `.vtt` 字幕ファイルをインポートするのを助けます。

Gatsby と React を使用した例については、アクセシビリティを伴う[PayPal の HTML5 動画プレイヤー](https://github.com/paypal/accessible-html5-video-player#react-version)をご覧ください。
