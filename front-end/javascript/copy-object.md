# JavaScript 에서 Object 복사하기

## Object 복사하기
<p>다음과 같은 방식으로 Object 를 복사하면, 객체를 참조하는 복사가 된다.</p>

```js
var foo = { key: 'Copy an Object !' };
var bar = foo;
```

<p>예제를 통해 얕은 복사 (Shallow Copy), 깊은 복사(Deep Copy) 를 구현하고자 한다.</p>

```js
/***** Shallow Copy *****/
function copyObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  } else {
    var copiedObj = obj.constructor();

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        copiedObj[prop] = obj[prop];
      }
    }

    return copiedObj;
  }
}

var foo = { key: 'value' };
var bar = copyObject(foo);

foo.key = 'other value';

console.log(foo); // Object {key: "value"}
console.log(bar); // Object {key: "other value"}
```

<p>위와 같이, 인자가 null 이 아닌 객체일 경우, constructor() 메소드로 해당 객체와 똑같은 객체를 생성한다.<br />그리고, hasOwnProperty() 메소드로 해당 객체가 인자로 넘긴 프로퍼티를 가지고 있는지 체크하고, 이에 맞는 프로퍼티에 같은 값을 할당한다.<br />lodash (혹은 underscore) 로는 더욱 간단히 구현할 수 있다.</p>

```js
/***** Shallow Copy - with lodash *****/
var foo = { key: 'value' };
var bar = _.clone(foo);

foo.key = 'other value';

console.log(foo); // Object {key: "value"}
console.log(bar); // Object {key: "other value"}
```
```js
/***** Deep Copy *****/
function copyObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  } else {
    var copiedObj = obj.constructor();

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        copy[prop] = copyObject(obj[prop]);
      }
    }

    return copiedObj;
  }
}

var foo = {
  deep: {
    key: 'value'
  },
  shallow: false
};

var bar = copyObject(foo);
foo.deep.key = 'other value';

console.log(foo); // Object {deep: Object, shallow: false} * foo.deep.key = 'ohter value'
console.log(bar); // Object {deep: Object, shallow: false} * bar.deep.key = 'value'
```

