- [implement bind method](https://github.com/wonism/TIL/tree/master/front-end/javascript/bind-implementation.md)

# Bind 메소드 간단 구현하기
<p>`bind`메소드에 대해 좀 더 이해를 해보고자 작성한 글입니다.<br />동작만 하게끔 구현한 것이라 100% 올바르게 `bind` 구현을 했다고 보긴 어려울 겁니다.</p>

1. 뼈대 : `Function.prototype.bind()`메소드는 인자로 넘겨받은 객체를 `this`로 하는 함수를 반환한다.
  - 즉, `bind`메소드는 함수를 리턴하게 된다.
```js
Function.prototype.bind = function (obj) {
  /* ... */
  return function () {
    /* ... */
  };
};
```
2. 구현 : `bind`메소드는 어떤 함수(`function A() {}`)가 가리키는 `this`를 원하는 객체로 변환할 때 사용된다.
  - 즉, `A`를 실행할 때, 이 함수의 `this`를 원하는 객체로 변환하기 위해 `apply`메소드를 사용하며, 첫 번째 인자로 `bind`의 인자를 전달해준다.
  - 이 때, 인자가 넘어오지 않으면, `A` 내부의 `this`를 사용하도록 한다.
```js
Function.prototype.bind = (function (obj) {
  if (!obj) {
    return this;
  }

  var that = this;
  return function () {
    return that.apply(obj, arguments);
  };
});
```

