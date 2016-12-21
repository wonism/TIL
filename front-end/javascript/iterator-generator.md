# Iterator & Generator

## 목차
- Iterator [(바로 가기)](#Iterator)
- Generator [(바로 가기)](#Generator)

## Iterator
- `iterator` 객체는 한 번에 한 값씩 컬렉션 항목에 엑세스할 수 있는 객체이다.
- `iterator` 객체는 `next` 메소드를 가지며, `next` 메소드가 호출되면 함수의 본문은 `next` 메소드가 마지막으로 호출된 이후로 재개되고, `yield` 에 도달할 때까지 실행을 계속 한다.

__Iterator 프로토콜과 Iterable 프로토콜__
- `iterable` 프로토콜을 사용하면, 자바스크립트 객체가 반복될 때의 동작을 정의할 수 있다.
- 자바스크립트에는 `@@iterator` 메소드가 있는데, 이 메소드는 반복 가능한 프로토콜의 근간을 이루며, `Symbol.iterator` 를 통해 할당할 수 있다.
- 객체가 반복되어야할 때마다 `@@iterator` 메소드가 호출된다.
  - 예를 들어, `for (let i of o)` 반복문의 시작 부분에서 `@@iterator` 메소드가 요청될 것이며, 반환된 반복자 `i` 는 객체 `o` 에서 값을 가져오는 데 사용될 것이다.
- 아래 예제는 반복의 개념에 대한 코드다.

```js
const foo = {
  [Symbol.iterator]: () => ({
    items: ['J', 'A', 'E', 'W', 'O', 'N'],
    next: function next() {
      return {
        value: this.items.shift(),
        done: this.items.length === 0
      }
    }
  })
};
```

- `Symbol.iterator` 속성을 통해 `@@iterator` 속성을 지정하여, 객체를 반복 가능하도록 한다.
  - `Symbol.iterator` 속성에 할당된 메소드에 의해 반환된 객체는 `iterator` 프로토콜을 준수해야 한다.
  - `iterator` 프로토콜은 객체에서 값을 가져오는 방법을 정의하고, `iterator` 프로토콜을 준수하는 `@@iterator` 를 반환해야 한다.
  - 프로토콜은 `next` 메소드를 가진 객체를 가지고 있도록 하며, `next` 메소드는 아래와 같은 형식의 객체를 반환한다.

```js
{
  value: Any,
  done: Boolean
}

// value - 생성된 값
// done - generator 가 마지막 값을 반환했는지 여부
```

- `for..of` 반복문은 반복 가능한 프로토콜을 준수하는 모든 객체 (배열, 사용자 정의의 `[Symbol.iterator]` 메소드가 있는 모든 객체와 `generators`, `.querySelectorAll 의 DOM 노드` 등 포함) 에 대해 반복을 수행할 수 있다.
- 반복가능한 것들을 배열에 캐스팅할 때, `[...array]` 와 `Array.from` 을 사용하면 코드가 훨씬 간결해진다.

```js
for (let bar of foo) {
  console.log(bar);
}
// J
// A
// E
// W
// O
// N

[...foo]; // ['J', 'A', 'E', 'W', 'O', 'N']
Array.from(foo); // ['J', 'A', 'E', 'W', 'O', 'N']
```

__Iterator 와 Infinity__
- `iterator` 는 코드 상에서 시퀸스가 무한한지 아닌지를 알 수 없다.
- 시퀸스가 무한한 경우에는 다음과 같이 반복문을 벗어날 수 있는 조건문을 추가해야한다.

```js
var foo = {
  [Symbol.iterator]: () => {
    var i = 0;
    return {
      next: () => ({ value: ++i })
    }
  }
};

for (let i of foo) {
  if (i > 10) {
    break;
  }

  console.log(i);
}
```

## Generator
- `generator` 는 `function* funcName() {}` 구문을 사용하여 선언할 수 있는 특수한 종류의 `iterator` 이다.
- `generator` 는 `ES2015` 의 신기능으로 함수 처리 안의 임의 장소에서 처리를 중단하거나 재개할 수 있다. (이 때, 컨텍스트는 그대로 저장된다.)
- `generator` 를 사용하면, 한 번에 한 값씩 함수에서 값을 가져오기 위해 반복할 수 있는 객체를 반환함으로써, 시간이 지남에 따라 많은 값을 생성할 수 있다.
  - `generator` 가 불려지면 직접 값을 반환하는 대신, `iterator` 객체를 반환하며, `.next()` 메소드를 통해 반복할 수 있다.
- `generator` 는 `iterable 및 iterator 프로토콜`을 준수하는 `generator` 객체를 반환한다.
- 참고로, `yield` 는 `strict` 모드에서만 예약어이다.

__간단한 사용 예__

```js
function* generator() {
  yield 'f';
  yield 'o';
  yield 'o';
}

var g = generator();

typeof g[Symbol.iterator] // 'function'
typeof g.next // 'function'
g[Symbol.iterator]() === g // true

// console.log([...g]); // ['f', 'o', 'o']
// console.log(Array.from(g)); // ['f', 'o', 'o']
```

- `generator` 객체는 `generator` 함수를 통해 만들어진다.
- `g` 는 `@@iterator` 를 가지므로 `iterable` 하며, `next` 메소드를 가지므로 `iterator` 이다.
- `generator` 객체의 `iterator` 는 `generator` 객체 자체이다.
- `g.next()`, `Array.from(g);`, `[...g]`, `for (let i of g)` 등과 같이 호출하여 값을 가져올 수 있다.
- `yield` 에 다다르면, 해당 값이 `iterator` 에 의해 생성되고, 함수 실행이 일시적으로 중단된다.
- 다음 4 가지 경우, 마지막 위치를 기억하면서 `generator` 기능 실행이 일시적 혹은 완전히 중지된다.
  - 순서의 다음 값을 반환하는 `yield`
  - 시퀸스의 마지막 값을 반환하는 `return`
  - `throw` 문은 `generator` 에서 실행을 완전히 중단함.
  - `generator` 함수의 끝에 도달할 경우 (`{ done: true }`)
    - `g` 시퀸스가 끝나면, `g.next()` 는 단순히 `{ done: true }` 만을 반환할 뿐, 아무 효과가 없다.

__Generator 와 for..of 루프__

- `generator` 객체를 만든 뒤, `for (let i of g)` 를 사용하면, 한 번에 한 문자씩 출력이 된다.

```js
function* generator () {
  yield 'J';
  console.log('A');
  yield 'E';
  console.log('W');
  yield 'O';
  console.log('N');
}

var foo = generator();

for (let i of foo) {
  console.log(i);
}

// J
// A
// E
// W
// O
// N
```

__Generator 와 spread 표현식__

- `[...arr]` 를 사용하면, `yield` 사이의 표현식이 실행된다.

```js
function* generator () {
  yield 'J';
  console.log('A');
  yield 'E';
  console.log('W');
  yield 'O';
  console.log('N');
}

var foo = generator();

console.log([...foo]);
// 'A'
// 'W'
// 'N'
// ['J', 'E', 'O']
```

__다른 generator 함수에 컨텍스트 위임하기__

- `generator` 는 `yield*` 를 통해 다른 `generator` 함수 또는 반복 가능한 객체에 위임할 수 있는데, 이를 통해 위 코드를 아래와 같이 수정하면, `spread 표현식` 으로도 원하는 결과를 얻을 수 있다.
- 아래 예제에서 `innerGenerator` 를 호출하면, 객체가 반환되지만, 실제로 `innerGenerator` 는 실행되지 않는다.

```js
function* innerGenerator() {
  yield ' ';
}

function* generator() {
  yield* 'JAE';
  innerGenerator(); // DO NOTHING
  yield* innerGenerator();
  yield* 'WON';
}

console.log([...generator()]);
// ['J', 'A', 'E', ' ', 'W', 'O', 'N']
```

__generator 객체의 메소드__

- `generator` 객체는 앞서 살펴본 `next` 메소드 외에도 `return` 메소드와 `throw` 메소드가 있다.
  - `next(VALUE)` 와 같이 `next` 메소드에 파라미터를 보낼 수도 있다.
- `throw` 메소드는 시퀸스의 항목을 잘못 처리할 경우, `generator` 에 알리는 역할을 한다.
  - 보통, `try / catch` 문을 통해 이를 처리하며, 이를 통해 실행을 다시할 수 있다.
- `return` 메소드는 `throw` 메소드처럼 `generator` 함수 내에서 실행을 다시할 수 있다.
  - 하지만, `return` 메소드는 `generator` 단계에서 예외가 발생하지 않는다.
  - `return(VALUE)` 를 통해 값을 반환할 수도 있다.

__generator.throw__

```js
function* generator() {
  try {
    console.log('Generator Start');
    yield 42;
  } catch (err) {
    console.log(`${ err.name } Occured - ${ err.message }`);
  }
}

var g = generator();

g.next();
// Generator Start
// Object { value: 42, done: false }

g.throw({ name: 'Generator Error', message: 'It is generator error.' });
// Generator Error Occured - It is generator error.

g.next();
// Object { value: undefined, done: true }
```

__generator.return__

- 일반적으로 `return` 메소드가 실행되면, `generator` 가 마지막 값을 반환한 것과 같은 효과를 낸다. 즉, `done` 속성의 값이 `true` 가 된다.

```js
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

var g = generator();
console.log(g.next());
// { value: 1, done: false }
console.log(g.return());
// { value: undefined, done: true }
console.log(g.next());
// { value: undefined, done: true }
```

- 또, `return(VALUE)` 처럼 `return` 메소드에 값을 넘겨주면, `value` 속성의 값은 `VALUE` 가 된다.

```js
function* generator() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}

console.log([...generator()]); // [1, 2]

console.log(Array.from(generator())); // [1, 2]

for (let n of generator()) {
  console.log(n);
}
// 1
// 2

var g = generator();

console.log(g.next());
// { value: 1, done: false }

console.log(g.next());
// { value: 2, done: false }

console.log(g.next());
// { value: 3, done: true }

console.log(g.next());
// { value: undefined, done: true }

console.log(g.next(5));
// { value: 5, done: true }
```

- 하지만, `return` 메소드가 호출되었을 때 `generator` 함수의 코드가 `try / finally` 안에 있으면, 시퀸스 종료를 피할 수 있다.
- 이 때, `finally` 블록의 `yield` 표현식이 실행된 이후, 시퀸스는 `g.return(VALUE)` 에 전달된 값으로 종료된다.

```js
function* generator() {
  yield 1;
  try {
    yield 2;
  } finally {
    yield 3;
    yield 4;
  }
  yield 5;
}

var g = generator();

console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.return(6)); // { value: 3, done: false }
console.log(g.next()); // { value: 4, done: false }
console.log(g.next()); // { value: 5, done: false }
console.log(g.next()); // { value: 6, done: true }

console.log(g.next()); // { value: undefined, done: true }
```

## 참고
- [MDN - `function*`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
- [MDN - 반복기 및 생성기](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [Exlporing JS](http://exploringjs.com/es6/ch_generators.html)
- [PONYFOO.COM](https://ponyfoo.com/articles/es6-generators-in-depth)

