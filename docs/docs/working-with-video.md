---
title: 映像を使用する
---

- [ホストから映像を取得する](#ホストから映像を取得する)
- [ホストされた映像をマークダウンに埋め込む](#ホストされた映像をマークダウンに埋め込む)
- [ホストされた映像のためのコンポーネントを作成する](#ホストされた映像のためのコンポーネントを作成する)
- [GraphQL を使用してマークダウンから映像を要求する](#GraphQL-を使用してマークダウンから映像を要求する)
- [独自の映像ファイルをホスティングする](#独自の映像ファイルをホスティングする)
- [カスタム映像プレイヤーを使用する](#カスタム映像プレイヤーを使用する)

## ホストから映像を取得する

Gatsby サイトに映像を埋め込むもっとも簡単な方法は、YouTube や Vimeo、Twitch のようなサイトにアップロードされた映像を取得することです。ホストされた映像の URL をもとに、Remark のプラグインを使用するか、`<iframe>`を使用することで、Gatsby サイトに映像を埋め込むことができます。

## ホストされた映像をマークダウンに埋め込む

ホストされた映像をマークダウンの投稿やページから使用できるようにする Gatsby プラグインが多数あります。 YouTube や Vimeo などのさまざまなホストから取得するには、[gatsby-remark-embed-video](/packages/gatsby-remark-embed-video/?=video)プラグインを確認することをお勧めします。

### ホストされた映像のためのコンポーネントを作成する

YouTube（または同様の）映像を Gatsby の投稿やページに埋め込む方法をさらに詳細に制御したい場合は、再利用可能なカスタム`iframe`コンポーネントを作成し、JSX テンプレートまたは[MDX の中で](/docs/mdx/)使用します。

次に示す再利用可能なサンプルコンポーネントには、URL やタイトルなどの映像データの props や、スタイル設定に必要なマークアップ、および一般的な`iframe`埋め込みコードが含まれています。

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

次に、このコンポーネントを、映像の URL とタイトルの props と共にテンプレートまたはページへ加えます。URL およびタイトルなどの映像のデータは、JSON のインポートや[GraphQL を使用してマークダウンから映像を要求する](#GraphQL-を使用してマークダウンから映像を要求する)など、複数の方法で取得できます。また、404 ページでイースターエッグとして YouTube 映像を表示するなど、映像を何か面白いものに使用することもできます。

```jsx:title=src/pages/404.js
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: 見つかりません" />
    <section>
      <h1>ページが見つかりません</h1>
      <p>残念ですが...検索されたページは存在しません。</p>
      <p>代わりに映像を提案してもいいですか？</p>
      <Video
        videoSrcURL="https://www.youtube.com/embed/dQw4w9WgXcQ"
        videoTitle="YouTubeの公式ミュージックビデオ"
      />
    </section>
  </Layout>
)

export default NotFoundPage
```

## GraphQL を使用してマークダウンから映像を要求する

マークダウンのページまたは投稿が特定の映像を含む場合は、[その frontmatter]（/docs/adding-markdown-pages＃note-on-creating-markdown-files）に映像の URL とタイトルを含めることができます。これにより、これらの値をカスタムコンポーネントに渡すことができます。

```markdown:title=my-first-post.md
---
path: "/blog/my-first-post"
date: "2019-03-27"
title: "私の最初のブログ投稿"
videoSourceURL: https://www.youtube.com/embed/dQw4w9WgXcQ
videoTitle: "Gatsbyは決してあなたをあきらめない"
---
```

映像コンポーネントをテンプレートに加えるには、次のようなことから始めることができます。

```jsx:title=vlog-template.js
import React from "react"
import { graphql } from "gatsby"

import Video from "../components/video"

export default function VlogTemplate({
  data, // このpropは下のGraphQLのクエリーによって注入されます。
}) {
  const { markdownRemark } = data // data.markdownRemarkはあなたの投稿データを持っています
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

## 独自の映像ファイルをホスティングする

YouTube、Twitch または Vimeo から映像を取得することは非常に一般的な方法です。しかし、独自の映像を自らホストし、さらにそれを HTML5 に埋め込みたい場合はどうしたらいいでしょうか？

独自の映像ファイルを複数の Web ブラウザーやプラットフォームで動作させるためには、映像拡張機能とコーデックについて少し学ぶ必要があります。情報源として MDN をお勧めします：[HTML の音声と動画のメディア形式](https://developer.mozilla.org/ja/docs/Web/HTML/Supported_media_formats)。さまざまなデバイスや環境をサポートするための、必要な形式（「.webm」や「.mp4」など）を生成するには、映像変換ソフトが必要になる場合があります。

HTML5 は、映像を使用するための `<video>`メディア要素を提供します。 `<video>`要素の中では、映像プレーヤーが使用できる異なるファイル形式を複数の `<source>`要素を使用して提供できます。各ブラウザーは、その中からサポートしている形式の映像を使用します。

もし、あなたのサイトの `src/assets/dog.mp4`に`dog.mp4`という映像がある場合、他のアセットを使用する時と同様に[webpack を使用して映像をあなたのページに含める](/docs/importing-assets-into-files)ことができます。そして、それを `<video>`要素にラップされた `<source>`要素で参照します。

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

`<video>`要素の `controls`属性は、映像にオーバーレイされる再生/一時停止ボタンや、音量調整、全画面表示ボタンなどのデフォルトのボタンセットを提供します。また、`muted`属性なら、音声をミュートに設定できますし、`poster`属性では映像が再生されていないときに画像を表示したりできます。複数のビデオに適用したい一般的な属性は、React のカスタム映像コンポーネントで抽出できます。 `<video>`属性の完全な一覧は[MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/HTML/Element/video#Attributes)で見られます。

### 複数のブラウザーとフォーマットのサポート

ブラウザーがサポートしている形式を`<source>`要素で加えることにより、ブラウザーはその形式を見つけることができます。もしサポートしている形式の映像がなければ読み込みは失敗します。異なるブラウザーでどの形式がサポートされているのかは[ブラウザーの互換性](https://developer.mozilla.org/ja/docs/Web/HTML/Supported_media_formats#Browser_compatibility)で見ることできます。

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

2 つの`<source>`要素がありますが、この中から 1 つだけが使用されます。サポートされていれば`mp4`、`.ogg`の順で使用されます。

**注意**: このとき、指定されたタイプの形式で映像をインポートする必要があります。つまり、 `type=video/ogg`で`<source>`要素を追加するには、`.ogg`の形式でファイルをインポートする必要があるということです。もしくは、ローカルファイルをインポートする代わりに、映像がリモートでホストされる場所の URL を`src`として指定できます。

[`<video>`要素を使ったサンプルリポジトリを見てみてください](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-video/)

### カスタム映像プレイヤーのアクセシビリティ

カスタムコンポーネントを独自にホストした映像と統合する利点の 1 つは、アクセシビリティの向上など、映像プレーヤーをより詳細に制御できることです。映像と音声の操作性を高める要素は次のとおりです。

- キャプション：映像の音声のテキストバージョン
- トランスクリプト（またはサブタイトル）：キャプションのような音声や視覚コンテンツのテキストバージョンですが、映像の重要な視覚要素の説明も含まれます
- 音声解説：ダイアログでカバーされない視覚情報の音声バージョン
- アクセシブルコントロール：マウスなしで操作できる映像を操作するためのボタン。ラベルが付けられてたり、環境やブラウザーを越えて機能する。

キャプション、トランスクリプト、および音声解説は、主に見ること、聞くことが困難な人を支援することを目的としていますが、聞くことよりも読むことを好む他の多くのユーザーにとって有益です。キャプションは、何らかの理由で音声を有効にできない時に映像を視聴したい人々にも役立ちます。

HTML5 は、 `<track>`要素を通してこれらのタイプの支援コンテンツのサポートを提供します。 `<track>`要素は、空のタグとして `<video>`要素の下にネストされます。ビデオでの `<track>`要素の使用例は次のようになります。

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

`kind`属性では、`captions`や、`subtitles`、`descriptions`などのさまざまなタイプを指定できます。 `srcLang`で、この例では英語をキャプションで使用される言語として定義しています。そして、インポートされたキャプションファイルがソースとして使用されます。`<track>`要素の詳しい属性については[track についての MDN のドキュメント](https://developer.mozilla.org/ja/docs/Web/HTML/Element/track)で読むことができます。

**注意**: 上記のコードスニペットのキャプションをインポートするファイルパスには、 `file-loader！`プレフィックスが含まれています。これは、webpack が`.vtt`キャプションファイルをインポートするのを助けます。

Gatsby と React を使用した例については、操作性の高い[PayPal の HTML5 映像プレイヤー](https://github.com/paypal/accessible-html5-video-player#react-version)をご覧ください。
