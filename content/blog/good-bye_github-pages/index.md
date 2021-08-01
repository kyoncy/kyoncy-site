---
title: WordPress😂 → Gatsby(Github Pages😭) → Gatsby(Netlify😃)
date: "2019-12-23"
description: Github Pagesを辞めてNetlifyで運用しておりますという話。Qiitaから丸々転載してきた怠惰な記事。TOP3で使用している顔文字を使いたかっただけかも。
tags: ["GatsbyJS", "Github Pages", "Netlify"]
relativePath: good-bye_github-pages.png
---

この記事は [JAMstack Advent Calendar 2019](https://qiita.com/advent-calendar/2019/jamstack) 22 日目の記事です。

[きょんしー](https://twitter.com/kyoncy_site) です。最近更新できてない Gatsby で作った https://kyoncy.site の話をします 🐧

元々、ブログは WordPress を使っていたのですが

- **メンテナンスが面倒**
- **サーバ費用を 0 円にしたかった**
- **React や GraphQL を使いたかった**

これらの理由から、Gatsby.js で 1 から作り直しました。
最初は Github Pages にデプロイしていたのですが、

- **デプロイフローが面倒**(分かってないだけ)
- **デプロイされてからの反映される時間の遅さが気になる**

ということもあり、Netlify に移行しました。

## Starter Library 何それ知らない。 無知

[Gatsby.js Starter Library](https://www.gatsbyjs.org/starters/?v=2) で手軽に始められるようになっています。
([これがカッコいい](https://www.gatsbyjs.org/starters/justinformentin/gatsby-v2-tutorial-starter/)) にも関わらず、全く気づかなかったので [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) から始めました。
WordPress からの移行とはいえ、デザインがシンプルすぎた 😭

それからというものの、カスタマイズの日々が続くのでした。
「Gatsby + xxx」でググれば大抵の情報は見つかりました。

- 記事ごとのタグの導入
- 記事の OGP 画像を設定（設定した画像がなければデフォルト画像）
- コードの Syntax Highlight 機能の追加
- Github の草情報の追加 → https://github-contributions-api.deno.dev/kyoncy.svg

とりあえず最低限の機能を実装しました。
OGP 画像の実装は少し工夫が必要だったので gatsby-starter-blog から始めるのもアリですね。

## Github Pages 反映遅くない？ 後悔

いざデプロイするとなったとき、[Gatsby Docs](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/) に Github Pages へデプロイする方法を書いていたので参考にしました。
Github 上でドメインなどの設定をしましたがよく理解できず、master にマージされた後

```shell
$ gh-pages -d public -b master
```

を叩きました。
すると master ブランチの内容が、ビルドで生成される public ディレクトリ以下の内容に置き換わってました...HTML ファイルがズラーっと並んでいたので、詰んだかと思いました。

そしてもう 1 つ気になっていた点はデプロイしてから何分かは 404 が出ることでした。
WordPress を脱出したのに、結局メンテばっかりすることになるのは嫌だったので、Netlify へ移行することにしました。

## Netlify 楽々デプロイじゃん！ 歓喜

移行するにあたって [Build, deploy, & run Gatsby on Netlify | Netlify](https://www.netlify.com/with/gatsby/) が参考になりました。
Github からドメインや DNS の設定も移行 (設定の完了に多少時間はかかる) し、Netlify の Settings 画面にある Build と Deploy に関する項目を埋めて、いざデプロイ！

Deploy log が表示されるので、どこでこけた！とかが分かるようになって驚きでした。
無事、何事もなくデプロイ完了。追加した記事もすぐに反映されてました。

「あれ、終わった。キタコレ」という具合にあっけなく幕を閉じました。

## そりゃ WordPress が愛されるわけだ! 反省

今回は自分のブログだったのですが、
自分が働いている会社の別プロジェクトでサイトを立ちあげることになりました。
要件をあげてると、エンジニア以外の社員も記事だけでなくコンテンツを追加したりする機能が必要ということがわかりました。

Gatsby + Netlify CMS のような形にすれば、レイアウトは除いて社内の誰でも記事の管理をすることが出来ます。
しかし、細かい配置を変えたかったり写真を追加したかったりするのに全てエンジニアが手を加えていくことは現実的でありませんでした。

結局は WordPress を使うことになりました。(決して嫌いではない)
AWS で環境構築だけし行い、運用開始すると、ほとんど自分でメンテナンスすることがありませんでした。

世界中の多くのサイトで WordPress が採用されている理由が納得できました。Plugin も豊富。
まだ使ってはいないのですが Contentful や microCMS などの情報も気になるので試してみます。
