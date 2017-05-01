# module.exports와 exports
- `module`은 `exports`속성이 있는 자바스크립트 객체이다.
- `exports`는 보통 `module.exports`로 설정되는 일반적인 자바스크립트 변수이다.
- `exports.a = 42;`와 같이 `exports`의 속성을 설정하면, `module.exports.a`도 설정이 된다. 자바스크립트에서 객체가 참조로 전달되기 때문이다.
  - 즉, `exports`와 `module.exports`는 같은 객체이다.
  - 이외에도 `this`와 `exports`도 같은 객체이다.
```js
/***** math.js *****/
// module.exports
module.exports.add = function (a, b) {
  return a + b;
};

// exports
exports.add = function (a, b) {
  return a + b;
};

// this
this.add = function (a, b) {
  return a + b;
};
```
```js
/***** index.js *****/
var math = require('./math');
console.log(math.add(42, 5)); // 47
```

