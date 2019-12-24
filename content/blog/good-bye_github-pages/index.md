---
title: WordPress😂 → Gatsby(Github Pages😭) → Gatsby(Netlify😃)
date: "2019-12-23"
description: Github Pagesを辞めてNetlifyで運用しておりますという話。Qiitaから丸々転載してきた怠惰な記事。TOP3で使用している顔文字を使いたかっただけかも。
tags: ["GatsbyJS", "Github Pages", "Netlify"]
relativePath: good-bye_github-pages.png
---

この記事は [JAMstack Advent Calendar 2019](https://qiita.com/advent-calendar/2019/jamstack) 22日目の記事です。

[きょんしー](https://twitter.com/kyoncy_site) です。最近更新できてないGatsbyで作った https://kyoncy.site の話をします🐧

元々、ブログは WordPress を使っていたのですが

- **メンテナンスが面倒**
- **サーバ費用を0円にしたかった**
- **ReactやGraphQLを使いたかった**


これらの理由から、Gatsby.jsで1から作り直しました。
最初はGithub Pagesにデプロイしていたのですが、


- **デプロイフローが面倒**(分かってないだけ)
- **デプロイされてからの反映される時間の遅さが気になる**


ということもあり、Netlifyに移行しました。


## Starter Library 何それ知らない。 無知

[Gatsby.js Starter Library](https://www.gatsbyjs.org/starters/?v=2) で手軽に始めれるようになっている ([これかっこいい](https://www.gatsbyjs.org/starters/justinformentin/gatsby-v2-tutorial-starter/)) にも関わらず、全く気づかなかったので [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) から始めました。
WordPressからの移行とはいえ、デザインがシンプルすぎた😭

それからというものの、カスタマイズの日々が続くのでした。
「Gatsby + 〇〇」でググれば大抵の情報は見つかりました。

- 記事ごとのタグの導入
- 記事のOGP画像を設定（設定した画像がなければデフォルト画像）
- コードのSyntax Highlight機能の追加
- Githubの草情報の追加 → http://grass-graph.moshimo.works/

とりあえず最低限の機能を実装しました。
OGP画像の実装は少し工夫が必要だったので gatsby-starter-blog から始めるのもアリかもしれませんね。


## Github Pages 反映遅くない？ 後悔

いざデプロイするとなったとき、[Gatsby Docs](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/) に Github Pages へデプロイする方法を書いていたので参考にしました。
Github上でドメインなどの設定をしましたがよく理解できず、masterにマージされた後に

```sh
$ gh-pages -d public -b master
```

を叩きました。
すると master ブランチの内容が、ビルドで生成される public ディレクトリ以下の内容に置き換わってました...HTMLファイルがズラーっと並んでいたので、詰んだかと思いました。

masterの変更をフックしてデプロイフローが走るようにしなければ、機能追加や記事更新のたびに正しい対処法かもわからないdevelopブランチからブランチ生やしてforce push、みたいな訳の分からない運用になりそうだなぁと思っていました。

そしてもう1つ気になっていた点はデプロイしてから何分かは 400 が出ることでした。
WordPressを脱出したのに、結局メンテばっかりすることになるのは嫌だったので、Netlifyに移行することにしました。


## Netlify 楽々デプロイじゃん！ 歓喜

移行するにあたって [Build, deploy, & run Gatsby on Netlify | Netlify](https://www.netlify.com/with/gatsby/) が参考になりました。
GithubからドメインやDNSの設定も移行 (設定の完了に多少時間はかかる) し、Netlify の Settings 画面にある Build と Deploy に関する項目を埋めて、いざデプロイ！

Deploy log が表示されるので、どこでこけた！とかが分かるようになってて驚きでした。
無事、何事もなくデプロイ完了。追加した記事もすぐに反映されてました。

「あれ、終わった。キタコレ」という具合にあっけなく幕を閉じました。


## そりゃ WordPress が愛されるわけだ! 反省

今回は自分のブログだったのですが、
自分が働いている会社の別プロジェクトでサイトを立ちあげることになりました。
要件をあげてると、エンジニア以外の社員も記事だけでなくコンテンツを追加したりする機能が必要ということがわかりました。

Gatsby + Netlify CMS のような形にすれば、レイアウトは除いて社内の誰でも記事の管理をすることが出来ると思うのですが、細かい配置を変えたかったり写真を追加したかったりするのに全てエンジニアが手を加えていくことは現実的ではありませんでした。

結局は WordPress を使うことになりました。(決して嫌いではない)
AWSで環境構築だけし行い、運用開始すると、ほとんど自分がメンテナンスすることがありませんでした。

世界中の多くのサイトが WordPress である理由が納得できました。Pluginも豊富。
まだ使ってはいないのですが Contentful や microCMS などの情報も聞いて、気になるので試してみようと思います。
