# React Facebook Login
> [react-facebook-login](https://github.com/keppelen/react-facebook-login) 은 `Facebook Java Script SDK` 를 통해 `페이스북으로 로그인하기` 등의 기능을 쉽게 구현할 수 있도록 도와주는 컴퍼넌트 라이브러리다.

__크로스 브라우징 이슈__
- 이 컴퍼넌트를 통해 로그인 기능을 구현했는데, Internet Explorer 에서는 제대로 동작하지 않았다.
- 디버깅 결과, `Object.assign` 메소드와 `String.prototype.includes` 메소드 때문이었다.

__해결 방법__
- `Object.assign` 메소드의 폴리필, `String.prototype.includes` 메소드의 폴리필을 추가하거나,
- `import 'babel-polyfill'`을 추가한다.
