import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

export default class TextReverser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: ['S', 'C', 'R', 'O', 'L', 'L', 'M', 'E', '!', '!'],
    };
  }

  render() {
    return (
      <ScrollView>
        {this.state.arr.map((el, i) => (
          <Text
            key={i}
            style={{ fontSize: 120, textAlign: 'center' }}
          >
            {el}
          </Text>
        ))}
      </ScrollView>
    );
  }
};

