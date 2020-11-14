---
title: コードブロックのCSSを変えたのでコードを書く
date: "2019-08-09"
description: 全体的にgatsby-starter-blogのCSSデザインが気に食わなかった(なぜ自分は最初にこれを選んだんだろうと思っている)のでワシャっとCSS周りをいじった。特にコードブロック。
tags: ["GatsbyJS", "CSS"]
relativePath: customize-code-block.png
---

- JSX はこうなる
  - 悪くないと思ってるが、人によっては見にくいかも

```jsx
import React, { Component } from "react"

class App extends Component {
  render() {
    return <h1>Hello world</h1>
  }
}

export default App
```

- ちなみに上のコードが JS だと以下
  - そりゃそうだよな

```js
import React, { Component } from "react"

class App extends Component {
  render() {
    return <h1>Hello world</h1>
  }
}

export default App
```

- 好きだから Python

```python
print('Hello, World!')
```

めちゃめちゃ少ないけど、書き足したくなったら追記していく
