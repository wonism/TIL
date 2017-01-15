# Closure
> 클로저는 다른 함수의 스코프 안에 있는 변수들에 접근할 수 있는 함수를 뜻한다.

__클로저의 특징__
- 클로저는 lexical scope 로 인해 독립적인 변수를 가리키는 함수로, 클로저 안에 정의된 함수는 만들어진 환경(lexical environment) 를 기억한다.
- 클로저는 자신의 스코프에 정의된 변수, 외부 함수의 변수, 전역 변수에 대한 접근으로 구분된다.
- 클로저를 통해 함수 내의 지역 변수를 감출 수 있다. (private 와 비슷한 역할)
- 함수 안에 함수를 만드는 것은 처리 속도와 메모리 사용량에 좋지 않다.
  - <a href="https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript#.EB.A9.94.EB.AA.A8.EB.A6.AC_.EB.88.84.EC.B6.9C">참고 : MDN</a>

## 간단한 예제
```js
function statefulFunction() {
  let number = 1;
  return function (param) {
    number += param;
    console.log(number);
  }
}

const closure = statefulFunction();

closure(10); // 11
closure(10); // 21
```

- 예제를 보면 알 수 있듯이, `closure(parameter);` 로 함수 `closure`를 호출하면, 내부 변수 (`number`) 가 매 호출마다 다시 생성되는 것이 아니라, 상태를 유지시키며 참조된다.
- 클로저의 참조를 제거하려면 명시적으로 `null` 을 대입한다. (`closure = null;`)

## 클로저와 클로저가 아닌 함수의 예
```js
/* Not a closure */
function foo(param1) {
  let local = 42;

  bar(100);

  function bar(param2) {
    local += (param1 + param2);
    console.log(local);
  }
}

foo(10); // 152
foo(10); // 152
foo(10); // 152
```
- `bar` 함수는 `foo` 안에 속하기 때문에 `foo` 스코프를 외부 스코프 참조로 저장한다. 또, `bar` 함수는 자신의 렉시컬 스코프 체인을 통해 `local` 을 참조한다. 하지만, `bar` 은 `foo` 안에서 정의 및 실행을 하기만 할뿐, 바깥으로 나오지 않으므로 `클로저` 라고 부르지 않는다.

```js
/* Closure */
function foo(param1) {
  let local = 42;

  function bar(param2) {
    local += (param1 + param2);
    console.log(local);
  }

  return bar;
}

const bar = foo(5);

bar(10); // 57
bar(10); // 72
bar(10); // 87

const baz = foo(5);

baz(10); // 57
baz(10); // 72
baz(10); // 87
```
- 반면, `const` 로 선언된 변수 `bar` 는 `foo` 내부의 `bar` 를 가져오며, `bar(param)` 로써 외부에서 호출된다.
- 또한, `bar`, `baz` 두 가지 변수에 외부함수의 리턴을 대입한 결과를 보면, 또 다른 클로저가 생성되면서 `bar` 와 `baz` 의 상태는 서로 다르다는 것을 알 수 있다.

## for loop 와 closure
```js
function count() {
  for (var i = 1; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 0);
  }
}

count();
```
- 위 코드의 예상 결과로 `1, 2, 3, ..., 9` 를 생각할 수 있다. 하지만, 실제 실행 결과는 `10, 10, 10, ..., 10` 이다. 반복문 안에 있는 함수는 상위 스코프인 `count` 함수의 영역에서 `i` 를 찾는다.
- 그런데 이때, 이 익명 함수는 호출 스택에 쌓여있다가, loop 를 다 돌고 난 뒤에 실행된다. 따라서, `10` 이 되어버린 `i` 를 출력하게 된다.
  - `setTimeout` 바로 위에 `console.log(i);` 라인을 추가하여 확인해보면 더 쉽게 알 수 있다.
- 이 코드를 정상적으로 수행하게 하기 위해서는 `즉시 실행 함수 안에서 setTimeout 를 사용하는 방법` 과 `블록 스코프를 사용하는 방법` 이 있다.

__즉시 실행 함수 사용__
```js
function count() {
  for (var i = 1; i < 10; i++) {
    (function (cnt) {
      setTimeout(function () {
        console.log(cnt);
      }, 0);
    })(i);
  }
}

count();
```
- `for` 루프 안에서 실행된 즉시실행함수는 `i` 를 매개변수로 호출된다. setTimeout 안에 있는 익명함수는 매개 변수 `cnt` 즉, `i` 를 출력하게 되며, 비로소 원하는 결과인 `1, 2, 3, ..., 9` 를 출력하게 되는 것이다.

__블록 스코프 사용__
```js
function count() {
  for (let i = 1; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 0);
  }
}

count();
```
- `var` 로 선언된 `i` 를 `let` 키워드로 선언해주면 해결된다. `let` 은 함수 스코프가 아닌 블록 스코프를 사용하기 때문이다.

__번외 : 다른 방식(callback)으로 구현해보기__
```js
function count(i) {
  setTimeout(function () {
    console.log(i++);
    if (i <= 9) {
      count(i);
    }
  }, 0);
}

count(1);
```

## 참조
- [NHN Ent. 기술 블로그 : 자바스크립트의 스코프와 클로저](http://meetup.toast.com/posts/86)
- [MDN : 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

