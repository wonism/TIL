# Java Script Promise
> Promise 는 ECMA Script 2015 스펙에 정의됐으며, 비동기 연산을 위해 사용된다. `아직은 아니지만 나중에 완료될 것으로 기대되는 연산`을 표현한다.

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

