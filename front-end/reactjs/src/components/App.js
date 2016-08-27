import React from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';

/***** App_1 *****/
/*
import Header from './Header';
import Content from './Content';
import RandomNumbers from './RandomNumbers';
*/
/***** App_2 *****/
/*
import Contacts from './Contacts';
*/
/***** App_3 *****/
/*
import RefExample from './RefExample';
*/

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="articles">Articles</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

class App_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: Math.round(Math.random() * 100)
    };

    this._updateValue = this._updateValue.bind(this);
  }

  _updateValue(randomValue) {
    this.setState({
      value: randomValue
    });
  }

  render() {
    return  (
      <div>
        <Header title = { this.props.headerTitle }/>
        <Content title = { this.props.contentTitle } content = { this.props.contentBody }/>
        <RandomNumbers number = { this.state.value } onUpdate = { this._updateValue } />
      </div>
    );
  }
}

class App_2 extends React.Component {
  render() {
    return (
      <Contacts/>
    );
  }
}

class App_3 extends React.Component {
  render() {
    return (
      <RefExample />
    );
  }
}

export default App;

