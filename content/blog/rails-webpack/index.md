---
title: Rails6 に Webpack を導入する
date: "2020-06-13"
description: Rails6 から Webpacker を外して Webpack を導入する方法についてまとめました。後編では Webpack に React, TypeScript, SCSS Modules の設定方法について解説します。
tags: ["Rails", "Rails6", "Webpack"]
relativePath: rails-webpack.png
---

この記事では、Rails6 から Webpacker を外して Webpack を導入するまでを解説します。
次回の記事で Webpack に React, TypeScript の環境構築について説明します。

## Rails6 のセットアップ

Rails のセットアップをする上での詳しい方法はここでは説明しません。
セットアップ方法に関しては https://railsguides.jp/getting_started.html を参照してください。

`mysql` 派なので `--database=mysql` としていますが、つけなくても構いません。SQLite になります。

```shell
$ rails new app-name --database=mysql
$ rails db:create
```

検証した Rails, Ruby のバージョンは、

- Rails: 6.0.3.1
- Ruby: 2.6.6

としました。
2020/06/13 時点での Ruby の最新バージョンは 2.7.1 なのでアップデートしても良さそうです。
個人的には、Ruby3 系で予定されている仕様変更に関する文法を使用しているために WARNING が出て、対応していないライブラリがあると面倒だなと思い渋っていますがご了承ください。

## Webpacker を外して Webppack の環境構築

Gemfile から webpacker に関する行を削除します。

```ruby
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'
```

その後 `bundle install` すれば OK です。
webpacker を外しましたが、Webpack の環境構築をしなければなりません。

大まかな流れは以下のようになります。

- webpack.config.js の作成
- webpack-manifest-plugin の設定の追加
- Rails でバンドル後の .js ファイルを読み込むためのヘルパーの作成
- webpack-dev-server の設定

ルートに `frontend` ディレクトリを作成して、その中で設定していきます。

### webpack.config.js の作成

必要なライブラリをインストールします。

※ `frontend` ディレクトリに移動してからです。

```shell
$ yarn add -D webpack webpack-cli
```

frontend ディレクトリ内にエントリポイントとなる `entries` ディレクトリを作成し、適当に `application.js` を作成します。

そして、 webpack-config.js を作成します。
最小限の設定をいかに示します。

```js
const glob = require("glob")
const path = require("path")

let entries = {}
glob.sync("./entries/*.js").map(file => {
  let name = file.split("/")[2].split(".")[0]
  entries[name] = file
})

module.exports = {
  mode: "development",
  entry: entries,
  output: {
    filename: "javascripts/[name]-[hash].js",
    path: path.resolve(__dirname, "../public/assets"),
  },
}
```

webpack.config.js の設定した上で以下のコマンド(package.json 内にスクリプトを追加すると良いです)

```shell
$ webpack --config webpack.config.js
```

を実行することで `public/assets/javascripts` ディレクトリ以下にバンドルされたファイルが生成されます。
Rails 側から、バンドル後のファイルを取得しに行くように設定してあげることで Webpack の設定は完了します。

しかし、このままではバンドル後のファイル名に `[name]-[hash].js` とハッシュ化された文字列が含まれているため Rails 側はファイル名が分かりません。

### webpack-manifest-plugin の設定の追加

ここで `manifest.json` が必要となります。
詳しい説明は https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/manifest.json に記載しています。
ただ、ここでは `application.js` を Rails 側から取得するときにパスの解決をする役割を持つものだと理解してください。

manifest.json を生成するために `webpack-manifest-plugin` の設定をします。

```shell
$ yarn add -D webpack-manifest-plugin
```

webpack.config.js の設定に追記

```js
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  ...,
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: "/assets/",
      writeToFileEmit: true,
    }),
  ],
  ...,
}
```

これでひとまず、 webpack.config.js の設定は完了しました。
次は、バンドル後の .js ファイルを Rails から読み込むためのヘルパーを作成します。

manifest.json は

```json
{
  "application.js": "/assets/javascripts/application-83582db1f2c95fb2e1d8.js"
}
```

のようになっていれば無事に manifest.json は作成されています。

### webpack_bundle_helper の作成

ビューでバンドル後の .js ファイルを .erb ファイル内で以下のように指定して取得できるようにします。

```erb
<%= javascript_bundle_tag 'application' %>
```

取得するための `app/helpers/webpack_bundle_helper.rb` を作成します

```ruby
module WebpackBundleHelper
  class BundleNotFound < StandardError; end

  def javascript_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.js")

    options = {
      src: path,
      defer: true,
    }.merge(options)

    options.delete(:defer) if options[:async]

    javascript_include_tag "", **options
  end

  private

  MANIFEST_PATH = Rails.root.join('public', 'assets', 'manifest.json')

  def manifest
    @manifest ||= JSON.parse(File.read(MANIFEST_PATH))
  end

  def asset_bundle_path(entry, **options)
    raise BundleNotFound, "Could not find bundle with name #{entry}" unless manifest.key? entry
    asset_path(manifest.fetch(entry), **options)
  end
end
```

これでヘルパーの作成は完了です。
webpack 実行後、Rails サーバーを起動して application.js 内のコードが実行されていれば成功です。

ここまでで、Webpack が使えるようになりました。
--watch や --inline オプションをつけて起動すれば `application.js` の変更を検知してホットリロードが有効になります。

しかし、このままでは更新のたび `public/assets/javascripts` 以下にバンドルされた .js ファイルが生成されます。
.gitignore されてるとはいえ、手作業で削除するのは面倒です。
そのため、次は webpack-dev-server の設定を行います。

### webpack-dev-server の設定

webpack-dev-server をインストールします。

```shell
$ yarn add -D webpack-dev-server
```

webpack.config.js に設定を追記します。

```js
module.exports = {
  ...,
  devServer: {
    host: 'localhost',
    port: 3035,
    publicPath: 'http://localhost:3035/assets/',
    contentBase: path.resolve(__dirname, '../public/assets'),
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  ...,
}
```

webpack-dev-server コマンドを実行して立ち上げると ポートが 3035 番で起動します。
しかし、Rails サーバのポート番号はデフォルトで 3000 番なのでプロ棋士の設定をする必要があります。

`lib/tasks/assets_path_proxy.rb` の設定を追加します。
rack-proxy の Gem が必要なので Gemfile に `gem 'rack-proxy'` を追記して `budnle install` を実行します。

```ruby
require "rack/proxy"

class AssetsPathProxy < Rack::Proxy
  def perform_request(env)
    if env["PATH_INFO"].include?("/javascripts/")
      if Rails.env != "production"
        dev_server = env["HTTP_HOST"].gsub(":3000", ":3035")
        env["HTTP_HOST"] = dev_server
        env["HTTP_X_FORWARDED_HOST"] = dev_server
        env["HTTP_X_FORWARDED_SERVER"] = dev_server
      end
      env["PATH_INFO"] = "/assets/javascripts/" + env["PATH_INFO"].split("/").last
      super
    else
      @app.call(env)
    end
  end
end
```

その上で AssetsPathProxy を有効化するため `config/environments/development.rb` に追記します。

```ruby
require_relative '../../lib/tasks/assets_path_proxy'

Rails.application.configure do
  ...

  config.middleware.use AssetsPathProxy, ssl_verify_none: true
end
```

これにて Webpack の設定は完了です。
次回は Rails6 + Webpack の環境に React, TypeScript, SCSS Modules を設定する方法について書きます。

文章少なめでコマンドやコードばかりになってしまい申し訳ありません。
