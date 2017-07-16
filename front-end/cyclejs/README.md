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

## Dev Tools
- https://chrome.google.com/webstore/detail/cyclejs/dfgplfmhhmdekalbpejekgfegkonjpfp

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
