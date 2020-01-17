---
title: GIFを使用する
---

Gatsby でブログを作成していると、アニメーション GIF を使いたいときがあるかもしれません。たとえば踊るカワウソや猫の GIF を使いたいときなどです。

## コンポーネントに GIF を含める

Gatsby のコンポーネントとページではレスポンシブなピクチャ要素の画像データを最適化するために、Gatsby Image を使用せずにアニメーション GIF をインポートする必要があります。

以下に例を示します。

```jsx:title=pages/about.js
import React from 'react'

import Layout from '../components/layout'
import otterGIF from '../gifs/otter.gif'

const AboutPage = () => (
    return (
        <Layout>
            <img src={otterGIF} alt="Otter dancing with a fish" />
        </Layout>
    )
)

export default AboutPage;
```

## Markdown に GIF を含める

Markdown による投稿とページにアニメーション GIF を含める場合は静止画像と同じ方法になります。

```markdown
![otter dancing with a fish](./images/dancing-ofter.gif)
```

![otter dancing with a fish](./images/dancing-otter.gif)

アニメーション GIF はファイルサイズが非常に大きい場合があるので、ウェブページのパフォーマンスを損なわないように注意してください。[フレームを最適化する](https://skylilies.livejournal.com/244378.html)かビデオに変換するとファイルサイズを小さくできます。

## アニメーション GIF のアクセシビリティに関する問題

GIF の点滅と自動再生は、動きに敏感なユーザーの問題を引き起こす可能性があることに注意してください。安全上の理由から可能な限り GIF の自動再生をするべきではありません。対処法の 1 つとしては、[react-gif-player](https://www.npmjs.com/package/react-gif-player) のようなパッケージを[クライアントサイド専用パッケージ](/docs/using-client-side-only-packages/)として使用して、GIF にコントロールを追加すると良いでしょう。

アクセシビリティにおけるモーションの詳細については以下を参照してください。

- https://source.opennews.org/articles/motion-sick/
- https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html
