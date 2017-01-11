# Redux 시작하기

## Redux의 3가지 원칙
__진리의 단일 소스__
- Redux 는 애플리케이션의 상태를 위해, 한 개의 스토어를 사용한다.
  - 하나의 스토어 안에 하나의 객체 트리 구조로 저장된다.

```js
console.log(store.getState());

/* console will print..
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

__state는 읽기 전용__
- 상태를 변경하는 유일한 방법은 무슨 일이 벌어질지(`action.type`) 묘사하는 `action` 객체를 전달하는 방법이다.
  - `action` 객체를 순수 자바스크립트 객체이다. `action` 객체를 어떻게 정의할지는 개발자에게 달려있으며, `type` 프로퍼티는 꼭 들어가야한다.
```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
```

__state의 변경은 순수 함수를 통해 이루어져야 한다__
- 액션에 의해 상태 트리가 어떻게 변하는지 지정하기 위해서는 순수 리듀서를 사용해야 한다.
  - 리듀서는 순수 함수로 이전의 `state` 와 `action` 을 넘겨받으면, 다음의 `state` 값을 반환한다. 이전 `state` 를 변경하는 대신, 새로운 객체를 생성하여 반환한다.

```js
import { combineReducers, createStore } from 'redux';

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        }
      ];
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true,
          });
        }
        return todo;
      })
    default:
      return state;
  }
}

let reducer = combineReducers({ visibilityFilter, todos });
let store = createStore(reducer);
```

## Redux 의 데이터 흐름
- Redux 는 단방향 데이터 흐름을 가진다.
- Redux 는 4 단계의 생명주기를 가진다.
  - 1. `store.dispatch(action)` 를 호출한다.
  - 2. Redux 의 스토어가 리듀서 함수를 호출한다.
  - 3. 루트 리듀서가 각 리듀서의 출력을 합쳐서 하나의 상태 트리로 만든다.
  - 4. Redux 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장한다.

## 표현 컴퍼넌트와 컨테이너 컴퍼넌트
<p>[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nsl6w3wer) 를 참고</p>

__표현 컴퍼넌트__
- 최상위 컴퍼넌트를 제외한 모든 컴퍼넌트(Presentational component)로 Redux 와 관련이 없다.
- 어떻게 렌더링할 지(markup, styles)에 초점을 둔다.
- 모든 데이터를 `props` 를 통해 전달받는다.
- 데이터를 변경하기 위해서는 `props` 에서 콜백을 호출한다.

__컨테이터 컴퍼넌트__
- Redux 와 연관지을 컴퍼넌트(Container component)는 React 애플리케이션의 최상위 컴퍼넌트다.
  - 꼭 최상위 컴퍼넌트를 사용하지 않아도 되지만, 그러는 편이 좋다.
- 어떻게 작동하는 지(data 가져오기, state 변경)에 초점을 둔다.
- Redux 의 상태를 수신함으로써 데이터를 전달받는다.
- 데이터를 변경하기 위해서는 액션을 보낸다.

## 간단한 Redux Application
__의존성__
```sh
$ yarn add react react-dom redux #...
$ yarn add --dev path webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-stage-2 babel-preset-react #...

# or
$ npm i -S react react-dom redux #...
$ npm i -D path webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-stage-2 babel-preset-react #...
```

__File hierarchy__
```sh
.
├── package.json
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── App.js
│   ├── index.js
│   └── reducers
│       └── index.js
└── webpack.config.js
```

__webpack.config.js__
```js
'use strict';

const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    port: 7777,
    historyApiFallback: true,
    compress: false,
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  resolve: {
    extension: ['', '.js', '.jsx'],
  },
};
```

__public/index.html__
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Redux tutorial</title>
</head>
<body>
  <main id="redux-app"></main>
  <script type="text/javascript" src="/bundle.js"></script>
</body>
</html>
```

__src/components/App.js__
```js
import React from 'react';

export default () => (<h1>Hello, Redux!</h1>);
```

__src/reducers/index.js__
```js
export default ((state = {}, action) => state);
```

__src/index.js__
```js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);

render(<App />, document.getElementById('redux-app'));
```

## TODO MVC application
__File hierarchy__
```sh
...
├── src
│   ├── index.js
│   └── todos
│       ├── actionTypes.js
│       ├── actions.js
│       ├── components
│       ├── index.js
│       └── reducer.js
...
```

### Redux Application 만들기
__src/todos/actionTypes.js__
```js
const todoActionTypes = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
};

export default todoActionTypes;
```
- 먼저, 액션 타입을 정의한다.
  - `action` 객체의 `.type` 프로퍼티에 사용될 값들을 상수로 정의한다.

__src/todos/constants.js__
```js
const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export default VisibilityFilters;
```

__src/todos/actions.js__
```js
import todoActionTypes from './actionTypes';

const { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } = todoActionTypes;

function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
}

export { addTodo, toggleTodo, setVisibilityFilter };
```
- 액션 및 액션 생성자를 정의한다.
  - 앞서 말했듯 `action` 은 상태를 변경하기 위해 사용되는 객체로 `.type` 프로퍼티를 통해 무슨 일이 벌어질 지 전달하는 역할을 한다.
  - 액션 생성자는 액션을 만드는 함수다.
    - 전통적인 Flux 에서의 액션 생성자는 불러졌을 때 액션을 보내는 역할을 한다.
    - Redux 에서 액션 생성자는 액션을 반환한다.
```js
/* action creator in Flux */
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text,
  };
  dispatch(action);
}

/* action creator in Redux */
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

__src/todos/reducer.js__
```js
import { combineReducers } from 'redux';

import todoActionTypes from './actionTypes';
import VisibilityFilters from './constants';

const { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } = todoActionTypes;
const { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } = VisibilityFilters;

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      ...state,
      {
        id: state.length ? state[state.length - 1].id + 1 : 0,
        text: action.text,
        completed: false,
      }
    ];
  case TOGGLE_TODO:
    return [
      ...state.slice(0, action.id),
      {
        ...state[action.id],
        completed: !state[action.id].completed,
      },
      ...state.slice(action.id + 1)
    ];
  default:
    return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
});

export default todoApp;
```
- 리듀서는 `state` 와 `action` 을 넘겨받으면, 다음의 `state` 값을 반환한다.
  - 이전 `state` 를 변경하지 않고, 새로운 객체를 생성하여 반환한다.
  - `Object.assign({}, state, { newProperty: newPropertyValue })` 혹은 `{ ...state, newProperty: newPropertyValue }` 와 같이 새로운 객체를 반환한다.
  - `Array` 라면, `arr.concat(newElement)`, `[...elements, newElement]` 와 같이 새로운 배열을 반환한다.
    - 원소를 추가할 때에는 `concat`, 원소를 제거할 때에는 `.slice`, 원소를 수정할 때에는 `.map` 메소드를 사용한다. (이 세 메소드 모두 새로운 배열을 만든다.)
- 리듀서 안에서 다음과 같은 일을 하지 않는다.
  - `state` 를 변경
  - API 호출, 라우팅 전환
  - `Date.now()`, `Math.random()` 과 같은 순수하지 않은 함수 사용
- Redux 는 처음에 리듀서를 `undefined` 인 `state` 로 호출하는데, 이 때 `state` 를 초기화한다.
- `combineReducers` 메소드는 리듀서들을 `property` 에 따라 선택해서 호출하고, 그 결과를 다시 하나의 객체로 합쳐준다. 아래 두 코드는 같은 의미를 가진다.

```js
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
});
```

```js
function reducer(state, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  };
}
```

__src/index.js__
```js
import { createStore } from 'redux';
import todoApp from './todos/reducer';

const store = createStore(todoApp);
```

- 스토어를 만들기 위해 `createStore` 메소드를 사용한다. 이 때, 매개변수로 위에서 만든 리듀서를 넘겨준다.
  - `createStore` 메소드의 두 번째 인자를 통해 `state` 의 초기값을 지정해줄 수 있다. `ex) const store = createStore(todoApp, STATE_FROM_SERVER);`
- 스토어는 단 한 개이며, 다음과 같은 일을 한다.
  - `getState` : `state` 를 가져온다.
  - `dispatch` : `state` 를 변경한다.
  - `subscribe` : 리스너를 등록한다. (이벤트 감지)

### React JS 와 사용하기
__Installation__
- Redux 는 React JS 와 관계가 없으며, React JS, Vue JS, Angular JS, native Java Script 등과 같이 사용할 수 없다.
  - `react-redux`, `vue-redux`, `ng2-redux` 등의 라이브러리가 있다.
- `React bindings` 는 기본적으로 Redux 에 포함되어있지 않기 때문에, 명시적으로 설치를 한다.
```sh
$ yarn add react-redux
# or
$ npm i -S react-redux
```

#### 컴퍼넌트 작성
먼저, 예제를 통해 구현하고자 하는 표현 컴퍼넌트와 컨테이너 컴퍼넌트를 설계하면 아래와 같다.
__표현 컴퍼넌트__
- `TodoList` : 보이는 `todos` 를 보여주는 리스트
  - `todos` : `{ id, text, completed }` 의 속성을 가지는 `todo` 아이템의 집합
  - `onTodoClick(id: number)` : `todo` 를 클릭할 때 호출할 콜백
- `Todo` : 한 개의 `todo` 아이템
  - `text: string` : `todo` 를 표시할 텍스트
  - `completed: boolean` : `교차되어 나타나야하는지 여부`
  - `onClick()` : `todo` 를 클릭할 때 호출할 콜백
- `Link` : 콜백 링크
  - `onClick()` : 링크를 클릭할 때 호출할 콜백
- `Footer` : 사용자가 현재 보이는 `todos` 영역을 변경할 수 있는 곳
- `App` : 모든 것들을 렌더링하는 루트 컴퍼넌트

__컨테이터 컴퍼넌트__
- `VisibleTodoList` : 현재 가시성 필터에 따라 `todos` 를 필터링하고, `TodoList` 를 렌더링한다.
- `FilterLink` : 현재 가시성 필터를 얻어오고, `Link` 를 렌더링한다.
  - `filter: string` : 그것이 나타내는 가시성 필터

__기타 컴퍼넌트__
<p>작은 컴퍼넌트와 같이 표현 양식과 기능이 결합되어 있는 등의 경우처럼 표현 컴퍼넌트인지 컨테이너 컴퍼넌트인지 여부를 판별하기 힘든 컴퍼넌트도 있다.</p>
- `AddTodo` : 추가 버튼이 있는 입력 필드
  - 하지만, 이 컴퍼넌트를 두 개의 컴퍼넌트로 나눌 수도 있다.

##### 표현 컴퍼넌트 구현
__src/todos/components/Todo.js__
```js
import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
```

__src/todos/components/TodoList.js__
```js
import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);


TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
```

__src/todos/components/Link.js__
```js
import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
```

__src/todos/components/Footer.js__
```js
import React from 'react'
import FilterLink from '../containers/FilterLink';

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
```

__src/todos/components/App.js__
```js
import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

##### 컨테이너 컴퍼넌트 구현
- 컨테이너 컴퍼넌트는 `store.subscribe()` 를 사용하여 리덕스의 `state` 트리의 일부를 읽고, 렌더링되는 표현 컴퍼넌트에 `props` 를 주는 컴퍼넌트다.
- 컨테이너 컴퍼넌트는 직접 작성할 수도 있지만, `react-redux` 의 `connect()` 메소드를 사용하는 것이 좋다.
  - 이 메소드는 불필요한 리렌더링을 방지하기 위한 유용한 최적화를 제공한다.
  - [react-redux github](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) 에서 `connect()` 의 인자에 올 수 있는 것들에 대한 설명을 볼 수 있다.

__src/todos/containers/FilterLink.js__
```js
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default FilterLink;
```
- `connect()` 를 호출하고, `mapStateProps` 와 `mapDispatchToProps` 두 함수를 인자로 전달하여 `VisibleTodoList` 를 만든다.
- `mapStateProps()` 는 `현재 Redux 스토어 상태`를 `표현 컴퍼넌트에 전달하고자 하는 props` 로 바꿔주는 함수다.
  - `VisibleTodoList` 는 `TodoList` 에 전달할 `todos` 를 계산해야하므로, `state.visibilityFilter` 에 따라 `state.todos` 를 필터링하는 함수를 정의하고, `mapStateToProps` 에서 사용한다.
- `mapDispatchToProps()` 는 `dispatch()` 메소드를 수신하고, 표현 컴퍼넌트에 삽입할 콜백을 반환한다.
  - 예를 들어, `VisibleTodoList` 가 `onTodoClick` 을 `TodoList` 컴퍼넌트에 주입하고, `onTodoClick` 이 `TOGGLE_TODO` 액션을 전달하도록 한다.

__src/todos/containers/VisibleTodoList.js__
```js
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
  case 'SHOW_ALL':
    return todos;
  case 'SHOW_COMPLETED':
    return todos.filter(t => t.completed);
  case 'SHOW_ACTIVE':
    return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
```

##### 스토어 넘겨주기
__src/index.js__
```js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './todos/components/App';
import todoApp from './todos/reducers';

const store = createStore(todoApp);
const rootElement = document.getElementById('redux-app');

render(
  <Provider store={store}>
    <App />
  </Provider>, rootElement
);
```
- `react-redux` 의 `<Provider>` 에 `store` 를 전달해주면, 그 하위 컴퍼넌트들에는 따로 `parent-child` 구조로 `props` 를 전달해주지 않아도, `connect` 될 때 `store` 에 접근할 수 있다.
  - 이는 루트 컴퍼넌트를 렌더링할 때, 한 번만 사용해야한다.

## 참고
- [http://redux.js.org/](http://redux.js.org/)
- [Egghead : Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
- [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nsl6w3wer)

