# Private Members in JavaScript
- 자바스크립트는 기본적으로 접근 수정자(public, private, protected)를 제공하지 않으며, 객체의 속성은 모두 public하다.
- 자바스크립트에서 private한 속성을 만들기 위해서는 `this`를 통해 속성을 부여하지 않고, 함수 안에서 지역변수 혹은 메소드를 선언한다.

## private 변수 구현
```js
function Container(param) {
  /* public variables */
  this.publicVar = 42;

  /* private variables */
  var privateVar = 5;
  var that = this;

  /* public methods */
  this.publicMethod = function () {
    return this.publicVar;
  };

  /* privileged methods */
  this.privilegedMethod = function () {
    return privateMethod();
  };

  /* private methods */
  var privateMethod = function () {
    return privateVar;
  };
}
```
- 이 생성자는 `param`, `privateVar`, `that`, `privateMethod` 이 4개의 private 멤버를 만든다.
  - 이들은 객체안에 포함되지만, 외부에서 액세스할 수 없다.
```js
const container = new Container();

console.log(container.privateVar); // undefined
console.log(container.that); // undefined
console.log(container.publicVar); // 42

// console.log(container.privateMethod()); // throw error
console.log(container.publicMethod()); // 42
console.log(container.privilegedMethod()); // 5
```
- `private` 메소드에 접근하기 위해서는 `privileged`메소드를 사용한다. 이는 구현 방법은 `public`메소드와 같다.

## 참조
- [더글라스 크락포드 블로그 : Private Members in JavaScript](http://javascript.crockford.com/private.html)

