import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class GithubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      user: {},
      isLoaded: false,
      isError: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleClick() {
    this.getData(this.state.userName);
  }

  handleChangeText(userName) {
    this.setState({
      userName,
    });
  }

  getData(userName) {
    fetch(`https://api.github.com/users/${userName}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          user: { ...res },
          isLoaded: true,
          isError: false,
        });
      })
      .catch((err) => {
        this.setState({
          user: {},
          isLoaded: false,
          isError: true,
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ height: 50 }}>
          <TextInput
            style={{ height: 40, fontSize: 30 }}
            placeholder="Input user name."
            onChangeText={this.handleChangeText}
          />
        </View>
        <View style={{ height: 50 }}>
          <Button
            onPress={this.handleClick}
            title="Find user!"
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {this.state.isLoaded ? (
            <View>
              <Text style={{ fontSize: 30 }}>
                {this.state.user.login} has
              </Text>
              <Text style={{ fontSize: 30 }}>
                {this.state.user.public_repos} repositories
              </Text>
            </View>
          ) : this.state.isError ? (
            <Text style={{ fontSize: 30, color: '#f00' }}>
              It doesn't loaded
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
};
