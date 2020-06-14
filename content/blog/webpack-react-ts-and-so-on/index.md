---
title: Rails6 に導入した Webpack で React, TypeScript, SCSS Modules 等の設定をする
date: "2020-06-14"
description: 前回の記事で Rails6 から Webpacker を外して Webpack を導入する方法についてまとめました。ここでは Webpack に React, TypeScript, SCSS Modules, 画像の読み込みの設定について解説します。
tags: ["Rails", "Rails6", "Webpack", "React", "TypeScript", "CSS Modules"]
relativePath: webpack-react-ts-and-so-on.png
---

前回の記事では Rails6 から Webpacker を外して Webpack を導入する方法を説明しました。

今回は React, TypeScript, SCSS Modules 等の設定について説明していきます。
xx-loader や config ファイルをどう設定するかについて示していきます。

ESLint や stylelint についても触れたいのですが、 webpack と関係ないので気が向けば書きます。

## TypeScript, React の設定
必要なパッケージのインストール

```shell
// typescript
$ yarn add -D typescript ts-loader

// react
$ yarn add react react-dom
$ yarn add -D @types/react @types/react-dom
```

tsconfig.json の設定

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "typeRoots": ["types", "node_modules/@types"],
    "target": "es5",
    "module": "es2015",
    "jsx": "react",
    "moduleResolution": "node",
    "lib": ["es2019", "dom"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

webpack.config.js の設定

```js
module.exports = {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader"
      },
      ...,
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  ...,
}
```

これにて、tsx ファイルを扱えるようになり、Reactアプリケーション作成の一歩を踏み出しました。
しかし、このままでは CSS や画像を扱えない状態です。


## SCSS Modules の設定
styled-components vs CSS Modules といった議論はあるのですが、個人的にスタイルファイルは別で置いておきたいので CSS Modules が好きです。

まずはライブラリのインストールから

```shell
$ yarn add -D sass-loader css-loader style-loader
```

webpack.config.js に style-loader, css-loader, sass-loader の設定を追加します。
.scss ファイルに対して、sass-loader から順に css-loader, style-loader が実行されます。

```js
module.exports = {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      ...,
    ],
  },
  ...,
}
```

これで SCSS Modules の設定が完了しました。
`typed-scss-modules` は CLIツールなのですが、これを使えば .scss ファイルから型を生成してくれるので便利です。


## 画像を読み込むための file-loader の設定
最後に画像を表示するために file-loader の設定をしていきます。
file-loader をいんすとーるします。

```shell
$ yarn add -D file-loader
```

webpack.config.js に file-loader の設定を追加します。

```js
module.exports = {
  ...,
  module: {
    rules: [
      ...,
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              publicPath: function (path) {
                return "images/" + path;
              },
              name: "[name]-[hash].[ext]",
            },
          },
        ],
      },
      ...,
    ],
  },
  ...,
}
```

しかし、このままでは画像が読み込まれないので前回の記事で作成した assets_proxy_path.rb を編集します。

```ruby
require "rack/proxy"

class AssetsPathProxy < Rack::Proxy
  def perform_request(env)
    if env["PATH_INFO"].include?("/javascripts/")
      set_env_for_path_info(env, "javascripts")
      super
    elsif env["PATH_INFO"].include?("/images/")
      set_env_for_path_info(env, "images")
      super
    else
      @app.call(env)
    end
  end

  private

  def set_env_for_path_info(env, asset_type)
    if Rails.env != "production"
      dev_server = env["HTTP_HOST"].gsub(":3000", ":3035")
      env["HTTP_HOST"] = dev_server
      env["HTTP_X_FORWARDED_HOST"] = dev_server
      env["HTTP_X_FORWARDED_SERVER"] = dev_server
    end
    env["PATH_INFO"] = "/assets/#{asset_type}/" + env["PATH_INFO"].split("/").last
  end
end
```

これで画像も読み込まれるようになります。

## 最後に
ただの備忘録みたいになっちゃいました(ほとんどそれが目的です)

ESLint や Prettier, stylelint などの設定も行い、CIの設定をしたのですが快適な開発環境になりました。

最近は monaco-editor を触ってみてエディタのカスタマイズ方法について調べています。
副業を始めたいけど声掛け待っても...となってきたので探してます。
