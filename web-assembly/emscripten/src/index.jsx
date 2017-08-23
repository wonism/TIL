import React, { Component } from 'react';
import { render } from 'react-dom';

const styles = {
  fontSize: '32px',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { randomNumber: -1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const randomNumber = _generateRandom();
    console.log(randomNumber);
    this.setState({ randomNumber });
  }

  render() {
    return (
      <div>
        <input style={styles} value={this.state.randomNumber} />
        <button style={styles} onClick={this.handleClick}>Click</button>
      </div>
    );
  }
}

const root = document.getElementById('wasm-app');

render(<App />, root);
