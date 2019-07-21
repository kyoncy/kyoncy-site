---
title: GatsbyのGithub Pagesへのデプロイ時にmasterが書き換えられちゃう
date: "2019-07-21"
description: ブログをGatsbyに移行しGithub Pagesで運用開始。デプロイ時にmasterが書き換えられちゃう。エンジニアだからコードブロック追加できるようにしたい。Gatsbyのカスタマイズってこんな感じかなと模索する。
---

WordPressからGithub Pagesへの移行が無事に終わった。フォントは大好きなヒラギノにした。
Gatsbyを触ってみて、こんなカスタマイズがしたいなぁということが出てきたのでまとめる。


## GatsbyをGithub Pagesで運用開始
Github Pagesでブログ？サイト？の運用を開始した。
独自ドメインの設定も無事に完了したのでひとまずOK。


## 'yarn deploy'したらmasterが書き換わる事案
[How Gatsby Works with GitHub Pages](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/#github-organization-or-user-page) に`[usename].github.io`リポジトリとしてデプロイする手順等を記載している。

`master`ブランチをpushしたのちに`yarn deploy`(中身は`gatsby build && gh-pages -d public -b master`)してみた。
`origin/master`がbuildしたpublicディレクトリ以下の内容で上書きされてる感じ。

機能開発は`develop`からブランチ切って進めて、`develop`から`master`に強制pushして、`yarn deploy`走らせると良いのかな。
まだ`gh-pages`コマンドを走らせた時に何をしてるのかちゃんと分かってないなぁ。

この辺のことを調査して、運用方法も決めてかなきゃ。


## JSの知見まとめたいのでコードブロックを追加



## Gatsbyでこんなカスタマイズがしたい
Github使ってるなら`issue, Project`とかあるじゃんって話だが、振り返ったときに面白そうだなと思った。

- Profileページ入れたい
  - Profileの記事を書いて`img`をクリック可能にするでも良い
- markdownからhtmlに変換した際にCSSが気持ち悪い
  - ちなみにこの`ul,li`の`margin-bottom`がとても大きかったのでCSSを追加した
  - コードブロックもカッチョいい感じにしたい
- wantedlyで書いた記事、Twitter, Facebookの投稿を引っ張ってくる
  - ただただ、ブログ感を出したいだけ
- 記事ごとにカテゴリラベルを付与させる
  - 書評なり開発のことなり個人的なことなり、いずれ分類する必要が出る
  - 技術書典7に出すということもある
- 見てくれる人の為に見易さにこだわっていきたい
- トップページのレイアウトにこだわりたい
  - OGP画像が表示されてるとか、カード型のレイアウトになってるとか
  - [Starter Library](https://www.gatsbyjs.org/starters/?v=2)に色んなのあるけど自分でカスタマイズする

洗い出してみると楽しみになってきた。
変にカスタマイズがだいぶされてるLibrary選ばなくて正解だったかも。これから実証していくことになる。