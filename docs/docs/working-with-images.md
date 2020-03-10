---
title: Gatsby で画像を使用する
---

画像の最適化は、どんなウェブサイトでも課題です。複数デバイス上でパフォーマンス調整のベストプラクティスを利用するには、各画像に複数のサイズと解像度を用意する必要があります。幸運なことに、Gatsby は [page components](/docs/building-with-components/#page-components) で画像を表示する際に利用できる、いくつかの便利な[プラグイン](/docs/plugins/)を持っています。

その中でも、[GraphQL クエリー](/docs/graphql-concepts/)を利用して最適なサイズと解像度の画像を取得してから、[`gatsby-image`](/packages/gatsby-image/) コンポーネントで表示する方法を推奨します。

## GraphQL で画像をクエリーする

GraphQL で画像をクエリーすると、画像のデータにアクセスできるだけでなく、高性能な画像処理ライブラリ [Sharp](https://github.com/lovell/sharp) で変換を実行できます。

このためには、いくつかのプラグインが必要となります。

- [`gatsby-source-filesystem`](/packages/gatsby-source-filesystem/) プラグインを利用すると、[GraphQL でファイルをクエリー](/docs/graphql-concepts/#images)できるようになります。
- [`gatsby-plugin-sharp`](/packages/gatsby-plugin-sharp) は Gatsby プラグインと Sharp 間の連携を強化します。
- [`gatsby-transformer-sharp`](/packages/gatsby-transformer-sharp/) を利用すると、クエリーによって適切なサイズと解像度を持つ複数の画像を生成できるようになります。

最終的な画像が固定サイズの場合、その画像について複数の解像度を持つように最適化されます。レスポンシブである場合、つまりコンテナまたはページに合わせて画像が伸縮するような場合、ひとつの画像ごとに複数のサイズを持つように最適化されます。[詳細については、Gatsby Image のドキュメント](/packages/gatsby-image/#two-types-of-responsive-images)を参照してください。

また、クエリーに引数を指定することで、正確な寸法や、最小・最大寸法を指定できます。[全てのオプションについては、Gatsby Image のドキュメント](/packages/gatsby-image/#two-types-of-responsive-images)を参照してください。

以下の例は、ページのサイズを変更すると画像もリサイズされるようなイメージギャラリーのためのクエリーです。`fluid` 関数と fluid フラグメントを使用することで `gatsby-image` コンポーネントで使用できる適切なデータを取得し、引数を使用して最大幅を 400px、最大高を 250px に設定しています。

```js
export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "images/myimage.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
```

## gatsby-image を利用して画像を最適化する

[`gatsby-image`](/packages/gatsby-image/) は、最適化された画像から自動的に React コンポーネントを生成するプラグインです。以下の機能を持っています。

> - 各デバイスのサイズと画面解像度に合わせて最適なサイズの画像を読み込みます。
> - 画像の読み込み中にページ位置がずれないように、読み込み中に画像の位置を固定します。
> - 「blur-up」エフェクトをかけます。つまり、画像全体がロードされるまで、画像の小さなバージョンを読み込むようになります。
> - または、画像をトレースした SVG 画像を提供します。
> - 画像の遅延読み込みによって、帯域幅が削減され、初回読み込み時間が短縮されます。
> - ブラウザがサポートしている場合、[WebP](https://developers.google.com/speed/webp/) フォーマットの画像を使用します。

前の例のクエリーを使用した画像コンポーネントは次のようになります。

```jsx
<Img fluid={data.fileName.childImageSharp.fluid} alt="" />
```

## フラグメントを使用してフォーマットを統一する

多数の画像があって、そのすべてに同じフォーマットを使用したい場合はどうするのがよいでしょうか？

カスタムフラグメントを利用することで、簡単にフォーマットを統一して複数の画像で再利用できます。

```js
export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 200, maxHeight: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
```

これで、フラグメントを画像クエリ内で参照できるようになります。

```js
export const query = graphql`
  query {
    image1: file(relativePath: { eq: "images/image1.jpg" }) {
      ...squareImage
    }

    image2: file(relativePath: { eq: "images/image2.jpg" }) {
      ...squareImage
    }

    image3: file(relativePath: { eq: "images/image3.jpg" }) {
      ...squareImage
    }
  }
`
```

### 参考リンク

- [Gatsby Image API docs](/docs/gatsby-image/)
- [Using gatsby-image with Gatsby](https://egghead.io/playlists/using-gatsby-image-with-gatsby-ea85129e), free egghead.io playlist
- [gatsby-image plugin README file](/packages/gatsby-image/)
- [gatsby-plugin-sharp README file](/packages/gatsby-plugin-sharp/)
- [gatsby-transformer-sharp README file](/packages/gatsby-transformer-sharp/)
