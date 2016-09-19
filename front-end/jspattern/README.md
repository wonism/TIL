# Java Script 패턴
- "JavaScript Patterns, by Stoyan Stefaonv (O'Reilly). Copyright 2010 Yahoo!, Inc., 9780596806750." 을 참고하며 공부한 내용입니다.
- 문제가 있거나 오타, 다른 의견이 있으면, [issue](https://github.com/wonism/TIL/issues/new) 에 등록해주시면 확인하도록 하겠습니다.

__들어가기에 앞서__
- 패턴이란, 모범적인 관행, 쓰임새에 맞게 추상화된 원리나 어떤 문제를 해결하는 템플릿이라고 할 수 있으며, 검증된 방법을 통해 더 나은 코드를 작성할 수 있게 해준다

## 코딩 패턴
### 단일 var 패턴
- 스코프의 상단에서 `var` 선언을 한 번만 쓰는 패턴
  - 장점
    - 스코프 내에서 필요한 모든 지역 변수를 한 군데에서 찾을 수 있다.
    - 호이스팅으로 인한 실수를 방지한다.
    - 코드량이 줄어든다.
```js
function func() {
  var a = 1,
      b = 2,
      sum = a + b,
      obj = {},
      i,
      j;
}
```

__호이스팅이란?__
- 다음 코드에서 `greeting` 은 전역 변수로 선언되었다. 하지만, `func` 함수 내에서 지역 변수로 선언되었는데, 이 때, `greeting` 은 스코프 최상단에 끌어올려져서 `var greeting;` 와 동일한 효과를 내며, `undefined` 란 결과를 출력하게 되는 것이다.
```js
greeting = 'hello,';
function func() {
  console.log(greeting); // undefined
  var greeting = 'hello, world!';
  console.log(greeting); // hello, world!
}
```

### for 루프
- 배열을 다루는 `for` 사용 시, 배열의 길이를 캐싱한다.
```js
for (var i = 0, len = arr.length; i < len; i++) { /* ... */  }
```
  - JSLint 에서는 for 반복문에서 `i++` 대신, `i = i + 1`나 `i += 1` 을 권장한다.
    - ++, -- 는 '과도한 기교'를 조장한다는 이유이다.
    - JSLint 에서 ++, -- 를 사용하려면, JSLint 의 plusplus 옵션을 false 로 한다.
- 배열을 다루는 `for` 사용 시, 변수 하나를 덜 사용한다.
```js
for (var i = arr.length; i--; ) { /* ... */ }
```
- 카운트를 거꾸로 하여 0 으로 내려간다. (보통, 0 과 비교하는 것이 배열의 length 또는 0 이 아닌 값과 비교하는 것보다 빠르기 때문이다.)
```js
var i = arr.length;
while (i--) { /* ... */ }
// JSLint 는 -- 를 지적할 것이다.
```

### for-in 루프
- for-in 루프는 객체를 순회할 때 사용한다.
- 객체의 프로퍼티를 순회할 때는 프로토타입 체인을 따라 상속되는 프로퍼티들을 제외하기 위해, hasOwnProperty() 메소드를 사용해야 한다.
```js
var obj = {
  a: 3,
  b: 42,
  c: 'Text',
  d: {}
};

Object.prototype.commonProperty = function () {};

for (var i in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log(i + ' : ' + obj[i]);
  }
}

/*
a : 3
b : 42
c : Text
d : [object Object]
*/

/* ANTI PATTERN */
for (var i in obj) {
  console.log(i + ' : ' + obj[i]);
}

/*
a : 3
b : 42
c : Text
d : [object Object]
commonProperty:function () {}
*/
```
- 아래 방법은 Object.prototype.hasOwnProperty 를 사용하는 방법으로, `obj` 에서 hasOwnProperty 를 재정의했을 경우에도 사용 가능하다.
```js
for (var i in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, i)) {
    console.log(i + ' : ' + obj[i]);
  }
}

/*
a : 3
b : 42
c : Text
d : [object Object]
*/

// 프로퍼티 탐색을 캐시할 수도 있다.
var i,
    hasOwn = Object.prototype.hasOwnProperty;

for (i in obj) {
  if (hasOwn.call(obj, i)) {
    console.log(i + ' : ' + obj[i]);
  }
}
```

### 내장 생성자 프로토타입 확장
- `Object`, `Array`, `Function` 등 내장 생성자의 포로토타입을 확장하는 것은 얼마든지 가능하지만, 다른 개발자들이 내장 생성자의 확장된 메소드를 예상하기란 쉽지 않다.
  - 따라서, 내장 생성자 프로토타입을 확장하지 않는 것이 가장 좋다.
  - 하지만, 다음 조건을 만족한다면, 내장 생성자 프로토타입을 확장해도 좋다.
    - 기능이 ECMAScript 의 향후 버전이나 자바스크립트 구현에서 일관되게 내장 메소드로 구현될 예정인 경우
```js
if (typeof Object.prototype.extendedMethod !== 'function') {
  Object.prototype.extendedMethod = function () {
    // 메소드 구현
  };
}
```

### switch
- 각 `case` 는 `switch` 에 맞추어 정렬한다.
- 각 `case` 에서는 코드를 들여쓴다.
- `case` 는 `break;` 로 명확하게 종료한다.
- `break` 를 생략하지 않는다.
- 마지막엔 `default:` 를 사용한다.

### 암묵적 타입캐스팅
- 자바스크립트는 변수를 비교할 때, 암묵적으로 타입캐스팅을 한다.
- 이로 인해 생기는 문제를 피하기 위해서는 `===` 와 `!==` 를 사용한다.
```js
0 == false // true
0 == '' // true
undefined == null // true
0 === false // false
0 === '' // false
undefiend === null // false
```

### eval()
- 동적인 프로퍼티에 접근할 경우
```js
// 안티패턴
var property = 'name';
var result = eval('obj.' + property);

// 권장안
var property = 'name';
var result = obj[property];
```
- setTounout / setInterval / new Function()
```js
// 안티패턴
setTimeout('func()', 1000);
setInterval('func(1, 2, 3)', 1000);
var func = new Function('a', 'b', 'return a + b');

// 권장안
setTimeout(func, 1000);
setTimeout(function () {
  func(1, 2, 3);
}, 1000);
var func = function (a, b) {
  return a + b;
};
```
- `eval` 을 꼭 사용해야 한다면, 그 대신에 `new Function()` 을 사용하는 것을 고려해볼 수 있다.
  - `new Function()` 안에서 평가되는 코드는 지역 함수의 유효범위 안에서 실행된다.
  - `eval` 호출을 즉시실행 함수(Immediately-invocked Function Expresstion, IIFE)로 감싸는 방법도 있다.
```js
console.log(typeof un); // undefined
console.log(typeof deux); // undefined
console.log(typeof trois); // undefined

var jsstring = 'var un = 1; console.log(un);';
eval(jsstring); // 1

var jsstring = 'var deux = 2; console.log(deux);';
new Function(jsstring)(); // 2

var jsstring = 'var trois = 3; console.log(trois);';
(function () {
  eval(jsstring);
}()); // 3

console.log(typeof un); // 'number'
console.log(typeof deux); // 'undefined'
console.log(typeof trois); // 'undefined'

// 네임스페이스를 어지럽히는 것은 un 밖에 없다.
```
- `eval` 과 `Function` 의 차이는 다음과 같다.
  - `eval` 은 자신의 바깥 스코프까지 영향을 줄 수 있다.
  - `Function` 은 전역 스코프를 바라보며, 자신의 바깥 스코프에 영향을 줄 수 없다.
```js
(function () {
  var local = 1;
  eval('local = 3; console.log(local);'); // 3
  console.log(local); // 3
}());

(function () {
  var local = 1;
  Function('console.log(typeof local);')(); // undefined
}());
```

### 문자열에서 숫자로의 형변환
- `parseInt()` 를 사용하면, 문자열로부터 값을 얻을 수 있다.
  - `parseInt()` 의 두 번째 매개변수는 기수를 뜻하며, '010', '0x10' 등을 기수 없이 형변환할 경우, 각각 8 진수, 16 진수로 변환된다. (ES3 에서는 0 이 앞에오는 수를 8 진수로 인식한다.)
```js
var num = '010';
console.log(parseInt(num)); // 10 (8 in ES3)
```
- `+` 나 `Number()` 를 사용한다.
  - `parseInt()` 보다 이 두 가지 방법이 더 성능이 좋다.
  - 문자열을 숫자로 형변환할 때, `소수점 .`, `지수 e` 등의 문자도 사용가능하다.
```js
+'10e2'; // 1000
Number('10.1'); // 10.1
+'10ABCD'; // NaN, NaN 의 불린 값은 false 이다.
```

### 코딩패턴
- 들여쓰기
  - JSLint 의 기본값은 스페이스 4 개이다.
  - 중괄호 안에 있으면 들여쓴다.
- 중괄호
  - 중괄호는 생략할 수 있을 때에도 쓰는 것이 좋다.
```js
/* ANTI PATTERN */
for (var i = 0; i < 10; i++)
  console.log(i);

if (true)
  console.log(true);
else
  console.log(false);
```
- 중괄호 `{` 의 위치
  - 자바스크립트는 세미콜론을 쓰지 않고 행을 종료하면 해당 라인에 자동으로 세미콜론을 추가한다. 이러한 동작으로 인해 중괄호를 다음행에 넣으면 문제가 발생할 수 있다.
```js
function func () {
  return
  {
    key: 'value'
  };
}

// 위 코드는 아래와 같다.
function func () {
  return undefined;
  {
    key: 'value'
  }
}
```
- 공백
  - for 루프의 구성요소를 분리하는 `;`의 다음
  - for 루프 내에서 여러 개의 변수를 초기화할 경우, 변수와 변수 사이를 분리하는 `,` 다음
  - 배열의 원소들을 분리하는 `,` 다음
  - 객체의 프로퍼티를 분리하는 `,` 다음, 프로퍼티의 이름과 값을 분리하는 `:` 다음
  - 함수의 매개변수들을 분리하는 `,` 다음
  - 함수를 정의하는 `{ ...CODE...  }` 이전
  - 익명 함수 표현식에서 `function` 다음
  - 모든 연산자와 피연산자의 사이
    - `+`, `-`, `*`, `/`, `===`, `&&` `+=` 등
  - 함수, if-else 문, 루프, 객체 리터럴의 여는 중괄호 `{` 이전
  - 닫는 중괄호 `}` 와 `else` 또는 `while` 사이

### 네이밍 규칙
- 생성자는 대문자로 시작한다.
```js
var bob = new Person();
```
- 단어는 camelCase 를 사용한다.
  - 생성자는 PascalCase 를 사용한다.
- 상수나 전역 변수는 대문자를 사용한다.
```js
var PI = 3.14;
```
- 비공개 메소드를 구현할 때, `_` 를 앞에 붙인다.
  - JSLint 에 밑줄 접두어 사용을 지적받지 않으려면, `nomen: false` 옵션을 지정한다.
  - `_protected` 에는 밑줄 한 개, `__private` 에는 밑줄 두 개를 사용하기도 한다.
```js
var person = {
  getName: function () { },
  _getFirst: function () { },
  _getLast: function () { }
};
```

### 객체
- 객체는 `key-value` 로 이루어져있으며, 값으로 원시 데이터 타입이나 객체, 함수(메소드)가 올 수 있다.
#### 빈 객체로 시작하여 속성 추가하기
```js
// 빈 객체 정의
var dog = {};

// 프로퍼티 추가
dog.name = 'Bingo';

// 메소드 추가
dog.getName = function () {
  return 'Foo';
};

// 메소드 수정
dog.getName = function () {
  return this.name;
};

// 메소드 삭제
delete dog.name;
```

#### 객체 리터럴
```js
var dog = {
  name: 'Bingo',
  getName: function () {
    return this.name;
  }
};
// 객체를 중괄호로 감싸며, 내부에 프로퍼티와 메소드를 쉼표로 분리한다.
// 마지막 key-value 에 쉼표가 들어가면 IE 에서 에러가 발생한다.
// 프로퍼티명과 값은 : 로 분리한다.
```

#### 생성자 함수로 객체 생성하기
- 안티패턴이다.
```js
var car = new Object();
car.color = 'white';
car.driver = 'Alex';
```

#### 사용자 정의 생성자 함수
- 객체 리터럴 패턴이나 내장 생성자 함수 외에도 생성자 함수를 만들어 객체를 생성할 수도 있다.
- 이 때, 생성자 함수의 이름은 PascalCase 로 작성한다.
```js
function Person(name) {
  this.name = name;
  this.say = function () {
    return 'Hello, I\'m ' + this.name + '.';
  };
}

var p1 = new Person('Bob');
console.log(p.say()); // Hello, I'm Bob.
```
- new 와 함께 생성자 함수를 호출하면, 함수 안에서 다음과 같은 일이 발생한다.
  - 빈 객체가 생성되며, 이는 this 라는 변수로 참조할 수 있다.
  - 생성된 객체는 해당 함수의 프로토타입을 상속받는다.
  - this 로 참조되는 객체에 프로퍼티와 메소드가 추가된다.
  - 마지막에 다른 객체가 명시적으로 반환되지 않을 경우, this 로 참조된 이 객체가 반환된다.
- 위 코드가 다음과 같다고 볼 수 있다.
```js
function Person(name) {
  // var this = {};
  // 라고 볼 수도 있지만, Person 의 프로토타입을 상속받기 때문에 더 정확히 말하면, 다음과 같다고 볼 수 있다.
  // var this = Object.create(Person.prototype);

  this.name = name;
  this.say = function () {
    return 'Hello, I\'m ' + this.name + '.';
  };

  // return this;
}
```
- 위 코드를 보면, say 라는 메소드가 정의된 것을 볼 수 있다.
  - 이로 인해 `new Person()` 을 실행할 때마다, 메모리에 새로운 함수가 생성된다.
  - 메소드 `say` 는 모든 인스턴스가 공통으로 사용하기 때문에 이런 방식으로 메소드를 만드는 것은 좋지 않다.
  - 이를 개선하면 다음과 같다.
```js
function Person(name) {
  this.name = name;
}

Person.prototype.say = function () {
  return 'Hello, I\'m ' + this.name + '.';
};
```
- 위에서 설명한 것처럼, 함수 내에 `return` 을 사용하지 않아도 암묵적으로 `this` 를 반환한다. 하지만, 반환될 값이 될 객체를 따로 정할 수도 있다.
  - 아래 코드에서 `this` 에 `name` 프로퍼티를 추가해도 `that` 을 선언하고 반환하기 때문에 없는 코드나 마찬가지이다.
  - 객체가 아닌 것을 반환하면 에러는 아니지만, 무시되고, `this` 가 반환된다.
```js
function People() {
  this.name = 'Charles';

  var that = {};
  that.name = 'David';
  return that;
}

var p = new People();
console.log(p.name); // David
```
- `new` 를 사용하지 않으면, 함수 내의 `this` 가 전역 객체를 가리키게 된다.
  - ECMAScript 5 에서는 이런 문제에 대한 해결책으로, strict 모드에서 `this`가 전역 객체를 가리키지 않도록 한다.
```js
function Car() {
  this.color = 'red';
}

var c1 = new Car();
console.log(typeof c1); // object
console.log(c1.color); // red

/* ANTI PATTERN */
var c2 = Car();
console.log(typeof c2); // undefined
console.log(window.color); // red
```

__that 의 사용__
- 생성자가 항상 생성자로 동작하도록 해주는 2 가지 패턴이 있다.
- 첫 번째는 this 에 모든 멤버를 추가하는 대신, that 에 모든 멤버를 추가하고, that 을 반환하는 방법이다.
```js
function Car() {
  var that = {};
  that.color = 'blue';
  return that;
}
```
- 두 번째는 객체 리터럴을 통해 객체를 반환하는 방법이다.
```js
functino Car() {
  return {
    color: 'blue'
  };
}
```
- 이 두 가지 방법을 사용하면, `new` 를 사용하지 않아도 된다.
```js
var c1 = Car();
console.log(c1.color); // blue
```
- 하지만, 프로토타입과의 연결고리를 잃게 되며, 프로토타입에 추가한 멤버를 객체가 사용할 수 없게 된다.

#### 스스로를 호출하는 생성자
- 앞서 설명한 패턴의 문제점을 해결하는 방법으로 다음과 같은 방법이 있다.
  - 생성자 내부에서 this 가 해당 생성자의 인스턴스인지 확인하고, 그렇지 않은 경우 new 와 함께 스스로를 재호출한다.
```js
function Car() {
  if (!(this instanceof Car)) {
    return new Car();
  }
  // 인스턴스를 판별하는 또 다른 방법으로 arguments.callee 와 비교하는 방법이 있다.
  // 단, ES5 의 strict 모드에서는 허용되지 않는다.
  // if (!(this instanceof arguments.callee)) {

  this.color: 'black';
}

Car.prototype.move = function () {
  return true;
};

var c1 = new Car(),
    c2 = Car();

console.log(c1.color); // black
console.log(c2.color); // black

console.log(c1.move()); // true
console.log(c2.move()); // true
```

