# React JS
> React JS 는 UI 컴퍼넌트를 만들기 위한 Facebook 의 라이브러리로 단방향 데이터 흐름을 지원하며, 빠른 렌더링 속도를 자랑합니다.

- React JS, Flux, 기타 라이브러리, 문제 해결 사례 등을 정리했습니다.
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

## 리액트의 탄생 배경
- 상태를 가지는 UI 의 필요성
  - AJAX 가 탄생하게 되면서 상태 및 UI 가 동적으로 바뀔 수 있게 되면서 자바스크립트를 더 많이 사용하게 되었다. 하지만, 관리해야할 데이터가 많아짐에 따라 코드에 대한 복잡도가 증가했는데, 이에 대한 해결방안으로 MVC 패턴이 적용되었다. (Ember, Backbone, Angular 등) 하지만 MVC 프레임워크는 유지보수 및 확장의 어려움, 떨어지는 성능 등의 단점이 있었다. 이에 페이스북은 React JS 를 개발했다.
    - 리액트는 기존의 데이터 바인딩보다 사용하기 쉬우며, 데이터의 변경 발생 시 리액트가 이를 감지하고 UI 를 다시 그린다.
- 순수 자바스크립트를 이용한 컴퍼넌트 개발
  - 이전에는 HTML statement 나 템플릿 (Handlebars, Mustache, Underscore 등) 을 사용했었다. 하지만 이러한 방식은 복잡하거나, 새로 배워야할 것이 생긴다는 단점이 있다.

## 주요 특징
먼저 React JS 의 중요 특징을 살펴보면 다음과 같다.

- 단방향 데이터 흐름
  - 속성은 아래로 전달되고, 동작은 위로 전달된다.
  - 변하지 않는 값들인 `props` 는 렌더 메소드로 JSX 내 프로퍼티로써 전달된다.
  - 컴퍼넌트는 전달된 프로퍼티를 직접 수정할 수는 없지만, 콜백 함수를 전달함으로써 값을 수정할 수 있다.
- 가상 DOM
  - React JS 는 메모리 내 데이터 구조 캐시를 생성하고 변경 사항을 비교한 뒤, 비교 알고리즘을 통해 브라우저의 DOM 을 효율적으로 업데이트한다.
    - 비교 알고리즘은 [링크](https://facebook.github.io/react/docs/reconciliation.html#the-diffing-algorithm)에서 더 자세히 알아볼 수 있다.
    - 비교 알고리즘을 간단히 설명하자면,
    - 여러가지 가정들을 통해 알고리즘의 복잡도를 O(n) 까지 낮추었다. (가장 최신의 트리 비교 알고리즘은 O(n^3) 이다.
    - 비교 범위를 동일 레벨의 노드로 한정한다.
    - 자식 컴퍼넌트를 비교할 땐, `key` 를 통해 비교한다.
  - `shouldComponentUpdate` 메소드를 통해 서브 트리를 선택적으로 렌더링할 수 있다.
    - 해당 메소드 내 CPU 를 많이 점유하는 코드를 지양해야 한다.
- JSX
  - 컴퍼넌트는 일반적으로 JSX 로 작성된다.
    - JSX 는 HTML 태그 구문을 사용하며, HTML 인용 부호를 허용하는 JavaScript 확장 구문이다.
    - JSX 내의 div, span, h1 등은 태그가 아니라 미리 정의된 컴퍼넌트이다.
  - JSX 가 아닌 순수한 Java Script 로 코드를 작성할 수도 있지만 JSX 를 사용함으로써 얻는 이점은 다음과 같다.
    - 컴파일되면서 최적화가 된다.
    - Type-safe 하다.
    - HTML 과 비슷한 형태를 가지므로, 비 엔지니어도 이해하기 쉽다.

## 리액트 학습 자료
__Basic__

<s>
- [간단한 React JS App 만들기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/01.simple-react-app.md)
- [Component 모듈화 하기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/02.component.md)
- [props 와 state](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/03.props-state.md)
- [컴퍼넌트의 반복](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/04.component-iteration.md)
- [컴퍼넌트 생명주기](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/05.component-lifecycle.md)
- [refs](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/06.refs.md)
- [리액트 라우터](https://github.com/wonism/TIL/blob/master/front-end/reactjs/chapter/07.router.md)
</s>

__Flux__
- [Flux Tutorial](https://github.com/wonism/TIL/tree/master/front-end/reactjs/flux-tutorial)

__Redux__
- [Redux Tutorial](https://github.com/wonism/TIL/tree/master/front-end/reactjs/redux-tutorial)

__문제 해결__
- [Issue with react-facebook-login](https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/issue--facebook-login.md)
- [Issue with react-slick](https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/issue--react-slick.md)

__기타__
- [Github Pages 에 SPA 호스팅하기](http://github.com/wonism/wonism.github.io-react)
- [this.props.children](https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/children.md)
- [Immutable helpers](https://github.com/wonism/TIL/blob/master/front-end/reactjs/etc/immutable-helpers.md)

__추가 예정__
- Server Side Rendering
- Redux
- MobX

## 리액트 라이브러리
- [React UI Frameworks](https://github.com/wonism/TIL/blob/master/front-end/reactjs/libraries/react-ui-frameworks.md)

## 리액트 개발 도구
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)(Chrome extension)

## 참고
- [React JS DOCS](https://facebook.github.io/react/docs/getting-started.html)
- 프로 리액트 (Cassio de Sousa Antonio 저, 최민석 역)
- [Flux Official Docs](https://facebook.github.io/flux/docs/in-depth-overview.html)
- [Flux Github](https://github.com/facebook/flux)
- [웹Frameworks - Flux와 Redux (김태곤 님 글)](http://webframeworks.kr/tutorials/react/flux/)
- [Redux DOCS](http://redux.js.org/)
- [VELOPERT](https://velopert.com/)
