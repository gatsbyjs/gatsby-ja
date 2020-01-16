// Collection of textlint rule
// https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule

module.exports = {
  rules: {
    // https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
    "preset-ja-technical-writing": true,
    // https://github.com/textlint-ja/textlint-rule-preset-JTF-style
    "preset-jtf-style": {
      "1.1.3.箇条書き": false, // 箇条書きの文末に句点(。)以外を許可
      "3.1.1.全角文字と半角文字の間": false, // 全角文字と半角文字の間にスペースを入れる
      "2.1.6.カタカナの長音": true, // カタカナ語の長音は基本的に伸ばす
      "2.2.1.ひらがなと漢字の使い分け": true, // ひらがなにしたほうが良い漢字
    },
    // https://github.com/textlint-rule/textlint-rule-prh
    prh: { rulePaths: ["./prh.yml"] },
    "ja-technical-writing/no-exclamation-question-mark": false, // 文末の感嘆符を許可
    "ja-technical-writing/max-ten": { max: 5 }, // 句点の数を緩和
    "ja-technical-writing/ja-no-weak-phrase": false, // 弱い表現の許容
    "ja-technical-writing/ja-no-mixed-period": { allowPeriodMarks: ["："] }, // 文末は。、：で終わる
    "ja-technical-writing/sentence-length": false, // 翻訳完了後に有効化
    "ja-technical-writing/max-comma": false, // 翻訳完了後に有効化
    "textlint-rule-ja-hiragana-hojodoushi": true, // ひらがなにしたほうが良い補助動詞
    "textlint-rule-ja-hiragana-fukushi": true, // ひらがなにしたほうが良い副詞
    "ja-space-between-half-and-full-width": {
      space: "always",
      exceptPunctuation: true,
    }, // 半角文字と全角文字の切替時にスペースを入れる
  },
  filters: {
    // https://github.com/textlint/textlint-filter-rule-comments
    comments: true,
    // https://github.com/textlint/textlint-filter-rule-whitelist
    whitelist: {
      allow: ["/^<[\\s\\S]*?/>/m"], // Reactコンポーネントをlintしない
    },
  },
}
