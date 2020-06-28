---

## title: キャッシュに関する問題のデバッグ

Gatsby のキャッシュ機構が失敗しているように見える場合、次のような問題が考えられます。

- コンテンツが表示されるべきときに表示されない
- プラグインのソースコードの変更が適切に呼び出されていない

など。

次のようなスクリプトを書いている場合は、キャッシュ問題の解決に役立つ `gatsby clean` コマンドの利用を検討してください。

```json:title=package.json
{
  "scripts": {
    "clean": "rm -rf .cache"
  }
}
```

まず、`package.json` の dependencies で指定されている `gatsby` のバージョンが `2.1.1` 以上であることを確認し、`package.json` に次の変更を加えます。

```json:title=package.json
{
  "scripts": {
    "clean": "gatsby clean"
  }
}
```

キャッシュに関する問題が発生していると考えられる場合、 `npm run clean` でキャッシュを削除して新たに開始します。

_注意: もしこのコマンドを定期的に利用している場合、私達への支援と明確な再現手順を書いて[GitHub Issue へ報告すること][github-issue]を検討してください。_

[github-issue]: https://github.com/gatsbyjs/gatsby/issues/11747
