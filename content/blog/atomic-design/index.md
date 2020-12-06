---
title: Atomic Design に入門したがAtomとMoleculeの違いがわからない
date: "2020-11-14 11:00:00"
description: 個人開発で Atomic Design を採用してコンポーネントを作ってるが、これはAtomが良いのか？Moleculeが良いのか？(はたまたOrganism？)となってるのでいろんな記事読んだりして自分が思ってることを書き出す
tags: ["Atomic Design"]
relativePath: atomic-design.png
---

この記事を書こうと思ったのは、[Atomic Design における Atom, Molecule, Organism の見極め方](https://a-suenami.hatenablog.com/entry/2019/04/29/173415) に「なるほど〜」と思わされたからです。

## Podcast って良い

いきなり余談です。

ラジオもよいのですが、[UIT INSIDE](https://uit-inside.linecorp.com/), [EM.FM](https://anchor.fm/em-fm), [omoiyari.fm](https://lean-agile.fm/) をよく聴いてて Podcast ってなんか良いなぁと思って無駄に 0 から作りはじめてます。

おすすめの Podcast 教えて下さい。

## Podcast 作ってる

触ってない FW とかライブラリ触ってみたいなと思って Next.js 使ってます。それといつもは CSS Modules でスタイル当てているのですが styled-components 使ってみてます。

それと、タイトルにもある通り Atomic Design を採用してみてるのですが、良いと感じるところと難しいところを書いていきます。

## Atomic Design 難しい

最初に取り掛かり始めたはオーディオの再生・一時停止・10 秒早送り・10 秒巻き戻しのボタンです。

以下のように `Atoms`, `Molecules`, `Orfganisms` でディレクトリをきっています。

```shell
❯ tree src/components
src/components
├── Atoms
│   ├── Button.tsx
│   └── InputRange.tsx
├── Molecules
│   ├── Button
│   │   ├── Pause.tsx
│   │   ├── Play.tsx
│   │   ├── SkipBackward.tsx
│   │   └── SkipForward.tsx
│   └── InputRange
│       ├── AudioSeekbar.tsx
│       └── VolumeSeekbar.tsx
├── Organisms
│   └── AudioControlButtons.tsx
└── templates
```

この中のボタンを Atoms で持つか Molecules で持つかのことを書いていきます。

### Button の構成の説明

Atoms のボタンは children, onClick, style 等 が props として渡ってきます。Atoms の役割としては間違ってない構造にはなってると思います。

しかし、Molecules/Button に再生や一時停止などのボタンがあります。例えば Play.tsx ボタンに渡ってくる props は onClick だけで同じ階層にある Pause.tsx などとの違い fontawesome のアイコン情報を持っている点です。

Organisms/AudioControlButtons.tsx は 4 つのボタンをまとめていて、それぞれの click イベントハンドラを定義して props で渡しています。

### Atom/Molecule の使い分け

ここで疑問に感じてるのは Molecules/Button 以下にあるコンポーネントはアイコンの情報が異なるだけであるという点です。Organism でアイコンの情報を持たせて Molecules/Button を削除するほうが良い気がしています。

ただ、Spotify のように再生・一時停止のボタンには border-radius があるけど、次の曲や前の曲へスキップするボタンには border-radius ない。といったように変わってくることを想定すると Molecule は必要になってくる気もします。

その際は、Play.tsx, Pause.tsx を汎用的にしたものと SkipBackward.tsx, SkipForward.tsx を汎用的にしたもの、の 2 つに分かれるのかな。とも思ったりしてます。

こんな事を考えていると Molecules/Button 削除したのにまた復活するとかの手戻りが発生しそうなんですよね。Atomic Design を採用する際、ある程度の画面のデザインが固まっている段階から組み込んでいくことをしたほうが良いのかもしれないなと思いました。

グローバルな状態管理のライブラリ(Redux とか)が入ってくると、また話が変わってくるのかもしれないですね。

## Atomic Design 良い気もする

Atomic Design 難しいとは書いてきましたが、個人的には良いと思っています。

汎用性を意識しなくなったら崩壊するとかあるのかもしれませんが、Way に則る分、常に汎用性を意識して開発することが出来るなと感じました。

たしかに大変だと思いますが、jQuery から React になったからといって全てが最適なわけではなく意識する点は多くなります。テスタビリティをどのようにしてあげるのかという支店も必要ですし、無駄なレンダリングが走らないようにすることも大事です。大変でも Atomic Design はこれらを意識しやすくするのではないかと思ってます。

使い始めたばかりなのでこういう場合を考慮できてないとかあるかもしれませんが、Twitter とかで教えてもらえると喜びます。

## 最後に

Next.js 使って自分の Podcast アプリ作ってるのに特段話す内容が泣いてるので話し相手募集してます...
