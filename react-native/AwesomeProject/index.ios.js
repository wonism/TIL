import React from 'react';
import { AppRegistry, View } from 'react-native';
// Example for state, props, styles
// import LotsOfGreetings from './src/LotsOfGreetings';
// Example for handling text input
// import TextReverser from './src/TextReverser';
// Example for scroll view
// import Scroller from './src/Scroller';
// Example for Flat List
// import FlatListBasic from './src/FlatListBasic';
// Example for Section List
// import SectionListBasic from './src/SectionListBasic';
// Example for network
import GithubUser from './src/GithubUser';

const AwesomeProject = () => (
  <View style={{ flex: 1 }}>
    <GithubUser />
  </View>
);

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

