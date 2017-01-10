# GraphQL with Node.JS

## 개발환경
- OS : OS X 10.12
- Node.JS : 7.4.0
- NPM : 3.10.3
- Java Script : ECMA-2015
- Transpiler : Babel

## 간단한 예제
### graphql 설치
```sh
$ yarn add graphql
# or..
$ npm i -S graphql
```

### Transpile
__install babel & presets__
```
$ yarn add --dev babel-loader babel-core babel-preset-es2015
```

__.babelrc__
```
{
  "presets": ["es2015"]
}
```

__Command__
```
$ babel -w server --out-dir build
```

### 코드 작성하기
<p>GraphQL 쿼리를 다루기 위해선, 쿼리 유형을 정의하는 스키마가 필요하다.<br />그리고, API 의 각 엔드포인트에 `resolver` 라는 함수를 제공하는 `root` 가 필요하다.</p>
```js
import { graphql, buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return 'Hello World!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

__실행__
```sh
$ node build/index.js

# result is..
{ data: { hello: 'Hello World!' } }
```

## Express 에서 GraphQL 사용하기
__패키지 설치__
```sh
$ yarn add express express-graphql path
$ yarn add --dev nodemon
# or..
$ npm i -S express express-graphql path
$ npm i -D nodemon
```

### 코드 작성하기
Express 로 API 서버를 만든다. graphql 함수로 직접 쿼리를 실행하는 대신 `express-graphql` 을 사용하여, `/graphql` 엔드포인트에 마운트할 수 있다.

__server/index.js__
```js
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
	type Query {
		hello: String
	}
`);

const root = {
	hello() {
		return 'Hello World!';
	}
};

const app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
  graphiql: process.env.NODE_ENV === 'production' ? false : true,
}));

app.listen(4000);
```
- API 응답 객체의 유형을 지정하는 데 필요한 것은 GraphQL 스키마 언어이며, `buildSchema` 함수의 인자로 넘겨진다.
- `graphiql` 속성은 서버 디버깅 및 검사를 위한 도구로 개발 모드로 실행 시 `true` 로 값을 주어 실행하는 것이 좋다.

__npm scripts(package.json)__
```js
...
  "scripts": {
    "build": "babel -w server --out-dir build",
    "start": "NODE_ENV=development nodemon build/index.js"
  },
...
```

__실행__
```sh
$ npm start
# access localhost:4000/graphql
```

### 클라이언트에서 API 요청하기
<p>`localhost:4000/` 에 접근했을 시, API 요청을 하는 버튼을 렌더링하도록 한다.<br />먼저, `server/index.js` 를 수정한 뒤, html 파일을 작성한다.</p>
__server/index.js__
```js
/* ... */
import path from 'path';
/* ... */
app.use(express.static(path.join(__dirname, '..', 'public')));
/* ... */
```

```sh
$ mkdir public
$ touch public/index.html
```

__public/index.html__
```html
<!DOCTYPE html>
<html>
<head>
  <title>GraphQL tutorial</title>
</head>
<body>
  <input id="send-request" type="button" value="send request.." />
  <script>
    const button = document.getElementById('send-request');

    button.addEventListener('click', () => {
      const xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.open("POST", "/graphql");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onload = () => {
        const result = xhr.response;

        alert(`Fetched data is.. ${ result.data.hello }`);
      };
      xhr.send(JSON.stringify({ query: "{ hello }", }));
    });
  </script>
</body>
</html>
```

### 좀 더 복잡한 작업 수행하기
위 예제에서 쿼리는 하드코딩된 문자열이다. 이번에는 이를 인자에 따라 다른 응답이 출력되는 쿼리를 구성한다.

__server/index.js__
```js
/* ... */
const schema = buildSchema(`
  type Query {
    hello: String,
    random: Float!,
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const root = {
  hello() {
    return 'Hello !';
  },
  random() {
    return Math.random();
  },
  rollDice({ numDice, numSides }) {
    const result = [];

    for (let i = 0; i < numDice; i++) {
      result.push(1 + Math.floor(Math.random() * 6));
    }

    return result;
  },
};
/* ... */
```

__public/index.html__
```html
<!-- ... -->
    <input id="roll-dice" type="button" value="roll dice.." />
<!-- ... -->
      const rollDice = document.getElementById('roll-dice');

      rollDice.addEventListener('click', () => {
        const dice = 3;
        const sides = 6;
        const xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        xhr.open("POST", "/graphql");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = () => {
          const result = xhr.response;

          console.log('data returned:', result);
        };

        const query = `query RollDice($dice: Int!, $sides: Int) {
            rollDice(numDice: $dice, numSides: $sides)
        }`;
        xhr.send(JSON.stringify({
          query: query,
          variables: { dice: dice, sides: sides },
        }));
      });
<!-- ... -->
```

### API 응답으로 객체 반환하기
먼저 쿼리를 구성하고, `rollOnce`, `roll` 이란 메소드를 가지는 `RandomDice` 클래스를 정의한다. `rollOnce` 메소드와 `roll` 메소드는 각각 `Int` 와 `[Int]`(`Int Array`) 를 반환하게 되며, 이들은 `getDice` 라는 객체 안에 정의된다.

__server/index.js__
```js
/* ... */
const schema = buildSchema(`
  type RandomDice {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDice(numSides: Int): RandomDice
  }
`);

class RandomDice {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    const result = [];

    for (let i = 0; i < numRolls; i++) {
      result.push(this.rollOnce());
    }

    return result;
  }
}

const root = {
  getDice({ numSides }) {
    return new RandomDice(numSides || 6);
  },
};
/* ... */
```

객체를 반환하는 API 에 대해 아래와 같은 Query 를 실행하면, `rollOnce` 를 한 번 호출하고, `roll(numRolls: 3)` 를 호출한다.
```
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
```
```
/* Response */
{
  "data": {
    "getDice": {
      "rollOnce": 6,
      "roll": [
        4,
        1,
        4
      ]
    }
  }
}
```

*Restful 방식*에서는 객체에 대한 기본 정보를 얻기 위해 한번의 API 요청을 수행한 뒤, 다음 객체에 대한 추가 정보를 찾기 위해 n 개의 후속 API 를 요청한다.
하지만, *GraphQL 방식*에서는 하나의 API 요청으로 모든 정보를 얻을 수 있다.

### 데이터 변경하기
<p>GraphQL 에서 데이터를 변경하기 위해서는 `mutation` 을 사용해야 한다. `mutation` 은 read-only 인 `query` 와 달리 쓰기가 가능하다.</p>
<p>`오늘의 메시지` 를 업데이트할 수 있고, 누구나 메시지를 읽을 수 있는 서버의 예제를 살펴보겠다.<br />먼저, 패키지를 추가로 설치하고, 데이터 변경을 위한 `GraphQL Schema` 및 `root` 등을 새로 정의한다.</p>

__server/index.js__
```js
/* ... */
const schema = buildSchema(`
  type Mutation {
    createMessage(message: String!): String
  }

  type Query {
    getMessage(id: Int): String
  }
`);

const fakeDatabase = {};
let messageId = 1;

const root = {
  createMessage({ message }) {
    fakeDatabase[messageId++] = message;

    return message;
  },
  getMessage({ id }) {
    return fakeDatabase[id || messageId];
  }
};
/* ... */
```

<p>`createMessage` 와 같이 데이터베이스 생성 혹은 업데이트 작업에 매핑되는 `mutation` 은 서버가 저장한 것과 동일한 것을 반환하는 것이 좋다.(클라이언트가 해당 내역을 알 수 있기 때문이다.)</p>

<p>스키마를 더 단순하게 만들기 위해 `[input types](http://graphql.org/graphql-js/mutations-and-input-types/)` 를 사용할 수 있도 있다.</p>

## 참고
- [Learn GraphQL](https://learngraphql.com/)
- [graphql.org](http://graphql.org)

