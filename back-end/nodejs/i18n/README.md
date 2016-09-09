# i18n 모듈을 이용한 국제화 작업
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

__i18n 이란?__
- Internationalization. i 와 n 사이에 18 글자의 단어가 있어서 i18n 이라고 불리우며, 다국어 시스템을 구현하는 환경을 구성하는 것이다.
- Front-end 측에서 국제화 작업을 위한 라이브러리로는 [i18next](http://i18next.com/) 등이 있다.
- 비슷한 용어로 T9n, L10n 등이 있다.

## 개발환경
- OX X 10.11
- Node JS 6.3.0
  - Framework : Express 4.13.1
    - Template Engine : EJS 2.3.3
  - Language Syntax : ES5

## 모듈 설치
```sh
$ npm i -S i18n
```

## 구현하기
__설정__
```js
// modules
/* ... */
// i18n 모듈을 불러온다.
var i18n = require('i18n');

var app = express();

// routes 를 설정하기 전에 i18n.init 으로 초기화 작업을 해준다.
i18n.configure({
  locales: ['ko', 'en'],
  fallbacks: { nl: 'ko' },
  defaultLocale: 'ko',
  cookie: 'locale',
  autoReload: true,
  updateFiles: false, // 잘못된 JSON property 를 사용할 경우, 자동으로 파일을 업데이트 하는데, 개인적으론 불편해서 false 로 설정하여 사용한다.
  queryParameter: 'lang', // query string 으로 lang 이 오면, 해당 값의 언어를 불러온다.
  objectNotation: true, // 중첩된 property 의 값을 가져오기 위해 true 로 설정한다.
  register: global,
  directory: __dirname + '/locales' // app.js 위치를 기준으로 locales 디렉토리에 json 파일을 만든다.
});

app.use(i18n.init);
```

__언어 파일 생성 및 작성__
```sh
$ mkdir locales && touch locales/ko.json locales/en.json
```

__ko.json__
```js
{
  "helloWorld": "안녕, 세상!",
  "nested": {
    "inner": "중첩 프로퍼티"
  }
}
```

__en.json__
```js
{
  "helloWorld": "Hello, World!",
  "nested": {
    "inner": "Nested property"
  }
}
```

__ejs 에서 호출하기__
```ejs
<%= __n('helloWorld') %>
<%= __n('nested.inner') %>
```
- 브라우저를 확인하면, 한국어 또는 영어로 된 문장을 볼 수 있다.

