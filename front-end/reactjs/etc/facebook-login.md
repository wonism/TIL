# React Facebook Login
- [react-facebook-login](https://github.com/keppelen/react-facebook-login) 은 `Facebook Java Script SDK` 를 통해 `페이스북으로 로그인하기` 등의 기능을 쉽게 구현할 수 있도록 도와주는 컴퍼넌트 라이브러리다.

## 목차
- [설치 및 적용](#설치 및 적용)
- [크로스 브라우징 이슈](#크로스 브라우징 이슈)

## 설치 및 적용
```sh
$ npm i react-facebook-login
# 또는
$ yarn add react-facebook-login
```
- `yarn` 은 패키지매니저로 `npm` 보다 훨씬 속도가 빠르다. ([yarn](https://github.com/yarnpkg/yarn))
```js
/* ... */
import FacebookLogin from 'react-facebook-login';

class ParentComponent extends Component {
  constructor(props) {
    super(props);

    this.responseFacebook = (res) => {
      /**
       * Do something...
       */
    };
  }
  /* ... */
  render() {
    /* ... */
      <FacebookLogin
        appId={ 'facebook-key' }
        fields="name,email,picture"
        scope="public_profile,user_friends,email"
        callback={ this.responseFacebook }
        cssClass="facebook-login rm-style-button"
        icon="fa-facebook-official"
        textButton="Facebook으로 로그인"
      />
    /* ... */
  }
}
```
- Facebook 개발자 페이지에서 발급받은 App Key 를 `appId` 에 할당하고, 기타 값들을 할당한다. icon 으로 하여금 `font-awesome` 의 아이콘을 사용할 수 있으며, class 명도 지정해줄 수 있다.
- `callback` 은 로그인 버튼을 클릭하면 일련의 과정을 거친 뒤, Facebook 로그인 이후에 대한 콜백으로 `responseFacebook` 이란 메소드를 실행한다.

[목차로 가기](#목차)

## 크로스 브라우징 이슈
- 이 컴퍼넌트를 통해 로그인 기능을 구현했는데, Internet Explorer 에서는 제대로 동작하지 않았다.
- 디버깅 결과, `Object.assign` 메소드와 `String.prototype.includes` 메소드 때문이었다.

__해결 방법__
- `Object.assign` 메소드의 polyfill 을 추가했다.
- `String.prototype.includes` 는 `String.prototype.match(/regexp/)` 메소드로 변경했다.

[목차로 가기](#목차)

