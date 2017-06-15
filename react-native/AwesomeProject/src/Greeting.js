import React, { PropTypes } from 'react';
import { Text } from 'react-native';

const Greeting = props => (<Text>Hello, {props.name}!</Text>);

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;

