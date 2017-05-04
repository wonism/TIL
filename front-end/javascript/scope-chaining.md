# 스코프 체이닝
- 스코프 체인은 변수를 확인할 때, 자바스크립트는 가장 안쪽의 범위에서 시작하여 찾고 있던 변수 / 객체 / 함수를 찾을 때까지 한 단계씩 바깥으로 이동하는 것을 뜻한다.
  - 이때, 정의된 함수들은 각자 중첩된 스코프를 가지며, 다른 함수 내에 정의된 함수는 외부 함수에 연결된 지역 스코프를 가진다.
    - 이 연결을 체인이라고 한다.
```js
var variable = 42;
var scope1 = function () {
  // variable is available here.
  var scope2 = function () {
    // variable is available here too.
    var scope3 = function () {
      // variable is also available here.
    };
  };
};
```
- 위와 반대로는 사용할 수 없다.
```js
// variable = undefined
var scope1 = function () {
  // variable is undefined
  var scope2 = function () {
    // variable is undefined
    var scope3 = function () {
      var name = 'Todd';
    };
  };
};
```
__스코프 체인 예제__
```js
var variable = 42;

function a() {
  var variable = 5;
  b();
}

function b() {
  console.log(variable);
}

a(); // 42
```
- 위 예제에서 `function b() { /* ... */ }`는 어휘적으로 전역환경에 있다. 따라서, `a`의 안에서 `b`가 실행되더라도, `a`가 아닌 전역환경의 `variable`을 바라보게 된다.
  - `a`안에서 정의한 `variable`은 `a`의 지역환경에서만 액세스할 수 있다.
- `42`대신 `5`를 출력하려면, 다음과 같이 코드를 수정하여 중첩함수를 만든다.
```js
var variable = 42;

function a() {
  var variable = 5;
  b();

  function b() {
    console.log(variable);
  }
}

a(); // 5
```

## 스코프와 클로저
- 변수가 사용되면, 프로그램은 해당 변수에 대한 시작점을 찾을 때까지 스코프체인을 탐색한다.
- 변수를 다시 선언하거나 함수에 전달하는 것은 변수를 이전에 존재하던 스코프 체인에서 분리하는 방법이다.
```js
// 변수를 다시 선언하거나
var str1 = 'hello';
var str2 = str1;
str1 = 'bye';

console.log(str2); // hello
```
```js
// 함수에 전달하는 것
var str1 = 'hello';
var printStr1 = function (str) {
  return function () {
    return str;
  };
};

var printHello = printStr1(str1);
str1 = 'bye';
console.log(printHello()); // hello
```

