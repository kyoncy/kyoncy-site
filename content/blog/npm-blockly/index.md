---
title: Blocklyが公式にnpmを公開した
date: "2019-10-18"
description: ES2015に対応したBlocklyのnpmパッケージがGoogleから公式に公開されました。React, Vueなどのライブラリを用いた開発が可能に、またTypeScriptの型定義ファイルが追加されました。
tags: ["Blockly"]
relativePath: npm-blockly.png
---

## Blockly 公式の npm パッケージ

日本ではお盆休みだった 2019 年の 8 月 14 日、ES2015 に対応した Blockly の npm パッケージが Google から公式に公開されました。

これに伴い、以下のコマンドでパッケージの追加が可能になりました。

```shell
$ npm install blockly
```

import して使用する際は、

```javascript
import * as Blockly from "blockly"
```

とすることでブロック定義ファイル、翻訳ファイルも一括で読み込めます。

```javascript
// coreのモジュールのimport
import * as Blockly from "blockly/core"

// カスタムブロックに対応するcodeを定義する際に使用
import "blockly/javascript"

Blockly.JavaScript["hoge"] = block => {
  return "console.log('custom block');\n"
}
```

以上のように記述することで、個々のモジュールを読み込むことも可能です。

## 今までの開発と変わる点

これまでは Blockly が公式に公開していなかったため、[`node-blockly`](https://github.com/mo4islona/node-blockly)というパッケージを利用していました。

`node-blockly`は、Blockly のリポジトリをサブモジュールとして追加されており、Gulp のビルド処理によって Blockly を ES2015 以降の JS 開発での利用を可能にしています。

公式のパッケージが公開されたことで、今までの`node-blockly`を用いた Blockly アプリケーション開発と変わる点は少ないのですが、

- Blockly の release 後に`node-blockly`の更新を待たなければならない
- あくまで`node-blockly`は公式で公開されているものではない

ので、信頼できるソースになったかな...

## Blockly を使った開発をしたい方への朗報

[blocly-samples](https://github.com/google/blockly-samples)というリポジトリが公開されました。

React や Vue, Angular, Node.js 等での開発の始め方の指針となるため、Blockly 開発を始めてみたい方は参考にしてください。

## TypeScript に対応

npm のパッケージ公開の際、同時に TypeScript(以下、TS)にも対応しました。

[DefinitlyTyped](https://definitelytyped.org/)内に`@types/blockly`の形式で公開されているわけではないのですが、[Blockly の型定義ファイル](https://github.com/google/blockly/tree/master/typings)がリポジトリ内に入ってます。

TS に対応しましたが、まだブロックを JavaScript や Python に変換するモジュールの型定義はされていないので型定義ファイルの作成に協力するか、作られるのを待つ形になります。

まだ、みんなのコードのプロダクト[プログル](https://proguru.jp)では TS を用いていないのですが
Blockly が TS に部分対応したということで、次のプロダクトでは TS を用いる方向で検討しています。
