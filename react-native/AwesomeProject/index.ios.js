import React from 'react';
import { AppRegistry, View } from 'react-native';
// Example for state, props, styles
import LotsOfGreetings from './src/LotsOfGreetings';
// Example for handling text input
import TextReverser from './src/TextReverser';
// Example for scroll view
import Scroller from './src/Scroller';

const AwesomeProject = () => (
  <View style={{ flex: 1 }}>
    <Scroller />
  </View>
);

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

