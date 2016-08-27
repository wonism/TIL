# Webpack 사용하기
<p>Java Script 모듈화 시스템을 위한 방법으로 [Common JS](http://www.commonjs.org/) 를 사용하거나, [Require JS](http://requirejs.org/) 의 바탕이 되는 [AMD](https://github.com/amdjs/amdjs-api) 를 이용하는 방법이 있었다.</p>
<p>[Webpack](https://webpack.github.io/docs/) 은 두 그룹의 명세를 모두 지원하는 Java Script 모듈화 도구로 로더를 추가할 수도 있고, 컴파일 속도도 빠르다는 장점이 있다.</p>

## 기본 사용 방법
__webpack 설치__
<p>먼저 프로젝트 디렉토리에서 npm 초기화를 한 뒤, webpack 을 전역 및 프로젝트 내에 설치한다.</p>

```sh
$ npm init
$ npm install -g webpack && npm install --save-dev webpack
```

<p>webpack 을 설치한 뒤, 다음과 같이 명령어를 실행하여 모듈을 컴파일할 수 있다.</p>

```sh
webpack { 엔트리 파일 경로 } { 번들 파일 경로 }
```

<p>엔트리 파일은 웹팩이 가장 먼저 읽을 파일이며, 번들 파일은 엔트리 파일을 시작으로 의존 관계에 있는 모듈들을 하나의 파일로 만든 결과물로 브라우저에서 사용할 수 있다.<br />(엔트리 파일이 여러 개일 때에는 엔트리 파일마다 번들 파일이 생성된다.)</p>

__webpack 기본 설정__
<p>webpack.config.js 를 작성한다.</p>

```sh
$ touch webpack.config.js
```

```js
module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
```

<p>이 설정파일을 통해 알 수 있는 내용은 다음과 같다.</p>
<ul><li>모듈화 하고자 하는 파일들은 src 디렉토리에 있다.</li>
<li>가장 먼저 읽을 파일은 context 경로를 기준으로 './index.js' 이다.<ul><li>index.js 에 import 된 다른 스크립트를 불러오게 된다.</li></ul></li>
<li>합쳐진 파일은 dist 디렉토리에 bundle.js 라는 이름으로 생성된다.</li></ul>

<p>제대로 설정된 것인지 확인하기 위해, index.js 와 example.js 를 생성한 뒤, 컴파일한다.</p>

```sh
$ mkdir src && touch index.js example.js
```

```js
/***** index.js *****/
var example = require('./example');

console.log(example);
```

```js
/***** example.js *****/
module.exports = 'example';
```

```sh
$ webpack
Hash: e0165a196b7083b78619
Version: webpack 1.13.1
Time: 114ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.55 kB       0  [emitted]  main
   [0] ./index.js 60 bytes {0} [built]
   [1] ./example.js 28 bytes {0} [built]
```

<p>dist 디렉토리에 bundle.js 파일이 생긴 것을 확인할 수 있다.</p>
<p>이 떄, 단순히 명령어 webpack 만 입력하였는데, webpack --watch 로 watch 옵션을 사용하면, 파일의 변화를 감지하여, 파일이 수정될 때마다 컴파일을 수행한다.</p>

```sh
$ webpack --watch
# 또는
$ webpack -w
```

## 여러개의 entry 파일로 번들 파일 생성하기
<p>엔트리 파일 a.js 와 b.js 를 작성한다.</p>

```sh
$ touch src/a.js src/b.js
```

```js
/***** a.js *****/
var a = 'a : ' + require('./example');

console.log(a);
```

```js
/***** b.js *****/
var b = 'b : ' + require('./example');

console.log(b);
```

<p>webpack.config.js 를 다음과 같이 수정한다.</p>

```js
module.exports = {
  context: __dirname + '/src',
  entry: {
    apple: './a.js',
    bear: './b.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  }
};
```

<p>webpack 명령어를 실행한다.</p>

```sh
$ webpack
Hash: 70f078a8e3feaf2270f5
Version: webpack 1.13.1
Time: 130ms
          Asset     Size  Chunks             Chunk Names
apple.bundle.js  1.55 kB       0  [emitted]  apple
 bear.bundle.js  1.55 kB       1  [emitted]  bear
   [0] ./a.js 55 bytes {0} [built]
   [0] ./b.js 55 bytes {1} [built]
   [1] ./example.js 28 bytes {0} {1} [built]
```

<p>dist 디렉토리에 apple.bundle.js 와 bear.bundle.js 파일이 생성된 것을 볼 수 있다.</p>

## 로더 추가하기
<p>webpack 의 로더는 babel-loader 등의 로더를 통해 다양한 리소스를 불러올 수 있다.</p>
<p>전역으로 babel-cli 와 프로젝트 내에 babel loader 및 프리셋들을 설치한다.</p>

```sh
$ npm install --save-dev babel-core babel-loader babel-preset-es2015
$ npm install -g babel-cli
```

<p>\.babelrc 파일을 작성하고, loader 를 이용하기 위해 webpack.config.js 를 수정한다.</p>

```sh
$ touch .babelrc
```

```
{
  "sourceMaps": "inline",
  "presets": ["es2015"]
}
```

<p>sourceMaps 속성의 값을 inline 이나 both 로 설정함으로써, 번들 파일에 소스맵을 추가할 수 있다.</p>

```js
module.exports = {
  context: __dirname + '/src',
  entry: {
    apple: './a.js',
    bear: './b.js'
  },
  module: {
    loaders: [{
      test: /a\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader']
    },
    {
      test: /b\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
```

<p>설정파일의 module 값에 대한 설명은 다음과 같다.</p>
<ul><li>loaders : 값으로 배열을 받으며, 어떤 파일에 어떤 로더를 적용할지 등을 설정할 수 있다.</li>
<li>test : 정규표현식 값이 오게 되며, 적용할 파일의 패턴을 넣으면 된다.</li>
<li>exclude : exclude 값으로 적힌 정규식에 해당되는 파일들은 로더의 영향을 받지 않는다.</li>
<li>loader : loaders 배열 안에 loaders 대신 loader 를 사용하게 되면, 배열 대신 string 값을 받게 된다.</li></ul>
<p>a.js 와 b.js 를 ES6 문법으로 작성한 뒤, webpack 으로 컴파일 한다.</p>

```js
/***** a.js *****/
const a = [...Set(1, 1, 2, 'a', 'a')];
```

```js
/***** b.js *****/
const b = () => 'B';
```

```sh
$ webpack
Hash: 4f37849cf16167440741
Version: webpack 1.13.1
Time: 1272ms
          Asset     Size  Chunks             Chunk Names
apple.bundle.js  2.12 kB       0  [emitted]  apple
 bear.bundle.js  1.79 kB       1  [emitted]  bear
    + 2 hidden modules
```

## Lint / Hint 사용하기
<p>이 튜토리얼에서는 JS 코드 검사도구로 jshint 를 사용한다.</p>

```sh
$ npm install --save-dev jshint jshint-loader
```

<p>다음, webpack.config.js 를 수정한다.</p>

```js
module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader', 'jshint-loader']
    }]
  },
  /*
  jshint: {
    emitErrors: false,
    failOnHint: false,
    reporter: function(errors) { console.log(errors); }
  },
  */
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
```


<p>jshint 프로퍼티는 사용하지 않아도 무방하며, jshint 프로퍼티가 설정되지 않으면, default 값으로 jshinting 을 하게 된다.</p>
<p>index.js 에 jshint 에 걸릴만한 문법을 사용하여 jshint 가 제대로 동작하는지 확인해보겠다.</p>

```js
let a;
```

<p>index.js 를 위와 같이 수정한 뒤, webpack 명령어나 webpack -w 명령어 등을 실행하면, 경고메시지를 볼 수 있다.</p>

```sh
$ webpack
# 생략 ...
WARNING in ./index.js
jshint results in errors
  'let' is available in ES6 (use 'esversion: 6') or Mozilla JS
extensions (use moz). @ line 1 char 1
    let a;
```

## webpack development server 설정하기
<p>webpack dev server 를 통해, 코드를 수정하고 확인할 때마다 브라우저를 새로고침하는 수고를 덜 수 있다.</p>
<p>먼저, 필요한 모듈들을 설치한 다음, webpack.config.js 파일을 수정한다.</p>

```sh
$ npm install -g webpack-dev-server && npm install --save-dev webpack-dev-server
```

```js
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  devServer: {
    inline: true,
    port: 7777,
    contentBase: __dirname + '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel-loader']
    }]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
};
```

<p>webpack 세팅은 완료되었으며, public 디렉토리 밑에 index.html 파일을 생성하고 다음과 같이 작성한다.</p>

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Webpack Tutorial</title>
</head>
<body>
  <h1>Webpack Tutorial</h1>
  <script src="./bundle.js"></script>
</body>
</html>
```

<p>webpack-dev-server --hot --host 0.0.0.0 명령어를 통해서 dev server 를 열 수 있다.<br />명령어를 작성하기 귀찮다면, npm script 를 수정하도록 한다.</p>

```sh
$ webpack-dev-server --hot --host 0.0.0.0
```

<p>http://localhost:7777/ 에 접속하면, 우리가 작성한 웹 페이지를 볼 수 있다.<br />src 밑에 있는 파일들이 수정될 때마다, webpack 은 이를 감지하고, 페이지를 새로고침하지 않고도 새로 작성된 코드가 브라우저에 반영되는 것을 볼 수 있다.</p>

