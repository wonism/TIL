import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class TextReverser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.reverse = this.reverse.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleChangeText(text) {
    this.setState({
      text,
    });
  }

  reverse() {
    this.setState({
      text: this.state.text.split('').reverse().join(''),
    });
  }

  clear() {
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ height: 50 }}>
          <TextInput
            style={{ flex: 1, height: 40, fontSize: 30 }}
            placeholder="Type here to translate!"
            onChangeText={this.handleChangeText}
          />
        </View>
        <View style={{ height: 50 }}>
          <Button
            onPress={this.reverse}
            title="Reverse!"
          />
        </View>
        <Text style={{ flex: 1, padding: 10, fontSize: 30 }}>
          {this.state.text}
        </Text>
      </View>
    );
  }
};

