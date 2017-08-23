# Web Assembly (Emscripten) and React JS
## Install
### Emscripten
- C/C++ 코드를 `LLVM`의 바이트 코드 및 `asm.js` 레벨로 변환해준다.

__Prerequisite__
- 먼저 `cmake`, `python`, `node.js`, `python 2.x` 등이 설치되어 있어야 한다.
  - `python 3.x`를 사용중이라면, `pyenv` 등으로 `python 2.x`를 사용하도록 한다.
- Download `[emscripten portable](https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz)`

```
# 다운로드 받은 파일을 압축 해제하고, 해당 파일들이 있는 곳으로 이동한다.
$ mkdir ~/.web-assembly && mv ~/.web-assembly
$ tar -xf ~/Downloads/emsdk-portable.tar.gz
$ cd emsdk-portable

# emscripten 설치
$ ./emsdk update
$ ./emsdk install latest
$ ./emsdk activate latest
$ source ./emsdk_env.sh

# /etc/paths 수정 (emscripten 추가)
$ sudo vi /etc/paths
# add line (in my case, path is like below thing)
# ${HOME}/.web-assembly/emsdk-portable/emscripten/1.37.19

# bash_profile 설정 (emscripten 경로 추가)
$ vi ~/.bash_profile
# add line (in my case, path is like below thing)
# export PATH=${PATH}:$HOME/.web-assembly/emsdk-portable/emscripten/1.37.19
$ source ~/.bash_profile
```

### Server
```
$ npm i -S express fs
```

### React
```
$ npm i -S react react-dom
$ npm i -D webpack babel-core babel-loader babel-preset-es2015 babel-preset-react
```

## Write C Code
```
$ mkdir -p wasm public/wasm
$ touch wasm/main.c
```
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <emxcripten/emscripten.h>

int main(int argc, char** argv) {
  // console.log로 변환됨
  printf("Web Assembly loaded\n");
}

// Emscripten은 컴파일하는 동안 데드 코드를 제거하는데,
// 이 데코레이터는 코드가 제거되지 않도록 한다.
EMSCRIPTEN_KEEPALIVE
int generateRandom() {
  srand(time(NULL));
  return rand();
}
```

## Compile C Code
```
$ emcc wasm/main.c -s WASM=1 -o public/wasm/main.js -O3
# -s는 emscripten 컴파일러에 전달되는 설정을 지정한다.
# default는 asm이며, 여기서는 wasm로 컴파일한다.
# -o는 파일명을 지정할 수 있다.
# -O3은 Optimization 3라는 뜻으로 최적화 수준을 뜻한다.
```

## Configure Server
```
$ touch server.js
```
```js
const server = require('http').createServer();
const path = require('path');
const url = require('url');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3030;

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/:filename.wasm', (req, res) => {
  const wasmFilePath = path.resolve(__dirname,
`public/wasm/${req.params.filename}.wasm`);
  console.log(`wasm request ${wasmFilePath}`);

  fs.readFile(wasmFilePath, (err, data) => {
    const errMessage = `Error: ${wasmFilePath} does not found.
${JSON.stringify(err)}`;

    if (err) {
      console.log(errMessage);
      return res.status(404).send(errMessage);
    }

    return res.send(data);
  });
});

server.on('request', app);
server.listen(PORT, function () {
  console.log(`Listening on ${server.address().port}`);
});
```
```
$ touch public/index.html
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Web Asssembly Test</title>
</head>
<body>
  <main id="wasm-app"></main>
  <script type="text/javascript" src="/wasm/main.js"></script>
  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
```

## Create React App
```
$ mkdir src
$ touch src/index.jsx
```
```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { randomNumber: -1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const randomNumber = _generateRandom();
    this.setState({ randomNumber });
  }

  render() {
    return (
      <div>
        <input value={this.state.randomNumber} />
        <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

const root = document.getElementById('wasm-app');

render(<App />, root);
```
- 현재는 `C`에서 만든 함수 이름에 `_`를 붙임으로써 `C`의 함수를 호출한다. 이것이 가능한 이유는 컴파일된 함수들이 전역으로 노출되기 때문이다. 이 전역 함수들은 모두 `main.js`에 있다.
- 현재 웹팩에서 웹 어셈블리 함수를 직접 호출할 수 있도록 하는 프로젝트가 진행중이다.

```
$ touch .babelrc
```
```js
{
  "presets": ["es2015", "react"]
}
```
```
$ touch webpack.config.js
```
```js
const webpack = require('webpack');
const path = require('path');
const config = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    "React": "react",
    "ReactDOM": "react-dom",
  },
};

module.exports = config;
```

## Reference
- [MDN Emscripten](https://developer.mozilla.org/ko/docs/Mozilla/Projects/Emscripten)
- [Emscripten Docs](http://kripken.github.io/emscripten-site/index.html)
