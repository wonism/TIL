import React from 'react';

class App extends React.Component {
  _sayHey() {
    alert("hey!");
  }

  render() {
    let text = 'React JS';
    let condition = true;
    let pStyle = {
      'background-color': 'gray',
      'fontSize': '16px'
    };

    return  (
      <div>
        { /* 나는 주석이다. */ }
        <h1>Hello, World!</h1>
        <h2>Welcome to { text }.</h2>
        <button onClick={ this._sayHey }>Click Me</button>
        <p style = { pStyle }>{ condition ? 'True' : 'False' }</p>
      </div>
    );
  }
}

export default App;

