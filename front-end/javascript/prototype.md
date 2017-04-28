# Prototype
<p>프로토타입 기반 언어에서 프로토타입은 객체 원형을 통해 새로운 객체를 만들 수 있도록 해주며, 객체지향적인 개발을 하기 위해 꼭 필요한 기능이다.</p>

* 생성자 함수와 프로토타입
new 키워드와 함께 호출하면, this 가 새로운 객체(해당 함수)에
바인딩된다.
  생성자 함수의 프로토타입 속성에 다른 생성자 함수를 new 키워드와 함께 호출하면, 해당 생성자 함수를 상속받게 된다.
프로토타입에 기반한 패턴에서는 Object의 create 메소드를 통해 인스턴스를 생성한다.
  자동적으로 Object.create의 파라미터로 넘어온 객체를 상속받게 된다.

## 함수 멤버인 Prototype
- 함수에는 `prototype`이라는 속성이 있으며, `prototype`속성은 다른 곳에 생성된 함수이름의 프로토타입 객체를 참조한다. (이때, `prototype`속성이 참조하는 프로토타입 객체는 `new`연산자를 통해 생성된 모든 인스턴스의 원형이 되는 객체이다.) 또, 이 프로토타입 객체의 `constructor`속성은 함수를 참조한다.
  - 자바스크립트에서 함수 객체가 만들어질 때, 아래와 같은 코드가 내부적으로 실행된다.
```js
this.prototype = { constructor: this, };`
```
- 객체 리터럴로 생성되는 객체는 자바스크립트 표준 객체인 `Object.prototype`객체에 연결된다.
```js
const obj = { a: 1, };
// obj -----> Object.prototype -----> null
// obj.__proto__.__proto === null

const arr = [1, 2, 3];
// arr -----> Array.prototype -----> Object.prototype -----> null
// arr.__proto__.__proto__.__proto === null

const func = function () { /* ... */ };
// func -----> Function.prototype -----> Object.prototype -----> null
// func.__proto__.__proto__.__proto === null
```
- `function A() { /* ... */ }`라는 함수가 있을 때, `A.prototype`을 보면 다음과 같은 구조를 확인할 수 있다.
```js
function A() {
  /* ... */
}
```
<p align="center"><img src="https://github.com/wonism/TIL/blob/master/front-end/javascript/img/prototype-property.jpg" width="674" height="891" align="center" /></p>
- `new`연산자와 `A()`를 통해 생성된 객체의 `__proto__` 속성은 `A`의 프로토타입 객체를 가리킨다.
  - `__proto__`속성은 비표준 속성으로, 객체가 만들어지기 위해 사용된 (인스턴스의 원형이 되는) 프로토타입 객체를 숨은 링크로 참조한다.
```js
const a1 = new A();
const a2 = new A();
```
<p align="center"><img src="https://github.com/wonism/TIL/blob/master/front-end/javascript/img/prototype-in-instance.jpg" width="509" height="425" align="center" /></p>

## 프로토타입 체인
- `prototype`속성은 프로토타입에 대해 `null`이 아닌 암시적 참조를 가지는데, 상속 관계를 통해 상위 프로토타입에 연쇄적으로 이어지는 관계(이 연결은 `__proto__`를 따라 올라가게 된다.)를 프로토타입 체인이라고 한다.
  - `new`연산자를 통해 만들어진 인스턴스들의 `__proto__`를 따라 올라가다보면, 최종적으론 `Object.Prototype`에 이르는 것을 볼 수 있다.
    - 즉, 자바스크립트의 모든 객체는 `Object`객체로부터 파생된다.
<p align="center"><img src="https://github.com/wonism/TIL/blob/master/front-end/javascript/img/instances-prototype.jpg" width="933" height="647" align="center" /></p>
- 프로토타입 체인은 하위 객체에서 상위 객체의 프로퍼티와 메소드를 상속받는다.
  - 동일한 이름의 프로퍼티 혹은 메소드를 재정의하지 않는 이상 상위 객체에서 정의한 내용을 그대로 공유받게 된다.
```js
A.prototype.method = function () { /* ... */ };

console.log(A.prototype.hasOwnProperty('method')); // true
console.log(a1.hasOwnProperty('method')); // false
```
  - 이 때, 프로토타입 객체를 기반으로 만들어진 인스턴스에는 상위 객체의 프로퍼티 혹은 메소드를 직접 소유하지 않는다.
```js
A.prototype.method = function () { /* ... */ };

console.log(A.prototype.hasOwnProperty('method')); // true
console.log(a1.hasOwnProperty('method')); // false
```
  - 또한, 상위 객체의 프로퍼티 혹은 메소드가 재정의될 때에도 해당 프로퍼티 혹은 메소드를 그대로 공유받는 다른 것을 알 수 있다.
```js
A.prototype.logging = function () { console.log('Logging - 1'); };
a1.logging(); // Logging - 1

A.prototype.logging = function () { console.log('Logging - 1'); };
a1.logging(); // Logging - 2
```
__this를 통한 속성과 상속__
- 다음과 같은 코드가 있다고 가정한다.
```js
function B() {
  this.method = function () {
    console.log('Method - 1');
  };
  /* ... */
}

B.method = function () {
  console.log('Method - 2');
};

const b1 = new B();
b1.method(); // Method - 1

function C() { /* ... */ }

C.prototype.method = function () {
  console.log('Method - 3');
};

C.method = function() {
  console.log('Method - 4');
};

const c1 = new C();
c1.method(); // Method - 3
```
- 실행 결과를 살펴보면,
  - `b1.method();` 호출 시, `Method - 1`가 출력되는 것을 볼 수 있다.
    - `B.prototype`은 `B`가 정의될 때 당시의 정보만을 가지고 있기 때문에 `B.method`를 수정해도, `B.prototype`은 변경되지 않는다.
  - `c1.method();` 호출 시, `Method - 3`가 출력되는 것을 볼 수 있다.
    - `C.prototype.method`를 직접 수정하면, `C.prototype`가 변경되기 때문이다.
- 그리고, 위에서는 프로퍼티 혹은 메소드를 공유받는다고 했지만, `this`를 통해 정의된 프로퍼티 혹은 메소드는 공유가 아닌 상속을 받게 된다.
```js
console.log(b1.hasOwnProperty('method')); // true
console.log(c1.hasOwnProperty('method')); // false
```

__delegation__
- 객체에서 어떤 속성을 찾을 때, 해당 객체에 그 속성이 없으면, 프로토타입 체인을 통해 상위 객체에서 이 속성을 찾게 되는데, 이를 `위임(delegation)`이라고 한다.
  - 최상위(`Object.prototype`)에서도 값을 찾지 못하면, `undefined`이다.
```js
console.log(typeof a1.logging); // function
console.log(typeof a1.hasOwnProperty); // function
console.log(typeof a1.undefinedProperty); // undefined
```

## 상속
- 다음 [링크](https://github.com/wonism/TIL/blob/master/front-end/javascript/object-and-function.md#%EC%83%81%EC%86%8D)를 참조한다.

## 참조
- [Nextree : JavaScript : 프로토타입(prototype) 이해](http://www.nextree.co.kr/p7323/)
- [Insanehong : Javascript 기초 - Object prototype 이해하기](http://insanehong.kr/post/javascript-prototype/)

