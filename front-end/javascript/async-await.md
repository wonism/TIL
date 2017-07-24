# Async & Await
- `aync`와 `await`는 비동기 코드를 작업하기 위한 방법으로 [`TypeScript 1.7`에서 처음 제안](https://blogs.msdn.microsoft.com/typescript/2015/11/30/announcing-typescript-1-7/)되었다.
  - 공식적으로는 `ES2018` 스펙에 포함된다.
- `async`/`await`는 `Promise`위에 구축되었으며, 기존의 모든 `Promise`기반 API와 호환된다.
  - `Promise`와 같이 사용되거나 `Promise`를 대체할 수 있다.
- 비동기 동작을 위한 동기식 구문을 제공하며, 코드 가독성을 높일 수 있다.
- 에러 핸들링을 위해 `try`/`catch`구문을 사용할 수 있다.

## Async
```js
/* syntax */
async function functionName() {
  /* body */
}
```
- 일반적인 함수를 자동으로 `Promise` 형태로 만든다.
- `async` 함수를 호출할 때 해당 함수가 무엇을 반환하든 `resolve`된다.
- `async` 함수는 `await`의 사용을 가능하게 한다.

## Await
```
/* syntax */
const resultOfFunction = await functionName();
```
- `Promise` 객체와 작동한다.
- `Promise` 호출 앞에 놓이면, 나머지 코드는 `Promise`가 끝나고 결과를 반환할 때까지 기다린다.
- `await`은 비동기 함수에서만 사용할 수 있다.

## Example
```js
/* Promise object */
function getJsonFromServer() {
  return new Promise(function (resolve) {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(res => resolve(res));
  });
}

getJsonFromServer().then((res) => {
  // Do something with `res`
});

/* async function */
async function getJsonAsyncFromServer() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1');

  return res;
}
```

## Handle Error with Async/Await
- `try`/`catch` 블록으로 감싸거나,
```js
async function doSomethingAsync(){
  try {
    const res = await someAsyncCall();
    return res;
  } catch(error) {
    /* error handling */
  }
}
```
- `Promise`의 `catch`를 사용한다.
```js
async function doSomethingAsync(){
  const res = await someAsyncCall();
  return res;
}

doSomethingAsync()
  .then(function () {
    /* success handling */
  })
  .catch(function () {
    /* error handling */
  });
```

## Case that can't replace with Promise
- `Promise.all`과 같은 경우를 대체할 수 없다.
```js
function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(function () {
    resolve(ms);
  }, ms));
}

(async function awaitAyncFunctions() {
  const start = Date.now();

  await sleep(1000);
  await sleep(3000);
  await sleep(2000);

  const end = Date.now();

  console.log(`execution time is ${Math.round((end - start) / 1000)}seconds.`);
  // execution time is 6seconds.
})();

(async function awaitAyncFunctions() {
  const start = Date.now();

  const results = await Promise.all([sleep(1000), sleep(3000), sleep(2000)]);

  const end = Date.now();

  console.log(`execution time is ${Math.round((end - start) / 1000)}seconds.`);
  // execution time is 3seconds.
})();
```
- 모든 비동기 호출이 끝날 때까지 기다려야 하는 경우, `Promise.all`을 사용하는 것이 훨씬 좋다.

## Reference
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
