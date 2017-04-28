# Temporal Dead Zone

## Hoisting
- 먼저, ES5에서 스코프가 어떻게 작동하는지 살펴본다.
```js
var x = 'outer scope';

(function() {
  console.log(x); // undefined
  var x = 'inner scope';
}());
```
- `x`가 `undefined`가 아닌 것을 출력한다고 생각했다면, 먼저 호이스팅에 대한 개념을 숙지해야 한다.
  - 호이스팅에 대한 개념은 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var#var_호이스팅(hoisting))에서 볼 수 있다.

## TDZ
__var와 let/const의 비교로 보는 TDZ__
```js
console.log(x); // throws a ReferenceError
let x = 'hey';
```
- `var`와 `let/const`선언과 그들의 범위에 대한 차이 중 하나는 "`let/const`가 TDZ에 의해 제약을 받는다는 것"이다.
  - 즉, 변수가 초기화되기 전에 액세스하려고 하면, `var`처럼 `undefined`를 반환하는 대신 `ReferenceError`가 발생한다.
  - 이는 코드를 예측가능하고 잠재적 버그를 쉽게 찾아낼 수 있도록 한다.
- 위 예제를 보면, `let/const`선언은 호이스팅을 수행하지 않는다고 생각할 수 있다.
  - 하지만 이는 잘못된 것이며, `Hoisting`에 관한 예제 코드에서 `var`를 `let`으로 바꾸면, 어떤 일이 발생하는지 살펴본다.
```js
let x = 'outer scope';

(function() {
  console.log(x);
  let x = 'inner scope';
}());
```
- `console.log(x);`는 TDZ에 의해 `ReferenceError`를 발생하게 된다. 이는, `let/const` 선언은 호이스팅을 수행하기 때문이다.
- `undefined`를 반환하는 `var`와는 달리, 초기화되기 전에 액세스할 때 에러가 발생한다.

__TDZ 살펴보기__
- `let/const`선언은 실행중인 실행 컨텍스트의 어휘적 환경(Lexical Environment)으로 범위가 지정된 변수를 정의한다.
- 변수는 그들의 어휘적 환경에 포함될 때 생성되지만, 어휘적 바인딩이 실행되기 전까지는 액세스할 수 없다.
  - 새로운 범위에 진입할 때마다 지정된 범위에 속한 모든 `let/const`바인딩이 지정된 범위 내부의 코드가 실행되기 전에 실행된다. (즉, `let/const`선언이 호이스팅된다.)
  - 어휘적 바인딩이 실행되기 전까지 액세스할 수 없는 현상을 TDZ라고 한다.
```js
// let x를 실행하기 전에 x에 접근하면, TDZ에 의해 ReferenceError가 발생하게 된다.
// console.log(x);

let x = 42;
// 위 코드 실행 이후에는 x에 접근할 수 있다.
console.log(x);
```

- 어휘적 바인딩에 의해 초기화되며 정의된 변수는 변수가 만들어질 때가 아닌, 값이 해당 초기화 구문 어휘적 바인딩이 실행될 때, 값을 할당받는다.
  - `let/const`선언의 어휘적 바인딩에 초기화 구문이 없으면, 어휘적 바인딩을 실행할 때, 변수에 `undefined`가 할당된다.
```js
let x; // 이는 let x = undefined; 와 같다.
```

- `let/const`변수는 초기화 구문이 완전히 실행된 이후에 우변이 실행되고 그 결과 값이 선언된 변수에 할당된 후 초기화된다.
  - 우변에서 `let/const`로 선언된 변수를 사용하는 경우, 우변은 변수를 읽으려고 시도하지만 초기화 구문이 아직 완전히 실행되지 않은 상태이므로, TDZ `ReferenceError`가 발생한다.

```js
let x = x; // ReferenceError
```
```js
let a = f(); // ReferenceError

const b = 2;
function f() {
  return b;
}
```

- 디폴트 파라미터(Default Parameters)에서도 TDZ가 적용되는데, 디폴트 파라미터는 주어진 함수의 해당 범위와 내부 범위 사이에 있는 중간 범위에서 실행된다.
```js
(function(a, b = a) {
  a === 1; // true
  b === 1; // true
}(1, undefined));
```
```js
// 디폴트 파라미터는 왼쪽에서 오른쪽으로 실행되며, a의 초기화 구문이 b를 읽을 때, b는 TDZ에 있다.
// 따라서, ReferenceError가 발생한다.
(function(a = b, b) {}(undefined, 1)); // ReferenceError
```
```js
// a는 a의 초기화구문이 a를 읽으려고 할 때, TDZ에 있으므로, ReferenceError가 발생한다.
(function(a = a) {}()); // ReferenceError
```

- `class`에서도 TDZ가 적용된다. 상위 생성자를 호출하기 전에 `this`에 액세스하려고 하는 하위 클래스의 생성자는 TDZ `ReferenceError`를 발생시킨다.
  - 하위 클래스의 생성자가 `super();`를 호출하지 않는 한, `this`바인딩은 초기화되지 않은 것으로 간주된다.
  - 하위 클래스 생성자에 `super();`가 없으면, 생성자는 암시적으로 `return this;`를 시도한다.

```js
class A extends B { // ReferenceError
}

class B {
}
```

## 마치며
- TDZ는 유용하다. 초기화되지 않은 바인딩에 액세스하려는 경우, 예기치 않은 결과를 내는 대신, 개발자에게 에러 피드백을 제공하기 때문에 유용하게 사용된다.
- `let/const`선언 변수는 호이스팅되지 않는 것이 아니다. 스코프에 진입할 때 변수가 만들어지고 TDZ가 생성되지만, 코드 실행이 변수가 실제 있는 위치에 도달할 때까지 액세스할 수 없는 것이다. `let/const`변수가 선언된 시점에서 제어흐름은 TDZ를 떠난 상태가 되며, 변수를 사용할 수 있게 된다.

## 참고
- [JS ROCKS : TEMPORAL DEAD ZONE (TDZ) DEMYSTIFIED](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified)
- [TC39 Github pages : Section 13.3](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
- [DZone : Learning ES6: Using let, const, and Temporal Dead Zone](https://dzone.com/articles/learning-es6-using-let-const-and-temporal-dead-zon)
- [Pony Foo : ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth)

