# Flux
> 데이터는 한 방향으로 흐르고 저장소에 완전히 보관된다는 아이디어를 기반으로 한 패턴으로 `액션(action)`, `스토어(store)`, `디스패처(dispatcher)` 로 구성된다.

## 목차
- 기본
  - 구현체
- 구조 및 데이터 흐름
- 예제 (은행계좌 애플리케이션)
- 참고

## 기본
- Flux 의 골자는 진리의 단일 소스(Single Source of truth) 인 `stores` 가 있으며, 트리거된 `action` 을 통해서만 업데이트할 수 있다는 것이다.
- `action` 은 `stores` 가 변경 변경사항을 등록하고 이에 따라 자체 데이터를 갱신할 수 있도록 `dispatcher` 를 호출한다.
- `dispatcher` 가 트리거되고, `stores` 가 업데이트되면, 그에 따라 뷰가 리렌더링될 수 있는 변경 이벤트를 내보낸다.
- `views` 에서 사용자가 인터랙션을 할 때, 그 `views` 는 중앙의 `dispatcher` 를 통해 다양한 `stores` 에 `action` 을 전달한다.
- `stores` 는 애플리케이션의 데이터와 비지니스 로직을 보유하며, 영향받는 모든 `views` 를 업데이트한다.
- `stores` 에서 상태간에 `views` 를 변환하는 방법을 지정하지 않고, 업데이트를 보낼 수 있다.
- Flux 를 통해 다음과 같은 것을 알 수 있다.
  - 데이터가 어디에서 왔는지
  - 데이터 변경 원인
  - 데이터 변경 방법
  - 특정 사용자 흐름

__진리의 단일 소스__
- 모든 핵심 데이터는 코드에서 한 번만 동작해야 한다는 관행. ([링크](https://en.wikipedia.org/wiki/Single_source_of_truth))

### 구현체
- [Facebook's Flux](https://github.com/facebook/flux)
- [alt](http://alt.js.org/)
- [Reflux](https://github.com/reflux/refluxjs)
- [flux-react](https://github.com/christianalfoni/flux-react)
- [Redux](https://github.com/reactjs/redux/)
  - Redux 는 Flux 패턴으로부터 영감을 받은 라이브러리지만, 순수한 Flux 구현은 아니며, 데이터 업데이트 방식 등도 다르다.
- ...

## 구조 및 데이터 흐름
- Flux 애플리케이션의 데이터는 단일 방향으로 흐른다.
<p align="center">
  <img src="https://github.com/wonism/TIL/blob/master/front-end/reactjs/flux-tutorial/img/f-1.png">
</p>
  - `dispatcher`, `stores`, `views` 는 고유한 입력 및 출력을 가지는 독립된 노드이다.
  - `action` 은 새 데이터와 식별 유형 속성을 포함하는 간단한 객체이다.

- `views` 는 사용자의 인터랙션에 응답하는 새로운 `action` 을 만들어 시스템에 전달한다.
<p align="center">
  <img src="https://github.com/wonism/TIL/blob/master/front-end/reactjs/flux-tutorial/img/f-2.png">
</p>

__dispatcher__
- `dispatcher` 는 Flux 애플리케이션의 모든 데이터 흐름을 관리한다.
- `action` 이 발생하면 `dispatcher` 로 `action` 이 전달되고, `dispatcher` 는 `dispatcher` 에 등록된 콜백 함수를 통해 전달된 `action` 을 `stores` 에 전달한다.
- `dispatcher` 는 전체 애플리케이션에서 한 개의 객체만을 사용한다.

__action__
- `dispatcher` 의 특정 메소드를 실행하면, `stores` 에 변화를 일으킬 수 있는데, 이 메소드를 실행할 때 `action` 을 인자로 담아 보낸다.
- `dispatcher` 에 전달할 `action` 객체는 대체로 `Action creator` 라는 메소드 (dispatcher helper method) 를 통해 만들어진다.
- `action` 객체는 `action type` 과 `action ID`, `관련 데이터` 를 포함한다.

__stores__
- `stores` 는 애플리케이션의 상태를 저장하며, 단순한 `Java Script Object` 로 구성된다.
- `stores` 의 데이터는 오직 `action` 에 대한 응답으로써 변경될 수 있다.
- `stores` 에는 `public setter` 가 있을 수 없으며, `getter` 만 있을 수 있다.

__views__
- `views` 에는 `stores` 의 데이터가 표시된다.
- `views` 는 관련 `stores` 의 변경 사항을 감지할 수 있는 이벤트 리스너를 `stores` 에 등록하며, `stores` 에 변경 사항이 발생할 경우, 이를 `views` 에 반영한다.
  - 이 때, `views` 에서는 자신의 `setState()` 나 `forceUpdate()` 메소드를 실행하고, `state` 가 업데이트됨에 따라 `render()` 메소드가 호출된다.

## 예제 : 은행계좌 애플리케이션
> `Jeremy Morrell` 이 발표한 자료에서 사용된 예제이다. ([링크](https://speakerdeck.com/jmorrell/jsconf-uy-flux-those-who-forget-the-past-dot-dot-dot-1))

### Getting Started
__패키지 설치__
```sh
$ yarn add react react-dom flux fbemitter
$ yarn add --dev webpack webpack-dev-server babel-loader babel-core babel-preset-es2015 babel-preset-react

# or
$ npm i -S react react-dom flux fbemitter
$ npm i -D webpack webpack-dev-server babel-loader babel-core babel-preset-es2015 babel-preset-react
```

__파일 구조도__
```sh
.
├── README.md
├── index.html
├── package.json
├── src
│   ├── containers
│   │   ├── AppContainer.js
│   ├── data
│   │   ├── Todo.js
│   │   ├── TodoActionTypes.js
│   │   ├── TodoActions.js
│   │   ├── TodoDispatcher.js
│   │   └── TodoStore.js
│   ├── index.js
│   └── views
│       └── AppView.js
├── webpack.config.js
└── yarn.lock
```

__Webpack 설정__
```js
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: __dirname,
    inline: true,
    port: 8888,
    historyApiFallback: true,
    compress: false,
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
};
```

__index.html__
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Flux example</title>
</head>
<body>
  <div id="flux-app"></div>
  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
```

__NPM 스크립트 만들기__
```js
{
  ...
  "scripts": {
    "start": "webpack-dev-server --hot --host 0.0.0.0",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
```

__Webpack dev server 실행__
```sh
$ npm start
# http://localhost:8888 접속
```

### Entry File
- `webpack.config.js` 에 의해 설정된 파일로 `AppView` 를 렌더링하는 역할을 한다.
```js
import AppView from './views/AppView';
import React from 'react';
import { render } from 'react-dom';

render(<AppView />, document.getElementById('flux-app'));
```

### View
- 스토어에 의해 제어되는 잔고를 표시하고, 사용자 인터랙션이 일어날 때마다 액션 생성자를 호출한다.
- 컴퍼넌트가 생성될 때, `createAccount` 메소드로 계좌를 만들고, `AccountBalanceStore` 의 `getState` 메소드를 사용함으로써, 잔고를 `state` 에 저장한다.
- 컴퍼넌트가 마운트된 이후에 `AccountBalanceStore` 에 `change 이벤트`를 등록한다.
- 컴퍼넌트가 마운트 해제된 이후에 `store` 에 등록된 이벤트를 제거한다.

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AccountBalanceStore from '../data/AccountBalanceStore';
import AccountActions from '../data/AccountActions';

class AppView extends Component {
  constructor(props) {
    super(props);
    AccountActions.createAccount();
    this.state = {
      balance: AccountBalanceStore.getState(),
    };
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  componentDidMount() {
    this.storeSubscription = AccountBalanceStore.addListener(data => this.handleStoreChange(data));
  }

  componentWillUnmount() {
    this.storeSubscription.remove();
  }

  handleStoreChange() {
    this.setState({
      balance: AccountBalanceStore.getState(),
    });
  }

  deposit() {
    AccountActions.depositIntoAccount(+document.getElementById('amount').value);
    document.getElementById('amount').value = '';
  }

  withdraw() {
    AccountActions.withdrawFromAccount(+document.getElementById('amount').value);
    document.getElementById('amount').value = '';
  }

  render() {
    return (
      <section>
        <header>
          <h1>Flux Bank Account Application</h1>
        </header>
        <div>
          <h3>{`Your balance is ${this.state.balance}.`}</h3>
          <fieldset>
            <legend>입/출금 금액</legend>
            <label htmlFor="amount">금액</label>
            <input id="amount" type="text" pattern="\d+" placeholder="Enter amount.." />
            <button onClick={ this.withdraw }>출금</button>
            <button onClick={ this.deposit }>입금</button>
          </fieldset>
        </div>
      </section>
    );
  }
}

export default AppView;
```

### Action Type
- 계좌 개설, 입금, 출금 등의 세 가지 작업을 하는 `action` 을 식별할 수 있는 상수를 열거형식의 객체로 정의했다.

```js
export default {
  CREATED_ACCOUNT: 'created account',
  WITHDREW_FROM_ACCOUNT: 'withdrew from account',
  DEPOSITED_INTO_ACCOUNT: 'deposited into account',
};
```

### Action
- `action` 을 정의하고 전달하는 함수(계좌 개설, 입금, 출금 등의 동작을 수행할)를 기술한다.
- 타입과 데이터를 포함하는 객체는 `action` 이다.
  - `type` 은 `dispatcher` 에 등록된 `store` 의 `Callback` 에서 판단할 타입이다.

```js
import AccountDispatcher from './AccountDispatcher';
import AccountActionTypes from './AccountActionTypes';

const AccountActions = {
  createAccount() {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.CREATED_ACCOUNT,
      amount: 0,
    });
  },

  depositIntoAccount(amount) {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.DEPOSITED_INTO_ACCOUNT,
      amount: amount,
    });
  },

  withdrawFromAccount(amount) {
    AccountDispatcher.dispatch({
      type: AccountActionTypes.WITHDREW_FROM_ACCOUNT,
      amount: amount,
    });
  }
};

export default AccountActions;
```

### Dispatcher
- `import { Dispatcher } from 'flux'; export default new Dispatcher();` 와 같이 `flux.Dispatcher` 의 인스턴스를 생성하기만 해도 되지만, `Dispatcher` 의 역할을 콘솔로 보고자 다음과 같이 코드를 작성한다.

```js
import { Dispatcher } from 'flux';

class AccountDispatcher extends Dispatcher {
  dispatch(action = {}) {
    console.log('Dispatched! Action is..', action);
    super.dispatch(action);
  }
}

export default new AccountDispatcher();
```

- `dispatcher` 는 Flux 애플리케이션의 모든 데이터 흐름을 관리하며,
  `flux.Dispatcher` 의 `dispatch` 메소드는 다음과 같다.

```js
Dispatcher.prototype.dispatch = function dispatch(payload) {
  !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
  this._startDispatching(payload);
  try {
    for (var id in this._callbacks) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  } finally {
    this._stopDispatching();
  }
};
```

### Store
- `store` 는 `state` 를 저장하며, 자신을 `dispatcher` 에 등록한다.
- `action` 이 전달될 때마다 모든 `store` 가 호출되며, 해당 `action` 과 연된되는지 여부를 결정할 수 있다.
  - 연관되는 경우, `store` 는 내부 상태를 변경하고, 이벤트를 생성해 `view` 에게 `store` 가 변경됐음을 알린다.
- `EventEmitter` 를 통해 Node.JS 의 이벤트 시스템을 구현한다.
- addListener 메소드는 event emitter 인스턴스를 생성하고, 스토어 변경 이벤트를 구독한다.
- `AccountDispatcher` 를 불러옴으로써, 전달된 모든 액션에 대해서 호출되는 콜백을 제공하고 스토어를 등록한다.

```js
import { EventEmitter } from 'fbemitter';
import AccountDispatcher from './AccountDispatcher';
import AccountActionTypes from './AccountActionTypes';

const CHANGE_EVENT = 'change';
const __emitter = new EventEmitter();
let balance = 0;

const AccountBalanceStore = {
  getState() {
    return balance;
  },

  addListener(cb) {
    return __emitter.addListener(CHANGE_EVENT, cb);
  }
};

AccountBalanceStore.dispatchToken = AccountDispatcher.register(action =>
{
  switch (action.type) {
  case AccountActionTypes.CREATED_ACCOUNT:
    balance = 0;
    __emitter.emit(CHANGE_EVENT);
    break;
  case AccountActionTypes.DEPOSITED_INTO_ACCOUNT:
    balance += action.amount;
    __emitter.emit(CHANGE_EVENT);
    break;
  case AccountActionTypes.WITHDREW_FROM_ACCOUNT:
    balance -= action.amount;
    __emitter.emit(CHANGE_EVENT);
    break;
  }
});

export default AccountBalanceStore;
```

## 참고
- [Flux Official Docs](https://facebook.github.io/flux/docs/in-depth-overview.html)
- [Flux Github](https://github.com/facebook/flux)
- [웹Frameworks - Flux와 Redux (김태곤 님 글)](http://webframeworks.kr/tutorials/react/flux/)
- 프로 리액트 (Cassio de Sousa Antonio 저, 최민석 역)

