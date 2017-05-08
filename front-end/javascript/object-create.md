# Object.create 메소드
- `Object.create(obj, properties)`는 주로 객체를 상속하기 위해 사용하는 메소드이다.
  - 첫 번째 인자를 상속하게 되며, 두 번째 인자의 속성을 추가적으로 가지게 된다.
```js
// 상위 클래스
function Vehicle(name) {
  this.name = name;
}

// 상위 클래스 메소드
Vehicle.prototype.move = function () {
  console.log(`${ this.name } moved.`);
};

// 하위 클래스
function Car(name, color) {
  // 상위 클래스 생성자 호출
  Vehicle.call(this, name);

  // 하위 클래스의 속성 지정
  this.color = color;
}

// Object.create()를 사용하여 Car 프로토타입을 확장
//   두 프로토타입을 서로 연결하여 단일 프로토타입 체인을 만든다.
Car.prototype = Object.create(Vehicle.prototype, {
  fuel: {
    value: 'gasoline',
  },
});
Car.prototype.constructor = Vehicle;

// Car 객체 생성
var myCar = new Car('A8', 'blue');
myCar.move(); // A8 moved.
console.log(myCar.fuel); // gasoline
```

## new Constructor()와의 비교
- `Object.create()`와 `new Constructor()`는 꽤 비슷하지만, 다른 점이 있다. 다음은 이 둘의 차이를 보여주는 예제다.
  - 위 코드를 실행하면, `obj`에서만 로그가 찍히게 된다. 즉, 함수가 생성자로 사용된다.
```js
function Foo() {
  this.bar = 42;

  console.log('Foo constructor will not executed by Object.create');
}

Foo.prototype.method = function () {};

var obj = new Foo(); // Foo constructor will not executed by Object.create
var obj2 = Object.create(Foo.prototype);

console.log(typeof obj.method); // function
console.log(typeof obj2.method); // function

console.log(obj.bar); // 42
console.log(obj2.bar); // undefined
```
- 성능 상으로도 `new Constructor()`를 사용하는 것이 좋다.
```js
// Testing in Chrome 58 / Mac OS X 10.12
function Obj() {
  this.p = 1;
}

var propObj = {
  p: 1,
};

console.time('Object.create()');
var obj;
for (let i = 0; i < 10000; i++) {
  obj = Object.create(propObj);
}
console.timeEnd('Object.create()');
// Object.create(): 4.38916015625ms

console.time('constructor function');
var obj2;
for (let i = 0; i < 10000; i++) {
  obj2 = new Obj();
}
console.timeEnd('constructor function');
// constructor function: 2.379150390625ms
```

## Object.create의 간단 구현
```js
Object.create = (function () {
  function Temp() {};

  return function (prototype, propertiesObject) {
    // 첫 번째 인자를 상속하게 한다.
    Temp.prototype = prototype || {};

    if (propertiesObject) {
      // 두 번째 인자를 통해 속성을 정의한다.
      Object.defineProperties(Temp.prototype, propertiesObject);
    }

    return new Temp();
  };
})();

var obj = Object.create(SomeConstructor);
```

