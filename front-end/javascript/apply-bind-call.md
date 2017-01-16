# Apply, Bind, Call
> `.apply()`, `.bind()`, `.call()` 는 일급 객체인 `Function` 의 메소드로 함수에 `this` 를 바꿔준다. (즉, 이 메소드들을 통해 호출된 함수의 스코프를 변경하는 것과 같다.)

__Apply__
- `.apply()` 메소드는 주어진 `this` 값과 `arguments 혹은 array` 로 함수를 호출한다. (`arguments` 는 유사배열 객체로 `.length` 등의 property 가 있다.)

```js
function personContainer() {
  const person = {
    personName: 'Jaewon',
    say: function() {
      return `${ this.personName } says ${ arguments[1] }`;
    },
  };

  person.say.apply(person, arguments); // arguments[0] : Hi, arguments[1] : Hello
}

personContainer('Hi', 'Hello'); // Jaewon says Hello
```

__Call__
- `.apply()` 와 유사하지만, `.call()` 은 (유사)배열 대신, 값들을 하나하나 전달하여 함수를 호출한다.

```js
const ghost = {
  personName: 'unknown',
};

const person = {
  personName: 'Jaewon',
  say: function (str) {
    return `${ this.personName } says ${ str }.`;
  },
};

person.say.call(ghost, 'Hello'); // 'unknown says Hello.'
person.say.call(person, 'Hello'); // 'Jaewon says Hello.'
```

__Bind__
- `.bind()` 는 호출될 때 인자로 전달된 객체를 `this` 로 하는 함수를 반환한다. (함수가 가리키는 `this` 를 바꾼다고 봐도 된다.)
  - 함수 안에서 `this` 는 해당 함수를 호출한 객체이다.

```js
const num = 42;
const obj = { num: 5, };

function power() {
  return num ** 2;
}

power(); // 1764
power.bind(obj)(); // 25
```

- 아래 예제에서는 객체의 메소드를 일반 함수로 추출한 뒤, 이 함수의 실행 컨텍스트를 알아볼 수 있는 코드다.

```js
const person = {
  personName: 'Jaewon',
  say: function (str) {
    console.log(typeof this.personName, this.personName, this);
    return `${ this.personName } says ${ str }.`;
  },
};

const func = person.say;
func('Hello'); // 'undefined says Hello'

const func2 = person.say.bind(person);
func2('Hello'); // 'Jaewon says Hello'
```

  - `func` 의 `this` 는 `window` 이기 때문에 `this.personName` 은 `undefined` 이다.

- `.bind()` 의 폴리필

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to
be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
```

## 참고
- MDN
  - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
  - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/call
  - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

