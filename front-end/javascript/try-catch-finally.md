# finally in try/catch statement
- `try/catch`문의 `finally`는 실제로 모든 일을 처리한다.

```js
function f() {
  try {
    return 'A';
  } finally {
    return 'B';
  }
}

f(); // B
```
- 위 함수의 실행 결과는 `B`이다.
- `finally` 블록이 값을 반환하면, `try/catch` 블록의 `return`문은 무시되고, `try/catch/finally` 전체의 반환값은 `finally`블록의 반환값이 된다.
- `finally` 블록이 값을 반환하면, 이뿐만 아니라, `catch`의 예외까지 무시한다.
```js
function g() {
  try {
    throw new Error('Foo');
  } catch( e ) {
    return 'A';
  } finally {
    return 'B';
  }
}

g(); // B
```

```js
function h() {
  try {
    throw new Error('Foo');
  } finally {
  }
}

h();
// Uncaught Error: Foo
```

```js
function i() {
  try {
    throw new Error('Foo');
  } finally {
    return 'B';
  }
}

i(); // B
// It does not throw exception
```

```js
function j() {
  try {
    throw new Error('Foo');
  } catch( e ) {
    throw new Error('Bar');
    return 'A';
  } finally {
  }
}

j();
// Uncaught Error: Bar
```

```js
function k() {
  try {
    throw new Error('Foo');
  } catch( e ) {
    throw new Error('Bar');
    return 'A';
  } finally {
  }
}

k(); // B
// It does not throw exception
```
