import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Greeting from './Greeting';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class LotsOfGreetings extends Component {
  constructor() {
    super();
    this.state = {
      persons: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
    };
  }

  render() {
    const persons = this.state.persons;

    return (
      <View style={styles.container}>
        {persons.map(p => (
          <Greeting
            key={p.id}
            name={p.name}
            style={styles.welcome}
          />))
        }
      </View>
    );
  }
}

export default LotsOfGreetings;

