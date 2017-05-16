# Symbol
> Symbol은 JavaScript의 7번째 타입으로(다른 타입으로 캐스팅이 불가능하다.) 객체에 프라이버시를 부여하기 위해 사용된다.

```js
const obj = {};
obj._private = 'private value';
```

- `_private`는 써드파티 혹은 다른 동료 개발자에 의해, 혹은 `for-in`나 `Object.keys()`, `Object.getOwnPropertyNames()`등에 의해 발견되거나 변경될 수 있다. 하지만, `Symbol`을 사용하면, 이로 인해 발생하는 충돌을 예방할 수 있다.
  - `Object.getOwnSymbols()` `Object.getOwnPropertySymbols()`를 통해 심볼로 인해 부여된 속성을 확인할 수 있다.

```js
const mySymbol = Symbol();
const mySymbol2 = Symbol();
const mySymbol3 = Symbol('foo');
const obj = {};

obj[mySymbol] = 'private value';
obj[mySymbol2] = 'other private value';
obj[mySymbol3] = 'another private value';

console.log(obj); // Object {Symbol(): "private value", Symbol(): "other private value", Symbol(foo): "another private value"}
console.log(Object.getOwnPropertySymbols(obj)); // (3) [Symbol(), Symbol(), Symbol(foo)]

delete obj[mySymbol];
delete obj[mySymbol2];
delete obj[mySymbol3];

console.log(obj); // Object {}
```

- `Symbol()`을 호출하면 새로운 심볼 값이 생성되며, 이 심볼을 객체의 `key`로 사용할 수 있다. 이렇게 부여된 속성은 다른 어떤 속성과도 충돌되지 않는다.
- `Symbol('foo')`에서 문자열 `foo`는 일종의 주석으로 심볼 값을 `console.log()`로 확인하거나, `.toString()`을 통해 심볼 값을 문자열로 바꾸는 경우, 에러 메시지에서 이를 참조할 경우 해당 문자열인 `foo`가 출력된다.
- 심볼을 키로 갖는 속성은 `obj.name`처럼 `.`을 사용하여 접근할 수 없다. 반드시, `obj[key]`와 같은 식으로 접근해야 한다.
- `delete`연산자를 통해 심볼을 키로 갖는 속성을 삭제할 수도 있다.

```js
const obj = {};
const mySymbol = Symbol('foo');
const mySymbol1 = Symbol.for('foo');
const mySymbol2 = Symbol.for('foo');

obj[mySymbol] = 'foo';
obj[mySymbol1] = 'bar';
obj[mySymbol2] = 'baz';

console.log(mySymbol === mySymbol1); // false
console.log(mySymbol1 === mySymbol2); // true
console.log(obj[mySymbol]); // foo
console.log(obj[mySymbol1]); // baz
console.log(obj[mySymbol2]); // baz

Object.freeze(obj);
obj[mySymbol] = 42;
console.log(obj[mySymbol]); // foo

const iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

console.log(iframe.contentWindow.Symbol === Symbol); // false
console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')); // true

console.log(Symbol.keyFor(mySymbol)); // undefined
console.log(Symbol.keyFor(mySymbol1)); // foo
console.log(Symbol.key(Symbol.keyFor(mySymbol2))); // Symbol(foo)
```

- `Symbol.for()`메소드는 `전역 심볼 레지스트리`에 심볼을 만든다.
  - 이 레지스트리에 등록된 심볼은 상호적으로 공유되는 영역으로, `iframe`의 심볼은 기존 프레임에서 생성된 심폴과 동일하다.
  - 전역 심볼에 등록된 심볼인지 확인하는 방법은 `Symbol.keyFor()`메소드를 사용하는 것이다.

