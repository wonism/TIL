# Java Script Promise
> Promise 는 ECMA Script 2015 스펙에 정의됐으며, 비동기 연산을 위해 사용된다. `아직은 아니지만 나중에 완료될 것으로 기대되는 연산`을 표현한다.

## 배경
<p>브라우저나 Node.js 기반의 웹서버는 많은 작업을 동시에 처리한다. 하지만 자바 스크립트는 싱글 스레드 기반의 언어로 동시에 하나의 작업만을 처리할 수 있다.<br />이는 바로 이벤트 루프를 통해 작업을 동시에 처리하는 것처럼 보이게 하는 것이다.<br />`Promise` 패턴이 나오기 전까지는 콜백을 통해 동시성 문제를 해결했다.<br />콜백은 함수의 인자에 `함수의 특정 선언문(statement) 가 끝난 뒤에 실행하고자 하는 함수(콜백 함수)` 를 넘기는 방식이다.</p>

- 샘플 코드
```js
function doSomething(callbackFunc) {
  /* ... */
  callbackFunc();
}

function callbackFunc() {
  /* ... */
}
```

<p>이러한 방식으로 코드를 작성하다보면 콜백 함수의 인자로 또 다른 콜백 함수를 넘기는 등의 작업을 하다보면 심하게 중첩이 된다. 하지만, Promise 를 사용함으로써, 이러한 문제를 해결할 수 있다. (코드를 구조적으로 작성할 수 있게 된다.)</p>

## Promise vs Callback
1. 콜백은 함수이며, 프로미스틑 객체이다.
  - 콜백은 이벤트에 응답하여 실행할 수 있는 코드 블록으로 모든 함수는 콜백이 될 수 있다.
  - 프로미스는 어떠한 작업이 일어났는지 아닌지에 대한 정보를 저장하는 객체이며, 작업이 일어난 경우 그 결과가 무엇인지 나타낸다.
2. 콜백은 인자로 전달되며, 프로미스는 반환된다.
  - 콜백은 호출된 함수와는 별개로 정의되며, 다른 함수의 인자로써 전달된다.
  - 프로미스는 비동기 함수 내부에서 생성된 다음 반환된다.
3. 콜백은 성공과 실패를 처리하고, 프로미스는 아무것도 처리하지 않는다.
  - 콜백은 작업이 성공했는지 실패했는지 여부와 함께 호출되며, 두 시나리오를 모두 처리해야한다. 또한, 두 시나리오에 대한 인자를 항상 받아야 한다.
  - 프로미스는 기본적으로 아무것도 처리되지 않는다. 성공 및 실패는 `.then()` 이나 `.catch()` 메소드 등을 통해 나중에 처리된다.
4. 콜백은 여러 이벤트를 나타낼 수 있고, 프로미스는 최대 하나의 이벤트를 나타낼 수 있다.
  - 콜백은 전달된 함수에 의해 여러 번 호출될 수 있다.
  - 프로미스는 하나의 이벤트만 나타낼 수 있다.

## Promise 의 장점
- 앞서 설명한 바와 같이 코드를 구조적으로 작성할 수 있다. (Callback hell 문제 해결)
- 에러 처리와 관련된 인자를 모든 함수에 넘겨야하는 콜백 방식에 비하면 Promise 의 에러 처리 방식은 단순하다.

## 구문
```js
new Promise(function (resolve, reject) { /* ... */ });
```

- `resolve` 는 완료되었을 때 실행하는 함수이고, `reject` 는 실패했을 때 실행하는 함수이다.

## 사용 예
- `getNow` 라는 함수가 있다. 서버에 요청을 보내고 응답을 받는 일정 시간이 걸리는 것처럼 시간을 가져오는 시간(term)이 오래 걸린다고 가정한다.

```js
const now = getNow();

console.log(`The current time is ${ now }`);

function getNow() {
  return setTimeout(() => {
    return new Date();
  }, 2000);
}
```

- 위 코드를 실행해보면, `console.log` 는 현재 시간이 아닌 `타임아웃 handler 의 ID` 를 찍고있다.

__Implementation with callback__

- 이를 해결하기 위해, `callback` 을 이용하여, 정상작동하도록 코드를 작성하면 아래와 같다.

```js
getNow((now) => {
  console.log(`The current time is ${ now }`);
});

function getNow(cb) {
  return setTimeout(() => {
    const now = new Date();
    cb(now);
  }, 2000);
}
```

- 현재 시간을 구하는 데 걸리는 시간 2초가 지난 뒤, `The current time is Mon Dec 27 2016 18:51:41 GMT+0900 (KST)` 와 같이 로그가 찍힌다.
- 하지만, 중간에 오류가 있으면, 오류를 파악하고 재시도 하거나, 오류 상태를 나타내는 등의 동작은 하지 않는다.

__success callback / failure callback & nested callback__

```js
getNow((now) => {
  success(now);
}, (err) => {
  failure(err);
});

getNow((now) => {
  console.log('It will execute nested function.');
  getNow((nestedNow) => {
    success(nestedNow);
  }, (nestedError) => {
    console.error('Nested Error occured.');
    failure(nestedError);
  });
}, (err) => {
  failure(err);
});

function success(now) {
  console.log(`The current time is ${ now }`);
}

function failure(err) {
  console.warn('Unknown error occured! It will try again automatically.');

  getNow((now) => {
    success(now);
  }, (err) => {
    failure(err);
  });
}

function getNow(onSuccess, onFailure) {
  return setTimeout(() => {
    const didSucceed = Math.random() >= 0.5;

    if (didSucceed) {
      const now = new Date();
      resolve(now);
    } else {
      reject('Unknown Error');
    }
  }, 2000);
}
```

- 성공과 실패 여부에 따라 처리할 연산을 기술함으로써, 에러가 발생했을 때도 유연하게 대처할 수 있게 되었다.
- 하지만, 이런 방식으로 비동기를 처리하면 코드가 지저분해질 수 있다.
  - 위에 예에서는 함수를 2 개만 중첩했지만, 함수를 여러 개 중첩해서 사용한다면 코드를 알아보는 것은 더욱 힘들어질 것이다.

__Implementation with Promise__

```js
getNow()
  .then(now => getNow())
  .then(now => {
    success(now);
  })
  .catch(err => {
    failure(err);
  });

function success(now) {
  console.log(`The current time is ${ now }`);
}

function failure(err) {
  console.warn('Unknown error occured! It will try again automatically.');

  getNow()
    .then(now => {
      success(now);
    })
    .catch(err => {
      failure(err);
    });
}

function getNow() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const didSucceed = Math.random() >= 0.5;
      if (didSucceed) {
        const now = new Date();
        resolve(now);
      } else {
        reject('Unknown Error');
      }
    }, 2000);
  });
}
```

- `promise chain` 을 통해 연산이 차례로 호출된다.
- 성공에 대한 값을 사용하기 위해선, `Promise` 객체의 `.then()` 메소드를 사용한다.
  - `then()` 에 대한 각 호출은 이전의 `.then()` 의 반환 값으로 호출된다.
  - 예를 들면, 다음과 같이 사용할 수 있다.

```js
getNow()
  .then(now => getNow())
  .then(now => `The current time is ${ now }`)
  .then(msg => {
    // msg : The current time is Mon Dec 27 2016 18:51:41 GMT+0900 (KST)
    console.log(msg);
  })
  .catch(err => {
    failure(err);
  });
```

- `promise chain` 에서 (`promise chain` 의 어디에서나) 발생하는 오류를 처리하기 위해서는 `catch()` 메소드를 사용한다.

## Promise 의 상태
- `Promise` 는 3 가지 상태가 있으며, 한 번에 한 가지의 상태 값을 취한다.
  - `pending` : `Promise` 를 이행하기 이전 상태로, `pending` 상태의 `Promise` 는 `fulfilled` 또는 `rejected` 상태로 이어진다.
  - `fulfilled` (`resolved`) : `Promise` 가 이행된 상태
  - `rejected` (`error`) : `Promise` 가 이행되지 못한 상태
  - `fulfilled` 와 `rejected` 상태를 `settled` 라고 한다.

## 참조
- [MDN : Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)

