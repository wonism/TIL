# Immutable helpers
- `Immutable helpers` 는 데이터를 효율적으로 수정할 수 있게 해주는 페이스북의 [immutable-js](https://github.com/facebook/immutable-js/) 를 사용한다.

## Immutable helpers 설치 및 적용
- `react` 개발 환경이 다 갖추어져있다는 가정 하에 설명을 하며, ES 2015 문법을 사용한다.
- `react-addons-update` 모듈을 설치 및 추가한다.
```sh
$ npm i -S react-addons-update
```
```js
import update from 'react-addons-update';
```

## Immutable helpers 사용방법
- Immutable 의 문법은 MongoDB 의 질의 언어에서 영감을 받았다고 한다.
```js
import update from 'react-addons-update';

const arr = [1, 2, 3];

// 배열 원소 추가 (배열에 4, 5, 6 을 추가한다.)
console.log(update(arr, {
  $push: [4, 5, 6]
}));

// 배열 원소 삭제 (배열의 처움 2 개의 요소를 삭제한다.)
console.log(update(arr, {
  $splice: [[0, 2]]
}));

// 배열 원소 수정 (배열의 마지막 요소를 해당 수의 제곱으로 수정)
console.log(update(arr, {
  [arr.length - 1]: {
    $set: Math.pow(arr[arr.length - 1], 2)
  }
}));
```

### 추가 : shouldComponentUpdate 주기를 이용한 자원낭비 줄이기
- 보통, 배열을 다루는 경우 아래와 같은 코드를 짜기 십상이다.
  - 크기가 큰 배열의 수정할 경우 발생하는 성능 저하를 완화할 수 있다.
  - 아래 코드는 배열을 복사한 뒤, 조작을 하고, `setState` 에 복사된 배열을 사용한다.
- 페이지에서 버튼을 통해 요소를 추가 혹은 삭제하거나 요소를 선택할 때, 상태에 변화가 없는 컴퍼넌트들도 리렌더링되고 있다.
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

const root = document.getElementById('react-app');

class NumberComponent extends Component {
  constructor(props) {
    super(props);
  }

  toggleNumberState() {
    this.props.toggleNumberState(this.props.arrayIndex);
  }

  removeNumber() {
    this.props.removeNumber(this.props.arrayIndex);
  }

  render() {
    console.log(`${ this.props.number } is (re)rendered.`);

    return (
      <li style={ { fontFamily: 'monospace' } }>
        <b
          style={ this.props.selected ? { display: 'inline-block', padding: '0 10px', color: 'red', backgroundColor: '#eee', fontWeight: 'bold' } : { display: 'inline-block', padding: '0 10px', backgroundColor: '#B4E1FF' } }
          onClick={ this.toggleNumberState.bind(this) }
        >
          { this.props.number }
        </b>
        <button onClick={ this.removeNumber.bind(this) }>X</button>
      </li>
    );
  }
}

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { value: 1, selected: false },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
      ]
    }
  }

  addNumber() {
    const newArr = this.state.arr;
    newArr.push({ value: this.state.arr[this.state.arr.length - 1].value + 1, selected: false });

    this.setState({
      arr: newArr
    });
  }

  toggleNumberState(i) {
    const newArr = this.state.arr;
    newArr[i].selected = !newArr[i].selected;

    this.setState({
      arr: newArr
    });
  }

  removeNumber(i) {
    const newArr = this.state.arr;
    newArr.splice(i, 1);

    this.setState({
      arr: newArr
    });
  }

  render() {
    return (
      <div>
        <h1>Immutable Helpers Study</h1>
        <p>
          Click Numbers
        </p>
        <ul>
        { this.state.arr.map((el, i) => {
          return (
            <NumberComponent
              key={ i }
              arrayIndex={ i }
              number={ el.value }
              selected={ el.selected }
              toggleNumberState={ this.toggleNumberState.bind(this) }
              removeNumber={ this.removeNumber.bind(this) }
            />
          );
        })}
        </ul>
        <button onClick={ this.addNumber.bind(this) }>Add Numbers!</button>
      </div>
    );
  }
}

ReactDOM.render(<Sample />, root);
```
- 이와 같은 문제를 해소하기 위해 `Immutable helpers`와 React 생명주기 중 하나인 `shouldComponentUpdate` 를 사용한다.
- `shouldComponentUpdate` 는 새로운 `props` 또는 `state` 를 받아 렌더링을 하기 전에 호출되며, 최초렌더링 또는 `forceUpdate` 로 인한 렌더링 시에는 호출되지 않는다.
- `shouldComponentUpdate` 의 반환값이 `true` 면 컴퍼넌트를 업데이트하며, `false` 면 컴퍼넌트를 업데이트하지 않는다.
  - `shouldComponentUpdate` 는 기본적으로 `true` 를 반환한다.

- 수정된 코드는 다음과 같다.
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

const root = document.getElementById('react-app');

class NumberComponent extends Component {
  constructor(props) {
    super(props);
  }

  toggleNumberState() {
    this.props.toggleNumberState(this.props.arrayIndex);
  }

  removeNumber() {
    this.props.removeNumber(this.props.arrayIndex);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    console.log(`${ this.props.number } is (re)rendered.`);

    return (
      <li style={ { fontFamily: 'monospace' } }>
        <b
          style={ this.props.selected ? { display: 'inline-block', padding: '0 10px', color: 'red', backgroundColor: '#eee', fontWeight: 'bold' } : { display: 'inline-block', padding: '0 10px', backgroundColor: '#B4E1FF' } }
          onClick={ this.toggleNumberState.bind(this) }
        >
          { this.props.number }
        </b>
        <button onClick={ this.removeNumber.bind(this) }>X</button>
      </li>
    );
  }
}

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { value: 1, selected: false },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
      ]
    }
  }

  addNumber() {
    this.setState({
      arr: update(
        this.state.arr,
        {
          $push: [{ value: this.state.arr[this.state.arr.length - 1].value + 1, selected: false }]
        }
      )
    });
  }

  toggleNumberState(i) {
    this.setState({
      arr: update(
        this.state.arr,
        {
          [i]: {
            selected: { $set: !this.state.arr[i].selected }
          }
        }
      )
    });
  }

  removeNumber(i) {
    this.setState({
      arr: update(
        this.state.arr,
        {
          $splice: [[i, 1]]
        }
      )
    });
  }

  render() {
    return (
      <div>
        <h1>Immutable Helpers Study</h1>
        <p>
          Click Numbers
        </p>
        <ul>
        { this.state.arr.map((el, i) => {
          return (
            <NumberComponent
              key={ i }
              arrayIndex={ i }
              number={ el.value }
              selected={ el.selected }
              toggleNumberState={ this.toggleNumberState.bind(this) }
              removeNumber={ this.removeNumber.bind(this) }
            />
          );
        })}
        </ul>
        <button onClick={ this.addNumber.bind(this) }>Add Numbers!</button>
      </div>
    );
  }
}

ReactDOM.render(<Sample />, root);
```

