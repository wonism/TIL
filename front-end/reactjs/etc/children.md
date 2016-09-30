### this.props.children
- `this.props.children`은 하위 컴퍼넌트들을 다룰 때 사용된다.
- `this.props.children`은 하위 컴퍼넌트에 따라 다른 타입이 될 수 있다. `문자열`, `Array[React Element]`, `undefined` 가 올 수 있으니, 내장 객체 메소드를 사용할 때, 주의해야 한다.
- `this.props.children`은 `count`, `forEach`, `map` 등의 유틸 함수를 제공한다. ([참고](https://facebook.github.io/react/docs/top-level-api.html#react.children))
- 먼저, `this.props.children`의 사용법은 아래와 같다.
```js
import React from 'react';
import ReactDOM from 'react-dom';

class Child extends React.Component {
  render() {
    return (
      <div>
        I'm Child!
      </div>
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

ReactDOM.render(
  <Parent>
    <Child value="first"/>
    <Child value="second"/>
  </Parent>,
  document.getElementById('react-app')
);
```
- 여기서 의문이 하나 생길 수 있다.<br />React JS 에서는 상위 컴퍼넌트에서 하위 컴퍼넌트로 `props` 를 전달함으로써 데이터의 흐름을 관리하는데, `this.props.children` 에는 `props` 를 전달할 방법이 없기 때문이다.<br />이때, `React.Children.map` 메소드를 사용한다. (이 메소드의 구현체는 `npm` 사용자 기준, `node_mobules/react/lib/ReactChildren.js` 에서 볼 수 있다.)
```js
import React from 'react';
import ReactDOM from 'react-dom';

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.doSomething(this.props.value);
  }

  render() {
    return (
      <div onClick={ this.handleClick.bind(this) }>
        Click this child!
      </div>
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
  }

  doSomething(value) {
    console.log(`Do something with children. My value is ${ value }`);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        doSomething: this.doSomething.bind(this)
      })
    );

    return (
      <div>
        { childrenWithProps }
      </div>
    );
  }
}

ReactDOM.render(
  <Parent>
    <Child value="first"/>
    <Child value="second"/>
  </Parent>,
  document.getElementById('react-app')
);
```

