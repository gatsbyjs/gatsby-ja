---
title: プラグインを必要としないのはどのような時か
---

あなたのウェブサイトに追加したいサードパーティー機能のほとんどは、標準の Javascript や React.js と同じやり方でパッケージのインポートや UI の構成を行えます。これらは Gatsby のプラグインを必要としません！

いくつかの例を挙げます。

- `lodash` や `axios` のような一般的な機能を提供している Javascript のパッケージをインポートする場合
- `Highcharts` や `d3` のような視覚化に関するライブラリーを統合する場合

一般に、あなたが Javascript や React アプリケーションに取り組んでいる間に使用する npm パッケージは、 Gatsby アプリケーションと共に使用できます。プラグインが提供するものは、複数の Gatsby コア API をあらかじめまとめておいたものです。これは、最小の設定で利用できるので、あなたの時間とエネルギーの節約になります。

<<<<<<< HEAD
プラグインの良い使用例は、`Styled Components` でしょう。あなたはアプリケーションの root 近くにある `Provider` コンポーネントを自分でレンダリングできます。また、あなたは [gatsby-plugin-styled-components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/) を使用することもできます。このプラグインは、Styled Components をサーバーサイドレンダリングで使用するための設定に必要なあらゆる難題を代わりに行ってくれます。
=======
A good use case would be using `Styled Components`, you could manually render the `Provider` component near the root of your application, or you could use [gatsby-plugin-styled-components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/) which takes care of this step for you in addition to any other difficulties when configuring Styled Components to work with server-side rendering.
>>>>>>> 22a3fb4d3155774ddc223a249897020b0ee18db1
