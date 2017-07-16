# Cycle.js
> Cycle.js는 RxJS를 기반으로 Reactive한 프로그래밍을 할 수 있게 해주며, 관심사의 분리를 극대화하고 코드를 체계적으로 선언할 수 있는 방법을 제공한다. 또한, 데이터 흐름은 코드에서 분명하게 볼 수 있으며 추적 가능하다. 그리고, Cycle.js로 만들어진 코드는 `this`가 없다는 특징이 있다.

## Installation
```
$ npm i -S xstream @cycle/run @cycle/dom # @cycle/OTHER_PACKAGES
# for using jsx..
$ npm i -D snabbdom-jsx babel-plugin-transform-react-jsx
```
- `Cycle.js`는 `RxJS`를 기반으로 만들어졌기 때문에 `RxJS`에 의존성이 있었지만, 별도의 스트림 라이브러리인 `xstream`를 만들었으며, `RxJS`대신 사용하길 권장한다.
  - `xstream`대신 `RxJS`를 사용하는 것도 가능하다.

## 데이터 흐름
- `Cycle.js` 애플리케이션과 실세계를 하나의 써킷으로 본다.
![Cycle.js Data flow]('./cycle-dataflow.svg')
- `Cycle.js`는 애플리케이션을 순수한 함수인 `main`으로 추상화하며, 사이드 이펙트가 없이 입력과 출력만 가진다.
  - 사이드 이펙트는 드라이버를 통해 수행되며, 드라이버는 `DOM`, `HTTP` 등을 처리하는 플러그인이다.

## 장점과 단점
__장점__
- Redux, 사이드이펙트가 없고, 모든 것이 순수한 데이터 스트림이다.
- `Class`, `this`를 사용하지 않는 완전한 함수형 프로그래밍 패러다임을 사용한다.
- 함수형 프로그래밍으로 인해 테스트 및 유지 보수가 쉽다.

__단점__
- 커뮤니티가 작다.
- 새로운 패러다임을 배워야한다.
- 모든 앱이 리액티브를 필요로 하지는 않다.

## CSS Selectors
- `DOM.select(selector).events(eventType)`과 같은 표현이 `jQuery`기반 프로그램과 비슷하기 때문에 좋지 않은 패턴일까 염려할 수 있다.
  - 보통 `React JS` 개발자들은 `<Element onClick={this.handleClick} />`과 같이 이벤트에 대한 이벤트 핸들러를 가상 DOM에 지정하는 것을 선호한다.
  - 만약, Cycle.js가 `<Element onClick={this.handleClick} />`과 같은 표현을 갖게 된다면, `Views`는 더이상 간단하지 않게 된다.
    - React JSdㅔ서는 사용자의 행동으로 인해 발생하는 상황을 지정하기 때문이다.
    - Cycle.js에서 `Views`는 마우스 조작 및 키 입력과 같은 사용자 입력에 대해 알지 못한다. (반응이 없도록 유지하려면, 모델을 시각적으로 표현하기만 하면 된다.)
- Cycle.js에서 CSS 선택자 기반 이벤트 쿼리를 선택한 것은 정보에 입각한 합리적인 결정이다. 이는 `MVI`를 가능케하며 `reactive`하게 된다. 그리고, `[open/closed 이론](https://en.wikipedia.org/wiki/Open/closed_principle)`에 영감을 받는다.
- 가상 노드에 새로운 이벤트를 추가하려면, `Views`는 변경하지 않고, `Intent`만 변경하면 된다.
- `class` 이름은 `View(DOM sink)`와 `Intent(DOM source)`가 동일한 요소를 나타내기 위해 사용할 수 있는 공통된 아티팩트다.
  - 전역 클래스 이름 충돌의 위험은 `isolate` 헬퍼로 인해 문제가 되지 않는다.

## Example
- https://github.com/wonism/TIL/tree/master/front-end/cyclejs/example

## Model-View-Intent
- Model : Intent를 관찰 (정보 처리)
- View : Model을 관찰 (유저에게 출력)
- Intent : 사용자를 관찰

__main함수의 분할__
- Cycle.js 앱 전체를 `main` 안에 작성할 수도 있지만, 그것은 좋지 않다. 유지 보수에 어렵기 때문이다. 이 `main`함수는 `MVI`패턴으로 나뉠 수 있다.
```
DOM Souce -> main -> DOM Sink
```
```
DOM Source -> Intent -> Model -> View -> DOM Sink
```

__MVI의 구현 예제__
- https://github.com/wonism/TIL/tree/master/front-end/cyclejs/example

## Component
- 다른 프레임워크 또는 라이브러리와 마찬가지로 모든 Cycle.js 앱은 더 큰 Cycle.js 앱의 컴퍼넌트로 사용될 수 있다.
- 컴퍼넌트의 관점에서 볼 때, 부모가 무엇인지는 중요하지 않다. 컴퍼넌트는 source가 자신과 관련된 데이터(props)만 포함한다고 가정해야 하며, 컴퍼넌트의 source와 sink를 분리해야 한다.

## Dev Tools
- https://chrome.google.com/webstore/detail/cyclejs/dfgplfmhhmdekalbpejekgfegkonjpfp

## CLI
```
$ npm install -g create-cycle-app
$ create-cycle-app cycle-js-app-name
```

## Packages
- `@cycle/dom` : DOM에서 작동하는 드라이버 모음. snabdom Virtual DOM을 기반으로 하는 DOM 드라이버와 HTML 드라이버를 가진다.
- `@cycle/history` : History API의 드라이버
- `@cycle/http` : HTTP 요청을 위한 `[superagent](https://github.com/visionmedia/superagent)`기반의 드라이버
- `@cycle/isolate` : 범위가 지정된 데이터 흐름 컴퍼넌트를 만들기 위한 함수
- `@cycle/jsonp` : `JSONP`를 통해 HTTP 요청을 하기 위한 드라이버
- `@cycle/most-run` : `[most](https://github.com/cujojs/most)`로 만든 `run` 함수
- `@cycle/run` : `[xstream](https://github.com/staltz/xstream)`으로 만든 `run` 함수
- `@cycle/rxjs-run` : `[RxJS](https://github.com/Reactive-Extensions/RxJS)`으로 만든 `run` 함수

## Reference
- https://cycle.js.org
- https://egghead.io/courses/cycle-js-fundamentals
- https://vimeo.com/168652278
