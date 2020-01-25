---
title: Blocklyが公式にnpmを公開した
date: "2019-10-18"
description: ES2015に対応したBlocklyのnpmパッケージがGoogleから公式に公開されました。React, Vueなどのライブラリを用いた開発が可能に、またTypeScriptの型定義ファイルが追加されました。
tags: ["Blockly"]
relativePath: npm-blockly.png
---

## Blockly公式のnpmパッケージ

日本ではお盆休みだった2019年の8月14日、ES2015に対応したBlocklyのnpmパッケージがGoogleから公式に公開されました。

これに伴い、以下のコマンドでパッケージの追加が可能になりました。

```sh
$ npm install blockly
```

importして使用する際は、

```javascript
import * as Blockly from 'blockly';
```

とすることでブロック定義ファイル、翻訳ファイルも一括で読み込めます。

```javascript
// coreのモジュールのimport
import * as Blockly from 'blockly/core';

// カスタムブロックに対応するcodeを定義する際に使用
import 'blockly/javascript'

Blockly.JavaScript['hoge'] = (block) => {
  return 'console.log(\'custom block\');\n';
};
```

以上のように記述することで、個々のモジュールを読み込むことも可能です。


## 今までの開発と変わる点

これまではBlocklyが公式に公開していなかったため、[`node-blockly`](https://github.com/mo4islona/node-blockly)というパッケージを利用していました。

`node-blockly`は、Blocklyのリポジトリをサブモジュールとして追加されており、Gulpのビルド処理によってBlocklyをES2015以降のJS開発での利用を可能にしています。

公式のパッケージが公開されたことで、今までの`node-blockly`を用いたBlocklyアプリケーション開発と変わる点は少ないのですが、

- Blocklyのrelease後に`node-blockly`の更新を待たなければならない
- あくまで`node-blockly`は公式で公開されているものではない

ので、信頼できるソースになったかな...

## Blocklyを使った開発をしたい方への朗報

[blocly-samples](https://github.com/google/blockly-samples)というリポジトリが公開されました。

ReactやVue, Angular, Node.js等での開発の始め方の指針となるため、Blockly開発を始めてみたい方は参考にしてください。


## TypeScriptに対応

npmのパッケージ公開の際、同時にTypeScript(以下、TS)にも対応しました。

[DefinitlyTyped](https://definitelytyped.org/)内に`@types/blockly`の形式で公開されているわけではないのですが、[Blocklyの型定義ファイル](https://github.com/google/blockly/tree/master/typings)がリポジトリ内に入ってます。

TSに対応しましたが、まだブロックをJavaScriptやPythonに変換するモジュールの型定義はされていないので型定義ファイルの作成に協力するか、作られるのを待つ形になります。

まだ、みんなのコードのプロダクト[プログル](https://proguru.jp)ではTSを用いていないのですが
BlocklyがTSに部分対応したということで、次のプロダクトではTSを用いる方向で検討しています。