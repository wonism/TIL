# React JS
<p align="center">
  <a href="https://facebook.github.io/react/index.html">
    <img width="282" height="250" src="https://github.com/wonism/TIL/blob/master/front-end/reactjs/img/reactjs.png">
  </a>
</p>
- [VELOPERT](https://velopert.com/)님의 블로그를 보면서 공부+정리한 repository 입니다.
  - 이외에도 [React JS DOCS](https://facebook.github.io/react/docs/getting-started.html), [Flux DOCS](http://facebook.github.io/flux/docs/overview.html#content), [Redux DOCS](http://redux.js.org/) 등을 참고하였습니다.
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

## 개발 환경
__운영체제__
- OS X 10.11

__디버깅 툴__
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)(Chrome extension)

## NPM Package 설치
__global module__
- babel &minus; Trans Compiler 로 ES6 을 지원하지 않는 환경에서 ES6 문법을 사용할 수 있도록 코드를 변환해준다.
- webpack &minus; 모듈 번들러로 Browerify 처럼 브라우저 환경에서 import (require) 할 수 있게 해준다.
- webpack&minus;dev&minus;server &minus; 별도의 서버를 구축하지 않고도 웹서버를 열 수 있게 해준다. hot&minus;loader 를 통해 코드가 수정될때마다 새로고침 하지 않아도 자동으로 reload 할 수 있다.
  - 글로벌 모듈로 webpack 과 webpack&minus;dev&minus;server 를 설치하면 CLI 에서 webpack&minus;dev&minus;server 를 바로 실행할 수 있기 때문이다.
  - 로컬 모듈로만 설치하면, ./node_modules/bin/webpack-dev-server &minus;hot 과 같이 실행할 수 있다.
```sh
$ npm install -g babel webpack webpack-dev-server
```
- 바벨에서 사용할 플러그인을 설치한다.
  - webpack 과 webpack&minus;dev&minus;server 를 지역 모듈로 설치한 이유는 -hot 옵션을 사용하기 위해서이다.
```sh
$ npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 webpack webpack-dev-server
```

## Examples
- [간단한 React JS App 만들기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/01.simple-react-app.md)
- [Component 모듈화 하기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/02.component.md)
- [props 와 state](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/03.props-state.md)
- [컴퍼넌트의 iteration](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/04.component-iteration.md)
- [컴퍼넌트 생명주기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/05.component-lifecycle.md)
- [router](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/07.router.md)


## 기타
- [this.props.children](https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/children.md)

## Project 및 설정파일 살펴보기
- 프로젝트의 대략적인 hierarchy 를 살펴보면 다음과 같다.
```sh
# tree 명령어가 작동하지 않는다면,
$ brew install tree

$ tree -I 'node_modules|README.md'
├── package.json
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── App.js
│   └── index.js
└── webpack.config.js
```
- package.json
  - 패키지 이름이나 의존성 등이 정의되어있는 파일이다.
- webpack.config.js
  - webpack 의 설정 파일이다.
  - webpack 은 entry 로부터 시작하여, 필요한 모듈을 다 불러오고, 작성한 코드를 한 파일로 합쳐 output.filename(bundle.js) 를 생성한다.
```js
/***** webpack.config.js *****/
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 7777,
    contentBase: __dirname + '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
```
- 각 라인이 의미하는 바는 아래와 같다.
  - entry : 시작 파일을 의미한다.
  - devServer : 개발 서버를 열어주기 위한 설정을 정의한다.
    - port : 사용할 포트를 지정한다.
    - 개발 서버는 파일이 변경될 때마다 컴파일을 하고, 연결된 브라우저를 reload 해준다.
  - module : 파일에 영향을 주는 옵션들이다. 여기에서는 react component 에 사용된 JSX 를 어떤 transform compiler 를 통해 컴파일할지 설정한다.
    - loaders : application 에서 사용할 다양한 리소스를 Java Script 에서 사용할 수 있는 형태로 로딩한다.
    - test : 정규식을 통해 로더에 사용될 파일을 검출한다.
    - loader : 일치하는 파일에 사용되는 로더를 호출한다.
  - output : webpack 의 최종 결과물에 대한 설정이다.
    - path : 번들 파일을 어디에 생성할 것인지 정한다.
    - filename : 번들 파일의 이름을 지정한다.
- 다음으로 npm start 명령을 통해 webpack 개발 서버가 실행되도록 package.json 을 수정한다.
```js
/***** package.json *****/
...
  "scripts": {
    "start": "webpack-dev-server --hot --host localhost",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

