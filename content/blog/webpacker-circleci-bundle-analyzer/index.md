---
title: Webpackerでwebpack-bundle-analyzer、CircleCIのテストで落ちない対処法
date: "2019-12-26"
description: lodash, momentなどのサイズが比較的大きいライブラリを使っていて、どれくらいスペースとってるのか気になったのでWebpackerに webpack-bundle-analyzer 導入した。動作するのは良いが、CircleCIの rake test でTimeOutになるので試行錯誤した話
tags: ["CircleCI", "webpacker", "diary"]
relativePath: webpacker-circleci-bundle-analyzer.png
---

※ この記事に設定している画像はあえてモザイクをかけています。

Webpacker 使ってるアプリケーションに webpack-bundle-analyzer を導入して CircleCI でつまづいた話です。

なぜ webpack-bundle-analyzer を導入しようと思ったのかは
[mizchi さんの Qiita の記事](https://qiita.com/mizchi/items/af17f45d5653b76f6751) を通勤中に読んでて、lodash 使いまくってる気がするなぁと感じたからです。

おっ、[webpack-bundle-analyzer の issue](https://github.com/webpack-contrib/webpack-bundle-analyzer/issues/311#issue-494745779) にそれらしきものがあるぞ。試してみよう。

![](https://i.imgur.com/V1zkhn4.png)

おぉ！表示された！なかなか綺麗に表示してくれる。2 つ目に思ったこと、lodash が場所を占有しすぎている。まぁ lodash の排除は年明けに行うとしよう。

実行の確認もできたし特に問題はなさそう。PUSH。

後は CircleCI、君に任せた。

![](https://i.imgur.com/yl51Yrp.png)

あれ、テストで落ちてる。`deadline exceeded`。なぜだろう。

- Rails6 にあげてるから？
- `development.js` だけじゃなく `test.js` にも同じ記述する必要ある？
- そもそも記述が間違ってる？

と検証してると options が怪しそう。[webpack-bundle-analyzer の README](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin) に書いてあるじゃん。以下に修正。

```js
process.env.NODE_ENV = process.env.NODE_ENV || "development"

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const environment = require("./environment")

environment.plugins.append(
  "BundleAnalyzer",
  new BundleAnalyzerPlugin({
    openAnalyzer: false, // ブラウザの立ち上げる設定
    analyzerMode: "static", // 'server', 'static', 'disabled'
  })
)

module.exports = environment.toWebpackConfig()
```

無事に CI 通過し一件落着。

react-app-rewired 使って webpack.config の内容を上書きしてるアプリケーションの方も記事がたくさんあったのですんなり導入できた。
