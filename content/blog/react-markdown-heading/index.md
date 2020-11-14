---
title: Markdown から Table of Contents を生成する React Componentライブラリを作った
date: "2020-11-14 09:00:00"
description: Markdownを入力として Table of Contents の React Component を返すライブラリを作成しました。仕事でも採用しているので機能追加せざるを得ない感じになって汎用性上げつつ、どう追加するか悩んでます。
tags: ["React", "TypeScript", "Markdown", "markdown-toc"]
relativePath: react-markdown-heading.png
---

## 概要

タイトルの通り、Markdown から ToC を作成する React Component ライブラリを作りました。

npm に公開しているので Qiita や Zenn のサイドバーが必要になる機会があれば使用を検討していただけたらと思います。

https://www.npmjs.com/package/react-markdown-heading

リポジトリも Public にしているので要望やバグの報告は issue 立てていただければと思います。

https://github.com/kyoncy/react-markdown-heading

## 作った経緯

仕事でのプロダクト開発の中で、Markdown でリファレンスを書くことになったのが発端です。リファレンスを追加できるようになったのは良いものの、縦長になってくることが予想されたので ToC を表示してハイパーリンクでのページ内の遷移を行うようになりました。

ライブラリを探してみたものの良さそうなライブラリがなく、自分で作成することにしました。

調べてみると [Gatsby.js のプラグイン](https://www.gatsbyjs.com/plugins/gatsby-remark-table-of-contents/) であったり [VSCode の Plugin](https://marketplace.visualstudio.com/items?itemName=AlanWalk.markdown-toc) がよく使われていそうでした。

Markdown に内包する形ではなく、サイドバーに表示したかったので実装例を調べてました。takumon さんの記事 https://takumon.com/2018/10/28/ が参考になりました。

## ライブラリ作成開始

作り始めたは良いものの、ToC を生成するコードが思ったより複雑でした。

- h1 が含まれてなくて h2 から始まる
- h1 の次は h3、といったように h2 を飛ばしてる
- h1~6 の中のテキストが太字だったり斜体だったりする

などなど、色々なケースが想定されるのでプロダクトのコードがめちゃくちゃになる前にライブラリとして作った方が良いのではないかと思い、npm への公開を目標に作り始めました。

夜 10 時から開発開始して v0.1.0 を 深夜 1 時くらいに公開した記憶があります。そこから地道に修正を重ねて 2020/11/14 時点で v1.0.1 が最新です。

途中からテスト書いて実装するようにシフトしていき、カバレッジの測定も行うようにしました。カバレッジの計測には codecov を用いました。今は 100%になってます。

https://codecov.io/gh/kyoncy/react-markdown-heading

ビルドには[esbuild](https://github.com/evanw/esbuild)を用いています。コード量がそれほど多いわけではないので比較は出来てないですが、早いこと間違いなかったです。

### 使い方

`markdown` の props に文字列を渡すだけです。その他は Optional なので必要に応じて設定してください。

```jsx
import React from "react"
import ReactDOM from "react-dom"
import ReactMarkdownHeading from "react-markdown-heading"

const markdown = "## h2\n### h3\n#### h4\n### h3\n# h1\n### h3"

render(
  <ReactMarkdownHeading
    markdown={markdown}
    ulClassName=""
    liClassName=""
    anchorClassName=""
    hyperlink={false}
    blankSpaceReplaceText={"-"}
    headingDepth={6}
  />,
  document.getElementById("root")
)
```

## 今後の開発

Qiita, Zenn などを使ったことがある方なら分かると思いますが、スクロール位置によって ToC の該当箇所がハイライトされ、全体の中のどこを読んでいるのかが分かりやすくなっています。

react-markdown-heading はあくまで ToC を返すコンポーネントライブラリとしての機能しか提供していないため、active な箇所だけハイライトする的なことが出来ません。

実装方法を具体的に考えれているわけではないのですが、`li`タグに id を持たせてスクロールイベントか何かで `activeId` を入力として受け取って `activeClassName` を適用する。みたいなことが必要なのかなと考えています。

汎用性を持たせつつ、もっと良い実装方法があれば issue などで教えていただきたいです。
