# Java Script - The good parts

<p align="center"><img src="https://github.com/wonism/TIL/blob/master/front-end/javascript/js-the-good-parts.jpg" width="160" height="209" align="center" /></p>

- "자바스크립트 핵심 가이드, 더글라스 크락포드 저 (김명신 역) (O'Reilly / 한빛 미디어). Copyright 2008 HANBIT Media, Inc., 9788979145984." 의 일부와 MDN 를 참고하며 정리한 내용입니다.

## 목차
- 자바스크립트 객체 [(바로 가기)](#자바스크립트-객체)
  - 객체 리터럴 [(바로 가기)](#객체-리터럴)
  - 객체의 복사 [(바로 가기)](#객체의-복사)
  - 객체의 리플렉션과 열거 [(바로 가기)](#객체의-리플렉션과-열거)
  - 객체 속성의 삭제 [(바로 가기)](#객체-속성의-삭제)

## 자바스크립트 객체
- 자바스크립트에서 단순한 데이터 타입은 숫자, 스트링, 불리언, undefined 가 있으며, 이들을 제외한 타입은 모두 객체이다.
  - 숫자와 스트링, 불리언은 메소드가 존재하기 때문에 유사 객체라고 할 수 있다. 하지만, 값이 한 번 정해지면 변경할 수 없다.
  - 자바스크립트의 객체는 변형 가능한 속성들의 집합이다.
- 객체 속성의 이름은 문자열이 올 수 있으며, 빈 문자열도 포함이다. 객체 속성의 값은 `undefined` 를 제외한 모든 값이 올 수 있다.
- 자바스크립트 객체는 클래스가 필요 없으며, 데이터를 한 곳에 모으고 구조화하는데 용이하다. 또한, 객체 하나는 다른 객체를 포함할 수 있어 그래프나 트리같은 자료구조를 쉽게 표한할 수 있다.
- 객체 하나에 있는 속성들을 다른 객체에 상속하게 해주는 프로토타입이라는 것이 존재한다.

### 객체 리터럴
- 아래와 같이 `{}` 안에 `이름/값` 쌍들을 표기하며, 속성 값을 읽거나 쓰기 위해서는 `obj["age"]` 혹은 `obj.name` 와 같이 표기한다.

```js
// 객체 생성하기
const emptyObject = {};
const person = {
  "": "Using empty string is possible",
  "name": "Jaewon",
  "age": 27
};

// 속성 값 읽기 - 1
console.log(person["name"]); // Jaewon
console.log(person.age); // age
console.log(person.address); // undefined

// 속성 값 읽기 - 2
const key = 'name';
console.log(person[key]); // Jaewon

if (isNewYear) {
  // 속성 값 갱신
  person.age += 1;
  console.log(person.age); // 28
}

if (boughtHouse) {
  // 새로운 속성 값 쓰기
  person.address = 'Seoul Gangnam';
  console.log(person.address); // Seoul Gangnam
}
```

[목차로 가기](#목차)

### 객체의 복사
- 객체는 참조 방식으로 전달되며, 결코 복사되지 않는다.
- 아래 링크는 객체를 복사하는 방법에 대한 글이다.
  - [링크](https://github.com/wonism/TIL/tree/master/front-end/javascript/copy-object.md)

## 프로토타입
- 모든 객체는 속성을 상속하는 프로토타입 객체에 연결된다.
  - 객체 리터럴로 생성되는 객체는 자바스크립트 표준 객체인 `Object` 의 `prototype` 객체에 연결된다.
- 객체를 생성할 때 해당 객체의 프로토타입이 될 객체를 지정할 수 있다.
  - `Object` 객체의 `create` 메소드는 넘겨받은 객체를 프로토타입으로 하는 새로운 객체를 생성한다.
- 프로토타입 관계는 동적으로, 프로토타입에 새로운 속성이 추가되면, 해당 프로토타입을 참고하는 모든 객체들에게도 이 속성이 추가된다.

```js
const a = { a: 1 };
console.log(a); // Object {a: 1}
console.log(a.a); // 1

const b = Object.create(a);
console.log(b); // Object {}
console.log(b.a); // 1
```

- 위와 같이 객체에 있는 특정 속성 값을 읽으려고 할 때, 해당 속성이 객체에 없으면, 자바스크립트는 이 속성을 프로토타입 객체에서 찾으려고 한다.
  - 이러한 동작을 위임(delegation)이라 하며, 이 동작은 `Object.prototype` 까지 계속해서 이어진다. 이때, 해당 속성을 찾지 못하면, `undefined` 를 반환한다.

__참고 Object.create() Polyfill__

```js
// Object.create 메소드는 IE9 이상에서 작동한다.
if (typeof Object.create !== 'function') {
  Object.create = (function(undefined) {
    var Temp = function() {};

    return function (prototype, propertiesObject) {
      if(prototype !== Object(prototype) && prototype !== null) {
        throw TypeError('Argument must be an object, or null');
      }
      Temp.prototype = prototype || {};
      var result = new Temp();
      Temp.prototype = null;
      if (propertiesObject !== undefined) {
        Object.defineProperties(result, propertiesObject);
      }

      // to imitate the case of Object.create(null)
      if(prototype === null) {
         result.__proto__ = null;
      }
      return result;
    };
  })();
}
```

[목차로 가기](#목차)

### 객체의 리플렉션과 열거
- 객체에 어떤 속성들이 있는지 확인하기 위해서는 `for (let key in objectName)` 을 사용한다.

```js
const obj = {
  a: 1,
  b: true,
  c: () => {},
  d: [1, 2, 3],
};

const obj2 = Object.create(obj);
obj2.e = 'child object';

for (let key in obj) {
  console.log(`${ key } | ${ obj[key] } ${ typeof obj[key] }`);
}
// a | 1 number
// b | true boolean
// c | () => {} function
// d | 1,2,3 object

for (let key in obj2) {
  console.log(`${ key } | ${ obj2[key] } ${ typeof obj2[key] }`);
}
// e | child object string
// a | 1 number
// b | true boolean
// c | () => {} function
// d | 1,2,3 object
```

- 이 때, `objectName[key]` 와 같은 식으로 접근하면, 해당 속성이 없을 경우 프로토타입 객체에서 찾는다. 그렇기 때문에 해당 객체만 가지고 있는 속성에 접근하기 위해서는 `hasOwnProperty` 메소드를 사용한다.
  - `hasOwnProperty` 메소드는 객체가 특정 프로퍼티를 가지고 있는지 확인하는 메소드로 프로토타입 체인을 바라보지 않는다.

```js
const obj = {
  a: 1,
  b: true,
  c: () => {},
  d: [1, 2, 3],
};

const obj2 = Object.create(obj);
obj2.e = 'child object';

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(`${ key } | ${ obj[key] } ${ typeof obj[key] }`);
  }
}
// a | 1 number
// b | true boolean
// c | () => {} function
// d | 1,2,3 object

for (let key in obj2) {
  if (obj2.hasOwnProperty(key)) {
    console.log(`${ key } | ${ obj2[key] } ${ typeof obj2[key] }`);
  }
}

// e | child object string
```

- 보통 리플렉션을 할 때에는 메소드보다는 데이터에 초점이 맞춰진다. 그렇기 때문에, 메소드를 제외한 속성만을 리플렉션하려면 `typeof objectName[key]  !== 'function'` 으로 속성의 타입이 함수가 아닐 경우에만 리플렉션하도록 한다.
```js
const obj = {
  a: 1,
  b: () => {},
};

for (let key in obj) {
  if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
    console.log(`${ key } | ${ obj[key] } ${ typeof obj[key] }`);
  }
}

// a | 1 number
```

- `for in` 구문을 사용하여 속성들을 열거하면, 이름 순대로 나오리라는 보장을 받지 못한다. 순서가 필요하다면, 배열에 속성 이름들을 넣고 이 배열들을 종주하면서 열거한다.
  - 프로토타입 체인에 있는 속성들이 나오거나, 보고 싶지 않은 속성 등이 나올 걱정을 하지 않아도 된다.
```js
const obj = {
  z: 1,
  1: 2,
  x: 3,
};

const arr = ['z', '1', 'x'];

for (let i = 0, len = arr.length; i < len; i++) {
  console.log(`${ arr[i] } | ${ obj[arr[i]] }`);
}

// z | 1
// 1 | 2
// x | 3
```

[목차로 가기](#목차)

### 객체 속성의 삭제
- 객체의 속성을 삭제하려면, `delete` 연산자를 사용한다.

```js
const person = {
  name: 'Jaewon',
};

const person2 = Object.create(person);
person2.name = 'Kim';

console.log(person2.name); // Kim

delete person2.name;

// delete 로 속성을 삭제하게 되면, 프로토타입의 속성이 나온다.
console.log(person2.name); // Jaewon
```

## 자바스크립트 함수
- 자바스크립트 함수는 lexical scope (어휘적 범위)를 가지는 일급 객체(first class object) 이다.
  - 일급 객체는 속성 및 메소드를 가질 수 있는 객체이다.
  - 다른 객체와 함수를 구별하는 것은 함수는 호출될 수 있다는 것이다.

__함수와 일급 객체__
- 자바스크립트 함수는 일급 객체로써, 함수를 주고받을 수 있으며 이로 인해, 고차 함수가 가능해진다.
- `Array` 의 메소드인 `map`, `every`, `filter`, `sort` 등을 사용할 때도 인자로 함수를 넘겨주면 배열을 편리하게 처리할 수 있다.

__화살표 함수 표현__
- 화살표 함수 표현은 ECMA Script 2015 에서 제안된 함수 표현식으로 `(...args) => { /* Statement */ }` 와 같이 사용한다.
- 화살표 함수 표현은 function 표현에 비해 구문이 짧고, 자신의 `this`, `arguments`, `super` 또는 `new.target` 을 바인딩하지 않는다.
  - 화살표 함수는 항상 익명이기 때문에 메소드 함수가 아닌 곳에 적당하며, 생성자로 사용할 수 없다.
- 아래 링크는 MDN 의 화살표 함수에 대한 링크이다.
  - [링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)

__함수와 클로저__
- 클로저는 lexical scope 로 인해 독립적인 변수를 가리키는 함수로, 클로저 안에 정의된 함수는 만들어진 환경(lexical environment) 를 기억한다.
- 아래 링크는 클로저에 대한 글이다.
  - [링크](https://github.com/wonism/TIL/tree/master/front-end/javascript/closure.md)

### 함수 객체
- (객체 리터럴로 생성되는) 일반 객체와 달리 함수는 `Function.prototype` 에 연결된다. (`Function` 은 `Object.prototype` 에 연결된다.)
- `functionName.prototype` 을 확인해보면 `Object` 가 나오는데, 이 `Object` 에는 `functionName` 함수 자체를 값으로 갖는 `constructor` 속성이 있다.
- 함수는 객체이므로, 변수나 객체, 배열에 할당할 수 있으며, 다른 함수에 전달되는 인자 혹은 함수의 반환값으로 사용할 수도 있다.

### 함수의 호출
- 함수는 호출되면, `this` 와 `arguments` 라는 매개변수를 받게 된다.
  - `this` 는 호출하는 패턴에 의해 결정된다.
  - `arguments` 는 함수가 호출될 때 전달된 모든 인자들을 담은 객체다.
    - `Array` 와 비슷하지만, `length` 속성을 제외하곤, 어떠한 `Array` 의 속성도 없다.
- 함수의 호출 방법은 네 가지가 있다. (`메소드 호출 패턴`, `함수 호출 패턴`, `생성자 호출 패턴`, `apply 호출 패턴`)
  - 각 패턴에 따라 `this` 는 다르게 초기화된다.

__메소드 호출 패턴__
- 메소드란 객체의 속성에 할당된 함수 객체를 뜻한다.
- 메소드를 호출할 때, `this` 는 메소드를 포함하는 객체에 바인딩된다. (즉, `this` 는 객체 자신이 된다.)
  - `this` 와 객체의 바인딩은 호출 시에 일어난다.
- 메소드는 `this` 를 통해 객체의 속성에 접근할 수 있다.

```js
const obj = {
  num: 1,
  addOne: function () {
    this.num++;
  },
};

console.log(obj.num); // 1

obj.addOne();

console.log(obj.num); // 2
```

__함수 호출 패턴__
- 함수가 객체의 속성이 아닌 경우에는 함수로써 호출된다.
- 함수를 이 패턴으로 호출하면, `this` 는 전역객체에 바인딩되는데, 이 특성은 언어 설계 단계에서의 실수이다.
  - 만약 설계가 제대로 됐다면, 내부 함수를 호출할 때, 이 함수의 `this` 는 외부 함수의 `this` 변수에 바인딩되어야 한다.
  - 이 요류로 인해, 메소드가 내부 함수를 사용할 때 자신의 작업을 돕지 못한다.
  - 이런 문제를 해결하기 위한 방법은 `that` 과 같은 변수를 선언하여 사용하는 것이다.

```js
const obj = {
  num: 2,
  double: function () {
    const that = this;

    const helper = () => {
      that.num *= 2;
    };

    helper();
  },
};

console.log(obj.num); // 2

obj.double();

console.log(obj.num); // 4
```

__생성자 호출 패턴__
- 함수를 `new` 연산자와 함께 사용하면, 호출한 함수의 `prototype` 속성 값에 연결되는 링크를 가진 객체가 생성되며, 이 객체는 `this` 에 바인딩된다.
- `new` 와 함께 사용되도록 만들어진 함수를 `생성자` 라고 하는데, 이 함수는 명명할 때 파스칼 케이스(PascalCase) 를 사용한다.
- 생성자를 `new` 없이 사용하면, 컴파일 시간이나 실행시간에 어떠한 경고도 없기 때문에 주의해야 한다.
  - 함수명으로 파스칼 케이스를 사용함으로써 해당 함수가 생성자임을 표시하고, 이를 사용할 때 항상 `new` 와 함께 사용해야 한다.

```js
function Person(name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

const jaewon = new Person('Jaewon');
console.log(jaewon.getName());
```

__apply 호출 패턴__
- 자바스크립트 함수는 객체이기 때문에 메소드를 가질 수 있다.
- `apply` 메소드는 함수를 호출할 때 사용할 인자들의 배열을 받으며, `this` 의 값을 사용자가 선택할 수 있게 한다.
  - `apply` 메소드의 첫 번째 인자는 `this` 에 바인딩될 값이며, 두 번째 인자는 매개변수로 쓰일 값들이 담긴 배열이다.

```js
function multiply(a, b) {
  return a * b;
}

const arr = [42, 5];
const result = multiply(null, arr);

function Person(name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

const jaewon = {
  name: 'Jaewon',
};

const name = Person.prototype.getName.apply(jaewon);
```
- 위를 보면, `jaewon` 이라는 객체는 `Person.prototype` 을 상속받지 않지만, `getName` 메소드가 `jaewon` 을 대상으로 실행하도록 할 수 있다.
