---
title: 問い合わせフォームの作成
---

このガイドでは Gatsby サイトで問い合わせフォームを作成する方法と、送信されたデータを処理するいくつかの手法を説明します。

Gatsby は React で構築されています。そのため React フォームでできることはすべて Gatsby でも可能です。Gatsby にフォームを追加する方法の詳細については、[フォームの追加](/docs/adding-forms/)をご覧ください。

## 使いやすいフォームを作成する

不完全なフォームは、ウェブサイトの使いやすさに対する一般的な障壁であり、キーボードとスクリーンリーダーを使用してページを操作する場合には特に問題になります。フォームは、関連情報のグループに明確かつ直感的に整理され、各フォームのフィールドは適切なラベルで識別される必要があります。

使いやすいフォームの作成に関する詳細情報は、[WebAIM の記事](https://webaim.org/techniques/forms/)から参照できます。

## Sending Form Data

フォームを送信すると、対応するデータは何らかの方法で処理されサーバーに送信されます。フォームデータの送信に関する詳細情報は [MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data)を見てください。

これから説明する各手法は、次の問い合わせフォームを元にしています。

```jsx:title=src/pages/contact.js
<form method="post" action="#">
  <label>
    Name
    <input type="text" name="name" id="name" />
  </label>
  <label>
    Email
    <input type="email" name="email" id="email" />
  </label>
  <label>
    Subject
    <input type="text" name="subject" id="subject" />
  </label>
  <label>
    Message
    <textarea name="message" id="message" rows="5" />
  </label>
  <button type="submit">Send</button>
  <input type="reset" value="Clear" />
</form>
```

## Gatsby でフォーム送信をするための選択肢

### Getform

Getform は静的サイトでフォーム送信を実現するためのフォームバックエンドプラットフォームです。無料プランもあります。まず、Gatsby サイトで投稿を受け取ることが出来るフォームの作成から始めます。フォームを作成するとき、表示する各フィールドの `name` 属性をつけて、POST メソッドで Getform に送信するように設定します（name, email, message など）。

```jsx:title=src/pages/contact.js
<form method="post" action="https://getform.io/{your-unique-getform-endpoint}">
  ...
  <label>
    Email
    <input type="email" name="email" />
  </label>
  <label>
    Name
    <input type="text" name="name" />
  </label>
  <label>
    Message
    <input type="text" name="message" />
  </label>
  ...
</form>
```

フォームのコードを変更したら、問い合わせページからフォームを送信することができます。送信したデータは、Getform のダッシュボードに表示されます。作成したフォームのメール通知を複数のメールアドレスで受信したり、Zapier や Webhooks オプションを使用して Getform から送られるデータを操作したりできます。

Getform への登録と、フォーム設定の詳細は [Getform のウェブサイト](https://getform.io/)を参照してください。また、サンプルコードは [Codepen](https://codepen.io/getform) で見つけられます。

### Netlify

Netlify でサイトをホストしている場合、Netlify の素晴らしい [フォーム機能](https://www.netlify.com/docs/form-handling/)を利用できます。

設定は、フォームにいくつかの属性を追加するだけです。

```diff:title=src/pages/contact.js
- <form method="post" action="#">
+ <form method="post" netlify-honeypot="bot-field" data-netlify="true">
+   <input type="hidden" name="bot-field" />
  ...
```

これで、フォームからのすべての送信が Netlify のダッシュボードのフォームタブに表示されます。Netlify ではフォームの属性の `netlify-honeypot ="bot-field"` と対応する hidden フィールドを追加することで、受信する可能性のあるスパム通知を拒否することもできます。

Netlify フォームの詳細な情報は [Netlify のウェブサイト](https://www.netlify.com/docs/form-handling/)を参照してください。

### Formspree

Formspree は寛大な無料利用プランを持つ、静的サイトからのフォーム送信をサポートするためのサービスです。ほとんど設定を必要とせずに、フォームが指定したメールアドレスにデータを直接送信する優れたツールとなります。

Formsprees の機能を活用するためには、フォームの POST メソッドのアクションを Formspree API（メールアドレスはあなたのものに置き換えてください）向けに設定します。そして、メールアドレスの入力フィールドの `name` 属性を `name="_replyto"` に変更します。

```jsx:title=src/pages/contact.js
<form method="post" action="https://formspree.io/email@domain.tld">
  ...
  <label>
    Email
    <input type="email" name="_replyto" />
  </label>
  ...
</form>
```

変更を行ったら、フォームから初めて送信した際に、あなたのメールアドレスに Formspree から送られるメールを使用して Formspree に登録します。その後は、フォームからの送信のすべてがあなたのメールアドレスに送信されます。登録や、設定の詳細については [Formspree のウェブサイト](https://formspree.io/)をご覧ください。

このように設定されたすべてのフォームは、標準で reCAPTCHA を備えていますが、`name="_gotcha"` という 隠しフィールドを追加することで Honeypot スパムフィルタリングを有効にすることもできます。

```jsx
<input type="text" name="_gotcha" style="display:none" />
```

入力欄が非表示になっているため、Formspree はこのフィールドの値がボットのみから送信されたことを認識し、静かに無視します！

### 独自のサーバーで実行する

フォームデータの処理に大量のビジネスロジックが必要な場合は、自分でサービスを作成することがもっとも理にかなっています。一般的な解決方法は、HTTP サーバーの作成です。これは、PHP、Ruby、GoLang などの多くの言語で実現できます。また、Node.js で [Express](https://expressjs.com/) を使用して作成することもできます。

express、body-parser、nodemailer を使用したサーバーの初期実装は次のようになります。

```javascript:title=handleForm.js
const bodyParser = require("body-parser")
const express = require("express")
const nodemailer = require("nodemailer")

const app = express()
app.use(bodyParser.urlencoded())

const contactAddress = "hey@yourwebsite.com"

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.production.GMAIL_ADDRESS,
    pass: process.env.production.GMAIL_PASSWORD,
  },
})

app.post("/contact", function(req, res) {
  mailer.sendMail(
    {
      from: req.body.from,
      to: [contactAddress],
      subject: req.body.subject || "[No subject]",
      html: req.body.message || "[No message]",
    },
    function(err, info) {
      if (err) return res.status(500).send(err)
      res.json({ success: true })
    }
  )
})

app.listen(3000)
```

この実装では `/contact` への POST リクエストに反応して、POST されたフォームのデータをあなたのメールアドレスに送ります。このサーバーは、 [Now](https://zeit.co/now) などのサービスを使ってデプロイすることも出来ます。

デプロイしたら、公開 URL（`my-project-abcd123.now.sh` のような）をメモしてフォームのアクションで指定します。

```jsx:title=src/pages/contact.js
<form method="post" action="my-project-abcd123.now.sh/contact">
  ...
</form>
```

これで、フォームからの送信はすべてあなたのメールアドレスに送られます。

独自のメールサーバーでの開発、運用については、[DataFire による素晴らしいガイド](https://medium.com/datafire-io/simple-backends-four-ways-to-implement-a-contact-us-form-on-a-static-website-10fc430984a4) があります。

## その他の参考資料

何か問題がある場合や、Gatsby で独自の問い合わせフォームの実装方法について詳しく知りたい場合は、Scott Tolinski のチュートリアルをご覧ください。

https://youtu.be/hF7xJhzrr9s
