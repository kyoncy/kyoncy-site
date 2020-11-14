---
title: 技術書典7にGoogle Blocklyの同人誌を出します。載せれなかったこと。
date: "2019-09-15"
description: ビジュアルプログラミング言語のライブラリであるBlocklyを用いたReactアプリケーション開発とテストについて書きました。<strong>技術書典7[お90-C]</strong>にて出版します。44ページ、500円です。同人誌に載せれなかったカスタマイズの件。
tags: ["Blockly", "React", "Jest"]
relativePath: tech-book-fest7.png
---

9 月 22 日の技術書典に出すため、技術系同人誌を書きました。
サークルページは<a href="https://techbookfest.org/event/tbf07/circle/5653415447232512" target="_blank">こちら</a>です。

最近は Blockly ばっかり触って理解が進んできた。
Blockly のブロックがシンプルだったので、近頃のリッチな感じとマッチしにくいなぁと思ってた。
そこで、core をいじったりしてみた。
fork していじってみたプルリク →https://github.com/kyoncy/node-blockly/pull/1

Blockly のブロックはこんな感じ。

![Blockly](https://i.imgur.com/tgwShwa.jpg)

それを Makecode で使われているブロックに置き換えてみた。

![pxt-blockly](https://i.imgur.com/95bGEQ0.jpg)

やはり、良い。
