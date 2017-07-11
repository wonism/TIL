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

## Basic Usage
- [Example](https://github.com/wonism/TIL/tree/master/front-end/cyclejs/example)

## 데이터 흐름
- `Cycle.js` 애플리케이션과 실세계를 하나의 써킷으로 본다.
![Cycle.js Data flow]('./cycle-dataflow.svg')

## Dev Tools
- https://chrome.google.com/webstore/detail/cyclejs/dfgplfmhhmdekalbpejekgfegkonjpfp

## Reference
- https://cycle.js.org
- https://egghead.io/courses/cycle-js-fundamentals
- https://vimeo.com/168652278
