---
title: GatsbyのGithub Pagesへのdeploy時にmasterが書き換えられちゃう
date: "2019-07-21"
description: ブログをGatsbyに移行しGithub Pagesで運用開始。デプロイ時にmasterが書き換えられちゃう。エンジニアだからコードブロック追加できるようにしたい。Gatsbyのカスタマイズってこんな感じかなと模索する。
tags: ["GatsbyJS", "Github Pages"]
---

WordPress から Github Pages への移行が無事に終わった。フォントは大好きなヒラギノにした。
Gatsby を触ってみて、こんなカスタマイズがしたいなぁということが出てきたのでまとめる。

## Gatsby を Github Pages で運用開始

Github Pages でブログの運用を開始した。
独自ドメインの設定も無事に完了したのでひとまず OK。

## 'yarn deploy'したら master が書き換わる事案

[How Gatsby Works with GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/#github-organization-or-user-page) に`[usename].github.io`リポジトリとしてデプロイする手順等を記載している。

`master`ブランチを push したのちに`yarn deploy`(中身は`gatsby build && gh-pages -d public -b master`)してみた。
`origin/master`が build した public ディレクトリ以下の内容で上書きされてる感じ。

機能開発は`develop`からブランチ切って進めて、`develop`から`master`に強制 push して、`yarn deploy`走らせると良いのかな。まだ`gh-pages`コマンドを走らせた時に何をしてるのかちゃんと分かってないなぁ。

この辺のことを調査して、運用方法も決めてかなきゃ。

## JS の知見まとめたいのでコードブロックを追加

gatsby-remark-prismjs を使えば実現できる感じだったので、追加して設定した。

```javascript
;(() => {
  console.log("コードブロックを追加した")
})()
```

ファイル名を追加するための gatsby-remark-code-titles もあるが、必要がなさそうなので設定しなかった。
少しだけカスタマイズして感じたのは、色んなことがある程度手軽に実現できそうということ。

カスタマイズとは違う点で、Github Pages が厄介な感じがするのはどうにかしたい。
Netlify にデプロイしてみた、という記事もよく見かけたので移行も検討したい。

## Gatsby でこんなカスタマイズがしたい

Github 使ってるなら issue, Project とかあるじゃんって話だが、振り返ったときに面白そうだなと思った。

- Profile ページ入れたい
  - Profile の記事を書いて画像をクリックして飛ばす、でも良い
- markdown から html に変換した際、CSS が気持ち悪い
  - ちなみにこの`ul,li`の`margin-bottom`がとても大きかったので CSS を追加した
  - コードブロックもカッチョいい感じにしたい
- wantedly で書いた記事、Twitter, Facebook の投稿を引っ張ってくる
  - ただただ、ブログ感を出したいだけ
- 記事ごとにカテゴリラベルを付与させる
  - 書評や開発のことなり個人的なことをいずれ分類する必要が出るだろう...
  - 技術書典 7 に出すということもある
- 見てくれる人の為に見易さをこだわりたい
- トップページのレイアウトにこだわりたい
  - OGP 画像が表示されてるとか、カード型のレイアウトになってるとか
  - [Starter Library](https://www.gatsbyjs.org/starters/?v=2)に色んなのあるけど自分でカスタマイズする

洗い出してみると楽しみになってきた。
変にカスタマイズがだいぶされてる Library 選ばなくて正解でしたかね。
