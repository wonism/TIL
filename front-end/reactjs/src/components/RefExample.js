import React from 'react';

class RefExample extends React.Component {
  handleClick() {
    this._textBox._input.value = 'I used ref';
    this._textBox._input.focus();
  }

  render() {
    return (
      <div>
        { /* <input ref = { ref => this._input = ref } /> */ }
        { /* <input ref = 'myInput' /> */ }
        <TextBox ref = { ref => this._textBox = ref } />
        <button onClick = { this.handleClick.bind(this) }>Click Me</button>
      </div>
    );
  }

  /*
  componentDidMount() {
    this._input.value = 'Hi, I used ref to do this.';
    // this.refs.myInput.value = 'Hi, I used ref to do this.';
  }
  */
}

class TextBox extends React.Component {
  render() {
    return (
      <input ref = { ref => this._input = ref } />
    );
  }
}

export default RefExample;

