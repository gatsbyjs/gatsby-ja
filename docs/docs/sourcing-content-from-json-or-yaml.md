---
title: JSON または YAML ファイルからデータを取得する
---

Gatsby では、JSON または YAML ファイルからデータを取得し、ページまたはコンポーネントで直接使用できます。このガイドでは、これらのやり方と YAML ファイルから Gatsby サイトを構築する方法について説明します。

このガイドで概説されている JSON または YAML からデータ取得をする方法に従うには、公式の [hello world スターター](https://github.com/gatsbyjs/gatsby-starter-hello-world) を使用して Gatsby サイトを作成することから始めます。

ターミナルを開き、次のコマンドを実行します。

```bash
gatsby new gatsby-YAML-JSON-at-buildtime https://github.com/gatsbyjs/gatsby-starter-hello-world
```

## YAML からデータを直接インポートする

この項では YAML からデータを取得します。代わりに JSON を使用してインポートする方法を確認するには、[次の項](#Directly-importing-data-with-JSON) に移動してください。

### YAML コンテンツを追加する

Gatsby プロジェクトフォルダーで、`content` ディレクトリーを作成し、その中に次の内容を記述した `My-YAML-Content.yaml` ファイルを作成してください。

```yaml:title=content/My-YAML-Content.yaml
title: YAML content used at build time with Gatsby
content:
  - item:
      Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah
      croissant candy canes bonbon candy. Apple pie jelly beans topping carrot cake
      danish tart cake cheesecake. Muffin danish chocolate soufflé pastry icing bonbon
      oat cake. Powder cake jujubes oat cake. Lemon drops tootsie roll marshmallow halvah
      carrot cake.
  - item:
      Doggo ipsum borkdrive much ruin diet you are doing me the shock the neighborhood pupper doggorino length boy many pats, boofers heckin shooberino wrinkler.
      Very good spot very jealous pupper very hand that feed shibe smol, shoob.
      Long bois pupper doggo you are doin me a concern big ol yapper, smol boof most angery pupper I have ever seen puggorino.
      Mlem blep wow very biscit dat tungg tho wow very biscit, thicc ur givin me a spook.
      Many pats heckin you are doing me the shock corgo ur givin me a spook very hand that feed shibe shooberino, big ol pupper doge pats borkdrive.
      Such treat what a nice floof super chub such treat, smol thicc.
      Puggorino very good spot most angery pupper I have ever seen you are doing me the shock big ol pupper porgo corgo shoober, heckin good boys lotsa pats noodle horse very taste wow thicc.
      What a nice floof long doggo blep length boy borking doggo, much ruin diet floofs borkf.
  - item: 192.33
  - item: 111111
```

### YAML をページコンポーネントにインポートする

表示したいデータができたので、あとはデータを表示するページを作るだけです。

`yml-at-buildtime.js` というファイルを `pages` というフォルダーの中に作成し、次のコードを記述してください。

```jsx:title=src/pages/yml-at-buildtime.js
import React from "react"
import YAMLData from "../../content/My-YAML-Content.yaml"

const YAMLbuildtime = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{YAMLData.title}</h1>
    <ul>
      {YAMLData.content.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.item}</li>
      })}
    </ul>
  </div>
)
export default YAMLbuildtime
```

? 上記のコードは YAML データを配列としてインポートし、`Array.map` メソッドでそれを反復処理し、ファンクショナル React コンポーネント（FC）を使用してデータが埋められたマークアップをレンダリングします。

## JSON からデータを直接インポートする

YAML からのデータに加えて（または、その代わりに）JSON を Gatsby サイトのデータソースとして使用できます。

### JSON コンテンツを追加する

Gatsby プロジェクトフォルダーで、（存在しなければ）`content` ディレクトリーを作成し、その中に次の内容を記述した `My-JSON-Content.json` ファイルを作成してください。

```json:title=content/My-JSON-Content.json
{
  "title": "JSON content used at build time with Gatsby",
  "content": [
    {
      "item": "Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah croissant candy canes bonbon candy. Apple pie jelly beans topping carrot cake danish tart cake cheesecake. Muffin danish chocolate soufflé pastry icing bonbon oat cake. Powder cake jujubes oat cake. Lemon drops tootsie roll marshmallow halvah carrot cake."
    },
    {
      "item": "Doggo ipsum borkdrive much ruin diet you are doing me the shock the neighborhood pupper doggorino length boy many pats, boofers heckin shooberino wrinkler. Very good spot very jealous pupper very hand that feed shibe smol, shoob. Long bois pupper doggo you are doin me a concern big ol yapper, smol boof most angery pupper I have ever seen puggorino. Mlem blep wow very biscit dat tungg tho wow very biscit, thicc ur givin me a spook. Many pats heckin you are doing me the shock corgo ur givin me a spook very hand that feed shibe shooberino, big ol pupper doge pats borkdrive. Such treat what a nice floof super chub such treat, smol thicc. Puggorino very good spot most angery pupper I have ever seen you are doing me the shock big ol pupper porgo corgo shoober, heckin good boys lotsa pats noodle horse very taste wow thicc. What a nice floof long doggo blep length boy borking doggo, much ruin diet floofs borkf."
    },
    {
      "item": 192.33
    },
    {
      "item": 111111
    }
  ]
}
```

### JSON をページコンポーネントにインポートする

表示したいデータができたので、あとはデータを表示するページを作るだけです。

`json-at-buildtime.js` というファイルを `pages` というフォルダーの中に作成し、次のコードを記述してください。

```jsx:title=src/pages/json-at-buildtime.js
import React from "react"
import JSONData from "../../content/My-JSON-Content.json"

const JSONbuildtime = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{JSONData.title}</h1>
    <ul>
      {JSONData.content.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.item}</li>
      })}
    </ul>
  </div>
)
export default JSONbuildtime
```

上記の YAML サンプルと同様に、このコードはデータを取得するために JSON ファイルをインポートする方法を示しています。インポートすると、データを `Array.map`メソッドで反復処理し、React コンポーネントでレンダリングできます。

追加設定なしで、ページに JSON ファイルからのコンテンツが表示されます。

## YAML をソースとする Gatsby サイトを構築する

YAML ファイルをソースとするページ構造を使用して、完全に機能する Gatsby サイトを構築することもできます。

### 必要な依存関係を追加する

この例では、サイト構造とそのコンテンツを含むファイルを安全に読み込んで解釈できるように、依存関係を追加する必要があります。

ターミナルを開き、Gatsby サイトのフォルダーに移動して、次のコマンドを実行します。

```bash
npm install --save js-yaml
```

この新しく追加されたパッケージは、YAML ファイルを安全に読み込んで解析する役割を果たします。

### いくつかのコンテンツを追加する

（存在しなければ）`content` ディレクトリーを作成し、その中に次の内容を記述した `index.yaml` ファイルを作成してください。

```yaml:title=content/index.yaml
- path: "/page1"
  content:
    - item: one item
    - item: two items
    - item: three items
  links:
    - to: "/page2"
    - to: "/page5"
- path: "/page2"
  content:
    - item:
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum.
  links:
    - to: "/page1"
- path: "/page3"
  content:
    - item: Cupcake ipsum dolor sit amet tootsie roll sesame snaps chupa chups.
        Sugar plum chupa chups topping I love carrot cake I love marshmallow dessert.
        Toffee gingerbread pie apple pie jelly beans pastry cookie.
        Lemon drops wafer I love pastry halvah dragée pudding cake.
        Cake halvah cookie jelly beans topping pudding cheesecake donut.
        Cake croissant marshmallow.
        Sesame snaps apple pie I love I love cake danish powder.
        Lollipop sweet caramels.
        Tiramisu danish marshmallow candy canes.
        Powder cupcake cotton candy bonbon chocolate bar marshmallow gummies cheesecake marzipan.
        Gummies soufflé candy. Candy canes muffin chocolate brownie pudding.
  links: []
- path: "/page4"
  content:
    - item:
        Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
        semiotics artisan synth stumptown gastropub cornhole celiac swag. Brunch raclette
        vexillologist post-ironic glossier ennui XOXO mlkshk godard pour-over blog tumblr
        humblebrag. Blue bottle put a bird on it twee prism biodiesel brooklyn. Blue
        bottle ennui tbh succulents.
  links:
    - to: "/page5"
    - to: "/page1"
- path: "/page5"
  content:
    - item: St. agur blue cheese queso cheesecake.
        Cheesecake the big cheese monterey jack cheesecake monterey jack paneer halloumi rubber cheese.
        Cheese triangles cheese strings cheese slices cheesy feet taleggio cottage cheese when the cheese comes out everybody's happy gouda.
        Feta cauliflower cheese babybel cheese on toast monterey jack.
    - item:
        Doggo ipsum borkdrive much ruin diet you are doing me the shock the neighborhood pupper doggorino length boy many pats, boofers heckin shooberino wrinkler.
        Very good spot very jealous pupper very hand that feed shibe smol, shoob.
        Long bois pupper doggo you are doin me a concern big ol yapper, smol boof most angery pupper I have ever seen puggorino.
        Mlem blep wow very biscit dat tungg tho wow very biscit, thicc ur givin me a spook.
        Many pats heckin you are doing me the shock corgo ur givin me a spook very hand that feed shibe shooberino, big ol pupper doge pats borkdrive.
        Such treat what a nice floof super chub such treat, smol thicc.
        Puggorino very good spot most angery pupper I have ever seen you are doing me the shock big ol pupper porgo corgo shoober, heckin good boys lotsa pats noodle horse very taste wow thicc.
        What a nice floof long doggo blep length boy borking doggo, much ruin diet floofs borkf.
  links:
    - to: "/page1"
```

上記のコードブロックは、次の YAML オブジェクトを作成します。

- それぞれの `path` がページのエンドポイントです。 (URL の関連部分）
- `contents` リストは表示されるデータを保持しています。
- `links`　リストは他ページへのエンドポイントを保持しています。

### Gatsby ページを設定する

動的なサイト構造とコンテンツが準備できたら、Gatsby に適切なページを生成し、それぞれのコンテンツを表示するように指示する必要があります。

もし `gatsby-node.js` ファイルが無ければプロジェクトのルートに作成します。そして、次のコードを記述します。

```js:title=gatsby-node.js
const fs = require("fs")
const yaml = require("js-yaml")
exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const ymlDoc = yaml.safeLoad(fs.readFileSync("./content/index.yaml", "utf-8"))
  ymlDoc.forEach(element => {
    createPage({
      path: element.path,
      component: require.resolve("./src/templates/basicTemplate.js"),
      context: {
        pageContent: element.content,
        links: element.links,
      },
    })
  })
}
```

このコードは何をしているのか解説します。

1. 以前インストールした `js-yaml` パッケージをインポートします。
2. `index.yaml` ファイルを読み込み、コンテンツを解析します。
3. Gatsby の [`createPage()` API](/docs/actions/#createPage)を使用して、解析されたファイルからプログラムでいくつかのページを作成します。
4. `context` プロパティを使用して、`pageContext` という特別な prop としてデータをページに渡し、それを使用できるようにします。 `context`の詳細については [ページの作成と変更](/docs/creating-and-modifying-pages/) を参照してください。

### テンプレートを作成する

ソースコンテンツのレンダリングプロセスを完了するには、データから動的ページを作成するためのテンプレートを作成する必要があります。

`gatsby-config.js` で参照されるコンポーネントと一致させるには、`src/templates/` フォルダー内に `basicTemplate.js` というファイルを作成して次のコードを記述してください。

```jsx:title=src/templates/basicTemplate.js
import React from "react"
import { Link } from "gatsby"
const basicTemplate = props => {
  const { pageContext } = props
  const { pageContent, links } = pageContext

  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <ul>
        {pageContent.map((data, index) => {
          return <li key={`content_item_${index}`}>{data.item}</li>
        })}
      </ul>
      <ul>
        {links.map((item, index) => {
          return (
            <li key={`link_${index}`}>
              <Link to={item.to}>{item.to}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default basicTemplate
```

### 部品を繋ぐ

YAML ファイルを解析し、Gatsby を設定してテンプレートでページを生成した後、次のファイルとフォルダーの構造が必要です。

```text
  |gatsby-YAML-JSON-at-buildtime
    |content
      - index.yaml
    |src
      |templates
        - basicTemplate.js
    - gatsby-node.js
```

? ターミナルで `gatsby develop` を実行し、ブラウザーで <http://localhost:8000/page1> にアクセスすると、サイトの生成に使用された YAML ファイルを元とするコンテンツを含んだページが表示されます。

これを既存の Gatsby サイトで機能させるには、次の物が必要です。

- `gatsby-node.js` ファイルの内容をコピーします： https://github.com/gatsbyjs/gatsby/blob/master/examples/using-gatsby-with-json-yaml/gatsby-node.js
- ベーシックテンプレートを作成します： https://github.com/gatsbyjs/gatsby/blob/master/examples/using-gatsby-with-json-yaml/src/templates/basicTemplate.js
- YAML ファイルを取得します： https://github.com/gatsbyjs/gatsby/blob/master/examples/using-gatsby-with-json-yaml/content/index.yaml
