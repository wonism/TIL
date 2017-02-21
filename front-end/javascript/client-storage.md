# 클라이언트 측 저장공간
> 데이터를 브라우저에 저장함으로써 빠른 속도로 네트워크 독립적인 데이터에 접근할 수 있다.

<p>클라이언트 측에 데이터를 저장하는 방법은 다음 4 가지가 있다. (WebSQL 은 deprecate 되었다)</p>
- Cookies
- Local Storage
- Session Storage
- IndexedDB
- WebSQL (deprecated)

## Cookies
- 쿠키는 Lou Montulli 가 고안했으며, 간단한 문자열 데이터를 저장할 수 있다. 주로, 계정의 세션 관리나 사용자 정보 추적과 같은 작업에 사용된다. 또한, 클라이언트 측에만 데이터를 저장할 때 사용한다.

### 쿠키의 장점
- 서버와의 통신에 사용할 수 있다.
- 쿠키를 수동으로 삭제하지 않고, 자동으로 만료되도록 설정할 수 있다.

### 쿠키의 단점
- 작은 데이터만 저장할 수 있다.
- 문자열만 저장 가능하다.
- 보안에 취약하다.

### 쿠키의 CRUD
- Create
```js
document.cookie = 'userName=Jaewon;';
document.cookie = 'sex=male;max-age=86400000';

// Create with function
setCookie('age', 28, 1, '/');

function setCookie(cname, cvalue, cday, cpath) {
  document.cookie = `${ cname }=${ cvalue };expires=${ +new Date() + +cday * 86400000 };path=${ cpath };`;
}
```

- Read
```js
// Read all cookies
const allCookies = document.cookie;

// Read with function (get a specified cookie)
function getCookie(cname) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(/\;/);
  let keyValueArray, cvalue = '';

  cookies.forEach((el, i, arr) => {
    keyValueArray = el.trim().split(/\=/);
    if (keyValueArray[0] === cname) {
      cvalue = keyValueArray[1];
    }
  });

  return cvalue;
}
```

- Update
```js
document.cookie = 'userName=Kim';
// Update with function
// Same as creating cookie
```

- Delete
```js
document.cookie = 'userName=Kim;expires=Thu, 01 Jan 1970 00:00:01 GMT';

// Delete with function
function removeCookie(cname) {
  document.cookie = 'userName=${ cname };expires=Thu, 01 Jan 1970 00:00:01 GMT';
}
```

## Local Storage
- 로컬 저장소는 브라우저에서 `key - value` 쌍의 데이터를 저장하기 위한 API 이다. 기술적으로는 문자열만 저장할 수 있지만, `JSON.stringify()` 를 통해 복잡한 데이터를 저장할 수 있다.

### 로컬 저장소의 장점
- API 를 통해 데이터를 CRUD 하는 것이 쉽다.
- 쿠키보다 많은 데이터를 저장할 수 있으며, 보안에 더 좋다.

### 로컬 저장소의 단점
- 문자열만 저장 가능하다. (하지만, `JSON.stringify()` 등의 방법으로 어느정도 해결할 수 있다.)

### 로컬 저장소의 CRUD
- Create
```js
const user = { name: 'Jaewon', age: 28, };
localStorage.setItem('user', JSON.stringify(user));
```

- Read
```js
// Read all sets of key-value data
localStorage;

// Read a specified set of key-value data
JSON.parse(localStorage.getItem('user'));
```

- Update
```js
const updatedUser = { name: 'Kim', age: 28, };
localStorage.setItem(JSON.stringify(updatedUser));
```

- Delete
```js
localStorage.removeItem('user');
```

## Session Storage
- 세션 저장소는 로컬 저장소와 비슷하지만, 데이터가 브라우저의 탭 세션용으로 저장된다는 차이가 있다. 사용자가 탭을 닫으면 데이터가 지워진다.

### 세션 저장소의 장점
- 로컬 저장소와 동일하다.

### 세션 저장소의 단점
- 로컬 저장소와 동일하다.

### 세션 저장소의 CRUD
- Create
```js
const user = { name: 'Jaewon', age: 28, };
sessionStorage.setItem('user', JSON.stringify(user));
```

- Read
```js
// Read all sets of key-value data
sessionStorage;

// Read a specified set of key-value data
JSON.parse(sessionStorage.getItem('user'));
```

- Update
```js
const updatedUser = { name: 'Kim', age: 28, };
sessionStorage.setItem(JSON.stringify(updatedUser));
```

- Delete
```js
sessionStorage.removeItem('user');
```

## IndexedDB
- IndexedDB 는 브라우저에 많은 양의 구조화된 데이터를 영구적으로 저장할 수 있으며, 네트워크 상태에 상관없이 여러 기능을 사용할 수 있다.
- (IndexedDB 를 사용하다보면 IDBRequest 로 인해 사용하기 불편한데, Promise 로 구현된 https://www.npmjs.com/package/idb 패키지를 사용하면, 훨씬 쉽게 사용할 수 있다.)

### IndexedDB 의 장점
- 복잡하고 구조화된 데이터를 처리할 수 있다.

### IndexedDB 의 단점
- 사용하기가 복잡하다.

### Pre-work
- Creating or updating the version of the database
  - 데이터에 액세스하기 위해서는 먼저 데이터베이스를 열어야 한다.
  - `onupgradeneeded` 는 데이터베이스의 구조를 변경할 수 있는 유일한 곳이다.
```js
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
  alert('Your browser doesn\'t support IndexedDB.');
}
```

```js
const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com', },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org', }
];

let idb;
const request = window.indexedDB.open('TestIDB', 2);
// IndexedDB has only open() method. (2nd parameter is `version`. Only integer number.)
// This method open database or create database if not exist.
// If success to open database, It returns IDBOpenDBRequest.

request.onerror = function (event) {
  // Do something
};

request.onsuccess = function (event) {
  idb = request.result;
  // Do something
};

request.onupgradeneeded = function (event) {
  const idb = event.target.result;

  const objectStore = idb.createObjectStore('customers', { keyPath: 'ssn', });

  objectStore.createIndex('name', 'name', { unique: false,  });
  objectStore.createIndex('email', 'email', { unique: true, });

  for (let i in customerData) {
    objectStore.add(customerData[i]);
  }
};

// Delete the database
// window.indexedDB.deleteDatabase('TestIDB');
```

### IndexedDB 의 CRUD
- Create (or Update)
```js
const otherCustomerData = [
  { ssn: '111-11-1111', name: 'John', age: 24, email: 'john@doe.com', },
  { ssn: '222-22-2222', name: 'Jane', age: 24, email: 'jane@doe.com', },
];

let transaction = idb.transaction(['customers'], 'readwrite');

transaction.oncomplete = function (event) {
  alert('Transaction is done!');
};

transaction.onerror = function (event) {
  alert('Transaction is failed.');
};

let objectStore = transaction.objectStore('customers');

// Insert sets of data
for (let i in otherCustomerData) {
  const createRequest = objectStore.add(otherCustomerData[i]);
  createRequest.onsuccess = function (event) {
    // event.target.result === otherCustomerData[i].ssn;
  };
}
```

- Read
```js
transaction = idb.transaction(['customers']);
objectStore = transaction.objectStore('customers');
const readRequest = objectStore.get('444-44-4444');

readRequest.onerror = function (event) {
  // Handle errors
};

readRequest.onsuccess = function (event) {
  // Do something with request.result
  alert(`Name for SSN 444-44-4444 is ${ request.result.name }`);
};
```

- Delete
```js
const deleteRequest = idb.transaction(['customers'], 'readwrite')
    .objectStore('customers')
    .delete('444-44-4444');

deleteRequest.onsuccess = function (event) {
  // Deleted
};
```

